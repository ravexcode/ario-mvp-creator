export interface User {
  id: string;
  email: string;
  name: string;
  settings: UserSettings;
  created_at: string;
}

export interface UserSettings {
  theme?: "light" | "dark";
  preferredModel?: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  config: LandingPageConfig;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface LandingPageConfig {
  title: string;
  description?: string;
  sections: PageSection[];
  colors?: ColorConfig;
  fonts?: FontConfig;
}

export interface PageSection {
  type: "hero" | "features" | "cta" | "testimonials" | "pricing" | "footer";
  content: Record<string, unknown>;
}

export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface FontConfig {
  heading: string;
  body: string;
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateProjectRequest {
  name: string;
  config?: LandingPageConfig;
}

export interface GenerateRequest {
  projectId: string;
  prompt: string;
}
