import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function preventScrollRestoration_default() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}
export {
  preventScrollRestoration_default as default
};
