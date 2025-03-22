const TRANSLATE_MULTIPLIER = 10;

export function setupIconTranslate({ svgId }: { svgId: string }) {
	// Could add a resize event with debounce, but leaving that for now.
	const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

	if (!isDesktop) {
		return;
	}

	const svg = document.getElementById(svgId);
	const paths = svg?.querySelectorAll('.animate') as NodeListOf<SVGPathElement>;

	let isAnimating = false;

	const onMouseMove = (e: MouseEvent) => {
		if (isAnimating || !paths) {
			return;
		}
		isAnimating = true;

		requestAnimationFrame(() => {
			const { clientX, clientY } = e;

			const mouseX = (clientX / innerWidth - 0.5) * 2;
			const mouseY = (clientY / innerHeight - 0.5) * 2;

			paths.forEach((path) => {
				const translateX = mouseX * TRANSLATE_MULTIPLIER;
				const translateY = mouseY * TRANSLATE_MULTIPLIER;
				path.style.transform = `translate(${translateX}px, ${translateY}px)`;
				path.style.transition = 'transform 150ms ease';
			});

			isAnimating = false;
		});
	};

	window.addEventListener('mousemove', onMouseMove);

	window.addEventListener('beforeunload', () => {
		window.removeEventListener('mousemove', onMouseMove);
	});
}
