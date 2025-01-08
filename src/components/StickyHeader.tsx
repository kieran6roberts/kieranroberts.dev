import { useStickyScroll } from '@hooks/useStickyHeader';
import * as React from 'react';

export const StickyHeader = ({ children }: { children: React.ReactNode }) => {
	const headerRef = React.useRef<HTMLElement>(null);

	useStickyScroll({ elRef: headerRef });
	return (
		<header ref={headerRef} className="sticky top-4 z-[9999] mx-4">
			{children}
		</header>
	);
};
