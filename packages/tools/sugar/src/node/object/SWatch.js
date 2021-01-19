"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const deepProxy_1 = __importDefault(require("./deepProxy"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
module.exports = class SWatch {
    /**
     * @name                      constructor
     * @type                      Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(object, settings = {}) {
        /**
         * @name                    _watchStack
         * @type                    Object
         * @private
         *
         * Watch stack
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._watchStack = {};
        /**
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store the settings object to configure your watch instance
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {};
        // check if the passed object is already an SWatch instance
        if (object.__$SWatch)
            return object;
        this._settings = deepMerge_1.default({
            deep: true
        }, settings);
        this._promise = new SPromise_1.default({
            id: 'SWatch'
        });
        this._proxiedObject = deepProxy_1.default(object, (obj) => {
            let path = obj.path;
            const value = obj.value;
            const oldValue = obj.oldValue;
            if (path.slice(0, 1) === '.')
                path = path.slice(1);
            // build the object to pass to the handler
            const watchResult = {
                object: this._proxiedObject,
                path,
                action: obj.action,
                oldValue,
                value
            };
            if (watchResult.action === 'get' &&
                (path === 'on' || path === 'unwatch'))
                return;
            // emit event through promise
            setTimeout(() => {
                // this._promise.emit(`${path}`, watchResult);
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
        if (this._proxiedObject.on !== undefined) {
            Object.defineProperties(this._proxiedObject, {
                $on: onPropertyObj
            });
        }
        else {
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
        if (this._proxiedObject.unwatch !== undefined) {
            Object.defineProperties(this._proxiedObject, {
                $unwatch: unwatchPropertyObj
            });
        }
        else {
            Object.defineProperties(this._proxiedObject, {
                unwatch: unwatchPropertyObj
            });
        }
        // set a property that is usefull to check if the object
        // is a SWatch watched one...
        Object.defineProperty(this._proxiedObject, '__$SWatch', {
            writable: false,
            configurable: false,
            enumerable: false,
            value: true
        });
        return this._proxiedObject;
    }
    unwatch() {
        // cancel the promise
        this._promise.cancel();
        // revoke proxy on the proxied object
        return this._proxiedObject.revoke();
    }
};
//# sourceMappingURL=SWatch.js.map