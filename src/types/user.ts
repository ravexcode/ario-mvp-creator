import { Project } from "./project";

export type User = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  settings: Settings;
  createdAt: Date;
  projects: Project[];
}

type Settings = {
  mode?: string;
}
