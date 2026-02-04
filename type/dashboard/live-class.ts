export interface LiveClassProps {
    success: boolean,
    message: string,
    meta: { page: number, limit: number, total: number },
    data: LiveClassData[],
}

interface LiveClassData {
    id: string;
    title: string;
    description: string;
    courseId: string;
    instructorId: string;
    startTime: string;
    endTime: string;
    meetingUrl: string;
    meetingId: string;
    meetingPassword: string;
    isActive: boolean;
    isRecorded: boolean;
    recordingUrl: string | null;
    createdAt: string;
    updatedAt: string;
    course: {
        id: string,
        title: string,
    };
    instructor: {
        id: string,
        fullName: string,
        profilePhoto: string | null
    };
    attendees: any[];
}