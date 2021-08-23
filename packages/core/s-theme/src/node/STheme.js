var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        Object.keys(this._config.color).forEach((color) => {
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
                a: c.a,
            };
        });
        return map;
    }
    /**
     * @name        loopOnThemeColors
     * @type        Function
     * @async
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
        return __awaiter(this, void 0, void 0, function* () {
            const colorsObj = this.config('color');
            let triggeredStop = false;
            Object.keys(colorsObj).forEach((colorName, i) => {
                var _a;
                if (triggeredStop)
                    return;
                const colorObj = colorsObj[colorName];
                const defaultColorObj = Object.assign({}, (_a = colorObj.default) !== null && _a !== void 0 ? _a : {});
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
                            a: c.a,
                        },
                    });
                }
                Object.keys(colorObj).forEach((stateName, j) => {
                    if (triggeredStop)
                        return;
                    const originalStateName = stateName;
                    if (stateName === 'default')
                        stateName = ':default';
                    let state = stateName.match(/^:/) ? stateName.slice(1) : '', variant = !stateName.match(/^:/) ? stateName : '', res;
                    let variantColorObj = Object.assign({}, colorObj[originalStateName]);
                    if (state !== 'default')
                        variantColorObj = Object.assign(Object.assign({}, defaultColorObj), { variantColorObj });
                    if (stateName === 'color') {
                    }
                    else if (stateName.match(/^:/)) {
                        Object.keys(variantColorObj).forEach((variant) => {
                            res = callback({
                                name: colorName,
                                state: state === 'default' ? '' : state,
                                variant,
                                value: Object.assign({ variable: state && state !== 'default'
                                        ? `--s-theme-color-${colorName}-${state}-${variant}`
                                        : `--s-theme-color-${colorName}-${variant}` }, variantColorObj[variant]),
                            });
                            if (res === false || res === -1) {
                                triggeredStop = true;
                            }
                        });
                    }
                    else {
                        res = callback({
                            name: colorName,
                            variant,
                            state,
                            value: Object.assign({ variable: state
                                    ? `--s-theme-color-${colorName}-${state}-${variant}`
                                    : `--s-theme-color-${colorName}-${variant}` }, variantColorObj),
                        });
                        if (res === false || res === -1) {
                            triggeredStop = true;
                        }
                    }
                });
            });
            return true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBc0o3QyxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBMEV4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWM7UUFDdEIsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQyxhQUFhO1lBQ2IsSUFBSSxTQUFTLENBQUMsS0FBSztnQkFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQzs7Z0JBQ3hDLEtBQUssR0FBUyxJQUFJLENBQUMsV0FBWSxDQUFDLEtBQUssQ0FBQztTQUM5QztRQUVELElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN6RCxNQUFNLElBQUksS0FBSyxDQUNYLFNBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUNyQixnQ0FBZ0MsS0FBSyxpR0FBaUcsTUFBTSxDQUFDLElBQUksQ0FDN0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ3JCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ2hCLENBQUM7U0FDTDthQUFN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