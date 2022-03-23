var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SRequest_exports = {};
__export(SRequest_exports, {
  default: () => SRequest
});
module.exports = __toCommonJS(SRequest_exports);
var import_axios = __toESM(require("axios"), 1);
var import_strToHtml = __toESM(require("@coffeekraken/sugar/js/html/strToHtml"), 1);
var import_toString = __toESM(require("@coffeekraken/sugar/js/html/toString"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_SRequestParamsInterface = __toESM(require("./interface/SRequestParamsInterface"), 1);
class SRequest extends import_s_class.default {
  constructor(params, settings) {
    super((0, import_deepMerge.default)({
      request: {}
    }, settings != null ? settings : {}));
    this._defaultRequestParams = {};
    this._currentRequestSettings = {};
    this._requestsCount = 0;
    this._defaultRequestParams = import_SRequestParamsInterface.default.apply(params != null ? params : {});
  }
  get requestSettings() {
    return this._settings.request;
  }
  _onSuccess(response) {
    let finalResponse = response.data;
    const contentType = response.headers["content-type"] || "text/plain";
    const hash = this._currentRequestSettings.url.indexOf("#") !== -1 ? this._currentRequestSettings.url.split("#")[1] : false;
    if (contentType === "text/html" && hash !== false && document !== void 0 && document.querySelector !== void 0) {
      const $html = (0, import_strToHtml.default)(response.data);
      if ($html.id === hash) {
        finalResponse = (0, import_toString.default)($html);
      } else {
        const $part = $html.querySelector(`#${hash}`);
        if ($part) {
          finalResponse = (0, import_toString.default)($part);
        }
      }
    }
    try {
      finalResponse = JSON.parse(response.data);
    } catch (e) {
    }
    response.data = finalResponse;
    this._responsesArray.push(response);
    const lastResponse = this._responsesArray.slice(-1)[0];
    if (this._requestsCount >= this._currentRequestSettings.sendCount) {
      this._resolve({
        status: lastResponse.status,
        statusText: lastResponse.statusText,
        data: lastResponse.data,
        count: this._responsesArray.length,
        axiosResponse: lastResponse,
        axiosResponses: this._responsesArray
      });
    } else {
      this._send();
    }
  }
  _onError(error) {
    this._reject(error);
  }
  _send(requestSettings = {}) {
    this._requestsCount++;
    requestSettings = (0, import_deepMerge.default)(this._defaultRequestParams, requestSettings, {
      sendCount: 0
    });
    if (requestSettings.beforeSend) {
      requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
    }
    this._currentRequestSettings = Object.assign(requestSettings);
    (0, import_axios.default)(requestSettings).then(this._onSuccess.bind(this)).catch(this._onError.bind(this));
  }
  retry() {
    return this.send();
  }
  send(requestSettings = {}) {
    return new Promise((resolve, reject) => {
      this._requestsCount = 0;
      this._responsesArray = [];
      this._resolve = resolve;
      this._reject = reject;
      this._send(requestSettings);
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
