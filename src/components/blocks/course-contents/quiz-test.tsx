import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { IQuizTypes } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

interface IProps {
  quizs: IQuizTypes[];
  setQuizs: React.Dispatch<React.SetStateAction<IQuizTypes[]>>;
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
      variants: [{ value: "" }, { value: "" }, { value: "" }],
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

      // Avval variantlarni tozalash
      remove();

      // Keyin yangi variantlarni qo'shish
      currentQuiz.variants.forEach((variant) => {
        append({ value: variant.value });
      });

      // Quest va answer qiymatlarini o'rnatish
      form.setValue("quest", currentQuiz.quest);
      form.setValue("answer", currentQuiz.answer);
    }
  }, [currentQuizIndex, quizs, form, remove, append]);

  // 2. Variantlar soni o'zgarganda answer tekshirish
  useEffect(() => {
    const answerValue = form.getValues("answer");
    if (answerValue >= fields.length && fields.length > 0) {
      form.setValue("answer", fields.length - 1);
    }
  }, [fields.length, form]);

  const handleSaveQuest = (data: FormSchema) => {
    setQuizs((prev) => {
      const copy = [...prev];

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

      return copy;
    });

    console.log("Saved quiz:", data);

    form.reset({
      quest: "",
      variants: [{ value: "" }, { value: "" }, { value: "" }],
      answer: 0,
    });
  };

  return (
    <div>
      <Controller
        name="quest"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-quest">Quest</FieldLabel>
            <Input type="text" placeholder="quest..." {...field} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {fields.map((variant, index) => (
        <Fragment key={variant.id}>
          <Controller
            name={`variants.${index}.value`}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>{String.fromCharCode(index + 65)}</FieldLabel>
                <Input
                  {...field}
                  placeholder={`Variant ${String.fromCharCode(index + 65)}`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {fields.length > 2 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => remove(index)}
            >
              -
            </Button>
          )}
        </Fragment>
      ))}

      {fields.length < 4 && (
        <Button
          className="block my-5 mx-auto"
          type="button"
          onClick={() => append({ value: "" })}
        >
          Add variant
        </Button>
      )}

      <div className="my-4">
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
      </div>

      <div className="flex flex-col justify-center gap-3 xl:flex-row">
        <Button
          variant={"outline"}
          onClick={() => setCurrentQuizIndex((prev) => prev - 1)}
          disabled={currentQuizIndex === 0}
        >
          Prev
        </Button>
        <Button onClick={form.handleSubmit(handleSaveQuest)}>Save</Button>
        <Button
          variant={"outline"}
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
      </div>
    </div>
  );
};

export default QuizTest;
