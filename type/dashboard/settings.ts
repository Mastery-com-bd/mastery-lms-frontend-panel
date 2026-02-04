
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