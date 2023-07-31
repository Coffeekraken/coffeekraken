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
import { __isNode, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepAssign, __deepMerge, __deepProxy, } from '@coffeekraken/sugar/object';
import __SStoreLsAdapter from '../js/adapters/SStoreLsAdapter.js';
import __SStoreFsAdapter from '../node/adapters/SStoreFsAdapter.js';
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
        let saveTimeout;
        const data = __deepProxy(object, (actionObj) => {
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
        this._enrichObj(data);
        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const restoredState = yield this.settings.adapter.load();
                    __deepAssign(data, restoredState);
                }))();
            }
            else {
                const restoredState = this.settings.adapter.load();
                __deepAssign(data, restoredState);
            }
        }
        this.data = data;
        const _this = this;
        return new Proxy(this.data, {
            get(target, prop, receiver) {
                if (!_this.data[prop]) {
                    return _this[prop];
                }
                return target[prop];
            },
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sRUFDSCxZQUFZLEVBQ1osV0FBVyxFQUNYLFdBQVcsR0FDZCxNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8saUJBQWlCLE1BQU0sbUNBQW1DLENBQUM7QUFDbEUsT0FBTyxpQkFBaUIsTUFBTSxxQ0FBcUMsQ0FBQztBQThFcEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQTZCeEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFNBQWMsRUFBRSxFQUFFLFFBQW1DO1FBQzdELEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxTQUFTLEVBQUUsSUFBSTtZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsZUFBZSxFQUFFLEVBQUU7U0FDdEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQW5DTixZQUFPLEdBQUcsSUFBSSxDQUFDO1FBcUNYLG1EQUFtRDtRQUNuRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDWCxrR0FBa0csQ0FDckcsQ0FBQztTQUNMO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJ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