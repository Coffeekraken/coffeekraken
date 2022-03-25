import __SPromise from "@coffeekraken/s-promise";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SStdio from "../../shared/SStdio";
import __defaultWebsocketComponent from "./components/defaultWebSocketComponent";
class SWebsocketStdio extends __SStdio {
  get websocketStdioSettings() {
    return this._settings.websocketStdio;
  }
  constructor(id, sources, settings) {
    super(id, sources, __deepMerge({
      websocketStdio: {}
    }, settings || {}));
  }
  _log(logObj, component) {
    if (!logObj)
      return;
    const obj = component.render(logObj);
  }
  _ask(askObj) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      let prompt, res;
      resolve(res);
    });
  }
}
SWebsocketStdio.registerComponent(__defaultWebsocketComponent);
var SWebsocketStdio_default = SWebsocketStdio;
export {
  SWebsocketStdio_default as default
};
