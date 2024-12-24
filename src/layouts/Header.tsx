import * as React from "react";
import { useStickyScroll } from "@hooks/useStickyHeader";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@components/base/Tooltip";
import ThemeToggle from "@components/ThemeToggle.tsx";
import cn from "clsx";

import {
  X_PROFILE_URL,
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
  BLUESKY_PROFILE_URL,
} from "@consts/urls";
import {
  GithubSVG,
  LinkedInSVG,
  XSVG,
  BlueSkySVG,
  StarSVG,
} from "@components/icons";
import { Button } from "@components/base/Button";
import { EMAIL_ADDRESS } from "@consts/index";

const SocialLink = ({
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

interface HeaderProps {
  githubStars: number | null | undefined;
}

export const Header = ({ githubStars }: HeaderProps) => {
  const headerRef = React.useRef<HTMLElement>(null);

  useStickyScroll({ elRef: headerRef });

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-4 z-[9999] mx-4 bg-l dark:bg-d"
      >
        <nav
          role="navigation"
          className="flex items-center max-w-[1250px] bg-zinc-50 dark:bg-zinc-900 backdrop-opacity-90 backdrop-blur-xl shadow-[0px_148px_41px_0px_rgba(0,0,0,0.00),0px_94px_38px_0px_rgba(0,0,0,0.00),0px_53px_32px_0px_rgba(0,0,0,-0.01),0px_24px_24px_0px_rgba(0,0,0,0.02),0px_6px_13px_0px_rgba(0,0,0,0.02)] border border-zinc-200 dark:border-zinc-800 rounded-full h-[60px] mx-auto justify-between gap-x-4 px-4 md:px-8 lg:px-16 py-3.5"
        >
          <Button
            className="hidden lg:flex m-auto inset-0 h-max absolute pointer-events-none opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100 link-focus"
            asLink
            href="#main"
          >
            Skip to content
          </Button>
          <section className="flex items-center gap-2 flex-1 min-w-0 max-w-[275px]">
            <div className="relative flex items-center bg-l dark:bg-d justify-center h-10 w-10 rounded-full">
              <a href="/" className="link-focus rounded-full">
                <img
                  src="/Kieran-Avatar.webp"
                  alt="Kieran Roberts header picture"
                  width={40}
                  height={40}
                  loading="eager"
                />
              </a>
            </div>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    className="block w-full truncate text-zinc-600 dark:text-zinc-300 text-sm sm:text-base hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer underline link-focus rounded-md"
                    href={`mailto:${EMAIL_ADDRESS}`}
                  >
                    {EMAIL_ADDRESS}
                  </a>
                </TooltipTrigger>
                <TooltipContent align="center" side="bottom">
                  Email me
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </section>

          <section className="flex items-center gap-x-4 md:gap-x-12">
            <div className="flex items-center gap-x-2 md:gap-x-6 text-sm">
              <SocialLink
                href={LINKEDIN_PROFILE_URL}
                label="LinkedIn"
                Icon={<LinkedInSVG />}
              />
              <span className="hidden md:block text-zinc-400 dark:text-zinc-500">
                |
              </span>
              <SocialLink
                href={GITHUB_PROFILE_URL}
                label="GitHub"
                Icon={<GithubSVG />}
                githubStars={githubStars}
              />
              <span className="hidden md:block text-zinc-400 dark:text-zinc-500">
                |
              </span>
              <SocialLink href={X_PROFILE_URL} label="X" Icon={<XSVG />} />
              <span className="hidden md:block text-zinc-400 dark:text-zinc-500">
                |
              </span>
              <SocialLink
                href={BLUESKY_PROFILE_URL}
                label="Bluesky"
                Icon={<BlueSkySVG />}
              />
            </div>
            <ThemeToggle />
          </section>
        </nav>
      </header>
      <div className="max-w-[1250px] w-full flex gap-1 justify-end mx-auto px-4 md:px-8 lg:px-16 text-center bg-l dark:bg-d text-zinc-500 dark:text-zinc-400 py-6 text-sm lg:text-base">
        <span className="">Software developer</span>
        <a
          href="https://hashnode.com"
          target="_blank"
          rel="noreferrer"
          className="block text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 cursor-pointer rounded-md font-semibold outline-none link-focus"
        >
          @Hashnode
        </a>
      </div>
    </>
  );
};
