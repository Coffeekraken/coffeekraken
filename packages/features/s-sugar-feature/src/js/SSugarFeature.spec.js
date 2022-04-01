import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
const purgecss = {
  safelist: {
    standard: ["scrolled"]
  }
};
export {
  purgecss
};
