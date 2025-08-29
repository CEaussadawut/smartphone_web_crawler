import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  component: About
});

function About() {
  return (
    <main className="h-screen container mx-auto p-8 flex flex-col gap-4">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-semibold"
      >
        About
      </motion.h1>
    </main>
  );
}
