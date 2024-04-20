import { KBarResults as KResults, useMatches } from "kbar";
import * as React from "react";

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
              className={`group capitalize flex items-center justify-between px-8 py-3 cursor-pointer hover:bg-d-tertiary-2/50 dark:hover:bg-l-primary-darkest/20 ${
                active ? "bg-d-tertiary-2/50 dark:bg-l-primary-darkest/20" : ""
              }`}
            >
              {item.name}
              <div>
                {item.section === "navigation" ? (
                  <span
                    className={`${
                      active ? "block" : "hidden group-hover:block"
                    } p-1 roumded-lg text-xs font-medium`}
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
