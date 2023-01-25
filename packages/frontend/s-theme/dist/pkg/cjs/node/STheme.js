"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const SThemeBase_1 = __importDefault(require("../shared/SThemeBase"));
/**
 * @name            STheme
 * @namespace       node
 * @type            Class
 * @extends         SThemeBase
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
 * theme.loopOnColors(({name, schema, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class STheme extends SThemeBase_1.default {
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
     * @param           {String}            [schema=null]     The color schema you want to get
     * @param           {HTMLElement}       [$context=document.body]        The context in which to get the color
     * @return          {SColor}                                    An SColor instance that you can make use of
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getColor(name, schema, state = 'default') {
        const color = this.get(`color.${name}.color`);
        if (!color) {
            throw new Error(`Sorry but the requested "<yellow>${name}</yellow> color does not exists...`);
        }
        if (!schema) {
            return new s_color_1.default(color);
        }
        const schemaObj = this.get(`colorSchema.${schema}`);
        if (!schemaObj) {
            throw new Error(`Sorry but the requested "<yellow>${name}</yellow>"color, schema "<cyan>${schema}</cyan>" and state "<magenta>${state}</magenta>" does not exists...`);
        }
        const colorInstance = new s_color_1.default(color);
        colorInstance.apply(schemaObj);
        return colorInstance;
    }
}
exports.default = STheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHNFQUFnRDtBQUVoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBcUIsTUFBTyxTQUFRLG9CQUFZO0lBQzVDOzs7Ozs7Ozs7O09BVUc7SUFDSCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWMsRUFBRSxPQUFnQjtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxlQUFlO1FBQ2xCLGFBQWE7UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFFBQVEsQ0FDSixJQUFZLEVBQ1osTUFBZSxFQUNmLFFBQWdCLFNBQVM7UUFFekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE1BQU0sSUFBSSxLQUFLLENBQ1gsb0NBQW9DLElBQUksb0NBQW9DLENBQy9FLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxPQUFPLElBQUksaUJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUNELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUNYLG9DQUFvQyxJQUFJLGtDQUFrQyxNQUFNLGdDQUFnQyxLQUFLLGdDQUFnQyxDQUN4SixDQUFDO1NBQ0w7UUFDRCxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFyRkQseUJBcUZDIn0=