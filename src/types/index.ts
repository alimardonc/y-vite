export interface ICourse {
  id: number;
  name: string;
  type: ICourseContentTypes;
  desc: string;
  language: string;
  cover_image: string | null;
  intro_video: string | null;
  owner?: IUser;
  mentors: IUser[];
  chapters: IChapter[];
  lessons: [];
  created_at: Date;
  my_roles?: string[];
}

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string | null;
  username: string | null;
  avatar: string;
}

export interface IChapter {
  id: number;
  course: number;
  name: string;
  lessons: [];
}

export const COURSE_CONTENT_TYPES = [
  "public",
  "private",
  "draft",
  "archived",
] as const;

export type ICourseContentTypes = (typeof COURSE_CONTENT_TYPES)[number];
