export type TUser = {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "STUDENT" | "INSTRUCTOR";
  iat: number;
  exp: number;
};

export type TGetMeResponse = {
  success: boolean;
  message: string;
  data: GetMeDataProps;
};
interface GetMeDataProps {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  profilePhoto: string;
  address: string;
  bio: string;
  role: "ADMIN" | "STUDENT" | "INSTRUCTOR";
  gender: string | null;
  dateOfBirth: string | null;
  status: string;
  isEmailVerified: boolean;
  createdAt: string;
}