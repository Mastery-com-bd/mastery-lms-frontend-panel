
interface enrollment {
    course: {
        thumbnail: string;
        title: string;
        instructor: string | null;
    }
}

export interface PaymentHistoryProps {
    id: string;
    createdAt: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    customerName: string;
    transactionId: string;
    status: string;
    enrollment: enrollment;
}

export interface ProfileProps {
    success: boolean;
    message: string;
    data: {
        id: string;
        email: string;
        fullName: string;
        phoneNumber: string;
        profilePhoto: string | null;
        address: string | null;
        bio: string;
        role: string;
        gender: string | null;
        dateOfBirth: string | null;
        status: string;
        isEmailVerified: boolean;
        createdAt: string;
    }
}