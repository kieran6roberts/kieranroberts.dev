import * as React from "react";

import { useGlowEffect } from "src/hooks/useGlowEffect";

interface Props {
  date: string;
  description: string;
  title: string;
  options?: {
    formatDate?: boolean;
  };
}

export const BlogCard = (props: Props) => {
  const blogCardRef = React.useRef<HTMLDivElement>(null);
  const overlayCardRef = React.useRef<HTMLDivElement>(null);
  const { updateMousePosition, onMouseLeave } = useGlowEffect({
    glowCaptureRef: blogCardRef,
    glowOverlayRef: overlayCardRef,
  });
  const displayDate = props.options?.formatDate
    ? new Date(props.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : props.date;

  return (
    <div
      ref={blogCardRef}
      className="relative glow-capture"
      onMouseLeave={onMouseLeave}
      onMouseMove={updateMousePosition}
    >
      <article className="group glow glow-ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15] flex flex-col border dark:border-gray-800 p-4 rounded-xl">
        <span className="text-white w-max rounded-xl px-2 py-px bg-black font-medium">
          {displayDate}
        </span>
        <h2 className="flex flex-row items-center glow:text-glow/[.15] text-xl font-semibold flex-wrap gap-2 mb-4 mt-2">
          {props.title}
          <slot />
        </h2>
        <p className="">{props.description}</p>
      </article>
      <div
        ref={overlayCardRef}
        className="hidden dark:blockglow-overlay"
        style={
          {
            "--glow-color": "#100114",
          } as React.CSSProperties
        }
      />
    </div>
  );
};
