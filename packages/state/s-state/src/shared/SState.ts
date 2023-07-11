import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import { __isNode } from '@coffeekraken/sugar/is';
import {
    __deepAssign,
    __deepMerge,
    __deepProxy,
} from '@coffeekraken/sugar/object';
import __SStateLsAdapter from '../js/adapters/SStateLsAdapter.js';
import __SStateFsAdapter from '../node/adapters/SStateFsAdapter.js';

/**
 * @name                SState
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent a state in your application. This state can be updated, saved, restored, etc...
 * You can subscribe to a state to be notified when data are updating inside, etc...
 *
 * @param           {ISStateSettings}          [settings={}]           Some settings to configure your state instance
 *
 * @snippet          __SState($1)
 * const state = new __SState($1);
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
 * import __SState from '@coffeekraken/s-state';
 * const myState = new __SState({
 *      myProp: 'hello',
 *      sub: {
 *          title: 'world'
 *      }
 * });
 * myState.$set('*', (actionObj) => {
 *     // do something when your props are updating
 * });
 * myState.$set('myProp', (actionObj) => {
 *     // do something when the prop "myProp" is updated
 * });
 * myState.$set('sub.*', (actionObj) => {
 *     // do something when the sub.title prop is updated
 * });
 *
 * // updating the state as a normal object
 * myState.sub.title = 'plop';
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStateSettings {
    id: string;
    save: boolean;
    adapter: ISStateAdapter;
    watchDeep: boolean;
    excludeFromSave: String[];
}

export interface ISStateAdapter {
    save(id: string, state: any): Promise<void> | void;
    load(id: string): Promise<any> | void;
}

export default class SState extends __SClass {
    /**
     * @name        _proxy
     * @type        Proxy
     * @private
     *
     * Store the Proxy state object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _proxy: any;

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
    constructor(object: any, settings?: Partial<ISStateSettings>) {
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
                this.settings.adapter = new __SStateFsAdapter(this.settings.id);
            } else {
                // set the localstorage adapter on browser
                this.settings.adapter = new __SStateLsAdapter(this.settings.id);
            }
        }

        let saveTimeout;
        const proxy = __deepProxy(
            object,
            (actionObj) => {
                switch (actionObj.action) {
                    case 'set':
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
                        const stateToSave = JSON.parse(JSON.stringify(proxy));

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

        // expose some methods on the proxy object itself
        const _this = this;
        Object.defineProperty(proxy, '$set', {
            enumerable: false,
            get() {
                return (event: string, handler: Function): any => {
                    return _this._eventEmitter.on(`set.${event}`, handler);
                };
            },
        });
        Object.defineProperty(proxy, '$delete', {
            enumerable: false,
            get() {
                return (event: string, handler: Function): any => {
                    return _this._eventEmitter.on(`delete.${event}`, handler);
                };
            },
        });
        Object.defineProperty(proxy, 'isSState', {
            enumerable: false,
            get() {
                return true;
            },
        });

        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (async () => {
                    const restoredState = await this.settings.adapter.load();
                    __deepAssign(proxy, restoredState);
                })();
            } else {
                const restoredState = this.settings.adapter.load();
                __deepAssign(proxy, restoredState);
            }
        }

        this._proxy = proxy;

        return proxy;
    }
}
