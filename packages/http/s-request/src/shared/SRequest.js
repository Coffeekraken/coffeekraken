import __axios from "axios";
import __strToHtml from "@coffeekraken/sugar/js/html/strToHtml";
import __htmlToString from "@coffeekraken/sugar/js/html/toString";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SClass from "@coffeekraken/s-class";
import __SRequestParamsInterface from "./interface/SRequestParamsInterface";
class SRequest extends __SClass {
  constructor(params, settings) {
    super(__deepMerge({
      request: {}
    }, settings != null ? settings : {}));
    this._defaultRequestParams = {};
    this._currentRequestSettings = {};
    this._requestsCount = 0;
    this._defaultRequestParams = __SRequestParamsInterface.apply(params != null ? params : {});
  }
  get requestSettings() {
    return this._settings.request;
  }
  _onSuccess(response) {
    let finalResponse = response.data;
    const contentType = response.headers["content-type"] || "text/plain";
    const hash = this._currentRequestSettings.url.indexOf("#") !== -1 ? this._currentRequestSettings.url.split("#")[1] : false;
    if (contentType === "text/html" && hash !== false && document !== void 0 && document.querySelector !== void 0) {
      const $html = __strToHtml(response.data);
      if ($html.id === hash) {
        finalResponse = __htmlToString($html);
      } else {
        const $part = $html.querySelector(`#${hash}`);
        if ($part) {
          finalResponse = __htmlToString($part);
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
    requestSettings = __deepMerge(this._defaultRequestParams, requestSettings, {
      sendCount: 0
    });
    if (requestSettings.beforeSend) {
      requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
    }
    this._currentRequestSettings = Object.assign(requestSettings);
    __axios(requestSettings).then(this._onSuccess.bind(this)).catch(this._onError.bind(this));
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
export {
  SRequest as default
};
