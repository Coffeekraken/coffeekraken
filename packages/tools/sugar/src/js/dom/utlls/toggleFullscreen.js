import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import requestFullscreen from "./requestFullscreen";
import exitFullscreen from "./exitFullscreen";
function toggleFullscreen(elm) {
  const fullscreenElm = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
  if (!fullscreenElm || fullscreenElm !== elm) {
    return requestFullscreen(elm);
  } else {
    return exitFullscreen();
  }
}
var toggleFullscreen_default = toggleFullscreen;
export {
  toggleFullscreen_default as default
};
