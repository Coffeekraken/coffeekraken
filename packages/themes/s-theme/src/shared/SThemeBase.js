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
     * @name                buildMediaQuery
     * @type                Function
     * @status              beta
     * @platform            js
     * @platform            node
     * @static
     *
     * This static method allows you to built a media query by passing args like "mobile", ">tablet", etc...
     *
     * @param               {String}    query    The media query you want to build
     * @return              {String}                The builded media query (without brackets)
     *
     * @since               2.0.0
     *
     */
    static buildMediaQuery(queryString) {
        const currentQueryList = [this.config('media.defaultQuery'), 'and'];
        const queryAr = queryString.split(' ').map(l => l.trim());
        queryAr.forEach((query, i) => {
            if (query === 'and' || query === 'or') {
                currentQueryList.push(query);
                return;
            }
            const firstChar = query.slice(0, 1);
            const firstTwoChar = query.slice(0, 2);
            const lastChar = query.slice(-1);
            let action = this.config('media.defaultAction');
            let mediaName = query;
            if (lastChar === '-' || lastChar === '|')
                mediaName = mediaName.slice(0, -1);
            if (firstTwoChar === '>=' ||
                firstTwoChar === '<=' ||
                firstTwoChar === '==') {
                mediaName = mediaName.slice(2);
                action = firstTwoChar;
            }
            else if (firstChar === '<' ||
                firstChar === '>' ||
                firstChar === '=') {
                mediaName = mediaName.slice(1);
                action = firstChar;
            }
            const mediaQueryConfig = this.config('media.queries')[mediaName];
            if (!mediaQueryConfig)
                throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this.config('media.queries'))
                    .map((l) => `<green>${l}</green>`)
                    .join(',')}`);
            const queryList = [];
            Object.keys(mediaQueryConfig).forEach((prop) => {
                const value = mediaQueryConfig[prop];
                if (!value)
                    return;
                if ([
                    'min-width',
                    'max-width',
                    'min-device-width',
                    'max-device-width',
                ].indexOf(prop) !== -1) {
                    if (action === '>') {
                        if (prop === 'max-width' || prop === 'max-device-width') {
                            let argName = 'min-width';
                            if (prop.includes('-device'))
                                argName = 'min-device-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    }
                    else if (action === '<') {
                        if (prop === 'min-width' || prop === 'min-device-width') {
                            let argName = 'max-width';
                            if (prop.includes('-device'))
                                argName = 'max-device-width';
                            queryList.push(`(${argName}: ${value}px)`);
                        }
                    }
                    else if (action === '=') {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                    else if (action === '>=') {
                        if (prop === 'min-width' || prop === 'min-device-width') {
                            queryList.push(`(${prop}: ${value}px)`);
                        }
                    }
                    else if (action === '<=') {
                        if (prop === 'max-width' || prop === 'max-device-width') {
                            queryList.push(`(${prop}: ${value}px)`);
                        }
                    }
                    else {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                }
                else {
                    queryList.push(`(${prop}: ${value}px)`);
                }
            });
            if (lastChar === '-') {
                queryList.push('(orientation: landscape)');
            }
            else if (lastChar === '|') {
                queryList.push('(orientation: portrait)');
            }
            currentQueryList.push(queryList.join(' and '));
        });
        return `@media ${currentQueryList.join(' ')}`;
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
            // media queries
            const medias = Object.keys(this.config('media.queries'));
            if (medias.includes(originalProp)) {
                propsStack.push(`@sugar.media(${prop.replace(/^@/, '')}) {`);
                propsStack.push(this.jsObjectToCssProperties(value, finalSettings));
                propsStack.push(`}`);
            }
            else {
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
     * @name        loopOnColors
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RoZW1lQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNUaGVtZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFDMUQsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFDMUQseUNBQXlDO0FBQ3pDLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBZ0s1RCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBK3BCNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFjLEVBQUUsT0FBZ0I7UUFDeEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRVYsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNsRSxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxJQUFJLENBQUMsSUFBSSxJQUFJ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