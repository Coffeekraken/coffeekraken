var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
export default class SConfigAdapter {
    /**
     * @name                              constructor
     * @type                              Function
     *
     * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
     *
     * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
     * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
     * - ...others: All the settings you need for your specific adapter
     *
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        this.settings = __deepMerge({
            name: `s-config-adapter-${__uniqid()}`,
        }, settings !== null && settings !== void 0 ? settings : {});
    }
    /**
     * @name            name
     * @type            String
     * @get
     *
     * Access the adapter name. You can specify it through settings.configAdapter.name, otherwise it will be a randon string generated
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get name() {
        return this.settings.name;
    }
    update() {
        // calling the "onUpdate" setting callback if exists
        clearTimeout(this._updateTimeout);
        this._updateTimeout = setTimeout(() => {
            var _a, _b;
            (_b = (_a = this.settings).onUpdate) === null || _b === void 0 ? void 0 : _b.call(_a);
        }, 50);
    }
    /**
     * @name        load
     * @type        Function
     *
     * Function that you have to override in your own adapter to load the configurations
     *
     * @param      {ISConfigAdapterLoadParams}         params           The parameters passed by the SConfig instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    load(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return {};
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBZ0RoRSxNQUFNLENBQUMsT0FBTyxPQUFPLGNBQWM7SUEwQi9COzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxRQUEwQztRQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FDdkI7WUFDSSxJQUFJLEVBQUUsb0JBQW9CLFFBQVEsRUFBRSxFQUFFO1NBQ3pDLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUFDO0lBQ04sQ0FBQztJQWpDRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFtQ0QsTUFBTTtRQUNGLG9EQUFvRDtRQUNwRCxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTs7WUFDbEMsTUFBQSxNQUFBLElBQUksQ0FBQyxRQUFRLEVBQUMsUUFBUSxrREFBSSxDQUFDO1FBQy9CLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csSUFBSSxDQUFDLE1BQWlDOztZQUN4QyxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUM7S0FBQTtDQUNKIn0=