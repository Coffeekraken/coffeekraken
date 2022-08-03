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
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const deepAssign_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepAssign"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const deepProxy_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepProxy"));
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
        super((0, deepMerge_1.default)({}, settings !== null && settings !== void 0 ? settings : {}));
        // make sure the state has an id if want to save it
        if (this.settings.save && !this.settings.id) {
            throw new Error(`You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`);
        }
        // default adapter
        if (this.settings.save && !this.settings.adapter) {
            if ((0, node_1.default)()) {
                this.settings.adapter = new SStateFsAdapter_1.default(this.settings.id);
            }
            else {
                // set the localstorage adapter on browser
                this.settings.adapter = new SStateLsAdapter_1.default(this.settings.id);
            }
        }
        let saveTimeout;
        const proxy = (0, deepProxy_1.default)(object, (actionObj) => {
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
                    this.settings.adapter.save(JSON.parse(JSON.stringify(proxy)));
                });
            }
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
        (() => __awaiter(this, void 0, void 0, function* () {
            if (this.settings.save) {
                const restoredState = yield this.settings.adapter.load();
                (0, deepAssign_1.default)(proxy, restoredState);
            }
        }))();
        return proxy;
    }
}
exports.default = SState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9GQUE0RDtBQUM1RCw4RUFBMEQ7QUFDMUQsOEZBQXdFO0FBQ3hFLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFDdEUscUZBQStEO0FBQy9ELHVGQUFpRTtBQW1EakUsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBeUJ4Qzs7Ozs7Ozs7T0FRRztJQUNILFlBQVksTUFBVyxFQUFFLFFBQW1DO1FBQ3hELEtBQUssQ0FBQyxJQUFBLG1CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdkMsbURBQW1EO1FBQ25ELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUNYLGtHQUFrRyxDQUNyRyxDQUFDO1NBQ0w7UUFFRCxrQkFBa0I7UUFDbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzlDLElBQUksSUFBQSxjQUFRLEdBQUUsRUFBRTtnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLHlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkU7aUJBQU07Z0JBQ0gsMENBQTBDO2dCQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxJQUFJLHlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDbkU7U0FDSjtRQUVELElBQUksV0FBVyxDQUFDO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUEsbUJBQVcs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