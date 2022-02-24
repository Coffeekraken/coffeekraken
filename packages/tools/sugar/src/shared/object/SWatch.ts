// @ts-nocheck

import __constructorName from './constructorName';
import __get from './get';
import __set from './set';
import __deepProxy from './deepProxy';
import __deepMerge from '../object/deepMerge';
import __parseString from '../string/parse';
import __uniqid from '../string/uniqid';
import __micromatch from 'micromatch';
import __SPromise from '@coffeekraken/s-promise';
import __clone from '../object/clone';

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
     * @name                    _watchStack
     * @type                    Object
     * @private
     *
     * Watch stack
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _watchStack = {};

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
    _settings = {};

    /**
     * @name                      constructor
     * @type                      Function
     *
     * Constructor
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(object, settings = {}) {
        // check if the passed object is already an SWatch instance
        if (object.__$SWatch) return object;

        this._settings = __deepMerge(
            {
                deep: true,
            },
            settings,
        );

        this._promise = new __SPromise({
            id: 'SWatch',
        });

        this._proxiedObject = __deepProxy(
            object,
            (obj) => {
                let path = obj.path;
                const value = obj.value;
                const oldValue = obj.oldValue;
                if (path.slice(0, 1) === '.') path = path.slice(1);
                // build the object to pass to the handler
                const watchResult = {
                    object: this._proxiedObject,
                    path,
                    action: obj.action,
                    oldValue,
                    value,
                };

                if (
                    watchResult.action === 'get' &&
                    (path === 'on' || path === 'unwatch')
                )
                    return;

                // emit event through promise
                setTimeout(() => {
                    // this._promise.emit(`${path}`, watchResult);
                    this._promise.emit(
                        `${path}:${watchResult.action}`,
                        watchResult,
                    );
                });
            },
            {
                deep: this._settings.deep,
            },
        );

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
        } else {
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
        } else {
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
