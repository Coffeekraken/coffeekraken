import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import { __isNode } from '@coffeekraken/sugar/is';
import {
    __deepAssign,
    __deepMerge,
    __deepProxy,
} from '@coffeekraken/sugar/object';
import __SStateLsAdapter from '../js/adapters/SStateLsAdapter';
import __SStateFsAdapter from '../node/adapters/SStateFsAdapter';

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
 * @example         js
 * import SState from '@coffeekraken/s-state';
 * const myState = new SState({
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
}

export interface ISStateAdapter {
    save(id: string, state: any): Promise<void>;
    load(id: string): Promise<any>;
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
        super(__deepMerge({}, settings ?? {}));

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
        const proxy = __deepProxy(object, (actionObj) => {
            switch (actionObj.action) {
                case 'set':
                    this._eventEmitter.emit(`set.${actionObj.path}`, actionObj);
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
                    this.settings.adapter.save(
                        JSON.parse(JSON.stringify(proxy)),
                    );
                });
            }
        });

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
        (async () => {
            if (this.settings.save) {
                const restoredState = await this.settings.adapter.load();
                __deepAssign(proxy, restoredState);
            }
        })();

        return proxy;
    }
}
