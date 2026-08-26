import { User } from "./user";

export type Project = {
  id: string;
  name: string;
  user_id: string;
  config: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}
