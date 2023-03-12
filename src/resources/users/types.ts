export type UserId = number;
export interface UserType {
  id: UserType;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordDigest: string;
  passowrd?: string;
  passwordConfirmation?: string;
  sessionToken?: string;
  orgId: number;
}

export interface UserPayload {
  user: UserType;
}
