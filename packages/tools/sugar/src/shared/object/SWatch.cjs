"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deepProxy_1 = __importDefault(require("./deepProxy"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
/**
 * @name 		            SWatch
 * @namespace            js.object
 * @type                Class
 * @status              wip
 *
 * This class allows you to easily monitor some object properties and get the new and old value of it
 *
 * @param       {Object}      object        The object to watch
 * @param       {Object}      [settings={}]       An object of settings to configure your watch process
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL3NoYXJlZC9vYmplY3QvU1dhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUtkLDREQUFzQztBQUN0QyxvRUFBOEM7QUFJOUMsd0VBQWlEO0FBR2pEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQXFCLE1BQU07SUF3QnpCOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQS9CakM7Ozs7Ozs7O1dBUUc7UUFDSCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQjs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBV2IsMkRBQTJEO1FBQzNELElBQUksTUFBTSxDQUFDLFNBQVM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUVwQyxJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO1lBQ0UsSUFBSSxFQUFFLElBQUk7U0FDWCxFQUNELFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLG1CQUFVLENBQUM7WUFDN0IsRUFBRSxFQUFFLFFBQVE7U0FDYixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFXLENBQy9CLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ04sSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNwQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUFFLElBQUksR0FB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