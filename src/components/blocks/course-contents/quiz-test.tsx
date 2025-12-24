import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { QuizType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

interface IProps {
  quizs: QuizType[];
  setQuizs: (quizs: QuizType[]) => void;
}

const formSchema = z.object({
  quest: z.string().min(3).max(50),
  variants: z
    .array(
      z.object({
        value: z.string().min(1, "Variant bo'sh bo'lishi mumkin emas"),
      }),
    )
    .min(2, "Kamida 2 variant")
    .max(4, "Ko'pi bilan 4 variant"),
  answer: z.number().min(0),
});

type FormSchema = z.infer<typeof formSchema>;

const QuizTest = ({ quizs, setQuizs }: IProps) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quest: "",
      variants: [{ value: "" }],
      answer: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  // 1. Quiz o'zgartirganda formani yangilash
  useEffect(() => {
    if (quizs.length > 0 && quizs[currentQuizIndex]) {
      const currentQuiz = quizs[currentQuizIndex];

      remove();

      currentQuiz.variants.forEach((variant) => {
        append({ value: variant.value });
      });

      form.setValue("quest", currentQuiz.quest);
      form.setValue("answer", currentQuiz.answer);
    }
  }, [currentQuizIndex, quizs, form, remove, append]);

  useEffect(() => {
    const answerValue = form.getValues("answer");
    if (answerValue >= fields.length && fields.length > 0) {
      form.setValue("answer", fields.length - 1);
    }
  }, [fields.length, form]);

  const handleSaveQuest = (data: FormSchema) => {
    const copy = [...quizs];

    if (!copy[currentQuizIndex]) {
      copy.push({
        quest: data.quest,
        variants: data.variants,
        answer: data.answer,
      });
    } else {
      copy[currentQuizIndex] = {
        quest: data.quest,
        variants: data.variants,
        answer: data.answer,
      };
    }

    setQuizs(copy);

    console.log("Saved quiz:", data);

    form.reset({
      quest: "",
      variants: [{ value: "" }],
      answer: 0,
    });
  };

  const lastVariantValue = form.watch(`variants.${fields.length - 1}.value`);

  useEffect(() => {
    if (lastVariantValue === undefined) return;

    if (lastVariantValue.length > 0) {
      (document.activeElement as HTMLElement | null)?.blur();
      append({ value: "" }, { focusIndex: fields.length - 1 });
    }
  }, [lastVariantValue]);

  return (
    <div>
      <Controller
        name="quest"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-quest">
              Question {currentQuizIndex + 1}
            </FieldLabel>
            <Input type="text" placeholder="question..." {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {fields.map((variant, index) => (
        <Controller
          key={variant.id}
          name={`variants.${index}.value`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-1 mt-2">
                <div
                  className="size-10! border rounded-full shrink-0 flex items-center justify-center"
                  onClick={() => form.setValue("answer", index)}
                >
                  {form.watch("answer") === index && (
                    <div
                      className={cn("rounded-full size-3.5 bg-primary")}
                    ></div>
                  )}
                </div>
                {/*<Button
                  key={index}
                  type="button"
                  size="icon"
                  variant={form.watch("answer") === index ? "default" : "ghost"}
                  onClick={() => form.setValue("answer", index)}
                >
                  {String.fromCharCode(index + 65)}
                </Button>*/}
                <FieldLabel className="sr-only"></FieldLabel>
                <Input
                  {...field}
                  placeholder={`Variant ${String.fromCharCode(index + 65)}`}
                />
                {fields.length - 1 !== index ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>
                ) : (
                  <div className="w-9 h-9 shrink-0"></div>
                )}
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}

      {/*{fields.length < 4 && (
        <Button
          className="block my-5 mx-auto"
          type="button"
          onClick={() => append({ value: "" })}
        >
          Add variant
        </Button>
      )}*/}

      {/*<div className="my-4">
        <FieldLabel>To'g'ri javob</FieldLabel>
        <div className="flex gap-2 mt-2">
          {fields.map((_, index) => (
            <Button
              key={index}
              type="button"
              variant={form.watch("answer") === index ? "default" : "outline"}
              onClick={() => form.setValue("answer", index)}
            >
              {String.fromCharCode(index + 65)}
            </Button>
          ))}
        </div>
      </div>*/}

      {/*<div className="flex justify-center gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={() => setCurrentQuizIndex((prev) => prev - 1)}
          disabled={currentQuizIndex === 0}
        >
          Prev
        </Button>
        <Button onClick={form.handleSubmit(handleSaveQuest)}>Save</Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            form.handleSubmit(handleSaveQuest)();
            if (currentQuizIndex < quizs.length - 1) {
              setCurrentQuizIndex((prev) => prev + 1);
            }
          }}
          disabled={currentQuizIndex === quizs.length - 1}
        >
          Next
        </Button>
      </div>*/}
    </div>
  );
};

export default QuizTest;
