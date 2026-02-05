export interface WishlistProps  {
    success: boolean,
    message: string,
    meta: { page: number, limit: number, total: number },
    data: WishlistData[],
}

interface WishlistData {
    id: string;
    userId: string;
    courseId: string;
    createdAt: string;
    updatedAt: string;
    course: CourseProps;
}
interface CourseProps {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    discountPrice: number;
    averageRating: number;
    ratingsCount: number;
    enrolledCount: number;
    instructor: any;
    category: {
        id: string;
        name: string;
    };
}