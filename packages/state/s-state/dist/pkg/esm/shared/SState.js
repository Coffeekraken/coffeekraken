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
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __deepAssign from '@coffeekraken/sugar/shared/object/deepAssign';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __deepProxy from '@coffeekraken/sugar/shared/object/deepProxy';
import __SStateLsAdapter from '../js/adapters/SStateLsAdapter';
import __SStateFsAdapter from '../node/adapters/SStateFsAdapter';
export default class SState extends __SClass {
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
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
        // make sure the state has an id if want to save it
        if (this.settings.save && !this.settings.id) {
            throw new Error(`You MUST set an id for your state when using the "save" setting. Pass an "id" in the settings...`);
        }
        // default adapter
        if (this.settings.save && !this.settings.adapter) {
            if (__isNode()) {
                this.settings.adapter = new __SStateFsAdapter(this.settings.id);
            }
            else {
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
        this._eventEmitter = new __SEventEmitter();
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
                __deepAssign(proxy, restoredState);
            }
        }))();
        return proxy;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8saUJBQWlCLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxpQkFBaUIsTUFBTSxrQ0FBa0MsQ0FBQztBQW1EakUsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQXlCeEM7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZLE1BQVcsRUFBRSxRQUFtQztRQUN4RCxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLG1EQUFtRDtRQUNuRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDWCxrR0FBa0csQ0FDckcsQ0FBQztTQUNMO1FBRUQsa0JBQWtCO1FBQ2xCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJLFFBQVEsRUFBRSxFQUFFO2dCQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFD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