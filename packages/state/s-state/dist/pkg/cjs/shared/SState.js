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
const SStateLsAdapter_1 = __importDefault(require("../js/adapters/SStateLsAdapter"));
const SStateFsAdapter_1 = __importDefault(require("../node/adapters/SStateFsAdapter"));
class SState extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(object, settings) {
        super((0, object_1.__deepMerge)({
            watchDeep: false,
            save: false,
            exclude: [],
        }, settings !== null && settings !== void 0 ? settings : {}));
        // make sure the state has an id if want to save it
        if (this.settings.save && !this.settings.id) {
            throw new Error(`You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`);
        }
        // default adapter
        if (this.settings.save && !this.settings.adapter) {
            if ((0, is_1.__isNode)()) {
                this.settings.adapter = new SStateFsAdapter_1.default(this.settings.id);
            }
            else {
                // set the localstorage adapter on browser
                this.settings.adapter = new SStateLsAdapter_1.default(this.settings.id);
            }
        }
        let saveTimeout;
        const proxy = (0, object_1.__deepProxy)(object, (actionObj) => {
            switch (actionObj.action) {
                case 'set':
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
                    const stateToSave = JSON.parse(JSON.stringify(proxy));
                    // filter the excludes properties
                    this.settings.exclude.forEach((prop) => {
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
        // expose some methods on the proxy object itself
        const _this = this;
        Object.defineProperty(proxy, '$set', {
            enumerable: false,
            get() {
                return (event, handler) => {
                    return _this._eventEmitter.on(`set.${event}`, handler);
                };
            },
        });
        Object.defineProperty(proxy, '$delete', {
            enumerable: false,
            get() {
                return (event, handler) => {
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
                (() => __awaiter(this, void 0, void 0, function* () {
                    const restoredState = yield this.settings.adapter.load();
                    (0, object_1.__deepAssign)(proxy, restoredState);
                }))();
            }
            else {
                const restoredState = this.settings.adapter.load();
                (0, object_1.__deepAssign)(proxy, restoredState);
            }
        }
        this._proxy = proxy;
        return proxy;
    }
}
exports.default = SState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9GQUE0RDtBQUM1RCwrQ0FBa0Q7QUFDbEQsdURBSW9DO0FBQ3BDLHFGQUErRDtBQUMvRCx1RkFBaUU7QUFxRGpFLE1BQXFCLE1BQU8sU0FBUSxpQkFBUTtJQXlCeEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLE1BQVcsRUFBRSxRQUFtQztRQUN4RCxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksU0FBUyxFQUFFLEtBQUs7WUFDaEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUFFRixtREFBbUQ7UUFDbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ1gsa0dBQWtHLENBQ3JHLENBQUM7U0FDTDtRQUVELGtCQUFrQjtRQUNsQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDOUMsSUFBSSxJQUFBLGFBQVEsR0FBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUkseUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDSCwwQ0FBMEM7Z0JBQzFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUkseUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuRTtTQUNKO1FBRUQsSUFBSSxXQUFXLENB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