export interface MyCourseProps {
    success: boolean;
    message: string;
    meta: { page: number, limit: number, total: number },
    data: MyCourseData[],
}

export interface MyCourseData {
    completedAt: string | null;
    completedLessons: number;
    courseId: string;
    createdAt: string;
    enrolledAt: string;
    expiredAt: string;
    id: string;
    lastAccessedAt: string | null;
    progress: number;
    status: string;
    updatedAt: string;
    userId: string;
    course: CourseProps;
}

export interface CourseProps {
    averageRating: number;
    category: {
        id: string;
        name: string;
        slug: string;
        description: string;
        iconUrl: string | null;
    };
    categoryId: string;
    courseLeaningType: string;
    courseTag: string[];
    createdAt: string;
    description: string;
    discountPrice: number | null;
    duration: number | null;
    enrolledCount: number;
    id: string;
    instructor: any | null;
    instructorId: string | null;
    isFeatured: boolean;
    language: string;
    level: string;
    previewVideo: string | null;
    price: number;
    publishedAt: string | null;
    ratingsCount: number;
    sections: SectionProps[];
    shortDescription: string | null;
    slug: string;
    status: string;
    subjectId: string;
    subtitle: string;
    thumbnail: string;
    title: string;
    totalLessons: number;
    totalQuizzes: number;
    updatedAt: string;
}


interface SectionProps {
    courseId: string;
    createdAt: string;
    description: string;
    id: string;
    lessons: LessonProps[];
    order: number;
    title: string;
    updatedAt: string;
}
interface LessonProps {
    duration: number;
    id: string;
    title: string;
    watchedLessons: WatchedLessonProps[];
}

interface WatchedLessonProps {
    firstWatchedAt: string;
    id: string;
    isCompleted: boolean;
    lastPosition: null | number;
    lastWatchedAt: string;
    totalDuration: number;
    userId: string;
    watchedDuration: number;
}