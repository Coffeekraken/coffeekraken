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
// import __micromatch from 'micromatch';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __knownCssProperties from 'known-css-properties';
import __objectHash from 'object-hash';
import __isColor from '@coffeekraken/sugar/shared/is/color';
export default class SThemeBase extends __SClass {
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
        if (!theme) {
            theme = __SSugarConfig.get('theme.theme');
        }
        if (!variant) {
            variant = __SSugarConfig.get('theme.variant');
        }
        if (this._instanciatedThemes[`${theme}-${variant}`])
            return this._instanciatedThemes[`${theme}-${variant}`];
        const themes = __SSugarConfig.get('theme.themes');
        if (!themes[`${theme}-${variant}`])
            throw new Error(`<red>[${this.name}]</red> Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(themes).join(',')}</green>`);
        this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant);
        return this._instanciatedThemes[`${theme}-${variant}`];
    }
    /**
     * @name            hash
     * @type            String
     * @static
     *
     * This hash accessor gives you access to the actual theme configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static hash(dotPath = '') {
        const config = this.config(dotPath);
        return __objectHash(config);
    }
    /**
     * @name        cssVar
     * @type        Function
     *
     * This function take a simple theme dot path and returns the proper
     * variable string with the value fallback.
     *
     * @param       {String}        dotPath         The dot path theme variable you want
     * @return      {String}                        The proper css variable string that represent this value with his fallback just in case
     *
     * @example         js
     * import { cssVar } from '@coffeekraken/s-postcss-sugar-plugin';
     * cssVar('ui.button.padding'); // => var(--s-theme-ui-button-padding, 1em 1.2em)
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static cssVar(dotPath, fallback = true) {
        let fb = this.getTheme().config(dotPath);
        if (!fallback || (typeof fb === 'string' && fb.includes(',')))
            fb = 0;
        const v = `var(${`--s-theme-${dotPath
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-')}`}, ${fb})`;
        return v;
    }
    /**
     * @name                jsObjectToCssProperties
     * @type                Function
     * @status              beta
     * @static
     *
     * This static method allows you to pass a javascript object that contain css properties
     * and it will returns the processed css string. Some properties can accept internal theme configuration
     * settings like `font-size`, `color`, etc...:
     *
     * - `font-family`
     * - `font-size`
     * - `color`
     * - `background-color`
     * - `border-radius`: And all border-radius properties like `border-top-left-radius`, etc...
     * - `border-width`
     * - `transition`
     * - `margin`: And all the margins properties like `margin-inline`, etc...
     * - `padding`: And all the paddings properties like `padding-block`, etc...
     * - `depth`: Special property that will apply nice shadows depending on your theme configuration
     * - `default-color`: Apply the default color using `@sugar.color` mixin
     *
     * @param           {Object}        jsObject        An object to convert to css string
     * @return          {String}                            The processed css string
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static jsObjectToCssProperties(jsObject, settings) {
        const finalSettings = __deepMerge({
            exclude: [],
            only: [],
        }, settings);
        const propsStack = [];
        Object.keys(jsObject).forEach((prop) => {
            if (finalSettings.exclude.indexOf(prop) !== -1)
                return;
            if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1)
                return;
            const originalProp = prop;
            prop = __dashCase(prop).trim();
            if (finalSettings.exclude.length &&
                finalSettings.exclude.indexOf(prop) !== -1)
                return;
            if (finalSettings.only.length &&
                finalSettings.only.indexOf(prop) === -1)
                return;
            const value = jsObject[originalProp];
            if (!value)
                return;
            let color, modifier;
            switch (prop) {
                case 'font-family':
                    propsStack.push(`@sugar.font.family(${value});`);
                    break;
                case 'font-size':
                    propsStack.push(`@sugar.font.size(${value});`);
                    break;
                case 'color':
                    color = value;
                    modifier = '';
                    if (Array.isArray(value)) {
                        color = value[0];
                        modifier = value[1];
                    }
                    propsStack.push(`color: sugar.color(${color}, ${modifier});`);
                    break;
                case 'background-color':
                    color = value;
                    modifier = '';
                    if (Array.isArray(value)) {
                        color = value[0];
                        modifier = value[1];
                    }
                    propsStack.push(`background-color: sugar.color(${color}, ${modifier});`);
                    break;
                case 'border-radius':
                case 'border-top-left-radius':
                case 'border-top-right-radius':
                case 'border-bottom-right-radius':
                case 'border-bottom-left-radius':
                    propsStack.push(`border-radius: sugar.border.radius(${value});`);
                    break;
                case 'border-width':
                    propsStack.push(`border-width: sugar.border.width(${value});`);
                    break;
                case 'transition':
                    propsStack.push(`transition: sugar.transition(${value});`);
                    break;
                case 'margin-inline':
                case 'margin-block':
                case 'margin-inline-start':
                case 'margin-inline-end':
                case 'margin-block-start':
                case 'margin-block-end':
                case 'margin':
                case 'margin-top':
                case 'margin-bottom':
                case 'margin-left':
                case 'margin-right':
                    propsStack.push(`${prop}: sugar.margin(${value});`);
                    break;
                case 'padding-inline':
                case 'padding-block':
                case 'padding-inline-start':
                case 'padding-inline-end':
                case 'padding-block-start':
                case 'padding-block-end':
                case 'padding':
                case 'padding-top':
                case 'padding-bottom':
                case 'padding-left':
                case 'padding-right':
                    propsStack.push(`${prop}: sugar.padding(${value});`);
                    break;
                case 'depth':
                    propsStack.push(`@sugar.depth(${value});`);
                    break;
                case 'default-color':
                    propsStack.push(`@sugar.color(${value});`);
                    break;
                default:
                    const props = __knownCssProperties.all;
                    if (props.indexOf(prop) === -1)
                        return;
                    propsStack.push(`${prop}: ${value};`);
                    break;
            }
        });
        return propsStack.join('\n');
    }
    /**
     * @name                remapCssColor
     * @type                Function
     * @status              beta
     * @static
     *
     * This static method allows you to remap a color to another and returns the needed css
     * variables string.
     *
     * @param           {String}            from            The color name you want to remap
     * @param           {String}            to              The color you want to assign
     * @return          {String}                            The generated css variables string
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static remapCssColor(from, to) {
        const result = {
            vars: [],
            properties: {}
        };
        if (__isColor(to)) {
            const color = new __SColor(to);
            result.vars = [
                `--s-theme-color-${from}-h: ${color.h}`,
                `--s-theme-color-${from}-s: ${color.s}`,
                `--s-theme-color-${from}-l: ${color.l}`,
                `--s-theme-color-${from}-a: ${color.a}`
            ];
            result.properties[`--s-theme-color-${from}-h`] = color.h;
            result.properties[`--s-theme-color-${from}-s`] = color.s;
            result.properties[`--s-theme-color-${from}-l`] = color.l;
            result.properties[`--s-theme-color-${from}-a`] = color.a;
        }
        else {
            const toColorName = to.split('-').slice(0, 1)[0], fromColorName = from.split('-').slice(0, 1)[0];
            let toColorVariant = to.split('-').pop(), fromColorVariant = from.split('-').pop();
            if (toColorName === toColorVariant)
                toColorVariant = undefined;
            if (fromColorName === fromColorVariant)
                fromColorVariant = undefined;
            let fromVariable = `--s-theme-color-${fromColorName}`, toVariable = `--s-theme-color-${toColorName}`;
            this.getTheme().loopOnColors((colorObj) => {
                if (colorObj.name === toColorName) {
                    if (toColorVariant) {
                        if (colorObj.variant === toColorVariant) {
                            result.vars.push(`${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
                            result.properties[`${fromVariable}-saturation-offset`] = `var(${toVariable}-${colorObj.variant}-saturation-offset, 0)`;
                            result.vars.push(`${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
                            result.properties[`${fromVariable}-lightness-offset`] = `var(${toVariable}-${colorObj.variant}-lightness-offset, 0)`;
                            result.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                            result.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
                        }
                    }
                    else {
                        if (!colorObj.state &&
                            !colorObj.variant &&
                            colorObj.value.color) {
                            result.vars.push(`${fromVariable}-h: var(${toVariable}-h);`);
                            result.properties[`${fromVariable}-h`] = `var(${toVariable}-h)`;
                            result.vars.push(`${fromVariable}-s: var(${toVariable}-s);`);
                            result.properties[`${fromVariable}-s`] = `var(${toVariable}-s)`;
                            result.vars.push(`${fromVariable}-l: var(${toVariable}-l);`);
                            result.properties[`${fromVariable}-l`] = `var(${toVariable}-l)`;
                        }
                        else if (!colorObj.value.color) {
                            result.vars.push(`${fromVariable}-${colorObj.variant}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
                            result.properties[`${fromVariable}-${colorObj.variant}-saturation-offset`] = `var(${toVariable}-${colorObj.variant}-saturation-offset, 0)`;
                            result.vars.push(`${fromVariable}-${colorObj.variant}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
                            result.properties[`${fromVariable}-${colorObj.variant}-lightness-offset`] = `var(${toVariable}-${colorObj.variant}-lightness-offset, 0)`;
                            result.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                            result.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
                        }
                    }
                }
            });
        }
        return result;
    }
    /**
     * @name            toCssVars
     * @type            Function
     * @static
     *
     * This static method allows you to transform a theme/variant into css variables
     *
     * @param       {String}        theme           The theme name you want to transform
     * @param       {String}        variant         The theme variant you want to transform
     * @return      {String}                        The converted css variables string
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static toCssVars(theme, variant) {
        // @ts-ignore
        const themeInstance = this.getTheme(theme, variant);
        if (!themeInstance)
            throw new Error(`Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`);
        // const themesConfig = themeInstance.themesConfig();
        let vars = [];
        // handle colors
        themeInstance.loopOnColors((colorObj) => {
            const baseVariable = colorObj.value.variable;
            // if (
            //     !__micromatch(
            //         `color.${colorObj.name}`,
            //         themesConfig.cssVariables,
            //     ).length
            // )
            //     return;
            if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
                vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
                vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
                vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
                vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
                vars.push(`${baseVariable}-origin-h: ${colorObj.value.h};`);
                vars.push(`${baseVariable}-origin-s: ${colorObj.value.s};`);
                vars.push(`${baseVariable}-origin-l: ${colorObj.value.l};`);
                vars.push(`${baseVariable}-origin-a: ${colorObj.value.a};`);
            }
            else if (!colorObj.value.color) {
                if (colorObj.value.saturate) {
                    vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.saturate};`);
                }
                else if (colorObj.value.desaturate) {
                    vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.desaturate * -1};`);
                }
                else {
                    vars.push(`${baseVariable}-saturation-offset: 0;`);
                }
                if (colorObj.value.lighten) {
                    vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.lighten};`);
                }
                else if (colorObj.value.darken) {
                    vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.darken * -1};`);
                }
                else {
                    vars.push(`${baseVariable}-lightness-offset: 0;`);
                }
                if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                    vars.push(`${baseVariable}-a: ${colorObj.value.alpha};`);
                }
            }
        });
        // others than colors
        const themeObjWithoutColors = Object.assign({}, themeInstance.config('.'));
        delete themeObjWithoutColors.color;
        const flattenedTheme = __flatten(themeObjWithoutColors);
        Object.keys(flattenedTheme).forEach((key) => {
            // if (!__micromatch(key, themesConfig.cssVariables).length) return;
            const value = flattenedTheme[key];
            const varKey = key
                .replace(/\./gm, '-')
                .replace(/:/gm, '-')
                .replace(/\?/gm, '')
                .replace(/--/gm, '-');
            let variable = `--s-theme-${varKey}`;
            if (`${value}`.match(/:/)) {
                vars.push(`${variable}: "${flattenedTheme[key]}";`);
            }
            else {
                vars.push(`${variable}: ${flattenedTheme[key]};`);
            }
        });
        return vars;
    }
    /**
     * @name            config
     * @type            Function
     * @static
     *
     * This static method allows you to access the active theme config
     *
     * @param       {String}        dotPath           The dot path of the config you want
     * @return      {any}                        The getted theme config
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static config(dotPath, theme, variant) {
        const instance = this.getTheme(theme, variant);
        return instance.config(dotPath);
    }
    /**
     * @name            applyColor
     * @type            Function
     * @static
     *
     * This static method allows you to apply a color on a particular context
     *
     * @param       {String}        color               The color name/code you want to apply
     * @param       {HTMLElement}       [$context=document.body]        The context on which to apply the color
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static applyColor(color, $context = document.body) {
        const vars = this.remapCssColor('current', color);
        for (let [key, value] of Object.entries(vars.properties)) {
            // @ts-ignore
            $context.style.setProperty(key, value);
        }
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
     * @name            hash
     * @type            String
     *
     * This hash accessor gives you access to the actual theme configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    hash(dotPath = '') {
        const config = this.config(dotPath);
        return __objectHash(config);
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
                if (!colorObj.color) {
                    throw new Error(`Sorry but your color "<yellow>${colorName}</yellow>" does not provide a "<cyan>color</cyan>" property and this is required...`);
                }
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
                            const newColor = c.apply(variantColorObj[variant], true);
                            res = callback({
                                name: colorName,
                                state: state === 'default' ? '' : state,
                                variant,
                                value: Object.assign(Object.assign({ variable: state && state !== 'default'
                                        ? `--s-theme-color-${colorName}-${state}-${variant}`
                                        : `--s-theme-color-${colorName}-${variant}` }, variantColorObj[variant]), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
                            });
                            if (res === false || res === -1) {
                                triggeredStop = true;
                            }
                        });
                    }
                    else {
                        const newColor = c.apply(variantColorObj, true);
                        res = callback({
                            name: colorName,
                            variant,
                            state,
                            value: Object.assign(Object.assign({ variable: state
                                    ? `--s-theme-color-${colorName}-${state}-${variant}`
                                    : `--s-theme-color-${colorName}-${variant}` }, variantColorObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
SThemeBase._instanciatedThemes = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUaGVtZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFDMUQseUNBQXlDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBZ0s1RCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBMGpCNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFjLEVBQUUsT0FBZ0I7UUFDeEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsRSxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLCtCQUErQixDQUNyRyxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBeGpCRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksRUFBRTtRQUNGLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxPQUFPO1FBQ2QsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQWtCRCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWMsRUFBRSxPQUFnQjtRQUU1QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsS0FBSyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDN0M7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsT0FBTyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDakQ7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUMvQyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRTNELE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM5QixNQUFNLElBQUksS0FBSyxDQUNYLFNBQ0ksSUFBSSxDQUFDLElBQ1Qsa0RBQWtELEtBQUssSUFBSSxPQUFPLG1FQUFtRSxNQUFNLENBQUMsSUFBSSxDQUM1SSxNQUFNLENBQ1QsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FDeEIsQ0FBQztRQUNOLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUN0RCxLQUFLLEVBQ0wsT0FBTyxDQUNWLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQixFQUFFO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDMUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRFLE1BQU0sQ0FBQyxHQUFHLE9BQU8sYUFBYSxPQUFPO2FBQ2hDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2FBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUN0QyxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsTUFBTSxDQUFDLHVCQUF1QixDQUMxQixRQUFhLEVBQ2IsUUFBNEM7UUFFNUMsTUFBTSxhQUFhLEdBQTZCLFdBQVcsQ0FDdkQ7WUFDSSxPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxFQUFFO1NBQ1gsRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25DLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU87WUFDdkQsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUVuRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUUvQixJQUNJLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTTtnQkFDNUIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUUxQyxPQUFPO1lBQ1gsSUFDSSxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU07Z0JBQ3pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFdkMsT0FBTztZQUVYLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBRW5CLElBQUksS0FBSyxFQUFFLFFBQVEsQ0FBQztZQUVwQixRQUFRLElBQUksRUFBRTtnQkFDVixLQUFLLGFBQWE7b0JBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDakQsTUFBTTtnQkFDVixLQUFLLFdBQVc7b0JBQ1osVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDL0MsTUFBTTtnQkFDVixLQUFLLE9BQU87b0JBQ1IsS0FBSyxHQUFHLEtBQUssQ0FBQztvQkFDZCxRQUFRLEdBQUcsRUFBRSxDQUFDO29CQUNkLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDdkI7b0JBQ0QsVUFBVSxDQUFDLElBQUksQ0FDWCxzQkFBc0IsS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUMvQyxDQUFDO29CQUNGLE1BQU07Z0JBQ1YsS0FBSyxrQkFBa0I7b0JBQ25CLEtBQUssR0FBRyxLQUFLLENBQUM7b0JBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQztvQkFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ3RCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZCO29CQUNELFVBQVUsQ0FBQyxJQUFJLENBQ1gsaUNBQWlDLEtBQUssS0FBSyxRQUFRLElBQUksQ0FDMUQsQ0FBQztvQkFDRixNQUFNO2dCQUNWLEtBQUssZUFBZSxDQUFDO2dCQUNyQixLQUFLLHdCQUF3QixDQUFDO2dCQUM5QixLQUFLLHlCQUF5QixDQUFDO2dCQUMvQixLQUFLLDRCQUE0QixDQUFDO2dCQUNsQyxLQUFLLDJCQUEyQjtvQkFDNUIsVUFBVSxDQUFDLElBQUksQ0FDWCxzQ0FBc0MsS0FBSyxJQUFJLENBQ2xELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FDWCxvQ0FBb0MsS0FBSyxJQUFJLENBQ2hELENBQUM7b0JBQ0YsTUFBTTtnQkFDVixLQUFLLFlBQVk7b0JBQ2IsVUFBVSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDM0QsTUFBTTtnQkFDVixLQUFLLGVBQWUsQ0FBQztnQkFDckIsS0FBSyxjQUFjLENBQUM7Z0JBQ3BCLEtBQUsscUJBQXFCLENBQUM7Z0JBQzNCLEtBQUssbUJBQW1CLENBQUM7Z0JBQ3pCLEtBQUssb0JBQW9CLENBQUM7Z0JBQzFCLEtBQUssa0JBQWtCLENBQUM7Z0JBQ3hCLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLGVBQWUsQ0FBQztnQkFDckIsS0FBSyxhQUFhLENBQUM7Z0JBQ25CLEtBQUssY0FBYztvQkFDZixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDcEQsTUFBTTtnQkFDVixLQUFLLGdCQUFnQixDQUFDO2dCQUN0QixLQUFLLGVBQWUsQ0FBQztnQkFDckIsS0FBSyxzQkFBc0IsQ0FBQztnQkFDNUIsS0FBSyxvQkFBb0IsQ0FBQztnQkFDMUIsS0FBSyxxQkFBcUIsQ0FBQztnQkFDM0IsS0FBSyxtQkFBbUIsQ0FBQztnQkFDekIsS0FBSyxTQUFTLENBQUM7Z0JBQ2YsS0FBSyxhQUFhLENBQUM7Z0JBQ25CLEtBQUssZ0JBQWdCLENBQUM7Z0JBQ3RCLEtBQUssY0FBYyxDQUFDO2dCQUNwQixLQUFLLGVBQWU7b0JBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLG1CQUFtQixLQUFLLElBQUksQ0FBQyxDQUFDO29CQUNyRCxNQUFNO2dCQUNWLEtBQUssT0FBTztvQkFDUixVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDO29CQUMzQyxNQUFNO2dCQUNWLEtBQUssZUFBZTtvQkFDaEIsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQztvQkFDM0MsTUFBTTtnQkFDVjtvQkFDSSxNQUFNLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxHQUFHLENBQUM7b0JBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUUsT0FBTztvQkFDdkMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO29CQUN0QyxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUN6QyxNQUFNLE1BQU0sR0FBNEI7WUFDcEMsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO1FBRUYsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxHQUFHO2dCQUNWLG1CQUFtQixJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdkMsbUJBQW1CLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN2QyxtQkFBbUIsSUFBSSxPQUFPLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZDLG1CQUFtQixJQUFJLE9BQU8sS0FBSyxDQUFDLENBQUMsRUFBRTthQUMxQyxDQUFDO1lBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxVQUFVLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNLENBQUMsVUFBVSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVEO2FBQU07WUFFSCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFDcEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLFdBQVcsS0FBSyxjQUFjO2dCQUFFLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDL0QsSUFBSSxhQUFhLEtBQUssZ0JBQWdCO2dCQUFFLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztZQUVyRSxJQUFJLFlBQVksR0FBRyxtQkFBbUIsYUFBYSxFQUFFLEVBQ2pELFVBQVUsR0FBRyxtQkFBbUIsV0FBVyxFQUFFLENBQUM7WUFFbEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO29CQUMvQixJQUFJLGNBQWMsRUFBRTt3QkFDaEIsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLGNBQWMsRUFBRTs0QkFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLDJCQUEyQixVQUFVLElBQUksUUFBUSxDQUFDLE9BQU8seUJBQXlCLENBQ3BHLENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksb0JBQW9CLENBQUMsR0FBRyxPQUFPLFVBQVUsSUFBSSxRQUFRLENBQUMsT0FBTyx3QkFBd0IsQ0FBQzs0QkFDdkgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLDBCQUEwQixVQUFVLElBQUksUUFBUSxDQUFDLE9BQU8sd0JBQXdCLENBQ2xHLENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksbUJBQW1CLENBQUMsR0FBRyxPQUFPLFVBQVUsSUFBSSxRQUFRLENBQUMsT0FBTyx1QkFBdUIsQ0FBQzs0QkFDckgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLFdBQVcsVUFBVSxTQUFTLENBQ2hELENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEdBQUcsT0FBTyxVQUFVLFFBQVEsQ0FBQzt5QkFDdEU7cUJBQ0o7eUJBQU07d0JBQ0gsSUFDSSxDQUFDLFFBQVEsQ0FBQyxLQUFLOzRCQUNmLENBQUMsUUFBUSxDQUFDLE9BQU87NEJBQ2pCLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUN0Qjs0QkFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksV0FBVyxVQUFVLE1BQU0sQ0FBQyxDQUFDOzRCQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWSxJQUFJLENBQUMsR0FBRyxPQUFPLFVBQVUsS0FBSyxDQUFDOzRCQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksV0FBVyxVQUFVLE1BQU0sQ0FBQyxDQUFDOzRCQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWSxJQUFJLENBQUMsR0FBRyxPQUFPLFVBQVUsS0FBSyxDQUFDOzRCQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksV0FBVyxVQUFVLE1BQU0sQ0FBQyxDQUFDOzRCQUM3RCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWSxJQUFJLENBQUMsR0FBRyxPQUFPLFVBQVUsS0FBSyxDQUFDO3lCQUNuRTs2QkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7NEJBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsWUFBWSxJQUFJLFFBQVEsQ0FBQyxPQUFPLDJCQUEyQixVQUFVLElBQUksUUFBUSxDQUFDLE9BQU8seUJBQXlCLENBQ3hILENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsT0FBTyxvQkFBb0IsQ0FBQyxHQUFHLE9BQU8sVUFBVSxJQUFJLFFBQVEsQ0FBQyxPQUFPLHdCQUF3QixDQUFDOzRCQUMzSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsT0FBTywwQkFBMEIsVUFBVSxJQUFJLFFBQVEsQ0FBQyxPQUFPLHdCQUF3QixDQUN0SCxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxZQUFZLElBQUksUUFBUSxDQUFDLE9BQU8sbUJBQW1CLENBQUMsR0FBRyxPQUFPLFVBQVUsSUFBSSxRQUFRLENBQUMsT0FBTyx1QkFBdUIsQ0FBQzs0QkFDekksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLFdBQVcsVUFBVSxTQUFTLENBQ2hELENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEdBQUcsT0FBTyxVQUFVLFFBQVEsQ0FBQzt5QkFDdEU7cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWMsRUFBRSxPQUFnQjtRQUM3QyxhQUFhO1FBRWIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGFBQWE7WUFDZCxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxLQUFLLElBQUksT0FBTywrQkFBK0IsQ0FDNUYsQ0FBQztRQUVOLHFEQUFxRDtRQUVyRCxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7UUFFeEIsZ0JBQWdCO1FBQ2hCLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNwQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUU3QyxPQUFPO1lBQ1AscUJBQXFCO1lBQ3JCLG9DQUFvQztZQUNwQyxxQ0FBcUM7WUFDckMsZUFBZTtZQUNmLElBQUk7WUFDSixjQUFjO1lBRWQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksY0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLGNBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxjQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksY0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDL0Q7aUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5QixJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO29CQUN6QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsWUFBWSx1QkFBdUIsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FDbkUsQ0FBQztpQkFDTDtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO29CQUNsQyxJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsWUFBWSx1QkFDWCxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQ2pDLEdBQUcsQ0FDTixDQUFDO2lCQUNMO3FCQUFNO29CQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLHdCQUF3QixDQUFDLENBQUM7aUJBQ3REO2dCQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7b0JBQ3hCLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxZQUFZLHNCQUFzQixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUNqRSxDQUFDO2lCQUNMO3FCQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7b0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxZQUFZLHNCQUNYLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDN0IsR0FBRyxDQUNOLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksdUJBQXVCLENBQUMsQ0FBQztpQkFDckQ7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxFQUFFO29CQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFDNUQ7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDdkMsRUFBRSxFQUNGLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQzVCLENBQUM7UUFDRixPQUFPLHFCQUFxQixDQUFDLEtBQUssQ0FBQztRQUNuQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV4RCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3hDLG9FQUFvRTtZQUVwRSxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsTUFBTSxNQUFNLEdBQUcsR0FBRztpQkFDYixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztpQkFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7aUJBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2lCQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLElBQUksUUFBUSxHQUFHLGFBQWEsTUFBTSxFQUFFLENBQUM7WUFFckMsSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsTUFBTSxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNyRDtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBZSxFQUFFLEtBQWMsRUFBRSxPQUFnQjtRQUMzRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvQyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBYSxFQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSTtRQUN0RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEQsYUFBYTtZQUNiLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7SUF5QkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxNQUFNO1FBQ04sT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxJQUFJLE9BQU87UUFDUCxhQUFhO1FBQ2IsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU87UUFDVixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw0Q0FBNEMsSUFBSSxDQUFDLEVBQUUsa0NBQWtDLE9BQU8sNkJBQTZCLENBQzFKLENBQUM7U0FDTDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxJQUFJLENBQUMsVUFBa0IsRUFBRTtRQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWTtRQUNSLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxVQUFVO1FBQ04sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzlDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztnQkFBRSxPQUFPO1lBQzVCLE1BQU0sQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0JBQ1QsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO2dCQUNyQixRQUFRLEVBQUUsbUJBQW1CLEtBQUssRUFBRTtnQkFDcEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1QsQ0FBQztRQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDRyxZQUFZLENBQ2QsUUFBcUM7O1lBRXJDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkMsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDO1lBRTFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFOztnQkFDNUMsSUFBSSxhQUFhO29CQUFFLE9BQU87Z0JBQzFCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFFdEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBQSxRQUFRLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFFbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7b0JBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQ1gsaUNBQWlDLFNBQVMscUZBQXFGLENBQ2xJLENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV2QyxRQUFRLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsYUFBYTtvQkFDYixLQUFLLEVBQUU7d0JBQ0gsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLO3dCQUNyQixRQUFRLEVBQUUsbUJBQW1CLFNBQVMsRUFBRTt3QkFDeEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNUO2lCQUNKLENBQUMsQ0FBQztnQkFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0MsSUFBSSxhQUFhO3dCQUFFLE9BQU87b0JBQzFCLE1BQU0saUJBQWlCLEdBQUcsU0FBUyxDQUFDO29CQUVwQyxJQUFJLFNBQVMsS0FBSyxTQUFTO3dCQUFFLFNBQVMsR0FBRyxVQUFVLENBQUM7b0JBRXBELElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDdkQsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ2pELEdBQUcsQ0FBQztvQkFFUixJQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUMvQixFQUFFLEVBQ0YsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQzlCLENBQUM7b0JBQ0YsSUFBSSxLQUFLLEtBQUssU0FBUzt3QkFDbkIsZUFBZSxtQ0FDUixlQUFlLEdBQ2YsZUFBZSxDQUNyQixDQUFDO29CQUVOLElBQUksU0FBUyxLQUFLLE9BQU8sRUFBRTtxQkFDMUI7eUJBQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOzRCQUM3QyxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUNwQixlQUFlLENBQUMsT0FBTyxDQUFDLEVBQ3hCLElBQUksQ0FDUCxDQUFDOzRCQUNGLEdBQUcsR0FBRyxRQUFRLENBQTJCO2dDQUNyQyxJQUFJLEVBQUUsU0FBUztnQ0FDZixLQUFLLEVBQUUsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLO2dDQUN2QyxPQUFPO2dDQUNQLEtBQUssZ0NBQ0QsUUFBUSxFQUNKLEtBQUssSUFBSSxLQUFLLEtBQUssU0FBUzt3Q0FDeEIsQ0FBQyxDQUFDLG1CQUFtQixTQUFTLElBQUksS0FBSyxJQUFJLE9BQU8sRUFBRTt3Q0FDcEQsQ0FBQyxDQUFDLG1CQUFtQixTQUFTLElBQUksT0FBTyxFQUFFLElBQ2hELGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FDM0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQ2hCOzZCQUNKLENBQUMsQ0FBQzs0QkFDSCxJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUM3QixhQUFhLEdBQUcsSUFBSSxDQUFDOzZCQUN4Qjt3QkFDTCxDQUFDLENBQUMsQ0FBQztxQkFDTjt5QkFBTTt3QkFDSCxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFDaEQsR0FBRyxHQUFHLFFBQVEsQ0FBMkI7NEJBQ3JDLElBQUksRUFBRSxTQUFTOzRCQUNmLE9BQU87NEJBQ1AsS0FBSzs0QkFDTCxLQUFLLGdDQUNELFFBQVEsRUFBRSxLQUFLO29DQUNYLENBQUMsQ0FBQyxtQkFBbUIsU0FBUyxJQUFJLEtBQUssSUFBSSxPQUFPLEVBQUU7b0NBQ3BELENBQUMsQ0FBQyxtQkFBbUIsU0FBUyxJQUFJLE9BQU8sRUFBRSxJQUM1QyxlQUFlLEtBQ2xCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUNoQjt5QkFDSixDQUFDLENBQUM7d0JBQ0gsSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDN0IsYUFBYSxHQUFHLElBQUksQ0FBQzt5QkFDeEI7cUJBQ0o7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTs7QUFudkJEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0ksOEJBQW1CLEdBQStCLEVBQUUsQ0FBQyJ9