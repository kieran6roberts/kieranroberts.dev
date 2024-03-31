import * as React from "react";
import { XSVG, GithubSVG, LinkedInSVG } from "@components/icons";
import { Boop } from "@components/animation/Boop";

export const SocialLinks = ({ asDark }: { asDark?: boolean }) => {
  const linkStyle =
    "flex items-center justify-center w-max p-2 rounded-full link-focus icon-button-hover";
  return (
    <>
      <Boop boopConfig={{ rotation: 5 }}>
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="Kieran Roberts' Github profile, opens in new tab"
          href="https://github.com/kieran6roberts"
          className={linkStyle}
        >
          <span
            className={`w-6 h-6 block ${
              asDark ? "text-white" : "text-l-primary-darkest dark:text-white"
            }`}
          >
            <GithubSVG />
          </span>
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: -5 }}>
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="Kieran Roberts' X profile, opens in new tab"
          href="https://twitter.com/Kieran6dev"
          className={linkStyle}
        >
          <span
            className={`w-6 h-6 block ${
              asDark ? "text-white" : "text-l-primary-darkest dark:text-white"
            }`}
          >
            <XSVG />
          </span>
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: 5 }}>
        <a
          target="_blank"
          rel="noreferrer"
          aria-label="Kieran Roberts' LinkedIn profile, opens in new tab"
          href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
          className={linkStyle}
        >
          <span
            className={`w-6 h-6 block ${
              asDark ? "text-white" : "text-l-primary-darkest dark:text-white"
            }`}
          >
            <LinkedInSVG />
          </span>
        </a>
      </Boop>
    </>
  );
};

export const SocialLinkFloatingBar = () => {
  return (
    <nav
      role="navigation"
      className="hidden floating-social-bar z-1 lg:flex fixed bottom-6 right-6 lg:right-24 gap-x-2 w-max py-1.5 px-6 bg-white dark:bg-[#100114] text-l-primary-darkest dark:text-white border-l-primary-dark dark:border-d-tertiary-2 border-2 rounded-full"
    >
      <SocialLinks />
    </nav>
  );
};
