import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { QuizType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState, type SetStateAction } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";

interface IProps {
  quizs: QuizType[];
  setQuizs: React.Dispatch<SetStateAction<QuizType[]>>;
}

const formSchema = z.object({
  quest: z.string().min(3).max(50),
  variants: z
    .array(
      z.object({
        value: z.string(),
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
    defaultValues: quizs[currentQuizIndex],
  });

  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  useEffect(() => {
    form.setValue("quest", quizs[currentQuizIndex].quest);
    form.setValue("answer", quizs[currentQuizIndex].answer);
    quizs[currentQuizIndex].variants.map((v, i) =>
      update(i, { value: v.value }),
    );
  }, [form, quizs, currentQuizIndex, append, update]);

  const saveCurrentQuiz = () => {
    const values = form.getValues();

    const filteredVariants = values.variants.filter(
      (v) => v.value.trim().length > 0,
    );

    setQuizs((prev) => {
      const copy = [...prev];

      copy[currentQuizIndex] = {
        ...copy[currentQuizIndex],
        quest: values.quest,
        answer: values.answer,
        variants: filteredVariants,
      };

      return copy;
    });
  };

  const addNewQuest = () => {
    setQuizs((prev) => [
      ...prev,
      {
        quest: "",
        answer: 0,
        variants: [{ value: "" }, { value: "" }, { value: "" }],
      },
    ]);
  };

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
            <Textarea placeholder="question..." {...field} />
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
                <FieldLabel className="sr-only"></FieldLabel>
                <Textarea
                  {...field}
                  onInput={() => {
                    const isLast = index === fields.length - 1;
                    const hasValue = field.value?.trim().length > 0;

                    const values = form.getValues("variants");
                    const hasPrev =
                      index === 0 ||
                      values[index - 1]?.value?.trim().length > 0;

                    if (isLast && hasValue && hasPrev) {
                      append(
                        { value: "" },
                        { shouldFocus: false, focusIndex: index - 1 },
                      );
                    }
                  }}
                  className="h-10"
                  placeholder={`Variant ${String.fromCharCode(65 + index)}`}
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

      <div className="mt-4 flex justify-center gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            setCurrentQuizIndex((prev) => prev - 1);
            saveCurrentQuiz();
          }}
          disabled={currentQuizIndex === 0}
        >
          Prev
        </Button>
        {/*<Button type="button" onClick={form.handleSubmit(saveCurrentQuiz)}>
          Save
        </Button>*/}
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            if (currentQuizIndex === quizs.length - 1) addNewQuest();
            setCurrentQuizIndex((prev) => prev + 1);
            saveCurrentQuiz();
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuizTest;
