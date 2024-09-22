export const actions = [
  {
    id: "home",
    name: "Home",
    shortcut: ["h"],
    keywords: "home",
    section: "navigation",
    perform: () => (window.location.href = "/"),
  },
  {
    id: "blog",
    name: "Blog",
    shortcut: ["b"],
    keywords: "blog",
    section: "navigation",
    perform: () => (window.location.href = "/blog"),
  },
];
