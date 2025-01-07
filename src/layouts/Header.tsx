import * as React from 'react';
import { useStickyScroll } from '@hooks/useStickyHeader';

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@components/base/Tooltip';
import ThemeToggle from '@components/ThemeToggle.tsx';
import { Button } from '@components/base/Button';
import { EMAIL_ADDRESS } from '@consts/index';
import { Socials } from '@components/Socials';

export const Header = () => {
  const headerRef = React.useRef<HTMLElement>(null);

  useStickyScroll({ elRef: headerRef });

  return (
    <>
      <header ref={headerRef} className="sticky top-4 z-[9999] mx-4">
        <nav
          role="navigation"
          className="flex items-center max-w-[1250px] bg-zinc-50 dark:bg-zinc-900 backdrop-opacity-90 backdrop-blur-xl shadow-[0px_148px_41px_0px_rgba(0,0,0,0.00),0px_94px_38px_0px_rgba(0,0,0,0.00),0px_53px_32px_0px_rgba(0,0,0,-0.01),0px_24px_24px_0px_rgba(0,0,0,0.02),0px_6px_13px_0px_rgba(0,0,0,0.02)] border border-zinc-200 dark:border-zinc-800 rounded-full h-[60px] mx-auto justify-between gap-x-4 px-4 md:px-16 lg:px-24 py-3.5"
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
            <Socials />
            <ThemeToggle />
          </section>
        </nav>
      </header>
    </>
  );
};
