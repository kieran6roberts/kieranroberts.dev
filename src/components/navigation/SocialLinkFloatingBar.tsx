import * as React from "react";
import { OpenBook, X, Github, Linkedin } from "iconoir-react";
import { Boop } from "../animation/Boop";

export const SocialLinks = () => {
  return (
    <>
      <Boop boopConfig={{ rotation: 5 }}>
        <a
          href="https://github.com/kieran6roberts"
          className="flex items-center justify-center w-max p-2 rounded-full link-focus icon-button-hover"
        >
          <Github width={22} height={22} strokeWidth={1.5} />
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: -5 }}>
        <a
          href="https://twitter.com/Kieran6dev"
          className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
        >
          <X width={22} height={22} strokeWidth={1.5} />
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: 5 }}>
        <a
          href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
          className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
        >
          <Linkedin width={22} height={22} strokeWidth={1.5} />
        </a>
      </Boop>
      <Boop boopConfig={{ rotation: -5 }}>
        <a
          href="https://blog.kieranroberts.dev"
          className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
        >
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
      className="hidden lg:flex fixed bottom-6 right-6 gap-x-2 w-max py-1.5 px-6 bg-white dark:bg-[#100114] text-l-primary-darkest dark:text-white border-l-primary-dark dark:border-d-tertiary-2 border-2 rounded-full"
    >
      <SocialLinks />
    </nav>
  );
};
