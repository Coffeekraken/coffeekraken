// @ts-nocheck
import __SPromise from '@coffeekraken/s-promise';
import __deepMerge from '../object/deepMerge';
import __deepProxy from './deepProxy';
/**
 * @name 		            SWatch
 * @namespace            shared.object
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
 * import { __SWatch } from '@coffeekraken/sugar/object';
 *
 * // create the watcher instance
 * const watchedObj = new  __SWatch({
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
         * @name            settings
         * @type            Object
         * @private
         *
         * Store the settings object to configure your watch instance
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.settings = {};
        // check if the passed object is already an SWatch instance
        if (object.__$SWatch)
            return object;
        this.settings = __deepMerge({
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
            deep: this.settings.deep,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFFdEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQXdCdkI7Ozs7Ozs7T0FPRztJQUNILFlBQVksTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBL0JqQzs7Ozs7Ozs7V0FRRztRQUNILGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7UUFXViwyREFBMkQ7UUFDM0QsSUFBSSxNQUFNLENBQUMsU0FBUztZQUFFLE9BQU8sTUFBTSxDQUFDO1FBRXBDLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUN2QjtZQUNJLElBQUksRUFBRSxJQUFJO1NBQ2IsRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDM0IsRUFBRSxFQUFFLFFBQVE7U0FDZixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FDN0IsTUFBTSxFQUNOLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDSixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQUUsSUFBSSxHQUFH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