import __SClass from '@coffeekraken/s-class';
import __sugarConfig from '@coffeekraken/s-sugar-config';
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
        this.themes = __sugarConfig('theme.themes');
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
            this._config = this.themes[theme];
        }
        else {
            this.name = 'default';
            this._config = this.themes.default;
        }
    }
    static getTheme(theme) {
        if (this._instanciatedThemes[theme])
            return this._instanciatedThemes[theme];
        const themes = __sugarConfig('theme.themes');
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
STheme.theme = __sugarConfig('theme.theme');
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
STheme.themes = Object.keys(__sugarConfig('theme.themes'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBc0h0RCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBd0YxQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWM7O1FBQ3hCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVWLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDN0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDM0MsYUFBYTtZQUNiLElBQUksU0FBUyxDQUFDLEtBQUs7Z0JBQUUsS0FBSyxHQUFHLE1BQUEsU0FBUyxDQUFDLEtBQUssbUNBQUksU0FBUyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNELE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQ25CLGdDQUFnQyxLQUFLLGlHQUFpRyxNQUFNLENBQUMsSUFBSSxDQUMvSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FDbkIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDZCxDQUFDO1NBQ0g7YUFBTSxJQUFJLEtBQUssRUFBRTtZQUNoQixJ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