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
const function_1 = require("@coffeekraken/sugar/function");
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
            if ((0, is_1.__isNode)()) {
                this.settings.adapter = new SStoreFsAdapter_js_1.default(this.settings.id);
            }
            else {
                // set the localstorage adapter on browser
                this.settings.adapter = new SStoreLsAdapter_js_1.default(this.settings.id);
            }
        }
        let saveTimeout;
        const data = (0, object_1.__deepProxy)(object, (actionObj) => {
            switch (actionObj.action) {
                case 'set':
                    if ((0, is_1.__isPlainObject)(actionObj.value)) {
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
        this._eventEmitter = new s_event_emitter_1.default();
        this._enrichObj(data);
        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const restoredState = yield this.settings.adapter.load();
                    (0, object_1.__deepAssign)(data, restoredState);
                }))();
            }
            else {
                const restoredState = this.settings.adapter.load();
                (0, object_1.__deepAssign)(data, restoredState);
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
            finalHandler = (0, function_1.__debounce)(0, (...args) => {
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
            finalHandler = (0, function_1.__debounce)(0, (...args) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9GQUE0RDtBQUM1RCwyREFBMEQ7QUFDMUQsK0NBQW1FO0FBQ25FLHVEQUlvQztBQUNwQywyRkFBa0U7QUFDbEUsNkZBQW9FO0FBOEVwRSxNQUFxQixNQUFPLFNBQVEsaUJBQVE7SUE2QnhDOzs7Ozs7OztPQVFHO0lBQ0gsWUFBWSxTQUFjLEVBQUUsRUFBRSxRQUFtQztRQUM3RCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksU0FBUyxFQUFFLElBQUk7WUFDZixJQUFJLEVBQUUsS0FBSztZQUNYLGVBQWUsRUFBRSxFQUFFO1NBQ3RCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFuQ04sWUFBTyxHQUFHLElBQUksQ0FBQztRQXFDWCxtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtHLENBQ3JHLENBQUM7U0FDTDtRQUVELGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxJQUFBLGFBQVEsR0FBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCwwQ0FBMEM7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksNEJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FB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