import * as React from "react";
import { KBarProvider as KBarProv } from "kbar";
import { animated } from "react-spring";
import cn from "clsx";
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
import { KBarToggle } from "@modules/KBar/KbarToggle";
import { getPostsPaginatedData, type PostPagePosts } from "@utils/blog";

import useStickyScroll from "@hooks/useStickyHeader";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import { KBar, actions as kBarActions } from "@modules/KBar";
import {
  BLOG_URL,
  DOMAIN_NAME,
  X_PROFILE_URL,
  GITHUB_PROFILE_URL,
  LINKEDIN_PROFILE_URL,
} from "@consts/urls";

import AvatarImage from "@assets/Kieran-Avatar-funky-min_80x80.webp";

interface Props {
  pathname: string;
  blogPosts: ReturnType<
    typeof getPostsPaginatedData<PostPagePosts>
  >["postsArray"];
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
    className?: string;
    target?: string;
    rel?: string;
    Icon?: React.ReactNode;
  }
>(({ title, copy, label, href, className = "", Icon = null, ...rest }, ref) => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({ scale: 1.05 });
  return (
    <a
      ref={ref}
      aria-label={label}
      href={href}
      onMouseEnter={handleBoopTrigger}
      className={cn(
        "flex flex-row items-center bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 h-full gap-x-4 border row-span-1 transition-colors duration-100 rounded-xl px-4 py-2 link-focus",
        className ||
          "dark:border-gray-800 hover:border-l-secondary dark:hover:border-d-secondary",
      )}
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

const BlogPostCard = React.forwardRef<
  HTMLAnchorElement,
  {
    slug: string;
    coverImage: string;
    title: string;
  }
>(({ slug, coverImage, title, ...rest }, ref) => {
  const {
    styleToApplyOnBoop: blogBoopStyle,
    handleBoopTrigger: handleBlogBoopTrigger,
  } = useBoop({ x: 4 });
  return (
    <a
      href={`${BLOG_URL}/${slug}`}
      onMouseEnter={handleBlogBoopTrigger}
      className="group relative h-full flex justify-center rounded-xl overflow-hidden bg-black border dark:border-gray-800 hover:border-l-secondary dark:hover:border-d-secondary link-focus"
      ref={ref}
      {...rest}
    >
      <div className="absolute inset-0 w-full h-full opacity-75 group-hover:opacity-90 group-hover:scale-105 transition duration-200">
        <img
          className="object-cover object-right h-full"
          alt={title}
          src={coverImage}
        />
      </div>
      <div className="relative bottom-0 p-2 h-max z-10 bg-slate-50 dark:bg-gray-900">
        <h2 className="font-semibold text-sm text-black dark:text-white line-clamp-1">
          {title}
        </h2>
        <p className="flex items-center gap-2 text-gray-900 dark:text-gray-100 group-hover:text-l-secondary group-hover:dark:text-d-secondary transition-colors duration-100 text-xs">
          Read more
          <animated.span
            {...(blogBoopStyle && {
              style: blogBoopStyle,
            })}
            className="block text-black dark:text-white w-3 h-3"
          >
            <ArrowRightSVG />
          </animated.span>
        </p>
      </div>
    </a>
  );
});

export const Header = ({ pathname, blogPosts }: Props) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const isActive = pathname === "/";

  useStickyScroll({ elRef: headerRef, prefersReducedMotion });

  const latestPost = blogPosts[0];
  const secondLatestPost = blogPosts[1];
  const showBlogLink = latestPost && secondLatestPost;
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog");

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
                {DOMAIN_NAME}
                <span
                  className={cn(
                    "block w-6 h-6",
                    isActive
                      ? "text-l-secondary dark:text-d-tertiary-2"
                      : "text-black dark:text-white",
                  )}
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
                        <NavigationMenuTrigger active={isBlogPage} asChild>
                          <button
                            type="button"
                            className={cn(
                              "!px-4 !py-1.5 transition duration-150 ease-in-out outline-none link-focus icon-button-hover",
                              isBlogPage
                                ? "text-l-primary-darkest dark:text-d-tertiary-2"
                                : "",
                            )}
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
                                <NavigationMenuLink asChild>
                                  <BlogPostCard
                                    slug={latestPost.slug}
                                    coverImage={latestPost.coverImage?.url}
                                    title={latestPost.title}
                                  />
                                </NavigationMenuLink>
                              ) : null}
                            </div>
                            <div className="col-span-2 row-span-3">
                              {secondLatestPost.coverImage?.url ? (
                                <NavigationMenuLink asChild>
                                  <BlogPostCard
                                    slug={secondLatestPost.slug}
                                    coverImage={
                                      secondLatestPost.coverImage?.url
                                    }
                                    title={secondLatestPost.title}
                                  />
                                </NavigationMenuLink>
                              ) : null}
                            </div>
                            <div className="col-span-2 row-span-1">
                              <NavigationMenuLink asChild>
                                <NavMenuContactContentItem
                                  title="All posts"
                                  copy="React, Next.js and much more..."
                                  label="My blog post page"
                                  className="border-l-secondary/50 hover:border-l-secondary"
                                  href={BLOG_URL}
                                />
                              </NavigationMenuLink>
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
                              copy="Follow me on X @Kieran6dev"
                              label="Kieran Roberts' X profile, opens in new tab"
                              href={X_PROFILE_URL}
                              Icon={<XSVG />}
                              className="border-l-secondary/50 hover:border-l-secondary"
                              target="_blank"
                              rel="noreferrer"
                            />
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NavMenuContactContentItem
                              title="LinkedIn"
                              copy="Connect with me on LinkedIn"
                              label="Kieran Roberts' LinkedIn profile, opens in new tab"
                              href={LINKEDIN_PROFILE_URL}
                              Icon={<LinkedInSVG />}
                              className="border-l-tertiary-1/50 hover:border-l-tertiary-1"
                              target="_blank"
                              rel="noreferrer"
                            />
                          </NavigationMenuLink>
                          <NavigationMenuLink asChild>
                            <NavMenuContactContentItem
                              title="GitHub"
                              copy="Check out my GitHub profile"
                              label="Kieran Roberts' GitHub profile, opens in new tab"
                              href={GITHUB_PROFILE_URL}
                              Icon={<GithubSVG />}
                              className="border-l-tertiary-2/50 hover:border-l-tertiary-2"
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
