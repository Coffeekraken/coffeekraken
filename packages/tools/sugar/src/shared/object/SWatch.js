// @ts-nocheck
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
    const deepProxy_1 = __importDefault(require("./deepProxy"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
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
    class SWatch {
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
            this._promise = new s_promise_1.default({
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
    }
    exports.default = SWatch;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1dhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUtkLDREQUFzQztJQUN0QyxvRUFBOEM7SUFJOUMsd0VBQWlEO0lBR2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWdDRztJQUNILE1BQXFCLE1BQU07UUF3QnpCOzs7Ozs7O1dBT0c7UUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtZQS9CakM7Ozs7Ozs7O2VBUUc7WUFDSCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztZQUVqQjs7Ozs7Ozs7O2VBU0c7WUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1lBV2IsMkRBQTJEO1lBQzNELElBQUksTUFBTSxDQUFDLFNBQVM7Z0JBQUUsT0FBTyxNQUFNLENBQUM7WUFFcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxJQUFJLEVBQUUsSUFBSTthQUNYLEVBQ0QsUUFBUSxDQUNULENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksbUJBQVUsQ0FBQztnQkFDN0IsRUFBRSxFQUFFLFFBQVE7YUFDYixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFXLENBQy9CLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNOLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7Z0JBQzlCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRztvQkFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsMENBQTBDO2dC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