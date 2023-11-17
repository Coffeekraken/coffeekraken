import __SColor from '@coffeekraken/s-color';
import __SThemeBase from '../shared/SThemeBase.js';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
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
export default class STheme extends __SThemeBase {
    static get theme() {
        var _a;
        return (_a = this._theme) !== null && _a !== void 0 ? _a : __SSugarConfig.get('theme.theme');
    }
    static get variant() {
        var _a;
        return (_a = this._variant) !== null && _a !== void 0 ? _a : __SSugarConfig.get('theme.variant');
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
            return new __SColor(color);
        }
        const shadeObj = this.get(`shades.${shade}`);
        if (!shadeObj) {
            throw new Error(`Sorry but the requested "<yellow>${name}</yellow>"color, shade "<cyan>${shade}</cyan>" and state "<magenta>${state}</magenta>" does not exists...`);
        }
        const colorInstance = new __SColor(color);
        colorInstance.apply(shadeObj);
        return colorInstance;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLHlCQUF5QixDQUFDO0FBQ25ELE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLFlBQVk7SUFhNUMsTUFBTSxLQUFLLEtBQUs7O1FBQ1osT0FBTyxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWNELE1BQU0sS0FBSyxPQUFPOztRQUNkLE9BQU8sTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWMsRUFBRSxPQUFnQjtRQUN4QyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUNKLElBQVksRUFDWixLQUFjLEVBQ2QsUUFBZ0IsU0FBUztRQUV6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQ0FBb0MsSUFBSSxvQ0FBb0MsQ0FDL0UsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDWCxvQ0FBb0MsSUFBSSxpQ0FBaUMsS0FBSyxnQ0FBZ0MsS0FBSyxnQ0FBZ0MsQ0FDdEosQ0FBQztTQUNMO1FBQ0QsTUFBTSxhQUFhLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0NBQ0oifQ==