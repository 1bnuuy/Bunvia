import { motion } from "motion/react";
import Image from "next/image";
import { framerAnimProps } from "@/lib/variables";
import { ArticleTypes } from "@/lib/types";

export const Article = ({ gridType, variants, src, title, description }: ArticleTypes) => {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: framerAnimProps.viewPercent }}
      transition={{ duration: framerAnimProps.animDuration }}
      className={`bg-secondary dark:bg-secondary-dark relative z-10 flex flex-col gap-2 overflow-hidden rounded-md px-4 py-5 ${gridType.includes("lg") ? "row-span-2 sm:col-span-6" : gridType.includes("md") ? "sm:col-span-3 max-h-[400px] lg:col-span-5" : gridType.includes("sm") && "sm:col-span-3 max-h-[325px] lg:col-span-4"}`}
    >
      <h2 className="text-heading dark:text-heading-dark max-xs:text-lg z-10 text-2xl leading-snug font-semibold">
        {title}
      </h2>

      <p className="text-subtext dark:text-subtext-dark max-xs:text-sm z-10">
        {description}
      </p>

      <div className={`relative z-10 mt-4 w-full aspect-video max-sm:aspect-[4/3] overflow-hidden rounded-md ${gridType.includes("lg") && "h-full"}`}>
        <Image
          alt="todo"
          fill
          src={src}
          className="object-cover object-center"
        />
      </div>
    </motion.div>
  );
};
