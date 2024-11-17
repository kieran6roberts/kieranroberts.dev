import * as React from "react";
import { useHover } from "@uidotdev/usehooks";

import { Button } from "@components/base/Button";
import { ArrowSquareRightSVG } from "@components/icons/index";
import { LINKEDIN_PROFILE_URL } from "@consts/urls";

export const HeroCTA = () => {
  const [connectBtnRef, isHoveringConnectBtn] = useHover();

  return (
    <div className="flex gap-4">
      <Button
        ref={connectBtnRef}
        asLink
        href={LINKEDIN_PROFILE_URL}
        target="_blank"
        iconAnimationSettings={{ rotation: 10, timing: 300, scale: 1.05 }}
        endIcon={
          <span className="block text-accent-brightest dark:text-d w-5 h-5">
            <ArrowSquareRightSVG />
          </span>
        }
      >
        Connect with me
      </Button>
    </div>
  );
};
