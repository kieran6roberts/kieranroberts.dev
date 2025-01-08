import { useEffect, useRef, useState } from 'react';

const TRANSLATE_BUFFER = 30;
const QUERY_NAME = '(prefers-reduced-motion: no-preference)';

interface UseStickyScrollProps {
	elRef: React.RefObject<HTMLElement>;
}

export const useStickyScroll = ({ elRef }: UseStickyScrollProps) => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

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

	const calculateTranslateValue = ({
		headerTop,
		scrollDistance,
	}: {
		headerTop: number;
		scrollDistance: number;
	}) => {
		const navHeight = (elRef.current?.offsetHeight || 0) + TRANSLATE_BUFFER;
		const topOffset = 16;

		return Math.max(
			Math.min(
				headerTop -
					topOffset +
					(scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)) * 1,
				0,
			),
			-navHeight,
		);
	};

	const handleTranslate = () => {
		const curScrollTop = window.scrollY;
		const scrollDistance = getScrollDistance();
		const headerTop = getHeaderTopValue();
		const translateAmount = calculateTranslateValue({
			headerTop,
			scrollDistance,
		});
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
		window.addEventListener('scroll', handleNavScroll);

		return () => {
			window.removeEventListener('scroll', handleNavScroll);
			if (scrollRef.current.animation) cancelAnimationFrame(scrollRef.current.animation);
		};
	}, [prefersReducedMotion]);

	useEffect(() => {
		const mediaQueryList = window.matchMedia(QUERY_NAME);

		setPrefersReducedMotion(!mediaQueryList.matches);

		const updateMotionSettings = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(!event.matches);
		};

		mediaQueryList.addEventListener('change', updateMotionSettings);

		return () => {
			mediaQueryList.removeEventListener('change', updateMotionSettings);
		};
	}, []);
};
