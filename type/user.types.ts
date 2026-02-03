export type TUser = {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "STUDENT" | "INSTRUCTOR";
  iat: number;
  exp: number;
};
