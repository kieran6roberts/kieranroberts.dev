import { useState, useEffect, useRef } from 'react';
import { create } from 'zustand';
import { usePrefersReducedMotion } from "@hooks/usePrefersReducedMotion";

interface Props {
  elRef: React.RefObject<HTMLElement>;
  prefersReducedMotion?: boolean;
}

const updateNavStyle = () => {
  const canUpdate = document.documentElement.clientWidth >= 768;
  return canUpdate;
};

const debounce = (mainFunction: Function, delay: number) => {
  let timer: any;

  return function (...args: any) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      mainFunction(...args);
    }, delay);
  };
};

export const useStickyNavElement = create<{
  element: HTMLElement | null;
  setElement: (el: HTMLElement) => void;
  setPositioning: (type: 'sticky' | 'relative') => void;
  translateElement: (by: 'zero' | 'full') => void;
}>((set, get) => ({
  element: null,
  setElement: (el) => {
    set({ element: el });
  },
  setPositioning: (type) => {
    const { element } = get();
    if (element && updateNavStyle()) {
      requestAnimationFrame(() => {
        element.style.position = type;
      });
    }
  },
  translateElement: (by: 'zero' | 'full') => {
    const { element } = get();
    if (element && updateNavStyle()) {
      requestAnimationFrame(() => {
        element.style.transform = `translateY(${by === 'zero' ? '0' : '-100'}%)`;
      });
    }
  },
}));

const useStickyScroll = ({ elRef, prefersReducedMotion }: Props) => {
  const [shouldAddScroll, setShouldAddScroll] = useState(false);
  const { setElement } = useStickyNavElement();

  const scrollRef = useRef<{ prevScrollTop: number; animation?: number }>({
    prevScrollTop: 0,
  });

  const getHeaderTopValue = () => {
    const headerPosition = elRef.current?.getBoundingClientRect();
    return headerPosition?.top || 0;
  };

  const performTranslate = (amount: number) => {
    if (elRef.current) {
      elRef.current.style.transform = `translateY(${amount}px)`;
    }
  };

  const getScrollDistance = () => {
    const { prevScrollTop } = scrollRef.current;
    const curScrollTop = window.scrollY;
    return curScrollTop - prevScrollTop;
  };

  const calculateTranslateValue = ({ headerTop, scrollDistance }: { headerTop: number; scrollDistance: number }) => {
    const navHeight = (elRef.current?.offsetHeight || 0) + 30;
    return Math.max(
      Math.min(headerTop + (scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)) * 1, 0),
      -navHeight,
    );
  };

  const handleTranslate = () => {
    const curScrollTop = window.scrollY;

    const headerTop = getHeaderTopValue();
    const scrollDistance = getScrollDistance();
    const translateAmount = calculateTranslateValue({ headerTop, scrollDistance });

    performTranslate(translateAmount);
    scrollRef.current.prevScrollTop = curScrollTop;
  };

  const handleNavScroll = () => {
    scrollRef.current.animation = requestAnimationFrame(handleTranslate);
  };

  useEffect(() => {
    if (!elRef.current) return;
    setElement(elRef.current);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    if (shouldAddScroll) {
      window.addEventListener('scroll', handleNavScroll, { passive: true });
    } else {
      window.removeEventListener('scroll', handleNavScroll);
      if (elRef.current) elRef.current.style.transform = 'translateY(0px)';
    }
    
    return () => {
      window.removeEventListener('scroll', handleNavScroll);
      if (scrollRef.current.animation) cancelAnimationFrame(scrollRef.current.animation);
    };
  }, [shouldAddScroll, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const handleResize = debounce(() => {
      setShouldAddScroll(window.innerWidth >= 768);
    }, 0);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);
};

export default useStickyScroll;
