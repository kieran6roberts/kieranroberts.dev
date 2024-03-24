import { useState, useEffect, useRef } from 'react';
import { debounce } from '@utils/debounce';

const TRANSLATE_RESET = 'translateY(0px)';
const TRANSLATE_BUFFER = 30;

interface UseStickyScrollProps {
  elRef: React.RefObject<HTMLElement>;
  prefersReducedMotion?: boolean;
}

const useStickyScroll = ({ elRef, prefersReducedMotion }: UseStickyScrollProps) => {
  const [shouldAddScroll, setShouldAddScroll] = useState(false);

  const scrollRef = useRef<{ prevScrollTop: number; animation?: number }>({
    prevScrollTop: 0,
  });

  const getHeaderTopValue = () => {
    const headerPosition = elRef.current?.getBoundingClientRect();
    return headerPosition?.top ?? 0;
  };

  const performTranslate = (amount: number) => {
    if (elRef.current) elRef.current.style.transform = `translateY(${amount}px)`;
  };

  const getScrollDistance = () => {
    const { prevScrollTop } = scrollRef.current;
    const curScrollTop = window.scrollY;
    return curScrollTop - prevScrollTop;
  };

  const calculateTranslateValue = ({ headerTop, scrollDistance }: { headerTop: number; scrollDistance: number }) => {
    const navHeight = (elRef.current?.offsetHeight || 0) + TRANSLATE_BUFFER;
    return Math.max(
      Math.min(headerTop + (scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)) * 1, 0),
      -navHeight,
    );
  };

  const handleTranslate = () => {
    const curScrollTop = window.scrollY;
    const scrollDistance = getScrollDistance();
    const headerTop = getHeaderTopValue();
    const translateAmount = calculateTranslateValue({ headerTop, scrollDistance });
    performTranslate(translateAmount);
    scrollRef.current.prevScrollTop = curScrollTop;
  };

  const handleNavScroll = () => {
    scrollRef.current.animation = requestAnimationFrame(handleTranslate);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    if (shouldAddScroll) {
      window.addEventListener('scroll', handleNavScroll);
    } else {
      window.removeEventListener('scroll', handleNavScroll);
      if (elRef.current) elRef.current.style.transform = TRANSLATE_RESET ;
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
