export type NavLink<T extends string = string> = {
  href: T;
  label: string;
};

export interface SocialLink extends NavLink {}

export type AboutMe = {
  name: string;
  bio: string;
  title: string;
  email: string;
  avatar: string;
};

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description: string;
}
