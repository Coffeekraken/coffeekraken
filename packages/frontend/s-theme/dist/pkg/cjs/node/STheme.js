"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const SThemeBase_js_1 = __importDefault(require("../shared/SThemeBase.js"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name            STheme
 * @namespace       node
 * @type            Class
 * @extends         SThemeBase
 * @platform            node
 * @status          beta
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, shade, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class STheme extends SThemeBase_js_1.default {
    static get theme() {
        var _a;
        return (_a = this._theme) !== null && _a !== void 0 ? _a : s_sugar_config_1.default.get('theme.theme');
    }
    static get variant() {
        var _a;
        return (_a = this._variant) !== null && _a !== void 0 ? _a : s_sugar_config_1.default.get('theme.variant');
    }
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(theme, variant) {
        super(theme, variant);
    }
    /**
     * @name            getColor
     * @type            Function
     *
     * THis method allows you to access a particular theme color
     *
     * @param           {String}            name            The color name you want to get
     * @param           {String}            [shade=null]     The color shade you want to get
     * @param           {HTMLElement}       [$context=document.body]        The context in which to get the color
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getColor(name, shade, state = 'default') {
        const color = this.get(`color.${name}.color`);
        if (!color) {
            throw new Error(`Sorry but the requested "<yellow>${name}</yellow> color does not exists...`);
        }
        if (!shade) {
            return new s_color_1.default(color);
        }
        const shadeObj = this.get(`shades.${shade}`);
        if (!shadeObj) {
            throw new Error(`Sorry but the requested "<yellow>${name}</yellow>"color, shade "<cyan>${shade}</cyan>" and state "<magenta>${state}</magenta>" does not exists...`);
        }
        const colorInstance = new s_color_1.default(color);
        colorInstance.apply(shadeObj);
        return colorInstance;
    }
}
exports.default = STheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRFQUFtRDtBQUNuRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBQ0gsTUFBcUIsTUFBTyxTQUFRLHVCQUFZO0lBYTVDLE1BQU0sS0FBSyxLQUFLOztRQUNaLE9BQU8sTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FBSSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBY0QsTUFBTSxLQUFLLE9BQU87O1FBQ2QsT0FBTyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWMsRUFBRSxPQUFnQjtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUNKLElBQVksRUFDWixLQUFjLEVBQ2QsUUFBZ0IsU0FBUztRQUV6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQ0FBb0MsSUFBSSxvQ0FBb0MsQ0FDL0UsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxpQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0NBQW9DLElBQUksaUNBQWlDLEtBQUssZ0NBQWdDLEtBQUssZ0NBQWdDLENBQ3RKLENBQUM7U0FDTDtRQUNELE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQXJGRCx5QkFxRkMifQ==