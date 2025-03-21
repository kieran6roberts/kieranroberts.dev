---
title: 'How to setup path aliases for development with Next.js & Jest'
seoDescription: 'Learn how to setup path aliases for development with Next.js and Jest. This will help you keep your imports clean and organised.'
datePublished: Fri Apr 16 2021 09:37:41 GMT+0000 (Coordinated Universal Time)
slug: how-to-setup-path-aliases-for-development-with-nextjs-and-jest
cover: https://cdn.kieranroberts.dev/blog/how-to-setup-path-aliases-for-development-with-nextjs-and-jest-cover.webp
relatedPosts:
  - 5-tips-to-level-up-your-react-codebase
  - tutorial-implement-a-scroll-translated-dynamic-sticky-navbar-in-react
categories:
  - react
updatedAt: Sun Feb 23 2025 10:30:00 GMT+0000 (Coordinated Universal Time)
---

## TLDR: Update (2025)

### Next.js

Configure the `baseUrl` in the `tsconfig/jsconfig` along with your desired paths:

```typescript
// tsconfig/jsconfig.json
{
  "compilerOptions": {
    "@/*": ["./src/*"]
  }
}
```

### Jest

Install `jest` and `jest-environment-jsdom`:

```bash
pnpm install -D jest jest-environment-jsdom
```

Generate a Jest configuration:

```bash
pnpm create jest@latest
```

Update the jest config file to use `next/jest`:

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
};

export default createJestConfig(config);
```

Finally match the paths option from your `tsconfig/jsconfig` to the Jest `moduleNameMapper`:

```typescript
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		// Your desired paths
		'^@/src(.*)$': '<rootDir>/src/$1',
	},
};

export default createJestConfig(config);
```

You can find the original article below for reference.

---

## Original article

I wanted to share how you can setup path aliases for your imports. Sometimes you end up with various levels of file nesting and this can get messy fast.

Fortunately for us both Next.js and Jest support adding path aliases so we don't end up with something like this:

`import Component from "../../../Component/Component";`

For any medium to large react project you will have realized that due to the component nature of the library we end up doing a lot of importing. Let's find out how we can change the above into this:

`import Component from "@/Component/Component";`

for both development in Next.js and for our tests using the test Framework Jest.

## Next.js

### Step 1 - Create a Next app

I'll start with a brand new project so you can see all the steps. For this I will create a new Next application using `npx create-next-app@latest` so we can get up and running quickly.

### Step 2 - Create some files to import

Next I'm going to create a `src` folder which is where I normally store the apps components, hooks etc. Let's add some files to our `src` folder to simulate how a real project might look 👇 .

Here I have created the following files

- `Header.js` and `Button.js` components inside a `components` folder
- `__tests__` folder with our component test files
- `useStorage.js` hook inside a `hooks` folder
- `config.js` inside a `lib` folder

The contents of the files is not important. As long as you export something from your components which I will show you in a second.

### Step 3 - Specify our path aliases

First we need to create a `jsconfig.json` file (or `tsconfig.json` if you're using TypeScript) and setup our path aliases. My setup looks like this 👇.

```typescript
{
  "compilerOptions": {
    "baseUrl": ".",
    "@/components": ["src/components/*"],
    "@/hooks": ["src/hooks/*"],
    "@/lib": ["src/lib/*"]
  }
}
```

Here we can specify a base url that we start our import from. Commonly you will see the root `.` specified.

Next we can specify path aliases for our paths to the different folder locations. `paths` is an object where we start with our path alias and assign it an array of paths. A common syntax of alias is in the format `"@/fileName/"` but you can use anything you'd like.

Let's take our `components` alias as an example. We are saying we want to match the alias `"@/components/"` to the path `src/components/` folder.

### Step 4 - Checking that our aliases work

Now let's add some basic code to our components:

```typescript
// src/components/Button.js
export default function Button() {
  return <button>Click me</button>
}
```

and the header is the same except it exports a `<h2 />` tag 🙂. We can import them into other pages/components using the path aliases like this 👇.

```typescript
// src/pages/index.js
import Button from '@/components/Button';
import Header from '@/components/Header';
```

That's it! We have successfully setup path aliases for our imports in Next.js.

## Jest

### Step 1 - Install and configure the necessary files

I wanted to add this extra step for two reasons

1. You should be testing your apps
2. It's good to keep your imports consistent across development code and tests

First let's download the packages we need to work with Jest. I will install the following packages:

- `jest`
- `babel-jest`

`jest` if the primary package we need to install in order to use the Jest testing framework. While `babel-jest`will help transform our code so we can include things like ES modules `import` syntax in our test files.

We also have to configure a `.babelrc` file with the following setup:

```typescript
{
  "presets": ["next/babel"]
}
```

What we are doing here is telling babel to use the custom preset for Next.js.

## Step 2 - Add our `jest.config.js`

Finally we can now get on to our aliases in Jest. We first need to create a `jest.config.js` file. There are a couple of options we will pass in here and it looks something like this.

```typescript
module.exports = {
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	moduleNameMapper: {
		'^@/components(.*)$': '<rootDir>/src/components/$1',
		'^@/hooks(.*)$': '<rootDir>/src/hooks/$1',
		'^@/lib(.*)$': '<rootDir>/src/lib/$1',
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
	},
};
```

The first thing we do is use the `testPathIgonrePattern` which is defined as an array of strings that specify which paths we would like to skip when testing. Here we include the `node_modules` directory and the `.next` directory which contains our build files.

We don't want Jest looking in these directories for tests and we specify these paths starting at the root `<rootDir>`.

Next comes our path aliases. We need to use the `moduleNameMapper` property to map our aliases. It is a map of regular expressions and in this case we setup our three current aliases of `@/components` `@/hooks` and `@/lib`.

You can do this for any path you are likely to be importing regularly. If you wanted to move on to integration tests and import you pages into tests you could do the same for example `@/page`.

The order in which you setup these aliases could matter however. These patterns are checked by Jest from top to bottom therefore you have more specific rules you should include them first.

For more information check out the [Jest - Configuring Jest](https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring).

Now if we add an empty test block to one of our files and attempt the import with the alias we won't receive any errors after running out test script. Our imports are now working as expected in Jest ✔.

```typescript
// src/__tests__/Button.test.js
import Button from '@/components/Button';

describe('Button', () => {
	it('should do something', () => {});
});
```

## Conclusion

Set up path aliases for cleaner imports in Next.js and Jest by configuring the `baseUrl` and `paths` in your `tsconfig/jsconfig.json`. For Jest, install necessary packages, configure Babel, and set up a `jest.config.js` file with `moduleNameMapper` to map aliases for consistent imports across development and tests.
