import { useSpring, animated } from "react-spring";
import { useClickAway, useWindowSize } from "@uidotdev/usehooks";
import { Xmark } from "iconoir-react";
import * as React from "react";

import { useBoop } from "@hooks/useBoop";

import { MainNavLinks } from "@components/navigation/MainNavLinks";
import { LockBodyScroll } from "@components/navigation/MobileSidebar/LockBodyScroll";
import { SocialLinks } from "@components/navigation/SocialLinkFloatingBar";

import {
  getFocusableElements,
  handleTabKeyPress,
  handleEscapeKey,
} from "@utils/accessibility";
import { NavLink } from "@components/navigation/NavLink";

interface Props {
  show: boolean;
  closeDrawer: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  pathname: string;
}

const Drawer = ({ show, closeDrawer, triggerRef, pathname }: Props) => {
  // Outside click from drawer closes it
  const ref = useClickAway(() => {
    if (show) {
      closeDrawer();
    }
  });

  // Close drawer when window size changes
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const windowSizeExists = !!(windowWidth && windowHeight);

  const { styleToApplyOnBoop, handleBoopTrigger } = useBoop({ rotation: 10 });

  const styles = useSpring({
    left: show
      ? windowSizeExists
        ? windowWidth - 350
        : windowWidth
      : windowWidth,
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    height: "100vh",
    width: "350px",
    zIndex: 9999,
  });

  React.useEffect(() => {
    if (show) {
      const focusableElements = getFocusableElements(ref);
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleEscape = (event: KeyboardEvent) =>
        handleEscapeKey({ event, handleEsc: closeDrawer, triggerRef });
      const handleTabKey = (event: KeyboardEvent) =>
        handleTabKeyPress({ event, firstElement, lastElement });

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTabKey);

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTabKey);
      };
    }
  }, [show]);

  React.useEffect(() => {
    if (show) {
      closeDrawer();
    }
  }, [windowHeight, windowWidth]);

  if (!show) {
    return null;
  }

  return (
    <>
      {show ? <LockBodyScroll /> : null}
      <animated.div style={styles as any} ref={ref as any}>
        <section className="w-full h-full bg-white dark:bg-[#100114] z-10">
          <button
            onClick={closeDrawer}
            className="flex items-center justify-center absolute top-5 right-5 p-1.5 link-focus rounded-full icon-button-hover"
            onMouseEnter={handleBoopTrigger}
          >
            <animated.span
              {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
            >
              <Xmark width={24} height={24} />
            </animated.span>
          </button>

          <nav
            id="sidebar-nav"
            className="flex flex-col h-full p-8 justify-center items-start gap-y-16"
          >
            <NavLink href="/" pathname={pathname} showActiveCheck>
              Home
            </NavLink>
            <MainNavLinks pathname={pathname} showActiveCheck />
          </nav>
          <section className="flex gap-x-4 items-center absolute bottom-4 right-4">
            <SocialLinks />
          </section>
        </section>
      </animated.div>
      {show ? (
        <div className="fixed inset-0 w-screen h-screen bg-slate-800 opacity-50 z-20" />
      ) : null}
    </>
  );
};

export { Drawer };
