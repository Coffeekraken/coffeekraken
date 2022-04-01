import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __copy from "clipboard-copy";
function copy(text) {
  return __copy(text);
}
export {
  copy as default
};
