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
import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';
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
    constructor(theme, variant) {
        super({});
        this.name = theme !== null && theme !== void 0 ? theme : __SSugarConfig.get('theme.theme');
        this.variant = variant !== null && variant !== void 0 ? variant : __SSugarConfig.get('theme.variant');
        if (!__SSugarConfig.get(`theme.themes.${this.name}-${this.variant}`)) {
            throw new Error(`Sorry but the requested theme "<yellow>${this.name}-${this.variant}</yellow>" does not exists...`);
        }
    }
    /**
     * @name            id
     * @type            String
     *
     * Store the computed theme id builded from the theme name and theme variant
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get id() {
        return `${this.name}-${this.variant}`;
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
     * @name      variant
     * @type      String
     * @static
     *
     * Store the current variant setted in the config.variant namespace
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static get variant() {
        return __SSugarConfig.get('theme.variant');
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
    static getTheme(theme, variant) {
        theme = theme !== null && theme !== void 0 ? theme : __SSugarConfig.get('theme.theme');
        variant = variant !== null && variant !== void 0 ? variant : __SSugarConfig.get('theme.variant');
        theme = (theme !== null && theme !== void 0 ? theme : __SSugarConfig.get('theme.theme'));
        if (this._instanciatedThemes[`${theme}-${variant}`])
            return this._instanciatedThemes[`${theme}-${variant}`];
        const themes = __SSugarConfig.get('theme.themes');
        if (!themes[`${theme}-${variant}`])
            throw new Error(`<red>[${this.name}]</red> Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(themes).join(',')}</green>`);
        this._instanciatedThemes[`${theme}-${variant}`] = new STheme(theme, variant);
        return this._instanciatedThemes[`${theme}-${variant}`];
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
        return __SSugarConfig.get('theme.themes')[this.id];
    }
    config(dotPath) {
        const value = __get(this._config, dotPath);
        if (value === undefined) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.id}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
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
                        // @ts-ignore
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
                        variantColorObj = Object.assign(Object.assign({}, defaultColorObj), variantColorObj);
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
 * @param       {String}    variant         The theme variant you want an STheme instance back for
 * @return    {STheme}              An instance of the STheme class representing the requested theme
 *
 * @since     2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
STheme._instanciatedThemes = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1RoZW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBc0oxRCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxRQUFRO0lBd0h4Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLEtBQWMsRUFBRSxPQUFnQjtRQUN4QyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFVixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2xFLE1BQU0sSUFBSSxLQUFLLENBQ1gsMENBQTBDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sK0JBQStCLENBQ3JHLENBQUM7U0FDTDtJQUNMLENBQUM7SUF0SEQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLEVBQUU7UUFDRixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxLQUFLO1FBQ1osT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssT0FBTztRQUNkLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFrQkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFjLEVBQUUsT0FBZ0I7UUFDNUMsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbkQsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFekQsS0FBSyxHQUFXLENBQUMsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBRTdELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQy9DLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFM0QsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVsRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FDSSxJQUFJLENBQUMsSUFDVCxrREFBa0QsS0FBSyxJQUFJLE9BQU8sbUVBQW1FLE1BQU0sQ0FBQyxJQUFJLENBQzVJLE1BQU0sQ0FDVCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUN4QixDQUFDO1FBQ04sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQ3hELEtBQUssRUFDTCxPQUFPLENBQ1YsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQXlCRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLE1BQU07UUFDTixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILElBQUksT0FBTztRQUNQLGFBQWE7UUFDYixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTztRQUNWLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDRDQUE0QyxJQUFJLENBQUMsRUFBRSxrQ0FBa0MsT0FBTyw2QkFBNkIsQ0FDMUosQ0FBQztTQUNMO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZO1FBQ1IsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFVBQVU7UUFDTixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDVCxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7Z0JBQ3JCLFFBQVEsRUFBRSxtQkFBbUIsS0FBSyxFQUFFO2dCQUNwQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDVCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNHLFlBQVksQ0FDZCxRQUFxQzs7WUFFckMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2QyxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O2dCQUM1QyxJQUFJLGFBQWE7b0JBQUUsT0FBTztnQkFDMUIsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUV0QyxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFBLFFBQVEsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7b0JBQ2hCLE1BQU0sQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDO3dCQUNMLElBQUksRUFBRSxTQUFTO3dCQUNmLE9BQU8sRUFBRSxFQUFFO3dCQUNYLEtBQUssRUFBRSxFQUFFO3dCQUNULGFBQWE7d0JBQ2IsS0FBSyxFQUFFOzRCQUNILEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSzs0QkFDckIsUUFBUSxFQUFFLG1CQUFtQixTQUFTLEVBQUU7NEJBQ3hDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NEJBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDVDtxQkFDSixDQUFDLENBQUM7aUJBQ047Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNDLElBQUksYUFBYTt3QkFBRSxPQUFPO29CQUMxQixNQUFNLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztvQkFFcEMsSUFBSSxTQUFTLEtBQUssU0FBUzt3QkFBRSxTQUFTLEdBQUcsVUFBVSxDQUFDO29CQUVwRCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3ZELE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUNqRCxHQUFHLENBQUM7b0JBRVIsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDL0IsRUFBRSxFQUNGLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUM5QixDQUFDO29CQUNGLElBQUksS0FBSyxLQUFLLFNBQVM7d0JBQ25CLGVBQWUsbUNBQ1IsZUFBZSxHQUNmLGVBQWUsQ0FDckIsQ0FBQztvQkFFTixJQUFJLFNBQVMsS0FBSyxPQUFPLEVBQUU7cUJBQzFCO3lCQUFNLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs0QkFDN0MsR0FBRyxHQUFHLFFBQVEsQ0FBMkI7Z0NBQ3JDLElBQUksRUFBRSxTQUFTO2dDQUNmLEtBQUssRUFBRSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUs7Z0NBQ3ZDLE9BQU87Z0NBQ1AsS0FBSyxrQkFDRCxRQUFRLEVBQ0osS0FBSyxJQUFJLEtBQUssS0FBSyxTQUFTO3dDQUN4QixDQUFDLENBQUMsbUJBQW1CLFNBQVMsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO3dDQUNwRCxDQUFDLENBQUMsbUJBQW1CLFNBQVMsSUFBSSxPQUFPLEVBQUUsSUFDaEQsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUM5Qjs2QkFDSixDQUFDLENBQUM7NEJBQ0gsSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtnQ0FDN0IsYUFBYSxHQUFHLElBQUksQ0FBQzs2QkFDeEI7d0JBQ0wsQ0FBQyxDQUFDLENBQUM7cUJBQ047eUJBQU07d0JBQ0gsR0FBRyxHQUFHLFFBQVEsQ0FBMkI7NEJBQ3JDLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU87NEJBQ1AsS0FBSzs0QkFDTCxLQUFLLGtCQUNELFFBQVEsRUFBRSxLQUFLO29DQUNYLENBQUMsQ0FBQyxtQkFBbUIsU0FBUyxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7b0NBQ3BELENBQUMsQ0FBQyxtQkFBbUIsU0FBUyxJQUFJLE9BQU8sRUFBRSxJQUM1QyxlQUFlLENBQ3JCO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFOzRCQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDO3lCQUN4QjtxQkFDSjtnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBOztBQXZRRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNJLDBCQUFtQixHQUEyQixFQUFFLENBQUMifQ==