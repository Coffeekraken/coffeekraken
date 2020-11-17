
                /* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
                let process = {};
                (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module2) => () => {
    if (!module2) {
      module2 = {exports: {}};
      callback(module2.exports, module2);
    }
    return module2.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, {get: all[name], enumerable: true});
  };
  var __exportStar = (target, module2, desc) => {
    __markAsModule(target);
    if (typeof module2 === "object" || typeof module2 === "function") {
      for (let key of __getOwnPropNames(module2))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module2) => {
    if (module2 && module2.__esModule)
      return module2;
    return __exportStar(__defProp(__create(__getProtoOf(module2)), "default", {value: module2, enumerable: true}), module2);
  };

  // ../sugar/node_modules/copy-to/index.js
  var require_copy_to = __commonJS((exports2, module2) => {
    /*!
     * copy-to - index.js
     * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
     * MIT Licensed
     */
    "use strict";
    var slice = Array.prototype.slice;
    module2.exports = Copy;
    function Copy(src, withAccess) {
      if (!(this instanceof Copy))
        return new Copy(src, withAccess);
      this.src = src;
      this._withAccess = withAccess;
    }
    Copy.prototype.withAccess = function(w) {
      this._withAccess = w !== false;
      return this;
    };
    Copy.prototype.pick = function(keys) {
      if (!Array.isArray(keys)) {
        keys = slice.call(arguments);
      }
      if (keys.length) {
        this.keys = keys;
      }
      return this;
    };
    Copy.prototype.to = function(to) {
      to = to || {};
      if (!this.src)
        return to;
      var keys = this.keys || Object.keys(this.src);
      if (!this._withAccess) {
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          if (to[key] !== void 0)
            continue;
          to[key] = this.src[key];
        }
        return to;
      }
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!notDefined(to, key))
          continue;
        var getter = this.src.__lookupGetter__(key);
        var setter = this.src.__lookupSetter__(key);
        if (getter)
          to.__defineGetter__(key, getter);
        if (setter)
          to.__defineSetter__(key, setter);
        if (!getter && !setter) {
          to[key] = this.src[key];
        }
      }
      return to;
    };
    Copy.prototype.toCover = function(to) {
      var keys = this.keys || Object.keys(this.src);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        delete to[key];
        var getter = this.src.__lookupGetter__(key);
        var setter = this.src.__lookupSetter__(key);
        if (getter)
          to.__defineGetter__(key, getter);
        if (setter)
          to.__defineSetter__(key, setter);
        if (!getter && !setter) {
          to[key] = this.src[key];
        }
      }
    };
    Copy.prototype.override = Copy.prototype.toCover;
    Copy.prototype.and = function(obj) {
      var src = {};
      this.to(src);
      this.src = obj;
      this.to(src);
      this.src = src;
      return this;
    };
    function notDefined(obj, key) {
      return obj[key] === void 0 && obj.__lookupGetter__(key) === void 0 && obj.__lookupSetter__(key) === void 0;
    }
  });

  // ../sugar/node_modules/is-plain-object/dist/is-plain-object.js
  var require_is_plain_object = __commonJS((exports2) => {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {value: true});
    /*!
     * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     */
    function isObject3(o) {
      return Object.prototype.toString.call(o) === "[object Object]";
    }
    function isPlainObject(o) {
      var ctor, prot;
      if (isObject3(o) === false)
        return false;
      ctor = o.constructor;
      if (ctor === void 0)
        return true;
      prot = ctor.prototype;
      if (isObject3(prot) === false)
        return false;
      if (prot.hasOwnProperty("isPrototypeOf") === false) {
        return false;
      }
      return true;
    }
    exports2.isPlainObject = isPlainObject;
  });

  // ../sugar/node_modules/axios/lib/helpers/bind.js
  var require_bind = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  });

  // ../sugar/node_modules/axios/lib/utils.js
  var require_utils = __commonJS((exports2, module2) => {
    "use strict";
    var bind = require_bind();
    var toString13 = Object.prototype.toString;
    function isArray3(val) {
      return toString13.call(val) === "[object Array]";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    function isArrayBuffer(val) {
      return toString13.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString2(val) {
      return typeof val === "string";
    }
    function isNumber2(val) {
      return typeof val === "number";
    }
    function isObject3(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (toString13.call(val) !== "[object Object]") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    function isDate(val) {
      return toString13.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString13.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString13.call(val) === "[object Blob]";
    }
    function isFunction2(val) {
      return toString13.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject3(val) && isFunction2(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray3(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray3(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    module2.exports = {
      isArray: isArray3,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString: isString2,
      isNumber: isNumber2,
      isObject: isObject3,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction: isFunction2,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM
    };
  });

  // ../sugar/node_modules/axios/lib/helpers/buildURL.js
  var require_buildURL = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module2.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts8 = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts8.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts8.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  });

  // ../sugar/node_modules/axios/lib/core/InterceptorManager.js
  var require_InterceptorManager = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module2.exports = InterceptorManager;
  });

  // ../sugar/node_modules/axios/lib/core/transformData.js
  var require_transformData = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    module2.exports = function transformData(data, headers, fns) {
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };
  });

  // ../sugar/node_modules/axios/lib/cancel/isCancel.js
  var require_isCancel = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  });

  // ../sugar/node_modules/axios/lib/helpers/normalizeHeaderName.js
  var require_normalizeHeaderName = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    module2.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  });

  // ../sugar/node_modules/axios/lib/core/enhanceError.js
  var require_enhanceError = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  });

  // ../sugar/node_modules/axios/lib/core/createError.js
  var require_createError = __commonJS((exports2, module2) => {
    "use strict";
    var enhanceError = require_enhanceError();
    module2.exports = function createError(message, config, code, request, response) {
      var error = new Error(message);
      return enhanceError(error, config, code, request, response);
    };
  });

  // ../sugar/node_modules/axios/lib/core/settle.js
  var require_settle = __commonJS((exports2, module2) => {
    "use strict";
    var createError = require_createError();
    module2.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  });

  // ../sugar/node_modules/axios/lib/helpers/cookies.js
  var require_cookies = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path4, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path4)) {
            cookie.push("path=" + path4);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  });

  // ../sugar/node_modules/axios/lib/helpers/isAbsoluteURL.js
  var require_isAbsoluteURL = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  });

  // ../sugar/node_modules/axios/lib/helpers/combineURLs.js
  var require_combineURLs = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  });

  // ../sugar/node_modules/axios/lib/core/buildFullPath.js
  var require_buildFullPath = __commonJS((exports2, module2) => {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module2.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  });

  // ../sugar/node_modules/axios/lib/helpers/parseHeaders.js
  var require_parseHeaders = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module2.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  });

  // ../sugar/node_modules/axios/lib/helpers/isURLSameOrigin.js
  var require_isURLSameOrigin = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    module2.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  });

  // ../sugar/node_modules/axios/lib/adapters/xhr.js
  var require_xhr = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module2.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        };
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = "timeout of " + config.timeout + "ms exceeded";
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(createError(timeoutErrorMessage, config, "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (config.responseType !== "json") {
              throw e;
            }
          }
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (!requestData) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  });

  // ../sugar/node_modules/axios/lib/defaults.js
  var require_defaults = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    var defaults = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        Accept: "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module2.exports = defaults;
  });

  // ../sugar/node_modules/axios/lib/core/dispatchRequest.js
  var require_dispatchRequest = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module2.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData(config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  });

  // ../sugar/node_modules/axios/lib/core/mergeConfig.js
  var require_mergeConfig = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    module2.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      var valueFromConfig2Keys = ["url", "method", "data"];
      var mergeDeepPropertiesKeys = ["headers", "auth", "proxy", "params"];
      var defaultToConfig2Keys = [
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "timeoutMessage",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "decompress",
        "maxContentLength",
        "maxBodyLength",
        "maxRedirects",
        "transport",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath",
        "responseEncoding"
      ];
      var directMergeKeys = ["validateStatus"];
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      }
      utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        }
      });
      utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
      utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          config[prop] = getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
          config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          config[prop] = getMergedValue(void 0, config1[prop]);
        }
      });
      var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
      var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
      });
      utils.forEach(otherKeys, mergeDeepProperties);
      return config;
    };
  });

  // ../sugar/node_modules/axios/lib/core/Axios.js
  var require_Axios = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var chain = [dispatchRequest, void 0];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module2.exports = Axios;
  });

  // ../sugar/node_modules/axios/lib/cancel/Cancel.js
  var require_Cancel = __commonJS((exports2, module2) => {
    "use strict";
    function Cancel(message) {
      this.message = message;
    }
    Cancel.prototype.toString = function toString13() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module2.exports = Cancel;
  });

  // ../sugar/node_modules/axios/lib/cancel/CancelToken.js
  var require_CancelToken = __commonJS((exports2, module2) => {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module2.exports = CancelToken;
  });

  // ../sugar/node_modules/axios/lib/helpers/spread.js
  var require_spread = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  });

  // ../sugar/node_modules/axios/lib/axios.js
  var require_axios = __commonJS((exports2, module2) => {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios3 = createInstance(defaults);
    axios3.Axios = Axios;
    axios3.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios3.defaults, instanceConfig));
    };
    axios3.Cancel = require_Cancel();
    axios3.CancelToken = require_CancelToken();
    axios3.isCancel = require_isCancel();
    axios3.all = function all(promises) {
      return Promise.all(promises);
    };
    axios3.spread = require_spread();
    module2.exports = axios3;
    module2.exports.default = axios3;
  });

  // ../sugar/node_modules/axios/index.js
  var require_axios2 = __commonJS((exports2, module2) => {
    module2.exports = require_axios();
  });

  // ../sugar/src/js/string/autoCast.js
  var require_autoCast = __commonJS((exports) => {
    __export(exports, {
      default: () => autoCast
    });
    function autoCast(string) {
      if (typeof string !== "string")
        return string;
      if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
        return string.substr(1, string.length - 2);
      }
      const presumedNumber = parseFloat(string);
      if (!isNaN(presumedNumber)) {
        if (presumedNumber.toString() === string) {
          return presumedNumber;
        }
      }
      if (window[string]) {
        return string;
      }
      try {
        const obj = eval(`(${string})`);
        return obj;
      } catch (e) {
        return string;
      }
    }
  });

  // ../sugar/node_modules/hotkeys-js/dist/hotkeys.common.js
  var require_hotkeys_common = __commonJS((exports2, module2) => {
    /*!
     * hotkeys-js v3.8.1
     * A simple micro-library for defining and dispatching keyboard shortcuts. It has no dependencies.
     * 
     * Copyright (c) 2020 kenny wong <wowohoo@qq.com>
     * http://jaywcjlove.github.io/hotkeys
     * 
     * Licensed under the MIT license.
     */
    "use strict";
    var isff = typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase().indexOf("firefox") > 0 : false;
    function addEvent(object2, event, method) {
      if (object2.addEventListener) {
        object2.addEventListener(event, method, false);
      } else if (object2.attachEvent) {
        object2.attachEvent("on".concat(event), function() {
          method(window.event);
        });
      }
    }
    function getMods(modifier, key) {
      var mods = key.slice(0, key.length - 1);
      for (var i = 0; i < mods.length; i++) {
        mods[i] = modifier[mods[i].toLowerCase()];
      }
      return mods;
    }
    function getKeys(key) {
      if (typeof key !== "string")
        key = "";
      key = key.replace(/\s/g, "");
      var keys = key.split(",");
      var index = keys.lastIndexOf("");
      for (; index >= 0; ) {
        keys[index - 1] += ",";
        keys.splice(index, 1);
        index = keys.lastIndexOf("");
      }
      return keys;
    }
    function compareArray(a1, a2) {
      var arr1 = a1.length >= a2.length ? a1 : a2;
      var arr2 = a1.length >= a2.length ? a2 : a1;
      var isIndex = true;
      for (var i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1)
          isIndex = false;
      }
      return isIndex;
    }
    var _keyMap = {
      backspace: 8,
      tab: 9,
      clear: 12,
      enter: 13,
      return: 13,
      esc: 27,
      escape: 27,
      space: 32,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      del: 46,
      delete: 46,
      ins: 45,
      insert: 45,
      home: 36,
      end: 35,
      pageup: 33,
      pagedown: 34,
      capslock: 20,
      "⇪": 20,
      ",": 188,
      ".": 190,
      "/": 191,
      "`": 192,
      "-": isff ? 173 : 189,
      "=": isff ? 61 : 187,
      ";": isff ? 59 : 186,
      "'": 222,
      "[": 219,
      "]": 221,
      "\\": 220
    };
    var _modifier = {
      "⇧": 16,
      shift: 16,
      "⌥": 18,
      alt: 18,
      option: 18,
      "⌃": 17,
      ctrl: 17,
      control: 17,
      "⌘": 91,
      cmd: 91,
      command: 91
    };
    var modifierMap = {
      16: "shiftKey",
      18: "altKey",
      17: "ctrlKey",
      91: "metaKey",
      shiftKey: 16,
      ctrlKey: 17,
      altKey: 18,
      metaKey: 91
    };
    var _mods = {
      16: false,
      18: false,
      17: false,
      91: false
    };
    var _handlers = {};
    for (var k = 1; k < 20; k++) {
      _keyMap["f".concat(k)] = 111 + k;
    }
    var _downKeys = [];
    var _scope = "all";
    var elementHasBindEvent = [];
    var code = function code2(x) {
      return _keyMap[x.toLowerCase()] || _modifier[x.toLowerCase()] || x.toUpperCase().charCodeAt(0);
    };
    function setScope(scope) {
      _scope = scope || "all";
    }
    function getScope() {
      return _scope || "all";
    }
    function getPressedKeyCodes() {
      return _downKeys.slice(0);
    }
    function filter(event) {
      var target = event.target || event.srcElement;
      var tagName = target.tagName;
      var flag = true;
      if (target.isContentEditable || (tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT") && !target.readOnly) {
        flag = false;
      }
      return flag;
    }
    function isPressed(keyCode) {
      if (typeof keyCode === "string") {
        keyCode = code(keyCode);
      }
      return _downKeys.indexOf(keyCode) !== -1;
    }
    function deleteScope(scope, newScope) {
      var handlers;
      var i;
      if (!scope)
        scope = getScope();
      for (var key in _handlers) {
        if (Object.prototype.hasOwnProperty.call(_handlers, key)) {
          handlers = _handlers[key];
          for (i = 0; i < handlers.length; ) {
            if (handlers[i].scope === scope)
              handlers.splice(i, 1);
            else
              i++;
          }
        }
      }
      if (getScope() === scope)
        setScope(newScope || "all");
    }
    function clearModifier(event) {
      var key = event.keyCode || event.which || event.charCode;
      var i = _downKeys.indexOf(key);
      if (i >= 0) {
        _downKeys.splice(i, 1);
      }
      if (event.key && event.key.toLowerCase() === "meta") {
        _downKeys.splice(0, _downKeys.length);
      }
      if (key === 93 || key === 224)
        key = 91;
      if (key in _mods) {
        _mods[key] = false;
        for (var k2 in _modifier) {
          if (_modifier[k2] === key)
            hotkeys3[k2] = false;
        }
      }
    }
    function unbind(keysInfo) {
      if (!keysInfo) {
        Object.keys(_handlers).forEach(function(key) {
          return delete _handlers[key];
        });
      } else if (Array.isArray(keysInfo)) {
        keysInfo.forEach(function(info) {
          if (info.key)
            eachUnbind(info);
        });
      } else if (typeof keysInfo === "object") {
        if (keysInfo.key)
          eachUnbind(keysInfo);
      } else if (typeof keysInfo === "string") {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        var scope = args[0], method = args[1];
        if (typeof scope === "function") {
          method = scope;
          scope = "";
        }
        eachUnbind({
          key: keysInfo,
          scope,
          method,
          splitKey: "+"
        });
      }
    }
    var eachUnbind = function eachUnbind2(_ref) {
      var key = _ref.key, scope = _ref.scope, method = _ref.method, _ref$splitKey = _ref.splitKey, splitKey = _ref$splitKey === void 0 ? "+" : _ref$splitKey;
      var multipleKeys = getKeys(key);
      multipleKeys.forEach(function(originKey) {
        var unbindKeys = originKey.split(splitKey);
        var len = unbindKeys.length;
        var lastKey = unbindKeys[len - 1];
        var keyCode = lastKey === "*" ? "*" : code(lastKey);
        if (!_handlers[keyCode])
          return;
        if (!scope)
          scope = getScope();
        var mods = len > 1 ? getMods(_modifier, unbindKeys) : [];
        _handlers[keyCode] = _handlers[keyCode].map(function(record) {
          var isMatchingMethod = method ? record.method === method : true;
          if (isMatchingMethod && record.scope === scope && compareArray(record.mods, mods)) {
            return {};
          }
          return record;
        });
      });
    };
    function eventHandler(event, handler, scope) {
      var modifiersMatch;
      if (handler.scope === scope || handler.scope === "all") {
        modifiersMatch = handler.mods.length > 0;
        for (var y in _mods) {
          if (Object.prototype.hasOwnProperty.call(_mods, y)) {
            if (!_mods[y] && handler.mods.indexOf(+y) > -1 || _mods[y] && handler.mods.indexOf(+y) === -1) {
              modifiersMatch = false;
            }
          }
        }
        if (handler.mods.length === 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91] || modifiersMatch || handler.shortcut === "*") {
          if (handler.method(event, handler) === false) {
            if (event.preventDefault)
              event.preventDefault();
            else
              event.returnValue = false;
            if (event.stopPropagation)
              event.stopPropagation();
            if (event.cancelBubble)
              event.cancelBubble = true;
          }
        }
      }
    }
    function dispatch3(event) {
      var asterisk = _handlers["*"];
      var key = event.keyCode || event.which || event.charCode;
      if (!hotkeys3.filter.call(this, event))
        return;
      if (key === 93 || key === 224)
        key = 91;
      if (_downKeys.indexOf(key) === -1 && key !== 229)
        _downKeys.push(key);
      ["ctrlKey", "altKey", "shiftKey", "metaKey"].forEach(function(keyName) {
        var keyNum = modifierMap[keyName];
        if (event[keyName] && _downKeys.indexOf(keyNum) === -1) {
          _downKeys.push(keyNum);
        } else if (!event[keyName] && _downKeys.indexOf(keyNum) > -1) {
          _downKeys.splice(_downKeys.indexOf(keyNum), 1);
        } else if (keyName === "metaKey" && event[keyName] && _downKeys.length === 3) {
          if (!(event.ctrlKey || event.shiftKey || event.altKey)) {
            _downKeys = _downKeys.slice(_downKeys.indexOf(keyNum));
          }
        }
      });
      if (key in _mods) {
        _mods[key] = true;
        for (var k2 in _modifier) {
          if (_modifier[k2] === key)
            hotkeys3[k2] = true;
        }
        if (!asterisk)
          return;
      }
      for (var e in _mods) {
        if (Object.prototype.hasOwnProperty.call(_mods, e)) {
          _mods[e] = event[modifierMap[e]];
        }
      }
      if (event.getModifierState && !(event.altKey && !event.ctrlKey) && event.getModifierState("AltGraph")) {
        if (_downKeys.indexOf(17) === -1) {
          _downKeys.push(17);
        }
        if (_downKeys.indexOf(18) === -1) {
          _downKeys.push(18);
        }
        _mods[17] = true;
        _mods[18] = true;
      }
      var scope = getScope();
      if (asterisk) {
        for (var i = 0; i < asterisk.length; i++) {
          if (asterisk[i].scope === scope && (event.type === "keydown" && asterisk[i].keydown || event.type === "keyup" && asterisk[i].keyup)) {
            eventHandler(event, asterisk[i], scope);
          }
        }
      }
      if (!(key in _handlers))
        return;
      for (var _i = 0; _i < _handlers[key].length; _i++) {
        if (event.type === "keydown" && _handlers[key][_i].keydown || event.type === "keyup" && _handlers[key][_i].keyup) {
          if (_handlers[key][_i].key) {
            var record = _handlers[key][_i];
            var splitKey = record.splitKey;
            var keyShortcut = record.key.split(splitKey);
            var _downKeysCurrent = [];
            for (var a2 = 0; a2 < keyShortcut.length; a2++) {
              _downKeysCurrent.push(code(keyShortcut[a2]));
            }
            if (_downKeysCurrent.sort().join("") === _downKeys.sort().join("")) {
              eventHandler(event, record, scope);
            }
          }
        }
      }
    }
    function isElementBind(element) {
      return elementHasBindEvent.indexOf(element) > -1;
    }
    function hotkeys3(key, option, method) {
      _downKeys = [];
      var keys = getKeys(key);
      var mods = [];
      var scope = "all";
      var element = document;
      var i = 0;
      var keyup = false;
      var keydown = true;
      var splitKey = "+";
      if (method === void 0 && typeof option === "function") {
        method = option;
      }
      if (Object.prototype.toString.call(option) === "[object Object]") {
        if (option.scope)
          scope = option.scope;
        if (option.element)
          element = option.element;
        if (option.keyup)
          keyup = option.keyup;
        if (option.keydown !== void 0)
          keydown = option.keydown;
        if (typeof option.splitKey === "string")
          splitKey = option.splitKey;
      }
      if (typeof option === "string")
        scope = option;
      for (; i < keys.length; i++) {
        key = keys[i].split(splitKey);
        mods = [];
        if (key.length > 1)
          mods = getMods(_modifier, key);
        key = key[key.length - 1];
        key = key === "*" ? "*" : code(key);
        if (!(key in _handlers))
          _handlers[key] = [];
        _handlers[key].push({
          keyup,
          keydown,
          scope,
          mods,
          shortcut: keys[i],
          method,
          key: keys[i],
          splitKey
        });
      }
      if (typeof element !== "undefined" && !isElementBind(element) && window) {
        elementHasBindEvent.push(element);
        addEvent(element, "keydown", function(e) {
          dispatch3(e);
        });
        addEvent(window, "focus", function() {
          _downKeys = [];
        });
        addEvent(element, "keyup", function(e) {
          dispatch3(e);
          clearModifier(e);
        });
      }
    }
    var _api = {
      setScope,
      getScope,
      deleteScope,
      getPressedKeyCodes,
      isPressed,
      filter,
      unbind
    };
    for (var a in _api) {
      if (Object.prototype.hasOwnProperty.call(_api, a)) {
        hotkeys3[a] = _api[a];
      }
    }
    if (typeof window !== "undefined") {
      var _hotkeys = window.hotkeys;
      hotkeys3.noConflict = function(deep) {
        if (deep && window.hotkeys === hotkeys3) {
          window.hotkeys = _hotkeys;
        }
        return hotkeys3;
      };
      window.hotkeys = hotkeys3;
    }
    module2.exports = hotkeys3;
  });

  // node_modules/path-browserify/index.js
  var require_path_browserify = __commonJS((exports2) => {
    function normalizeArray(parts8, allowAboveRoot) {
      var up = 0;
      for (var i = parts8.length - 1; i >= 0; i--) {
        var last = parts8[i];
        if (last === ".") {
          parts8.splice(i, 1);
        } else if (last === "..") {
          parts8.splice(i, 1);
          up++;
        } else if (up) {
          parts8.splice(i, 1);
          up--;
        }
      }
      if (allowAboveRoot) {
        for (; up--; up) {
          parts8.unshift("..");
        }
      }
      return parts8;
    }
    exports2.resolve = function() {
      var resolvedPath = "", resolvedAbsolute = false;
      for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        var path4 = i >= 0 ? arguments[i] : process.cwd();
        if (typeof path4 !== "string") {
          throw new TypeError("Arguments to path.resolve must be strings");
        } else if (!path4) {
          continue;
        }
        resolvedPath = path4 + "/" + resolvedPath;
        resolvedAbsolute = path4.charAt(0) === "/";
      }
      resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
        return !!p;
      }), !resolvedAbsolute).join("/");
      return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
    };
    exports2.normalize = function(path4) {
      var isAbsolute = exports2.isAbsolute(path4), trailingSlash = substr(path4, -1) === "/";
      path4 = normalizeArray(filter(path4.split("/"), function(p) {
        return !!p;
      }), !isAbsolute).join("/");
      if (!path4 && !isAbsolute) {
        path4 = ".";
      }
      if (path4 && trailingSlash) {
        path4 += "/";
      }
      return (isAbsolute ? "/" : "") + path4;
    };
    exports2.isAbsolute = function(path4) {
      return path4.charAt(0) === "/";
    };
    exports2.join = function() {
      var paths = Array.prototype.slice.call(arguments, 0);
      return exports2.normalize(filter(paths, function(p, index) {
        if (typeof p !== "string") {
          throw new TypeError("Arguments to path.join must be strings");
        }
        return p;
      }).join("/"));
    };
    exports2.relative = function(from, to) {
      from = exports2.resolve(from).substr(1);
      to = exports2.resolve(to).substr(1);
      function trim(arr) {
        var start = 0;
        for (; start < arr.length; start++) {
          if (arr[start] !== "")
            break;
        }
        var end = arr.length - 1;
        for (; end >= 0; end--) {
          if (arr[end] !== "")
            break;
        }
        if (start > end)
          return [];
        return arr.slice(start, end - start + 1);
      }
      var fromParts = trim(from.split("/"));
      var toParts = trim(to.split("/"));
      var length = Math.min(fromParts.length, toParts.length);
      var samePartsLength = length;
      for (var i = 0; i < length; i++) {
        if (fromParts[i] !== toParts[i]) {
          samePartsLength = i;
          break;
        }
      }
      var outputParts = [];
      for (var i = samePartsLength; i < fromParts.length; i++) {
        outputParts.push("..");
      }
      outputParts = outputParts.concat(toParts.slice(samePartsLength));
      return outputParts.join("/");
    };
    exports2.sep = "/";
    exports2.delimiter = ":";
    exports2.dirname = function(path4) {
      if (typeof path4 !== "string")
        path4 = path4 + "";
      if (path4.length === 0)
        return ".";
      var code = path4.charCodeAt(0);
      var hasRoot = code === 47;
      var end = -1;
      var matchedSlash = true;
      for (var i = path4.length - 1; i >= 1; --i) {
        code = path4.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
          matchedSlash = false;
        }
      }
      if (end === -1)
        return hasRoot ? "/" : ".";
      if (hasRoot && end === 1) {
        return "/";
      }
      return path4.slice(0, end);
    };
    function basename(path4) {
      if (typeof path4 !== "string")
        path4 = path4 + "";
      var start = 0;
      var end = -1;
      var matchedSlash = true;
      var i;
      for (i = path4.length - 1; i >= 0; --i) {
        if (path4.charCodeAt(i) === 47) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }
      if (end === -1)
        return "";
      return path4.slice(start, end);
    }
    exports2.basename = function(path4, ext) {
      var f = basename(path4);
      if (ext && f.substr(-1 * ext.length) === ext) {
        f = f.substr(0, f.length - ext.length);
      }
      return f;
    };
    exports2.extname = function(path4) {
      if (typeof path4 !== "string")
        path4 = path4 + "";
      var startDot = -1;
      var startPart = 0;
      var end = -1;
      var matchedSlash = true;
      var preDotState = 0;
      for (var i = path4.length - 1; i >= 0; --i) {
        var code = path4.charCodeAt(i);
        if (code === 47) {
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (code === 46) {
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      }
      if (startDot === -1 || end === -1 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
        return "";
      }
      return path4.slice(startDot, end);
    };
    function filter(xs, f) {
      if (xs.filter)
        return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs))
          res.push(xs[i]);
      }
      return res;
    }
    var substr = "ab".substr(-1) === "b" ? function(str, start, len) {
      return str.substr(start, len);
    } : function(str, start, len) {
      if (start < 0)
        start = str.length + start;
      return str.substr(start, len);
    };
  });

  // ../sugar/node_modules/concat-map/index.js
  var require_concat_map = __commonJS((exports2, module2) => {
    module2.exports = function(xs, fn) {
      var res = [];
      for (var i = 0; i < xs.length; i++) {
        var x = fn(xs[i], i);
        if (isArray3(x))
          res.push.apply(res, x);
        else
          res.push(x);
      }
      return res;
    };
    var isArray3 = Array.isArray || function(xs) {
      return Object.prototype.toString.call(xs) === "[object Array]";
    };
  });

  // ../sugar/node_modules/balanced-match/index.js
  var require_balanced_match = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp)
        a = maybeMatch(a, str);
      if (b instanceof RegExp)
        b = maybeMatch(b, str);
      var r = range(a, b, str);
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
      if (ai >= 0 && bi > 0) {
        begs = [];
        left = str.length;
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [begs.pop(), bi];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
            bi = str.indexOf(b, i + 1);
          }
          i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) {
          result = [left, right];
        }
      }
      return result;
    }
  });

  // ../sugar/node_modules/brace-expansion/index.js
  var require_brace_expansion = __commonJS((exports2, module2) => {
    var concatMap = require_concat_map();
    var balanced = require_balanced_match();
    module2.exports = expandTop;
    var escSlash = "\0SLASH" + Math.random() + "\0";
    var escOpen = "\0OPEN" + Math.random() + "\0";
    var escClose = "\0CLOSE" + Math.random() + "\0";
    var escComma = "\0COMMA" + Math.random() + "\0";
    var escPeriod = "\0PERIOD" + Math.random() + "\0";
    function numeric(str) {
      return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
    }
    function escapeBraces(str) {
      return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
    }
    function unescapeBraces(str) {
      return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
    }
    function parseCommaParts(str) {
      if (!str)
        return [""];
      var parts8 = [];
      var m = balanced("{", "}", str);
      if (!m)
        return str.split(",");
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(",");
      p[p.length - 1] += "{" + body + "}";
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
      }
      parts8.push.apply(parts8, p);
      return parts8;
    }
    function expandTop(str) {
      if (!str)
        return [];
      if (str.substr(0, 2) === "{}") {
        str = "\\{\\}" + str.substr(2);
      }
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    function embrace(str) {
      return "{" + str + "}";
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    function expand(str, isTop) {
      var expansions = [];
      var m = balanced("{", "}", str);
      if (!m || /\$$/.test(m.pre))
        return [str];
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            var post = m.post.length ? expand(m.post, false) : [""];
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var pre = m.pre;
      var post = m.post.length ? expand(m.post, false) : [""];
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x; test(i, y); i += incr) {
          var c;
          if (isAlphaSequence) {
            c = String.fromCharCode(i);
            if (c === "\\")
              c = "";
          } else {
            c = String(i);
            if (pad) {
              var need = width - c.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c = "-" + z + c.slice(1);
                else
                  c = z + c;
              }
            }
          }
          N.push(c);
        }
      } else {
        N = concatMap(n, function(el) {
          return expand(el, false);
        });
      }
      for (var j = 0; j < N.length; j++) {
        for (var k = 0; k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
      return expansions;
    }
  });

  // ../sugar/node_modules/minimatch/minimatch.js
  var require_minimatch = __commonJS((exports2, module2) => {
    module2.exports = minimatch;
    minimatch.Minimatch = Minimatch;
    var path4 = {sep: "/"};
    try {
      path4 = require_path_browserify();
    } catch (er) {
    }
    var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
    var expand = require_brace_expansion();
    var plTypes = {
      "!": {open: "(?:(?!(?:", close: "))[^/]*?)"},
      "?": {open: "(?:", close: ")?"},
      "+": {open: "(?:", close: ")+"},
      "*": {open: "(?:", close: ")*"},
      "@": {open: "(?:", close: ")"}
    };
    var qmark = "[^/]";
    var star = qmark + "*?";
    var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
    var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
    var reSpecials = charSet("().*{}+?[]^$\\!");
    function charSet(s) {
      return s.split("").reduce(function(set4, c) {
        set4[c] = true;
        return set4;
      }, {});
    }
    var slashSplit = /\/+/;
    minimatch.filter = filter;
    function filter(pattern, options) {
      options = options || {};
      return function(p, i, list) {
        return minimatch(p, pattern, options);
      };
    }
    function ext(a, b) {
      a = a || {};
      b = b || {};
      var t = {};
      Object.keys(b).forEach(function(k) {
        t[k] = b[k];
      });
      Object.keys(a).forEach(function(k) {
        t[k] = a[k];
      });
      return t;
    }
    minimatch.defaults = function(def) {
      if (!def || !Object.keys(def).length)
        return minimatch;
      var orig = minimatch;
      var m = function minimatch2(p, pattern, options) {
        return orig.minimatch(p, pattern, ext(def, options));
      };
      m.Minimatch = function Minimatch2(pattern, options) {
        return new orig.Minimatch(pattern, ext(def, options));
      };
      return m;
    };
    Minimatch.defaults = function(def) {
      if (!def || !Object.keys(def).length)
        return Minimatch;
      return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
      if (typeof pattern !== "string") {
        throw new TypeError("glob pattern string required");
      }
      if (!options)
        options = {};
      if (!options.nocomment && pattern.charAt(0) === "#") {
        return false;
      }
      if (pattern.trim() === "")
        return p === "";
      return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
      if (!(this instanceof Minimatch)) {
        return new Minimatch(pattern, options);
      }
      if (typeof pattern !== "string") {
        throw new TypeError("glob pattern string required");
      }
      if (!options)
        options = {};
      pattern = pattern.trim();
      if (path4.sep !== "/") {
        pattern = pattern.split(path4.sep).join("/");
      }
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.make();
    }
    Minimatch.prototype.debug = function() {
    };
    Minimatch.prototype.make = make;
    function make() {
      if (this._made)
        return;
      var pattern = this.pattern;
      var options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      var set4 = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = console.error;
      this.debug(this.pattern, set4);
      set4 = this.globParts = set4.map(function(s) {
        return s.split(slashSplit);
      });
      this.debug(this.pattern, set4);
      set4 = set4.map(function(s, si, set5) {
        return s.map(this.parse, this);
      }, this);
      this.debug(this.pattern, set4);
      set4 = set4.filter(function(s) {
        return s.indexOf(false) === -1;
      });
      this.debug(this.pattern, set4);
      this.set = set4;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
      var pattern = this.pattern;
      var negate = false;
      var options = this.options;
      var negateOffset = 0;
      if (options.nonegate)
        return;
      for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.substr(negateOffset);
      this.negate = negate;
    }
    minimatch.braceExpand = function(pattern, options) {
      return braceExpand(pattern, options);
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
      if (!options) {
        if (this instanceof Minimatch) {
          options = this.options;
        } else {
          options = {};
        }
      }
      pattern = typeof pattern === "undefined" ? this.pattern : pattern;
      if (typeof pattern === "undefined") {
        throw new TypeError("undefined pattern");
      }
      if (options.nobrace || !pattern.match(/\{.*\}/)) {
        return [pattern];
      }
      return expand(pattern);
    }
    Minimatch.prototype.parse = parse5;
    var SUBPARSE = {};
    function parse5(pattern, isSub) {
      if (pattern.length > 1024 * 64) {
        throw new TypeError("pattern is too long");
      }
      var options = this.options;
      if (!options.noglobstar && pattern === "**")
        return GLOBSTAR;
      if (pattern === "")
        return "";
      var re = "";
      var hasMagic = !!options.nocase;
      var escaping = false;
      var patternListStack = [];
      var negativeLists = [];
      var stateChar;
      var inClass = false;
      var reClassStart = -1;
      var classStart = -1;
      var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      var self2 = this;
      function clearStateChar() {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          self2.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      }
      for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
        this.debug("%s	%s %s %j", pattern, i, re, c);
        if (escaping && reSpecials[c]) {
          re += "\\" + c;
          escaping = false;
          continue;
        }
        switch (c) {
          case "/":
            return false;
          case "\\":
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
            if (inClass) {
              this.debug("  in class");
              if (c === "!" && i === classStart + 1)
                c = "^";
              re += c;
              continue;
            }
            self2.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c;
            if (options.noext)
              clearStateChar();
            continue;
          case "(":
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            patternListStack.push({
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            });
            re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          case ")":
            if (inClass || !patternListStack.length) {
              re += "\\)";
              continue;
            }
            clearStateChar();
            hasMagic = true;
            var pl = patternListStack.pop();
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(pl);
            }
            pl.reEnd = re.length;
            continue;
          case "|":
            if (inClass || !patternListStack.length || escaping) {
              re += "\\|";
              escaping = false;
              continue;
            }
            clearStateChar();
            re += "|";
            continue;
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c;
              escaping = false;
              continue;
            }
            if (inClass) {
              var cs = pattern.substring(classStart + 1, i);
              try {
                RegExp("[" + cs + "]");
              } catch (er) {
                var sp = this.parse(cs, SUBPARSE);
                re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
                hasMagic = hasMagic || sp[1];
                inClass = false;
                continue;
              }
            }
            hasMagic = true;
            inClass = false;
            re += c;
            continue;
          default:
            clearStateChar();
            if (escaping) {
              escaping = false;
            } else if (reSpecials[c] && !(c === "^" && inClass)) {
              re += "\\";
            }
            re += c;
        }
      }
      if (inClass) {
        cs = pattern.substr(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substr(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
        var tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug("tail=%j\n   %s", tail, tail, pl, re);
        var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      var addPatternStart = false;
      switch (re.charAt(0)) {
        case ".":
        case "[":
        case "(":
          addPatternStart = true;
      }
      for (var n = negativeLists.length - 1; n > -1; n--) {
        var nl = negativeLists[n];
        var nlBefore = re.slice(0, nl.reStart);
        var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
        var nlAfter = re.slice(nl.reEnd);
        nlLast += nlAfter;
        var openParensBefore = nlBefore.split("(").length - 1;
        var cleanAfter = nlAfter;
        for (i = 0; i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        var dollar = "";
        if (nlAfter === "" && isSub !== SUBPARSE) {
          dollar = "$";
        }
        var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        re = newRe;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      var flags = options.nocase ? "i" : "";
      try {
        var regExp = new RegExp("^" + re + "$", flags);
      } catch (er) {
        return new RegExp("$.");
      }
      regExp._glob = pattern;
      regExp._src = re;
      return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
      return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      var set4 = this.set;
      if (!set4.length) {
        this.regexp = false;
        return this.regexp;
      }
      var options = this.options;
      var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      var flags = options.nocase ? "i" : "";
      var re = set4.map(function(pattern) {
        return pattern.map(function(p) {
          return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
        }).join("\\/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    minimatch.match = function(list, pattern, options) {
      options = options || {};
      var mm = new Minimatch(pattern, options);
      list = list.filter(function(f) {
        return mm.match(f);
      });
      if (mm.options.nonull && !list.length) {
        list.push(pattern);
      }
      return list;
    };
    Minimatch.prototype.match = match;
    function match(f, partial) {
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      var options = this.options;
      if (path4.sep !== "/") {
        f = f.split(path4.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      var set4 = this.set;
      this.debug(this.pattern, "set", set4);
      var filename;
      var i;
      for (i = f.length - 1; i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (i = 0; i < set4.length; i++) {
        var pattern = set4[i];
        var file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        var hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    }
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
      var options = this.options;
      this.debug("matchOne", {this: this, file, pattern});
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (; fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          if (options.nocase) {
            hit = f.toLowerCase() === p.toLowerCase();
          } else {
            hit = f === p;
          }
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        var emptyFileEnd = fi === fl - 1 && file[fi] === "";
        return emptyFileEnd;
      }
      throw new Error("wtf?");
    };
    function globUnescape(s) {
      return s.replace(/\\(.)/g, "$1");
    }
    function regExpEscape(s) {
      return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
  });

  // node_modules/os-browserify/browser.js
  var require_browser = __commonJS((exports2) => {
    exports2.endianness = function() {
      return "LE";
    };
    exports2.hostname = function() {
      if (typeof location !== "undefined") {
        return location.hostname;
      } else
        return "";
    };
    exports2.loadavg = function() {
      return [];
    };
    exports2.uptime = function() {
      return 0;
    };
    exports2.freemem = function() {
      return Number.MAX_VALUE;
    };
    exports2.totalmem = function() {
      return Number.MAX_VALUE;
    };
    exports2.cpus = function() {
      return [];
    };
    exports2.type = function() {
      return "Browser";
    };
    exports2.release = function() {
      if (typeof navigator !== "undefined") {
        return navigator.appVersion;
      }
      return "";
    };
    exports2.networkInterfaces = exports2.getNetworkInterfaces = function() {
      return {};
    };
    exports2.arch = function() {
      return "javascript";
    };
    exports2.platform = function() {
      return "browser";
    };
    exports2.tmpdir = exports2.tmpDir = function() {
      return "/tmp";
    };
    exports2.EOL = "\n";
    exports2.homedir = function() {
      return "/";
    };
  });

  // ../sugar/node_modules/uniqid/index.js
  var require_uniqid = __commonJS((exports2, module2) => {
    var pid = process && process.pid ? process.pid.toString(36) : "";
    var address = "";
    if (typeof __webpack_require__ !== "function") {
      var mac = "", networkInterfaces = require_browser().networkInterfaces();
      for (let interface_key in networkInterfaces) {
        const networkInterface = networkInterfaces[interface_key];
        const length = networkInterface.length;
        for (var i = 0; i < length; i++) {
          if (networkInterface[i].mac && networkInterface[i].mac != "00:00:00:00:00:00") {
            mac = networkInterface[i].mac;
            break;
          }
        }
      }
      address = mac ? parseInt(mac.replace(/\:|\D+/gi, "")).toString(36) : "";
    }
    module2.exports = module2.exports.default = function(prefix, suffix) {
      return (prefix ? prefix : "") + address + pid + now().toString(36) + (suffix ? suffix : "");
    };
    module2.exports.process = function(prefix, suffix) {
      return (prefix ? prefix : "") + pid + now().toString(36) + (suffix ? suffix : "");
    };
    module2.exports.time = function(prefix, suffix) {
      return (prefix ? prefix : "") + now().toString(36) + (suffix ? suffix : "");
    };
    function now() {
      var time = Date.now();
      var last = now.last || time;
      return now.last = time > last ? time : last + 1;
    }
  });

  // ../sugar/node_modules/color-convert/node_modules/color-name/index.js
  var require_color_name = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 134, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 250, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 221],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [112, 128, 144],
      slategrey: [112, 128, 144],
      snow: [255, 250, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 50]
    };
  });

  // ../sugar/node_modules/color-convert/conversions.js
  var require_conversions = __commonJS((exports2, module2) => {
    const cssKeywords = require_color_name();
    const reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    const convert6 = {
      rgb: {channels: 3, labels: "rgb"},
      hsl: {channels: 3, labels: "hsl"},
      hsv: {channels: 3, labels: "hsv"},
      hwb: {channels: 3, labels: "hwb"},
      cmyk: {channels: 4, labels: "cmyk"},
      xyz: {channels: 3, labels: "xyz"},
      lab: {channels: 3, labels: "lab"},
      lch: {channels: 3, labels: "lch"},
      hex: {channels: 1, labels: ["hex"]},
      keyword: {channels: 1, labels: ["keyword"]},
      ansi16: {channels: 1, labels: ["ansi16"]},
      ansi256: {channels: 1, labels: ["ansi256"]},
      hcg: {channels: 3, labels: ["h", "c", "g"]},
      apple: {channels: 3, labels: ["r16", "g16", "b16"]},
      gray: {channels: 1, labels: ["gray"]}
    };
    module2.exports = convert6;
    for (const model of Object.keys(convert6)) {
      if (!("channels" in convert6[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert6[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert6[model].labels.length !== convert6[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const {channels, labels} = convert6[model];
      delete convert6[model].channels;
      delete convert6[model].labels;
      Object.defineProperty(convert6[model], "channels", {value: channels});
      Object.defineProperty(convert6[model], "labels", {value: labels});
    }
    convert6.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const delta = max - min;
      let h;
      let s;
      if (max === min) {
        h = 0;
      } else if (r === max) {
        h = (g - b) / delta;
      } else if (g === max) {
        h = 2 + (b - r) / delta;
      } else if (b === max) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min + max) / 2;
      if (max === min) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max + min);
      } else {
        s = delta / (2 - max - min);
      }
      return [h, s * 100, l * 100];
    };
    convert6.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert6.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert6.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert6.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x, y) {
      return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
    }
    convert6.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert6.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert6.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x * 100, y * 100, z * 100];
    };
    convert6.rgb.lab = function(rgb) {
      const xyz = convert6.rgb.xyz(rgb);
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert6.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert6.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert6.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert6.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert6.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert6.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert6.xyz.rgb = function(xyz) {
      const x = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert6.xyz.lab = function(xyz) {
      let x = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x /= 95.047;
      y /= 100;
      z /= 108.883;
      x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert6.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x;
      let y;
      let z;
      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x2 = x ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x, y, z];
    };
    convert6.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert6.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert6.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert6.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert6.hsv.ansi16 = function(args) {
      return convert6.rgb.ansi16(convert6.hsv.rgb(args), args[2]);
    };
    convert6.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert6.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert6.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert6.rgb.hex = function(args) {
      const integer3 = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string2 = integer3.toString(16).toUpperCase();
      return "000000".substring(string2.length) + string2;
    };
    convert6.hex.rgb = function(args) {
      const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match) {
        return [0, 0, 0];
      }
      let colorString = match[0];
      if (match[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer3 = parseInt(colorString, 16);
      const r = integer3 >> 16 & 255;
      const g = integer3 >> 8 & 255;
      const b = integer3 & 255;
      return [r, g, b];
    };
    convert6.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max = Math.max(Math.max(r, g), b);
      const min = Math.min(Math.min(r, g), b);
      const chroma = max - min;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max === r) {
        hue = (g - b) / chroma % 6;
      } else if (max === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert6.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert6.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert6.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert6.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert6.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert6.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert6.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert6.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert6.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert6.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert6.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert6.gray.hsv = convert6.gray.hsl;
    convert6.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert6.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert6.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert6.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer3 = (val << 16) + (val << 8) + val;
      const string2 = integer3.toString(16).toUpperCase();
      return "000000".substring(string2.length) + string2;
    };
    convert6.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  });

  // ../sugar/node_modules/color-convert/route.js
  var require_route = __commonJS((exports2, module2) => {
    const conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node6 = graph[adjacent];
          if (node6.distance === -1) {
            node6.distance = graph[current].distance + 1;
            node6.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path4 = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path4.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path4;
      return fn;
    }
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node6 = graph[toModel];
        if (node6.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  });

  // ../sugar/node_modules/color-convert/index.js
  var require_color_convert = __commonJS((exports2, module2) => {
    const conversions = require_conversions();
    const route = require_route();
    const convert6 = {};
    const models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert6[fromModel] = {};
      Object.defineProperty(convert6[fromModel], "channels", {value: conversions[fromModel].channels});
      Object.defineProperty(convert6[fromModel], "labels", {value: conversions[fromModel].labels});
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert6[fromModel][toModel] = wrapRounded(fn);
        convert6[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert6;
  });

  // ../sugar/node_modules/chalk/node_modules/ansi-styles/index.js
  var require_ansi_styles = __commonJS((exports2, module2) => {
    "use strict";
    const wrapAnsi16 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `[${code + offset}m`;
    };
    const wrapAnsi256 = (fn, offset) => (...args) => {
      const code = fn(...args);
      return `[${38 + offset};5;${code}m`;
    };
    const wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    const ansi2ansi = (n) => n;
    const rgb2rgb = (r, g, b) => [r, g, b];
    const setLazyProperty = (object2, property, get5) => {
      Object.defineProperty(object2, property, {
        get: () => {
          const value = get5();
          Object.defineProperty(object2, property, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    let colorConvert;
    const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `[${style[0]}m`,
            close: `[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "[39m";
      styles.bgColor.close = "[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  });

  // ../sugar/node_modules/chalk/node_modules/supports-color/browser.js
  var require_browser2 = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = {
      stdout: false,
      stderr: false
    };
  });

  // ../sugar/node_modules/chalk/source/util.js
  var require_util = __commonJS((exports2, module2) => {
    "use strict";
    const stringReplaceAll = (string2, substring, replacer) => {
      let index = string2.indexOf(substring);
      if (index === -1) {
        return string2;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string2.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string2.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string2.substr(endIndex);
      return returnValue;
    };
    const stringEncaseCRLFWithFirstIndex = (string2, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string2[index - 1] === "\r";
        returnValue += string2.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string2.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string2.substr(endIndex);
      return returnValue;
    };
    module2.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    };
  });

  // ../sugar/node_modules/chalk/source/templates.js
  var require_templates = __commonJS((exports2, module2) => {
    "use strict";
    const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    const ESCAPES = new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", ""],
      ["a", "\x07"]
    ]);
    function unescape2(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches3;
      for (const chunk of chunks) {
        const number2 = Number(chunk);
        if (!Number.isNaN(number2)) {
          results.push(number2);
        } else if (matches3 = chunk.match(STRING_REGEX)) {
          results.push(matches3[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape2(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches3;
      while ((matches3 = STYLE_REGEX.exec(style)) !== null) {
        const name = matches3[1];
        if (matches3[2]) {
          const args = parseArguments(name, matches3[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk2, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk2;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
      }
      return current;
    }
    module2.exports = (chalk2, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
        if (escapeCharacter) {
          chunk.push(unescape2(escapeCharacter));
        } else if (style) {
          const string2 = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string2 : buildStyle(chalk2, styles)(string2));
          styles.push({inverse, styles: parseStyle(style)});
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk2, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  });

  // ../sugar/node_modules/chalk/source/index.js
  var require_source = __commonJS((exports2, module2) => {
    "use strict";
    const ansiStyles = require_ansi_styles();
    const {stdout: stdoutColor, stderr: stderrColor} = require_browser2();
    const {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = require_util();
    const {isArray: isArray3} = Array;
    const levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    const styles = Object.create(null);
    const applyOptions = (object2, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object2.level = options.level === void 0 ? colorLevel : options.level;
    };
    class ChalkClass {
      constructor(options) {
        return chalkFactory(options);
      }
    }
    const chalkFactory = (options) => {
      const chalk3 = {};
      applyOptions(chalk3, options);
      chalk3.template = (...arguments_) => chalkTag(chalk3.template, ...arguments_);
      Object.setPrototypeOf(chalk3, Chalk.prototype);
      Object.setPrototypeOf(chalk3.template, chalk3);
      chalk3.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk3.template.Instance = ChalkClass;
      return chalk3.template;
    };
    function Chalk(options) {
      return chalkFactory(options);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, {value: builder});
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", {value: builder});
        return builder;
      }
    };
    const usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const {level} = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const {level} = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    const proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    const createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    const createBuilder = (self2, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        if (isArray3(arguments_[0]) && isArray3(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self2;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    const applyStyle = (self2, string2) => {
      if (self2.level <= 0 || !string2) {
        return self2._isEmpty ? "" : string2;
      }
      let styler = self2._styler;
      if (styler === void 0) {
        return string2;
      }
      const {openAll, closeAll} = styler;
      if (string2.indexOf("") !== -1) {
        while (styler !== void 0) {
          string2 = stringReplaceAll(string2, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string2.indexOf("\n");
      if (lfIndex !== -1) {
        string2 = stringEncaseCRLFWithFirstIndex(string2, closeAll, openAll, lfIndex);
      }
      return openAll + string2 + closeAll;
    };
    let template6;
    const chalkTag = (chalk3, ...strings) => {
      const [firstString] = strings;
      if (!isArray3(firstString) || !isArray3(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts8 = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts8.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
      }
      if (template6 === void 0) {
        template6 = require_templates();
      }
      return template6(chalk3, parts8.join(""));
    };
    Object.defineProperties(Chalk.prototype, styles);
    const chalk2 = Chalk();
    chalk2.supportsColor = stdoutColor;
    chalk2.stderr = Chalk({level: stderrColor ? stderrColor.level : 0});
    chalk2.stderr.supportsColor = stderrColor;
    module2.exports = chalk2;
  });

  // ../sugar/node_modules/json-cyclic/dist/index.js
  var require_dist = __commonJS((exports) => {
    const isArray = (e) => Array.isArray(e);
    const isObject = (e) => Object.prototype.toString.call(e).slice(8, -1) === "Object";
    const validate = (e) => {
      if (e === void 0)
        throw new Error("This method requires one parameter");
      if (!isArray(e) && !isObject(e))
        throw new TypeError("This method only accepts arrays and objects");
    };
    const isRef = (e) => isObject(e) && e.hasOwnProperty("$ref") && Object.keys(e).length === 1 && !!e.$ref && e.$ref.charAt(0) === "$";
    const encycle = (arg) => {
      validate(arg);
      const recurs = (value) => isArray(value) || isObject(value) ? isArray(value) ? value.map((elem, i) => isRef(elem) ? (value[i] = eval("arg" + elem.$ref.slice(1)), value) : recurs(elem)) : Object.keys(value).reduce((accum, key) => (accum[key] = isRef(value[key]) ? eval("arg" + value[key].$ref.slice(1)) : recurs(value[key]), accum), value) : value;
      return recurs(arg);
    };
    const findRef = (e, r) => Object.keys(r).find((a) => r[a] === e);
    const decycle = (e) => {
      validate(e);
      let r = {};
      const a = (e2, c = "$") => {
        const s = findRef(e2, r);
        return s ? {$ref: s} : isArray(e2) || isObject(e2) ? (r[c] = e2, isArray(e2) ? e2.map((e3, r2) => a(e3, `${c}[${r2}]`)) : Object.keys(e2).reduce((r2, s2) => (r2[s2] = a(e2[s2], `${c}.${s2}`), r2), {})) : e2;
      };
      return a(e);
    };
    exports.decycle = decycle, exports.encycle = encycle;
  });

  // ../sugar/src/js/promise/SPromise.js
  var require_SPromise = __commonJS((exports2) => {
    __export(exports2, {
      default: () => SPromise9
    });
    const minimatch = __toModule(require_minimatch());
    class SPromise9 extends Promise {
      _settings = {};
      _promiseState = "pending";
      static map(sourceSPromise, destSPromise, settings = {}) {
        settings = deepMerge2({
          stacks: "catch,resolve,reject,finally,cancel",
          processor: null,
          filter: null
        }, settings);
        if (!(sourceSPromise instanceof SPromise9) || !(destSPromise instanceof SPromise9))
          return;
        sourceSPromise.on(settings.stacks, (value, metas) => {
          if (settings.filter && !settings.filter(value, metas))
            return;
          if (settings.processor) {
            const res = settings.processor(value, metas);
            if (Array.isArray(res) && res.length === 2) {
              value = res[0];
              metas = res[1];
            } else {
              value = res;
            }
          }
          if (destSPromise[metas.stack] && typeof destSPromise[metas.stack] === "function") {
            destSPromise[metas.stack](value);
          } else {
            destSPromise.trigger(metas.stack, value);
          }
        });
      }
      static pipe(sourceSPromise, destSPromise, settings = {}) {
        settings = deepMerge2({
          stacks: "*",
          prefixStack: true,
          processor: null,
          exclude: [],
          filter: null
        }, settings);
        if (!(sourceSPromise instanceof SPromise9) || !(destSPromise instanceof SPromise9))
          return;
        sourceSPromise.on(settings.stacks, (value, metas) => {
          if (settings.exclude.indexOf(metas.stack) !== -1)
            return;
          if (settings.filter && !settings.filter(value, metas))
            return;
          if (settings.processor) {
            const res = settings.processor(value, metas);
            if (Array.isArray(res) && res.length === 2) {
              value = res[0];
              metas = res[1];
            } else {
              value = res;
            }
          }
          let triggerStack = metas.stack;
          if (settings.prefixStack) {
            triggerStack = `${sourceSPromise.id}.${metas.stack}`;
            metas.stack = triggerStack;
          }
          destSPromise.trigger(metas.stack, value, {
            ...metas,
            level: metas.level + 1
          });
        });
      }
      constructor(executorFnOrSettings = {}, settings = {}) {
        let _masterPromiseRejectFn, _masterPromiseResolveFn;
        const _resolve = (...args) => {
          setTimeout(() => {
            this.resolve(...args);
          });
        };
        const _reject = (...args) => {
          setTimeout(() => {
            this.reject(...args);
          });
        };
        const _trigger = (...args) => {
          setTimeout(() => {
            this.trigger(...args);
          });
        };
        const _cancel = (...args) => {
          setTimeout(() => {
            this.cancel(...args);
          });
        };
        super((resolve) => {
          _masterPromiseResolveFn = resolve;
          new Promise((rejectPromiseResolve, rejectPromiseReject) => {
            _masterPromiseRejectFn = rejectPromiseReject;
          }).catch((e) => {
            this.trigger("catch", e);
          });
          const executor = typeof executorFnOrSettings === "function" ? executorFnOrSettings : null;
          if (executor) {
            return executor(_resolve, _reject, _trigger, _cancel);
          }
        });
        Object.defineProperty(this, "_masterPromiseResolveFn", {
          writable: true,
          configurable: true,
          enumerable: false,
          value: _masterPromiseResolveFn
        });
        Object.defineProperty(this, "_masterPromiseRejectFn", {
          writable: true,
          configurable: true,
          enumerable: false,
          value: _masterPromiseRejectFn
        });
        Object.defineProperty(this, "_promiseState", {
          writable: true,
          configurable: true,
          enumerable: false,
          value: "pending"
        });
        Object.defineProperty(this, "_stacks", {
          writable: true,
          configurable: true,
          enumerable: false,
          value: {
            catch: [],
            resolve: [],
            reject: [],
            finally: [],
            cancel: []
          }
        });
        this._settings = deepMerge2({
          destroyTimeout: 5e3,
          id: uniqid2()
        }, typeof executorFnOrSettings === "object" ? executorFnOrSettings : {}, settings);
        if (this._settings.destroyTimeout !== -1) {
          this.on("finally", () => {
            setTimeout(() => {
              this._destroy();
            }, this._settings.destroyTimeout);
          });
        }
      }
      get id() {
        return this._settings.id;
      }
      get promiseState() {
        return this._promiseState;
      }
      is(status) {
        const statusArray = status.split(",").map((l) => l.trim());
        if (statusArray.indexOf(this._promiseState) !== -1)
          return true;
        return false;
      }
      isPending() {
        return this._promiseState === "pending";
      }
      isResolved() {
        return this._promiseState === "resolved";
      }
      isRejected() {
        return this._promiseState === "rejected";
      }
      isCanceled() {
        return this._promiseState === "canceled";
      }
      isDestroyed() {
        return this._promiseState === "destroyed";
      }
      pipe(dest, settings = {}) {
        SPromise9.pipe(this, dest, settings);
        return this;
      }
      resolve(arg, stacksOrder = "resolve,finally") {
        return this._resolve(arg, stacksOrder);
      }
      _resolve(arg, stacksOrder = "resolve,finally") {
        if (this._isDestroyed)
          return;
        return new Promise(async (resolve, reject) => {
          this._promiseState = "resolved";
          const stacksResult = await this._triggerStacks(stacksOrder, arg);
          this._masterPromiseResolveFn(stacksResult);
          resolve(stacksResult);
        });
      }
      reject(arg, stacksOrder = `catch,reject,finally`) {
        return this._reject(arg, stacksOrder);
      }
      _reject(arg, stacksOrder = `catch,reject,finally`) {
        if (this._isDestroyed)
          return;
        return new Promise(async (resolve, reject) => {
          this._promiseState = "rejected";
          const stacksResult = await this._triggerStacks(stacksOrder, arg);
          this._masterPromiseRejectFn(arg);
          resolve(stacksResult);
        });
      }
      cancel(arg, stacksOrder = "cancel,finally") {
        return this._cancel(arg, stacksOrder);
      }
      _cancel(arg, stacksOrder = "cancel,finally") {
        if (this._isDestroyed)
          return;
        return new Promise(async (resolve, reject) => {
          this._promiseState = "canceled";
          const stacksResult = await this._triggerStacks(stacksOrder, arg);
          this._masterPromiseResolveFn(stacksResult);
          resolve(stacksResult);
        });
      }
      async trigger(what, arg, metas = {}) {
        if (this._isDestroyed)
          return;
        return this._triggerStacks(what, arg, metas);
      }
      _registerNewStacks(stacks) {
        if (typeof stacks === "string")
          stacks = stacks.split(",").map((s) => s.trim());
        stacks.forEach((stack) => {
          if (!this._stacks[stack]) {
            this._stacks[stack] = [];
          }
        });
      }
      _registerCallbackInStack(stack, ...args) {
        if (this._isDestroyed) {
          throw new Error(`Sorry but you can't call the "${stack}" method on this SPromise cause it has been destroyed...`);
        }
        if (!this._stacks[stack]) {
          this._registerNewStacks(stack);
        }
        if (typeof stack === "string")
          stack = this._stacks[stack];
        let callback = args[0];
        let callNumber = -1;
        if (args.length === 2 && typeof args[0] === "number") {
          callback = args[1];
          callNumber = args[0];
        }
        if (typeof callback === "function" && stack.indexOf(callback) === -1)
          stack.push({
            callback,
            callNumber,
            called: 0
          });
        return this;
      }
      async _triggerStack(stack, initialValue, metas = {}) {
        let currentCallbackReturnedValue = initialValue;
        if (!this._stacks || Object.keys(this._stacks).length === 0)
          return currentCallbackReturnedValue;
        let stackArray = [];
        if (typeof stack === "string") {
          if (this._stacks[stack]) {
            stackArray = [...stackArray, ...this._stacks[stack]];
          }
          Object.keys(this._stacks).forEach((stackName) => {
            if (stackName === stack)
              return;
            if (minimatch.default(stack, stackName)) {
              stackArray = [...stackArray, ...this._stacks[stackName]];
            }
          });
        }
        stackArray.map((item) => item.called++);
        stackArray = stackArray.filter((item) => {
          if (item.callNumber === -1)
            return true;
          if (item.called <= item.callNumber)
            return true;
          return false;
        });
        const metasObj = deepMerge2({
          stack,
          originalStack: stack,
          id: this._settings.id,
          state: this._promiseState,
          time: Date.now(),
          level: 1
        }, metas);
        for (let i = 0; i < stackArray.length; i++) {
          const item = stackArray[i];
          if (!item.callback)
            return currentCallbackReturnedValue;
          let callbackResult = item.callback(currentCallbackReturnedValue, metasObj);
          callbackResult = await callbackResult;
          if (callbackResult !== void 0) {
            currentCallbackReturnedValue = callbackResult;
          }
        }
        return currentCallbackReturnedValue;
      }
      _triggerStacks(stacks, initialValue, metas = {}) {
        return new Promise(async (resolve, reject) => {
          if (!stacks)
            return this;
          if (typeof stacks === "string")
            stacks = stacks.split(",").map((s) => s.trim());
          let currentStackResult = initialValue;
          for (let i = 0; i < stacks.length; i++) {
            const stackResult = await this._triggerStack(stacks[i], currentStackResult, metas);
            if (stackResult !== void 0) {
              currentStackResult = stackResult;
            }
          }
          resolve(currentStackResult);
        });
      }
      on(stacks, callback) {
        if (this._isDestroyed) {
          throw new Error(`Sorry but you can't call the "on" method on this SPromise cause it has been destroyed...`);
        }
        if (typeof stacks === "string")
          stacks = stacks.split(",").map((s) => s.trim());
        stacks.forEach((name) => {
          const splitedName = name.split(":");
          let callNumber = -1;
          if (splitedName.length === 2) {
            name = splitedName[0];
            callNumber = parseInt(splitedName[1]);
          }
          this._registerCallbackInStack(name, callNumber, callback);
        });
        return this;
      }
      off(name, callback = null) {
        if (!callback) {
          delete this._stacks[name];
          return this;
        }
        let stack = this._stacks[name];
        if (!stack)
          return this;
        stack = stack.filter((item) => {
          if (item.callback === callback)
            return false;
          return true;
        });
        this._stacks[name] = stack;
        return this;
      }
      catch(...args) {
        return this.on("catch", ...args);
      }
      finally(...args) {
        return this.on("finally", ...args);
      }
      resolved(...args) {
        return this.on("resolve", ...args);
      }
      rejected(...args) {
        return this.on("reject", ...args);
      }
      canceled(...args) {
        return this.on("cancel", ...args);
      }
      _destroy() {
        this._promiseState = "destroyed";
        delete this._stacks;
        delete this._masterPromiseResolveFn;
        delete this._masterPromiseRejectFn;
        delete this._settings;
        this._isDestroyed = true;
      }
    }
  });

  // ../sugar/node_modules/is-class/is-class.js
  var require_is_class = __commonJS((exports2, module2) => {
    (function(root) {
      const toString13 = Function.prototype.toString;
      function fnBody(fn) {
        return toString13.call(fn).replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
      }
      function isClass(fn) {
        if (typeof fn !== "function") {
          return false;
        }
        if (/^class[\s{]/.test(toString13.call(fn))) {
          return true;
        }
        const body = fnBody(fn);
        return /classCallCheck\(/.test(body) || /TypeError\("Cannot call a class as a function"\)/.test(body);
      }
      if (typeof exports2 !== "undefined") {
        if (typeof module2 !== "undefined" && module2.exports) {
          exports2 = module2.exports = isClass;
        }
        exports2.isClass = isClass;
      } else if (typeof define === "function" && define.amd) {
        define([], function() {
          return isClass;
        });
      } else {
        root.isClass = isClass;
      }
    })(exports2);
  });

  // ../sugar/src/js/dom/whenAttribute.js
  var require_whenAttribute = __commonJS((exports2) => {
    __export(exports2, {
      default: () => whenAttribute
    });
    const autoCast6 = __toModule(require_autoCast());
    function whenAttribute(elm, attrName, checkFn = null) {
      return new Promise((resolve, reject) => {
        if (elm.hasAttribute(attrName)) {
          const value = autoCast6.default(elm.getAttribute(attrName));
          if (checkFn && checkFn(value, value)) {
            resolve(value);
            return;
          } else if (!checkFn) {
            resolve(value);
            return;
          }
        }
        const obs = observeAttributes_default(elm).then((mutation) => {
          if (mutation.attributeName === attrName) {
            const value = autoCast6.default(mutation.target.getAttribute(mutation.attributeName));
            if (checkFn && checkFn(value, mutation.oldValue)) {
              resolve(value);
              obs.cancel();
            } else if (!checkFn) {
              resolve(value);
              obs.cancel();
            }
          }
        });
      });
    }
  });

  // ../sugar/node_modules/in-viewport/in-viewport.js
  var require_in_viewport = __commonJS((exports2, module2) => {
    module2.exports = inViewport;
    var instances = [];
    var supportsMutationObserver = typeof global.MutationObserver === "function";
    function inViewport(elt, params, cb) {
      var opts = {
        container: global.document.body,
        offset: 0,
        debounce: 15,
        failsafe: 150
      };
      if (params === void 0 || typeof params === "function") {
        cb = params;
        params = {};
      }
      var container = opts.container = params.container || opts.container;
      var offset = opts.offset = params.offset || opts.offset;
      var debounceValue = opts.debounce = params.debounce || opts.debounce;
      var failsafe = opts.failsafe = params.failsafe || opts.failsafe;
      if (failsafe === true) {
        failsafe = 150;
      } else if (failsafe === false) {
        failsafe = 0;
      }
      if (failsafe > 0 && failsafe < debounceValue) {
        failsafe = debounceValue + 50;
      }
      for (var i = 0; i < instances.length; i++) {
        if (instances[i].container === container && instances[i]._debounce === debounceValue && instances[i]._failsafe === failsafe) {
          return instances[i].isInViewport(elt, offset, cb);
        }
      }
      return instances[instances.push(createInViewport(container, debounceValue, failsafe)) - 1].isInViewport(elt, offset, cb);
    }
    function addEvent(el, type, fn) {
      if (el.attachEvent) {
        el.attachEvent("on" + type, fn);
      } else {
        el.addEventListener(type, fn, false);
      }
    }
    function debounce(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
          func.apply(context, args);
        function later() {
          timeout = null;
          if (!immediate)
            func.apply(context, args);
        }
      };
    }
    var contains = function() {
      if (!global.document) {
        return true;
      }
      return global.document.documentElement.compareDocumentPosition ? function(a, b) {
        return !!(a.compareDocumentPosition(b) & 16);
      } : global.document.documentElement.contains ? function(a, b) {
        return a !== b && (a.contains ? a.contains(b) : false);
      } : function(a, b) {
        while (b = b.parentNode) {
          if (b === a) {
            return true;
          }
        }
        return false;
      };
    };
    function createInViewport(container, debounceValue, failsafe) {
      var watches = createWatches();
      var scrollContainer = container === global.document.body ? global : container;
      var debouncedCheck = debounce(watches.checkAll(watchInViewport), debounceValue);
      addEvent(scrollContainer, "scroll", debouncedCheck);
      if (scrollContainer === global) {
        addEvent(global, "resize", debouncedCheck);
      }
      if (supportsMutationObserver) {
        observeDOM(watches, container, debouncedCheck);
      }
      if (failsafe > 0) {
        setInterval(debouncedCheck, failsafe);
      }
      function isInViewport2(elt, offset, cb) {
        if (!cb) {
          return isVisible3(elt, offset);
        }
        var remote = createRemote(elt, offset, cb);
        remote.watch();
        return remote;
      }
      function createRemote(elt, offset, cb) {
        function watch4() {
          watches.add(elt, offset, cb);
        }
        function dispose() {
          watches.remove(elt);
        }
        return {
          watch: watch4,
          dispose
        };
      }
      function watchInViewport(elt, offset, cb) {
        if (isVisible3(elt, offset)) {
          watches.remove(elt);
          cb(elt);
        }
      }
      function isVisible3(elt, offset) {
        if (!elt) {
          return false;
        }
        if (!contains(global.document.documentElement, elt) || !contains(global.document.documentElement, container)) {
          return false;
        }
        if (!elt.offsetWidth || !elt.offsetHeight) {
          return false;
        }
        var eltRect = elt.getBoundingClientRect();
        var viewport = {};
        if (container === global.document.body) {
          viewport = {
            top: -offset,
            left: -offset,
            right: global.document.documentElement.clientWidth + offset,
            bottom: global.document.documentElement.clientHeight + offset
          };
        } else {
          var containerRect = container.getBoundingClientRect();
          viewport = {
            top: containerRect.top - offset,
            left: containerRect.left - offset,
            right: containerRect.right + offset,
            bottom: containerRect.bottom + offset
          };
        }
        var visible = eltRect.right >= viewport.left && eltRect.left <= viewport.right && eltRect.bottom >= viewport.top && eltRect.top <= viewport.bottom;
        return visible;
      }
      return {
        container,
        isInViewport: isInViewport2,
        _debounce: debounceValue,
        _failsafe: failsafe
      };
    }
    function createWatches() {
      var watches = [];
      function add(elt, offset, cb) {
        if (!isWatched(elt)) {
          watches.push([elt, offset, cb]);
        }
      }
      function remove(elt) {
        var pos = indexOf(elt);
        if (pos !== -1) {
          watches.splice(pos, 1);
        }
      }
      function indexOf(elt) {
        for (var i = watches.length - 1; i >= 0; i--) {
          if (watches[i][0] === elt) {
            return i;
          }
        }
        return -1;
      }
      function isWatched(elt) {
        return indexOf(elt) !== -1;
      }
      function checkAll(cb) {
        return function() {
          for (var i = watches.length - 1; i >= 0; i--) {
            cb.apply(this, watches[i]);
          }
        };
      }
      return {
        add,
        remove,
        isWatched,
        checkAll
      };
    }
    function observeDOM(watches, container, cb) {
      var observer = new MutationObserver(watch4);
      var filter = Array.prototype.filter;
      var concat = Array.prototype.concat;
      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true
      });
      function watch4(mutations) {
        if (mutations.some(knownNodes) === true) {
          setTimeout(cb, 0);
        }
      }
      function knownNodes(mutation) {
        var nodes = concat.call([], Array.prototype.slice.call(mutation.addedNodes), mutation.target);
        return filter.call(nodes, watches.isWatched).length > 0;
      }
    }
  });

  // ../sugar/src/js/dom/whenInViewport.js
  var require_whenInViewport = __commonJS((exports2) => {
    __export(exports2, {
      default: () => whenInViewport
    });
    const in_viewport = __toModule(require_in_viewport());
    function whenInViewport(elm, offset = 50) {
      return new Promise((resolve, reject) => {
        in_viewport.default(elm, {
          offset
        }, () => {
          resolve(elm);
        });
      });
    }
  });

  // ../sugar/src/js/dom/whenOutOfViewport.js
  var require_whenOutOfViewport = __commonJS((exports2) => {
    __export(exports2, {
      default: () => whenOutOfViewport
    });
    function whenOutOfViewport(elm, offset = 50) {
      return new Promise((resolve, reject) => {
        if (window.IntersectionObserver) {
          let isInViewport3 = false, _cb = () => {
            if (!isInViewport3) {
              observer.disconnect();
              resolve(elm);
            }
          };
          const observer = new IntersectionObserver((entries, observer2) => {
            if (!entries.length)
              return;
            const entry = entries[0];
            if (entry.intersectionRatio > 0) {
              isInViewport3 = true;
            } else {
              isInViewport3 = false;
            }
            _cb();
          }, {
            root: null,
            rootMargin: `${offset}px`,
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
          });
          observer.observe(elm);
        } else {
          let scrollContainerElm = document;
          if (!elm._inViewportContainer) {
            const overflowContainer = closest(elm, "[data-in-viewport-container]");
            if (overflowContainer) {
              scrollContainerElm = overflowContainer;
              elm._inViewportContainer = overflowContainer;
            }
          } else {
            scrollContainerElm = elm._inViewportContainer;
          }
          let isInViewport3 = true, _cb = () => {
            if (!isInViewport3) {
              scrollContainerElm.removeEventListener("scroll", checkViewport);
              window.removeEventListener("resize", checkViewport);
              resolve(elm);
            }
          };
          let checkViewport = throttle((e) => {
            isInViewport3 = isInViewport(elm, offset);
            _cb();
          }, 100);
          scrollContainerElm.addEventListener("scroll", checkViewport);
          window.addEventListener("resize", checkViewport);
          setTimeout(() => {
            checkViewport(null);
          });
        }
      });
    }
  });

  // ../sugar/src/js/dom/whenTransitionEnd.js
  var require_whenTransitionEnd = __commonJS((exports2) => {
    __export(exports2, {
      default: () => whenTransitionEnd
    });
    function whenTransitionEnd(elm, cb = null) {
      return new Promise((resolve, reject) => {
        const transition = getTransitionProperties(elm);
        setTimeout(() => {
          resolve();
          cb && cb();
        }, transition.totalDuration);
      });
    }
  });

  // ../sugar/src/js/dom/whenVisible.js
  var require_whenVisible = __commonJS((exports2) => {
    __export(exports2, {
      default: () => whenVisible
    });
    function whenVisible(elm, cb = null) {
      return new Promise((resolve, reject) => {
        let isSelfVisible = false, areParentsVisible = false, closestNotVisible3 = null, selfObserver = null, parentObserver = null;
        const _cb = () => {
          if (isSelfVisible && areParentsVisible) {
            if (cb)
              cb(elm);
            resolve(elm);
            elm.removeEventListener("transitionend", _eventCb);
            elm.removeEventListener("animationstart", _eventCb);
            elm.removeEventListener("animationend", _eventCb);
            if (closestNotVisible3) {
              closestNotVisible3.removeEventListener("transitionend", _eventCb);
              closestNotVisible3.removeEventListener("animationstart", _eventCb);
              closestNotVisible3.removeEventListener("animationend", _eventCb);
            }
          }
        };
        const _eventCb = (e) => {
          setTimeout(() => {
            if (e.target === elm) {
              if (isVisible(elm)) {
                isSelfVisible = true;
                if (selfObserver && selfObserver.disconnect) {
                  selfObserver.disconnect();
                }
                elm.removeEventListener("transitionend", _eventCb);
                elm.removeEventListener("animationstart", _eventCb);
                elm.removeEventListener("animationend", _eventCb);
              }
            } else if (e.target === closestNotVisible3) {
              if (isVisible(closestNotVisible3)) {
                areParentsVisible = true;
                if (parentObserver && parentObserver.disconnect) {
                  parentObserver.disconnect();
                }
                closestNotVisible3.removeEventListener("transitionend", _eventCb);
                closestNotVisible3.removeEventListener("animationstart", _eventCb);
                closestNotVisible3.removeEventListener("animationend", _eventCb);
              }
            }
            _cb();
          });
        };
        if (!isVisible(elm)) {
          selfObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === "style" || mutation.attributeName === "class") {
                if (isVisible(mutation.target)) {
                  isSelfVisible = true;
                  _cb();
                  selfObserver.disconnect();
                }
              }
            });
          });
          selfObserver.observe(elm, {attributes: true});
          elm.addEventListener("animationstart", _eventCb);
          elm.addEventListener("animationend", _eventCb);
          elm.addEventListener("transitionend", _eventCb);
        } else {
          isSelfVisible = true;
        }
        closestNotVisible3 = closestNotVisible(elm);
        if (closestNotVisible3) {
          parentObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === "style" || mutation.attributeName === "class") {
                if (isVisible(mutation.target)) {
                  areParentsVisible = true;
                  _cb();
                  parentObserver.disconnect();
                }
              }
            });
          });
          parentObserver.observe(closestNotVisible3, {attributes: true});
          closestNotVisible3.addEventListener("animationstart", _eventCb);
          closestNotVisible3.addEventListener("animationend", _eventCb);
          closestNotVisible3.addEventListener("transitionend", _eventCb);
        } else {
          areParentsVisible = true;
        }
        _cb();
      });
    }
  });

  // ../sugar/node_modules/is-invalid-path/node_modules/is-extglob/index.js
  var require_is_extglob = __commonJS((exports2, module2) => {
    /*!
     * is-extglob <https://github.com/jonschlinkert/is-extglob>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     */
    module2.exports = function isExtglob(str) {
      return typeof str === "string" && /[@?!+*]\(/.test(str);
    };
  });

  // ../sugar/node_modules/is-invalid-path/node_modules/is-glob/index.js
  var require_is_glob = __commonJS((exports2, module2) => {
    /*!
     * is-glob <https://github.com/jonschlinkert/is-glob>
     *
     * Copyright (c) 2014-2015, Jon Schlinkert.
     * Licensed under the MIT License.
     */
    var isExtglob = require_is_extglob();
    module2.exports = function isGlob(str) {
      return typeof str === "string" && (/[*!?{}(|)[\]]/.test(str) || isExtglob(str));
    };
  });

  // ../sugar/node_modules/is-invalid-path/index.js
  var require_is_invalid_path = __commonJS((exports2, module2) => {
    /*!
     * is-invalid-path <https://github.com/jonschlinkert/is-invalid-path>
     *
     * Copyright (c) 2015, Jon Schlinkert.
     * Licensed under the MIT License.
     */
    "use strict";
    var isGlob = require_is_glob();
    var re = /[‘“!#$%&+^<=>`]/;
    module2.exports = function(str) {
      return typeof str !== "string" || isGlob(str) || re.test(str);
    };
  });

  // ../sugar/node_modules/is-valid-path/index.js
  var require_is_valid_path = __commonJS((exports2, module2) => {
    /*!
     * is-valid-path <https://github.com/jonschlinkert/is-valid-path>
     *
     * Copyright (c) 2015 Jon Schlinkert, contributors.
     * Licensed under the MIT license.
     */
    "use strict";
    var isInvalidPath = require_is_invalid_path();
    module2.exports = function(str) {
      return isInvalidPath(str) === false;
    };
  });

  // ../sugar/node_modules/lodash.clone/index.js
  var require_lodash = __commonJS((exports2, module2) => {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set4, value) {
      set4.add(value);
      return set4;
    }
    function arrayEach(array2, iteratee) {
      var index = -1, length = array2 ? array2.length : 0;
      while (++index < length) {
        if (iteratee(array2[index], index, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function arrayPush(array2, values) {
      var index = -1, length = values.length, offset = array2.length;
      while (++index < length) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    function arrayReduce(array2, iteratee, accumulator, initAccum) {
      var index = -1, length = array2 ? array2.length : 0;
      if (initAccum && length) {
        accumulator = array2[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array2[index], index, array2);
      }
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object2, key) {
      return object2 == null ? void 0 : object2[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set4) {
      var index = -1, result = Array(set4.size);
      set4.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (Map2 || ListCache)(),
        string: new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache5 = this.__data__;
      if (cache5 instanceof ListCache) {
        var pairs = cache5.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache5 = this.__data__ = new MapCache(pairs);
      }
      cache5.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray3(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue(object2, key, value) {
      var objValue = object2[key];
      if (!(hasOwnProperty.call(object2, key) && eq(objValue, value)) || value === void 0 && !(key in object2)) {
        object2[key] = value;
      }
    }
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object2, source) {
      return object2 && copyObject(source, keys(source), object2);
    }
    function baseClone(value, isDeep, isFull, customizer, key, object2, stack) {
      var result;
      if (customizer) {
        result = object2 ? customizer(value, key, object2, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject3(value)) {
        return value;
      }
      var isArr = isArray3(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object2) {
          if (isHostObject(value)) {
            return object2 ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object2 ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject3(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object2, keysFunc, symbolsFunc) {
      var result = keysFunc(object2);
      return isArray3(object2) ? result : arrayPush(result, symbolsFunc(object2));
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseIsNative(value) {
      if (!isObject3(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object2) {
      if (!isPrototype(object2)) {
        return nativeKeys(object2);
      }
      var result = [];
      for (var key in Object(object2)) {
        if (hasOwnProperty.call(object2, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array2 = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array2, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp2) {
      var result = new regexp2.constructor(regexp2.source, reFlags.exec(regexp2));
      result.lastIndex = regexp2.lastIndex;
      return result;
    }
    function cloneSet(set4, isDeep, cloneFunc) {
      var array2 = isDeep ? cloneFunc(setToArray(set4), true) : setToArray(set4);
      return arrayReduce(array2, addSetEntry, new set4.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array2) {
      var index = -1, length = source.length;
      array2 || (array2 = Array(length));
      while (++index < length) {
        array2[index] = source[index];
      }
      return array2;
    }
    function copyObject(source, props, object2, customizer) {
      object2 || (object2 = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : void 0;
        assignValue(object2, key, newValue === void 0 ? source[key] : newValue);
      }
      return object2;
    }
    function copySymbols(source, object2) {
      return copyObject(source, getSymbols(source), object2);
    }
    function getAllKeys(object2) {
      return baseGetAllKeys(object2, keys, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object2, key) {
      var value = getValue(object2, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array2) {
      var length = array2.length, result = array2.constructor(length);
      if (length && typeof array2[0] == "string" && hasOwnProperty.call(array2, "index")) {
        result.index = array2.index;
        result.input = array2.input;
      }
      return result;
    }
    function initCloneObject(object2) {
      return typeof object2.constructor == "function" && !isPrototype(object2) ? baseCreate(getPrototype(object2)) : {};
    }
    function initCloneByTag(object2, tag, cloneFunc, isDeep) {
      var Ctor = object2.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object2);
        case boolTag:
        case dateTag:
          return new Ctor(+object2);
        case dataViewTag:
          return cloneDataView(object2, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object2, isDeep);
        case mapTag:
          return cloneMap(object2, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object2);
        case regexpTag:
          return cloneRegExp(object2);
        case setTag:
          return cloneSet(object2, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object2);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function clone6(value) {
      return baseClone(value, false, true);
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray3 = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction2(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction2(value) {
      var tag = isObject3(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject3(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object2) {
      return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module2.exports = clone6;
  });

  // ../sugar/node_modules/lodash.clonedeep/index.js
  var require_lodash2 = __commonJS((exports2, module2) => {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reFlags = /\w*$/;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports2 == "object" && exports2 && !exports2.nodeType && exports2;
    var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    function addMapEntry(map, pair) {
      map.set(pair[0], pair[1]);
      return map;
    }
    function addSetEntry(set4, value) {
      set4.add(value);
      return set4;
    }
    function arrayEach(array2, iteratee) {
      var index = -1, length = array2 ? array2.length : 0;
      while (++index < length) {
        if (iteratee(array2[index], index, array2) === false) {
          break;
        }
      }
      return array2;
    }
    function arrayPush(array2, values) {
      var index = -1, length = values.length, offset = array2.length;
      while (++index < length) {
        array2[offset + index] = values[index];
      }
      return array2;
    }
    function arrayReduce(array2, iteratee, accumulator, initAccum) {
      var index = -1, length = array2 ? array2.length : 0;
      if (initAccum && length) {
        accumulator = array2[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array2[index], index, array2);
      }
      return accumulator;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function getValue(object2, key) {
      return object2 == null ? void 0 : object2[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set4) {
      var index = -1, result = Array(set4.size);
      set4.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        hash: new Hash(),
        map: new (Map2 || ListCache)(),
        string: new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache5 = this.__data__;
      if (cache5 instanceof ListCache) {
        var pairs = cache5.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache5 = this.__data__ = new MapCache(pairs);
      }
      cache5.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray3(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assignValue(object2, key, value) {
      var objValue = object2[key];
      if (!(hasOwnProperty.call(object2, key) && eq(objValue, value)) || value === void 0 && !(key in object2)) {
        object2[key] = value;
      }
    }
    function assocIndexOf(array2, key) {
      var length = array2.length;
      while (length--) {
        if (eq(array2[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseAssign(object2, source) {
      return object2 && copyObject(source, keys(source), object2);
    }
    function baseClone(value, isDeep, isFull, customizer, key, object2, stack) {
      var result;
      if (customizer) {
        result = object2 ? customizer(value, key, object2, stack) : customizer(value);
      }
      if (result !== void 0) {
        return result;
      }
      if (!isObject3(value)) {
        return value;
      }
      var isArr = isArray3(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return copyArray(value, result);
        }
      } else {
        var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
        if (isBuffer(value)) {
          return cloneBuffer(value, isDeep);
        }
        if (tag == objectTag || tag == argsTag || isFunc && !object2) {
          if (isHostObject(value)) {
            return object2 ? value : {};
          }
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return copySymbols(value, baseAssign(result, value));
          }
        } else {
          if (!cloneableTags[tag]) {
            return object2 ? value : {};
          }
          result = initCloneByTag(value, tag, baseClone, isDeep);
        }
      }
      stack || (stack = new Stack());
      var stacked = stack.get(value);
      if (stacked) {
        return stacked;
      }
      stack.set(value, result);
      if (!isArr) {
        var props = isFull ? getAllKeys(value) : keys(value);
      }
      arrayEach(props || value, function(subValue, key2) {
        if (props) {
          key2 = subValue;
          subValue = value[key2];
        }
        assignValue(result, key2, baseClone(subValue, isDeep, isFull, customizer, key2, value, stack));
      });
      return result;
    }
    function baseCreate(proto) {
      return isObject3(proto) ? objectCreate(proto) : {};
    }
    function baseGetAllKeys(object2, keysFunc, symbolsFunc) {
      var result = keysFunc(object2);
      return isArray3(object2) ? result : arrayPush(result, symbolsFunc(object2));
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseIsNative(value) {
      if (!isObject3(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction2(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseKeys(object2) {
      if (!isPrototype(object2)) {
        return nativeKeys(object2);
      }
      var result = [];
      for (var key in Object(object2)) {
        if (hasOwnProperty.call(object2, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
      return result;
    }
    function cloneDataView(dataView, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    function cloneMap(map, isDeep, cloneFunc) {
      var array2 = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
      return arrayReduce(array2, addMapEntry, new map.constructor());
    }
    function cloneRegExp(regexp2) {
      var result = new regexp2.constructor(regexp2.source, reFlags.exec(regexp2));
      result.lastIndex = regexp2.lastIndex;
      return result;
    }
    function cloneSet(set4, isDeep, cloneFunc) {
      var array2 = isDeep ? cloneFunc(setToArray(set4), true) : setToArray(set4);
      return arrayReduce(array2, addSetEntry, new set4.constructor());
    }
    function cloneSymbol(symbol) {
      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    function copyArray(source, array2) {
      var index = -1, length = source.length;
      array2 || (array2 = Array(length));
      while (++index < length) {
        array2[index] = source[index];
      }
      return array2;
    }
    function copyObject(source, props, object2, customizer) {
      object2 || (object2 = {});
      var index = -1, length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : void 0;
        assignValue(object2, key, newValue === void 0 ? source[key] : newValue);
      }
      return object2;
    }
    function copySymbols(source, object2) {
      return copyObject(source, getSymbols(source), object2);
    }
    function getAllKeys(object2) {
      return baseGetAllKeys(object2, keys, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object2, key) {
      var value = getValue(object2, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function initCloneArray(array2) {
      var length = array2.length, result = array2.constructor(length);
      if (length && typeof array2[0] == "string" && hasOwnProperty.call(array2, "index")) {
        result.index = array2.index;
        result.input = array2.input;
      }
      return result;
    }
    function initCloneObject(object2) {
      return typeof object2.constructor == "function" && !isPrototype(object2) ? baseCreate(getPrototype(object2)) : {};
    }
    function initCloneByTag(object2, tag, cloneFunc, isDeep) {
      var Ctor = object2.constructor;
      switch (tag) {
        case arrayBufferTag:
          return cloneArrayBuffer(object2);
        case boolTag:
        case dateTag:
          return new Ctor(+object2);
        case dataViewTag:
          return cloneDataView(object2, isDeep);
        case float32Tag:
        case float64Tag:
        case int8Tag:
        case int16Tag:
        case int32Tag:
        case uint8Tag:
        case uint8ClampedTag:
        case uint16Tag:
        case uint32Tag:
          return cloneTypedArray(object2, isDeep);
        case mapTag:
          return cloneMap(object2, isDeep, cloneFunc);
        case numberTag:
        case stringTag:
          return new Ctor(object2);
        case regexpTag:
          return cloneRegExp(object2);
        case setTag:
          return cloneSet(object2, isDeep, cloneFunc);
        case symbolTag:
          return cloneSymbol(object2);
      }
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function cloneDeep(value) {
      return baseClone(value, true, true);
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray3 = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction2(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isFunction2(value) {
      var tag = isObject3(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject3(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function keys(object2) {
      return isArrayLike(object2) ? arrayLikeKeys(object2) : baseKeys(object2);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module2.exports = cloneDeep;
  });

  // node_modules/util/support/isBufferBrowser.js
  var require_isBufferBrowser = __commonJS((exports2, module2) => {
    module2.exports = function isBuffer(arg) {
      return arg && typeof arg === "object" && typeof arg.copy === "function" && typeof arg.fill === "function" && typeof arg.readUInt8 === "function";
    };
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/lib/utils.js
  var require_utils2 = __commonJS((exports2) => {
    "use strict";
    exports2.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports2.find = (node6, type) => node6.nodes.find((node7) => node7.type === type);
    exports2.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false)
        return false;
      if (!exports2.isInteger(min) || !exports2.isInteger(max))
        return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports2.escapeNode = (block, n = 0, type) => {
      let node6 = block.nodes[n];
      if (!node6)
        return;
      if (type && node6.type === type || node6.type === "open" || node6.type === "close") {
        if (node6.escaped !== true) {
          node6.value = "\\" + node6.value;
          node6.escaped = true;
        }
      }
    };
    exports2.encloseBrace = (node6) => {
      if (node6.type !== "brace")
        return false;
      if (node6.commas >> 0 + node6.ranges >> 0 === 0) {
        node6.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isInvalidBrace = (block) => {
      if (block.type !== "brace")
        return false;
      if (block.invalid === true || block.dollar)
        return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isOpenOrClose = (node6) => {
      if (node6.type === "open" || node6.type === "close") {
        return true;
      }
      return node6.open === true || node6.close === true;
    };
    exports2.reduce = (nodes) => nodes.reduce((acc, node6) => {
      if (node6.type === "text")
        acc.push(node6.value);
      if (node6.type === "range")
        node6.type = "text";
      return acc;
    }, []);
    exports2.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i];
          Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
        }
        return result;
      };
      flat(args);
      return result;
    };
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/lib/stringify.js
  var require_stringify = __commonJS((exports2, module2) => {
    "use strict";
    const utils = require_utils2();
    module2.exports = (ast, options = {}) => {
      let stringify3 = (node6, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        let invalidNode = node6.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node6.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node6)) {
            return "\\" + node6.value;
          }
          return node6.value;
        }
        if (node6.value) {
          return node6.value;
        }
        if (node6.nodes) {
          for (let child of node6.nodes) {
            output += stringify3(child);
          }
        }
        return output;
      };
      return stringify3(ast);
    };
  });

  // ../sugar/node_modules/micromatch/node_modules/is-number/index.js
  var require_is_number = __commonJS((exports2, module2) => {
    /*!
     * is-number <https://github.com/jonschlinkert/is-number>
     *
     * Copyright (c) 2014-present, Jon Schlinkert.
     * Released under the MIT License.
     */
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  });

  // ../sugar/node_modules/micromatch/node_modules/to-regex-range/index.js
  var require_to_regex_range = __commonJS((exports2, module2) => {
    /*!
     * to-regex-range <https://github.com/micromatch/to-regex-range>
     *
     * Copyright (c) 2015-present, Jon Schlinkert.
     * Released under the MIT License.
     */
    "use strict";
    const isNumber2 = require_is_number();
    const toRegexRange = (min, max, options) => {
      if (isNumber2(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber2(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = {relaxZeros: true, ...options};
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = {min, max, a, b};
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return {pattern: start, count: [], digits: 0};
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return {pattern, count: [count], digits};
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let {string: string2} = ele;
        if (!intersection && !contains(comparison, "string", string2)) {
          result.push(prefix + string2);
        }
        if (intersection && contains(comparison, "string", string2)) {
          result.push(prefix + string2);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++)
        arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer3, zeros) {
      return integer3 - integer3 % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  });

  // ../sugar/node_modules/micromatch/node_modules/fill-range/index.js
  var require_fill_range = __commonJS((exports2, module2) => {
    /*!
     * fill-range <https://github.com/jonschlinkert/fill-range>
     *
     * Copyright (c) 2014-present, Jon Schlinkert.
     * Licensed under the MIT License.
     */
    "use strict";
    const util = require_isBufferBrowser();
    const toRegexRange = require_to_regex_range();
    const isObject3 = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    const transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    const isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    const isNumber2 = (num) => Number.isInteger(+num);
    const zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-")
        value = value.slice(1);
      if (value === "0")
        return false;
      while (value[++index] === "0")
        ;
      return index > 0;
    };
    const stringify3 = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    const pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash)
          input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    const toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength)
        input = "0" + input;
      return negative ? "-" + input : input;
    };
    const toSequence = (parts8, options) => {
      parts8.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts8.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts8.positives.length) {
        positives = parts8.positives.join("|");
      }
      if (parts8.negatives.length) {
        negatives = `-(${prefix}${parts8.negatives.join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    const toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, {wrap: false, ...options});
      }
      let start = String.fromCharCode(a);
      if (a === b)
        return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    const toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    const rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    const invalidRange = (start, end, options) => {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    };
    const invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    const fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
          throw rangeError([start, end]);
        return [];
      }
      if (a === 0)
        a = 0;
      if (b === 0)
        b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify3(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts8 = {negatives: [], positives: []};
      let push = (num) => parts8[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts8, options) : toRegex(range, null, {wrap: false, ...options});
      }
      return range;
    };
    const fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber2(start) && start.length > 1 || !isNumber2(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, {wrap: false, options});
      }
      return range;
    };
    const fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, {transform: step});
      }
      if (isObject3(step)) {
        return fill(start, end, 0, step);
      }
      let opts = {...options};
      if (opts.capture === true)
        opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber2(step)) {
        if (step != null && !isObject3(step))
          return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber2(start) && isNumber2(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill;
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/lib/compile.js
  var require_compile = __commonJS((exports2, module2) => {
    "use strict";
    const fill = require_fill_range();
    const utils = require_utils2();
    const compile = (ast, options = {}) => {
      let walk = (node6, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent);
        let invalidNode = node6.invalid === true && options.escapeInvalid === true;
        let invalid = invalidBlock === true || invalidNode === true;
        let prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node6.isOpen === true) {
          return prefix + node6.value;
        }
        if (node6.isClose === true) {
          return prefix + node6.value;
        }
        if (node6.type === "open") {
          return invalid ? prefix + node6.value : "(";
        }
        if (node6.type === "close") {
          return invalid ? prefix + node6.value : ")";
        }
        if (node6.type === "comma") {
          return node6.prev.type === "comma" ? "" : invalid ? node6.value : "|";
        }
        if (node6.value) {
          return node6.value;
        }
        if (node6.nodes && node6.ranges > 0) {
          let args = utils.reduce(node6.nodes);
          let range = fill(...args, {...options, wrap: false, toRegex: true});
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node6.nodes) {
          for (let child of node6.nodes) {
            output += walk(child, node6);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile;
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/lib/expand.js
  var require_expand = __commonJS((exports2, module2) => {
    "use strict";
    const fill = require_fill_range();
    const stringify3 = require_stringify();
    const utils = require_utils2();
    const append = (queue = "", stash = "", enclose = false) => {
      let result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length)
        return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string")
              ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    const expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      let walk = (node6, parent = {}) => {
        node6.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node6.invalid || node6.dollar) {
          q.push(append(q.pop(), stringify3(node6, options)));
          return;
        }
        if (node6.type === "brace" && node6.invalid !== true && node6.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node6.nodes && node6.ranges > 0) {
          let args = utils.reduce(node6.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify3(node6, options);
          }
          q.push(append(q.pop(), range));
          node6.nodes = [];
          return;
        }
        let enclose = utils.encloseBrace(node6);
        let queue = node6.queue;
        let block = node6;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node6.nodes.length; i++) {
          let child = node6.nodes[i];
          if (child.type === "comma" && node6.type === "brace") {
            if (i === 1)
              queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node6);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/lib/constants.js
  var require_constants = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      CHAR_0: "0",
      CHAR_9: "9",
      CHAR_UPPERCASE_A: "A",
      CHAR_LOWERCASE_A: "a",
      CHAR_UPPERCASE_Z: "Z",
      CHAR_LOWERCASE_Z: "z",
      CHAR_LEFT_PARENTHESES: "(",
      CHAR_RIGHT_PARENTHESES: ")",
      CHAR_ASTERISK: "*",
      CHAR_AMPERSAND: "&",
      CHAR_AT: "@",
      CHAR_BACKSLASH: "\\",
      CHAR_BACKTICK: "`",
      CHAR_CARRIAGE_RETURN: "\r",
      CHAR_CIRCUMFLEX_ACCENT: "^",
      CHAR_COLON: ":",
      CHAR_COMMA: ",",
      CHAR_DOLLAR: "$",
      CHAR_DOT: ".",
      CHAR_DOUBLE_QUOTE: '"',
      CHAR_EQUAL: "=",
      CHAR_EXCLAMATION_MARK: "!",
      CHAR_FORM_FEED: "\f",
      CHAR_FORWARD_SLASH: "/",
      CHAR_HASH: "#",
      CHAR_HYPHEN_MINUS: "-",
      CHAR_LEFT_ANGLE_BRACKET: "<",
      CHAR_LEFT_CURLY_BRACE: "{",
      CHAR_LEFT_SQUARE_BRACKET: "[",
      CHAR_LINE_FEED: "\n",
      CHAR_NO_BREAK_SPACE: " ",
      CHAR_PERCENT: "%",
      CHAR_PLUS: "+",
      CHAR_QUESTION_MARK: "?",
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      CHAR_RIGHT_CURLY_BRACE: "}",
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      CHAR_SEMICOLON: ";",
      CHAR_SINGLE_QUOTE: "'",
      CHAR_SPACE: " ",
      CHAR_TAB: "	",
      CHAR_UNDERSCORE: "_",
      CHAR_VERTICAL_LINE: "|",
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
    };
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/lib/parse.js
  var require_parse = __commonJS((exports2, module2) => {
    "use strict";
    const stringify3 = require_stringify();
    const {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      CHAR_BACKTICK,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_LEFT_PARENTHESES,
      CHAR_RIGHT_PARENTHESES,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants();
    const parse5 = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      let opts = options || {};
      let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      let ast = {type: "root", input, nodes: []};
      let stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      let length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      let memo = {};
      const advance = () => input[index++];
      const push = (node6) => {
        if (node6.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node6.type === "text") {
          prev.value += node6.value;
          return;
        }
        block.nodes.push(node6);
        node6.parent = block;
        node6.prev = prev;
        prev = node6;
        return node6;
      };
      push({type: "bos"});
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({type: "text", value: (options.keepEscaping ? value : "") + advance()});
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({type: "text", value: "\\" + value});
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let closed = true;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({type: "text", value});
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({type: "paren", nodes: []});
          stack.push(block);
          push({type: "text", value});
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({type: "text", value});
            continue;
          }
          block = stack.pop();
          push({type: "text", value});
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          let open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true)
                value += next;
              break;
            }
            value += next;
          }
          push({type: "text", value});
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          let brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({type: "open", value});
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({type: "text", value});
            continue;
          }
          let type = "close";
          block = stack.pop();
          block.close = true;
          push({type, value});
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            let open = block.nodes.shift();
            block.nodes = [open, {type: "text", value: stringify3(block)}];
          }
          push({type: "comma", value});
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({type: "text", value});
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            let before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({type: "dot", value});
          continue;
        }
        push({type: "text", value});
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node6) => {
            if (!node6.nodes) {
              if (node6.type === "open")
                node6.isOpen = true;
              if (node6.type === "close")
                node6.isClose = true;
              if (!node6.nodes)
                node6.type = "text";
              node6.invalid = true;
            }
          });
          let parent = stack[stack.length - 1];
          let index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({type: "eos"});
      return ast;
    };
    module2.exports = parse5;
  });

  // ../sugar/node_modules/micromatch/node_modules/braces/index.js
  var require_braces = __commonJS((exports2, module2) => {
    "use strict";
    const stringify3 = require_stringify();
    const compile = require_compile();
    const expand = require_expand();
    const parse5 = require_parse();
    const braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse5(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify3(braces.parse(input, options), options);
      }
      return stringify3(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  });

  // ../sugar/node_modules/picomatch/lib/constants.js
  var require_constants2 = __commonJS((exports2, module2) => {
    "use strict";
    const path4 = require_path_browserify();
    const WIN_SLASH = "\\\\/";
    const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    const DOT_LITERAL = "\\.";
    const PLUS_LITERAL = "\\+";
    const QMARK_LITERAL = "\\?";
    const SLASH_LITERAL = "\\/";
    const ONE_CHAR = "(?=.)";
    const QMARK = "[^/]";
    const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    const NO_DOT = `(?!${DOT_LITERAL})`;
    const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    const STAR = `${QMARK}*?`;
    const POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    const WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    const POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path4.sep,
      extglobChars(chars) {
        return {
          "!": {type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})`},
          "?": {type: "qmark", open: "(?:", close: ")?"},
          "+": {type: "plus", open: "(?:", close: ")+"},
          "*": {type: "star", open: "(?:", close: ")*"},
          "@": {type: "at", open: "(?:", close: ")"}
        };
      },
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  });

  // ../sugar/node_modules/picomatch/lib/utils.js
  var require_utils3 = __commonJS((exports2) => {
    "use strict";
    const path4 = require_path_browserify();
    const win32 = process.platform === "win32";
    const {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports2.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path4.sep === "\\";
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  });

  // ../sugar/node_modules/picomatch/lib/scan.js
  var require_scan = __commonJS((exports2, module2) => {
    "use strict";
    const utils = require_utils3();
    const {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET
    } = require_constants2();
    const isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    const depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    const scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts8 = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = {value: "", depth: 0, isGlob: false};
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = {value: "", depth: 0, isGlob: false};
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
          }
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob)
          glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts8.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts8.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts8;
      }
      return state;
    };
    module2.exports = scan;
  });

  // ../sugar/node_modules/picomatch/lib/parse.js
  var require_parse2 = __commonJS((exports2, module2) => {
    "use strict";
    const constants = require_constants2();
    const utils = require_utils3();
    const {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    const expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    const syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    const parse5 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = {...options};
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = {type: "bos", value: "", output: opts.prepend || ""};
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index];
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren" && !EXTGLOB_CHARS[tok.value]) {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = {...EXTGLOB_CHARS[value2], conditions: 1, inner: ""};
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({type, value: value2, output: state.output ? "" : ONE_CHAR});
        push({type: "paren", extglob: true, value: advance(), output});
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.prev.type === "bos" && eos()) {
            state.negatedExtglob = true;
          }
        }
        push({type: "paren", extglob: true, value, output});
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({type: "text", value});
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance() || "";
          } else {
            value += advance() || "";
          }
          if (state.brackets === 0) {
            push({type: "text", value});
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({value});
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({value});
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({type: "text", value});
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({type: "paren", value});
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({type: "paren", value, output: state.parens ? ")" : "\\)"});
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({type: "bracket", value});
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({type: "text", value, output: `\\${value}`});
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({type: "text", value, output: `\\${value}`});
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({value});
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({type: "text", value, output: value});
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({type: "brace", value, output});
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({type: "text", value});
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({type: "comma", value, output});
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({type: "slash", value, output: SLASH_LITERAL});
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({type: "text", value, output: DOT_LITERAL});
            continue;
          }
          push({type: "dot", value, output: DOT_LITERAL});
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({type: "text", value, output});
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({type: "qmark", value, output: QMARK_NO_DOT});
            continue;
          }
          push({type: "qmark", value, output: QMARK});
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({type: "plus", value, output: PLUS_LITERAL});
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({type: "plus", value});
            continue;
          }
          push({type: "plus", value: PLUS_LITERAL});
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({type: "at", extglob: true, value, output: ""});
            continue;
          }
          push({type: "text", value});
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({type: "text", value});
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({type: "star", value, output: ""});
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({type: "star", value, output: ""});
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({type: "slash", value: "/", output: ""});
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({type: "slash", value: "/", output: ""});
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = {type: "star", value, output: star};
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?`});
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse5.fastpaths = (input, options) => {
      const opts = {...options};
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = {negated: false, prefix: ""};
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse5;
  });

  // ../sugar/node_modules/picomatch/lib/picomatch.js
  var require_picomatch = __commonJS((exports2, module2) => {
    "use strict";
    const path4 = require_path_browserify();
    const scan = require_scan();
    const parse5 = require_parse2();
    const utils = require_utils3();
    const constants = require_constants2();
    const isObject3 = (val) => val && typeof val === "object" && !Array.isArray(val);
    const picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject3(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = {...options, ignore: null, onMatch: null, onResult: null};
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const {isMatch, match, output} = picomatch.test(input, regex, options, {glob, posix});
        const result = {glob, state, regex, posix, input, output, match, isMatch};
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, {glob, posix} = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return {isMatch: false, output: ""};
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return {isMatch: Boolean(match), match, output};
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path4.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse5(pattern, {...options, fastpaths: false});
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return parsed.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${parsed.output})${append}`;
      if (parsed && parsed.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = parsed;
      }
      return regex;
    };
    picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      const opts = options || {};
      let parsed = {negated: false, fastpaths: true};
      let prefix = "";
      let output;
      if (input.startsWith("./")) {
        input = input.slice(2);
        prefix = parsed.prefix = "./";
      }
      if (opts.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        output = parse5.fastpaths(input, options);
      }
      if (output === void 0) {
        parsed = parse5(input, options);
        parsed.prefix = prefix + (parsed.prefix || "");
      } else {
        parsed.output = output;
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  });

  // ../sugar/node_modules/picomatch/index.js
  var require_picomatch2 = __commonJS((exports2, module2) => {
    "use strict";
    module2.exports = require_picomatch();
  });

  // ../sugar/node_modules/micromatch/index.js
  var require_micromatch = __commonJS((exports2, module2) => {
    "use strict";
    const util = require_isBufferBrowser();
    const braces = require_braces();
    const picomatch = require_picomatch2();
    const utils = require_utils3();
    const isEmptyString = (val) => typeof val === "string" && (val === "" || val === "./");
    const micromatch2 = (list, patterns, options) => {
      patterns = [].concat(patterns);
      list = [].concat(list);
      let omit = new Set();
      let keep = new Set();
      let items = new Set();
      let negatives = 0;
      let onResult = (state) => {
        items.add(state.output);
        if (options && options.onResult) {
          options.onResult(state);
        }
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(String(patterns[i]), {...options, onResult}, true);
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
        if (negated)
          negatives++;
        for (let item of list) {
          let matched = isMatch(item, true);
          let match = negated ? !matched.isMatch : matched.isMatch;
          if (!match)
            continue;
          if (negated) {
            omit.add(matched.output);
          } else {
            omit.delete(matched.output);
            keep.add(matched.output);
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep];
      let matches3 = result.filter((item) => !omit.has(item));
      if (options && matches3.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
        }
      }
      return matches3;
    };
    micromatch2.match = micromatch2;
    micromatch2.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch2.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    micromatch2.any = micromatch2.isMatch;
    micromatch2.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = new Set();
      let items = [];
      let onResult = (state) => {
        if (options.onResult)
          options.onResult(state);
        items.push(state.output);
      };
      let matches3 = micromatch2(list, patterns, {...options, onResult});
      for (let item of items) {
        if (!matches3.includes(item)) {
          result.add(item);
        }
      }
      return [...result];
    };
    micromatch2.contains = (str, pattern, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch2.contains(str, p, options));
      }
      if (typeof pattern === "string") {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false;
        }
        if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
          return true;
        }
      }
      return micromatch2.isMatch(str, pattern, {...options, contains: true});
    };
    micromatch2.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError("Expected the first argument to be an object");
      }
      let keys = micromatch2(Object.keys(obj), patterns, options);
      let res = {};
      for (let key of keys)
        res[key] = obj[key];
      return res;
    };
    micromatch2.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (items.some((item) => isMatch(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch2.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch(item))) {
          return false;
        }
      }
      return true;
    };
    micromatch2.all = (str, patterns, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch2.capture = (glob, input, options) => {
      let posix = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob), {...options, capture: true});
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v) => v === void 0 ? "" : v);
      }
    };
    micromatch2.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch2.scan = (...args) => picomatch.scan(...args);
    micromatch2.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
        }
      }
      return res;
    };
    micromatch2.braces = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
        return [pattern];
      }
      return braces(pattern, options);
    };
    micromatch2.braceExpand = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      return micromatch2.braces(pattern, {...options, expand: true});
    };
    module2.exports = micromatch2;
  });

  // ../sugar/src/js/event/on.js
  var require_on = __commonJS((exports2, module2) => {
    const __SPromise9 = require_SPromise();
    module2.exports = function on4(name, callback) {
      if (!global._sugarEventSPromise)
        global._sugarEventSPromise = new __SPromise9({
          id: "sugarEventSPromise"
        });
      global._sugarEventSPromise.on(name, callback);
      return () => {
        global._sugarEventSPromise.off(name, callback);
      };
    };
  });

  // ../sugar/src/js/html/htmlTagToHtmlClassMap.js
  var require_htmlTagToHtmlClassMap = __commonJS((exports2, module2) => {
    module2.exports = {
      a: HTMLAnchorElement,
      audio: HTMLAudioElement,
      body: HTMLBodyElement,
      button: HTMLButtonElement,
      canvas: HTMLCanvasElement,
      dl: HTMLDListElement,
      data: HTMLDataElement,
      datalist: HTMLDataListElement,
      details: HTMLDetailsElement,
      dir: HTMLDirectoryElement,
      div: HTMLDivElement,
      html: HTMLDocument,
      embed: HTMLEmbedElement,
      fieldset: HTMLFieldSetElement,
      font: HTMLFontElement,
      form: HTMLFormElement,
      frame: HTMLFrameElement,
      head: HTMLHeadElement,
      html: HTMLHtmlElement,
      iframe: HTMLIFrameElement,
      img: HTMLImageElement,
      input: HTMLInputElement,
      label: HTMLLabelElement,
      legend: HTMLLegendElement,
      link: HTMLLinkElement,
      map: HTMLMapElement,
      marquee: HTMLMarqueeElement,
      media: HTMLMediaElement,
      menu: HTMLMenuElement,
      meta: HTMLMetaElement,
      meter: HTMLMeterElement,
      del: HTMLModElement,
      ins: HTMLModElement,
      dol: HTMLOListElement,
      object: HTMLObjectElement,
      optgroup: HTMLOptGroupElement,
      option: HTMLOptionElement,
      output: HTMLOutputElement,
      p: HTMLParagraphElement,
      param: HTMLParamElement,
      picture: HTMLPictureElement,
      pre: HTMLPreElement,
      progress: HTMLProgressElement,
      quote: HTMLQuoteElement,
      script: HTMLScriptElement,
      select: HTMLSelectElement,
      slot: HTMLSlotElement,
      source: HTMLSourceElement,
      span: HTMLSpanElement,
      style: HTMLStyleElement,
      td: HTMLTableCellElement,
      th: HTMLTableCellElement,
      col: HTMLTableColElement,
      colgroup: HTMLTableColElement,
      table: HTMLTableElement,
      tr: HTMLTableRowElement,
      tfoot: HTMLTableSectionElement,
      thead: HTMLTableSectionElement,
      tbody: HTMLTableSectionElement,
      template: HTMLTemplateElement,
      textarea: HTMLTextAreaElement,
      time: HTMLTimeElement,
      title: HTMLTitleElement,
      track: HTMLTrackElement,
      ul: HTMLUListElement,
      video: HTMLVideoElement,
      area: HTMLAreaElement
    };
  });

  // ../sugar/node_modules/domready/ready.js
  var require_ready = __commonJS((exports2, module2) => {
    /*!
      * domready (c) Dustin Diaz 2014 - License MIT
      */
    !function(name, definition) {
      if (typeof module2 != "undefined")
        module2.exports = definition();
      else if (typeof define == "function" && typeof define.amd == "object")
        define(definition);
      else
        this[name] = definition();
    }("domready", function() {
      var fns = [], listener, doc = document, hack = doc.documentElement.doScroll, domContentLoaded = "DOMContentLoaded", loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);
      if (!loaded)
        doc.addEventListener(domContentLoaded, listener = function() {
          doc.removeEventListener(domContentLoaded, listener);
          loaded = 1;
          while (listener = fns.shift())
            listener();
        });
      return function(fn) {
        loaded ? setTimeout(fn, 0) : fns.push(fn);
      };
    });
  });

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/event/on.js
  var require_on2 = __commonJS((exports2, module2) => {
    const __SPromise9 = require_SPromise();
    module2.exports = function on4(name, callback) {
      if (!global._sugarEventSPromise)
        global._sugarEventSPromise = new __SPromise9({
          id: "sugarEventSPromise"
        });
      global._sugarEventSPromise.on(name, callback);
      return () => {
        global._sugarEventSPromise.off(name, callback);
      };
    };
  });

  // node_modules/@coffeekraken/sugar/src/js/object/deepMerge.js
  const copy_to = __toModule(require_copy_to());

  // ../sugar/src/js/is/plainObject.js
  const is_plain_object = __toModule(require_is_plain_object());
  function plainObject(object2) {
    if (!object2)
      return false;
    if (typeof object2 !== "object")
      return false;
    if (object2.constructor && object2.constructor.name !== "Object")
      return false;
    if (Object.prototype.toString.call(object2) !== "[object Object]")
      return false;
    if (object2 !== Object(object2))
      return false;
    if (object2.constructor !== Object)
      return false;
    return true;
  }

  // ../sugar/src/js/array/unique.js
  function unique(array2) {
    let a = array2.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i] === a[j])
          a.splice(j--, 1);
      }
    }
    return a;
  }

  // node_modules/@coffeekraken/sugar/src/js/object/deepMerge.js
  function deepMerge(...args) {
    let settings = {
      array: false,
      object: true
    };
    function merge(firstObj, secondObj) {
      const newObj = {};
      if (!firstObj && secondObj)
        return secondObj;
      if (!secondObj && firstObj)
        return firstObj;
      if (!firstObj && !secondObj)
        return {};
      copy_to.default(firstObj).override(newObj);
      for (const key of Object.keys(secondObj)) {
        if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
          let newArray = unique([...firstObj[key], ...secondObj[key]]);
          newObj[key] = newArray;
          continue;
        } else if (settings.object === true && plainObject(firstObj[key]) && plainObject(secondObj[key])) {
          newObj[key] = merge(firstObj[key], secondObj[key]);
          continue;
        }
        copy_to.default(secondObj).pick(key).toCover(newObj);
      }
      return newObj;
    }
    let potentialSettingsObj = args[args.length - 1] || {};
    if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
      if (potentialSettingsObj.array !== void 0)
        settings.array = potentialSettingsObj.array;
      if (potentialSettingsObj.object !== void 0)
        settings.object = potentialSettingsObj.object;
      args.pop();
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
      const toMergeObj = args[i] || {};
      currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
  }

  // node_modules/@coffeekraken/sugar/src/js/http/SRequest.js
  const axios = __toModule(require_axios2());

  // ../sugar/src/js/html/strToHtml.js
  function strToHtml(string2) {
    if (document !== void 0 && document.createElement !== void 0) {
      const cont = document.createElement("div");
      cont.innerHTML = string2;
      if (cont.children.length === 1) {
        return cont.children[0];
      } else {
        return cont;
      }
    }
    return string2;
  }

  // ../sugar/src/js/html/toString.js
  function toString(html2, deep = true) {
    if (document !== void 0 && document.createElement !== void 0) {
      const cont = document.createElement("div");
      cont.appendChild(html2.cloneNode(deep));
      return cont.innerHTML;
    }
    return html2;
  }

  // ../sugar/src/js/time/convert.js
  function convert(from, to = "ms") {
    let fromMs = from;
    if (typeof from === "string") {
      const fromNumber = parseFloat(from);
      const fromLength = fromNumber.toString().length;
      const fromString = from.slice(fromLength);
      if (fromString === "ms" || fromString === "millisecond" || fromString === "milliseconds") {
        fromMs = fromNumber;
      } else if (fromString === "s" || fromString === "second" || fromString === "seconds") {
        fromMs = fromNumber * 1e3;
      } else if (fromString === "m" || fromString === "minute" || fromString === "minutes") {
        fromMs = fromNumber * 60 * 1e3;
      } else if (fromString === "h" || fromString === "hour" || fromString === "hours") {
        fromMs = fromNumber * 60 * 60 * 1e3;
      } else if (fromString === "d" || fromString === "day" || fromString === "days") {
        fromMs = fromNumber * 24 * 60 * 60 * 1e3;
      } else if (fromString === "w" || fromString === "week" || fromString === "weeks") {
        fromMs = fromNumber * 7 * 24 * 60 * 60 * 1e3;
      } else if (fromString === "month" || fromString === "months") {
        fromMs = fromNumber * 31 * 24 * 60 * 60 * 1e3;
      } else if (fromString === "y" || fromString === "year" || fromString === "years") {
        fromMs = fromNumber * 365 * 24 * 60 * 60 * 1e3;
      }
    }
    switch (to) {
      case "ms":
      case "millisecond":
      case "milliseconds":
        return fromMs;
        break;
      case "s":
      case "second":
      case "seconds":
        return fromMs / 1e3;
        break;
      case "m":
      case "minute":
      case "minutes":
        return fromMs / 1e3 / 60;
        break;
      case "h":
      case "hour":
      case "hours":
        return fromMs / 1e3 / 60 / 60;
        break;
      case "d":
      case "day":
      case "days":
        return fromMs / 1e3 / 60 / 60 / 24;
        break;
      case "w":
      case "week":
      case "weeks":
        return fromMs / 1e3 / 60 / 60 / 24 / 7;
        break;
      case "month":
      case "months":
        return fromMs / 1e3 / 60 / 60 / 24 / 31;
        break;
      case "y":
      case "year":
      case "years":
        return fromMs / 1e3 / 60 / 60 / 24 / 365;
        break;
      default:
        throw new Error(`You try to convert "${from}" to "${to}" but this format does not exist... The valids formats are "ms,s,m,h,d,w,month,y"...`);
        break;
    }
  }
  convert.MILLISECOND = "ms";
  convert.SECOND = "s";
  convert.MINUTE = "m";
  convert.HOUR = "h";
  convert.DAY = "d";
  convert.WEEK = "w";
  convert.MONTH = "month";
  convert.YEAR = "y";
  var convert_default = convert;

  // ../sugar/src/js/http/SRequestConfig.js
  class SRequestConfig {
    url = null;
    baseURL = null;
    method = "GET";
    headers = {};
    params = {};
    data = {};
    timeout = 0;
    sendInterval = 1e3;
    sendCount = 1;
    everyResponse = null;
    responseType = "json";
    constructor(params) {
      if (params.timeout && typeof params.timeout === "string")
        params.timeout = convert_default(params.timeout, "ms");
      if (params.sendInterval && typeof params.sendInterval === "string")
        params.sendInterval = convert_default(params.sendInterval, "ms");
      Object.assign(this, params);
    }
  }

  // node_modules/@coffeekraken/sugar/src/js/http/SRequest.js
  const autoCast2 = __toModule(require_autoCast());

  // ../sugar/src/js/object/deepMerge.js
  const copy_to2 = __toModule(require_copy_to());
  function deepMerge2(...args) {
    let settings = {
      array: false,
      object: true
    };
    function merge(firstObj, secondObj) {
      const newObj = {};
      if (!firstObj && secondObj)
        return secondObj;
      if (!secondObj && firstObj)
        return firstObj;
      if (!firstObj && !secondObj)
        return {};
      copy_to2.default(firstObj).override(newObj);
      for (const key of Object.keys(secondObj)) {
        if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
          let newArray = unique([...firstObj[key], ...secondObj[key]]);
          newObj[key] = newArray;
          continue;
        } else if (settings.object === true && plainObject(firstObj[key]) && plainObject(secondObj[key])) {
          newObj[key] = merge(firstObj[key], secondObj[key]);
          continue;
        }
        copy_to2.default(secondObj).pick(key).toCover(newObj);
      }
      return newObj;
    }
    let potentialSettingsObj = args[args.length - 1] || {};
    if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
      if (potentialSettingsObj.array !== void 0)
        settings.array = potentialSettingsObj.array;
      if (potentialSettingsObj.object !== void 0)
        settings.object = potentialSettingsObj.object;
      args.pop();
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
      const toMergeObj = args[i] || {};
      currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
  }

  // node_modules/@coffeekraken/sugar/src/js/http/SRequest.js
  class SRequest {
    _defaultRequestSettings = {};
    _currentRequestSettings = {};
    _requestsCount = 0;
    constructor(request) {
      if (!(request instanceof SRequestConfig)) {
        this._defaultRequestSettings = new SRequestConfig(request);
      } else {
        this._defaultRequestSettings = request;
      }
    }
    _onSuccess(response) {
      let finalResponse = response.data;
      const contentType = response.headers["content-type"] || "text/plain";
      const hash = this._currentRequestSettings.url.indexOf("#") !== -1 ? this._currentRequestSettings.url.split("#")[1] : false;
      if (contentType === "text/html" && hash !== false && document !== void 0 && document.querySelector !== void 0) {
        const $html = strToHtml(response.data);
        if ($html.id === hash) {
          finalResponse = toString($html);
        } else {
          const $part = $html.querySelector(`#${hash}`);
          if ($part) {
            finalResponse = toString($part);
          }
        }
      } else if (contentType === "application/json") {
        finalResponse = JSON.parse(response.data);
      }
      response.data = finalResponse;
      delete response.config;
      delete response.request;
      this._responsesArray.push(response);
      if (this._currentRequestSettings.everyResponse) {
        this._currentRequestSettings.everyResponse(Object.assign({}, response), this._requestsCount);
      }
      if (this._requestsCount >= this._currentRequestSettings.sendCount) {
        this._resolve(this._responsesArray.length <= 1 ? this._responsesArray[0] : this._responsesArray);
      } else {
        this._send();
      }
    }
    _onError(error) {
      this._reject(error);
    }
    _send(requestSettings = {}) {
      this._requestsCount++;
      requestSettings = deepMerge2(this._defaultRequestSettings, requestSettings);
      if (requestSettings.beforeSend) {
        requestSettings = requestSettings.beforeSend(requestSettings, this._requestsCount);
      }
      this._currentRequestSettings = Object.assign(requestSettings);
      axios.default(requestSettings).then(this._onSuccess.bind(this)).catch(this._onError.bind(this));
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

  // node_modules/@coffeekraken/sugar/src/js/keyboard/hotkey.js
  const hotkeys = __toModule(require_hotkeys_common());

  // ../sugar/src/js/string/uniqid.js
  const uniqid = __toModule(require_uniqid());
  function uniqid2() {
    return uniqid.default();
  }

  // ../sugar/src/js/is/array.js
  function isArray2(value) {
    return value && typeof value === "object" && value.constructor === Array;
  }

  // ../sugar/src/js/is/boolean.js
  function isBoolean(value) {
    return typeof value === "boolean";
  }

  // ../sugar/src/js/is/function.js
  function isFunction(value) {
    return value && {}.toString.call(value) === "[object Function]";
  }

  // ../sugar/src/js/is/json.js
  function isJson(value) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  }

  // ../sugar/src/js/is/number.js
  function isNumber(source) {
    return !isNaN(parseFloat(source)) && isFinite(source);
  }

  // ../sugar/src/js/is/object.js
  function isObject2(value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  // ../sugar/src/js/is/regexp.js
  function isRegexp(value) {
    return value && typeof value === "object" && value.constructor === RegExp;
  }

  // ../sugar/src/js/is/string.js
  function isString(value) {
    return typeof value === "string" || value instanceof String;
  }

  // ../sugar/src/js/html/replaceTags.js
  function replaceTags(text, tags) {
    if (!text)
      text = "";
    text = toString4(text);
    let oneLineText = text.replace(/\r\n/g, "|rn|");
    oneLineText = oneLineText.replace(/\n/g, "|n|");
    oneLineText = oneLineText.replace(/\r/g, "|r|");
    Object.keys(tags).forEach((tagName) => {
      const reg = new RegExp(`<s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`, "g");
      const tagsArray = oneLineText.match(reg);
      const singleReg = new RegExp(`\\s?<${tagName}\\s?/>\\s?`, "g");
      const singleTagsArray = oneLineText.match(singleReg);
      if (tagsArray) {
        for (let i = 0; i < tagsArray.length; i++) {
          const t = tagsArray[i];
          const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`);
          if (!tagArgs)
            continue;
          const tagToReplace = tagArgs[0];
          const tagContent = tagArgs[1];
          oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
        }
      }
      if (singleTagsArray) {
        for (let i = 0; i < singleTagsArray.length; i++) {
          const t = singleTagsArray[i];
          const tagArgs = t.match(`\\s?<${tagName}\\s?/>\\s?`);
          if (!tagArgs)
            continue;
          const tagToReplace = tagArgs[0];
          const tagContent = "";
          oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
        }
      }
    });
    oneLineText = oneLineText.replace(/\|rn\|/g, "\r\n");
    oneLineText = oneLineText.replace(/\|n\|/g, "\n");
    oneLineText = oneLineText.replace(/\|r\|/g, "\r");
    return oneLineText;
  }

  // ../sugar/src/js/console/parseHtml.js
  const chalk = __toModule(require_source());
  chalk.default.level = 3;
  const tagsMap = {
    black: (tag, content) => chalk.default.black(content),
    red: (tag, content) => chalk.default.red(content),
    green: (tag, content) => chalk.default.green(content),
    yellow: (tag, content) => chalk.default.yellow(content),
    blue: (tag, content) => chalk.default.blue(content),
    magenta: (tag, content) => chalk.default.magenta(content),
    cyan: (tag, content) => chalk.default.cyan(content),
    white: (tag, content) => chalk.default.white(content),
    grey: (tag, content) => chalk.default.grey(content),
    bgBlack: (tag, content) => chalk.default.bgBlack(content),
    bgRed: (tag, content) => chalk.default.bgRed(content),
    bgGreen: (tag, content) => chalk.default.bgGreen(content),
    bgYellow: (tag, content) => chalk.default.bgYellow(content),
    bgBlue: (tag, content) => chalk.default.bgBlue(content),
    bgMagenta: (tag, content) => chalk.default.bgMagenta(content),
    bgCyan: (tag, content) => chalk.default.bgCyan(content),
    bgWhite: (tag, content) => chalk.default.bgWhite(content),
    bold: (tag, content) => chalk.default.bold(content),
    dim: (tag, content) => chalk.default.dim(content),
    italic: (tag, content) => chalk.default.italic(content),
    underline: (tag, content) => chalk.default.underline(content),
    strike: (tag, content) => chalk.default.strike(content),
    h1: (tag, content) => {
      return chalk.default.underline(chalk.default.bold(content)) + "\n\n";
    },
    h2: (tag, content) => {
      return chalk.default.bold(content) + "\n";
    },
    iWarn: (tag, content) => parseHtml("<yellow>⚠</yellow> "),
    iCheck: (tag, content) => parseHtml(`<green>✓</green> `),
    iCross: (tag, content) => parseHtml(`<red>✖</red> `),
    iClose: (tag, content) => `✖`,
    iStart: (tag, content) => parseHtml(`<green>‣</green> `),
    date: (tag, content) => new Date().getDate().toString().padStart("0", 2) + "-" + (new Date().getMonth() + 1).toString().padStart("0", 2) + "-" + new Date().getFullYear().toString().padStart("0", 2),
    time: (tag, content) => new Date().getHours().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2),
    day: (tag, content) => new Date().getDate().toString().padStart("0", 2),
    days: (tag, content) => new Date().getDate().toString().padStart("0", 2),
    month: (tag, content) => new Date().getMonth().toString().padStart("0", 2),
    months: (tag, content) => new Date().getMonth().toString().padStart("0", 2),
    year: (tag, content) => new Date().getFullYear().toString().padStart("0", 2),
    years: (tag, content) => new Date().getFullYear().toString().padStart("0", 2),
    hour: (tag, content) => new Date().getHours().toString().padStart("0", 2),
    hours: (tag, content) => new Date().getHours().toString().padStart("0", 2),
    minute: (tag, content) => new Date().getMinutes().toString().padStart("0", 2),
    minutes: (tag, content) => new Date().getMinutes().toString().padStart("0", 2),
    second: (tag, content) => new Date().getSeconds().toString().padStart("0", 2),
    seconds: (tag, content) => new Date().getSeconds().toString().padStart("0", 2),
    br: (tag, content) => "\n"
  };
  function parseHtml(message) {
    let isArray3 = false;
    if (Array.isArray(message)) {
      isArray3 = true;
    } else {
      message = [message];
    }
    message = message.map((m) => {
      return replaceTags(m, tagsMap);
    });
    if (isArray3)
      return message;
    return message[0];
  }

  // ../sugar/src/js/string/trimLines.js
  function trimLines(string2, settings = {}) {
    settings = deepMerge2({
      leftPadding: 0,
      rightPadding: 0,
      keepEmptyLines: true
    }, settings);
    string2 = string2.split("\n").map((line) => {
      line = line.trim();
      if (!settings.keepEmptyLines) {
        if (line === "")
          return -1;
      }
      if (settings.leftPadding)
        line = `${" ".repeat(settings.leftPadding)}${line}`;
      if (settings.rightPadding)
        line = `${line}${" ".repeat(settings.rightPadding)}`;
      return line;
    }).filter((line) => line !== -1).join("\n");
    return string2;
  }

  // ../sugar/src/js/is/node.js
  var node_default = () => {
    return typeof process !== "undefined" && process.release && process.release.name === "node";
  };

  // ../sugar/src/js/object/get.js
  var get_default = (obj, path4) => {
    if (obj[path4] !== void 0)
      return obj[path4];
    if (!path4 || path4 === "" || path4 === ".")
      return obj;
    path4 = path4.replace(/\[(\w+)\]/g, ".$1");
    path4 = path4.replace(/^\./, "");
    var a = path4.split(".");
    var o = obj;
    while (a.length) {
      var n = a.shift();
      if (typeof o !== "object")
        return;
      if (!(n in o))
        return;
      o = o[n];
    }
    return o;
  };

  // ../sugar/src/js/object/set.js
  var set_default = (obj, path4, value) => {
    if (!path4 || path4 === "" || path4 === ".") {
      obj = value;
      return;
    }
    var a = path4.split(".");
    var o = obj;
    while (a.length - 1) {
      var n = a.shift();
      if (!(n in o))
        o[n] = {};
      o = o[n];
    }
    o[a[0]] = value;
    return get_default(obj, path4);
  };

  // ../sugar/src/js/object/delete.js
  function del(object2, dotPath) {
    const parentDotPath = dotPath.split(".").slice(0, -1).join(".");
    if (!dotPath || dotPath === "" || dotPath === ".")
      return object2;
    dotPath = dotPath.replace(/\[(\w+)\]/g, ".$1");
    dotPath = dotPath.replace(/^\./, "");
    var a = dotPath.split(".");
    var o = object2;
    while (a.length) {
      var n = a.shift();
      if (a.length < 1) {
        if (Array.isArray(o)) {
          const valueToDelete = o[n];
          o = o.filter((v) => {
            return v !== valueToDelete;
          });
        } else {
          delete o[n];
        }
        set_default(object2, parentDotPath, o);
      } else {
        o = o[n];
      }
    }
    return object2;
  }

  // ../sugar/src/js/string/parse.js
  var parse_default = (value) => {
    if (typeof value !== "string")
      return value;
    value = value.split("⠀").join("").trim();
    try {
      return Function(`
      "use strict";
      return (${value});
    `)();
    } catch (e) {
      return value;
    }
  };

  // ../sugar/src/js/core/env.js
  function env(dotPath, value) {
    if (!node_default()) {
      if (!window.process)
        window.process = {};
      if (!window.process.env)
        window.process.env = {};
    }
    const targetObj = node_default() ? global.process.env : window.process.env;
    if (value === null) {
      del(targetObj, dotPath.toUpperCase());
    } else if (value !== void 0) {
      set_default(targetObj, dotPath.toUpperCase(), parse_default(value));
    }
    return parse_default(get_default(targetObj, dotPath.toUpperCase()));
  }

  // ../sugar/src/js/path/packageRoot.js
  function packageRoot() {
    const environment = env("node_env") || env("environment") || env("env");
    if (environment !== "development" && environment !== "test")
      return "";
    return env("package_root") || "";
  }

  // ../sugar/src/js/error/SError.js
  class SError extends Error {
    constructor(message) {
      if (typeof message !== "string") {
        if (Array.isArray(message)) {
          message = message.join("\n");
        } else {
          message = toString4(message);
        }
      }
      message = message.split("\n").filter((line) => {
        if (line.trim().slice(0, 10) === "Thrown at:")
          return false;
        if (line.trim().slice(0, 3) === "at ")
          return false;
        return true;
      }).join("\n");
      super(message);
      if (Error && Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      const stack = [];
      const packageRoot3 = packageRoot();
      let stackArray = [];
      if (this.stack) {
        stackArray = this.stack.split(" at ").slice(1);
        stackArray.filter((l) => {
          if (l.trim() === "Error")
            return false;
          if (l.trim() === "")
            return false;
          return true;
        }).forEach((l) => {
          if (l.trim() === "")
            return;
          stack.push(`<cyan>│</cyan> at <cyan>${l.replace(packageRoot3, "")}</cyan>`);
        });
      }
      this.name = this.constructor.name;
      this.message = trimLines(parseHtml(`
      <red><underline>${this.name || this.constructor.name}</underline></red>

      ${message}

      ${stack.join("")}
    `));
      let displayed = false;
      Object.defineProperty(this, "stack", {
        get: function() {
          if (displayed)
            return "";
          displayed = true;
          return this.message;
        },
        set: function(value) {
          this._stack = value;
        }
      });
      this.stack = trimLines(parseHtml(stack.join("")));
    }
  }

  // ../sugar/src/js/json/stringify.js
  const json_cyclic = __toModule(require_dist());

  // ../sugar/src/js/string/toString.js
  function toString4(value, settings = {}) {
    settings = deepMerge2({
      beautify: false
    }, settings);
    if (isString(value)) {
      return value;
    } else if (isNumber(value)) {
      return value.toString();
    } else if (value === null) {
      return "null";
    } else if (value instanceof SError) {
      return value.toString();
    } else if (value instanceof Error) {
      if (typeof value.toString === "function") {
        return value.toString();
      }
      return `${value.name}:

      ${value.message}

      ${value.stack}
    `;
    } else if (typeof value === "symbol" || typeof value === "typedArray" || value instanceof Date || typeof value === "color") {
      return value.toString();
    } else if (isObject2(value) || isArray2(value) || isJson(value)) {
      return JSON.stringify(value, null, settings.beautify ? 4 : 0);
    } else if (isBoolean(value)) {
      if (value)
        return "true";
      else
        return "false";
    } else if (isFunction(value)) {
      return "" + value;
    } else if (isRegexp(value)) {
      return value.toString();
    } else if (value === void 0) {
      return "undefined";
    } else {
      let returnVal;
      try {
        returnVal = JSON.stringify(value, null, settings.beautify ? 4 : 0);
      } catch (e) {
        try {
          returnVal = value.toString();
        } catch (e2) {
          return value;
        }
      }
      return returnVal;
    }
  }

  // node_modules/@coffeekraken/sugar/src/js/keyboard/hotkey.js
  const SPromise = __toModule(require_SPromise());
  hotkeys.default.filter = function(event) {
    return true;
  };
  function hotkey_default(hotkey2, settings = {}) {
    return new SPromise.default((resolve, reject, trigger2, cancel) => {
      settings = {
        element: null,
        keyup: false,
        keydown: true,
        once: false,
        splitKey: "+",
        ...settings
      };
      hotkeys.default(hotkey2, settings, (e, h) => {
        trigger2("press", e);
        if (settings.once)
          cancel();
      });
    }, {
      id: "hotkey"
    }).on("finally", () => {
      hotkeys.default.unbind(hotkey2);
    });
  }

  // ../sugar/src/js/is/class.js
  const __isClass = require_is_class();
  function cls(cls2) {
    if (!Array.isArray(cls2))
      cls2 = [cls2];
    for (let i = 0; i < cls2.length; i++) {
      if (!__isClass(cls2[i]))
        return false;
    }
    return true;
  }

  // ../sugar/src/js/webcomponent/SWebComponent.js
  const SPromise7 = __toModule(require_SPromise());

  // ../sugar/src/js/dom/observeAttributes.js
  const SPromise2 = __toModule(require_SPromise());
  function observeAttributes_default(target, settings = {}) {
    return new SPromise2.default((resolve, reject, trigger2, cancel) => {
      const mutationObserver2 = new MutationObserver((mutations) => {
        let mutedAttrs = {};
        mutations.forEach((mutation) => {
          if (!mutedAttrs[mutation.attributeName]) {
            trigger2("then", mutation);
            mutedAttrs[mutation.attributeName] = true;
          }
        });
        mutedAttrs = {};
      });
      mutationObserver2.observe(target, {
        attributes: true,
        ...settings
      });
    }, {
      id: "observeAttributes"
    }).on("finally", () => {
      mutationObserver.disconnect();
    });
  }

  // ../sugar/src/js/dom/isInViewport.js
  function isInViewport(elm, offset = 50) {
    let offsetTop = offset;
    let offsetRight = offset;
    let offsetBottom = offset;
    let offsetLeft = offset;
    if (typeof offset === "object") {
      offsetTop = offset.top || 0;
      offsetRight = offset.right || 0;
      offsetBottom = offset.bottom || 0;
      offsetLeft = offset.left || 0;
    }
    const containerHeight = window.innerHeight || document.documentElement.clientHeight;
    const containerWidth = window.innerWidth || document.documentElement.clientWidth;
    const rect = elm.getBoundingClientRect();
    const isTopIn = rect.top - containerHeight - offsetBottom <= 0;
    const isBottomIn = rect.bottom - offsetTop >= 0;
    const isLeftIn = rect.left - containerWidth - offsetRight <= 0;
    const isRightIn = rect.right - offsetLeft >= 0;
    return isTopIn && isBottomIn && isLeftIn && isRightIn;
  }

  // ../sugar/src/js/function/throttle.js
  function throttle(fn, threshhold) {
    threshhold || (threshhold = 250);
    var last;
    return function() {
      var context = this;
      var now = new Date(), args = arguments;
      if (!last || last <= now - threshhold) {
        last = now;
        fn.apply(context, args);
      }
    };
  }

  // ../sugar/src/js/dom/matches.js
  function matches(el, selector) {
    if (el.nodeName == "#comment" || el.nodeName == "#text") {
      return false;
    }
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  }

  // ../sugar/src/js/dom/closest.js
  function closest($elm, selector) {
    const originalElm = $elm;
    $elm = $elm.parentNode;
    while ($elm && $elm != originalElm.ownerDocument) {
      if (typeof selector === "function") {
        if (selector($elm))
          return $elm;
      } else if (typeof selector === "string" && matches($elm, selector)) {
        return $elm;
      }
      $elm = $elm.parentNode;
    }
    return null;
  }

  // ../sugar/src/js/string/camelize.js
  function camelize(text) {
    let res = "";
    const reg = /(?:^|[_-\s])(\w)/g;
    res = text.replace(reg, function(_, c) {
      return c ? c.toUpperCase() : "";
    });
    res = res.substr(0, 1).toLowerCase() + res.slice(1);
    return res.trim();
  }

  // ../sugar/src/js/dom/getStyleProperty.js
  const autoCast3 = __toModule(require_autoCast());
  function getStyleProperty(elm, property) {
    setTimeout(() => {
      elm._sComputedStyle = null;
    });
    const computed = elm._sComputedStyle || window.getComputedStyle(elm);
    elm._sComputedStyle = computed;
    const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];
    for (let i = 0; i < prefixes.length; i++) {
      const prefix = prefixes[i];
      const value = computed[camelize(`${prefix}${property}`)];
      if (value && value.trim() !== "")
        return autoCast3.default(value);
    }
    return null;
  }

  // ../sugar/src/js/dom/getTransitionProperties.js
  function splitIfNeeded(what, separator) {
    if (what.indexOf(separator) !== -1) {
      return what.split(separator).map((item) => item.trim());
    }
    return [what];
  }
  function getTransitionProperties(elm) {
    const property = getStyleProperty(elm, "transition-property");
    const duration = getStyleProperty(elm, "transition-duration") || 0;
    const timingFunction = getStyleProperty(elm, "transition-timing-function");
    const delay = getStyleProperty(elm, "transition-delay");
    const props = {
      property: splitIfNeeded(property, ","),
      duration: splitIfNeeded(duration, ",").map((value) => convert_default(value, "ms")),
      delay: splitIfNeeded(delay, ",").map((value) => convert_default(value, "ms")),
      timingFunction: splitIfNeeded(timingFunction, ",")
    };
    let totalDuration = 0;
    let i = 0;
    const delays = [0].concat(props.delay);
    [0].concat(props.duration).forEach((val) => {
      if (val + delays[i] > totalDuration) {
        totalDuration = val + delays[i];
      }
      i++;
    });
    props.totalDuration = totalDuration;
    return props;
  }

  // ../sugar/src/js/dom/isVisible.js
  function isVisible(elm) {
    if (elm.nodeName.toLowerCase() === "script")
      return true;
    const style = window.getComputedStyle(elm, null), opacity = style["opacity"], visibility = style["visibility"], display = style["display"];
    return opacity !== "0" && display !== "none" && visibility !== "hidden";
  }
  window.__isVisible = isVisible;

  // ../sugar/src/js/dom/closestNotVisible.js
  function closestNotVisible(elm) {
    const originalElm = elm;
    elm = elm.parentNode;
    while (elm && elm != originalElm.ownerDocument) {
      if (!isVisible(elm)) {
        return elm;
      }
      elm = elm.parentNode;
    }
    return null;
  }

  // ../sugar/src/js/dom/when.js
  function when($node, state, settings = {}) {
    return new Promise(async (resolve, reject) => {
      let importPromise, args;
      switch (state) {
        case "attribute":
          importPromise = Promise.resolve().then(() => __toModule(require_whenAttribute()));
          args = [$node, settings.attribute, settings.checkFn];
          break;
        case "inViewport":
          importPromise = Promise.resolve().then(() => __toModule(require_whenInViewport()));
          args = [$node, settings.offset];
          break;
        case "outOfViewport":
          importPromise = Promise.resolve().then(() => __toModule(require_whenOutOfViewport()));
          args = [$node, settings.offset];
          break;
        case "transitionEnd":
          importPromise = Promise.resolve().then(() => __toModule(require_whenTransitionEnd()));
          args = [$node, settings.callback];
          break;
        case "visible":
          importPromise = Promise.resolve().then(() => __toModule(require_whenVisible()));
          args = [$node, settings.callback];
          break;
        default:
          resolve($node);
          return;
          break;
      }
      const module2 = await importPromise;
      module2.default.apply(null, args).then(() => {
        resolve($node);
      });
    });
  }

  // ../sugar/src/js/validation/value/validateValueOutputString.js
  function validateValueOutputString(validateValueResultObj, settings = {}) {
    let issuesArray = [];
    settings = deepMerge2({
      name: settings.name || validateValueResultObj.$name,
      interface: settings.interface || validateValueResultObj.$interface
    });
    if (settings.name) {
      issuesArray.push(`<yellow>│</yellow> ${settings.name}
<yellow>│</yellow>`);
    }
    if (validateValueResultObj.$received) {
      let string2 = `<yellow>│</yellow> - Received value: <yellow>${toString4(validateValueResultObj.$received.value, {beautify: true})}</yellow>`;
      issuesArray.push(string2);
    }
    validateValueResultObj.$issues.forEach((issue) => {
      if (validateValueResultObj.$messages[issue]) {
        issuesArray.push(`<yellow>│</yellow> - ${validateValueResultObj.$messages[issue]}`);
      }
    });
    return parseHtml(issuesArray.join("\n")) + "\n";
  }

  // ../sugar/src/js/error/SValueValidationError.js
  class SValueValidationError extends SError {
    constructor(issuesObj) {
      const string2 = validateValueOutputString(issuesObj);
      super(string2);
    }
  }

  // ../sugar/src/js/string/upperFirst.js
  function upperFirst(string2) {
    return string2.charAt(0).toUpperCase() + string2.slice(1);
  }

  // ../sugar/src/js/validation/utils/parseTypeDefinitionString.js
  function parseTypeDefinitionString(argTypeString) {
    let inDepth = 0;
    let currentPart = "", typesArray = [];
    argTypeString.split("").forEach((character) => {
      if (character === ">") {
        if (inDepth <= 0) {
          throw new Error(`It seems that your argument type definition string "${argTypeString}" is invalid...`);
        }
        inDepth--;
        currentPart += character;
        return;
      }
      if (character === "<") {
        inDepth++;
        currentPart += character;
        return;
      }
      if (character === "|") {
        if (inDepth > 0) {
          currentPart += character;
          return;
        }
        typesArray.push(currentPart);
        currentPart = "";
        return;
      }
      currentPart += character;
    });
    typesArray.push(currentPart);
    const returnArray = [];
    typesArray.forEach((typeDefinitionString) => {
      const parts8 = typeDefinitionString.split("<");
      const type = upperFirst(parts8[0]);
      let ofArray = null;
      if (parts8[1]) {
        const ofPart = parts8[1].slice(0, -1);
        ofArray = parseTypeDefinitionString(ofPart);
      }
      returnArray.push({
        type,
        of: ofArray
      });
    });
    return returnArray;
  }

  // ../sugar/src/js/is/integer.js
  function isInteger(data) {
    return !isNaN(data) && function(x) {
      return (x | 0) === x;
    }(parseFloat(data));
  }

  // ../sugar/src/js/value/typeof.js
  function typeOf(value, settings = {}) {
    settings = deepMerge2({
      of: false,
      format: "String",
      customClass: true
    }, settings);
    let type, resultObj = {};
    if (Array.isArray(value))
      type = "Array";
    else if (value === null)
      type = "Null";
    else if (value === void 0)
      type = "Undefined";
    else if (typeof value === "string")
      type = "String";
    else if (isInteger(value))
      type = "Integer";
    else if (typeof value === "number")
      type = "Number";
    else if (typeof value === "boolean")
      type = "Boolean";
    else if (value instanceof RegExp)
      type = "RegExp";
    else if (settings.customClass && cls(value) && value.name) {
      type = upperFirst(value.name);
    } else if (settings.customClass && value.constructor && value.constructor.name) {
      type = upperFirst(value.constructor.name);
    } else if (!settings.customClass && cls(value)) {
      type = "Class";
    } else if (typeof value === "function")
      type = "Function";
    else if (typeof value === "object")
      type = "Object";
    else
      type = "Unknown";
    resultObj.type = type;
    const avoidTypes = [
      "Null",
      "Undefined",
      "String",
      "Integer",
      "Number",
      "Boolean",
      "Unknown"
    ];
    if (settings.of && avoidTypes.indexOf(type) === -1) {
      const loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
      const receivedTypes = [];
      loopOn.forEach((valueIndex) => {
        const valueToCheck = value[valueIndex];
        const typeObj = typeOf(valueToCheck, {
          format: "Object",
          of: false,
          customClass: settings.customClass
        });
        if (receivedTypes.indexOf(typeObj.type) === -1) {
          receivedTypes.push(typeObj.type);
        }
      });
      resultObj.of = receivedTypes;
    }
    switch (settings.format.toLowerCase()) {
      case "object":
        return resultObj;
        break;
      case "string":
      default:
        if (settings.of && resultObj.of && resultObj.of.length) {
          return `${resultObj.type}${resultObj.of ? `<${resultObj.of.join("|")}>` : ""}`;
        } else {
          return `${resultObj.type}`;
        }
        break;
    }
  }

  // ../sugar/src/js/value/typeDefinitionArrayObjectToString.js
  function typeDefinitionArrayObjectToString(typeDefinitionArrayObj) {
    const parts8 = [];
    if (!Array.isArray(typeDefinitionArrayObj))
      typeDefinitionArrayObj = [typeDefinitionArrayObj];
    typeDefinitionArrayObj.forEach((definitionObj) => {
      let part3 = definitionObj.type;
      if (definitionObj.of) {
        const ofString = typeDefinitionArrayObjectToString(definitionObj.of);
        part3 += `<${ofString}>`;
      }
      parts8.push(part3);
    });
    return parts8.join("|");
  }

  // ../sugar/src/js/class/getExtendsStack.js
  function getExtendsStack(cls2) {
    const stack = [];
    if (!cls(cls2)) {
      cls2 = cls2.constructor;
    }
    let baseClass = cls2;
    while (baseClass) {
      const newBaseClass = Object.getPrototypeOf(baseClass);
      if (newBaseClass && newBaseClass !== Object && newBaseClass.name) {
        stack.push(newBaseClass.name);
        baseClass = newBaseClass;
      } else {
        break;
      }
    }
    return stack;
  }

  // ../sugar/src/js/is/ofType.js
  function ofType(value, argTypeDefinition) {
    let definitionArray = argTypeDefinition;
    if (typeof argTypeDefinition === "string") {
      definitionArray = parseTypeDefinitionString(argTypeDefinition);
    }
    const typeOfValue = typeOf(value);
    const issueObj = {
      $received: {
        type: typeOf(value, {of: true}),
        value
      },
      $expected: {
        type: typeDefinitionArrayObjectToString(definitionArray)
      },
      $issues: ["type"]
    };
    for (let i = 0; i < definitionArray.length; i++) {
      const definitionObj = definitionArray[i];
      if (definitionObj.type === "Array" || definitionObj.type === "Object") {
        if (definitionObj.type === "Array") {
          if (typeOfValue === "Array" && !definitionObj.of)
            return true;
        } else if (definitionObj.type === "Object") {
          if (typeOfValue === "Object" && !definitionObj.of)
            return true;
        }
        if (definitionObj.of && (Array.isArray(value) || typeof value === "object")) {
          const loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
          let checkValuesResult = true;
          const receivedTypes = [];
          loopOn.forEach((valueIndex) => {
            const valueToCheck = value[valueIndex];
            if (ofType(valueToCheck, definitionObj.of) !== true) {
              checkValuesResult = false;
            }
            const typeString = typeOf(valueToCheck);
            if (receivedTypes.indexOf(typeString) === -1) {
              receivedTypes.push(typeString);
            }
          });
          if (checkValuesResult)
            return true;
        }
      } else if (definitionObj.type === "Class") {
        if (cls(value))
          return true;
      } else if (definitionObj.type === "Int" || definitionObj.type === "Integer") {
        if (isInteger(value))
          return true;
      } else if (["Boolean", "Number", "String", "Bigint", "Symbol", "Function"].indexOf(definitionObj.type) !== -1) {
        if (definitionObj.type === "Number") {
          const type = typeOfValue;
          if (type === "Number" || type === "Integer")
            return true;
        } else {
          if (typeOfValue === definitionObj.type)
            return true;
        }
      } else if (cls(value) && value.name) {
        if (typeOf(value) === definitionObj.type)
          return true;
        const classesStack = getExtendsStack(value);
        if (classesStack.indexOf(definitionObj.type) !== -1)
          return true;
      } else if (value && value.constructor && value.constructor.name) {
        if (definitionObj.type === value.constructor.name)
          return true;
      }
    }
    return issueObj;
  }

  // ../sugar/src/js/is/path.js
  const is_valid_path = __toModule(require_is_valid_path());
  function path(path4) {
    if (!is_valid_path.default(path4))
      return false;
    return true;
  }

  // ../sugar/src/js/validation/SValidation.js
  class SValidation {
    static apply(...args) {
      const checkResult = this.exec(...args);
      if (checkResult === true)
        return true;
      let message = this.message;
      const finalArgs = Array.isArray(checkResult) ? checkResult : args;
      finalArgs.forEach((arg, i) => {
        let value = toString4(arg);
        if (Array.isArray(arg)) {
          value = arg.join(",");
        }
        message = message.replace(`%${i}`, value);
      });
      return message;
    }
  }
  var SValidation_default = SValidation;

  // ../sugar/src/js/validation/value/validation/SRequiredValidation.js
  class SRequiredValidation extends SValidation_default {
    static message = `This value is <yellow>required</yellow> and you've passed "<red>%0"</red>`;
    static exec(value) {
      return value !== null && value !== void 0;
    }
  }
  var SRequiredValidation_default = SRequiredValidation;

  // ../sugar/src/js/validation/value/validation/SPathValidation.js
  class SPathValidation extends SValidation_default {
    static message = `This value must be a valid <yellow>path</yellow> and you've passed "<red>%0</red>"`;
    static exec(value, checkExistence = true) {
      return path(value);
    }
  }
  var SPathValidation_default = SPathValidation;

  // ../sugar/src/js/validation/value/validation/STypeValidation.js
  class STypeValidation extends SValidation_default {
    static message = `This value has to be of type "<yellow>%1</yellow>" and you've passed "<red>%0</red>" which is of type "<red>%2</red>"`;
    static exec(value, type) {
      const result = ofType(value, type);
      if (result === true)
        return true;
      return [value, type, result.$received.type];
    }
  }
  var STypeValidation_default = STypeValidation;

  // ../sugar/src/js/validation/value/validation/SValuesValidation.js
  class SValuesValidation extends SValidation_default {
    static message = `This value must be one of these "<green>%1</green>" but you've passed "<red>%0</red>"`;
    static exec(value, values) {
      return values.indexOf(value) !== -1;
    }
  }
  var SValuesValidation_default = SValuesValidation;

  // ../sugar/src/js/validation/value/validateValue.js
  const _validationsObj = {
    required: {
      class: SRequiredValidation_default,
      args: []
    },
    path: {
      class: SPathValidation_default,
      args: ["%definitionObj.path.exists"]
    },
    type: {
      class: STypeValidation_default,
      args: ["%definitionObj.type"]
    },
    values: {
      class: SValuesValidation_default,
      args: ["%definitionObj.values"]
    }
  };
  function validateValue(value, definitionObj, settings = {}) {
    settings = deepMerge2({
      name: "unnamed",
      throw: true,
      extendFn: null,
      validationsObj: _validationsObj
    }, settings);
    if ((value === null || value === void 0) && definitionObj.default !== void 0) {
      value = definitionObj.default;
    }
    if (value === null || value === void 0 && !definitionObj.required) {
      return true;
    }
    let issueObj = {
      $expected: definitionObj,
      $received: {
        type: typeOf(value),
        value
      },
      $name: settings.name,
      $issues: [],
      $messages: {}
    };
    Object.keys(settings.validationsObj).forEach((validationName, i) => {
      if (!_validationsObj[validationName]) {
        issueObj.$issues.push(`definitionObj.${validationName}.unknown`);
        issueObj.$messages[`definitionObj.${validationName}.unknown`] = `The specified "<yellow>${validationName}</yellow>" validation is <red>not supported</red>`;
      }
      if (!definitionObj[validationName])
        return;
      const validationObj = Object.assign({}, settings.validationsObj[validationName]);
      validationObj.args = validationObj.args.map((arg) => {
        if (typeof arg === "string" && arg.slice(0, 15) === "%definitionObj.") {
          arg = definitionObj[arg.replace("%definitionObj.", "")];
        }
        return arg;
      });
      const validationResult = validationObj.class.apply(value, ...validationObj.args);
      if (validationResult !== true) {
        issueObj.$issues.push(validationName);
        issueObj.$messages[validationName] = validationResult;
      }
    });
    if (settings.extendFn && typeof settings.extendFn === "function") {
      const additionalIssues = settings.extendFn(value, definitionObj, settings) || [];
      issueObj.$issues = [
        ...issueObj.$issues,
        ...additionalIssues.$issues || []
      ];
      issueObj.$messages = [
        ...issueObj.$messages,
        ...additionalIssues.$messages || []
      ];
    }
    if (!issueObj.$issues.length)
      return true;
    if (settings.throw) {
      throw new SValueValidationError(issueObj);
    }
    return issueObj;
  }

  // ../sugar/src/js/object/clone.js
  const lodash = __toModule(require_lodash());
  const lodash2 = __toModule(require_lodash2());

  // ../sugar/src/js/object/SWatch.js
  const micromatch = __toModule(require_micromatch());
  const SPromise3 = __toModule(require_SPromise());

  // ../sugar/src/js/event/dispatch.js
  const SPromise4 = __toModule(require_SPromise());

  // ../sugar/src/js/webcomponent/SWebComponent.js
  const on = __toModule(require_on());

  // ../sugar/node_modules/lit-html/lib/directive.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const directives = new WeakMap();
  const directive = (f) => (...args) => {
    const d = f(...args);
    directives.set(d, true);
    return d;
  };
  const isDirective = (o) => {
    return typeof o === "function" && directives.has(o);
  };

  // ../sugar/node_modules/lit-html/lib/dom.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const isCEPolyfill = typeof window !== "undefined" && window.customElements != null && window.customElements.polyfillWrapFlushCallback !== void 0;
  const reparentNodes = (container, start, end = null, before = null) => {
    while (start !== end) {
      const n = start.nextSibling;
      container.insertBefore(start, before);
      start = n;
    }
  };
  const removeNodes = (container, start, end = null) => {
    while (start !== end) {
      const n = start.nextSibling;
      container.removeChild(start);
      start = n;
    }
  };

  // ../sugar/node_modules/lit-html/lib/part.js
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const noChange = {};
  const nothing = {};

  // ../sugar/node_modules/lit-html/lib/template.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const marker = `{{lit-${String(Math.random()).slice(2)}}}`;
  const nodeMarker = `<!--${marker}-->`;
  const markerRegex = new RegExp(`${marker}|${nodeMarker}`);
  const boundAttributeSuffix = "$lit$";
  class Template {
    constructor(result, element) {
      this.parts = [];
      this.element = element;
      const nodesToRemove = [];
      const stack = [];
      const walker = document.createTreeWalker(element.content, 133, null, false);
      let lastPartIndex = 0;
      let index = -1;
      let partIndex = 0;
      const {strings, values: {length}} = result;
      while (partIndex < length) {
        const node6 = walker.nextNode();
        if (node6 === null) {
          walker.currentNode = stack.pop();
          continue;
        }
        index++;
        if (node6.nodeType === 1) {
          if (node6.hasAttributes()) {
            const attributes = node6.attributes;
            const {length: length2} = attributes;
            let count = 0;
            for (let i = 0; i < length2; i++) {
              if (endsWith(attributes[i].name, boundAttributeSuffix)) {
                count++;
              }
            }
            while (count-- > 0) {
              const stringForPart = strings[partIndex];
              const name = lastAttributeNameRegex.exec(stringForPart)[2];
              const attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
              const attributeValue = node6.getAttribute(attributeLookupName);
              node6.removeAttribute(attributeLookupName);
              const statics = attributeValue.split(markerRegex);
              this.parts.push({type: "attribute", index, name, strings: statics});
              partIndex += statics.length - 1;
            }
          }
          if (node6.tagName === "TEMPLATE") {
            stack.push(node6);
            walker.currentNode = node6.content;
          }
        } else if (node6.nodeType === 3) {
          const data = node6.data;
          if (data.indexOf(marker) >= 0) {
            const parent = node6.parentNode;
            const strings2 = data.split(markerRegex);
            const lastIndex = strings2.length - 1;
            for (let i = 0; i < lastIndex; i++) {
              let insert;
              let s = strings2[i];
              if (s === "") {
                insert = createMarker();
              } else {
                const match = lastAttributeNameRegex.exec(s);
                if (match !== null && endsWith(match[2], boundAttributeSuffix)) {
                  s = s.slice(0, match.index) + match[1] + match[2].slice(0, -boundAttributeSuffix.length) + match[3];
                }
                insert = document.createTextNode(s);
              }
              parent.insertBefore(insert, node6);
              this.parts.push({type: "node", index: ++index});
            }
            if (strings2[lastIndex] === "") {
              parent.insertBefore(createMarker(), node6);
              nodesToRemove.push(node6);
            } else {
              node6.data = strings2[lastIndex];
            }
            partIndex += lastIndex;
          }
        } else if (node6.nodeType === 8) {
          if (node6.data === marker) {
            const parent = node6.parentNode;
            if (node6.previousSibling === null || index === lastPartIndex) {
              index++;
              parent.insertBefore(createMarker(), node6);
            }
            lastPartIndex = index;
            this.parts.push({type: "node", index});
            if (node6.nextSibling === null) {
              node6.data = "";
            } else {
              nodesToRemove.push(node6);
              index--;
            }
            partIndex++;
          } else {
            let i = -1;
            while ((i = node6.data.indexOf(marker, i + 1)) !== -1) {
              this.parts.push({type: "node", index: -1});
              partIndex++;
            }
          }
        }
      }
      for (const n of nodesToRemove) {
        n.parentNode.removeChild(n);
      }
    }
  }
  const endsWith = (str, suffix) => {
    const index = str.length - suffix.length;
    return index >= 0 && str.slice(index) === suffix;
  };
  const isTemplatePartActive = (part3) => part3.index !== -1;
  const createMarker = () => document.createComment("");
  const lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

  // ../sugar/node_modules/lit-html/lib/template-instance.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class TemplateInstance {
    constructor(template6, processor, options) {
      this.__parts = [];
      this.template = template6;
      this.processor = processor;
      this.options = options;
    }
    update(values) {
      let i = 0;
      for (const part3 of this.__parts) {
        if (part3 !== void 0) {
          part3.setValue(values[i]);
        }
        i++;
      }
      for (const part3 of this.__parts) {
        if (part3 !== void 0) {
          part3.commit();
        }
      }
    }
    _clone() {
      const fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
      const stack = [];
      const parts8 = this.template.parts;
      const walker = document.createTreeWalker(fragment, 133, null, false);
      let partIndex = 0;
      let nodeIndex3 = 0;
      let part3;
      let node6 = walker.nextNode();
      while (partIndex < parts8.length) {
        part3 = parts8[partIndex];
        if (!isTemplatePartActive(part3)) {
          this.__parts.push(void 0);
          partIndex++;
          continue;
        }
        while (nodeIndex3 < part3.index) {
          nodeIndex3++;
          if (node6.nodeName === "TEMPLATE") {
            stack.push(node6);
            walker.currentNode = node6.content;
          }
          if ((node6 = walker.nextNode()) === null) {
            walker.currentNode = stack.pop();
            node6 = walker.nextNode();
          }
        }
        if (part3.type === "node") {
          const part4 = this.processor.handleTextExpression(this.options);
          part4.insertAfterNode(node6.previousSibling);
          this.__parts.push(part4);
        } else {
          this.__parts.push(...this.processor.handleAttributeExpressions(node6, part3.name, part3.strings, this.options));
        }
        partIndex++;
      }
      if (isCEPolyfill) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }
      return fragment;
    }
  }

  // ../sugar/node_modules/lit-html/lib/template-result.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const policy = window.trustedTypes && trustedTypes.createPolicy("lit-html", {createHTML: (s) => s});
  const commentMarker = ` ${marker} `;
  class TemplateResult {
    constructor(strings, values, type, processor) {
      this.strings = strings;
      this.values = values;
      this.type = type;
      this.processor = processor;
    }
    getHTML() {
      const l = this.strings.length - 1;
      let html2 = "";
      let isCommentBinding = false;
      for (let i = 0; i < l; i++) {
        const s = this.strings[i];
        const commentOpen = s.lastIndexOf("<!--");
        isCommentBinding = (commentOpen > -1 || isCommentBinding) && s.indexOf("-->", commentOpen + 1) === -1;
        const attributeMatch = lastAttributeNameRegex.exec(s);
        if (attributeMatch === null) {
          html2 += s + (isCommentBinding ? commentMarker : nodeMarker);
        } else {
          html2 += s.substr(0, attributeMatch.index) + attributeMatch[1] + attributeMatch[2] + boundAttributeSuffix + attributeMatch[3] + marker;
        }
      }
      html2 += this.strings[l];
      return html2;
    }
    getTemplateElement() {
      const template6 = document.createElement("template");
      let value = this.getHTML();
      if (policy !== void 0) {
        value = policy.createHTML(value);
      }
      template6.innerHTML = value;
      return template6;
    }
  }

  // ../sugar/node_modules/lit-html/lib/parts.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const isPrimitive = (value) => {
    return value === null || !(typeof value === "object" || typeof value === "function");
  };
  const isIterable = (value) => {
    return Array.isArray(value) || !!(value && value[Symbol.iterator]);
  };
  class AttributeCommitter {
    constructor(element, name, strings) {
      this.dirty = true;
      this.element = element;
      this.name = name;
      this.strings = strings;
      this.parts = [];
      for (let i = 0; i < strings.length - 1; i++) {
        this.parts[i] = this._createPart();
      }
    }
    _createPart() {
      return new AttributePart(this);
    }
    _getValue() {
      const strings = this.strings;
      const l = strings.length - 1;
      const parts8 = this.parts;
      if (l === 1 && strings[0] === "" && strings[1] === "") {
        const v = parts8[0].value;
        if (typeof v === "symbol") {
          return String(v);
        }
        if (typeof v === "string" || !isIterable(v)) {
          return v;
        }
      }
      let text = "";
      for (let i = 0; i < l; i++) {
        text += strings[i];
        const part3 = parts8[i];
        if (part3 !== void 0) {
          const v = part3.value;
          if (isPrimitive(v) || !isIterable(v)) {
            text += typeof v === "string" ? v : String(v);
          } else {
            for (const t of v) {
              text += typeof t === "string" ? t : String(t);
            }
          }
        }
      }
      text += strings[l];
      return text;
    }
    commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element.setAttribute(this.name, this._getValue());
      }
    }
  }
  class AttributePart {
    constructor(committer) {
      this.value = void 0;
      this.committer = committer;
    }
    setValue(value) {
      if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
        this.value = value;
        if (!isDirective(value)) {
          this.committer.dirty = true;
        }
      }
    }
    commit() {
      while (isDirective(this.value)) {
        const directive4 = this.value;
        this.value = noChange;
        directive4(this);
      }
      if (this.value === noChange) {
        return;
      }
      this.committer.commit();
    }
  }
  class NodePart {
    constructor(options) {
      this.value = void 0;
      this.__pendingValue = void 0;
      this.options = options;
    }
    appendInto(container) {
      this.startNode = container.appendChild(createMarker());
      this.endNode = container.appendChild(createMarker());
    }
    insertAfterNode(ref) {
      this.startNode = ref;
      this.endNode = ref.nextSibling;
    }
    appendIntoPart(part3) {
      part3.__insert(this.startNode = createMarker());
      part3.__insert(this.endNode = createMarker());
    }
    insertAfterPart(ref) {
      ref.__insert(this.startNode = createMarker());
      this.endNode = ref.endNode;
      ref.endNode = this.startNode;
    }
    setValue(value) {
      this.__pendingValue = value;
    }
    commit() {
      if (this.startNode.parentNode === null) {
        return;
      }
      while (isDirective(this.__pendingValue)) {
        const directive4 = this.__pendingValue;
        this.__pendingValue = noChange;
        directive4(this);
      }
      const value = this.__pendingValue;
      if (value === noChange) {
        return;
      }
      if (isPrimitive(value)) {
        if (value !== this.value) {
          this.__commitText(value);
        }
      } else if (value instanceof TemplateResult) {
        this.__commitTemplateResult(value);
      } else if (value instanceof Node) {
        this.__commitNode(value);
      } else if (isIterable(value)) {
        this.__commitIterable(value);
      } else if (value === nothing) {
        this.value = nothing;
        this.clear();
      } else {
        this.__commitText(value);
      }
    }
    __insert(node6) {
      this.endNode.parentNode.insertBefore(node6, this.endNode);
    }
    __commitNode(value) {
      if (this.value === value) {
        return;
      }
      this.clear();
      this.__insert(value);
      this.value = value;
    }
    __commitText(value) {
      const node6 = this.startNode.nextSibling;
      value = value == null ? "" : value;
      const valueAsString = typeof value === "string" ? value : String(value);
      if (node6 === this.endNode.previousSibling && node6.nodeType === 3) {
        node6.data = valueAsString;
      } else {
        this.__commitNode(document.createTextNode(valueAsString));
      }
      this.value = value;
    }
    __commitTemplateResult(value) {
      const template6 = this.options.templateFactory(value);
      if (this.value instanceof TemplateInstance && this.value.template === template6) {
        this.value.update(value.values);
      } else {
        const instance = new TemplateInstance(template6, value.processor, this.options);
        const fragment = instance._clone();
        instance.update(value.values);
        this.__commitNode(fragment);
        this.value = instance;
      }
    }
    __commitIterable(value) {
      if (!Array.isArray(this.value)) {
        this.value = [];
        this.clear();
      }
      const itemParts = this.value;
      let partIndex = 0;
      let itemPart;
      for (const item of value) {
        itemPart = itemParts[partIndex];
        if (itemPart === void 0) {
          itemPart = new NodePart(this.options);
          itemParts.push(itemPart);
          if (partIndex === 0) {
            itemPart.appendIntoPart(this);
          } else {
            itemPart.insertAfterPart(itemParts[partIndex - 1]);
          }
        }
        itemPart.setValue(item);
        itemPart.commit();
        partIndex++;
      }
      if (partIndex < itemParts.length) {
        itemParts.length = partIndex;
        this.clear(itemPart && itemPart.endNode);
      }
    }
    clear(startNode = this.startNode) {
      removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    }
  }
  class BooleanAttributePart {
    constructor(element, name, strings) {
      this.value = void 0;
      this.__pendingValue = void 0;
      if (strings.length !== 2 || strings[0] !== "" || strings[1] !== "") {
        throw new Error("Boolean attributes can only contain a single expression");
      }
      this.element = element;
      this.name = name;
      this.strings = strings;
    }
    setValue(value) {
      this.__pendingValue = value;
    }
    commit() {
      while (isDirective(this.__pendingValue)) {
        const directive4 = this.__pendingValue;
        this.__pendingValue = noChange;
        directive4(this);
      }
      if (this.__pendingValue === noChange) {
        return;
      }
      const value = !!this.__pendingValue;
      if (this.value !== value) {
        if (value) {
          this.element.setAttribute(this.name, "");
        } else {
          this.element.removeAttribute(this.name);
        }
        this.value = value;
      }
      this.__pendingValue = noChange;
    }
  }
  class PropertyCommitter extends AttributeCommitter {
    constructor(element, name, strings) {
      super(element, name, strings);
      this.single = strings.length === 2 && strings[0] === "" && strings[1] === "";
    }
    _createPart() {
      return new PropertyPart(this);
    }
    _getValue() {
      if (this.single) {
        return this.parts[0].value;
      }
      return super._getValue();
    }
    commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element[this.name] = this._getValue();
      }
    }
  }
  class PropertyPart extends AttributePart {
  }
  let eventOptionsSupported = false;
  (() => {
    try {
      const options = {
        get capture() {
          eventOptionsSupported = true;
          return false;
        }
      };
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (_e) {
    }
  })();
  class EventPart {
    constructor(element, eventName, eventContext) {
      this.value = void 0;
      this.__pendingValue = void 0;
      this.element = element;
      this.eventName = eventName;
      this.eventContext = eventContext;
      this.__boundHandleEvent = (e) => this.handleEvent(e);
    }
    setValue(value) {
      this.__pendingValue = value;
    }
    commit() {
      while (isDirective(this.__pendingValue)) {
        const directive4 = this.__pendingValue;
        this.__pendingValue = noChange;
        directive4(this);
      }
      if (this.__pendingValue === noChange) {
        return;
      }
      const newListener = this.__pendingValue;
      const oldListener = this.value;
      const shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
      const shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);
      if (shouldRemoveListener) {
        this.element.removeEventListener(this.eventName, this.__boundHandleEvent, this.__options);
      }
      if (shouldAddListener) {
        this.__options = getOptions(newListener);
        this.element.addEventListener(this.eventName, this.__boundHandleEvent, this.__options);
      }
      this.value = newListener;
      this.__pendingValue = noChange;
    }
    handleEvent(event) {
      if (typeof this.value === "function") {
        this.value.call(this.eventContext || this.element, event);
      } else {
        this.value.handleEvent(event);
      }
    }
  }
  const getOptions = (o) => o && (eventOptionsSupported ? {capture: o.capture, passive: o.passive, once: o.once} : o.capture);

  // ../sugar/node_modules/lit-html/lib/default-template-processor.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class DefaultTemplateProcessor {
    handleAttributeExpressions(element, name, strings, options) {
      const prefix = name[0];
      if (prefix === ".") {
        const committer2 = new PropertyCommitter(element, name.slice(1), strings);
        return committer2.parts;
      }
      if (prefix === "@") {
        return [new EventPart(element, name.slice(1), options.eventContext)];
      }
      if (prefix === "?") {
        return [new BooleanAttributePart(element, name.slice(1), strings)];
      }
      const committer = new AttributeCommitter(element, name, strings);
      return committer.parts;
    }
    handleTextExpression(options) {
      return new NodePart(options);
    }
  }
  const defaultTemplateProcessor = new DefaultTemplateProcessor();

  // ../sugar/node_modules/lit-html/lib/template-factory.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  function templateFactory(result) {
    let templateCache = templateCaches.get(result.type);
    if (templateCache === void 0) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      };
      templateCaches.set(result.type, templateCache);
    }
    let template6 = templateCache.stringsArray.get(result.strings);
    if (template6 !== void 0) {
      return template6;
    }
    const key = result.strings.join(marker);
    template6 = templateCache.keyString.get(key);
    if (template6 === void 0) {
      template6 = new Template(result, result.getTemplateElement());
      templateCache.keyString.set(key, template6);
    }
    templateCache.stringsArray.set(result.strings, template6);
    return template6;
  }
  const templateCaches = new Map();

  // ../sugar/node_modules/lit-html/lib/render.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const parts3 = new WeakMap();
  const render = (result, container, options) => {
    let part3 = parts3.get(container);
    if (part3 === void 0) {
      removeNodes(container, container.firstChild);
      parts3.set(container, part3 = new NodePart(Object.assign({templateFactory}, options)));
      part3.appendInto(container);
    }
    part3.setValue(result);
    part3.commit();
  };

  // ../sugar/node_modules/lit-html/lit-html.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  if (typeof window !== "undefined") {
    (window["litHtmlVersions"] || (window["litHtmlVersions"] = [])).push("1.3.0");
  }
  const html = (strings, ...values) => new TemplateResult(strings, values, "html", defaultTemplateProcessor);

  // ../sugar/src/js/dom/insertAfter.js
  function insertAfter(elm, refElm) {
    const nextSibling = refElm.nextSibling;
    if (!nextSibling) {
      refElm.parentNode.appendChild(elm);
    } else {
      refElm.parentNode.insertBefore(elm, nextSibling);
    }
  }

  // ../sugar/node_modules/lit-html/directives/async-replace.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var __asyncValues = function(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({value: v2, done: d});
      }, reject);
    }
  };
  const asyncReplace = directive((value, mapper) => async (part3) => {
    var e_1, _a;
    if (!(part3 instanceof NodePart)) {
      throw new Error("asyncReplace can only be used in text bindings");
    }
    if (value === part3.value) {
      return;
    }
    const itemPart = new NodePart(part3.options);
    part3.value = value;
    let i = 0;
    try {
      for (var value_1 = __asyncValues(value), value_1_1; value_1_1 = await value_1.next(), !value_1_1.done; ) {
        let v = value_1_1.value;
        if (part3.value !== value) {
          break;
        }
        if (i === 0) {
          part3.clear();
          itemPart.appendIntoPart(part3);
        }
        if (mapper !== void 0) {
          v = mapper(v, i);
        }
        itemPart.setValue(v);
        itemPart.commit();
        i++;
      }
    } catch (e_1_1) {
      e_1 = {error: e_1_1};
    } finally {
      try {
        if (value_1_1 && !value_1_1.done && (_a = value_1.return))
          await _a.call(value_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  });

  // ../sugar/node_modules/lit-html/directives/async-append.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var __asyncValues2 = function(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({value: v2, done: d});
      }, reject);
    }
  };
  const asyncAppend = directive((value, mapper) => async (part3) => {
    var e_1, _a;
    if (!(part3 instanceof NodePart)) {
      throw new Error("asyncAppend can only be used in text bindings");
    }
    if (value === part3.value) {
      return;
    }
    part3.value = value;
    let itemPart;
    let i = 0;
    try {
      for (var value_1 = __asyncValues2(value), value_1_1; value_1_1 = await value_1.next(), !value_1_1.done; ) {
        let v = value_1_1.value;
        if (part3.value !== value) {
          break;
        }
        if (i === 0) {
          part3.clear();
        }
        if (mapper !== void 0) {
          v = mapper(v, i);
        }
        let itemStartNode = part3.startNode;
        if (itemPart !== void 0) {
          itemStartNode = createMarker();
          itemPart.endNode = itemStartNode;
          part3.endNode.parentNode.insertBefore(itemStartNode, part3.endNode);
        }
        itemPart = new NodePart(part3.options);
        itemPart.insertAfterNode(itemStartNode);
        itemPart.setValue(v);
        itemPart.commit();
        i++;
      }
    } catch (e_1_1) {
      e_1 = {error: e_1_1};
    } finally {
      try {
        if (value_1_1 && !value_1_1.done && (_a = value_1.return))
          await _a.call(value_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  });

  // ../sugar/node_modules/lit-html/directives/cache.js
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const templateCaches2 = new WeakMap();
  const cache = directive((value) => (part3) => {
    if (!(part3 instanceof NodePart)) {
      throw new Error("cache can only be used in text bindings");
    }
    let templateCache = templateCaches2.get(part3);
    if (templateCache === void 0) {
      templateCache = new WeakMap();
      templateCaches2.set(part3, templateCache);
    }
    const previousValue = part3.value;
    if (previousValue instanceof TemplateInstance) {
      if (value instanceof TemplateResult && previousValue.template === part3.options.templateFactory(value)) {
        part3.setValue(value);
        return;
      } else {
        let cachedTemplate = templateCache.get(previousValue.template);
        if (cachedTemplate === void 0) {
          cachedTemplate = {
            instance: previousValue,
            nodes: document.createDocumentFragment()
          };
          templateCache.set(previousValue.template, cachedTemplate);
        }
        reparentNodes(cachedTemplate.nodes, part3.startNode.nextSibling, part3.endNode);
      }
    }
    if (value instanceof TemplateResult) {
      const template6 = part3.options.templateFactory(value);
      const cachedTemplate = templateCache.get(template6);
      if (cachedTemplate !== void 0) {
        part3.setValue(cachedTemplate.nodes);
        part3.commit();
        part3.value = cachedTemplate.instance;
      }
    }
    part3.setValue(value);
  });

  // ../sugar/node_modules/lit-html/directives/class-map.js
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  class ClassList {
    constructor(element) {
      this.classes = new Set();
      this.changed = false;
      this.element = element;
      const classList = (element.getAttribute("class") || "").split(/\s+/);
      for (const cls2 of classList) {
        this.classes.add(cls2);
      }
    }
    add(cls2) {
      this.classes.add(cls2);
      this.changed = true;
    }
    remove(cls2) {
      this.classes.delete(cls2);
      this.changed = true;
    }
    commit() {
      if (this.changed) {
        let classString = "";
        this.classes.forEach((cls2) => classString += cls2 + " ");
        this.element.setAttribute("class", classString);
      }
    }
  }
  const previousClassesCache = new WeakMap();
  const classMap = directive((classInfo) => (part3) => {
    if (!(part3 instanceof AttributePart) || part3 instanceof PropertyPart || part3.committer.name !== "class" || part3.committer.parts.length > 1) {
      throw new Error("The `classMap` directive must be used in the `class` attribute and must be the only part in the attribute.");
    }
    const {committer} = part3;
    const {element} = committer;
    let previousClasses = previousClassesCache.get(part3);
    if (previousClasses === void 0) {
      element.setAttribute("class", committer.strings.join(" "));
      previousClassesCache.set(part3, previousClasses = new Set());
    }
    const classList = element.classList || new ClassList(element);
    previousClasses.forEach((name) => {
      if (!(name in classInfo)) {
        classList.remove(name);
        previousClasses.delete(name);
      }
    });
    for (const name in classInfo) {
      const value = classInfo[name];
      if (value != previousClasses.has(name)) {
        if (value) {
          classList.add(name);
          previousClasses.add(name);
        } else {
          classList.remove(name);
          previousClasses.delete(name);
        }
      }
    }
    if (typeof classList.commit === "function") {
      classList.commit();
    }
  });

  // ../sugar/node_modules/lit-html/directives/if-defined.js
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const previousValues = new WeakMap();
  const ifDefined = directive((value) => (part3) => {
    const previousValue = previousValues.get(part3);
    if (value === void 0 && part3 instanceof AttributePart) {
      if (previousValue !== void 0 || !previousValues.has(part3)) {
        const name = part3.committer.name;
        part3.committer.element.removeAttribute(name);
      }
    } else if (value !== previousValue) {
      part3.setValue(value);
    }
    previousValues.set(part3, value);
  });

  // ../sugar/node_modules/lit-html/directives/guard.js
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const previousValues2 = new WeakMap();
  const guard = directive((value, f) => (part3) => {
    const previousValue = previousValues2.get(part3);
    if (Array.isArray(value)) {
      if (Array.isArray(previousValue) && previousValue.length === value.length && value.every((v, i) => v === previousValue[i])) {
        return;
      }
    } else if (previousValue === value && (value !== void 0 || previousValues2.has(part3))) {
      return;
    }
    part3.setValue(f());
    previousValues2.set(part3, Array.isArray(value) ? Array.from(value) : value);
  });

  // ../sugar/node_modules/lit-html/directives/repeat.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const createAndInsertPart = (containerPart, beforePart) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = beforePart === void 0 ? containerPart.endNode : beforePart.startNode;
    const startNode = container.insertBefore(createMarker(), beforeNode);
    container.insertBefore(createMarker(), beforeNode);
    const newPart = new NodePart(containerPart.options);
    newPart.insertAfterNode(startNode);
    return newPart;
  };
  const updatePart = (part3, value) => {
    part3.setValue(value);
    part3.commit();
    return part3;
  };
  const insertPartBefore = (containerPart, part3, ref) => {
    const container = containerPart.startNode.parentNode;
    const beforeNode = ref ? ref.startNode : containerPart.endNode;
    const endNode = part3.endNode.nextSibling;
    if (endNode !== beforeNode) {
      reparentNodes(container, part3.startNode, endNode, beforeNode);
    }
  };
  const removePart = (part3) => {
    removeNodes(part3.startNode.parentNode, part3.startNode, part3.endNode.nextSibling);
  };
  const generateMap = (list, start, end) => {
    const map = new Map();
    for (let i = start; i <= end; i++) {
      map.set(list[i], i);
    }
    return map;
  };
  const partListCache = new WeakMap();
  const keyListCache = new WeakMap();
  const repeat = directive((items, keyFnOrTemplate, template6) => {
    let keyFn;
    if (template6 === void 0) {
      template6 = keyFnOrTemplate;
    } else if (keyFnOrTemplate !== void 0) {
      keyFn = keyFnOrTemplate;
    }
    return (containerPart) => {
      if (!(containerPart instanceof NodePart)) {
        throw new Error("repeat can only be used in text bindings");
      }
      const oldParts = partListCache.get(containerPart) || [];
      const oldKeys = keyListCache.get(containerPart) || [];
      const newParts = [];
      const newValues = [];
      const newKeys = [];
      let index = 0;
      for (const item of items) {
        newKeys[index] = keyFn ? keyFn(item, index) : index;
        newValues[index] = template6(item, index);
        index++;
      }
      let newKeyToIndexMap;
      let oldKeyToIndexMap;
      let oldHead = 0;
      let oldTail = oldParts.length - 1;
      let newHead = 0;
      let newTail = newValues.length - 1;
      while (oldHead <= oldTail && newHead <= newTail) {
        if (oldParts[oldHead] === null) {
          oldHead++;
        } else if (oldParts[oldTail] === null) {
          oldTail--;
        } else if (oldKeys[oldHead] === newKeys[newHead]) {
          newParts[newHead] = updatePart(oldParts[oldHead], newValues[newHead]);
          oldHead++;
          newHead++;
        } else if (oldKeys[oldTail] === newKeys[newTail]) {
          newParts[newTail] = updatePart(oldParts[oldTail], newValues[newTail]);
          oldTail--;
          newTail--;
        } else if (oldKeys[oldHead] === newKeys[newTail]) {
          newParts[newTail] = updatePart(oldParts[oldHead], newValues[newTail]);
          insertPartBefore(containerPart, oldParts[oldHead], newParts[newTail + 1]);
          oldHead++;
          newTail--;
        } else if (oldKeys[oldTail] === newKeys[newHead]) {
          newParts[newHead] = updatePart(oldParts[oldTail], newValues[newHead]);
          insertPartBefore(containerPart, oldParts[oldTail], oldParts[oldHead]);
          oldTail--;
          newHead++;
        } else {
          if (newKeyToIndexMap === void 0) {
            newKeyToIndexMap = generateMap(newKeys, newHead, newTail);
            oldKeyToIndexMap = generateMap(oldKeys, oldHead, oldTail);
          }
          if (!newKeyToIndexMap.has(oldKeys[oldHead])) {
            removePart(oldParts[oldHead]);
            oldHead++;
          } else if (!newKeyToIndexMap.has(oldKeys[oldTail])) {
            removePart(oldParts[oldTail]);
            oldTail--;
          } else {
            const oldIndex = oldKeyToIndexMap.get(newKeys[newHead]);
            const oldPart = oldIndex !== void 0 ? oldParts[oldIndex] : null;
            if (oldPart === null) {
              const newPart = createAndInsertPart(containerPart, oldParts[oldHead]);
              updatePart(newPart, newValues[newHead]);
              newParts[newHead] = newPart;
            } else {
              newParts[newHead] = updatePart(oldPart, newValues[newHead]);
              insertPartBefore(containerPart, oldPart, oldParts[oldHead]);
              oldParts[oldIndex] = null;
            }
            newHead++;
          }
        }
      }
      while (newHead <= newTail) {
        const newPart = createAndInsertPart(containerPart, newParts[newTail + 1]);
        updatePart(newPart, newValues[newHead]);
        newParts[newHead++] = newPart;
      }
      while (oldHead <= oldTail) {
        const oldPart = oldParts[oldHead++];
        if (oldPart !== null) {
          removePart(oldPart);
        }
      }
      partListCache.set(containerPart, newParts);
      keyListCache.set(containerPart, newKeys);
    };
  });

  // ../sugar/node_modules/lit-html/directives/style-map.js
  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const previousStylePropertyCache = new WeakMap();
  const styleMap = directive((styleInfo) => (part3) => {
    if (!(part3 instanceof AttributePart) || part3 instanceof PropertyPart || part3.committer.name !== "style" || part3.committer.parts.length > 1) {
      throw new Error("The `styleMap` directive must be used in the style attribute and must be the only part in the attribute.");
    }
    const {committer} = part3;
    const {style} = committer.element;
    let previousStyleProperties = previousStylePropertyCache.get(part3);
    if (previousStyleProperties === void 0) {
      style.cssText = committer.strings.join(" ");
      previousStylePropertyCache.set(part3, previousStyleProperties = new Set());
    }
    previousStyleProperties.forEach((name) => {
      if (!(name in styleInfo)) {
        previousStyleProperties.delete(name);
        if (name.indexOf("-") === -1) {
          style[name] = null;
        } else {
          style.removeProperty(name);
        }
      }
    });
    for (const name in styleInfo) {
      previousStyleProperties.add(name);
      if (name.indexOf("-") === -1) {
        style[name] = styleInfo[name];
      } else {
        style.setProperty(name, styleInfo[name]);
      }
    }
  });

  // ../sugar/node_modules/lit-html/directives/template-content.js
  /**
   * @license
   * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const previousValues3 = new WeakMap();
  const templateContent = directive((template6) => (part3) => {
    if (!(part3 instanceof NodePart)) {
      throw new Error("templateContent can only be used in text bindings");
    }
    const previousValue = previousValues3.get(part3);
    if (previousValue !== void 0 && template6 === previousValue.template && part3.value === previousValue.fragment) {
      return;
    }
    const fragment = document.importNode(template6.content, true);
    part3.setValue(fragment);
    previousValues3.set(part3, {template: template6, fragment});
  });

  // ../sugar/node_modules/lit-html/directives/unsafe-html.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const previousValues4 = new WeakMap();
  const unsafeHTML = directive((value) => (part3) => {
    if (!(part3 instanceof NodePart)) {
      throw new Error("unsafeHTML can only be used in text bindings");
    }
    const previousValue = previousValues4.get(part3);
    if (previousValue !== void 0 && isPrimitive(value) && value === previousValue.value && part3.value === previousValue.fragment) {
      return;
    }
    const template6 = document.createElement("template");
    template6.innerHTML = value;
    const fragment = document.importNode(template6.content, true);
    part3.setValue(fragment);
    previousValues4.set(part3, {value, fragment});
  });

  // ../sugar/node_modules/lit-html/directives/unsafe-svg.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const previousValues5 = new WeakMap();
  const isIe = window.navigator.userAgent.indexOf("Trident/") > 0;
  const unsafeSVG = directive((value) => (part3) => {
    if (!(part3 instanceof NodePart)) {
      throw new Error("unsafeSVG can only be used in text bindings");
    }
    const previousValue = previousValues5.get(part3);
    if (previousValue !== void 0 && isPrimitive(value) && value === previousValue.value && part3.value === previousValue.fragment) {
      return;
    }
    const template6 = document.createElement("template");
    const content = template6.content;
    let svgElement;
    if (isIe) {
      template6.innerHTML = `<svg>${value}</svg>`;
      svgElement = content.firstChild;
    } else {
      svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      content.appendChild(svgElement);
      svgElement.innerHTML = value;
    }
    content.removeChild(svgElement);
    reparentNodes(content, svgElement.firstChild);
    const fragment = document.importNode(content, true);
    part3.setValue(fragment);
    previousValues5.set(part3, {value, fragment});
  });

  // ../sugar/node_modules/lit-html/directives/until.js
  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  const _state = new WeakMap();
  const _infinity = 2147483647;
  const until = directive((...args) => (part3) => {
    let state = _state.get(part3);
    if (state === void 0) {
      state = {
        lastRenderedIndex: _infinity,
        values: []
      };
      _state.set(part3, state);
    }
    const previousValues6 = state.values;
    let previousLength = previousValues6.length;
    state.values = args;
    for (let i = 0; i < args.length; i++) {
      if (i > state.lastRenderedIndex) {
        break;
      }
      const value = args[i];
      if (isPrimitive(value) || typeof value.then !== "function") {
        part3.setValue(value);
        state.lastRenderedIndex = i;
        break;
      }
      if (i < previousLength && value === previousValues6[i]) {
        continue;
      }
      state.lastRenderedIndex = _infinity;
      previousLength = 0;
      Promise.resolve(value).then((resolvedValue) => {
        const index = state.values.indexOf(value);
        if (index > -1 && index < state.lastRenderedIndex) {
          state.lastRenderedIndex = index;
          part3.setValue(resolvedValue);
          part3.commit();
        }
      });
    }
  });

  // ../sugar/src/js/dom/canHaveChildren.js
  function canHaveChildren(element) {
    if (typeof element === "string") {
      element = document.createElement(element);
    } else if (!(element instanceof HTMLElement)) {
      throw `The element parameter can be either a string or an HTMLElement node reference... You've passed "${typeof element}"`;
    }
    if ("canHaveHTML" in element)
      return element.canHaveHTML;
    const tagName = element.tagName;
    const closeTag = `</${tagName}>`.toLowerCase();
    if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
      return true;
    return false;
  }

  // ../sugar/src/js/webcomponent/SWebComponent.js
  const htmlTagToHtmlClassMap3 = __toModule(require_htmlTagToHtmlClassMap());

  // ../sugar/src/js/string/uncamelize.js
  function uncamelize(text, separator = "-") {
    let res = "";
    res = text.replace(/[A-Z]/g, function(letter) {
      return separator + letter.toLowerCase();
    });
    if (res.slice(0, 1) === separator)
      res = res.slice(1);
    return res;
  }

  // ../sugar/src/js/html/getHtmlClassFromTagName.js
  const htmlTagToHtmlClassMap = __toModule(require_htmlTagToHtmlClassMap());

  // ../sugar/src/js/dom/domReady.js
  const domready = __toModule(require_ready());
  function domReady(cb = null) {
    return new Promise((resolve, reject) => {
      domready.default(() => {
        cb && cb();
        resolve();
      });
    });
  }

  // ../sugar/src/js/html/getTagNameFromHtmlClass.js
  const htmlTagToHtmlClassMap2 = __toModule(require_htmlTagToHtmlClassMap());
  function getHtmlhtmlClassFromHtmlClass(htmlClass) {
    if (!htmlClass)
      return false;
    for (let key in htmlTagToHtmlClassMap2.default) {
      if (htmlTagToHtmlClassMap2.default[key] === htmlClass)
        return key;
    }
    return false;
  }

  // ../sugar/src/js/responsive/mediaQuery.js
  const SPromise5 = __toModule(require_SPromise());

  // ../sugar/src/js/responsive/SMediaQuery.js
  const SPromise6 = __toModule(require_SPromise());
  class SMediaQuery extends SPromise6.default {
    static _activeMedia = "desktop";
    static _promisesStack = {};
    static getActiveMedia() {
      return this._activeMedia;
    }
    static startListener() {
      document.addEventListener("animationend", (e) => {
        const mediaName = e.animationName.replace(/^mq-/, "");
        const previousActiveMedia = this._activeMedia;
        this._activeMedia = mediaName;
        Object.keys(this._promisesStack).forEach((name) => {
          const nameArray = name.split(" ");
          if (previousActiveMedia) {
            if (nameArray.indexOf(previousActiveMedia) !== -1) {
              const promises = this._promisesStack[name];
              promises.forEach((promise) => {
                promise.trigger("unmatch", {
                  name: previousActiveMedia
                });
              });
            }
          }
          if (nameArray.indexOf(mediaName) !== -1) {
            const promise = this._promisesStack[name];
            const promises = this._promisesStack[name];
            promises.forEach((promise2) => {
              promise2.trigger("match", {
                name: mediaName
              });
            });
          }
        });
        if (this._promisesStack["*"]) {
          const allPromises = this._promisesStack["*"];
          allPromises.forEach((allPromise) => {
            if (previousActiveMedia) {
              allPromise.trigger("unmatch", {
                name: previousActiveMedia
              });
            }
            allPromise.trigger("match", {
              name: mediaName
            });
          });
        }
      });
    }
    constructor(mediaName, settings = {}) {
      if (!Array.isArray(mediaName))
        mediaName = [mediaName];
      const name = mediaName.join(" ");
      super(settings, {
        id: `SMediaQuery.${name.split(" ").join("-")}`
      });
      if (!this.constructor._promisesStack[name])
        this.constructor._promisesStack[name] = [];
      this.constructor._promisesStack[name].push(this);
    }
  }
  SMediaQuery.startListener();
  var SMediaQuery_default = SMediaQuery;

  // ../sugar/src/js/webcomponent/SWebComponent.js
  const _sWebComponentPromise = new SPromise7.default({
    id: "SWebComponentPromise"
  });
  const _sWebComponentStack = {};
  function SWebComponentGenerator(extendsSettings = {}) {
    extendsSettings = deepMerge2({
      extends: HTMLElement,
      name: null
    }, extendsSettings);
    return class SWebComponent5 extends extendsSettings.extends {
      _settedAttributesStack = {};
      _isSWebComponent = true;
      promise = null;
      _props = {};
      props = {};
      _settings = {};
      _metas = {};
      _contexts = [this];
      static get observedAttributes() {
        return Object.keys(this.props).map((name) => uncamelize(name));
      }
      static customEvents = {};
      static componentName = void 0;
      static getComponentMetas(name) {
        return _sWebComponentStack[uncamelize(name)] || {};
      }
      static define(settings = {}) {
        const name = (settings.name || this.componentName || this.name).replace("WebComponent", "");
        const uncamelizedName = uncamelize(name);
        if (customElements.get(uncamelizedName))
          return;
        this.componentName = name;
        if (_sWebComponentStack[uncamelizedName])
          return;
        _sWebComponentStack[uncamelizedName] = {
          name,
          dashName: uncamelizedName,
          class: this,
          extends: extendsSettings.extends,
          settings
        };
        const defineSettings = {};
        if (extendsSettings.extends !== HTMLElement)
          defineSettings.extends = getHtmlhtmlClassFromHtmlClass(extendsSettings.extends);
        if (window.customElements) {
          try {
            window.customElements.define(uncamelizedName, this, defineSettings);
          } catch (e) {
          }
        } else if (document.registerElement) {
          try {
            defineSettings.prototype = this.prototype;
            document.registerElement(uncamelizedName, defineSettings);
          } catch (e) {
          }
        } else {
          throw `Your browser does not support either document.registerElement or window.customElements.define webcomponents specification...`;
        }
      }
      constructor(settings = {}) {
        super();
        if (!this.constructor.componentName)
          throw `Your MUST define a static "componentName" camelcase property like "SFiltrableInput" for your component to work properly...`;
        this._metas = this.constructor.getComponentMetas(this.constructor.componentName);
        this._settings = deepMerge2({
          id: this.getAttribute("id") || uniqid2(),
          props: {}
        }, this._metas.settings || {}, settings);
        this.registerContext(this);
        this.promise = new SPromise7.default({
          id: this._settings.id
        });
        this._initPropsProxy();
        this.on("ready", (e) => {
          if (e.target === this)
            return;
          if (e.target._isSWebComponent) {
            e.stopImmediatePropagation();
            e.target.registerContext(this);
          }
        });
        this.on("mounted", () => {
          if (!this.lit) {
            this.update();
            this.dispatch("ready", this, {
              bubbles: true
            });
          }
        });
        domReady(() => {
          this._initDomProps();
          this._mediaQuery = new SMediaQuery_default("*");
          this._mediaQuery.on("match", (media) => {
            Object.keys(this.constructor.props).forEach((prop) => {
              if (!this._props[prop].responsive || this._props[prop].responsiveValues[media.name] !== void 0)
                return;
              if (this.hasAttribute(`${uncamelize(prop)}-${media.name}`)) {
                const value = parse_default(this.getAttribute(`${uncamelize(prop)}-${media.name}`));
                this.setProp(prop, value, media.name);
              }
            });
          });
          const currentClassName = this.getAttribute("class") || "";
          this.setAttribute("class", `${currentClassName} ${this.selector(`node`)}`);
          this._mount();
        });
      }
      get settings() {
        return this._settings;
      }
      get $root() {
        return this;
      }
      update() {
        this._refreshIdReferences();
        this._handlePhysicalProps();
      }
      $(path4) {
        const tries = [this.selector(path4), path4];
        for (let i = 0; i < tries.length; i++) {
          const $tryRes = this.$root.querySelector(tries[i]);
          if ($tryRes)
            return $tryRes;
        }
        return null;
      }
      $$(path4) {
        const tries = [this.selector(path4), path4];
        for (let i = 0; i < tries.length; i++) {
          const $tryRes = this.$root.querySelectorAll(tries[i]);
          if ($tryRes)
            return $tryRes;
        }
        return null;
      }
      registerContext(context) {
        if (this._contexts.indexOf(context) !== -1)
          return;
        this._contexts.push(context);
      }
      setProp(prop, value, media = null) {
        if (!media)
          return this.props[prop] = value;
        if (!this._props[prop].responsive) {
          throw new SError(`You try to set the responsive property "${prop}" for the media "${media}" but this property is not defined as "responsive"...`);
        }
        this._props[prop].responsiveValues[media] = value;
        this._triggerPropsEvents(prop);
      }
      getProp(prop, media = null) {
        if (!media)
          return this._props[prop].value;
        if (!this._props[prop].responsive) {
          throw new SError(`You try to get the responsive property "${prop}" for the media "${media}" but this property is not defined as "responsive"...`);
        }
        return this._props[prop].responsiveValues[media];
      }
      setSettings(settings = {}, reactive = true) {
        this._settings = deepMerge2(this._settings, settings);
        if (reactive)
          this.update();
      }
      addClass(cls2, $elm = this) {
        const clsArray = cls2.split(" ");
        clsArray.forEach((className) => {
          const selector = this.selector(className);
          selector.split(" ").forEach((sel) => {
            $elm.classList.add(sel);
          });
        });
        return this;
      }
      removeClass(cls2, $elm = this) {
        const clsArray = cls2.split(" ");
        clsArray.forEach((className) => {
          const selector = this.selector(className);
          selector.split(" ").forEach((sel) => {
            $elm.classList.remove(sel);
          });
        });
        return this;
      }
      get metas() {
        return {
          instance: this,
          $node: this,
          ...this._metas
        };
      }
      _refreshIdReferences() {
        const $refs = this.$root.querySelectorAll("[id]");
        Array.from($refs).forEach(($item) => {
          if (this[`$${$item.id}`] === $item)
            return;
          this[`$${$item.id}`] = $item;
        });
      }
      _initPropsProxy() {
        for (const prop in this.constructor.props) {
          let originalProp;
          if (this[prop] !== void 0)
            originalProp = this[prop];
          Object.defineProperty(this._props, prop, {
            enumerable: false,
            writable: true,
            configurable: false,
            value: {
              ...this.constructor.props[prop],
              previousValue: void 0,
              value: void 0,
              responsiveValues: {}
            }
          });
          Object.defineProperty(this.props, prop, {
            enumerable: true,
            configurable: false,
            get: () => {
              let returnValue = this._props[prop].value !== void 0 ? this._props[prop].value : this._settings.props[prop] !== void 0 ? this._settings.props[prop] : this.constructor.props[prop].default;
              if (this._props[prop].responsive && this._props[prop].responsiveValues) {
                if (this._props[prop].responsiveValues[SMediaQuery_default.getActiveMedia()] !== void 0) {
                  returnValue = this._props[prop].responsiveValues[SMediaQuery_default.getActiveMedia()];
                }
              }
              if (prop.substr(0, 1) === ":") {
                if (typeof returnValue !== "string") {
                  return returnValue;
                }
                for (let i = 0; i < this._contexts.length; i++) {
                  const context = this._contexts[i];
                  if (context[returnValue] !== void 0)
                    return context[returnValue];
                }
              }
              return returnValue;
            },
            set: (value) => {
              this._props[prop].previousValue = this._props[prop].value;
              this._props[prop].value = value;
              if (originalProp) {
                Object.getOwnPropertyDescriptor(this.prototype, prop).set.call(this, value);
              }
              this._triggerPropsEvents(prop);
            }
          });
          this.promise.on(`props.${prop}.*`, (update) => {
            console.log("up", prop, update);
            this.update();
          });
        }
      }
      _initDomProps() {
        for (const prop in this.constructor.props) {
          let attr = this.getAttribute(uncamelize(prop));
          if (!attr && this.hasAttribute(uncamelize(prop))) {
            attr = true;
          }
          if (!attr)
            continue;
          this._props[prop].value = attr ? parse_default(attr) : this._props[prop].value !== void 0 ? this._props[prop].value : this._settings.props[prop] !== void 0 ? this._settings.props[prop] : this.constructor.props[prop].default;
        }
      }
      async _mount() {
        this.dispatch("mounting", this);
        await this._mountDependencies();
        this._checkPropsDefinition();
        this.update();
        this._isMounted = true;
        this.dispatch("mounted", this);
      }
      on(event, callback) {
        this.addEventListener(event, (e) => {
          callback(e);
        });
      }
      off(event, callback) {
      }
      dispatch(name, value, settings = {}) {
        const event = new CustomEvent(name, {
          ...settings,
          detail: value
        });
        this.dispatchEvent(event);
      }
      _mountDependencies() {
        return new Promise((resolve, reject) => {
          let promises = [];
          if (this._settings.mountWhen) {
            promises.push(when(this._settings.mountWhen));
          }
          if (this._settings.mountDependencies) {
            const depsFns = [...this._settings.mountDependencies];
            depsFns.forEach((fn) => {
              promises.push(fn());
            });
          }
          Promise.all(promises).then(() => {
            resolve();
          });
        });
      }
      connectedCallback() {
        setTimeout(() => {
          this.dispatch("attach", this);
        });
      }
      disconnectedCallback() {
        this.dispatch("detach", this);
      }
      attributeChangedCallback(attrName, oldVal, newVal) {
        if (!this._isMounted)
          return;
        if (this._settedAttributesStack[attrName])
          return;
        const newValue = parse_default(newVal) || false;
        this[attrName] = newValue;
      }
      selector(cls2 = "") {
        const split = cls2.split(" ");
        const finalSelectorArray = [];
        split.forEach((part3) => {
          const hasDot = part3.match(/^\./), hasHash = part3.match(/^\#/);
          part3 = part3.replace(".", "").replace("#", "");
          let finalClsPart;
          if (part3.match(/^(--)/))
            finalClsPart = `${this.metas.dashName}${part3}`;
          else if (part3 !== "")
            finalClsPart = `${this.metas.dashName}__${part3}`;
          else
            finalClsPart = this.metas.dashName;
          if (hasDot)
            finalClsPart = `.${finalClsPart}`;
          if (hasHash)
            finalClsPart = `#${finalClsPart}`;
          if (this.constructor.cssName) {
            let baseCls = uncamelize(this.constructor.cssName).replace("-web-component", "");
            if (!finalClsPart.includes(baseCls)) {
              let finalBaseCls = "";
              if (part3.match(/^(--)/))
                finalBaseCls = `${baseCls}${part3}`;
              else if (part3 !== "")
                finalBaseCls = `${baseCls}__${part3}`;
              else
                finalBaseCls = baseCls;
              if (hasDot) {
                finalBaseCls = `.${finalBaseCls}`;
              } else if (hasHash) {
                finalBaseCls = `#${finalBaseCls}`;
              } else {
                finalClsPart += ` ${finalBaseCls}`;
              }
            }
          }
          finalSelectorArray.push(finalClsPart);
        });
        return finalSelectorArray.join(" ");
      }
      _triggerPropsEvents(prop) {
        const eventObj = {
          prop,
          action: this._props[prop].previousValue !== null ? this._props[prop].value !== null ? "set" : "delete" : "set",
          value: this._props[prop].value,
          previousValue: this._props[prop].previousValue,
          media: SMediaQuery_default.getActiveMedia()
        };
        this.promise.trigger(`props.${prop}.${eventObj.action}`, eventObj);
      }
      _handlePhysicalProps(...props) {
        if (!props || props.length === 0)
          props = Object.keys(this._props);
        props.forEach((prop) => {
          if (!this._props[prop].physical)
            return;
          const value = this._props[prop].value;
          if (value === void 0 || value === null || value === false) {
            this.removeAttribute(prop);
            return;
          }
          if (!this.getAttribute(prop)) {
            this._settedAttributesStack[prop] = true;
            this.setAttribute(prop, toString4(value));
            delete this._settedAttributesStack[prop];
          } else {
            const currentAttributeValue = this.getAttribute(prop);
            const currentValueStringified = toString4(value);
            if (currentAttributeValue !== currentValueStringified) {
              this._settedAttributesStack[prop] = true;
              this.setAttribute(prop, currentValueStringified);
              delete this._settedAttributesStack[prop];
            }
          }
        });
      }
      _checkPropsDefinition(...props) {
        if (!props || props.length === 0)
          props = Object.keys(this.constructor.props);
        props.forEach((prop) => {
          const propObj = this._props[prop];
          const validationResult = validateValue(propObj.value, propObj, {
            name: `${this.constructor.name}.props.${prop}`,
            throw: true
          });
        });
      }
    };
  }
  var SWebComponent_default = SWebComponentGenerator;

  // node_modules/@coffeekraken/sugar/src/js/webcomponent/SLitHtmlWebComponent.js
  function SLitHtmlWebComponentGenerator(extendSettings = {}) {
    return class SLitHtmlWebComponent5 extends SWebComponent_default(extendSettings) {
      static template = (props, settings, lit) => lit.html`
      <p>
        You need to specify a static template property for your component...
      </p>
    `;
      lit = {
        html,
        render,
        asyncReplace,
        asyncAppend,
        cache,
        classMap,
        ifDefined,
        guard,
        repeat,
        styleMap,
        templateContent,
        unsafeHTML,
        unsafeSVG,
        until
      };
      constructor(settings = {}) {
        super(deepMerge2({}, settings));
        this.on("mounted", (e) => {
          if (canHaveChildren(this)) {
            this.$container = this;
            this.addClass("", this);
          } else {
            this.$container = document.createElement("div");
            this.addClass("", this.$container);
            insertAfter(this.$container, this);
          }
          this.update();
          this.dispatch("ready", this, {
            bubbles: true
          });
          this._mediaQuery.on("match", (media) => {
            this.render();
          });
        });
      }
      get $root() {
        return this.$container || this;
      }
      update() {
        this._render();
        super.update();
      }
      _render() {
        if (!this.$container)
          return;
        const tplFn = this.constructor.template.bind(this);
        const tpl = tplFn(this.props, this._settings, this.lit);
        render(tpl, this.$container);
      }
      render = throttle(() => {
        this._render();
      }, 50);
    };
  }
  var SLitHtmlWebComponent_default2 = SLitHtmlWebComponentGenerator;

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/object/deepMerge.js
  const copy_to3 = __toModule(require_copy_to());
  function deepMerge16(...args) {
    let settings = {
      array: false,
      object: true
    };
    function merge(firstObj, secondObj) {
      const newObj = {};
      if (!firstObj && secondObj)
        return secondObj;
      if (!secondObj && firstObj)
        return firstObj;
      if (!firstObj && !secondObj)
        return {};
      copy_to3.default(firstObj).override(newObj);
      for (const key of Object.keys(secondObj)) {
        if (settings.array === true && Array.isArray(firstObj[key]) && Array.isArray(secondObj[key])) {
          let newArray = unique([...firstObj[key], ...secondObj[key]]);
          newObj[key] = newArray;
          continue;
        } else if (settings.object === true && plainObject(firstObj[key]) && plainObject(secondObj[key])) {
          newObj[key] = merge(firstObj[key], secondObj[key]);
          continue;
        }
        copy_to3.default(secondObj).pick(key).toCover(newObj);
      }
      return newObj;
    }
    let potentialSettingsObj = args[args.length - 1] || {};
    if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
      if (potentialSettingsObj.array !== void 0)
        settings.array = potentialSettingsObj.array;
      if (potentialSettingsObj.object !== void 0)
        settings.object = potentialSettingsObj.object;
      args.pop();
    }
    let currentObj = {};
    for (let i = 0; i < args.length; i++) {
      const toMergeObj = args[i] || {};
      currentObj = merge(currentObj, toMergeObj);
    }
    return currentObj;
  }

  // ../../webcomponents/s-filtrable-input/src/js/index.js
  const on3 = __toModule(require_on2());

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/object/clone.js
  const lodash3 = __toModule(require_lodash());
  const lodash4 = __toModule(require_lodash2());
  function clone4(object2, deep = false) {
    if (deep) {
      return lodash4.default(object2);
    }
    return lodash3.default(object2);
  }

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/dom/nodeIndex.js
  function nodeIndex(node6) {
    let index = 0;
    while (node6 = node6.previousElementSibling) {
      index++;
    }
    return index;
  }

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/http/SRequest.js
  const axios2 = __toModule(require_axios2());
  const autoCast5 = __toModule(require_autoCast());

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/webcomponent/SLitHtmlWebComponent.js
  function SLitHtmlWebComponentGenerator2(extendSettings = {}) {
    return class SLitHtmlWebComponent5 extends SWebComponent_default(extendSettings) {
      static template = (props, settings, lit) => lit.html`
      <p>
        You need to specify a static template property for your component...
      </p>
    `;
      lit = {
        html,
        render,
        asyncReplace,
        asyncAppend,
        cache,
        classMap,
        ifDefined,
        guard,
        repeat,
        styleMap,
        templateContent,
        unsafeHTML,
        unsafeSVG,
        until
      };
      constructor(settings = {}) {
        super(deepMerge2({}, settings));
        this.on("mounted", (e) => {
          if (canHaveChildren(this)) {
            this.$container = this;
            this.addClass("", this);
          } else {
            this.$container = document.createElement("div");
            this.addClass("", this.$container);
            insertAfter(this.$container, this);
          }
          this.update();
          this.dispatch("ready", this, {
            bubbles: true
          });
          this._mediaQuery.on("match", (media) => {
            this.render();
          });
        });
      }
      get $root() {
        return this.$container || this;
      }
      update() {
        this._render();
        super.update();
      }
      _render() {
        if (!this.$container)
          return;
        const tplFn = this.constructor.template.bind(this);
        const tpl = tplFn(this.props, this._settings, this.lit);
        render(tpl, this.$container);
      }
      render = throttle(() => {
        this._render();
      }, 50);
    };
  }
  var SLitHtmlWebComponent_default3 = SLitHtmlWebComponentGenerator2;

  // ../../webcomponents/s-filtrable-input/node_modules/@coffeekraken/sugar/src/js/webcomponent/SWebComponent.js
  const SPromise8 = __toModule(require_SPromise());
  const on2 = __toModule(require_on());
  const htmlTagToHtmlClassMap4 = __toModule(require_htmlTagToHtmlClassMap());
  const _sWebComponentPromise2 = new SPromise8.default({
    id: "SWebComponentPromise"
  });

  // ../../webcomponents/s-filtrable-input/src/scss/_bare.scss
  var css = `/* Compiled using Coffeekraken Sugar SScssCompiler class which stand over the AMAZING sass module */
            .s-filtrable-input{display:inline-block;position:relative}.s-filtrable-input__list{position:absolute;top:100%;left:0;overflow-x:hidden;overflow-y:auto;opacity:0;max-width:calc(100vw - 100px);pointer-events:none;min-width:100%}.s-filtrable-input__list:focus,.s-filtrable-input__node:focus+.s-filtrable-input__list{opacity:1;pointer-events:all}.s-filtrable-input--ontop .s-filtrable-input__list{bottom:100%;top:initial}.s-filtrable-input__list-item{cursor:pointer}.s-filtrable-input__list-item *{pointer-events:none}`;
  var $head = document.head || document.getElementsByTagName("head")[0];
  var $style = document.createElement("style");
  $head.appendChild($style);
  if ($style.styleSheet) {
    $style.styleSheet.cssText = css;
  } else {
    $style.appendChild(document.createTextNode(css));
  }

  // ../../webcomponents/s-filtrable-input/src/js/index.js
  class SFiltrableInputWebComponent extends SLitHtmlWebComponent_default3({
    extends: HTMLInputElement,
    name: "SFiltrableInput"
  }) {
    static props = {};
    static customEvents = {
      select: {}
    };
    static cssName = "SFiltrableInput";
    static template = function(props, settings, lit) {
      return lit.html`
      ${this}
      <ul class="${this.selector("list")}" tabindex="1">
        ${props.loading ? lit.html`
              ${settings.template.loading(settings, lit)}
            ` : props.items.length === 0 ? lit.html`
                ${settings.template.noItem(settings, lit)}
            ` : lit.html`
            ${props.items.map((item, i) => i < this._maxDisplayItems ? lit.html`
                <li class="${this.selector("list-item")} ${item.type !== void 0 ? this.selector(`list-item--${item.type.toLowerCase()}`) : ""} ${this._preselectedItemIdx === i ? this.selector("list-item--preselected") : ""} ${this._selectedItemIdx === i ? this.selector("list-item--selected") : ""}">
                  ${settings.template.item.bind(this)(item, settings, lit)}
                </li>
              ` : "")}`}
      </ul>
    `;
    };
    _preselectedItemIdx = -1;
    _originalItems = null;
    constructor(settings = {}) {
      super(deepMerge16({
        filter: {
          throttleTimeout: 100,
          properties: ["title", "description"],
          function: null
        },
        template: {
          noItem: (settings2, lit) => lit.html`
              <li class="${this.selector("list-no-item")}"></li>
                <div class="${this.selector("list-no-item-text")}">
                  ${this.props.noItemText}
                </div>
              </li>
            `,
          loading: (settings2, lit) => lit.html`
              <div class="${this.selector("list-loading")}">
                <span class="${this.selector("list-loading-icon")}"></span>
                <span class="${this.selector("list-loading-text")}">${this.props.loadingText}</span>
              </div>
            `,
          item: (itemObj, settings2, lit) => lit.html`
              ${itemObj.title ? lit.html`
                <div class="${this.selector("list-item-title")}">
                    ${this.highlightFilter(itemObj.title)}
                </div>
              ` : ""}
              ${itemObj.description ? lit.html`
                <div class="${this.selector("list-item-description")}">
                  ${this.highlightFilter(itemObj.description)}
                </div>
              ` : ""}
            `
        }
      }, settings));
      if (!this._settings.filter.function)
        this._settings.filter.function = this.filterItems.bind(this);
      this._maxDisplayItems = this.props.maxDisplayItems;
      this.promise.on("props.items.*", (e) => {
        this.unselect();
        this.update();
      });
      this.on("ready", () => {
        this._$list = this.$(".list");
        let filterTimeout;
        this.addEventListener("input", (e) => {
          clearTimeout(filterTimeout);
          if (this.props.loading)
            return;
          filterTimeout = setTimeout(async () => {
            this.props.loading = true;
            this._maxDisplayItems = this.props.maxDisplayItems;
            if (this.props.preselectFirst) {
              this._preselectedItemIdx = 0;
            } else {
              this._preselectedItemIdx = -1;
            }
            this._selectedItemIdx = -1;
            this._filterString = e.srcElement.value;
            const newItemsArray = await this._settings.filter.function(this._filterString);
            this.props.loading = false;
            this.props.items = newItemsArray;
            this._$list.scrollTop = 0;
          }, this._settings.filter.throttleTimeout);
        });
        this._$list.addEventListener("click", (e) => {
          const nodeIndex3 = nodeIndex(e.srcElement);
          this.select(nodeIndex3);
        });
        this._$list.addEventListener("scroll", (e) => {
          if (e.srcElement.scrollHeight - e.srcElement.scrollTop <= e.srcElement.clientHeight + 50) {
            if (this._maxDisplayItems < this.props.items.length) {
              this._maxDisplayItems += this.props.maxDisplayItems;
              this.render();
            }
          }
        });
        document.addEventListener("keydown", (e) => {
          if (!this.isActive())
            return;
          switch (e.keyCode) {
            case 38:
              this.up();
              break;
            case 40:
              this.down();
              break;
            case 13:
              this.validate();
              break;
            case 27:
              if (this.props.closeOnEscape) {
                this.escape();
              }
              break;
          }
        });
        this.addEventListener("focus", () => {
          document.dispatchEvent(new Event("scroll"));
        });
        document.addEventListener("scroll", (e) => {
          var element = this.$container;
          var topPos = element.getBoundingClientRect().top;
          if (document.documentElement.clientHeight / 2 < topPos) {
            this.addClass("--ontop", this.$container);
            this._$list.style.maxHeight = `${topPos - 20}px`;
          } else {
            this.removeClass("--ontop", this.$container);
            this._$list.style.maxHeight = `${document.documentElement.clientHeight - topPos - this.$container.clientHeight - 20}px`;
          }
        });
      });
    }
    isActive() {
      if (this === document.activeElement)
        return true;
      if (this._$list === document.activeElement)
        return true;
      return false;
    }
    unselect() {
      this._selectedItemIdx = -1;
    }
    select(idx, settings = {}) {
      settings = deepMerge16({
        append: false
      }, settings);
      if (typeof idx !== "number")
        return false;
      if (idx < 0 || idx >= this.props.items.length)
        return false;
      this.focus();
      this._selectedItemIdx = idx;
      this._preselectedItemIdx = idx;
      this.render();
      const selectedItem = clone4(this.props.items[this._selectedItemIdx]);
      let inputValue;
      if (selectedItem.inputValue && typeof selectedItem.inputValue === "string") {
        inputValue = selectedItem.inputValue;
      } else {
        const inputValueProp = this.props.inputValueProp;
        if (typeof inputValueProp === "string")
          inputValue = selectedItem[inputValueProp];
        else if (typeof inputValueProp === "function")
          inputValue = inputValueProp(selectedItem);
      }
      if (inputValue)
        this.setAttribute("value", inputValue);
      if (selectedItem.onSelect && typeof selectedItem.onSelect === "function") {
        const onSelectFn = selectedItem.onSelect.bind(this);
        onSelectFn(selectedItem);
      } else if (this.props[":onSelect"] && typeof this.props[":onSelect"] === "function") {
        const onSelectFn = this.props[":onSelect"].bind(this);
        onSelectFn(selectedItem);
      } else if (selectedItem.href) {
        window.location = selectedItem.href;
      }
      this.value = "";
      this._filterString = null;
      this.dispatch("select", selectedItem);
      if (this.props.closeOnSelect || selectedItem.close) {
        setTimeout(() => {
          this.escape();
        }, this.props.closeOnSelectTimeout);
      }
      return selectedItem;
    }
    escape() {
      this.blur();
      this._$list.blur();
    }
    validate() {
      if (this._preselectedItemIdx === -1)
        return;
      if (!this.props.items[this._preselectedItemIdx])
        return;
      return this.select(this._preselectedItemIdx);
    }
    up() {
      if (this._preselectedItemIdx <= 0)
        return;
      this._preselectedItemIdx--;
      this.render();
      const $preselectedItem = this.$(".list-item--preselected");
      if ($preselectedItem.offsetTop <= this._$list.scrollTop) {
        this._$list.scrollTop = $preselectedItem.offsetTop;
      }
      this.dispatch("up", this);
    }
    down() {
      if (this._preselectedItemIdx === this.props.items.length - 1)
        return;
      this._preselectedItemIdx++;
      this.render();
      const $preselectedItem = this.$(".list-item--preselected");
      if ($preselectedItem.offsetTop > this._$list.scrollTop + this._$list.clientHeight - $preselectedItem.clientHeight) {
        this._$list.scrollTop = $preselectedItem.offsetTop - this._$list.clientHeight + $preselectedItem.clientHeight;
      }
      this.dispatch("down", this);
    }
    filterItems(filterString) {
      return new Promise((resolve) => {
        if (!this._originalItems) {
          this._originalItems = clone4(this.props.items, true);
        }
        const newItems = this._originalItems.filter((item) => {
          for (const idx in this._settings.filter.properties) {
            const prop = this._settings.filter.properties[idx];
            console.log(prop, item);
            if (!item[prop] || typeof item[prop] !== "string")
              continue;
            const reg = new RegExp(filterString, "gi");
            if (item[prop].match(reg))
              return true;
          }
          return false;
        });
        resolve(newItems);
      });
    }
    highlightFilter(string2) {
      if (!this._filterString)
        return string2;
      const reg = new RegExp(this._filterString, "gi");
      const finalString = string2.replace(reg, (str) => {
        return `<span class="${this.selector("list-item-highlight")}">${str}</span>`;
      });
      return this.lit.unsafeHTML(finalString);
    }
  }
  var js_default = SFiltrableInputWebComponent;

  // src/js/webcomponents/SSugarUiWebComponent.js
  js_default.define({
    name: "SSugarUiInputNavigation"
  });
  class SSugarUiWebComponent extends SLitHtmlWebComponent_default2() {
    static componentName = "SSugarUi";
    static props = {
      docMapApiUrl: {
        type: "String",
        description: "Specify the docMap api url to reach in order to get the docMap JSON",
        default: "docMap"
      }
    };
    static template = function(props, settings, lit) {
      return lit.html`
      <div class="${this.selector("main")}">
        <a class="${this.selector("logo")}" href="https://coffeekraken.io" target="_blank">
          <i class="${this.selector("coffeekraken-logo")}"></i>
        </a>
        <div class="${this.selector("nav")}">
          <input type="text" is="s-sugar-ui-input-navigation" class="${this.selector("nav-input")}" placeholder="Search and navigation" id="nav" no-item-text="MOBILE" />
        </div>
        <div class="${this.selector("utils")}">
          <a href="https://github.com/coffeekraken" target="_blank">
            <i class="icon-github"></i>
          </a>
        </div>
      </div>`;
    };
    constructor(settings = {}) {
      super(deepMerge({}, settings));
      this._navigationStack = [this._main];
      this.on("ready", (e) => {
        this.$nav.setSettings({
          props: {
            closeOnSelect: false,
            closeOnEscape: false
          },
          template: {
            item: function(itemObj, settings2, lit) {
              switch (itemObj.type) {
                case "main":
                  return lit.html`
                    <i class="icon-${itemObj.icon}"></i> ${this.highlightFilter(itemObj.title)}
                `;
                  break;
                case "api":
                  return lit.html`
                  <div class="seach-navigation__item-api">
                    ${itemObj.icon ? lit.html`
                      <i class="icon-${itemObj.icon}"></i> 
                    ` : ""}
                    <p class="${this.selector("list-item-title")}"><span class="${this.selector("list-item-extension")}" extension="${itemObj.extension}">${itemObj.extension}</span> ${this.highlightFilter(itemObj.title)}</p>
                    <p class="${this.selector("list-item-description")}">${this.highlightFilter(itemObj.description)}</p>
                  </div>
                `;
                  break;
                default:
                  return settings2.template.item;
                  break;
              }
            }
          }
        });
        this._main();
        this._initShortcuts();
      });
    }
    _initShortcuts() {
      hotkey_default("ctrl+p").on("press", (e) => {
        this.$nav.focus();
      });
      hotkey_default("escape").on("press", (e) => {
        if (this._navigationStack.length <= 1) {
          this.$nav.escape();
          return;
        }
        this._navigationStack.pop();
        this._navigationStack[this._navigationStack.length - 1].call(this);
      });
    }
    _main() {
      const items = [
        {
          title: "Get Started",
          icon: "start",
          type: "main"
        },
        {
          title: "Sugar Toolkit",
          icon: "toolkit",
          type: "main",
          onSelect: this._sugarToolkit.bind(this)
        },
        {
          title: "Webcomponents",
          icon: "component",
          type: "main",
          onSelect: this._webcomponents.bind(this)
        },
        {
          title: "API References",
          icon: "api",
          type: "main",
          onSelect: this._apiReferences.bind(this)
        },
        {
          title: "Community",
          icon: "community",
          type: "main",
          onSelect: this._community.bind(this)
        }
      ];
      this.$nav.props.items = items;
    }
    async _sugarToolkit() {
      this._navigationStack.push(this._sugarToolkit);
      const items = [
        {
          title: "What is Sugar?",
          icon: "what",
          type: "main",
          href: "/sugar/what-is-sugar"
        },
        {
          title: "Get Started",
          icon: "start",
          type: "main",
          href: "/sugar/get-started"
        },
        {
          title: "API References",
          icon: "api",
          type: "main",
          href: "/sugar/api-references"
        }
      ];
      this.$nav.props.items = items;
    }
    async _webcomponents() {
      this._navigationStack.push(this._webcomponents);
      const items = [
        {
          title: "What are Webcomponents?",
          icon: "what",
          type: "main",
          href: "/webcomponents/what-are-webcomponents"
        },
        {
          title: "Build your own",
          icon: "build",
          type: "main",
          href: "/webcomponents/build-your-own"
        },
        {
          title: "API References",
          icon: "api",
          type: "main",
          href: "/webcomponents/api-references"
        }
      ];
      this.$nav.props.items = items;
    }
    async _apiReferences() {
      this._navigationStack.push(this._apiReferences);
      if (this._apiReferencesItems) {
        this.$nav.props.items = this._apiReferencesItems;
        return;
      }
      this.$nav.props.loading = true;
      const request = new SRequest({
        url: this.props.docMapApiUrl,
        method: "GET"
      });
      const json2 = await request.send();
      let items = Object.keys(json2.data).map((key) => {
        const itemObj = json2.data[key];
        return {
          title: key,
          description: itemObj.description,
          type: "api",
          extension: itemObj.extension
        };
      });
      this._apiReferencesItems = items;
      this.$nav.props.loading = false;
      this.$nav.props.items = items;
    }
    async _community() {
      this._navigationStack.push(this._community);
      const items = [
        {
          title: "Github",
          type: "main",
          href: "https://github.com/coffeekraken"
        },
        {
          title: "Facebook",
          type: "main",
          href: "https://facebook.com/coffeekraken"
        }
      ];
      this.$nav.props.items = items;
    }
  }

  // src/js/index.js
  SSugarUiWebComponent.define();
})();

              