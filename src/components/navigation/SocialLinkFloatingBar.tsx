import * as React from "react";
import { OpenBook, X, Github, Linkedin } from "iconoir-react";

export const SocialLinks = () => (
  <>
    <a
      href="https://github.com/kieran6roberts"
      className="flex items-center justify-center w-max p-2 rounded-full link-focus icon-button-hover"
    >
      <Github width={18} height={18} strokeWidth={2.2} />
    </a>
    <a
      href="https://twitter.com/Kieran6dev"
      className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
    >
      <X width={18} height={18} strokeWidth={2.2} />
    </a>
    <a
      href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
      className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
    >
      <Linkedin width={18} height={18} strokeWidth={2.2} />
    </a>
    <a
      href="https://blog.kieranroberts.dev"
      className="flex items-center justify-center p-2 rounded-full link-focus icon-button-hover"
    >
      <OpenBook width={18} height={18} strokeWidth={2.2} />
    </a>
  </>
);

export const SocialLinkFloatingBar = () => {
  return (
    <nav
      role="navigation"
      className="hidden md:flex fixed bottom-6 right-6 gap-x-2 w-max py-1.5 px-6 bg-white dark:bg-gray-900 text-l-primary-darkest dark:text-d-tertiary-2 border-l-primary-dark dark:border-d-tertiary-2 border-2 rounded-full"
    >
      <SocialLinks />
    </nav>
  );
};
