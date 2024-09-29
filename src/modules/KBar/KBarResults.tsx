import { KBarResults as KResults, useMatches } from "kbar";
import * as React from "react";
import cn from "clsx";

export const KBarResults = () => {
  const { results } = useMatches();
  const hasResults = results && results.length > 0;

  return (
    <div className="py-4">
      <KResults
        items={results}
        onRender={({ item, active }) =>
          typeof item === "string" ? (
            <div className="px-4 pb-2 capitalize font-medium text-base">
              {item}
            </div>
          ) : (
            <div
              className={cn(
                "group capitalize flex items-center justify-between px-8 py-3 cursor-pointer hover:bg-d-tertiary-2/50 dark:hover:bg-l-primary-darkest/40",
                active ? "bg-d-tertiary-2/50 dark:bg-l-primary-darkest/20" : "",
              )}
            >
              {item.name}
              <div>
                {item.section === "navigation" ? (
                  <span
                    className={cn(
                      "p-1 rounded-lg text-xs font-medium",
                      active ? "block" : "hidden group-hover:block",
                    )}
                  >
                    Jump to
                  </span>
                ) : null}
              </div>
            </div>
          )
        }
      />
      {!hasResults ? (
        <p className="text-prose dark:prose-invert text-base text-center px-8 py-2">
          Empty, try again
        </p>
      ) : null}
    </div>
  );
};
