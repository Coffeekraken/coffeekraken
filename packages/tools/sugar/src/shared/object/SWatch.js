import __deepProxy from "./deepProxy";
import __deepMerge from "../object/deepMerge";
import __SPromise from "@coffeekraken/s-promise";
class SWatch {
  constructor(object, settings = {}) {
    this._watchStack = {};
    this._settings = {};
    if (object.__$SWatch)
      return object;
    this._settings = __deepMerge({
      deep: true
    }, settings);
    this._promise = new __SPromise({
      id: "SWatch"
    });
    this._proxiedObject = __deepProxy(object, (obj) => {
      let path = obj.path;
      const value = obj.value;
      const oldValue = obj.oldValue;
      if (path.slice(0, 1) === ".")
        path = path.slice(1);
      const watchResult = {
        object: this._proxiedObject,
        path,
        action: obj.action,
        oldValue,
        value
      };
      if (watchResult.action === "get" && (path === "on" || path === "unwatch"))
        return;
      setTimeout(() => {
        this._promise.emit(`${path}:${watchResult.action}`, watchResult);
      });
    }, {
      deep: this._settings.deep
    });
    const onPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this._promise.on.bind(this._promise)
    };
    if (this._proxiedObject.on !== void 0) {
      Object.defineProperties(this._proxiedObject, {
        $on: onPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        on: onPropertyObj
      });
    }
    const unwatchPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this.unwatch.bind(this)
    };
    if (this._proxiedObject.unwatch !== void 0) {
      Object.defineProperties(this._proxiedObject, {
        $unwatch: unwatchPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        unwatch: unwatchPropertyObj
      });
    }
    Object.defineProperty(this._proxiedObject, "__$SWatch", {
      writable: false,
      configurable: false,
      enumerable: false,
      value: true
    });
    return this._proxiedObject;
  }
  unwatch() {
    this._promise.cancel();
    return this._proxiedObject.revoke();
  }
}
export {
  SWatch as default
};
