import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function requestFullscreen(elm) {
  if (elm.requestFullscreen) {
    return elm.requestFullscreen();
  } else if (elm.mozRequestFullScreen) {
    return elm.mozRequestFullScreen();
  } else if (elm.webkitRequestFullscreen) {
    return elm.webkitRequestFullscreen();
  } else if (elm.msRequestFullscreen) {
    return elm.msRequestFullscreen();
  }
}
var requestFullscreen_default = requestFullscreen;
export {
  requestFullscreen_default as default
};
