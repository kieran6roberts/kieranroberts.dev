import * as React from "react";
import { KBarPortal, KBarPositioner, KBarAnimator, KBarSearch } from "kbar";
import { KBarResults } from "@modules/KBar/KBarResults";

export const KBar = () => {
  return (
    <KBarPortal>
      <KBarPositioner className="z-[1000] bg-primary-dark/30 dark:bg-white/15">
        <KBarAnimator className="w-[90%] lg:w-1/2 max-w-[800px] bg-white dark:bg-primary-dark rounded-xl">
          <KBarSearch
            defaultPlaceholder="What would you like to find..."
            className="px-4 py-4 border-b dark:border-d-secondary rounded-tr-xl rounded-tl-xl w-full bg-white dark:bg-primary-dark outline-none"
          />
          <KBarResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};
