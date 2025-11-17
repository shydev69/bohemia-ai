import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Agents",
    url: "/dashboard/agents",
    icon: "bot",
    shortcut: ["a", "g"],
    isActive: true,
    items: [
      {
        title: "All Agents",
        url: "/dashboard/agents",
        icon: "list",
        shortcut: ["a", "l"],
      },
      {
        title: "Create Agent",
        url: "/dashboard/agents/create",
        icon: "plus",
        shortcut: ["a", "c"],
      },
    ],
  },
  {
    title: "Account",
    url: "/dashboard/profile",
    icon: "billing",
    isActive: false,
    items: [],
  },
];
