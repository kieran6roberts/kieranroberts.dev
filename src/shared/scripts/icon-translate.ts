const TRANSLATE_MULTIPLIER = 10;
const SECONDARY_TRANSLATE_MULTIPLIER = 5;
const DAMPING = 0.95;
const SPRING = 0.05;

export function setupIconTranslate({ svgId }: { svgId: string }) {
	// Could add a resize event with debounce, but leaving that for now.
	const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

	if (!isDesktop) {
		return;
	}

	const svg = document.getElementById(svgId);
	const primaryPaths = svg?.querySelectorAll('.animate') as NodeListOf<SVGPathElement>;
	const secondaryPaths = svg?.querySelectorAll('.animate-secondary') as NodeListOf<SVGPathElement>;

	let velocityX = 0;
	let velocityY = 0;
	let targetX = 0;
	let targetY = 0;
	let animationFrame: number;

	const animate = () => {
		// Spring force
		const dx = targetX - velocityX;
		const dy = targetY - velocityY;

		velocityX += dx * SPRING * DAMPING;
		velocityY += dy * SPRING * DAMPING;

		primaryPaths?.forEach((path) => {
			const translateX = velocityX * TRANSLATE_MULTIPLIER;
			const translateY = velocityY * TRANSLATE_MULTIPLIER;
			path.style.transform = `translate(${translateX}px, ${translateY}px)`;
			path.style.transition = 'none';
		});

		secondaryPaths?.forEach((path) => {
			const translateX = -velocityX * SECONDARY_TRANSLATE_MULTIPLIER;
			const translateY = -velocityY * SECONDARY_TRANSLATE_MULTIPLIER;
			path.style.transform = `translate(${translateX}px, ${translateY}px)`;
			path.style.transition = 'none';
		});

		animationFrame = requestAnimationFrame(animate);
	};

	const onMouseMove = (e: MouseEvent) => {
		const { clientX, clientY } = e;

		targetX = (clientX / innerWidth - 0.5) * 5;
		targetY = (clientY / innerHeight - 0.5) * 5;
	};

	animate();

	window.addEventListener('mousemove', onMouseMove);

	window.addEventListener('beforeunload', () => {
		window.removeEventListener('mousemove', onMouseMove);
		cancelAnimationFrame(animationFrame);
	});
}
