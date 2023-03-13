export type UserId = number | null;
export interface UserPayloadType extends UserType {
  password?: string;
  password_confirmation?: string;
  org_name: string;
}

export interface UserResponse {
  user: UserType;
}

export interface UserType {
  id: UserId;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at: Date;
  updated_at: Date;
  org_id: number;
}
export interface UserPayload {
  user: Partial<UserType>;
}
