import { motion } from "motion/react";
import Image from "next/image";
import { framerAnimProps } from "@/lib/globalVar";
import { ArticleTypes } from "@/lib/globalTypes";
import { SVG_Component } from "@/lib/variablesRender";
import { useTheme } from "@/components/Theme";

export const Article = ({
  gridType,
  variants,
  title,
  svg,
  description,
}: ArticleTypes) => {
  const { ThemeDark } = useTheme();
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: framerAnimProps.viewPercent }}
      transition={{ duration: framerAnimProps.animDuration }}
      className={`bg-secondary dark:bg-secondary-dark relative z-10 flex flex-col gap-2 overflow-hidden rounded-md px-4 pt-5 ${gridType.includes("lg") ? "row-span-2 pb-5 sm:col-span-6" : gridType.includes("md") ? "max-h-[400px] sm:col-span-3 lg:col-span-5" : gridType.includes("sm") && "max-h-[325px] sm:col-span-3 lg:col-span-4"}`}
    >
      <h2 className="text-heading dark:text-heading-dark max-xs:text-lg z-10 text-2xl leading-snug font-semibold">
        {title}
      </h2>

      <p className="text-subtext dark:text-subtext-dark max-xs:text-sm z-10">
        {description}
      </p>

      <div
        className={`relative z-10 mt-4 flex aspect-video w-full justify-center overflow-hidden max-sm:aspect-[4/3] ${gridType.includes("lg") && "h-full rounded-md"}`}
      >
        {svg && svg in SVG_Component ? (
          SVG_Component[svg]
        ) : (
          <Image
            alt="todo"
            fill
            src={ThemeDark ? "/todo.png" : "/todo-light.png"}
            className="object-cover object-center"
          />
        )}
      </div>
    </motion.div>
  );
};
