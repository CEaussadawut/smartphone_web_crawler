import { motion } from "motion/react";
import React from "react";

import { cn } from "@/lib/utils";

const LoadingComponent = () => {
  const splittedText = "Loading".split("");

  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        repeat: Infinity,
        repeatDelay: 1
      }
    })
  };

  const ref = React.useRef(null);

  return (
    <main className="h-screen w-full bg-[#151515] flex flex-col gap-4 justify-center items-center z-50">
      <div className="rounded-full text-[#151515] bg-white p-8">
        <img
          src="https://media.tenor.com/sbfBfp3FeY8AAAAj/oia-uia.gif"
          alt="oia-uia"
        />
      </div>
      <div className="flex justify-center">
        {splittedText.map((current, i) => (
          <motion.div
            key={i}
            ref={ref}
            variants={pullupVariant}
            initial="initial"
            animate="animate"
            custom={i}
            className={cn(
              "text-xl text-center sm:text-3xl font-bold tracking-tighter md:text-3xl md:leading-[4rem]"
            )}
          >
            {current == " " ? <span>&nbsp;</span> : current}
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default LoadingComponent;
