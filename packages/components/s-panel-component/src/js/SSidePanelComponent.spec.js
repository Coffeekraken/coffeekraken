import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const purgecss = {
  safelist: [
    "s-side-panel",
    "s-side-panel__container",
    "s-side-panel__overlay"
  ]
};
export {
  purgecss
};
