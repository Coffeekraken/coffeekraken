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
const is_2 = require("@coffeekraken/sugar/is");
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
        Object.assign(this, object);
        // let saveTimeout;
        const proxy = (0, object_1.__deepProxy)(this, (actionObj) => {
            switch (actionObj.action) {
                case 'set':
                    if ((0, is_2.__isPlainObject)(actionObj.value)) {
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
        // restoring state if wanted
        if (this.settings.save) {
            // handle async adapter
            if (this.settings.adapter.async) {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const restoredState = yield this.settings.adapter.load();
                    (0, object_1.__deepAssign)(this, restoredState);
                }))();
            }
            else {
                const restoredState = this.settings.adapter.load();
                (0, object_1.__deepAssign)(this, restoredState);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9GQUE0RDtBQUM1RCwyREFBMEQ7QUFDMUQsK0NBQWtEO0FBQ2xELHVEQUlvQztBQUNwQywyRkFBa0U7QUFDbEUsNkZBQW9FO0FBRXBFLCtDQUF5RDtBQThFekQsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBNkJ4Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksU0FBYyxFQUFFLEVBQUUsUUFBbUM7UUFDN0QsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLFNBQVMsRUFBRSxJQUFJO1lBQ2YsSUFBSSxFQUFFLEtBQUs7WUFDWCxlQUFlLEVBQUUsRUFBRTtTQUN0QixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBbkNOLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFxQ1gsbURBQW1EO1FBQ25ELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUNYLGtHQUFrRyxDQUNyRyxDQUFDO1NBQ0w7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksSUFBQSxhQUFRLEdBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLDRCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsMENBQTBDO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLDRCQUFpQixDQUFDLElBQUks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