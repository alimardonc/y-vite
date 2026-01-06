import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { QuizSchema, type QuizType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CirclePlus, Trash2, X } from "lucide-react";
import { useEffect, useState, type SetStateAction } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface IProps {
  quizs: QuizType[];
  setQuizs: React.Dispatch<SetStateAction<QuizType[]>>;
}

const QuizTest = ({ quizs, setQuizs }: IProps) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const form = useForm<QuizType>({
    resolver: zodResolver(QuizSchema),
    defaultValues: quizs[currentQuizIndex],
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  useEffect(() => {
    const quiz = quizs[currentQuizIndex];
    if (!quiz) return;

    form.reset(quiz);
  }, [currentQuizIndex, quizs, form]);

  const saveCurrentQuiz = () => {
    const values = form.getValues();

    // const filteredVariants = values.variants.filter(
    //   (v) => v.value.trim().length > 0,
    // );

    setQuizs((prev) => {
      const copy = [...prev];

      copy[currentQuizIndex] = {
        ...copy[currentQuizIndex],
        quest: values.quest,
        answer: values.answer,
        variants: values.variants,
      };

      return copy;
    });
  };

  const addNewQuest = () => {
    saveCurrentQuiz();
    setQuizs((prev) => [
      ...prev,
      {
        quest: "",
        answer: [0],
        variants: [{ value: "" }],
      },
    ]);
    setCurrentQuizIndex(quizs.length);
  };

  const removeQuest = () => {
    const newIndex = Math.max(0, currentQuizIndex - 1);
    setCurrentQuizIndex(newIndex);

    const filteredQuest = quizs.filter((_, i) => i !== currentQuizIndex);
    setQuizs(filteredQuest);
  };

  console.log(quizs[currentQuizIndex]);

  const handleCreateQuiz = (quizs: QuizType) => {
    saveCurrentQuiz();
    console.log(quizs);
  };

  return (
    <div>
      <div className="w-full flex justify-between mb-4 p-2">
        <Button
          onClick={form.handleSubmit(() => {
            addNewQuest();
          })}
        >
          New <CirclePlus />
        </Button>
        <Button
          disabled={quizs.length <= 1}
          onClick={removeQuest}
          variant={"outline"}
        >
          Remove
          <Trash2 />
        </Button>
      </div>
      <Controller
        name="quest"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-quest">
              {currentQuizIndex + 1}-Question
            </FieldLabel>
            <Textarea className="h-9" placeholder="question..." {...field} />
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
              <div className="w-full flex items-center gap-1 mt-2">
                <Button
                  variant={"ghost"}
                  className="p-0"
                  disabled={fields.length - 1 === index}
                >
                  <div
                    className={cn(
                      "w-9 h-9 border cursor-pointer rounded-sm shrink-0 flex items-center justify-center",
                      form.watch("answer").includes(index)
                        ? " border-2 bg-[#ffffff30]"
                        : "",
                    )}
                    onClick={() => {
                      return !form.watch("answer").includes(index)
                        ? form.setValue("answer", [
                            ...form.watch("answer"),
                            index,
                          ])
                        : form.setValue("answer", [
                            ...form.watch("answer").filter((a) => a !== index),
                          ]);
                    }}
                  >
                    {form.watch("answer").includes(index) && <Check />}
                  </div>
                </Button>
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
                  className="h-9"
                  placeholder={`Variant ${String.fromCharCode(65 + index)}`}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                {fields.length - 1 !== index && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X />
                  </Button>
                )}
              </div>
            </Field>
          )}
        />
      ))}

      {form.formState.errors.variants?.message && (
        <p className="text-md text-red-600 text-center">
          {form.formState.errors.variants.message}
        </p>
      )}
      {form.formState.errors.answer?.message && (
        <p className="text-md text-red-600 text-center">
          {form.formState.errors.answer.message}
        </p>
      )}

      <div className="mt-4 flex flex-col justify-center gap-3">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={currentQuizIndex === 0}
                onClick={() => setCurrentQuizIndex((prev) => prev - 1)}
              />
            </PaginationItem>

            {quizs.map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentQuizIndex === i}
                  onClick={() => setCurrentQuizIndex(i)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                disabled={currentQuizIndex === quizs.length - 1}
                onClick={() => setCurrentQuizIndex((prev) => prev + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <Button onClick={form.handleSubmit(handleCreateQuiz)}>Create</Button>
      </div>
    </div>
  );
};

export default QuizTest;
