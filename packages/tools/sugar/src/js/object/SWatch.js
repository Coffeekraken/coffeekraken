// @ts-nocheck
// @shared
import __deepProxy from './deepProxy';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
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
export default class SWatch {
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
        this._settings = __deepMerge({
            deep: true
        }, settings);
        this._promise = new __SPromise({
            id: 'SWatch'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1dhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1dhdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBS1YsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBQ3RDLE9BQU8sV0FBVyxNQUFNLHFCQUFxQixDQUFDO0FBSTlDLE9BQU8sVUFBVSxNQUFNLHFCQUFxQixDQUFDO0FBRzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTTtJQXdCekI7Ozs7Ozs7T0FPRztJQUNILFlBQVksTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBL0JqQzs7Ozs7Ozs7V0FRRztRQUNILGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7UUFXYiwyREFBMkQ7UUFDM0QsSUFBSSxNQUFNLENBQUMsU0FBUztZQUFFLE9BQU8sTUFBTSxDQUFDO1FBRXBDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUMxQjtZQUNFLElBQUksRUFBRSxJQUFJO1NBQ1gsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUM7WUFDN0IsRUFBRSxFQUFFLFFBQVE7U0FDYixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FDL0IsTUFBTSxFQUNOLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDTixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFDeEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7Z0JBQUUsSUFB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