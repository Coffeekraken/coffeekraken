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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLHlGQUFtRTtBQUNuRSxrRkFBeUQ7QUFDekQsZ0ZBQTBEO0FBMkgxRCxNQUFxQixNQUFPLFNBQVEsaUJBQVE7SUF3RjFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYzs7UUFDeEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLE1BQU0sR0FBRyx3QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLFNBQVMsR0FBRyxtQkFBVyxFQUFFLENBQUM7WUFDaEMsYUFBYTtZQUNiLElBQUksU0FBUyxDQUFDLEtBQUs7Z0JBQUUsS0FBSyxHQUFHLE1BQUEsU0FBUyxDQUFDLEtBQUssbUNBQUksU0FBUyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNELE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLGdDQUFnQyxLQUFLLGlHQUFpRyxNQUFNLENBQUMsSUFBSSxDQUMvSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDZCxDQUFDO1NBQ0g7YUFBTSxJQUFJLEtBQUssRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1lBQ3RC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