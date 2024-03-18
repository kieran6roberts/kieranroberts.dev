import * as React from "react";
import { animated } from "react-spring";
import { Menu } from "iconoir-react";
import { Drawer } from "../MobileSidebar/Drawer";

import { useBoop } from "../../../hooks/useBoop";

interface Props {
  pathname: string;
}

const Trigger = ({ pathname }: Props) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [style, trigger] = useBoop({ x: 1 });

  const toggleOpenDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    if (isDrawerOpen && triggerRef?.current) {
      triggerRef.current.focus();
    }
  };

  return (
    <>
      <animated.button
        ref={triggerRef}
        className="flex items-center justify-center text-white md:hidden link-focus p-2 rounded-full icon-button-hover"
        onClick={toggleOpenDrawer}
        onMouseEnter={trigger as any}
      >
        <animated.span style={style as any}>
          <Menu width={24} height={24} />
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
