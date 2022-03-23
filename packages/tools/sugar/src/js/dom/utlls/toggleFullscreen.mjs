import "../../../../../../chunk-PG3ZPS4G.mjs";
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
