## food_app
- Feel free to explore my app using this link: https://food-app-flax-one.vercel.app/

- I really enjoyed working on this project. For the first time, I tried using Chadcn (https://ui.shadcn.com/docs). What's impressive about Chadcn is that it's  a collection of reusable components that seamlessly integrate into your applications. It is very helpful, especially for adding a dark mode feature, and I plan to use it more in the future.

- Additionally, I utilized TanStack Query (https://tanstack.com/query/latest) for handling API requests. It's remarkably powerful for fetching, caching, synchronizing, and updating state.

- I wished I could have used Storybook (https://storybook.js.org/docs/get-started/why-storybook) in this project. It would have been great for testing and writing down details about each component and for building a design system.

- Note : I ran into a problem because the API only allows 150 requests per key.Hopefully, the deployed version will work without problems. If it doesn't, I have attached a video demo for reference.
https://drive.google.com/file/d/19dLsSbdl8g4lsLtkf-sbVBvD-B9fjb4J/view?usp=drive_link

-----------------------------------------------------------------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
