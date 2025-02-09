---
title: 'kieranroberts.dev: My New Dev Portfolio Built With Astro, TailwindCSS, and TypeScript'
seoTitle: 'kieranroberts.dev: Portfolio Built with Astro, TailwindCSS, TypeScript'
seoDescription: "A case study on building my developer portfolio 'kieranroberts.dev' using Astro, TailwindCSS, and TypeScript."
datePublished: Thu Jan 16 2025 12:50:52 GMT+0000 (Coordinated Universal Time)
slug: kieranrobertsdev-my-new-dev-portfolio-built-with-astro-tailwindcss-and-typescript
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737027318338/acfb79f0-2716-4dda-94fe-0685082ff2d0.png
# tags: programming, javascript, web-development, webdev, astro
---

I decided to build a new personal developer portfolio for myself. Somewhere to showcase my skills, experience, projects etc. It is now deployed at [kieranroberts.dev](https://kieranroberts.dev/) and I wanted to write up a small case study reflecting on the project. Talk about what went well, what I might do differently next time, and what can be improved. I will also discuss the tech involved and the thinking behind certain decisions.

I’ve had my eye on [Astro](https://astro.build/) for a while, knowing it would be a perfect fit for a simple content-focused site like this. Leveraging TailwindCSS, TypeScript, and Hashnode API’s for the remaining work, here is a look behind the curtain of my new portfolio and how it was put together.

## The ‘final’ product

I’m hesitant to say ‘final’ since it will be iterated on further, but we can say the initial MVP is done:

[kieranroberts.dev](https://kieranroberts.dev/)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1737026220253/3406a601-a1a5-4562-841f-e6f1497bc9ed.png)

## The problem

This a list of notes/requirements I kept in mind before beginning the project:

1. I will be a simple content focused site and minimal dynamic elements.
2. Start out as a simple one-pager.
3. Fast.
4. Accessible.
5. Be search engine optimised.
6. Clean/simple design style to not get bogged down in design hell.
7. Light/dark theme.
8. Free hosting.

## Site content

The page would have the following sections at a minimum:

1. Landing page hero.
2. Career & experience (relevant stuff only with CV download).
3. Blog (recent articles only and a link to the blog).
4. Testimonials
5. Personal projects.
6. Additional achievements.

With that mind, it was time to pick the right tools for the job.

## Tech stack

<details data-node-type="hn-details-summary"><summary>Astro</summary><div data-type="detailsContent">In early 2024 I attended <a target="_self" rel="noopener noreferrer nofollow" href="https://kongresjs.pl/" style="pointer-events: none">Kongres.js</a> in Warsaw, Poland. There were talks on various tools and frameworks. One of which was Astro. Two of its major pluses is that it is optimised for performance SEO, among other things. Astro uses a server-first approach sending lightweight HTML to the browser, removing unnecessary JavaScript. This made it a perfect choice for this project. And in the future, if I decide to move my blog to <code>kieranroberts.dev/blog</code>, Astro would be a great fit for this use case as well so future-proofing is covered.</div></details><details data-node-type="hn-details-summary"><summary>TailwindCSS</summary><div data-type="detailsContent">For styling I like TailwindCSS. I love the speed at which I can build styled elements and I am already very comfortable with Tailwind so it would help speed up the building process. Didn’t feel the need to include use of a UI library at this time.</div></details><details data-node-type="hn-details-summary"><summary>Hashnode GraphQL API’s</summary><div data-type="detailsContent">In order to show a section of my recent blog posts, I would need to fetch the data from the Hashnode GraphQL API’s. I picked graphql-request to handle fetching the data. It’s a simple and lightweight GraphQL client with TypeScript support. I could have skipped it altogether and just used the native <code>fetch</code> but I like opting for this when working with GraphQL. It makes no significant difference to the bundle size here and I anticipate more data fetching in the future.</div></details><details data-node-type="hn-details-summary"><summary>TypeScript</summary><div data-type="detailsContent">Astro is supplemented with TypeScript to provide type-checking. I would always opt for it over plain JavaScript where possible.</div></details><details data-node-type="hn-details-summary"><summary>Cloudflare Pages</summary><div data-type="detailsContent">For deployment I chose Cloudflare Pages with auto deployments from Git. As with many hosting providers, it has simple git integration, previews, and a generous free tier.</div></details>

## The approach

There weren’t any technical challenges with this project so the primary focus was on the UI/UX and delivering a fast and accessible experience.

### How was the Astro experience

This was my first project building with Astro. Overall it was a pleasant experience. The docs are great and adapting to Astro was straightforward. At first I was experimenting using React alongside Astro which is viable with the help of Astro client directives. But I quickly realised React is overkill here. I wanted to take advantage of astro components `.astro` as they render to static HTML without client-side runtime, and so I converted any straggling React into Astro files and removed the React dependencies altogether.

An example of this was a light/dark theme toggle. Initially I wrote this in React but it was simply wasn’t needed and therefore I refactored to plain TypeScript:

```typescript
// ThemeToggle.astro
---
import { Icon } from 'astro-icon/components';
---

<script>
	import { Themes, THEME_STORAGE_KEY } from '../consts/index';
	import type { Theme } from '../env';

	const button = document.getElementById('theme-toggle');

	const theme = (() => {
		if (typeof localStorage !== 'undefined' && localStorage.getItem(THEME_STORAGE_KEY)) {
			return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || Themes.light;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? Themes.dark : Themes.light;
	})();

	const reflectThemePreference = (theme: Theme) => {
		document.documentElement.className = '';
		document.documentElement.classList.add(theme);
		button?.setAttribute('aria-label', `${theme} theme`);
	};

	reflectThemePreference(theme);
	window.localStorage.setItem(THEME_STORAGE_KEY, theme);

	const handleToggleClick = () => {
		const element = document.documentElement;
		const newTheme = element.classList.contains('dark') ? Themes.light : Themes.dark;
		reflectThemePreference(newTheme);
		localStorage.setItem(THEME_STORAGE_KEY, newTheme);
	};

	button?.addEventListener('click', handleToggleClick);
</script>

<button
	id="theme-toggle"
	title="Toggles light & dark theme"
	class="group flex items-center justify-center rounded-full p-1.5"
>
	<span
		class="duration-400 block text-zinc-900 transition-transform ease-in-out group-hover:-rotate-90 dark:text-zinc-50"
	>
		<Icon name="sun" class="block dark:hidden" width="24" height="24" />
		<Icon name="moon" class="hidden dark:block" width="24" height="24" />
	</span>
</button>
```

Removing the React code and dependencies helped reduce the bundle size and ensured I was taking advantage of what Astro offers.

I’m sure as the project grows there will opportunities to explore some of the latest Astro features like Astro Server Islands architecture.

### Design overview

Design is usually the tricky part for me. It’s easy to start experimenting too early and lose time to ideas that didn’t work out. This time I was determined to keep things simple at first and then slowly add extra layers over time.

Because I was not attempting complex design from the start, I decided to skip pre-designing the page in Figma. This is something I have done in the past for small side projects and it helped. But on this occasion I wanted to get my ideas into code as soon as possible.

### **Every site needs a** `button`

One of the earliest things I did was create a simple `button` component with a couple variants. To add some polish I utilised CSS transitions and icon slots. The button is one of the first things you notice on a site, and usually what you click first so I wanted to design a nice version.

### **Navbar UX**

Recently I wrote an article on a specific type of UX for a main site navigation and I decided to opt for this behavior on my portfolio. You can find a tutorial on this with more information here:

[5 tips to level up your React codebase](/blog/5-tips-to-level-up-your-react-codebase)

### **Color scheme**

It’s easy to find a good color scheme. There are countless free tools to help you pick a pre-defined theme. I wanted my primary theme colors to be simple white/dark/gray to keep a clean and modern look. On top of that I added some accent colors to the tailwind config that added a bit more life to the site. They would help bring some ‘pop’ to elements in areas such as focus styling, icons, and background sections.

```javascript
	'accent-darkest': '#6F61C0',
	'accent-dark': '#A084E8',
	'accent-bright': '#8BE8E5',
	'accent-brightest': '#D5FFE4',
```

### Icons

As far as Icons go, I opted to keep a local copy of icons I would use in the repo using `/src/icons`, saving each icon as a `.svg`. There is a package called [astro-icon](<https://www.astroicon.dev/)>) that helps simplify working with icons in Astro projects, this handles embedding the icon.

As far as the icons themselves I opted for icons from the open source project [iconoir](https://iconoir.com/). Largely because of the simple one click copy of the svg code and the large free set of icons available.

If I ever decide to update icons in the future, changing one icon at a time can be easily done.

---

Once those design decisions were made, most of the blockers to writing up core code was done and I could proceed with the build.

## Outcome

### What went well

Overall I am happy with the outcome. The site feels fast thanks to the lack of JavaScript and server first approach of Astro. It scores well across Lighthouse scores which admittedly should be the minimum standard for a site like this.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1736951224836/e2cccefb-f3c6-476a-94f6-665cdc11fbb8.png)

There was some trial and error with the design but I didn’t get stuck iterating on anything for too long. There’s always room for iteration and improvement. I am not a designer but I was able to harness some inspiration and tips from my experience working with a talented design team. An example is that I paid closer attention to text colors/weights than I would have previously, layering in different shades & weights where appropriate.

### What would I do differently next time

I would have avoided beginning the project with React and Astro, and just started with Astro. I had written some components in React initially but soon realised it wasn’t necessary. Likely that since I had been working with React for so long, it was strange to separate initially.

### What can be improved

<details data-node-type="hn-details-summary"><summary>Image handling</summary><div data-type="detailsContent">I will consider moving the images used to a suitable CDN as the project and number of images grows. Currently the images are stored locally alongside the code in <code>src/images</code> where Astro optimises and bundles them. There is likely further optimisation that could be done here.</div></details><details data-node-type="hn-details-summary"><summary>Content</summary><div data-type="detailsContent">I intend to improve upon the content of the site as a main priority. I will be working on some small scale side projects that help make my life easier and that serve as good highlights of my current skills to flesh out the projects section. This section is lacking currently but I’m not interested in filling it out with outdated projects that don’t represent my skills anymore. I will also be writing articles consistently again to add more recent content to the blog.</div></details><details data-node-type="hn-details-summary"><summary>Automate showing new articles</summary><div data-type="detailsContent">Making sure new articles show up without having to do manual cache purging.</div></details>

There are further minor improvements I intend to make to various sections as well.

## Summary

I recently built a new personal developer portfolio for myself using Astro, TailwindCSS, and TypeScript ensuring a fast, accessible site with great SEO. The project focused on simplicity, speed, and clean design and the case study helped me contextualise the project and seek ways to improve. It was a lot of fun to build and I’m excited about all the things I can add and improve upon in the future.

Thanks for reading!
