import * as React from "react";
import { animated } from "react-spring";
import { MenuSVG } from "@components/icons";
import { Drawer } from "@components/navigation/MobileSidebar/Drawer";

import { useBoop } from "@hooks/useBoop";

interface Props {
  pathname: string;
}

const Trigger = ({ pathname }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({ x: 1 });

  const toggleOpenDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (isDrawerOpen && triggerRef?.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <>
      <animated.button
        aria-label="Open sidebar navigation menu"
        ref={triggerRef}
        className="flex items-center justify-center text-white md:hidden link-focus p-2 rounded-full icon-button-hover"
        onClick={toggleOpenDrawer}
        onMouseEnter={handleBoopTrigger}
      >
        <animated.span
          className="w-6 h-6 block text-white"
          {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
        >
          <MenuSVG />
        </animated.span>
      </animated.button>
      <Drawer
        show={isDrawerOpen}
        closeDrawer={toggleOpenDrawer}
        triggerRef={triggerRef}
        pathname={pathname}
      />
    </>
  );
};

export { Trigger };
