import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconWorldWww,
    IconCardboardsFilled,
  IconHome,
  
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Experience In Web",
      icon: (
        <IconWorldWww className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/explorer",
    },

    {
      title: "Experience In Virtual Reality",
      icon: (
        <IconCardboardsFilled className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/vr",
    },
   
  ];
  return (
    <div className="flex items-center justify-center lg:h-[15rem] h-[5rem] mb-10 w-full">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
