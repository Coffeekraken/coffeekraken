import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const purgecss = {
  safelist: {
    standard: [
      "s-tabs",
      "s-btn",
      "s-color",
      "s-color--accent",
      /^language-/
    ],
    greedy: [
      /s-code-example/,
      /hljs/
    ]
  }
};
export {
  purgecss
};
