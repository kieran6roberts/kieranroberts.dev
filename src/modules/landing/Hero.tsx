import * as React from "react";
import cn from "clsx";

import { useGlowEffect } from "src/hooks/useGlowEffect";

export const Hero = () => {
  const heroRef = React.useRef<HTMLDivElement>(null);
  const overlayCardRef = React.useRef<HTMLDivElement>(null);
  const { updateMousePosition, onMouseLeave } = useGlowEffect({
    glowCaptureRef: heroRef,
    glowOverlayRef: overlayCardRef,
  });

  return (
    <section
      ref={heroRef}
      onMouseLeave={onMouseLeave}
      onMouseMove={updateMousePosition}
      className={cn("glow-capture", "relative")}
    >
      <div
        className={cn(
          "flex flex-col w-full items-center justify-center h-[calc(100vh-70px)]",
          "group glow glow-ring-1 glow:border-glow glow:ring-glow glow:bg-glow/[.15]",
        )}
      >
        <span className="font-header text-3xl">Kieran Roberts</span>
        <h1 className="text-lg md:text-3xl text-center font-medium">
          Software Engineer at Hashnode
        </h1>
      </div>

      <div
        ref={overlayCardRef}
        className="glow-overlay"
        style={
          {
            "--glow-color": "#6B7FD7",
          } as React.CSSProperties
        }
      />
    </section>
  );
};
