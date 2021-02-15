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
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepProxy_1 = __importDefault(require("./deepProxy"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    /**
     * @name 		            SWatch
     * @namespace           sugar.js.object
     * @type                Class
     * @status              wip
     *
     * This class allows you to easily monitor some object properties and get the new and old value of it
     *
     * @param       {Object}      object        The object to watch
     * @param       {Object}      [settings={}]       An object of settings to configure your watch process
     * - deep (true) {Boolean}: Specify if you want to watch the object deeply or just the first level
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example 	js
     * // create the watcher instance
     * const watchedObj = new SWatch({
     * 		title : 'Hello World'
     * });
     *
     * // watch the object
     * watchedObj.on('title:set', watchResult => {
     *  	// do something when the title changes
     * });
     *
     * // update the title
     * watchedObj.title = 'Hello Universe';
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SWatch = /** @class */ (function () {
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
                // emit event through promise
                setTimeout(function () {
                    // this._promise.emit(`${path}`, watchResult);
                    _this._promise.emit(path + ":" + watchResult.action, watchResult);
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
    exports.default = SWatch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1dhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFLViwwREFBc0M7SUFDdEMsa0VBQThDO0lBSTlDLGlFQUE2QztJQUc3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQ0c7SUFDSDtRQXdCRTs7Ozs7OztXQU9HO1FBQ0gsZ0JBQVksTUFBTSxFQUFFLFFBQWE7WUFBakMsaUJBeUZDO1lBekZtQix5QkFBQSxFQUFBLGFBQWE7WUEvQmpDOzs7Ozs7OztlQVFHO1lBQ0gsZ0JBQVcsR0FBRyxFQUFFLENBQUM7WUFFakI7Ozs7Ozs7OztlQVNHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQVdiLDJEQUEyRDtZQUMzRCxJQUFJLE1BQU0sQ0FBQyxTQUFTO2dCQUFFLE9BQU8sTUFBTSxDQUFDO1lBRXBDLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsSUFBSSxFQUFFLElBQUk7YUFDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1lBRUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGtCQUFVLENBQUM7Z0JBQzdCLEVBQUUsRUFBRSxRQUFRO2FBQ2IsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxtQkFBVyxDQUMvQixNQUFNLEVBQ04sVUFBQyxHQUFHO2dCQUNGLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLElBQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQzlCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztvQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztn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