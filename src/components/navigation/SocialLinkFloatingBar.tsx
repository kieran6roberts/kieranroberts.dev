import * as React from "react";
import { OpenBook, X, Github, Linkedin } from "iconoir-react";
import { Boop } from "../animation/Boop";

export const SocialLinks = ({ asDark }: { asDark?: boolean }) => {
  const linkStyle = `flex items-center justify-center ${
    asDark ? "text-white" : ""
  } w-max p-2 rounded-full link-focus icon-button-hover`;
  return (
    <>
      <Boop boopConfig={{ rotation: 5 }}>
        <a href="https://github.com/kieran6roberts" className={linkStyle}>
          <Github width={22} height={22} strokeWidth={1.5} />
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: -5 }}>
        <a href="https://twitter.com/Kieran6dev" className={linkStyle}>
          <X width={22} height={22} strokeWidth={1.5} />
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: 5 }}>
        <a
          href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
          className={linkStyle}
        >
          <Linkedin width={22} height={22} strokeWidth={1.5} />
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: -5 }}>
        <a href="https://blog.kieranroberts.dev" className={linkStyle}>
          <OpenBook width={22} height={22} strokeWidth={1.5} />
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
