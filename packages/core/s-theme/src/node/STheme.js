import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SColor from '@coffeekraken/s-color';
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
        super({});
        if (!theme) {
            const sugarJsonInstance = new __SSugarJson();
            const sugarJson = sugarJsonInstance.read();
            // @ts-ignore
            if (sugarJson.theme)
                theme = sugarJson.theme;
            else
                theme = this.constructor.theme;
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
    static get theme() {
        return __SSugarConfig.get('theme.theme');
    }
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
    static get themes() {
        return Object.keys(__SSugarConfig.get('theme.themes'));
    }
    static getTheme(theme) {
        theme = (theme !== null && theme !== void 0 ? theme : __SSugarConfig.get('theme.theme'));
        if (this._instanciatedThemes[theme])
            return this._instanciatedThemes[theme];
        const themes = __SSugarConfig.get('theme.themes');
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
        return __SSugarConfig.get('theme.themes');
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
        return __SSugarConfig.get('theme.themes')[this.name];
    }
    config(dotPath) {
        const value = __get(this._config, dotPath);
        if (value === undefined) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.name}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
        }
        return value;
    }
    /**
     * @name        themesConfig
     * @type        ISThemesConfig
     *
     * Get access to the themes configuration
     *
     * @return      ISThemesConfig        The themes configuration
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    themesConfig() {
        return __SSugarConfig.get('theme');
    }
    /**
     * @name        baseColors
     * @type        Function
     *
     * This function returns a simple object with the base colors and their value
     * from the theme config.
     *
     * @return      {Record<string, ISThemeColor>}          The simple base colors map object
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    baseColors() {
        const map = {};
        Object.keys(this._config.color).forEach(color => {
            const colorObj = this._config.color[color];
            if (!colorObj.color)
                return;
            const c = new __SColor(colorObj.color);
            map[color] = {
                color: colorObj.color,
                variable: `--s-theme-color-${color}`,
                r: c.r,
                g: c.g,
                b: c.b,
                h: c.h,
                s: c.s,
                l: c.l,
                a: c.a
            };
        });
        return map;
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
     * - variant    {String}        The name of the variant like "background", "surface", etc...
     * - state      {String}        The name of the state like "hover", "active", etc...
     * - value      {ISThemeColor | ISThemeColorModifiers}        The actual color object
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
            if (colorObj.color) {
                const c = new __SColor(colorObj.color);
                callback({
                    name: colorName,
                    variant: '',
                    state: '',
                    value: {
                        color: colorObj.color,
                        variable: `--s-theme-color-${colorName}`,
                        r: c.r,
                        g: c.g,
                        b: c.b,
                        h: c.h,
                        s: c.s,
                        l: c.l,
                        a: c.a
                    }
                });
            }
            Object.keys(colorObj).forEach((variantOrStateName, j) => {
                if (triggeredStop)
                    return;
                let state = '', variant = '', res;
                const val = colorObj[variantOrStateName];
                if (variantOrStateName === 'color') {
                }
                else if (variantOrStateName.match(/^:/)) {
                    Object.keys(val).forEach(variantName => {
                        res = callback({
                            name: colorName,
                            state: variantOrStateName.slice(1),
                            variant: variantName,
                            value: Object.assign({ variable: `--s-theme-color-${colorName}-${variantOrStateName.slice(1)}-${variantName}` }, val[variantName])
                        });
                        if (res === false || res === -1) {
                            triggeredStop = true;
                        }
                    });
                }
                else {
                    variant = variantOrStateName;
                    res = callback({
                        name: colorName,
                        variant,
                        state,
                        value: Object.assign({ variable: state ? `--s-theme-color-${colorName}-${state}-${variant}` : `--s-theme-color-${colorName}-${variant}` }, val)
                    });
                    if (res === false || res === -1) {
                        triggeredStop = true;
                    }
                }
            });
        });
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBc0o3QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBMkUxQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWM7UUFDeEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxhQUFhO1lBQ2IsSUFBSSxTQUFTLENBQUMsS0FBSztnQkFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3hDLEtBQUssR0FBUyxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQztTQUM1QztRQUVELElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNuQixnQ0FBZ0MsS0FBSyxpR0FBaUcsTUFBTSxDQUFDLElBQUksQ0FDL0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ25CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2QsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFL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