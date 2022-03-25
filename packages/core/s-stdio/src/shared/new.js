import __isNode from "@coffeekraken/sugar/shared/is/node";
import __SBasicStdio from "../node/basic/SBasicStdio";
import __SWebsocketStdio from "../node/websocket/SWebsocketStdio";
import __SStdio from "./SStdio";
async function _new(id, sources, stdio, settings) {
  if (!Array.isArray(sources))
    sources = [sources];
  let stdioInstance;
  if (__isNode()) {
    switch (stdio) {
      case __SStdio.UI_WEBSOCKET:
        stdioInstance = new __SWebsocketStdio(id, sources, settings);
        break;
      case __SStdio.UI_BASIC:
      default:
        stdioInstance = new __SBasicStdio(id, sources, settings);
        break;
    }
  } else {
    throw new Error(`No stdio implementation found for the current "browser" environment...`);
  }
  return stdioInstance;
}
export {
  _new as default
};
