import __SClass from '@coffeekraken/s-class';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';
import __SSugarJson from '@coffeekraken/s-sugar-json';
export default class STheme extends __SClass {
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
        if (!theme) {
            const sugarJsonInstance = new __SSugarJson();
            const sugarJson = sugarJsonInstance.read();
            // @ts-ignore
            if (sugarJson.theme)
                theme = (_a = sugarJson.theme) !== null && _a !== void 0 ? _a : 'default';
        }
        if (theme && Object.keys(this.themes).indexOf(theme) === -1) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the theme "${theme}" you've passed in constructor does not exists... Here's the list of actual available themes: ${Object.keys(this.themes.themes).join(',')}`);
        }
        else if (theme) {
            this.name = theme;
        }
        else {
            this.name = 'default';
        }
    }
    static getTheme(theme) {
        if (this._instanciatedThemes[theme])
            return this._instanciatedThemes[theme];
        const themes = __SugarConfig.get('theme.themes');
        if (!themes[theme])
            throw new Error(`<red>[${this.name}]</red> Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(themes).join(',')}</green>`);
        this._instanciatedThemes[theme] = new STheme(theme);
        return this._instanciatedThemes[theme];
    }
    /**
     * @name        themes
     * @type        String
     * @get
     *
     * Store the themes configuration
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get themes() {
        return __SugarConfig.get('theme.themes');
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
    get _config() {
        // @ts-ignore
        return __SugarConfig.get('theme.themes')[this.name];
    }
    config(dotPath) {
        const value = __get(this._config, dotPath);
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
                const previous = {
                    name: colorName,
                    modifier: previousKey,
                    // @ts-ignore
                    value: colorObj[previousKey]
                };
                const next = {
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
/**
 * @name      theme
 * @type      String
 * @static
 *
 * Store the current theme setted in the config.theme namespace
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STheme.theme = __SugarConfig.get('theme.theme');
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
STheme.themes = Object.keys(__SugarConfig.get('theme.themes'));
/**
 * @name        getTheme
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBc0h0RCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBa0UxQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWM7O1FBQ3hCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVWLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDN0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0MsYUFBYTtZQUNiLElBQUksU0FBUyxDQUFDLEtBQUs7Z0JBQUUsS0FBSyxHQUFHLE1BQUEsU0FBUyxDQUFDLEtBQUssbUNBQUksU0FBUyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNELE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLGdDQUFnQyxLQUFLLGlHQUFpRyxNQUFNLENBQUMsSUFBSSxDQUMvSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDZCxDQUFDO1NBQ0g7YUFBTSxJQUFJLEtBQUssRUFBRTtZQUNoQixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxD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