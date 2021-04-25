"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const sugarJson_1 = __importDefault(require("@coffeekraken/sugar/node/sugar/sugarJson"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
class STheme extends s_class_1.default {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(theme) {
        var _a;
        super({});
        this.themesConfig = s_sugar_config_1.default('theme');
        if (!theme) {
            const sugarJson = sugarJson_1.default();
            // @ts-ignore
            if (sugarJson.theme)
                theme = (_a = sugarJson.theme) !== null && _a !== void 0 ? _a : 'default';
        }
        if (theme && Object.keys(this.themesConfig.themes).indexOf(theme) === -1) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the theme "${theme}" you've passed in constructor does not exists... Here's the list of actual available themes: ${Object.keys(this.themesConfig.themes).join(',')}`);
        }
        else if (theme) {
            this.themeName = theme;
            this.themeConfig = this.themesConfig.themes[theme];
        }
        else {
            this.themeName = 'default';
            this.themeConfig = this.themesConfig.themes.default;
        }
    }
    /**
     * @name          config
     * @type          Function
     *
     * This method allows you to access a value of the current theme
     * using a dot path like "color.primary.default", etc...
     *
     * @param         {String}        dotPath         The dot path of the config you want to get
     * @return        {Any}                           The value of the getted configuration
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    config(dotPath) {
        const value = get_1.default(this.themeConfig, dotPath);
        if (value === undefined) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.themeName}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
        }
        return value;
    }
    /**
     * @name        loopOnThemeColors
     * @type        Function
     *
     * This utility function allows you to loop quickly and efficiently on
     * theme colors and their's modifiers defined
     *
     * @param       {Function}      callback            Specify the callback that will be called for each color with an object containing these properties:
     * - name       {String}        The name of the color like "primary", "secondary", etc...
     * - modifier   {String}        The name of the modifier like "default", "10", "20", etc...
     * - value      {String}        The actual color value
     * - previous   {ISThemeLoopOnColorsColor}        The previous color object. If the current color is the first one, the previous will be the last one.
     * - next       {ISThemeLoopOnColorsColor}        The next color object. If the current color is the last one, the next will be the first one.
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    loopOnColors(callback) {
        const colorsObj = this.config('color');
        let triggeredStop = false;
        Object.keys(colorsObj).forEach((colorName, i) => {
            if (triggeredStop)
                return;
            const colorObj = colorsObj[colorName];
            Object.keys(colorObj).forEach((modifierName, j) => {
                if (triggeredStop)
                    return;
                const lastKey = Object.keys(colorObj).pop();
                const firstKey = Object.keys(colorObj)[0];
                const previousKey = j === 0 ? lastKey : Object.keys(colorObj)[j - 1];
                const nextKey = j >= Object.keys(colorObj).length - 1
                    ? firstKey
                    : Object.keys(colorObj)[j];
                let previous = {
                    name: colorName,
                    modifier: previousKey,
                    // @ts-ignore
                    value: colorObj[previousKey]
                };
                let next = {
                    name: colorName,
                    modifier: nextKey,
                    value: colorObj[nextKey]
                };
                // console.log(modifierName, j);
                const res = callback({
                    name: colorName,
                    modifier: modifierName,
                    value: colorObj[modifierName],
                    previous,
                    next
                });
                if (res === false || res === -1) {
                    triggeredStop = true;
                }
            });
        });
    }
}
exports.default = STheme;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHlGQUFtRTtBQUNuRSxrRkFBeUQ7QUFDekQsZ0ZBQTBEO0FBc0gxRCxNQUFxQixNQUFPLFNBQVEsaUJBQVE7SUFrQzFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYzs7UUFDeEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLFlBQVksR0FBRyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLFNBQVMsR0FBRyxtQkFBVyxFQUFFLENBQUM7WUFDaEMsYUFBYTtZQUNiLElBQUksU0FBUyxDQUFDLEtBQUs7Z0JBQUUsS0FBSyxHQUFHLE1BQUEsU0FBUyxDQUFDLEtBQUssbUNBQUksU0FBUyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN4RSxNQUFNLElBQUksS0FBSyxDQUNiLFNBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNuQixnQ0FBZ0MsS0FBSyxpR0FBaUcsTUFBTSxDQUFDLElBQUksQ0FDL0ksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQ3pCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2QsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFLLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMs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