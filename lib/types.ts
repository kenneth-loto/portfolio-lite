export type NavLink<T extends string = string> = {
  href: T;
  label: string;
};

export interface SocialMediaLink extends NavLink {}

export type Author = {
  name: string;
  bio: string;
  role: string;
  email: string;
  avatar: string;
  github_url: string;
};

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  href: string;
  year: string;
}
