import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import { __debounce } from '@coffeekraken/sugar/function';
import { __isNode } from '@coffeekraken/sugar/is';
import {
    __deepAssign,
    __deepMerge,
    __deepProxy,
} from '@coffeekraken/sugar/object';
import __SStoreLsAdapter from '../js/adapters/SStoreLsAdapter.js';
import __SStoreFsAdapter from '../node/adapters/SStoreFsAdapter.js';

import { __isPlainObject } from '@coffeekraken/sugar/is';

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
    watchDeep: boolean;
    excludeFromSave: String[];
}

export interface ISStoreAdapter {
    async: boolean;
    save(state: any): Promise<void> | void;
    load(): Promise<any> | void;
}

export default class SStore extends __SClass {
    /**
     * @name        data
     * @type        Proxy
     * @private
     *
     * Store the Proxied data object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    data: any;

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
                    watchDeep: true,
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

        Object.assign(this, object);

        // let saveTimeout;
        const proxy = __deepProxy(
            this,
            (actionObj) => {
                switch (actionObj.action) {
                    case 'set':
                        if (__isPlainObject(actionObj.value)) {
                            this._enrichObj(actionObj.value);
                        }
                        this._eventEmitter.emit(
                            `set.${actionObj.path}`,
                            actionObj,
                        );
                        break;
                    case 'delete':
                        this._eventEmitter.emit(
                            `delete.${actionObj.path}`,
                            actionObj,
                        );
                        break;
                }
                // save if needed
                if (this.settings.save) {
                    clearTimeout(saveTimeout);
                    saveTimeout = setTimeout(() => {
                        // create a plain object copy
                        const stateToSave = data.toJson();

                        // filter the excludes properties
                        this.settings.excludeFromSave.forEach((prop) => {
                            delete stateToSave[prop];
                        });

                        this.settings.adapter.save(stateToSave);
                    });
                }
            },
            {
                deep: this.settings.watchDeep,
            },
        );

        // instanciate the event emitter
        this._eventEmitter = new __SEventEmitter();

        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (async () => {
                    const restoredState = await this.settings.adapter.load();
                    __deepAssign(this, restoredState);
                })();
            } else {
                const restoredState = this.settings.adapter.load();
                __deepAssign(this, restoredState);
            }
        }

        // for (let [prop, value] of Object.entries(this)) {
        //     console.log('PROP', prop);
        //     if (proxy[prop] === undefined) {
        //         if (typeof this[prop] === 'function') {
        //             proxy[prop] = this[prop].bind(this);
        //         } else {
        //             proxy[prop] = this[prop];
        //         }
        //     }
        // }

        if (this.mount) {
            proxy.mount = this.mount.bind(this);
            setTimeout(() => {
                proxy.mount();
            });
        }

        return proxy;
    }

    _enrichObj(obj: any): void {
        if (obj.length === undefined) {
            Object.defineProperty(obj, 'length', {
                enumerable: false,
                get() {
                    return Object.keys(obj).length;
                },
            });
        }
        if (obj.toJson === undefined) {
            Object.defineProperty(obj, 'toJson', {
                enumerable: false,
                get() {
                    return () => JSON.parse(JSON.stringify(obj));
                },
            });
        }
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
