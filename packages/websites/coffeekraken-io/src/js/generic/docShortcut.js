import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __hotkey from "@coffeekraken/sugar/js/keyboard/hotkey";
__hotkey("cmd+p").on("press", (e) => {
  e.cancelBubble = true;
  e.preventDefault();
  e.stopImmediatePropagation();
  document.querySelector("#search-input > input").focus();
});
