export type UserId = number | null;
export interface UserTypes {
  id?: UserId;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at?: Date;
  updated_at?: Date;
  password_digest: string;
  password?: string;
  password_confirmation?: string;
  session_token?: string;
  org_id: number;
  org_name: string;
}

export interface UserPayload {
  user: Partial<UserTypes>;
}
