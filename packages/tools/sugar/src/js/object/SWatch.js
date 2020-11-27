// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./deepProxy", "../object/deepMerge", "../promise/SPromise"], factory);
    }
})(function (require, exports) {
    "use strict";
    var deepProxy_1 = __importDefault(require("./deepProxy"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    return /** @class */ (function () {
        /**
         * @name                      constructor
         * @type                      Function
         *
         * Constructor
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SWatch(object, settings) {
            var _this = this;
            if (settings === void 0) { settings = {}; }
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
            this._proxiedObject = deepProxy_1.default(object, function (obj) {
                var path = obj.path;
                var value = obj.value;
                var oldValue = obj.oldValue;
                if (path.slice(0, 1) === '.')
                    path = path.slice(1);
                // build the object to pass to the handler
                var watchResult = {
                    object: _this._proxiedObject,
                    path: path,
                    action: obj.action,
                    oldValue: oldValue,
                    value: value
                };
                if (watchResult.action === 'get' &&
                    (path === 'on' || path === 'unwatch'))
                    return;
                // trigger event through promise
                setTimeout(function () {
                    // this._promise.trigger(`${path}`, watchResult);
                    _this._promise.trigger(path + ":" + watchResult.action, watchResult);
                });
            }, {
                deep: this._settings.deep
            });
            var onPropertyObj = {
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
            var unwatchPropertyObj = {
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
        SWatch.prototype.unwatch = function () {
            // cancel the promise
            this._promise.cancel();
            // revoke proxy on the proxied object
            return this._proxiedObject.revoke();
        };
        return SWatch;
    }());
});
