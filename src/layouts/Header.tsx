import { CodeSVG } from "@components/icons";
import * as React from "react";
import { MainNavLinks } from "@components/navigation/MainNavLinks";
import ThemeToggle from "@components/ThemeToggle.tsx";
import { RSSLink } from "@components/navigation/RSSLink";
import { Trigger as SidebarTrigger } from "@components/navigation/MobileSidebar/Trigger";
import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import AvatarImage from "@assets/Kieran-Avatar-funky-min_80x80.webp";

interface Props {
  pathname: string;
}

export const Header = ({ pathname }: Props) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isActive = pathname === "/";
  const isBlogPath = pathname.includes("/blog");

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  return (
    <header
      ref={headerRef}
      className="transform-none bg-[#100114] sticky z-[9999] top-0 left-0"
    >
      <nav
        role="navigation"
        className="flex items-center max-w-[1728px] h-[75px] mx-auto justify-between px-4 md:px-8 lg:px-16 py-4 border-b dark:border-gray-800"
      >
        <section className="flex items-center gap-x-2">
          <a
            href="/"
            className="flex items-center gap-x-2 text-md sm:text-xl font-medium rounded-full md:rounded-md outline-none focus:ring ring-offset-gray-900 ring-offset-4 ring-d-tertiary-2"
          >
            <div className="hidden w-max rounded-full mx-auto lg:mx-0 lg:block">
              <img
                src={AvatarImage.src}
                alt="Headshot of Kieran Roberts"
                width="40"
                height="40"
                loading="eager"
                className="rounded-full border border-l-tertiary-2"
              />
            </div>
            <h1 className="flex items-center text-white text-xl font-light gap-x-2">
              kieranroberts.dev
              <span
                className={`block w-6 h-6 ${
                  isActive ? "text-[#97EC77]" : "text-white"
                }`}
              >
                <CodeSVG />
              </span>
            </h1>
          </a>
        </section>

        <section className="flex items-center gap-x-8">
          <div className="flex items-center gap-x-2 md:gap-x-6">
            {!isActive ? <ThemeToggle /> : null}
            {isBlogPath ? <RSSLink /> : null}

            <SidebarTrigger pathname={pathname} />
          </div>
          <div className="hidden md:flex md:items-center md:gap-x-8">
            <MainNavLinks pathname={pathname} asDark />
          </div>
        </section>
        <div className="absolute bottom-0 left-0 bg-gradient-to-r from-l-primary-dark from-30% via-l-secondary via-75% to-l-tertiary-2 h-[2px] w-full bg-white" />
      </nav>
    </header>
  );
};
