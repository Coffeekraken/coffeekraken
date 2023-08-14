var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import { __debounce } from '@coffeekraken/sugar/function';
import { __isNode } from '@coffeekraken/sugar/is';
import { __deepAssign, __deepMerge, __deepProxy, } from '@coffeekraken/sugar/object';
import __SStoreLsAdapter from '../js/adapters/SStoreLsAdapter.js';
import __SStoreFsAdapter from '../node/adapters/SStoreFsAdapter.js';
import { __isPlainObject } from '@coffeekraken/sugar/is';
export default class SStore extends __SClass {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(object = {}, settings) {
        super(__deepMerge({
            watchDeep: true,
            save: false,
            excludeFromSave: [],
        }, settings !== null && settings !== void 0 ? settings : {}));
        this.isStore = true;
        // make sure the state has an id if want to save it
        if (this.settings.save && !this.settings.id) {
            throw new Error(`You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`);
        }
        // default adapter
        if (this.settings.save && !this.settings.adapter) {
            if (__isNode()) {
                this.settings.adapter = new __SStoreFsAdapter(this.settings.id);
            }
            else {
                // set the localstorage adapter on browser
                this.settings.adapter = new __SStoreLsAdapter(this.settings.id);
            }
        }
        Object.assign(this, object);
        // let saveTimeout;
        const proxy = __deepProxy(this, (actionObj) => {
            switch (actionObj.action) {
                case 'set':
                    if (__isPlainObject(actionObj.value)) {
                        this._enrichObj(actionObj.value);
                    }
                    this._eventEmitter.emit(`set.${actionObj.path}`, actionObj);
                    break;
                case 'delete':
                    this._eventEmitter.emit(`delete.${actionObj.path}`, actionObj);
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
        }, {
            deep: this.settings.watchDeep,
        });
        // instanciate the event emitter
        this._eventEmitter = new __SEventEmitter();
        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const restoredState = yield this.settings.adapter.load();
                    __deepAssign(this, restoredState);
                }))();
            }
            else {
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
    _enrichObj(obj) {
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
    $set(props, handler, settings) {
        const finalSettings = Object.assign({ group: false, until: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if (!Array.isArray(props)) {
            props = [props];
        }
        let finalHandler = handler, items = [], ended = false;
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
            }
            else {
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
    $delete(props, handler, settings) {
        const finalSettings = Object.assign({ group: false, until: undefined }, (settings !== null && settings !== void 0 ? settings : {}));
        if (!Array.isArray(props)) {
            props = [props];
        }
        let finalHandler = handler, items = [], ended = false;
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
            }
            else {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsT0FBTyxFQUNILFlBQVksRUFDWixXQUFXLEVBQ1gsV0FBVyxHQUNkLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxpQkFBaUIsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLGlCQUFpQixNQUFNLHFDQUFxQyxDQUFDO0FBRXBFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQThFekQsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQTZCeEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFNBQWMsRUFBRSxFQUFFLFFBQW1DO1FBQzdELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsZUFBZSxFQUFFLEVBQUU7U0FDdEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQW5DTixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBcUNYLG1EQUFtRDtRQUNuRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDWCxrR0FBa0csQ0FDckcsQ0FBQztTQUNMO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENB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