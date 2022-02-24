// @ts-nocheck
import __deepProxy from './deepProxy';
import __deepMerge from '../object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
/**
 * @name 		            SWatch
 * @namespace            js.object
 * @type                Class
 * @platform          js
 * @platform          node
 * @status        wip
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SWatch {
    /**
     * @name                      constructor
     * @type                      Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(object, settings = {}) {
        /**
         * @name                    _watchStack
         * @type                    Object
         * @private
         *
         * Watch stack
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._settings = {};
        // check if the passed object is already an SWatch instance
        if (object.__$SWatch)
            return object;
        this._settings = __deepMerge({
            deep: true,
        }, settings);
        this._promise = new __SPromise({
            id: 'SWatch',
        });
        this._proxiedObject = __deepProxy(object, (obj) => {
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
                value,
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
            deep: this._settings.deep,
        });
        const onPropertyObj = {
            writable: true,
            configurable: false,
            enumerable: false,
            value: this._promise.on.bind(this._promise),
        };
        if (this._proxiedObject.on !== undefined) {
            Object.defineProperties(this._proxiedObject, {
                $on: onPropertyObj,
            });
        }
        else {
            Object.defineProperties(this._proxiedObject, {
                on: onPropertyObj,
            });
        }
        const unwatchPropertyObj = {
            writable: true,
            configurable: false,
            enumerable: false,
            value: this.unwatch.bind(this),
        };
        if (this._proxiedObject.unwatch !== undefined) {
            Object.defineProperties(this._proxiedObject, {
                $unwatch: unwatchPropertyObj,
            });
        }
        else {
            Object.defineProperties(this._proxiedObject, {
                unwatch: unwatchPropertyObj,
            });
        }
        // set a property that is usefull to check if the object
        // is a SWatch watched one...
        Object.defineProperty(this._proxiedObject, '__$SWatch', {
            writable: false,
            configurable: false,
            enumerable: false,
            value: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1dhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFLZCxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFJOUMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFHakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU07SUF3QnZCOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE1BQU0sRUFBRSxRQUFRLEdBQUcsRUFBRTtRQS9CakM7Ozs7Ozs7O1dBUUc7UUFDSCxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVqQjs7Ozs7Ozs7O1dBU0c7UUFDSCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBV1gsMkRBQTJEO1FBQzNELElBQUksTUFBTSxDQUFDLFNBQVM7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUVwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FDeEI7WUFDSSxJQUFJLEVBQUUsSUFBSTtTQUNiLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFDO1lBQzNCLEVBQUUsRUFBRSxRQUFRO1NBQ2YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQzdCLE1BQU0sRUFDTixDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ0osSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNwQixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3hCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO2dCQUFFLElBQUksR0FBRyxJ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