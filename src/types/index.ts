import { z } from "zod";

export interface ICourse {
  id: number;
  name: string;
  language: string;
  type: ICourseContentTypes;
  desc: string;
  owner: IUser;
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string | null;
  username: string | null;
  avatar: string;
}

export const COURSE_CONTENT_TYPES = [
  "public",
  "private",
  "draft",
  "archived",
] as const;

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
      .transform((variants) => variants.filter((v) => v.value.length > 0))
      .refine(
        (variants) => variants.length >= 2,
        "Kamida 2 ta variant bo‘lishi kerak",
      ),

    answer: z
      .array(z.number().int().nonnegative())
      .min(1, "Kamida 1 ta javob tanlanishi kerak"),
  })
  .superRefine((data, ctx) => {
    data.answer.forEach((index) => {
      if (index >= data.variants.length) {
        ctx.addIssue({
          path: ["answer"],
          message: "Answer mavjud variantga mos kelmaydi",
          code: z.ZodIssueCode.custom,
        });
      }
    });
  });

export type QuizType = z.infer<typeof QuizSchema>;
