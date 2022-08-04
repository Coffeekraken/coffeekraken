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
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const uniqid_1 = __importDefault(require("@coffeekraken/sugar/shared/string/uniqid"));
class SConfigAdapter {
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
        this.settings = (0, deepMerge_1.default)({
            name: `s-config-adapter-${(0, uniqid_1.default)()}`,
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
exports.default = SConfigAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEZBQXNFO0FBQ3RFLHNGQUFnRTtBQWdEaEUsTUFBcUIsY0FBYztJQTBCL0I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLFFBQTBDO1FBQ2xELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBQSxtQkFBVyxFQUN2QjtZQUNJLElBQUksRUFBRSxvQkFBb0IsSUFBQSxnQkFBUSxHQUFFLEVBQUU7U0FDekMsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQUM7SUFDTixDQUFDO0lBakNEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQW1DRCxNQUFNO1FBQ0Ysb0RBQW9EO1FBQ3BELFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFOztZQUNsQyxNQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsRUFBQyxRQUFRLGtEQUFJLENBQUM7UUFDL0IsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDRyxJQUFJLENBQUMsTUFBaUM7O1lBQ3hDLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztLQUFBO0NBQ0o7QUFqRkQsaUNBaUZDIn0=