interface Course {
    id: string,
    title: string,
    slug: string,
    subtitle: string,
    description: string,
    shortDescription: string,
    thumbnail: string,
    previewVideo: string | null,
    courseTag: string[],
    instructorId: string | null,
    categoryId: string,
    subjectId: string,
    price: number,
    discountPrice: number,
    isFeatured: boolean,
    status: string,
    courseLeaningType: string,
    language: string,
    level: string,
    duration: number | null,
    totalLessons: number,
    totalQuizzes: number,
    ratingsCount: number,
    averageRating: number,
    enrolledCount: number,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    instructor: string | null,
}

interface CourseData {
    id: string,
    userId: string,
    courseId: string,
    status: string,
    progress: number,
    completedLessons: number,
    enrolledAt: string,
    completedAt: string | null,
    lastAccessedAt: string | null,
    expiredAt: string,
    createdAt: string,
    updatedAt: string,
    course: Course
}

export interface ProfileCourseprops {
    success: boolean,
    message: string,
    meta: { page: number, limit: number, total: number },
    data: CourseData[]
}


export interface ProfileStatsProps {
    success: boolean,
    message: string,
    data: {
        summary: {
            totalActiveEnrollments: number,
            totalCompletedEnrollments: number,
            totalWatchedLessons: number,
            completionRate: number
        },
        charts: {
            enrollmentProgress: {
                date: string,
                enrollments: number
            }[],
            learningProgress: {
                date: string,
                lessons: number
            }[]
        },
        recentActivity: {
            enrollments: {
                id: string,
                userId: string,
                courseId: string,
                status: string,
                progress: number,
                completedLessons: number,
                enrolledAt: string,
                completedAt: string | null,
                lastAccessedAt: string | null,
                expiredAt: string,
                createdAt: string,
                updatedAt: string,
                course: {
                    id: string,
                    title: string,
                    thumbnail: string
                }
            }[]
        }
    }
}

