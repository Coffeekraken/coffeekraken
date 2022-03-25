var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __getMethods from "@coffeekraken/sugar/shared/class/utils/getMethods";
import __SClass from "@coffeekraken/s-class";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __deepMerge from "@coffeekraken/sugar/src/shared/object/deepMerge";
import __wait from "@coffeekraken/sugar/shared/time/wait";
import __SLog from "@coffeekraken/s-log";
import __treatAsValue from "./treatAsValue";
class SPromise extends __SClass.extends(Promise) {
  constructor(executorFnOrSettings = {}, settings) {
    let executorFn, _this, resolvers = {};
    super(__deepMerge({
      promise: {
        treatCancelAs: "resolve",
        destroyTimeout: 1,
        preventRejectOnThrow: true,
        emitLogErrorEventOnThrow: true,
        resolveAtResolveEvent: false,
        rejectAtRejectEvent: false,
        resolveProxies: [],
        rejectProxies: []
      }
    }, typeof executorFnOrSettings === "object" ? executorFnOrSettings : {}, settings != null ? settings : {}), (resolve, reject) => {
      resolvers.resolve = resolve;
      new Promise((rejectPromiseResolve, rejectPromiseReject) => {
        resolvers.reject = (...args) => {
          rejectPromiseReject(...args);
          if (this.promiseSettings.preventRejectOnThrow) {
            resolve(...args);
          } else {
            reject(...args);
          }
        };
      }).catch((e) => {
        this.emit("catch", e);
      });
    });
    this._promiseState = "pending";
    this._eventEmitter = new __SEventEmitter(__deepMerge({
      metas: __spreadValues({}, this.metas),
      eventEmitter: {}
    }, this._settings));
    this.expose(this._eventEmitter, {
      as: "eventEmitter",
      props: [
        "on",
        "off",
        "emit",
        "pipe",
        "pipeErrors",
        "pipeFrom",
        "pipeTo",
        "eventEmitterSettings"
      ]
    });
    this.bind = this._eventEmitter.bind.bind(this);
    this._resolvers = resolvers;
    if (this._settings.promise.destroyTimeout !== -1) {
      this.on("finally", (v, m) => {
        setTimeout(() => {
          this.destroy();
        }, this._settings.promise.destroyTimeout);
      });
    }
    executorFn = typeof executorFnOrSettings === "function" ? executorFnOrSettings : null;
    if (executorFn) {
      const api = {};
      __getMethods(this).forEach((func) => {
        if (func.slice(0, 1) === "_")
          return;
        api[func] = this[func].bind(this);
      });
      (async () => {
        await __wait(0);
        try {
          await executorFn(api);
        } catch (e) {
          if (this.promiseSettings.emitLogErrorEventOnThrow) {
            this.emit("log", {
              type: __SLog.TYPE_ERROR,
              value: e
            });
          }
          this.reject(e);
        }
      })();
    }
    if (this.promiseSettings.resolveAtResolveEvent) {
      this.on("resolve", (data, metas) => {
        this.resolve(data);
      });
    }
    if (this.promiseSettings.rejectAtRejectEvent) {
      this.on("reject", (data, metas) => {
        this.reject(data);
      });
    }
  }
  static queue(promises, before, after) {
    return new SPromise(async ({ resolve, reject }) => {
      const results = {};
      let i = 0;
      async function next() {
        const firstKey = Object.keys(promises)[0];
        let promise = promises[firstKey];
        if (typeof promise === "function")
          promise = promise();
        try {
          delete promises[firstKey];
          if (before)
            await before(firstKey, promise);
          let res = await promise;
          results[firstKey] = res;
          if (after) {
            let afterRes = await after(firstKey, result);
            if (afterRes !== void 0)
              result[firstKey] = afterRes;
          }
          if (Object.keys(promises).length) {
            next();
          } else {
            resolve(results);
          }
        } catch (e) {
          reject(promise);
        }
        i++;
      }
      next();
    });
  }
  static treatAsValue(promise, settings = {}) {
    return __treatAsValue(promise, settings);
  }
  get promiseSettings() {
    return this._settings.promise;
  }
  static get [Symbol.species]() {
    return Promise;
  }
  get [Symbol.toStringTag]() {
    return "SPromise";
  }
  get promiseState() {
    return this._promiseState;
  }
  treatAsValue(settings = {}) {
    return __treatAsValue(this, settings);
  }
  registerProxy(point, proxy) {
    const ar = point.split(",").map((l) => l.trim());
    ar.forEach((a) => {
      if (a === "resolve") {
        this._settings.promise.resolveProxies.push(proxy);
      } else if (a === "reject") {
        this._settings.promise.rejectProxies.push(proxy);
      }
    });
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
  resolve(arg, stacksOrder = "resolve,finally") {
    return this._resolve(arg, stacksOrder);
  }
  async _resolve(arg, stacksOrder = "resolve,finally") {
    if (this._promiseState === "destroyed")
      return;
    this._promiseState = "resolved";
    const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
    for (let i = 0; i < stacksOrderArray.length; i++) {
      const stack = stacksOrderArray[i];
      arg = await this.eventEmitter.emit(stack, arg);
    }
    for (const proxyFn of this._settings.promise.resolveProxies || []) {
      arg = await proxyFn(arg);
    }
    this._resolvers.resolve(arg);
    return arg;
  }
  reject(arg, stacksOrder = `catch,reject,finally`) {
    return this._reject(arg, stacksOrder);
  }
  async _reject(arg, stacksOrder = `catch,reject,finally`) {
    if (this._promiseState === "destroyed")
      return;
    this._promiseState = "rejected";
    const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
    for (let i = 0; i < stacksOrderArray.length; i++) {
      const stack = stacksOrderArray[i];
      arg = await this.eventEmitter.emit(stack, arg);
    }
    for (const proxyFn of this._settings.promise.rejectProxies || []) {
      arg = await proxyFn(arg);
    }
    this._resolvers.reject(arg);
    return arg;
  }
  cancel(arg, stacksOrder = "cancel,finally") {
    return this._cancel(arg, stacksOrder);
  }
  _cancel(arg, stacksOrder = "cancel,finally") {
    if (this._promiseState === "destroyed")
      return;
    return new Promise(async (resolve, reject) => {
      this._promiseState = "canceled";
      const stacksOrderArray = stacksOrder.split(",").map((l) => l.trim());
      for (let i = 0; i < stacksOrderArray.length; i++) {
        const stack = stacksOrderArray[i];
        arg = await this.eventEmitter.emit(stack, arg);
      }
      if (this._settings.promise.treatCancelAs === "reject") {
        this._resolvers.reject(arg);
      } else {
        this._resolvers.resolve(arg);
      }
      resolve(arg);
    });
  }
  catch(...args) {
    super.catch(...args);
    return this.on("catch", ...args);
  }
  finally(...args) {
    return this.on("finally", ...args);
  }
  destroy() {
    this._eventEmitter.destroy();
    this._promiseState = "destroyed";
  }
}
var SPromise_default = SPromise;
export {
  SPromise_default as default
};
