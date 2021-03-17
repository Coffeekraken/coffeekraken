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
        define(["require", "exports", "./deepProxy", "../object/deepMerge", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepProxy_1 = __importDefault(require("./deepProxy"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
            this._promise = new s_promise_1.default({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL29iamVjdC9TV2F0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUtWLDBEQUFzQztJQUN0QyxrRUFBOEM7SUFJOUMsc0VBQWlEO0lBR2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNIO1FBd0JFOzs7Ozs7O1dBT0c7UUFDSCxnQkFBWSxNQUFNLEVBQUUsUUFBYTtZQUFqQyxpQkF5RkM7WUF6Rm1CLHlCQUFBLEVBQUEsYUFBYTtZQS9CakM7Ozs7Ozs7O2VBUUc7WUFDSCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztZQUVqQjs7Ozs7Ozs7O2VBU0c7WUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1lBV2IsMkRBQTJEO1lBQzNELElBQUksTUFBTSxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxNQUFNLENBQUM7WUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxJQUFJLEVBQUUsSUFBSTthQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVUsQ0FBQztnQkFDN0IsRUFBRSxFQUFFLFFBQVE7YUFDYixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFXLENBQy9CLE1BQU0sRUFDTixVQUFDLEdBQUc7Z0JBQ0YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDcEIsSUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztnQkFDeEIsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO29CQUFFLElBQUksR0FBRyxJQUFJLENBQUMs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