import * as React from "react";
import { animated } from "react-spring";

import { useBoop } from "@hooks/useBoop";
import type { BoopConfig } from "@hooks/useBoop";

interface Props {
  boopConfig: BoopConfig;
  children: React.ReactNode;
}

const Boop = ({ boopConfig, children }: Props) => {
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop(boopConfig);

  return (
    <div onMouseEnter={handleBoopTrigger}>
      <animated.span {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}>
        {children}
      </animated.span>
    </div>
  );
};

export { Boop };
