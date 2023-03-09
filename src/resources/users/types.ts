export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passwordDigest: string;
  sessionToken?: string;
  orgId: number;
}
