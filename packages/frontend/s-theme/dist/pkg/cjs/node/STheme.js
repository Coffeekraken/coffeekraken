"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const SThemeBase_js_1 = __importDefault(require("../shared/SThemeBase.js"));
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
    /**
     * @name        cssSettings
     * @type        Object
     * @static
     * @get
     *
     * Access the settings printed inside the css by the postcssSugarPlugin postcss plugin.
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get cssSettings() {
        return {};
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
     * @name            getCurrentTheme
     * @type            Function
     * @static
     *
     * This method allows you to get the current applied theme STheme instance
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getCurrentTheme() {
        // @ts-ignore
        return this.getTheme();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDRFQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFxQixNQUFPLFNBQVEsdUJBQVk7SUFDNUM7Ozs7Ozs7Ozs7T0FVRztJQUNILE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYyxFQUFFLE9BQWdCO1FBQ3hDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGVBQWU7UUFDbEIsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUNKLElBQVksRUFDWixLQUFjLEVBQ2QsUUFBZ0IsU0FBUztRQUV6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQ0FBb0MsSUFBSSxvQ0FBb0MsQ0FDL0UsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxpQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNYLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0NBQW9DLElBQUksaUNBQWlDLEtBQUssZ0NBQWdDLEtBQUssZ0NBQWdDLENBQ3RKLENBQUM7U0FDTDtRQUNELE1BQU0sYUFBYSxHQUFHLElBQUksaUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxhQUFhLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7Q0FDSjtBQXJGRCx5QkFxRkMifQ==