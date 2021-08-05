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
     * - value      {ISThemeColor}        The actual color object that
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
            Object.keys(colorObj).forEach((variantOrStateName, j) => {
                if (triggeredStop)
                    return;
                let state = '', variant = '', res;
                const val = colorObj[variantOrStateName];
                if (variantOrStateName === 'color') {
                    const c = new __SColor(val);
                    res = callback({
                        name: colorName,
                        variant: '',
                        state: '',
                        value: {
                            color: val,
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
                else if (val.a !== undefined && val.r !== undefined && val.g !== undefined && val.b !== undefined) {
                    variant = variantOrStateName;
                    res = callback({
                        name: colorName,
                        variant,
                        state,
                        value: val
                    });
                    if (res === false || res === -1) {
                        triggeredStop = true;
                    }
                }
                else {
                    Object.keys(val).forEach(stateName => {
                        res = callback({
                            name: colorName,
                            variant: variantOrStateName,
                            state: stateName,
                            value: val[stateName]
                        });
                        if (res === false || res === -1) {
                            triggeredStop = true;
                        }
                    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBdUo3QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBc0UxQzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWM7UUFDeEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxhQUFhO1lBQ2IsSUFBSSxTQUFTLENBQUMsS0FBSztnQkFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3hDLEtBQUssR0FBUyxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQztTQUM1QztRQUVELElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUNiLFNBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNuQixnQ0FBZ0MsS0FBSyxpR0FBaUcsTUFBTSxDQUFDLElBQUksQ0FDL0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ25CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2QsQ0FBQztTQUNIO2FBQU0sSUFBSSxLQUFL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