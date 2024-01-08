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
import { __isNode, __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepAssign, __deepMerge } from '@coffeekraken/sugar/object';
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
            save: false,
            excludeFromSave: [],
        }, settings !== null && settings !== void 0 ? settings : {}));
        this._data = {};
        this.isStore = true;
        this.active = false;
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
        // keep o reference to the class instance
        const _this = this;
        // prepare data object that will be proxied
        this._data = object !== null && object !== void 0 ? object : {};
        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const restoredState = yield this.settings.adapter.load();
                    __deepAssign(this._data, restoredState);
                }))();
            }
            else {
                const restoredState = this.settings.adapter.load();
                __deepAssign(this._data, restoredState);
            }
        }
        let saveTimeout, preventSaveTimeout, preventSave = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RSxPQUFPLGlCQUFpQixNQUFNLG1DQUFtQyxDQUFDO0FBQ2xFLE9BQU8saUJBQWlCLE1BQU0scUNBQXFDLENBQUM7QUFnRnBFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFFBQVE7SUFxQnhDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxTQUFjLEVBQUUsRUFBRSxRQUFtQztRQUM3RCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksSUFBSSxFQUFFLEtBQUs7WUFDWCxlQUFlLEVBQUUsRUFBRTtTQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBdENOLFVBQUssR0FBRyxFQUFFLENBQUM7UUFFWCxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBZ0JmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFzQlgsbURBQW1EO1FBQ25ELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUNYLGtHQUFrRyxDQUNyRyxDQUFDO1NBQ0w7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksUUFBUSxFQUFFLEVBQUU7Z0JBQ1os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