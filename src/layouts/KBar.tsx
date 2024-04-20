import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
} from "kbar";
import { KBarResults } from "@layouts/KBarResults";
import * as React from "react";

const actions = [
  {
    id: "home",
    name: "Home",
    shortcut: ["h"],
    keywords: "home",
    section: "navigation",
    perform: () => (window.location.href = "/"),
  },
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "blog",
    section: "navigation",
    perform: () => (window.location.href = "/blog"),
  },
  {
    id: "skills",
    name: "Skills",
    shortcut: ["s"],
    keywords: "skills",
    section: "navigation",
    perform: () => (window.location.href = "/skills"),
  },
  {
    id: "about",
    name: "About",
    shortcut: ["a"],
    keywords: "about",
    section: "navigation",
    perform: () => (window.location.href = "/about"),
  },
  {
    id: "contact",
    name: "Contact",
    shortcut: ["c"],
    keywords: "contact",
    section: "navigation",
    perform: () => (window.location.href = "/contact"),
  },
];

export const KBar = () => {
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-[1000] bg-primary-dark/30 dark:bg-white/5">
          <KBarAnimator className="w-[90%] lg:w-1/2 max-w-[800px] bg-white dark:bg-primary-dark rounded-xl">
            <KBarSearch
              defaultPlaceholder="What would you like to find..."
              className="px-4 py-4 border-b dark:border-d-secondary rounded-tr-xl rounded-tl-xl w-full bg-white dark:bg-[#120217] outline-none"
            />
            <KBarResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </KBarProvider>
  );
};
