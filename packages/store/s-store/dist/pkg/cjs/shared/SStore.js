"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const SStoreLsAdapter_js_1 = __importDefault(require("../js/adapters/SStoreLsAdapter.js"));
const SStoreFsAdapter_js_1 = __importDefault(require("../node/adapters/SStoreFsAdapter.js"));
class SStore extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
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
            if ((0, is_1.__isNode)()) {
                this.settings.adapter = new SStoreFsAdapter_js_1.default(this.settings.id);
            }
            else {
                // set the localstorage adapter on browser
                this.settings.adapter = new SStoreLsAdapter_js_1.default(this.settings.id);
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
                    (0, object_1.__deepAssign)(this._data, restoredState);
                }))();
            }
            else {
                const restoredState = this.settings.adapter.load();
                (0, object_1.__deepAssign)(this._data, restoredState);
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
                    if ((0, is_1.__isPlainObject)(target[prop])) {
                        target[prop] = proxify(target[prop]);
                    }
                    return target[prop];
                },
                set(target, prop, value) {
                    if (prop === '$set' || prop === '$delete') {
                        target[prop] = value;
                        return true;
                    }
                    if ((0, is_1.__isPlainObject)(value)) {
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
        this._eventEmitter = new s_event_emitter_1.default();
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
exports.default = SStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9GQUE0RDtBQUM1RCwrQ0FBbUU7QUFDbkUsdURBQXVFO0FBQ3ZFLDJGQUFrRTtBQUNsRSw2RkFBb0U7QUFnRnBFLE1BQXFCLE1BQU8sU0FBUSxpQkFBUTtJQXFCeEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLFNBQWMsRUFBRSxFQUFFLFFBQW1DO1FBQzdELEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxJQUFJLEVBQUUsS0FBSztZQUNYLGVBQWUsRUFBRSxFQUFFO1NBQ3RCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF0Q04sVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFnQmYsV0FBTSxHQUFHLEtBQUssQ0FBQztRQXNCWCxtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtHLENBQ3JHLENBQUM7U0FDTDtRQUVELGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxJQUFBLGFBQVEsR0FBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCwwQ0FBMEM7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWlCLENBQUMs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