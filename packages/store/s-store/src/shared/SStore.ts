import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import { __isNode, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepAssign, __deepMerge } from '@coffeekraken/sugar/object';
import __SStoreLsAdapter from '../js/adapters/SStoreLsAdapter.js';
import __SStoreFsAdapter from '../node/adapters/SStoreFsAdapter.js';

/**
 * @name                SStore
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent a state in your application. This state can be updated, saved, restored, etc...
 * You can subscribe to a state to be notified when data are updating inside, etc...
 *
 * @param           {ISStoreSettings}          [settings={}]           Some settings to configure your state instance
 *
 * @snippet          __SStore($1)
 * const state = new __SStore($1);
 * state.$set('*', ({
 *    object,
 *    target,
 *    key,
 *    path,
 *    action,
 *    fullAction,
 *    oldValue,
 *    value
 * }) => {
 *    $2
 * });
 *
 * @example         js
 * import __SStore from '@coffeekraken/s-store';
 * const myStore = new __SStore({
 *      myProp: 'hello',
 *      sub: {
 *          title: 'world'
 *      }
 * }, {
 *      id: 'myCoolStore',
 *      save: true
 * });
 * myStore.$set('*', (actionObj) => {
 *     // do something when your props are updating
 * });
 * myStore.$set('myProp', (actionObj) => {
 *     // do something when the prop "myProp" is updated
 * });
 * myStore.$set('sub.*', (actionObj) => {
 *     // do something when the sub.title prop is updated
 * });
 *
 * // updating the state as a normal object
 * myStore.sub.title = 'plop';
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStoreSetSettings {
    group: boolean;
    until: Promise<any>;
}
export interface ISStoreDeleteSettings {
    group: boolean;
    until: Promise<any>;
}

export interface ISStoreSettings {
    id: string;
    save: boolean;
    adapter: ISStoreAdapter;
    excludeFromSave: String[];
}

export interface ISStoreAdapter {
    async: boolean;
    save(state: any): Promise<void> | void;
    load(): Promise<any> | void;
}

export default class SStore extends __SClass {
    _data = {};

    isStore = true;

    settings: ISStoreSettings;

    /**
     * @name        _eventEmitter
     * @type        SEventEmitter
     * @private
     *
     * Store the event emitter instance
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _eventEmitter: __SEventEmitter;

    active = false;

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(object: any = {}, settings?: Partial<ISStoreSettings>) {
        super(
            __deepMerge(
                {
                    save: false,
                    excludeFromSave: [],
                },
                settings ?? {},
            ),
        );

        // make sure the state has an id if want to save it
        if (this.settings.save && !this.settings.id) {
            throw new Error(
                `You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`,
            );
        }

        // default adapter
        if (this.settings.save && !this.settings.adapter) {
            if (__isNode()) {
                this.settings.adapter = new __SStoreFsAdapter(this.settings.id);
            } else {
                // set the localstorage adapter on browser
                this.settings.adapter = new __SStoreLsAdapter(this.settings.id);
            }
        }

        // keep o reference to the class instance
        const _this = this;

        // prepare data object that will be proxied
        this._data = object ?? {};

        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (async () => {
                    const restoredState = await this.settings.adapter.load();
                    __deepAssign(this._data, restoredState);
                })();
            } else {
                const restoredState = this.settings.adapter.load();
                __deepAssign(this._data, restoredState);
            }
        }

        let saveTimeout,
            preventSaveTimeout,
            preventSave = false;
        function proxify(obj) {
            if (obj.length === undefined) {
                Object.defineProperty(obj, 'length', {
                    enumerable: false,
                    get() {
                        return Object.keys(obj).length;
                    },
                });
            }
            if (!obj.toJson) {
                Object.defineProperty(obj, 'toJson', {
                    value: () => {
                        return JSON.parse(JSON.stringify(obj));
                    },
                });
            }
            if (!obj.preventSave) {
                Object.defineProperty(obj, 'preventSave', {
                    value: () => {
                        preventSave = true;
                        clearTimeout(preventSaveTimeout);
                        preventSaveTimeout = setTimeout(() => {
                            preventSave = false;
                        });
                    },
                });
            }

            return new Proxy(obj, {
                get(target, prop) {
                    if (__isPlainObject(target[prop])) {
                        target[prop] = proxify(target[prop]);
                    }
                    return target[prop];
                },
                set(target, prop, value) {
                    if (prop === '$set' || prop === '$delete') {
                        target[prop] = value;
                        return true;
                    }

                    if (__isPlainObject(value)) {
                        value = proxify(value);
                    }

                    target[prop] = value;

                    if (_this.settings.save && !preventSave) {
                        clearTimeout(saveTimeout);
                        saveTimeout = setTimeout(() => {
                            // create a plain object copy
                            const stateToSave = target.toJson();
                            delete stateToSave.$set;
                            delete stateToSave.$delete;
                            delete stateToSave.toJson;
                            delete stateToSave.preventSave;
                            delete stateToSave.length;

                            // filter the excludes properties
                            _this.settings.excludeFromSave.forEach((prop) => {
                                delete stateToSave[prop];
                            });

                            _this.settings.adapter.save(stateToSave);
                        });
                    }

                    return true;
                },
            });
        }

        // create the proxy of the data
        const proxy = proxify(this._data);

        // add base method on proxy
        proxy.$set = this.$set.bind(this);
        proxy.$delete = this.$delete.bind(this);

        // instanciate the event emitter
        this._eventEmitter = new __SEventEmitter();

        // "mount" method support
        if (this.mount) {
            proxy.mount = this.mount.bind(this);
            setTimeout(() => {
                proxy.mount();
            });
        }

        // return the proxy instead of the class instance itself
        return proxy;
    }

    $set(
        props: string | string[],
        handler: Function,
        settings?: ISStoreSetSettings,
    ): void {
        const finalSettings: ISStoreSetSettings = {
            group: false,
            until: undefined,
            ...(settings ?? {}),
        };

        if (!Array.isArray(props)) {
            props = [props];
        }

        let finalHandler = handler,
            items = [],
            ended = false;
        if (finalSettings.group) {
            finalHandler = __debounce(0, (...args) => {
                if (ended) {
                    return;
                }
                handler(...args);
                items = [];
            });
        }

        const eventHandler = (updateObj, event) => {
            if (finalSettings.group) {
                items.push(updateObj);
                finalHandler(items);
            } else {
                setTimeout(() => {
                    if (ended) {
                        return;
                    }
                    finalHandler(updateObj, event);
                });
            }
        };

        props.forEach((prop) => {
            this._eventEmitter.on(`set.${prop}`, eventHandler);
            if (finalSettings.until) {
                finalSettings.until.finally(() => {
                    ended = true;
                    this._eventEmitter.off(`set.${prop}`, eventHandler);
                });
            }
        });
    }

    $delete(
        props: string | string[],
        handler: Function,
        settings?: ISStoreDeleteSettings,
    ): void {
        const finalSettings: ISStoreDeleteSettings = {
            group: false,
            until: undefined,
            ...(settings ?? {}),
        };

        if (!Array.isArray(props)) {
            props = [props];
        }

        let finalHandler = handler,
            items = [],
            ended = false;
        if (finalSettings.group) {
            finalHandler = __debounce(0, (...args) => {
                if (ended) {
                    return;
                }
                handler(...args);
                items = [];
            });
        }

        const eventHandler = (updateObj, event) => {
            if (finalSettings.group) {
                items.push(updateObj);
                finalHandler(items);
            } else {
                setTimeout(() => {
                    if (ended) {
                        return;
                    }
                    finalHandler(updateObj, event);
                });
            }
        };

        props.forEach((prop) => {
            this._eventEmitter.on(`delete.${prop}`, eventHandler);
            if (finalSettings.until) {
                finalSettings.until.finally(() => {
                    ended = true;
                    this._eventEmitter.off(`set.${prop}`, eventHandler);
                });
            }
        });
    }
}
