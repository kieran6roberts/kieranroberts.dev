import * as React from "react";
import { animated } from "react-spring";

import { useBoop } from "@hooks/useBoop";
import type { BoopConfig } from "@hooks/useBoop";

interface Props {
  boopConfig: BoopConfig;
  children: React.ReactNode;
}

const Boop = ({ boopConfig, children }: Props) => {
  const [style, trigger] = useBoop(boopConfig);

  return (
    <animated.span onMouseEnter={trigger as any} style={style as any}>
      {children}
    </animated.span>
  );
};

export { Boop };
