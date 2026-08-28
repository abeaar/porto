// Bio
export interface Bio {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
}

// Project
export interface Project {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  slug: string;
  tags: string[];
  image_url?: string;
  github_url?: string;
  live_url?: string;
  created_at: string;
}

// Experience
export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  employment_type?: string;
  location?: string;
  tags?: string[];
  start_date: string;
  end_date?: string;
  is_current: boolean;
  created_at: string;
}

// Portfolio Data
export interface PortfolioData {
  bio: Bio;
  projects: Project[];
  experience: Experience[];
  skills: string[];
}

// Auth
export interface AuthPayload {
  username: string;
  password: string;
}

// Session
export interface Session {
  authenticated: boolean;
  timestamp: number;
}
