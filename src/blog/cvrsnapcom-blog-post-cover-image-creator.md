---
title: 'cvrsnap.com: Blog post cover image creator to help you publish quicker'
seoTitle: 'CvrSnap: The blog post cover image creator'
seoDescription: 'Create custom blog post cover images quickly with CvrSnap. Save time designing and publish faster with this free online tool'
datePublished: Fri Jan 31 2025 08:04:26 GMT+0000 (Coordinated Universal Time)
cuid: cm6khaed0000c09jydgxbhukr
slug: cvrsnapcom-blog-post-cover-image-creator
cover: https://cdn.kieranroberts.dev/cvrsnapcom-blog-post-cover-image-creator%20(1).webp
relatedPosts:
  - kieranrobertsdev-my-new-dev-portfolio-built-with-astro-tailwindcss-and-typescript
  - 5-tips-to-level-up-your-react-codebase
# tags: aws, programming, javascript, web-development, reactjs
---

Introducing [cvrsnap.com](https://cvrsnap.com/) 🫰.

CvrSnap is a free tool I recently built as a small side project and it lets you quickly create blog post cover images that you can download as a PNG. It’s designed to help you build something that looks good quickly so you can spend less time designing, and more time publishing. You can customise foreground text and it’s layout, customise the background, choose provided download dimensions, and more. The editor persists your progress if you need take a pause. Behind the scenes CvrSnap is a 1 page client-side React app built using React Router v7, TypeScript, MantineUI, Zustand, IndexedDB, and SST to provision the services Amazon CloudFront, Amazon S3, and Amazon Route 53.

I wanted to share the tool with all of you in case it can be of use to you, and also write a little case study for the project. If you are in need of a nice cover image for your next blog post, please do try it out and let me know if there’s anything else you would want to make your ideal cover image as quickly as possible. You can reach out to me [@Kieran6Dev](https://x.com/Kieran6dev), [on LinkedIn](https://www.linkedin.com/in/kieran6roberts/), or through the comments here.

## Why did I build this tool?

A blog post cover image is something I need every time I write a new post. I don’t have a current template designed (somewhere like Figma) for me to re-use across my posts and I don’t want to spend the time designing one because I always find it difficult to settle on something when starting from nothing. I just want to visit some domain, click a few buttons and be done with it. You might ask:

> But wouldn’t it take longer to build the app than to design a new cover template in Figma

Yes. But I am a developer and I thought this would be more fun. Plus it might be useful to someone else.

I don’t care about elaborate blog cover images for my own posts. As long as the title is in the image, and maybe my name as the author. Generic cover images from the internet (Unsplash as an example) are also something I don’t care for. With that in mind I set out to build a simple, clean editing user interface where I could go anytime I needed a new blog cover image.

## Who is the tool for?

- Someone who needs a good looking blog cover image with text as the primary foreground, usually for the blog title and author (you can remove the text if you so choose).
- You don't want a generic cover image from an internet image platform.
- You don't want to spend hours starting from scratch using a design tool. You just want to pick some preset templates, maybe change some font settings etc.
- You want to do all of this in a modern and user-friendly editor.

CvrSnap is also **free**.

## The live site

[cvrsnap.com](https://cvrsnap.com/)

[codebase](https://github.com/kieran6roberts/cvrsnap) - (If you like and use the app, take a second to give it a star on GitHub)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738260283581/8b8f19c5-e1e1-4e5d-8731-0a25c25cd1bd.png)

## CvrSnap example covers

Here are some example covers images I quickly built using CvrSnap:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738256980613/4cce1ea1-931f-465b-af77-cf336fde8f1c.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738256774691/d51814e7-27e4-4a91-b904-832106879a7f.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738260053093/e708767c-f382-4ef4-91b7-c67eedbdeecc.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738260073501/ba7bb351-aae0-49e6-afee-f064317a0114.png)

## Requirements

1. A very simple landing page
2. Editing interface
3. Minimum set of customisation options to start with.

   1. Text placement, size, font, etc.
   2. Background colors, templates, images etc.

4. 1 click image download in PNG format that accurately resembles the preview.
5. An editor that would persist the selected design options.
6. Different download size options.
7. Light/dark theme toggle.

## Tech Stack

- [React Router v7](https://reactrouter.com/home)
- [TypeScript](https://www.typescriptlang.org/)
- [`html-to-image`](https://www.npmjs.com/package/html-to-image)
- [MantineUI](https://mantine.dev/)
- [SST](https://sst.dev/)
  - [Amazon CloudFront](https://aws.amazon.com/cloudfront/)
  - [Amazon S3](https://aws.amazon.com/s3/)
  - [Amazon Route 53](https://aws.amazon.com/route53/)

## Build Specifics

### React Router v7 & the rendering approach

The backbone of the app is built using React Router v7. I started out development in an SSR approach using React Router as a framework. But during development I realised it would be better served as a single page client side application. There would be no sever side data fetching requirements from external API’s or databases. The key for a dashboard type app is to optimise for snappy UI and quick transitions. SSR has been pushed as a ‘default’ for a little while now but I don’t believe it’s necessary in all cases, and overkill (possibly a little detrimental) here.

The new version of React Router was a little confusing to me at first because you can decide to run it as full framework, or as a simple routing library. I think there’s work that can be done to better explain this product now it’s merged with [Remix](https://remix.run/). Currently CvrSnap is running using React Router as a framework with `SRR: false` in the React Router config to specify we intend to use a single page client rendering strategy. This is primarily due to the fact I started out the app in framework mode without settling on the preferred rendering strategy.

I will likely refactor to use React Router simply as a routing library instead of the framework option currently in use. I believe this is usually how you would adopt a single page with React Router as described [here](https://reactrouter.com/home#react-router-as-a-library). I’m currently putting together a small starter kit (not done) for the the tech behind CvrSnap and I have implemented React Router simply for routing there as a trial run which looks good.

Outside of how the client side rendering is approached here, I am happy with the decision to prefer it to SSR for now.

### The persistent editor: Zustand + IndexedDB

Before building the app, I knew I wanted to persist the editor state for the user. If the user navigates to a different page, or away from the app, when they come back they should see the same design they left behind.

It’s quite frustrating to use apps in this realm that don’t persist your progress. You make some changes, think you are done and finish up, then realise you actually want to adjust something.

<div data-node-type="callout">
<div data-node-type="callout-emoji">🤦</div>
<div data-node-type="callout-text">Whoops, now you have to start all over again.</div>
</div>

CvrSnap does not have user authentication, and doesn’t need it. Also no external database storage beyond browser based storage. Since no sensitive data needs to be persisted, browser storage becomes a nice solution for the needs of the app. The data that does need to be persisted is simply non-sensitive arbitrary numbers and strings, corresponding to text content, font sizes etc.

#### IndexedDB

The core of the editor state is persisted using IndexedDB. IndexedDB is simply an API for client-side storage of a large amount of structured data. I preferred this option for storing the current cover preview state over `Window.localStorage` for a few key reasons:

1. I would be writing to the storage quite often (as cover settings are updated). Local storage updates are synchronous: blocking the main thread with reads and writes. Therefore performance would likely take a hit.
2. IndexedDB allows structured data which I would would be working with (objects) without requiring it to be serialised.
3. IndexedDB can store larger amounts of data, something which might become relevant as the app grows.

`Window.localStorage` is however utilised for a couple of small scale settings like the sidebar open state and sidebar open sections states.

All the current settings of the active cover image preview are saved using IndexedDB in combination with the state management tool Zustand.

<div data-node-type="callout">
<div data-node-type="callout-emoji">💡</div>
<div data-node-type="callout-text">The only editor state that is not currently persisted are user uploaded images. Users can upload their own image to the background. I didn’t want to persist personal images mostly for privacy reasons.</div>
</div>

Zustand is simply a small, fast, barebones state management tool. When you navigate on the client between the `/` page and `/create` page, that is Zustand persisting your current editor state. I have integrated Zustand with the `persist` middleware from `zustand/middleware`, allowing you to store the Zustand state in a storage option of your choice. You can see this in effect after you perform the initial page load.

To demonstrate the approach, here is a simplified solution:

```javascript
import { create } from 'zustand';
import { get, set, del } from 'idb-keyval';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';

// Interact with IndexedDB using the promise based keyval store 'idb-keyval'
const indexDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) ?? null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  }
};


export const useStore = create(
  {
   hasHydrated: false,
   setHasHydrated: (state) => set({ hasHydrated: state }),
   // Rest of the state initialisation + update functions

  },
  {
      name: 'editor-storage',
      storage: createJSONStorage(() => indexDBStorage),
      // Pick the state you want to persist.
      partialize: (state) => ({
        template: state.template,
        primaryText: state.primaryText,
      }),
      // Updating version becomes useful when we have breaking changes
      version: 1,
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          // do something
        } else if (state) {
          state.setHasHydrated(true);
        }
      }
    }
)
```

One thing to note about persisting the state in IndexedDB is that the operations are asynchronous. This means the store is hydrated from IndexedDB some time later after store creation (after initial render). Therefore, there is a slight delay in having this data available in the editor. When the storage has been successfully hydrated in the `onRehydrateStorage` function, we set the `hasHydrated` state to `true` and use it wherever it’s needed.

### Dom to image handling

I experimented with several different packages that allow me to capture a DOM node as an image and saw mixed results. I settled on [html-to-image](https://www.npmjs.com/package/html-to-image) for the time being. So far it seems to be the most accurate representation of the DOM I have, with minimal configuration Crucially I was also able to capture `clip-path` elements correctly using html-to-image, an alternative solution I also was experimenting with ([html2canvas](https://html2canvas.hertzen.com/)) did not support this. The background templates make use of the CSS property `clip-path` to create custom backgrounds so this was a dealbreaker. There’s still some optimisation and experimenting I want to do to optimise the final images.

The logic behind downloading the PNG is pretty simple. The PNG image blob is generated from the DOM with `htmlToImage.toBlob`, setting the intended dimensions, quality etc. Then the blob is downloaded on the client with the help of [file-saver](https://www.npmjs.com/package/file-saver): `fs.saveAs(blob, 'cvrsnap-cover.png')`

### MantineUI

I wasn’t looking to spend time writing custom UI elements and design specs for this app. Since there might be some very interactive UI also, I decided to integrate a UI component library. I read good things about the React component library [MantineUI](https://mantine.dev/) and decided it would be a good fit for the project to get things done quicker. It’s open source, TypeScript based, and adaptable to various modern Frameworks. The component list of it’s core library is extensive and I would need to utilise several different various complex element compositions in the app.

CSS modules is recommended alongside Mantine and that’s what I went for, using CSS variables where helpful. From someone who enjoys TailwindCSS as my primary tool, I was missing it a little here but it was also nice to write regular CSS again. Something which I have not done for a while.

### Infrastructure

The last piece of the puzzle is the infrastructure. It’s been a long time since I had to deploy a client side single page application and I was open to exploring different possibilities.

Recently I have been diving into learning and building in the cloud using AWS. [Amazon CloudFront](https://aws.amazon.com/cloudfront/), [Amazon S3](https://aws.amazon.com/s3/), and [Amazon Route 53](https://aws.amazon.com/route53/) are some of the services I have been exploring and I set on deploying the site this way. What are these services:

- **CloudFront** is a web service that speeds up distribution of your static and dynamic web content.
- **S3** is an object storage service where you can store data inside containers called buckets.
- **Route 53** is a highly available and scalable cloud domain name system (DNS) service.

While I had been experimenting and learning so far mostly using the AWS web interface, for CvrSnap I wanted to define the infrastructure as code (IaC). I briefly thought about using the [AWS Cloud Development Kit (AWS CDK)](https://docs.aws.amazon.com/cdk/v2/guide/home.html) before coming across the [Serverless Stack (SST](https://sst.dev/)) and deciding that would be a nice approach. SST is a framework where you define everything your full-stack app needs in code and SST abstracts away a significant amount of the infra configuration and provisioning. Even more so than the AWS CDK. I though this would help me get to production quicker as I am not yet proficient in provisioning resources using the CDK despite working in and around CDK apps a little, then I could explore the CDK at a later date.

This article on [AWSFundamentals](https://blog.awsfundamentals.com/) has a great section detailing IaC, AWS CDK, and the benefits of SST if you want more information: [blog.awsfundamentals.com/social-stats-dashboard-sst-nextjs#heading-serverless-stack-sst](https://blog.awsfundamentals.com/social-stats-dashboard-sst-nextjs#heading-serverless-stack-sst)

Infra provisioning for the static site is taken care of by SST during deployment using a few simple lines of code:

```javascript
// infra/web.ts
import { config } from '../config';

export const frontend = new sst.aws.StaticSite('Frontend', {
	path: 'packages/frontend',
	build: {
		output: 'build/client',
		command: 'pnpm build',
	},
	indexPage: 'index.html',
	domain:
		$app.stage === 'production'
			? {
					name: config.domain,
					redirects: [`www.${config.domain}`],
				}
			: undefined,
});
```

I have also taken the time to dive into what SST does behind the scenes when calling `sst.aws.StaticSite` during my learning sessions, exploring which resources get created and how they interact. For someone who is still relatively new to building in AWS, I found SST to be really neat. I could get to production much faster with infra guaranteed by SST, and spend time digging into the lower level details afterwards.

I’m excited to explore more possibilities if the app ever requires further resources such as functions, storage etc. If you want to explore SST yourself, this resource provided a nice practical walkthrough: [https://guide.sst.dev/](https://guide.sst.dev/)

Getting back to the underlying infra, the static build output built is stored in a general purpose S3 bucket. Public access to the bucket is blocked and only the CloudFront distribution has access to the bucket through origin access control settings. I got to really dive into S3 bucket permissions/policies and origin access control settings when I has having a problem with initial deployments. Turns out my build output path was incorrect 😄, but at least I got to dig down into these topics. Finally after configuring Route 53 DNS service for `cvrsnap.com` , traffic could then be routed to the domain using the CloudFront distribution.

There are multiple guides out there that goes into depth on similar infra step-by-step, search for ‘AWS CloudFront S3 Route 53’ and you’ll find plenty of articles if you’re interested.

## What went well

### Product: Editor

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738260365894/f9b5edda-fb1b-4a0e-9c74-4af38125e8f3.png)

I believe the app provides what I initially intended. Simple templates and options to get you moving quickly. Early on I was experimenting with a more custom approach, allowing dragging and resizing of text and an overall slightly more interactive editor. But I realised that didn’t fit my initial purpose for it not to be complicated and open ended with its options. It has pre-designed layouts and options by design. Data is persisted so the user shouldn’t get that feeling of losing something they started. It also feels fast and snappy which is key.

There is a decent amount of customisation options here, between the text and the backgrounds options and I’m happy that you can make covers that don’t all look completely identical. I’m excited to expand the options here (specifically with more complex templates) while keeping the simplicity of making something look good quickly.

### Personal: Learning

I took a lot of learning and enjoyment from this project. A first time user of React Router v7, MantineUI, and the whole SST setup, I was able to expand my knowledge significantly. I now have the experience to make decisions between stacks involving these tools in the future. It was a great help in letting me become comfortable working with S3 buckets and CloudFront distributions which fits in nicely with the upskilling I’m currently doing.

There is invaluable knowledge and experience you gain when building your own projects from scratch. From the product development side, infrastructure, backend, continuous integration (CI), analytics, testing etc etc.

## What can be improved

### Mobile UX

The app is mobile responsive, and while I just released a new update to improve the mobile UX, I think there are still improvements to make here. Things like scroll position when switching sections and adding a scroll top button are two things that come to mind. Previously you would have to scroll to the top to see the preview, but I recently shipped and update so you have access to a preview button wherever you are scrolled which helped the UX significantly there.

Finally the default cover image text size is a constant. So on mobile it is too large for the preview size. You can manually reduce it to look appropriate but it’s not ideal. I don’t really want to adjust the font size as the screen size changes but I need to do some thinking on this.

### Customisation options

There can always be more customisation options, as long as they don’t add design fatigue to the user since that would defeat the purpose of the app. I’m not intending to introduce drag/resizing or anything open ended like that. Things like:

- More complex background templates.
- Templates that have a placeholder where you can upload an avatar to the cover.
- Background gradients.

### Landing page

The current landing is a bare bones one without too much thought. The editor was the primary focus but now that’s taking shape, the landing page can get an upgrade.

- Improved hero section
- Updated editor image
- More sections demonstrating the app and cover image details

### React router: Library or Framework

To run the app as a ‘true’ client 1 pager, I will probably refactor the app to use React router only for the routing as explained above. This tech debt could have been avoided if I started out this way.

## Summary

CvrSnap is a free tool designed to help users create custom blog post cover images quickly and easily. Built as a client-side React app, CvrSnap leverages modern technologies like React Router v7, TypeScript, and AWS. The app's editor persistently saves user progress using IndexedDB and Zustand and PNG download is a simple click away.

If you made it this far, you are my hero. If you use CvrSnap to download an image you use in a blog post, please share the post with me on [LinkedIn](https://www.linkedin.com/in/kieran6roberts/), or [Bluesky](https://bsky.app/profile/kieran6dev.bsky.social) and I’d be happy to read/share.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1738178596969/d5dee314-0e5d-48f8-8a93-11716155fab2.png)
