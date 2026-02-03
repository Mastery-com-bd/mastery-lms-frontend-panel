import { TCategory } from "./category.type";

export type TCourse = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  subtitle: string;
  language: string;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  category: TCategory;
  price: number;
  discountPrice: number;
  courseLeaningType: "RECORDED" | "LIVE" | "ONLINE" | "OFFLINE";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  isFeatured: boolean;
  thumbnail: string | null;
  previewVideo: string | null;
  totalLessons: number;
  totalQuizzes: number;
  enrolledCount: number;
  averageRating: number;
  ratingsCount: number;
  subjectId: string;
  courseTag: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  duration: string | null;
};

export type TAllCourse = {
  id: string;
  userId: string;
  courseId: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED";
  progress: number;
  enrolledAt: string;
  expiredAt: string | null;
  lastAccessedAt: string | null;
  createdAt: string;
  updatedAt: string;
  course: TCourse;
};
