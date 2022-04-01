import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function exitFullscreen() {
  if (document.cancelFullScreen) {
    return document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    return document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    return document.webkitCancelFullScreen();
  }
}
var exitFullscreen_default = exitFullscreen;
export {
  exitFullscreen_default as default
};
