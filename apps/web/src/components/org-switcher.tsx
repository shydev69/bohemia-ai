"use client";

import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function OrgSwitcher({
  title = "Bohemia AI",
  subtitle = "Publish voice agents",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-default">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">{title}</span>
            <span className="text-muted-foreground">{subtitle}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
