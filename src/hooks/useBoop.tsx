import * as React from "react";
import { useSpring } from "react-spring";
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";

export type BoopConfig = {
  x?: number;
  y?: number;
  scale?: number;
  rotation?: number;
  timing?: number;
  springConfig?: {
    tension: number;
    friction: number;
  };
};

const useBoop = ({
  x = 0,
  y = 0,
  rotation = 0,
  scale = 1,
  timing = 150,
  springConfig = {
    tension: 300,
    friction: 10,
  },
}: BoopConfig) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [isBooped, setIsBooped] = React.useState(false);

  const transform = isBooped
    ? `translate(${x}px, ${y}px)
     rotate(${rotation}deg)
     scale(${scale})`
    : `translate(0px, 0px)
     rotate(0deg)
     scale(1)`;

  const style = useSpring({
    transform,
    config: springConfig,
  });

  React.useEffect(() => {
    if (!isBooped) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false);
    }, timing);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isBooped, timing]);

  const trigger = React.useCallback(() => {
    setIsBooped(true);
  }, []);

  const styleToApply: React.CSSProperties | {} = !prefersReducedMotion
    ? style
    : {};

  return {
    styleToApplyOnBoop: styleToApply,
    handleBoopTrigger: trigger,
  };
};

export { useBoop };
