import * as React from "react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@components/base/Tooltip";
import ThemeToggle from "@components/ThemeToggle.tsx";
// import { getPostsPaginatedData, type PostPagePosts } from "@utils/blog";

import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import {
  X_PROFILE_URL,
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from "@consts/urls";
import { GithubSVG, LinkedInSVG, XSVG } from "@components/icons";
import { Button } from "@components/base/Button";

const EMAIL_ADDRESS = "kieranroberts6dev@gmail.com";

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
    className="text-zinc-600 dark:text-zinc-300 hover:text-d dark:hover:text-l link-focus rounded-md"
  >
    <span className="hidden md:block">{label}</span>
    <span className="block w-5 h-5 md:hidden">{Icon}</span>
  </a>
);

export const Header = () => {
  const [isEmailCopied, setIsEmailCopied] = React.useState(false);
  const headerRef = React.useRef<HTMLElement>(null);
  const emailTriggerRef = React.useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  const onEmailCopy = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setIsEmailCopied(true);
  };

  return (
    <header
      ref={headerRef}
      className="z-[9999] transform-none sticky top-0 left-0 bg-l dark:bg-d"
    >
      <nav
        role="navigation"
        className="relative flex items-center max-w-[1728px] h-[65px] mx-auto justify-between px-4 md:px-8 lg:px-16 py-3.5"
      >
        <Button
          className="hidden lg:flex m-auto inset-0 h-max absolute pointer-events-none opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100 link-focus"
          asLink
          href="#main"
        >
          Skip to content
        </Button>
        <section>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger onClick={(e) => e.preventDefault()} asChild>
                <button
                  ref={emailTriggerRef}
                  onClick={onEmailCopy}
                  aria-label={`Copy ${EMAIL_ADDRESS} to clipboard`}
                  className="flex items-center font-medium text-zinc-600 dark:text-zinc-300 text-sm rounded-md link-focus hover:text-d dark:hover:text-l"
                >
                  <span className="hidden sm:block">{EMAIL_ADDRESS}</span>
                  <span className="block sm:hidden">
                    {EMAIL_ADDRESS.slice(0, 16)}...
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                onPointerDownOutside={(event) => {
                  if (event.target === emailTriggerRef.current)
                    event.preventDefault();
                }}
                side="bottom"
              >
                {isEmailCopied ? "Copied!" : "Copy email"}
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
            <span className="hidden md:block">|</span>
            <SocialLink
              href={GITHUB_PROFILE_URL}
              label="GitHub"
              Icon={<GithubSVG />}
            />
            <span className="hidden md:block">|</span>
            <SocialLink href={X_PROFILE_URL} label="X" Icon={<XSVG />} />
          </div>
          <ThemeToggle />
        </section>
      </nav>
    </header>
  );
};
