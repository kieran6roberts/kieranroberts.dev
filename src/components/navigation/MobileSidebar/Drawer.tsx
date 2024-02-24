import { useSpring, animated } from "react-spring";
import { useClickAway, useWindowSize } from "@uidotdev/usehooks";
import { Xmark } from "iconoir-react";
import * as React from "react";

import { useBoop } from "../../../hooks/useBoop";

import { MainNavLinks } from "../MainNavLinks";
import { LockBodyScroll } from "./LockBodyScroll";

import {
  getFocusableElements,
  handleTabKeyPress,
  handleEscapeKey,
} from "../../../utils/accessibility";
import { NavLink } from "../NavLink";

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

  const [style, trigger] = useBoop({ rotation: 10 });

  const styles = useSpring({
    left: show ? window.innerWidth - 350 : window.innerWidth,
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    height: "100vh",
    width: "350px",
    zIndex: 50,
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
        <section className="w-full h-full bg-white dark:bg-slate-800 z-50">
          <button
            onClick={closeDrawer}
            className="flex items-center justify-center absolute top-5 right-5 p-1.5 link-focus rounded-full icon-button-hover"
            onMouseEnter={trigger as any}
          >
            <animated.span style={style as any}>
              <Xmark width={24} height={24} />
            </animated.span>
          </button>

          <nav
            id="sidebar-nav"
            className="flex flex-col h-full p-8 justify-center items-start gap-y-20"
          >
            <NavLink href="/" pathname={pathname} showActiveCheck>
              Home
            </NavLink>
            <MainNavLinks pathname={pathname} showActiveCheck />
          </nav>
        </section>
      </animated.div>
      {show ? (
        <div className="absolute inset-0 w-full h-full bg-slate-800 opacity-50 z-10" />
      ) : null}
    </>
  );
};

export { Drawer };
