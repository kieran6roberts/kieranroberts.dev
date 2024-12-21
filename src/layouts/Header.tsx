import * as React from "react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@components/base/Tooltip";
import ThemeToggle from "@components/ThemeToggle.tsx";
import cn from "clsx";
// import { getPostsPaginatedData, type PostPagePosts } from "@utils/blog";

// import useStickyScroll from "@hooks/useStickyHeader";
// import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import {
  X_PROFILE_URL,
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
  BLUESKY_PROFILE_URL,
} from "@consts/urls";
import { GithubSVG, LinkedInSVG, XSVG, BlueSkySVG } from "@components/icons";
import { Button } from "@components/base/Button";
import { EMAIL_ADDRESS } from "@consts/index";

const SocialLink = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={cn(
      "text-zinc-600 dark:text-zinc-300 hover:text-d dark:hover:text-l link-focus rounded-md",
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
  </a>
);

export const Header = () => {
  const headerRef = React.useRef<HTMLElement>(null);
  // const prefersReducedMotion = usePrefersReducedMotion();

  // useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  return (
    <header
      ref={headerRef}
      className="z-[9999] transform-none sticky top-4 mx-4 left-0 bg-l dark:bg-d"
    >
      <nav
        role="navigation"
        className="relative flex items-center max-w-[1250px] bg-zinc-50 dark:bg-zinc-900 backdrop-opacity-90 backdrop-blur-xl shadow-[0px_148px_41px_0px_rgba(0,0,0,0.00),0px_94px_38px_0px_rgba(0,0,0,0.00),0px_53px_32px_0px_rgba(0,0,0,-0.01),0px_24px_24px_0px_rgba(0,0,0,0.02),0px_6px_13px_0px_rgba(0,0,0,0.02)] border border-zinc-200 dark:border-zinc-800 rounded-full h-[60px] mx-auto justify-between gap-x-4 px-4 md:px-8 lg:px-16 py-3.5"
      >
        <Button
          className="hidden lg:flex m-auto inset-0 h-max absolute pointer-events-none opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100 link-focus"
          asLink
          href="#main"
        >
          Skip to content
        </Button>
        <section className="flex-1 min-w-0 max-w-[230px]">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  className="block w-full truncate text-zinc-600 dark:text-zinc-300 text-sm sm:text-base hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer underline link-focus rounded-md"
                  href={`mailto:${EMAIL_ADDRESS}`}
                  target="_blank"
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
  );
};
