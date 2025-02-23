---
title: '5 Simple Tips/Good Practises to Level Up Your React Codebase'
seoDescription: '5 simple React tips and good practises: improve maintainability, reusability, performance, and project management effectively'
datePublished: Thu Jan 23 2025 14:06:40 GMT+0000 (Coordinated Universal Time)
slug: 5-tips-to-level-up-your-react-codebase
cover: https://cdn.kieranroberts.dev/5-tips-to-level-up-your-react-codebase.webp
relatedPosts:
  - kieranrobertsdev-my-new-dev-portfolio-built-with-astro-tailwindcss-and-typescript
  - cvrsnapcom-blog-post-cover-image-creator
categories:
  - React
---

I have been working as a Software Engineer in React codebases for almost 4 years now. In that time I have worked closely with many Senior Engineers. Reviewing code, having my own code reviewed, and general collaboration. The way I write code and organise things as a result has evolved.

This article will share some tips and good practises that I employ to help make my code more maintainable, reusable, organised, and performant within a React project. Some of the tips are applicable outside of a React codebase as well. I love to learn so please share any tips you have also in the comments. Let me know if you have a better/different approach to something that’s mentioned.

Here are 5 tips/good practises to consider implementing in your React codebases.

## 1\. Use ‘dumb’ components

A dumb component is simply a component who’s purpose is to be presentational (UI). It separates presentation from logic. It might accept some props, and render some UI. Some of the benefits are:

- Better reusability
- Better predictability
- Better separation of concerns
- Simpler to maintain

Any smart logic (state etc.) can be moved to a wrapping container and any data the dumb component requires can be accepted through props.

### Before ‘dumb’ components

```typescript
// ❌ Avoid tying a simple presentational element to complex logic

interface BlogCardProps {
  title: string;
}

export const BlogCard = ({ title }: BlogCardProps) => {
  // Here we are tying the useUser hook to an otherwise simple presentational card
  const { user } = useUser();

  return (
    <article>
      <h2>{title}</h2>
      <span>{user.name}</span>
    </article>
  )
};
```

Perhaps we will want to reuse `BlogCard` later but we might not interested in the user name for that instance. Depending on what `useUser` is doing, you may be making an API call you don’t need, or running some logic that adds unnecessary performance overhead. Rudimentary example I know but the idea is there.

### After ‘dumb’ components

```javascript
// ✅ Dumb Component (Better):

interface BlogCardProps {
  title: string;
  userName: string;
}

const BlogCard = ({ title, userName }: BlogCardProps) => (
  <article>
    <h2>{blog.title}</h2>
    <span>{userName}</span>
  </article>
);

// Blog Section becomes the smart container with complex logic
const BlogSection = ({ blog }: { blog: Blog }) => {
  const { user } = useUser();
  const { posts } = useBlogs();

  return (
    <div>
      <section>
       {posts.map((post) => {
         return (
           <BlogCard
             key={post.id}
             blogTitle={blog.title}
             userName={user?.name ?? 'Unknown'}
           />
          )
        })}
      </section>
      ...
    </div>
  )
};
```

A better approach is to designate a container component to handle the complex logic, and pass down the data to any presentational components that need it.

Dumb components are some my favourite components and I recommend you keep this in mind the next time you are composing some UI. It makes reusing and testing so much easier.

## 2\. `useState` isn’t always the solution

The `useState` hook is often overused. Many times we can perform the desired action with an alternative solution that improves the user experience.

A common case where `useState` is sometimes seen but not ideal is a component that does sorting/filtering.

### Before with `useState`

```typescript
// ❌ Non ideal approach with useState:

import { useState } from 'react';

const sortTypes = {
  popular: 'popular',
  newest: 'newest'
} as const;

type SortType = (typeof sortTypes)[keyof typeof sortTypes];

export const BlogList = () => {
  const [sortType, setSortType] = useState<SortType>(sortTypes.popular);

  return (
    <div>
      <select value={sortType} onChange={(e) => setSortType(e.target.value as SortType)}>
        <option value={sortTypes.popular}>{sortTypes.popular}</option>
        <option value={sortTypes.newest}>{sortTypes.newest}</option>
      </select>
    </div>
  );
};
```

The UX of this example is poor for a few different reasons:

1. If we refresh, we lose our current sort and the default sort is restored. This can be frustrating to users who want to continue from where they previously were.
2. We are unable to share a link that includes a specific sort type.

We can implement a much more user friendly approach by utilising the URL as state.

### After using the URL as our ‘state’

```typescript
// ✅ Better approach using the URL:

import { useSearchParams } from 'react-router';

const sortTypes = {
  popular: 'popular',
  newest: 'newest'
} as const;

export const BlogList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sortType');

  const sortType =
    sortParam && sortParam in sortTypes ? sortTypes[sortParam as keyof typeof sortTypes] : sortTypes.popular;

  const onSortTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((params) => {
      params.set('sortType', e.target.value);
      return params;
    });
  };

  return (
    <div>
      <select value={sortType} onChange={onSortTypeChange}>
        <option value={sortTypes.popular}>{sortTypes.popular}</option>
        <option value={sortTypes.newest}>{sortTypes.newest}</option>
      </select>
    </div>
  );
};
```

Now our selected state is saved by the url, even after refresh. The user can save/share/bookmark the url and keep the current sort. We fallback to a default sort type `popular` if the url is not what we expect so the app works as expected. This also now incorporates the browser history allowing users to flick between sorts.

More features that can often make use of the URL as state is

- Filtering/sorting
- Pagination
- Tab interfaces
- Search functionality
- Multi stage forms

Keep this in mind the next time your writing your next `useState` hook.

## 3\. Think about how you organisation/structure your code repository

This one isn’t strictly React focused, but it applies nonetheless. Repository structure and good organisation is something we all was unsure of at some point. It’s not really something that’s taught akin to learning your chosen coding language. But as you see when you start working in real projects, the structure of the code has real affects on working within it successfully. This is mostly aimed at projects that start to grow beyond the simple few files. Most real React projects will have several components/pages/hooks/utils from early stages.

As your projects grow, you’ll want a structure that is:

- Scalable
- Maintainable
- Adheres to some good patterns

Ensuring these points are taken care of makes everything easier for you and any collaborators working on the project. Testing, debugging, working in parallel, you name it.

There is no ‘correct’ way of structuring your repository. Projects have different requirements and complexity.

Recently I have been enjoying implementing a ‘Feature-Based Architecture’ for my personal projects. As you may guess, it suggests structuring code by features e.g. `editor`, `preview`. I like the scoping here. Each feature directory may have it’s own `hooks`, `utils` etc. directories with code only that feature requires. A `shared` directory is used to include code that is shared across features.

### Example of a feature-based hierarchy

```markdown
src/
│
├── features/  
│ ├── editor/ # Editor feature
│ │ ├── components/
│ │ │ ├── Drawer.tsx
│ │ │ ├── TextSettings.tsx
│ │ │ └── BackgroundSettings.tsx
│ │ ├── hooks/
│ │ │ └── useEditorData.ts
│ │ ├── styles/
│ │ │ └── Drawer.module.css
│ │ └── index.ts
│ ├── preview/ # Preview feature
│ │ ├── components/
│ │ │ ├── CoverImage.tsx
│ │ │ ├── CoverImageControls.tsx
│ │ ├── hooks/
│ │ │ └── usePreviewData.ts
│ │ ├── styles/
│ │ │ └── CoverImage.module.css
│ │ │ └── CoverImageControls.module.css
│ │ ├── consts/
│ │ │ └── index.ts
│ │ └── index.ts
│ │
│ └── ... (other features)
│
├── shared/ # Shared/common code
│ ├── components/ # Reusable components
│ │ ├── Button.tsx
│ │ ├── Modal.tsx
│ ├── hooks/ # Shared custom hooks
│ │ └── useImageDownload.ts
│ ├── styles/ # Global or shared styles
│ │ └── global.css
│ ├── layouts/ # Shared layouts
│ │ └── navbar.tsx
│ ├── utils/ # General-purpose utilities
│ │ └── logger.ts
├── pages/ # However you app handles pages etc.
│ ├── index.tsx
```

There’s a nice encapsulation about this structure that I find appealing. Despite some of the code being a bit more ‘spread out’ that it would in some structures, I know exactly where everything should be when I create something new and I’m never second guessing or wasting time thinking about it. I hate not knowing where I should place a component/value etc, and this way I have clear pattern.

I have built many projects that started out with a flat/technology based approach. When starting out this way you still need to make decisions about how you are going to organise sub-directories like components. Do you group by location, feature, or something else. You certainly have to group in some way or end up with a directory that’s impossible to navigate nicely. You could group by feature within components for example, but let’s say you want to re-work a feature, or add some upgrades. Now you have to traverse throughout all the parent directories to find what you need like `components`, `hooks`, `utils`, `stores` and whatever else the feature uses to make your changes. Of course you can make searching the repo easier by keyword searching, but still.

Instead, with the feature based approach I can navigate to my feature and get started. Maybe I have to look in shared but it will be easier to navigate this directory now that most of the logic is encapsulated within the feature directory.

### Example of the flat/technology based hierarchy

```markdown
src/
├── components/  
│ ├── Drawer.tsx
│ ├── TextSettings.tsx
│ ├── BackgroundSettings.tsx
│ ├── CoverImage.tsx
│ ├── CoverImageControls.tsx
├── layouts/ # Layout components
│ ├── Header.tsx
├── hooks/ # Custom React hooks
│ ├── useImageDownload.ts
├── styles/ # Global or modular styles
│ └── global.css
├── utils/ # General-purpose utilities and helpers
│ └── logger.ts
├── pages/ # However you app handles pages etc.
│ ├── index.ts/
```

Another type of organisational design system you may come across, especially in a React project is ‘Atomic Design’. This usually involves grouping code into categories named something like `atoms`, `molecules`, `organisms`, `templates` etc. `atoms` being the smallest elements like a base Button component, and scaling up from there. This structure can work well specifically for React UI components grouping in a project with a lot of components.

And as you may see, it is possible to combine ideas from these repository organisational structures. There are many patterns out there to read about. The idea being that you should read up on the pros/cons of them and implement what you think fits well for your use case.

## 4\. Use common shared `consts` for your non-changing values

Let’s say we have some content that can be one of several different types. One of these types we identify as `posts`. It’s a string and will always be `posts`. You might use it like this:

```typescript
return (
  <Select defaultValue="posts" onChange={onItemChange}>
    ...
  </Select>
  <PostsSection hidden={value !== "posts"} />
)
```

Here we refer to a string `posts` more than once. Every time we use the string `posts` we increase the possibility of misspelling it and causing errors. This is easily avoidable if you use TypeScript, but there is another issue.

Let’s say we get a directive that we now have to change this to the string `articles`, for whatever reason. Now we have to change every instance where it’s in use. That becomes a major pain if it’s used across multiple files and directories without being referred to by a common `const`.

Instead we should refer to the string using a `const` variable like this e.g:

```typescript
// consts/index.ts

// Common practice is use snake_case naming convertion with capitals
export const POSTS_KEY = 'posts';
```

```typescript
import { POSTS_KEY } from '@consts/index';

return (
  <Select defaultValue={POSTS_KEY} onChange={onItemChange}>
    ...
  </Select>
  <SomeOtherComponent hidden={value !== POSTS_KEY}>
)
```

Now you have one source of truth. It is common practice to have a directory called `consts` or `constants` where you store values that need to be shared across files. If the `const` is only ever going to be required in one file, it is fine to define it only where it is needed, then move it to a central location later when re-use is needed.

## 5\. **Passing primitives as props beats whole objects**

Let’s say we have an object `blog` and this object has several key-value pairs. We have a dumb component that needs access to some of this data. Instead of passing the whole object as one React component prop `blog={blog}`, it is good to instead prefer passing the individual values required by the dumb component:

### What I wouldn’t recommend

```typescript
// ❌ What I wouldn’t recommend:

type Blog = {
  title: string;
  coverImage: string | null;
};

// BlogCard doesn't even use blog.coverImage
const BlogCard = ({ blog }: { blog: Blog }) => (
  <article>
    <h2>{blog.title}</h2>
  </article>
);
```

There are a few key reasons this approach is not usually preferred:

1. It has access to data it doesn’t need.
2. `BlogCard` could mutate the original `blog` object causing side effects. Recently while diving into my AWS learnings, I learned about the _‘Principle of least privilege’_ and it applies here. Essentially we don’t allow the inner component the chance to do more than it should be able to.
3. Can lead to more unpredictable rendering behaviour due to React’s shallow comparison of props: [React memo troubleshooting](https://react.dev/reference/react/memo#troubleshooting)
4. Is less declarative in general.
5. Might make testing more difficult because there’s more data than required.

### Better approach passing only the required props

```typescript
// ✅ Better Approach:

type Blog = {
  title: string;
  coverImage: string | null;
};

const BlogCard = ({ title }: { title: BlogCard['title'] }) => (
  <article>
    <h2>{blog.title}</h2>
  </article>
);
```

Now the component is more declarative, we can see exactly what data it accepts. It doesn’t have access to the original blog object and if we wanted to memoize the component, we could skip re-rendering the `BlogCard` successfully when other fields other than `title` of the blog object change.

I would prefer this approach almost always even if I needed to pass several different fields. If you see the number of props your component needs is growing, it could be a sign you need to refactor your component into several different different components. Each with less responsibilities than before.

## Summary

This article shares five key tips for improving the maintainability, reusability, organisation, and performance of your React codebases. It covers the benefits of using 'dumb' components as they’re simpler to maintain and re-use, optimising state management beyond `useState`, and suggests exploring effective code repository structures. It also encourages the use of shared constants for consistency and maintainability, and finally favouring the passing of primitive values over whole objects in component props.

There is a ton of things I didn’t cover in this article that could have been in, I might write another article on the topic. Let me know if you have any interesting tips or best practises that you like to employ in your React codebases. I’d love to hear them.

Until next time!
