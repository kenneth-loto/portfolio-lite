export type NavLink = {
  href: string;
  label: string;
};

export interface SocialMediaLink extends NavLink {}

export type AboutMe = {
  name: string;
  bio: string;
  role: string;
  email: string;
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
}

export interface Blog {
  title: string;
  description: string;
  href: string;
}
