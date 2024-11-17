import * as React from "react";
import { useHover } from "@uidotdev/usehooks";

import { Button } from "@components/base/Button";
import { FavoriteBookSVG } from "@components/icons/index";
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
        iconAnimationSettings={{ scale: 1.1 }}
        endIcon={
          <span className="block text-slate-500 w-6 h-6">
            <FavoriteBookSVG hoverFill={isHoveringConnectBtn} />
          </span>
        }
      >
        Connect with me
      </Button>
    </div>
  );
};
