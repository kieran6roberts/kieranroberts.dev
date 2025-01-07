import cn from "clsx";
import * as React from "react";
import { StarSVG } from "@components/icons";

export const SocialLink = ({
  href,
  label,
  Icon,
  githubStars,
}: {
  href: string;
  label: string;
  Icon: React.ReactNode;
  githubStars?: number | null | undefined;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const handleMouseEnter = React.useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = React.useCallback(() => setIsHovered(false), []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group flex items-center gap-1 text-zinc-600 dark:text-zinc-300 hover:text-d dark:hover:text-l link-focus rounded-md",
      )}
    >
      <span className="hidden md:block">{label}</span>
      <span
        className={cn(
          "block w-5 h-5 md:hidden",
          label === "Bluesky" &&
            "fill-current stroke-current text-zinc-600 dark:text-zinc-300",
        )}
      >
        {Icon}
      </span>
      {githubStars ? (
        <span className="hidden sm:flex gap-1 items-center rounded-xl px-1 py-0.5 border border-zinc-200 dark:border-zinc-800 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 text-xs">
          <span className="block w-3 h-3 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors duration-200 ease-in">
            <StarSVG fill={isHovered ? "#FACC15" : "none"} />
          </span>
          <span className="text-zinc-500 group-hover:text-zinc-700 dark:text-zinc-400 dark:group-hover:text-zinc-200">
            {githubStars}
          </span>
        </span>
      ) : null}
    </a>
  );
};
