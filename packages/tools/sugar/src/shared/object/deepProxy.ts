// @ts-nocheck

import __proxyArray from '../array/proxyArray';
import __isDomElement from '../is/isDomElement';
import __clone from '../object/clone';
import __deepMap from '../object/deepMap';
import __deepMerge from '../object/deepMerge';

/**
 * @name                            deepProxy
 * @namespace            shared.object
 * @type                            Function
 * @platform          js
 * @platform          node
 * @status        wip
 * @private
 *
 * This function allows you to add Proxy to an object in deep fashion.
 * Normally the Proxy process only the level on which it has been added. Here we add Proxy to all the
 * object levels and to new properties as well.
 *
 * On the returned proxied object, you will have access to the ```revoke``` method that you can call to revoke the proxy applied.
 * This method will return you a shallow version of the proxied object that you can use as you want
 *
 * @param          {Object}                 object            The object on which to add the proxy
 * @param           {Function}                handlerFn       The handler function that will be called with the update object. It can be a property deleted, an array item added, a property updated, etc...:
 * - set: An object property added or updated
 * - delete: An object property deleted
 * - push: An item has been added inside an array
 * - {methodName}: Every array actions
 * @param         {Object}                [settings={}]         An object of settings to configure your proxy:
 * @return          {Object}                                  The proxied object
 *
 * @setting         {Boolean}         [deep=true]           Specify if you want to watch the passed object deeply or juste the first level
 * @setting        {Boolean}           [handleSet=true]        Specify if you want to handle the "set" action
 * @setting         {Boolean}           [handleGet=false]           Specify if you want to handle the "get" action
 * @setting         {Boolean}           [handleDelete=true]         Specify if you want to handle the "delete" action
 * @setting         {Boolean}            [domElements=false]        Specify if you want to proxy dom elements
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import { __deepProxy } from '@coffeekraken/sugar/object';
 * const a = __deepProxy({
 *    hello: 'world'
 * }, (actionObj) => {
 *    // do something with the actionObj...
 * });
 * a.hello = 'coco';
 *
 * @since       2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

const _loopTimeout = new WeakMap();

export interface IDeepProxyActionObj {
    object: any;
    target: string;
    key: string;
    path: string;
    action: 'set' | 'get' | 'delete';
    fullAction: string;
    oldValue: any;
    value: any;
}

export interface IDeepProxySettings {
    deep: boolean;
    handleSet: boolean;
    handleGet: boolean;
    handleDelete: boolean;
    domElements: boolean;
}

export default function __deepProxy(
    object,
    handlerFn,
    settings: Partial<IDeepProxySettings> = {},
) {
    let isRevoked = false;
    settings = __deepMerge(
        {
            deep: true,
            handleSet: true,
            handleGet: false,
            handleDelete: true,
            domElements: false,
        },
        settings,
    );

    function makeHandler(path) {
        return {
            set(target, key, value) {
                // protect agains set loop
                // if (!_loopTimeout.has(target)) {
                //     _loopTimeout.set(target, {});
                // }

                // const dotpath = [...path, key].join('.');
                // const timeouts = _loopTimeout.get(target);
                // if (timeouts[dotpath]) {
                //     _console.log('Timeout', dotpath);
                //     return true;
                // }
                // timeouts[dotpath] = true;
                // setTimeout(() => {
                //     delete timeouts[dotpath];
                // });

                // stop here if revoked of does not handle set
                if (isRevoked || !settings.handleSet) return true;

                // stop here if the value are the same already
                if (value === target[key]) return true;

                // handle deep proxy
                if (settings.deep && typeof value === 'object') {
                    value = proxify(value, [...path, key]);
                }

                // keep track of the old value
                const oldValue = target[key];

                // set the new value
                target[key] = value;

                // call the handler function with all the
                // usefull parameters
                handlerFn(<IDeepProxyActionObj>{
                    object,
                    target,
                    key,
                    path: [...path, key].join('.'),
                    action: 'set',
                    fullAction: `Object.set`,
                    oldValue,
                    value,
                });

                // write update
                return true;
            },

            get(target, key, receiver) {
                if (Reflect.has(target, key)) {
                    if (!settings.handleGet) return target[key];

                    const value = handlerFn(<IDeepProxyActionObj>{
                        object,
                        target,
                        key,
                        path: [...path, key].join('.'),
                        action: 'get',
                        fullAction: 'Object.get',
                    });
                    if (key === 'revoke') return receiver.revoke;
                    if (value === undefined) return target[key];
                    return value;
                }
                return undefined;
            },

            deleteProperty(target, key) {
                if (isRevoked || !settings.handleDelete) return true;

                if (Reflect.has(target, key)) {
                    // unproxy(target, key);
                    const oldValue = target[key];
                    const deleted = Reflect.deleteProperty(target, key);
                    if (deleted) {
                        handlerFn(<IDeepProxyActionObj>{
                            object,
                            target,
                            key,
                            path: [...path, key].join('.'),
                            action: 'delete',
                            fullAction: 'Object.delete',
                            oldValue,
                        });
                    }
                    return deleted;
                }
                return false;
            },
        };
    }

    function proxify(obj, path) {
        if (obj === null) return obj;
        if (!settings.domElements && __isDomElement(obj)) {
            return obj;
        }

        if (settings.deep) {
            for (const key of Object.keys(obj)) {
                if (Array.isArray(obj[key])) {
                    obj[key] = __proxyArray(obj[key]);
                    obj[key].watch(
                        Object.getOwnPropertyNames(Array.prototype),
                        (watchObj) => {
                            handlerFn({
                                path: [...path, key].join('.'),
                                ...watchObj,
                            });
                        },
                    );
                } else if (typeof obj[key] === 'object') {
                    obj[key] = proxify(obj[key], [...path, key]);
                }
            }
        }

        const p = Proxy.revocable(obj, makeHandler(path));

        // preproxy.set(p, obj);
        const revokePropertyObj = {
            writable: true,
            configurable: false,
            enumerable: false,
            value: () => {
                // make a shallow copy of the proxy object
                let __copy = __clone(p.proxy, { deep: true });
                // mark the proxy as revoked
                isRevoked = true;
                // sanitize the copy
                __copy = __deepMap(__copy, ({ value, prop }) => {
                    if (prop === 'revoke' && typeof value === 'function') {
                        return -1;
                    }
                    return value;
                });
                // deep revoke the proxies
                setTimeout(() => {
                    __deepMap(
                        p.proxy,
                        ({ value, prop }) => {
                            if (
                                prop === 'revoke' &&
                                typeof value === 'function'
                            ) {
                                value();
                            }
                        },
                        {},
                    );
                    // revoke the proxy at first level
                    p.revoke();
                });
                // return the shallow copy
                return __copy;
            },
        };
        if (Array.isArray(p.proxy)) {
            p.proxy.revoke = revokePropertyObj.value;
        } else {
            Object.defineProperties(p.proxy, {
                revoke: revokePropertyObj,
            });
        }
        return p.proxy;
    }

    return proxify(object, []);
}
