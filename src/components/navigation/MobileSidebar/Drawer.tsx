import { useSpring, animated } from "react-spring";
import { useClickAway, useWindowSize } from "@uidotdev/usehooks";
import { XMarkSVG } from "@components/icons";
import * as React from "react";

import { useBoop } from "@hooks/useBoop";

import { LockBodyScroll } from "@components/navigation/MobileSidebar/LockBodyScroll";

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
        <section className="w-full h-full z-10 bg-white dark:bg-[#100114]">
          <button
            aria-label="Close sidebar navigation"
            onClick={closeDrawer}
            className={`absolute top-5 right-5 p-1.5 text-black dark:text-white link-focus rounded-full icon-button-hover`}
            onMouseEnter={handleBoopTrigger}
          >
            <animated.span
              className="block w-6 h-6 text-black dark:text-white"
              {...(styleToApplyOnBoop && { style: styleToApplyOnBoop })}
            >
              <XMarkSVG />
            </animated.span>
          </button>

          <nav
            id="sidebar-nav"
            className="flex flex-col h-full p-8 justify-center items-start gap-y-16"
          >
            <NavLink
              href="/"
              pathname={pathname}
              showActiveCheck
              prefetchStrategy="hover"
            >
              Home
            </NavLink>
            <NavLink
              href="/blog"
              pathname={pathname}
              showActiveCheck
              prefetchStrategy="hover"
            >
              Blog
            </NavLink>
            <NavLink
              href="https://www.linkedin.com/in/kieran-roberts-00517b178/"
              isExternal
            >
              LinkedIn
            </NavLink>
            <NavLink href="https://github.com/kieran6roberts" isExternal>
              GitHub
            </NavLink>
            <NavLink href="https://twitter.com/Kieran6dev" isExternal>
              X
            </NavLink>
          </nav>
        </section>
      </animated.div>
      {show ? (
        <div className="fixed inset-0 w-screen h-screen bg-slate-800 opacity-50 z-20" />
      ) : null}
    </>
  );
};

export { Drawer };
