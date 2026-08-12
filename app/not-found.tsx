"use client";

import { NotFoundGlitch } from "@/components/motion/not-found/glitch";

export default function NotFound() {
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <NotFoundGlitch browseLabel="Browse Events" browseHref="/events"/>
    </div>
  );
}
