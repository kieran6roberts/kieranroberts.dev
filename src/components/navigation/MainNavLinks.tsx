import * as React from "react";
import {
  Button,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLinkItem,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@hashnode/matrix-ui";

import { XSVG, LinkedInSVG, GithubSVG } from "@components/icons";
import { Boop } from "@components/animation/Boop";

import { NavLink } from "@components/navigation/NavLink";

interface Props {
  pathname?: string;
  showActiveCheck?: boolean;
  asDark?: boolean;
}

const NavMenuContentItem = React.forwardRef<
  HTMLAnchorElement,
  {
    title: string;
    copy: string;
    label: string;
    href: string;
    Icon: React.ReactNode;
  }
>(({ title, copy, label, href, Icon }, ref) => (
  <a
    ref={ref}
    aria-label={label}
    href={href}
    target="_blank"
    rel="noreferrer"
    className="flex flex-row items-center gap-x-4 row-span-1 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-100 rounded-xl px-4 py-2"
  >
    <Boop boopConfig={{ rotation: -5 }}>
      <span className="w-8 h-8 block text-l-primary-darkest dark:text-white">
        {Icon}
      </span>
    </Boop>
    <div className="flex flex-col gap-y-1">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm">{copy}</p>
    </div>
  </a>
));

const MainNavLinks = ({ pathname, showActiveCheck, asDark }: Props) => {
  return (
    <NavigationMenu delayDuration={0}>
      <NavigationMenuList className="flex items-center gap-x-4">
        <NavigationMenuItem asChild>
          <NavLink
            href="/blog"
            pathname={pathname}
            showActiveCheck={showActiveCheck}
            prefetchStrategy="hover"
          >
            Blog
          </NavLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem asChild>
          <NavLink
            href="/skills"
            pathname={pathname}
            showActiveCheck={showActiveCheck}
            prefetchStrategy="hover"
          >
            Skills
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem asChild>
          <NavLink
            href="/about"
            pathname={pathname}
            showActiveCheck={showActiveCheck}
            prefetchStrategy="hover"
          >
            About
          </NavLink>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <button
              type="button"
              className="!px-4 !py-1.5 transition duration-150 ease-in-out outline-none link-focus icon-button-hover"
            >
              Contact
            </button>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-rows-3 gap-2 w-[300px] p-2">
              <NavigationMenuLink asChild>
                <NavMenuContentItem
                  title="Follow me on X"
                  copy="@Kieran6Dev"
                  label="Kieran Roberts' X profile, opens in new tab"
                  href="https://twitter.com/Kieran6dev"
                  Icon={<XSVG />}
                />
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <NavMenuContentItem
                  title="Connect with me on LinkedIn"
                  copy="Kieran Roberts"
                  label="Kieran Roberts' LinkedIn profile, opens in new tab"
                  href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
                  Icon={<LinkedInSVG />}
                />
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <NavMenuContentItem
                  title="Connect with me on GitHub"
                  copy="kieran6roberts"
                  label="Kieran Roberts' GitHub profile, opens in new tab"
                  href="https://github.com/kieran6roberts"
                  Icon={<GithubSVG />}
                />
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { MainNavLinks };
