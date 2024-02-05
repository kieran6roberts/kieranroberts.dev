module.exports = {
  extends: ["plugin:astro/recommended"],
  overrides: [
    {
      files: ["src/*.astro", "src/*.ts"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: 'tsconfig.json',
      },
      rules: {
        quotes: "double",
        semi: ["error", "always"],
        indent: ["error", 2],
        "no-multi-spaces": ["error"]
      },
    },
  ],
};
