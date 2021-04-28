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
        this.themes = s_sugar_config_1.default('theme.themes');
        if (!theme) {
            const sugarJson = sugarJson_1.default();
            // @ts-ignore
            if (sugarJson.theme)
                theme = (_a = sugarJson.theme) !== null && _a !== void 0 ? _a : 'default';
        }
        if (theme && Object.keys(this.themes).indexOf(theme) === -1) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the theme "${theme}" you've passed in constructor does not exists... Here's the list of actual available themes: ${Object.keys(this.themes.themes).join(',')}`);
        }
        else if (theme) {
            this.name = theme;
            this._config = this.themes[theme];
        }
        else {
            this.name = 'default';
            this._config = this.themes.default;
        }
    }
    static theme(theme) {
        if (this._instanciatedThemes[theme])
            return this._instanciatedThemes[theme];
        const themes = s_sugar_config_1.default('theme.themes');
        if (!themes[theme])
            throw new Error(`<red>[${this.name}]</red> Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(themes).join(',')}</green>`);
        this._instanciatedThemes[theme] = new STheme(theme);
        return this._instanciatedThemes[theme];
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
        const value = get_1.default(this._config, dotPath);
        if (value === undefined) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.name}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
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
/**
 * @name      baseTheme
 * @type      String
 * @static
 *
 * Store the base theme setted in the config.theme namespace
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STheme.baseTheme = s_sugar_config_1.default('theme.baseTheme');
/**
 * @name      themes
 * @type      String
 * @static
 *
 * Store the names of all the available themes
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STheme.themes = Object.keys(s_sugar_config_1.default('theme.themes'));
/**
 * @name        theme
 * @type        Function
 * @static
 *
 * This static method allows you to get quicky an STheme instance of the passed theme.
 * It will also check if an instance already exists for this theme and return it if so...
 *
 * @param     {String}    theme       The name of theme you want an STheme instance back for
 * @return    {STheme}              An instance of the STheme class representing the requested theme
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STheme._instanciatedThemes = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHlGQUFtRTtBQUNuRSxrRkFBeUQ7QUFDekQsZ0ZBQTBEO0FBMkgxRCxNQUFxQixNQUFPLFNBQVEsaUJBQVE7SUF3RjFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYzs7UUFDeEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLFNBQVMsR0FBRyxtQkFBVyxFQUFFLENBQUM7WUFDaEMsYUFBYTtZQUNiLElBQUksU0FBUyxDQUFDLEtBQUs7Z0JBQUUsS0FBSyxTQUFHLFNBQVMsQ0FBQyxLQUFLLG1DQUFJLFNBQVMsQ0FBQztTQUMzRDtRQUVELElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNuQixnQ0FBZ0MsS0FBSyxpR0FBaUcsTUFBTSxDQUFDLElBQUksQ0FDL0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ25CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2QsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFLLEVBQUU7WUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztZQUN0QixJQUFJ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