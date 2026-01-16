import { COURSE_CONTENT_TYPES } from "@/types";
import { z } from "zod";

export const createCourseSchema = z.object({
  name: z
    .string()
    .min(3, { error: "Name must be at least 3 characters" })
    .max(50, { error: "Name must be at most 50 characters" }),
  language: z
    .string()
    .min(1, { error: "Language must be at least 1 character" }),
  type: z.literal(COURSE_CONTENT_TYPES),
  desc: z.string().min(1, "Markdown is required"),
  cover_image: z.file({ error: "Cover image is required" }),
  intro_video: z.file().optional(),
});

export const editCourseSchema = z.object({
  name: z.string().min(3).max(50),
  language: z.string().min(1),
  type: z.enum(COURSE_CONTENT_TYPES),
  desc: z.string().min(1),
  cover_image: z.instanceof(File).optional(),
  intro_video: z.instanceof(File).optional(),
});

export const ChapterSchema = z.object({
  name: z.string().min(3).max(50),
});

export const LessonSchema = z.object({
  chapters: z.number({ error: "Chapters required" }),
  type: z.string().min(1),
  name: z.string().min(3).max(50),
  content: z.string(),
  minutes: z.number(),
});

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

export type CreateCourseValues = z.infer<typeof createCourseSchema>;
export type QuizType = z.infer<typeof QuizSchema>;
export type EditCourseValues = z.infer<typeof editCourseSchema>;
export type ChapterValues = z.infer<typeof ChapterSchema>;
export type LessonValues = z.infer<typeof LessonSchema>;
