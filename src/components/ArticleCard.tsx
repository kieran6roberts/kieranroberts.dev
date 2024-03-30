import * as React from "react";

interface Props {
  date: string;
  description: string;
  title: string;
  options?: {
    formatDate?: boolean;
  };
}

export const ArticleCard = (props: Props) => {
  const displayDate = props.options?.formatDate
    ? new Date(props.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : props.date;
  return (
    <article className="flex flex-col border dark:border-gray-800 group-focus:border-none p-4 transform transition-transform duration-500 hover:scale-105 rounded-xl">
      <span className="text-l-secondary font-medium dark:text-d-tertiary-2">
        {displayDate}
      </span>
      <h2 className="flex flex-row items-center text-xl font-semibold flex-wrap gap-2 mb-4 mt-2">
        {props.title}
        <slot />
      </h2>
      <p className="prose dark:prose-invert">{props.description}</p>
    </article>
  );
};
