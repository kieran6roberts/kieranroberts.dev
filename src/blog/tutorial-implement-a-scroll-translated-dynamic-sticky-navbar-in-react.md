---
title: 'Tutorial: Implement a Scroll-Translated, Dynamic Sticky Navbar in React'
seoTitle: 'React Sticky Navbar Positioned with Scroll Awareness Tutorial'
seoDescription: 'Learn to implement a dynamic, sticky, scroll-aware navbar in React with smooth transitions and accessibility optimization for reduced-motion preferences'
datePublished: Thu Jan 02 2025 12:15:49 GMT+0000 (Coordinated Universal Time)
slug: tutorial-implement-a-scroll-translated-dynamic-sticky-navbar-in-react
cover: https://cdn.kieranroberts.dev/blog/tutorial-implement-a-scroll-translated-dynamic-sticky-navbar-in-react-cover.webp
relatedPosts:
  - 5-tips-to-level-up-your-react-codebase
  - cvrsnapcom-blog-post-cover-image-creator
categories:
  - UI/UX
  - React
---

As a frontend-focused developer, you'll spend a significant portion of your career working on navigation bars. These essential components are integral to almost every modern website and come in various implementations.

In this tutorial we will build a sticky navbar that hides as you scroll down using translation and reappears when you scroll up, based on scroll position calculations. It can provide quite a pleasant navigation experience as it maximizes screen space while keeping important links readily accessible. We will ensure it is accessible, as performant as possible, and leverage React hooks.

Let’s go.

## TLDR

Here’s how the final version functions: [Demo](https://www.loom.com/share/8cc092c9eff1468dafee223d61c698a2)

Here’s the final code:

```typescript
// hooks/useStickyHeader.ts

interface UseStickyHeaderProps {
	elRef: React.RefObject<HTMLElement>;
}

const TRANSLATE_BUFFER = 30; // in pixels
const QUERY_NAME = '(prefers-reduced-motion: no-preference)';

export const useStickyHeader = ({ elRef }: UseStickyScrollProps) => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

	const scrollRef = useRef<{ prevScrollTop: number; animation?: number }>({
		prevScrollTop: 0,
		animation: undefined,
	});

	const getScrollDistance = ({ scrollY }: { scrollY: number }) => {
		const { prevScrollTop } = scrollRef.current;
		return scrollY - prevScrollTop;
	};

	const getHeaderTopValue = () => {
		const headerPosition = elRef.current?.getBoundingClientRect();
		return headerPosition?.top ?? 0;
	};

	const calculateTranslateValue = ({
		headerTop,
		scrollDistance,
	}: {
		headerTop: number;
		scrollDistance: number;
	}) => {
		const navHeight = (elRef.current?.offsetHeight || 0) + TRANSLATE_BUFFER;
		return Math.max(
			Math.min(
				headerTop + (scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)),
				0,
			),
			-navHeight,
		);
	};

	const onTranslate = () => {
		scrollRef.current.animation = requestAnimationFrame(() => {
			const curScrollTop = window.scrollY;
			const scrollDistance = getScrollDistance({ scrollY: curScrollTop });
			const headerTop = getHeaderTopValue();
			const translateAmount = calculateTranslateValue({
				headerTop,
				scrollDistance,
			});

			if (elRef.current) {
				elRef.current.style.transform = `translateY(${amount}px)`;
			}

			scrollRef.current.prevScrollTop = curScrollTop;
		});
	};

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}
		window.addEventListener('scroll', onTranslate);

		return () => {
			window.removeEventListener('scroll', onTranslate);

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
```

```typescript
// Navbar.tsx

import { useRef } from 'react';
import { useStickyHeader } from './hooks/useStickyHeader.ts';

export const Navbar = () => {
  const headerRef = React.useRef<HTMLElement>(null);
  useStickyHeader({ elRef: headerRef });

  return (
    <header
      ref={headerRef}
      className="z-[9999] sticky top-0"
    >
      ...
    </header>
  )
};
```

Here are key features:

1. When scrolling down it should gradually disappear above the fold as you would expect with any `static` positioned element that disappears with viewport scroll.
2. But as soon as you scroll up the slightest bit, it should start to reveal itself again until it’s fully visible in it’s normal `sticky` state.
3. The movement of the navbar will be handled by translating it up and down, we will need to do some calculations based on scroll positions for this.

## Setting Up Basic Navbar Requirements

The first step is to build your desired navbar. If you already have a working navbar on your site, that will work just fine. There are only a couple of things we must ensure for the UX to match what we have in the demo.

For the purpose of the tutorial, I am using Tailwind for styling and also TypeScript, but neither are required.

---

Our navbar will use `sticky` positioning. [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/position) defines sticky positioning as the following:

> The element is positioned according to the normal flow of the document, and then offset relative to its _nearest scrolling ancestor_ and [containing block (nearest block-](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block)level ancestor), including table-related elements, based on the values of `top`, `right`, `bottom`, and `left`. The offset does not affect the position of any other elements.

We will vertically position the navbar at the top of the viewport using `top: 0px`.

Finally we’ll need to track the navbar element for later use when the core logic of the sticky nav is written. We’ll do that by adding a `ref` to the top level element of the navbar component. A high `z-index` value has also been added so the navbar is stacked on top of all other content.

```typescript
export const Navbar = () => {
  const headerRef = React.useRef<HTMLElement>(null);

  return (
    <header
      ref={headerRef}
      className="z-[9999] sticky top-0"
    >
      ...
    </header>
  )
};
```

Those are essential parts your navbar element should replicate. Next up we need to write the core logic for our desired UX. This will be done by writing a custom React hook. The core logic can be adapted to your requirements.

## `useStickyHeader` React Hook

Staying in the `Navbar` component for a second, will use our hook as follows:

```typescript
import { useRef } from 'react';
import { useStickyHeader } from './hooks/useStickyHeader.ts';

export const Navbar = () => {
  const headerRef = React.useRef<HTMLElement>(null);

  useStickyHeader({ elRef: headerRef });

  return (
    <header
      ref={headerRef}
      className="z-[9999] sticky top-0"
    >
      ...
    </header>
  )
};
```

Now we need to create the hook. Create a file called `useStickyHeader.ts` and define the basic outline of the hook:

```typescript
interface UseStickyScrollProps {
	elRef: React.RefObject<HTMLElement>;
}

export const useStickyHeader = ({ elRef }: UseStickyScrollProps) => {};
```

### How Will The Animation Work?

When scrolling down, we are going to translate the navbar upwards to a maximum translation distance of when it’s fully hidden (+ small offset). The navbar is hiding just above the top of the visible viewport so that when you start scrolling up, it immediately starts coming back into view. In that case we translate the navbar down again.

To help illustrate this, in the image below, consider the thick black line to be the top of the visible viewport. Meaning you can’t see anything above that line. This is where the navbar will be positioned when we have scrolled down and hidden the navbar from view. It’s just above the fold and ready to come right back into view.

![Scroll translated dynamic sticky navbar illustration](https://cdn.kieranroberts.dev/blog/tutorial-implement-a-scroll-translated-dynamic-sticky-navbar-in-react-1.webp)

### Implementing Scroll Based Logic

To do this precisely requires some calculations taking into account the distance that has been scrolled since the last check. Therefore we’ll make use of a `scroll` event listener. Let’s add this to our hook.

```typescript
interface UseStickyHeaderProps {
	elRef: React.RefObject<HTMLElement>;
}

export const useStickyHeader = ({ elRef }: UseStickyScrollProps) => {
	const onTranslate = () => {};

	useEffect(() => {
		window.addEventListener('scroll', onTranslate);

		return () => {
			window.removeEventListener('scroll', onTranslate);
		};
	}, []);
};
```

The `scroll` event listener was added inside a `useEffect` that will run on mount. Make sure to cleanup the event listener when unmounting, that’s what the `return` statement of a `useEffect` is for. An empty `onTranslate` function has also been created for use as the callback for the listener. Logic will be added there shortly.

Next up we need to write out translating code. For that we need to do some calculations. We need to know the number of pixels the document is currently scrolled vertically. This is given by `window.scrollY`.

Next we calculate how far we have scrolled since the last time the `onTranslate` function ran. It’s important to note that the `scroll` listener is not going to fire the `onTranslate` callback for every `1px` scrolled. The distance scrolled can be variable.

By tracking the `window.scrollY` value, we have access to the previous state when calculating the new translation value. A positive value means the user is scrolling down, a negative value means the user is scrolling up.

Let’s put this logic into action. Inside the hook we will write another function `getScrollDistance`:

```typescript
// Define a ref in the hook to keep track of previous scroll top value
const scrollRef = useRef<{ prevScrollTop: number }>({
	prevScrollTop: 0,
});

// Calculate the distance change from previous check
const getScrollDistance = ({ scrollY }: { scrollY: number }) => {
	const { prevScrollTop } = scrollRef.current;
	return scrollY - prevScrollTop;
};
```

and then call this function as part of `onTranslate`:

```typescript
const onTranslate = () => {
	const curScrollTop = window.scrollY;
	const scrollDistance = getScrollDistance({ scrollY: curScrollTop }); // We will use this in a moment

	scrollRef.current.prevScrollTop = curScrollTop; // Track our scroll top value
};
```

Another required value is the current vertical position of the navbar relative to the viewport. Create a function called `getHeaderTopValue` for this:

```typescript
const getHeaderTopValue = () => {
	const headerPosition = elRef.current?.getBoundingClientRect();
	return headerPosition?.top ?? 0; // ?? 0 is just a fallback in case the ref was not found
};
```

### Calculation Pseudocode

With that, all the information is ready to calculate the exact translation value. Before the calculation is written in code, let’s see it in pseudocode to understand what is happening:

```plaintext
Given:
- headerTop: current position of header from top of viewport
- scrollDistance: how far user has scrolled (positive = down, negative = up)
- navHeight: height of navigation + buffer

Step 1: Calculate scroll adjustment

IF scrollDistance is negative (scrolling up)
    adjustment = +|scrollDistance|    // Move header downward
ELSE (scrolling down)
    adjustment = -|scrollDistance|    // Move header upward

Step 2: Calculate new position

newPosition = headerTop + adjustment

Step 3: Clamp the value

maxValue = 0                         // Header can't go above viewport
minValue = -navHeight               // Header can't hide more than its height
finalPosition = CLAMP(newPosition, minValue, maxValue)
```

### Calculate Translate Value

Implementing the pseudocode, we end our with our translation value:

```typescript
const TRANSLATE_BUFFER = 30; // in pixels

const calculateTranslateValue = ({
	headerTop,
	scrollDistance,
}: {
	headerTop: number;
	scrollDistance: number;
}) => {
	const navHeight = (elRef.current?.offsetHeight || 0) + TRANSLATE_BUFFER;
	return Math.max(
		Math.min(
			headerTop + (scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)),
			0,
		),
		-navHeight,
	);
};
```

The `TRANSLATE_BUFFER` is not essential but I think it helps with the smoothness of the UX. It adds a small offset so the navbar is an extra 30px above the visible viewport. You can experiment with that value.

Implementing the translation calculation in `onTranslate`:

```typescript
const onTranslate = () => {
	const curScrollTop = window.scrollY;
	const scrollDistance = getScrollDistance({ scrollY: curScrollTop });
	const headerTop = getHeaderTopValue();
	const translateAmount = calculateTranslateValue({
		headerTop,
		scrollDistance,
	});

	scrollRef.current.prevScrollTop = curScrollTop;
};
```

The final step important is to actually perform the css translation with our calculated value. All we have to do is to use the navbar `ref` we defined earlier and update its `style.transform` property:

```typescript
const onTranslate = () => {
	requestAnimationFrame(() => {
		const curScrollTop = window.scrollY;
		const scrollDistance = getScrollDistance({ scrollY: curScrollTop });
		const headerTop = getHeaderTopValue();
		const translateAmount = calculateTranslateValue({
			headerTop,
			scrollDistance,
		});

		if (elRef.current) {
			// Move the navbar up or down in pixels
			elRef.current.style.transform = `translateY(${amount}px)`;
		}

		scrollRef.current.prevScrollTop = curScrollTop;
	});
};
```

Notice we wrap the entire function with the `window.requestAnimationFrame` method which tells the browser you wish to perform an animation. It requests the browser to call a user-supplied callback function before the next repaint.

This performance optimization helps prevents multiple unnecessary calculations within the same frame. Scroll events can fire at a very high rate so we need to optimise the performance. For example, if a user scrolls quickly triggering 100 or more scroll events in a timeframe of say 20ms, `requestAnimationFrame` will consolidate these into a single frame update. We can ensure our animations remain smooth at the optimal frame rate the device used by the user.

Let’s also expand the scroll `ref` to eventually allow animation cancelling:

```typescript
const scrollRef = useRef<{ prevScrollTop: number; animation?: number }>({
	prevScrollTop: 0,
	animation: undefined,
});
```

and then set a reference for our `requestAnimationFrame` callback using `scrollRef.current.animation`:

```typescript
const onTranslate = () => {
	scrollRef.current.animation = requestAnimationFrame(() => {
		const curScrollTop = window.scrollY;
		const scrollDistance = getScrollDistance({ scrollY: curScrollTop });
		const headerTop = getHeaderTopValue();
		const translateAmount = calculateTranslateValue({
			headerTop,
			scrollDistance,
		});

		if (elRef.current) {
			// Move the navbar up or down in pixels
			elRef.current.style.transform = `translateY(${amount}px)`;
		}

		scrollRef.current.prevScrollTop = curScrollTop;
	});
};
```

This now allows clean animation cancelling in `useEffect` cleanup:

```typescript
useEffect(() => {
	window.addEventListener('scroll', onTranslate);

	return () => {
		window.removeEventListener('scroll', onTranslate);
		if (scrollRef.current.animation) {
			cancelAnimationFrame(scrollRef.current.animation);
		}
	};
}, []);
```

Cancelling the animation frame is necessary because if the component unmounts while an animation frame is pending, you might end up trying to run `onTranslate` on an unmounted component which will probably lead to errors on memory leaks.

### Considering `prefers-reduced-motion` CSS Media Feature

An improvement we can make to the hook is to consider users to prefer to reduce animations when visiting sites. `prefers-reduced-motion` is a CSS media feature in this vein and here is how it described as per [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion):

> The `prefers-reduced-motion` [CSS me](https://developer.mozilla.org/en-US/docs/Web/CSS)[dia feature is used to d](https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features)etect if a user has enabled a setting on their device to minimize the amount of non-essential motion. The setting is used to convey to the browser on the device that the user prefers an interface that removes, reduces, or replaces motion-based animations.

The transitioning being performed on the navbar may be unwanted by users who prefer to be without animations. We can make use of this media query in the hook and prevent the translate from happening if they have this set on their device. Instead the header will just remain in a regular `sticky` state.

Here’s the additional logic for checking the user’s preference:

```typescript
const QUERY_NAME = '(prefers-reduced-motion: no-preference)';

// Default to true
const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

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
```

Here the user’s system setting is checked with `window.matchMedia("(prefers-reduced-motion: no-preference)")`. Specifically checking if they don’t have a preference with `prefers-reduced-motion: no-preference` and if it doesn’t match, we know they prefer to have reduced motion, hence we keep `setPrefersReducedMotion` to `true`.

Now all we have to do is prevent the scroll listeners from doing their magic in the case where the user wants to prevent animations.

```typescript
useEffect(() => {
	if (prefersReducedMotion) {
		return;
	}
	window.addEventListener('scroll', onTranslate);

	return () => {
		window.removeEventListener('scroll', onTranslate);

		if (scrollRef.current.animation) {
			cancelAnimationFrame(scrollRef.current.animation);
		}
	};
}, [prefersReducedMotion]);
```

Note we also need to add `prefersReducedMotion` to the dependency array so that changes to the value re-trigger the effect.

And that’s all! Now you should have an accessible, optimized, scroll-positioned navbar with a smooth transition.

You could also extract the media query logic into a separate hook for use elsewhere, or open up our hook for use with other components. Feel free to experiment!

## Final Implementation

Here is the full implementation:

```typescript
// hooks/useStickyHeader.ts

interface UseStickyHeaderProps {
	elRef: React.RefObject<HTMLElement>;
}

const TRANSLATE_BUFFER = 30; // in pixels
const QUERY_NAME = '(prefers-reduced-motion: no-preference)';

export const useStickyHeader = ({ elRef }: UseStickyScrollProps) => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

	const scrollRef = useRef<{ prevScrollTop: number; animation?: number }>({
		prevScrollTop: 0,
		animation: undefined,
	});

	const getScrollDistance = ({ scrollY }: { scrollY: number }) => {
		const { prevScrollTop } = scrollRef.current;
		return scrollY - prevScrollTop;
	};

	const getHeaderTopValue = () => {
		const headerPosition = elRef.current?.getBoundingClientRect();
		return headerPosition?.top ?? 0;
	};

	const calculateTranslateValue = ({
		headerTop,
		scrollDistance,
	}: {
		headerTop: number;
		scrollDistance: number;
	}) => {
		const navHeight = (elRef.current?.offsetHeight || 0) + TRANSLATE_BUFFER;
		return Math.max(
			Math.min(
				headerTop + (scrollDistance < 0 ? Math.abs(scrollDistance) : -Math.abs(scrollDistance)),
				0,
			),
			-navHeight,
		);
	};

	const onTranslate = () => {
		scrollRef.current.animation = requestAnimationFrame(() => {
			const curScrollTop = window.scrollY;
			const scrollDistance = getScrollDistance({ scrollY: curScrollTop });
			const headerTop = getHeaderTopValue();
			const translateAmount = calculateTranslateValue({
				headerTop,
				scrollDistance,
			});

			if (elRef.current) {
				elRef.current.style.transform = `translateY(${amount}px)`;
			}

			scrollRef.current.prevScrollTop = curScrollTop;
		});
	};

	useEffect(() => {
		if (prefersReducedMotion) {
			return;
		}
		window.addEventListener('scroll', onTranslate);

		return () => {
			window.removeEventListener('scroll', onTranslate);

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
```

```typescript
// Navbar.tsx

import { useRef } from 'react';
import { useStickyHeader } from './hooks/useStickyHeader.ts';

export const Navbar = () => {
  const headerRef = React.useRef<HTMLElement>(null);
  useStickyHeader({ elRef: headerRef });

  return (
    <header
      ref={headerRef}
      className="z-[9999] sticky top-0"
    >
      ...
    </header>
  )
};
```

## Summary

In conclusion, implementing a scroll-translated, dynamic sticky navbar in React can bring a nice touch to your website. By leveraging React hooks and considering user preferences for reduced motion, developers can create a smooth, responsive, and accessible navigation experience.

Feel free to share the article if it was helpful.
