interface Course {
  id: string;
  title: string;
  thumbnail: string;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: string;
  progress: number;
  completedAt: string | null;
  completedLessons: number;
  course: Course;
  createdAt: string;
  enrolledAt: string;
  expiredAt: string;
  lastAccessedAt: string | null;
  updatedAt: string;
}

export interface RecentActivityPorps {
  enrollments: Enrollment[];
}
