import * as React from "react";
import { KBarProvider as KBarProv } from "kbar";
import { animated } from "react-spring";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@hashnode/matrix-ui";

import { XSVG, LinkedInSVG, GithubSVG, ArrowRightSVG } from "@components/icons";
import { useBoop } from "@hooks/useBoop";

import { CodeSVG } from "@components/icons";
import ThemeToggle from "@components/ThemeToggle.tsx";
import { RSSLink } from "@components/navigation/RSSLink";
import { Trigger as SidebarTrigger } from "@components/navigation/MobileSidebar/Trigger";
import { KBarToggle } from "@components/KbarToggle";

import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import { KBar, actions as kBarActions } from "@modules/KBar";

import AvatarImage from "@assets/Kieran-Avatar-funky-min_80x80.webp";

interface Props {
  pathname: string;
  blogPosts: any;
}

export const KBarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <KBarProv actions={kBarActions}>
      <KBar />
      {children}
    </KBarProv>
  );
};

const NavMenuContactContentItem = React.forwardRef<
  HTMLAnchorElement,
  {
    title: string;
    copy: string;
    label: string;
    href: string;
    Icon?: React.ReactNode;
  }
>(({ title, copy, label, href, Icon = null, ...rest }, ref) => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({ scale: 1.05 });
  return (
    <a
      ref={ref}
      aria-label={label}
      href={href}
      onMouseEnter={handleBoopTrigger}
      className="flex flex-row items-center h-full gap-x-4 border-2 dark:border-gray-800 hover:border-l-secondary dark:hover:border-d-secondary row-span-1 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-100 rounded-xl px-4 py-2"
      {...rest}
    >
      {Icon ? (
        <animated.span
          {...(styleToApplyOnBoop && {
            style: styleToApplyOnBoop,
          })}
        >
          <span className="w-7 h-7 block text-l-primary-darkest dark:text-white">
            {Icon}
          </span>
        </animated.span>
      ) : null}

      <div className="flex flex-col gap-y-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm">{copy}</p>
      </div>
    </a>
  );
});

export const Header = ({ pathname, blogPosts }: Props) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const {
    styleToApplyOnBoop: firstblogBoopStyle,
    handleBoopTrigger: handleFirstBlogBoopTrigger,
  } = useBoop({ x: 4 });
  const {
    styleToApplyOnBoop: secondBlogBoopStyle,
    handleBoopTrigger: handleSecondBlogBoopTrigger,
  } = useBoop({ x: 4 });

  const isActive = pathname === "/";

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  const latestPost = blogPosts[0];
  const secondLatestPost = blogPosts[1];
  const showBlogLink = latestPost && secondLatestPost;

  return (
    <KBarProvider>
      <header
        ref={headerRef}
        className="z-[9999] bg-white transform-none dark:bg-[#100114] sticky top-0 left-0"
      >
        <nav
          role="navigation"
          className="relative flex items-center max-w-[1728px] h-[70px] mx-auto justify-between px-4 md:px-8 lg:px-16 py-3.5"
        >
          {/* Skip to content link */}
          <a
            className="hidden absolute pointer-events-none lg:flex items-center h-1/2 justify-center m-auto inset-0 w-44 bg-l-secondary text-white font-medium rounded-lg text-center outline-none opacity-0 transition-opacity focus:pointer-events-auto focus:opacity-100 link-focus"
            href="#main"
          >
            Skip to content
          </a>
          <section className="flex items-center gap-x-4">
            <a
              href="/"
              className="flex items-center gap-x-2 text-md sm:text-xl font-medium rounded-full md:rounded-md outline-none link-focus"
            >
              <div className="hidden w-max rounded-full mx-auto lg:mx-0 lg:block">
                <img
                  src={AvatarImage.src}
                  alt="Headshot of Kieran Roberts"
                  width="40"
                  height="40"
                  loading="eager"
                  className="rounded-full border border-l-secondary dark:border-l-tertiary-2"
                />
              </div>
              <h1 className="flex items-center text-black dark:text-white text-base sm:text-lg font-light gap-x-2">
                kieranroberts.dev
                <span
                  className={`block w-6 h-6 ${
                    isActive
                      ? "text-l-secondary dark:text-d-tertiary-2"
                      : "text-black dark:text-white"
                  }`}
                >
                  <CodeSVG />
                </span>
              </h1>
            </a>
            <section>
              <div className="hidden lg:flex md:items-center md:gap-x-4">
                <NavigationMenu delayDuration={0}>
                  <NavigationMenuList className="flex items-center gap-x-4">
                    {showBlogLink ? (
                      <NavigationMenuItem>
                        <NavigationMenuTrigger asChild>
                          <button
                            type="button"
                            className="!px-4 !py-1.5 transition duration-150 ease-in-out outline-none link-focus icon-button-hover"
                          >
                            Blog
                          </button>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div
                            style={{ width: "600px" }}
                            className="grid grid-cols-4 grid-rows-4 gap-2 p-2 h-72"
                          >
                            <div className="relative col-span-2 row-span-4">
                              {latestPost.coverImage?.url ? (
                                <a
                                  href={`/blog/${latestPost.slug}`}
                                  onMouseEnter={handleFirstBlogBoopTrigger}
                                  className="group relative h-full flex justify-center rounded-xl overflow-hidden bg-black border-2 dark:border-gray-800 hover:border-l-secondary dark:hover:border-d-secondary"
                                >
                                  <div className="absolute inset-0 w-full h-full opacity-75 group-hover:opacity-90 group-hover:scale-105 transition duration-200">
                                    <img
                                      className="object-cover object-right h-full"
                                      alt="Blog post cover"
                                      src={latestPost.coverImage?.url}
                                    />
                                  </div>
                                  <div className="relative bottom-0 p-2 h-max z-10 bg-slate-50 dark:bg-gray-900">
                                    <h2 className="font-semibold text-sm text-black dark:text-white line-clamp-1">
                                      {latestPost.title}
                                    </h2>
                                    <p className="flex items-center gap-2 text-gray-900 dark:text-gray-100 group-hover:text-l-secondary group-hover:dark:text-d-secondary transition-colors duration-100 text-xs">
                                      Read more
                                      <animated.span
                                        {...(firstblogBoopStyle && {
                                          style: firstblogBoopStyle,
                                        })}
                                        className="block text-black dark:text-white w-3 h-3"
                                      >
                                        <ArrowRightSVG />
                                      </animated.span>
                                    </p>
                                  </div>
                                </a>
                              ) : null}
                            </div>
                            <div className="col-span-2 row-span-3">
                              {secondLatestPost.coverImage?.url ? (
                                <a
                                  onMouseEnter={handleSecondBlogBoopTrigger}
                                  href={`/blog/${secondLatestPost.slug}`}
                                  className="group relative h-full flex justify-center rounded-xl overflow-hidden bg-black border-2 dark:border-gray-800 hover:border-l-secondary dark:hover:border-d-secondary"
                                >
                                  <div className="absolute inset-0 w-full h-full opacity-75 group-hover:opacity-90 group-hover:scale-105 transition duration-200">
                                    <img
                                      className="object-cover object-right h-full"
                                      alt="Blog post cover"
                                      src={secondLatestPost.coverImage?.url}
                                    />
                                  </div>
                                  <div className="relative bottom-0 p-2 h-max z-10 bg-slate-50 dark:bg-gray-900">
                                    <h2 className="font-semibold text-sm text-black dark:text-white line-clamp-1">
                                      {secondLatestPost.title}
                                    </h2>
                                    <p className="flex items-center gap-2 text-gray-900 dark:text-gray-100 group-hover:text-l-secondary group-hover:dark:text-d-secondary text-xs">
                                      Read more
                                      <animated.span
                                        {...(secondBlogBoopStyle && {
                                          style: secondBlogBoopStyle,
                                        })}
                                        className="block text-black dark:text-white w-3 h-3"
                                      >
                                        <ArrowRightSVG />
                                      </animated.span>
                                    </p>
                                  </div>
                                </a>
                              ) : null}
                            </div>
                            <div className="col-span-2 row-span-1">
                              <NavMenuContactContentItem
                                title="More posts"
                                copy="React, Next.js and much more..."
                                label="My blog post page"
                                href="/blog"
                              />
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : null}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger asChild>
                        <button
                          type="button"
                          className="!px-4 !py-1.5 transition duration-150 ease-in-out outline-none link-focus icon-button-hover"
                        >
                          Find me
                        </button>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid grid-rows-3 gap-2 w-[300px] p-2">
                          <NavigationMenuLink asChild>
                            <NavMenuContactContentItem
                              title="X"
                              copy="Follow me on X @Kieran6Dev"
                              label="Kieran Roberts' X profile, opens in new tab"
                              href="https://twitter.com/Kieran6dev"
                              Icon={<XSVG />}
                              target="_blank"
                              rel="noreferrer"
                            />
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NavMenuContactContentItem
                              title="LinkedIn"
                              copy="Connect with me on LinkedIn"
                              label="Kieran Roberts' LinkedIn profile, opens in new tab"
                              href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
                              Icon={<LinkedInSVG />}
                              target="_blank"
                              rel="noreferrer"
                            />
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NavMenuContactContentItem
                              title="GitHub"
                              copy="Check out my GitHub profile"
                              label="Kieran Roberts' GitHub profile, opens in new tab"
                              href="https://github.com/kieran6roberts"
                              Icon={<GithubSVG />}
                              target="_blank"
                              rel="noreferrer"
                            />
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </section>
          </section>

          <section className="flex items-center gap-x-8">
            <div className="flex items-center gap-x-2 md:gap-x-6">
              <ThemeToggle />
              <RSSLink />
              <KBarToggle />

              <SidebarTrigger pathname={pathname} />
            </div>
          </section>
        </nav>
        <div className="bg-gradient-to-r from-l-secondary from-25% via-l-tertiary-2 via-40% to-l-primary-dark h-[2px] w-full bg-white" />
      </header>
    </KBarProvider>
  );
};
