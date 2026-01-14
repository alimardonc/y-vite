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

export type CreateCourseValues = z.infer<typeof createCourseSchema>;
export type EditCourseValues = z.infer<typeof editCourseSchema>;
