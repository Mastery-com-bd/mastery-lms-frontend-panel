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

export type TFeaturedCourseMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TFeaturedCourseItem = {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  shortDescription: string | null;
  thumbnail: string | null;
  previewVideo: string | null;
  courseTag: string[];
  instructorId: string | null;
  categoryId: string;
  subjectId: string;
  price: number;
  discountPrice: number | null;
  isFeatured: boolean;
  status: string;
  courseLeaningType: string;
  language: string;
  level: string;
  duration: string | null;
  totalLessons: number;
  totalQuizzes: number;
  ratingsCount: number;
  averageRating: number;
  enrolledCount: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  instructor: any | null;
  category: {
    id: string;
    name: string;
    slug: string;
    description: string;
    iconUrl: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type TFeaturedCourse = {
  success: true;
  message: 'Featured courses retrieved successfully!';
  meta: TFeaturedCourseMeta;
  data: TFeaturedCourseItem[];
};
