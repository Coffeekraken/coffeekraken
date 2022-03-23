import {
  __spreadProps,
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __appendScriptTag from "../dom/appendScriptTag";
import __innerHtml from "../dom/innerHtml";
class SSocketDom {
  constructor(serverUrl, settings = {}) {
    this._serverUrl = "http://localhost:80";
    this._settings = {
      node: document.body,
      action: "replace",
      events: {}
    };
    this._serverUrl = serverUrl;
    this._settings = __spreadValues(__spreadValues({}, this._settings), settings);
  }
  init() {
    return this._initSocketIo().then(() => {
      this.registerEvent("innerHtml", this._eventInnerHtml);
      this.registerEvent("body", this._eventBody);
      this.registerEvent("content", this._eventContent);
    });
  }
  _initSocketIo() {
    const _this = this;
    return __appendScriptTag("/socket.io/socket.io.js").then(() => {
      _this._socket = window.io.connect(this._serverUrl);
    });
  }
  _eventInnerHtml(data, settings) {
    let $node = settings.node;
    if (typeof $node === "string")
      $node = document.querySelector($node);
    switch (settings.action) {
      case "append":
        __innerHtml($node, data, __spreadProps(__spreadValues({}, settings.innerHtml || {}), {
          action: "append"
        }));
        break;
      case "replace":
        __innerHtml($node, data, settings.innerHtml);
        break;
      case "prepend":
        __innerHtml($node, data, __spreadProps(__spreadValues({}, settings.innerHtml || {}), {
          action: "prepend"
        }));
        break;
    }
  }
  _eventBody(data, settings) {
    __innerHtml(document.body, data, settings.innerHtml || {});
  }
  _eventContent(data, settings) {
    let $content = document.getElementById("content") || document.querySelector("[content]");
    if (!$content)
      return;
    __innerHtml($content, data, settings.innerHtml || {});
  }
  emit(event, data = {}) {
    this._socket.emit(`SSocketDom.${event}`, data);
    return this;
  }
  registerEvent(event, handlerFn, settings = {}) {
    this._settings.events[event] = settings;
    this._socket.on(`SSocketDom.${event}`, (data = {}) => {
      const d = data.data;
      delete data.data;
      handlerFn(d, __spreadValues(__spreadValues(__spreadValues({}, this._settings), this._settings.events[event]), data || {}));
    });
    return this;
  }
}
var SSocketDom_default = SSocketDom;
export {
  SSocketDom_default as default
};
