import type { Route } from "next";
import type { NavLink } from "@/lib/types";

export const navLinks: NavLink<Route>[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];
