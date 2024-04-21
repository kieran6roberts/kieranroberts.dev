import * as React from "react";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useKBar,
} from "kbar";
import { KBarResults } from "@modules/KBar/KBarResults";

export const KBar = () => {
  return (
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
  );
};
