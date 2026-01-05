import { z } from "zod";

export interface ICourse {
  id: number;
  title: string;
  lessonCount: number;
  timeToFinish: number;
  image: string;
  description: string;
  tech: string;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string | null;
  username: string | null;
  avatar: string;
}

export const COURSE_CONTENT_TYPES = ["markdown"] as const;

export type ICourseContentTypes = (typeof COURSE_CONTENT_TYPES)[number];

export const QuizSchema = z
  .object({
    quest: z.string().trim().min(1, "Question bo‘sh bo‘lmasligi kerak"),

    variants: z
      .array(
        z.object({
          value: z.string().trim(),
        }),
      )
      .refine(
        (variants) => {
          // faqat bo‘sh bo‘lmagan variantlarni hisoblaymiz
          const filledVariants = variants.filter((v) => v.value.length > 0);
          return filledVariants.length >= 2;
        },
        {
          message: "Kamida 2 ta variant bo‘lishi kerak",
          path: [],
        },
      ),

    answer: z
      .array(z.number().int().min(0))
      .min(1, "Kamida 1 ta javob tanlanishi kerak"),
  })
  .superRefine((data, ctx) => {
    const filledVariants = data.variants.filter((v) => v.value.length > 0);

    data.answer.forEach((index) => {
      if (index >= filledVariants.length) {
        ctx.addIssue({
          path: ["answer"],
          message: "Answer mavjud variantga mos kelmaydi",
          code: z.ZodIssueCode.custom,
        });
      }
    });
  });

export type QuizType = z.infer<typeof QuizSchema>;
