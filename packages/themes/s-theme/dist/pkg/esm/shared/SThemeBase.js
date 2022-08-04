var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __get from '@coffeekraken/sugar/shared/object/get';
import __set from '@coffeekraken/sugar/shared/object/set';
// import __micromatch from 'micromatch';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __compressVarName from '@coffeekraken/sugar/shared/css/compressVarName';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __knownCssProperties from 'known-css-properties';
import __objectHash from 'object-hash';
export default class SThemeBase extends __SEventEmitter {
    /**
     * @name        constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(theme, variant) {
        super({});
        /**
         * @name        _overridedConfig
         * @type        Any
         * @private
         *
         * Store the configs that have been overrided by using the `set` method
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._overridedConfig = {};
        this.theme = theme !== null && theme !== void 0 ? theme : __SSugarConfig.get('theme.theme');
        this.variant = variant !== null && variant !== void 0 ? variant : __SSugarConfig.get('theme.variant');
        if (!__SSugarConfig.get(`theme.themes.${this.theme}-${this.variant}`)) {
            throw new Error(`Sorry but the requested theme "<yellow>${this.theme}-${this.variant}</yellow>" does not exists...`);
        }
    }
    /**
     * @name            id
     * @type            String
     *
     * Store the computed theme id builded from the theme name and theme variant
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get id() {
        return `${this.theme}-${this.variant}`;
    }
    /**
     * @name      theme
     * @type      String
     * @static
     *
     * Store the current theme setted in the config.theme namespace
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get variant() {
        return __SSugarConfig.get('theme.variant');
    }
    /**
     * @name      themesNames
     * @type      Object
     * @static
     *
     * Access the defined themes names
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get themesNames() {
        return Object.keys(__SSugarConfig.get('theme.themes'));
    }
    /**
     * @name            isDarkMode
     * @type            Function
     * @static
     *
     * This method returns true if the theme variant is dark, false if not
     *
     * @return      {Boolean}               true if variant is dark, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDark() {
        return this.variant === 'dark';
    }
    /**
     * @name            getThemeMetas
     * @type            Function
     * @static
     *
     * This method allows you to get the theme metas like "name", "theme" and "variant" from the passed HTMLElement
     *
     * @return      {any}                               The theme metas object containing the "name", "theme" and "variant" properties
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getThemeMetas() {
        var _a;
        let defaultTheme = __SSugarConfig.get('theme.theme'), defaultVariant = __SSugarConfig.get('theme.variant');
        let theme = defaultTheme, variant = defaultVariant;
        const metas = (_a = __SSugarConfig.get(`theme.themes.${theme}-${variant}.metas`)) !== null && _a !== void 0 ? _a : {};
        return __deepMerge({
            name: `${theme !== null && theme !== void 0 ? theme : defaultTheme}-${variant !== null && variant !== void 0 ? variant : defaultVariant}`,
            theme: theme !== null && theme !== void 0 ? theme : defaultTheme,
            variant: variant !== null && variant !== void 0 ? variant : defaultVariant,
        }, metas);
    }
    /**
     * @name      themes
     * @type      Object
     * @static
     *
     * Access the defined themes
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get themes() {
        var _a, _b;
        const themes = __SSugarConfig.get('theme.themes');
        const returnedThemes = {};
        for (let [themeName, themeObj] of Object.entries(themes)) {
            const parts = themeName.split('-'), name = parts[0], variant = (_a = parts[1]) !== null && _a !== void 0 ? _a : 'light';
            if (!returnedThemes[name]) {
                returnedThemes[name] = {
                    metas: (_b = themeObj.metas) !== null && _b !== void 0 ? _b : {},
                    variants: {},
                };
            }
            if (!returnedThemes[name].variants[variant]) {
                returnedThemes[name].variants[variant] = themeObj;
            }
        }
        return returnedThemes;
    }
    static getTheme(theme, variant) {
        const themesNames = Object.keys(__SSugarConfig.get('theme.themes'));
        if (!theme) {
            theme = __SSugarConfig.get('theme.theme');
        }
        if (!variant) {
            variant = __SSugarConfig.get('theme.variant');
        }
        if (!themesNames.includes(`${theme}-${variant}`)) {
            theme = __SSugarConfig.get('theme.theme');
            variant = __SSugarConfig.get('theme.variant');
        }
        if (this._instanciatedThemes[`${theme}-${variant}`]) {
            return this._instanciatedThemes[`${theme}-${variant}`];
        }
        if (!themesNames[`${theme}-${variant}`]) {
            this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant);
        }
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
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static hash(dotPath = '') {
        const config = this.get(dotPath);
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
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static cssVar(dotPath, fallback = true) {
        let fb = this.getTheme().get(dotPath);
        if (!fallback || (typeof fb === 'string' && fb.includes(',')))
            fb = 0;
        const v = `var(${__compressVarName(`--s-theme-${dotPath
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-')}`)}, ${fb})`;
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
        let currentQueryList = [];
        const queryAr = queryString
            .split(' ')
            .map((l) => l.trim())
            .filter((l) => l !== '');
        queryAr.forEach((query, i) => {
            if (query === 'and' || query === 'or') {
                currentQueryList.push(query);
                return;
            }
            const firstChar = query.slice(0, 1);
            const firstTwoChar = query.slice(0, 2);
            const lastChar = query.slice(-1);
            let action = this.get('media.defaultAction');
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
            const mediaQueryConfig = this.get('media.queries')[mediaName];
            if (!mediaQueryConfig)
                throw new Error(`<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(this.get('media.queries'))
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
                        if (prop === 'max-width' ||
                            prop === 'max-device-width') {
                            let argName = 'min-width';
                            if (prop.includes('-device'))
                                argName = 'min-device-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    }
                    else if (action === '<') {
                        if (prop === 'min-width' ||
                            prop === 'min-device-width') {
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
                        if (prop === 'min-width' ||
                            prop === 'min-device-width') {
                            queryList.push(`(${prop}: ${value}px)`);
                        }
                    }
                    else if (action === '<=') {
                        if (prop === 'max-width' ||
                            prop === 'max-device-width') {
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
        currentQueryList = currentQueryList.filter((l) => l.trim() !== '');
        if (currentQueryList.length) {
            currentQueryList.unshift('and');
        }
        currentQueryList.unshift(this.get('media.defaultQuery'));
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
     * @return          {String}                            The processed css string
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            const medias = Object.keys(this.get('media.queries'));
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
    static jsConfigObjectToCssProperties(obj) {
        let vars = [];
        for (let [key, value] of Object.entries(__flatten(obj))) {
            if (__isColor(value)) {
                const color = key.match(/^color\.([a-zA-Z0-9]+)\./);
                if (!(color === null || color === void 0 ? void 0 : color[1]))
                    continue;
                const props = this.remapCssColor(color[1], value);
                vars = [...vars, ...props.vars];
            }
            const varKey = key
                .replace(/\./gm, '-')
                .replace(/:/gm, '-')
                .replace(/\?/gm, '')
                .replace(/--/gm, '-');
            let variable = __compressVarName(`--s-theme-${varKey}`);
            if (`${value}`.match(/:/)) {
                vars.push(`${variable}: "${value}";`);
            }
            else {
                vars.push(`${variable}: ${value};`);
            }
        }
        return vars;
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
     * @return          {String}                            The generated css variables string
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static remapCssColor(from, to) {
        const result = {
            vars: [],
            properties: {},
        };
        if (__isColor(to)) {
            const color = new __SColor(to);
            result.vars = [
                `${__compressVarName(`--s-theme-color-${from}-h`)}: ${color.h};`,
                `${__compressVarName(`--s-theme-color-${from}-s`)}: ${color.s};`,
                `${__compressVarName(`--s-theme-color-${from}-l`)}: ${color.l};`,
                `${__compressVarName(`--s-theme-color-${from}-a`)}: ${color.a};`,
            ];
            result.properties[__compressVarName(`--s-theme-color-${from}-h`)] =
                color.h;
            result.properties[__compressVarName(`--s-theme-color-${from}-s`)] =
                color.s;
            result.properties[__compressVarName(`--s-theme-color-${from}-l`)] =
                color.l;
            result.properties[__compressVarName(`--s-theme-color-${from}-a`)] =
                color.a;
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
                        if (colorObj.schema === toColorVariant) {
                            result.vars.push(`${__compressVarName(`${fromVariable}-saturation-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
                            result.properties[`${__compressVarName(`${fromVariable}-saturation-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
                            result.vars.push(`${__compressVarName(`${fromVariable}-lightness-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
                            result.properties[`${__compressVarName(`${fromVariable}-lightness-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
                            result.vars.push(`${__compressVarName(`${fromVariable}-a`)}: var(${__compressVarName(`${toVariable}-a`)}, 1);`);
                            result.properties[`${__compressVarName(`${fromVariable}-a`)}`] = `var(${__compressVarName(`${toVariable}-a`)}, 1)`;
                        }
                    }
                    else {
                        if (!colorObj.schema && colorObj.value.color) {
                            result.vars.push(`${__compressVarName(`${fromVariable}-h`)}: var(${__compressVarName(`${toVariable}-h`)});`);
                            result.properties[`${__compressVarName(`${fromVariable}-h`)}`] = `var(${__compressVarName(`${toVariable}-h`)})`;
                            result.vars.push(`${__compressVarName(`${fromVariable}-s`)}: var(${__compressVarName(`${toVariable}-s`)});`);
                            result.properties[`${__compressVarName(`${fromVariable}-s`)}`] = `var(${__compressVarName(`${toVariable}-s`)})`;
                            result.vars.push(`${__compressVarName(`${fromVariable}-l`)}: var(${__compressVarName(`${toVariable}-l`)});`);
                            result.properties[`${__compressVarName(`${fromVariable}-l`)}`] = `var(${__compressVarName(`${toVariable}-l`)})`;
                        }
                        else {
                            result.vars.push(`${__compressVarName(`${fromVariable}-${colorObj.schema}-saturation-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
                            result.properties[`${__compressVarName(`${fromVariable}-${colorObj.schema}-saturation-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
                            result.vars.push(`${__compressVarName(`${fromVariable}-${colorObj.schema}-lightness-offset`)}: var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
                            result.properties[`${__compressVarName(`${fromVariable}-${colorObj.schema}-lightness-offset`)}`] = `var(${__compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
                            result.vars.push(`${__compressVarName(`${fromVariable}-a: var(${toVariable}-a`)}, 1);`);
                            result.properties[`${__compressVarName(`${fromVariable}-a`)}`] = `var(${__compressVarName(`${toVariable}-a`)}, 1)`;
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
     * @param       {String}        theme           The theme name you want to transform
     * @param       {String}        variant         The theme variant you want to transform
     * @return      {String}                        The converted css variables string
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static toCssVars(theme, variant) {
        // @ts-ignore
        const themeInstance = this.getTheme(theme, variant);
        if (!themeInstance)
            throw new Error(`Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`);
        let vars = [];
        // handle colors
        themeInstance.loopOnColors((colorObj) => {
            const baseVariable = colorObj.value.variable;
            if (!colorObj.schema && colorObj.value.color) {
                vars.push(`${__compressVarName(`${baseVariable}-h`)}: ${colorObj.value.h};`);
                vars.push(`${__compressVarName(`${baseVariable}-s`)}: ${colorObj.value.s};`);
                vars.push(`${__compressVarName(`${baseVariable}-l`)}: ${colorObj.value.l};`);
                vars.push(`${__compressVarName(`${baseVariable}-a`)}: ${colorObj.value.a};`);
                vars.push(`${__compressVarName(`${baseVariable}-origin-h`)}: ${colorObj.value.h};`);
                vars.push(`${__compressVarName(`${baseVariable}-origin-s`)}: ${colorObj.value.s};`);
                vars.push(`${__compressVarName(`${baseVariable}-origin-l`)}: ${colorObj.value.l};`);
                vars.push(`${__compressVarName(`${baseVariable}-origin-a`)}: ${colorObj.value.a};`);
            }
            else if (colorObj.schema) {
                if (colorObj.value.saturate) {
                    vars.push(`${__compressVarName(`${baseVariable}-saturation-offset`)}: ${colorObj.value.saturate};`);
                }
                else if (colorObj.value.desaturate) {
                    vars.push(`${__compressVarName(`${baseVariable}-saturation-offset`)}: ${colorObj.value.desaturate * -1};`);
                }
                else {
                    vars.push(`${__compressVarName(`${baseVariable}-saturation-offset`)}: 0;`);
                }
                if (colorObj.value.lighten) {
                    vars.push(`${__compressVarName(`${baseVariable}-lightness-offset`)}: ${colorObj.value.lighten};`);
                }
                else if (colorObj.value.darken) {
                    vars.push(`${__compressVarName(`${baseVariable}-lightness-offset`)}: ${colorObj.value.darken * -1};`);
                }
                else {
                    vars.push(`${__compressVarName(`${baseVariable}-lightness-offset`)}: 0;`);
                }
                if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                    vars.push(`${__compressVarName(`${baseVariable}-a`)}: ${colorObj.value.alpha};`);
                }
            }
        });
        // others than colors
        const themeObjWithoutColors = Object.assign({}, themeInstance.get('.'));
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
                vars.push(`${__compressVarName(`${variable}`)}: "${flattenedTheme[key]}";`);
            }
            else {
                vars.push(`${__compressVarName(`${variable}`)}: ${flattenedTheme[key]};`);
            }
        });
        return vars;
    }
    /**
     * @name            getSafe
     * @type            Function
     * @static
     *
     * This static method allows you to access the active theme config without throwing an error if it not exists
     *
     * @param       {String}        dotPath           The dot path of the config you want
     * @return      {any}                        The getted theme config
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getSafe(dotPath, theme, variant) {
        const instance = this.getTheme(theme, variant);
        return instance.get(dotPath, true);
    }
    /**
     * @name            get
     * @type            Function
     * @static
     *
     * This static method allows you to access the active theme config
     *
     * @param       {String}        dotPath           The dot path of the config you want
     * @return      {any}                        The getted theme config
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotPath, theme, variant) {
        const instance = this.getTheme(theme, variant);
        return instance.get(dotPath);
    }
    /**
     * @name            set
     * @type            Function
     * @static
     *
     * This static method allows you to set values of the active theme config
     *
     * @param       {String}        dotPath           The dot path of the config you want to set
     * @param       {any}         value             The value you want to set
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static set(dotPath, value, theme, variant) {
        const instance = this.getTheme(theme, variant);
        return instance.set(dotPath, value);
    }
    /**
     * @name        themes
     * @type        String
     * @get
     *
     * Store the themes configuration
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get themes() {
        return __SSugarConfig.get('theme.themes');
    }
    get _config() {
        if (this._cachedConfig) {
            return this._cachedConfig;
        }
        // @ts-ignore
        this._cachedConfig = Object.assign({}, __deepMerge(__SSugarConfig.get('theme.themes')[this.id], this._overridedConfig));
        return this._cachedConfig;
    }
    get(dotPath, preventThrow = false) {
        const value = __get(this._config, dotPath);
        if (value === undefined && !preventThrow) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.id}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`);
        }
        return value;
    }
    /**
     * @name            getOverridedConfig
     * @type            any
     *
     * This method allows you to get the overrided config of the current theme.
     * These configs are the ones that are overrided by the use of the `set` method.
     *
     * @return         {Any}                           The overrided config of the current theme
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getOverridedConfig() {
        return this._overridedConfig;
    }
    /**
     * @name            emitSavedEvent
     * @type            Function
     *
     * This method simply emit a "saved" event on the theme instance with details like the overrifed config.
     *
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    emitSavedEvent() {
        // emit event
        // @ts-ignore
        this.emit('saved', {
            theme: this.theme,
            variant: this.variant,
            overridedConfig: Object.assign({}, this._overridedConfig),
        });
        // maintain chainability
        return this;
    }
    /**
     * @name            hash
     * @type            String
     *
     * This hash accessor gives you access to the actual theme configuration hash.
     * You can specify a dot path to get the hash of a sub configuration
     *
     * @param           {String}            [dotPath='']            The dot path of the config you want to hash
     * @return          {String}                                    The generated hash for this config
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    hash(dotPath = '') {
        const config = this.get(dotPath);
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    themesConfig() {
        return __SSugarConfig.get('theme');
    }
    /**
     * @name            set
     * @type            Function
     *
     * This method allows you to set a value of the current theme.
     * Specify the value you want to set using the dotPath syntax like "color.accent.color", etc...
     *
     * @param       {String}        dotPath           The dot path of the config you want to set
     * @param       {any}           value               The value you want to set
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    set(dotPath, value) {
        // set the value in the orverrided config stack
        __set(this._overridedConfig, dotPath, value);
        // emit an "update" event
        // @ts-ignore
        this.emit('update', {
            dotPath,
            value,
        });
        // maintain chainability
        return this;
    }
    /**
     * @name            restore
     * @type            Function
     *
     * This method allows you to restore some configs by merging the passed ones with the overrided configs.
     *
     * @param       {any}           configs             The configs you want to restore
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    restore(configs) {
        // restoring the overrided values
        this._overridedConfig = __deepMerge(this._overridedConfig, configs !== null && configs !== void 0 ? configs : {});
        // emit an "update" event
        // @ts-ignore
        this.emit('restored', {
            overridedConfigs: Object.assign({}, this._overridedConfig),
        });
        // maintain chainability
        return this;
    }
    /**
     * @name            clear
     * @type            Function
     *
     * This method allows you to clear the overrided configs and restore the default ones.
     *
     * @return      {STheme}                        The current theme instance
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    clear() {
        // restoring the overrided values
        this._overridedConfig = {};
        // maintain chainability
        return this;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    baseColors() {
        const map = {};
        for (let [colorName, colorValue] of Object.entries(this.get('color'))) {
            const c = new __SColor(colorValue);
            map[colorName] = {
                color: colorValue,
                variable: __compressVarName(`--s-theme-color-${colorName}`),
                r: c.r,
                g: c.g,
                b: c.b,
                h: c.h,
                s: c.s,
                l: c.l,
                a: c.a,
            };
        }
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
     * - name       {String}        The name of the color like "accent", "complementary", etc...
     * - schema    {String}        The name of the variant like "background", "surface", etc...
     * - value      {ISThemeColor | ISThemeColorModifiers}        The actual color object
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loopOnColors(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const colorsObj = this.get('color'), colorSchemasObj = this.get('colorSchema');
            // let triggeredStop = false;
            for (let [colorName, colorValue] of Object.entries(colorsObj)) {
                // if (triggeredStop) return;
                // const defaultColorObj = Object.assign({}, colorObj.default ?? {});
                // if (!colorObj.color) {
                //     throw new Error(
                //         `Sorry but your color "<yellow>${colorName}</yellow>" does not provide a "<cyan>color</cyan>" property and this is required...`,
                //     );
                // }
                const c = new __SColor(colorValue);
                const _res = callback({
                    name: colorName,
                    schema: '',
                    // @ts-ignore
                    value: {
                        color: colorValue,
                        variable: __compressVarName(`--s-theme-color-${colorName}`),
                        r: c.r,
                        g: c.g,
                        b: c.b,
                        h: c.h,
                        s: c.s,
                        l: c.l,
                        a: c.a,
                    },
                });
                for (let [schemaName, schemaObj] of Object.entries(colorSchemasObj)) {
                    const newColor = c.apply(schemaObj, true);
                    const res = callback({
                        name: colorName,
                        schema: schemaName,
                        value: Object.assign(Object.assign({ variable: __compressVarName(`--s-theme-color-${colorName}-${schemaName}`) }, schemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
                    });
                    // @ts-ignore
                    if (schemaObj.color) {
                        for (let [colorSchemaColorName, colorSchemaObj,
                        // @ts-ignore
                        ] of Object.entries(schemaObj.color)) {
                            if (colorSchemaColorName !== colorName)
                                continue;
                            const newColor = c.apply(colorSchemaObj, true);
                            callback({
                                name: colorSchemaColorName,
                                schema: schemaName,
                                value: Object.assign(Object.assign({ variable: __compressVarName(`--s-theme-color-${colorSchemaColorName}-${schemaName}`) }, colorSchemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
                            });
                        }
                    }
                }
            }
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SThemeBase._instanciatedThemes = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELE9BQU8sS0FBSyxNQUFNLHVDQUF1QyxDQUFDO0FBQzFELHlDQUF5QztBQUN6QyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGlCQUFpQixNQUFNLGdEQUFnRCxDQUFDO0FBQy9FLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBK0p2QyxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBbytCbkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxLQUFjLEVBQUUsT0FBZ0I7UUFDeEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBeDlCZDs7Ozs7Ozs7O1dBU0c7UUFDSyxxQkFBZ0IsR0FBUSxFQUFFLENBQUM7UUFnOUIvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ25FLE1BQU0sSUFBSSxLQUFLLENBQ1gsMENBQTBDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sK0JBQStCLENBQ3RHLENBQUM7U0FDTDtJQUNMLENBQUM7SUF0OUJEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxFQUFFO1FBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLE9BQU87UUFDZCxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE1BQU0sQ0FBQyxhQUFhOztRQUNoQixJQUFJLFlBQVksR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNoRCxjQUFjLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUV6RCxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQ3BCLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFFN0IsTUFBTSxLQUFLLEdBQ1AsTUFBQSxjQUFjLENBQUMsR0FBRyxDQUFDLGdCQUFnQixLQUFLLElBQUksT0FBTyxRQUFRLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBRXZFLE9BQU8sV0FBVyxDQUNkO1lBQ0ksSUFBSSxFQUFFLEdBQUcsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksWUFBWSxJQUFJLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLGNBQWMsRUFBRTtZQUM3RCxLQUFLLEVBQUUsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksWUFBWTtZQUM1QixPQUFPLEVBQUUsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksY0FBYztTQUNyQyxFQUNELEtBQUssQ0FDUixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxNQUFNOztRQUNiLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzlCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2YsT0FBTyxHQUFHLE1BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUNuQixLQUFLLEVBQUUsTUFBQSxRQUFRLENBQUMsS0FBSyxtQ0FBSSxFQUFFO29CQUMzQixRQUFRLEVBQUUsRUFBRTtpQkFDZixDQUFDO2FBQ0w7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDekMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDckQ7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFrQkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFjLEVBQUUsT0FBZ0I7UUFDNUMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNWLE9BQU8sR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2pEO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLElBQUksT0FBTyxFQUFFLENBQUMsRUFBRTtZQUM5QyxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQyxPQUFPLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDakQsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxLQUFLLElBQUksT0FBTyxFQUFFLENBQUMsQ0FBQztTQUMxRDtRQUVELElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLElBQUksT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxLQUFLLElBQUksT0FBTyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksQ0FDdEQsS0FBSyxFQUNMLE9BQU8sQ0FDVixDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFrQixFQUFFO1FBQzVCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFlLEVBQUUsUUFBUSxHQUFHLElBQUk7UUFDMUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRFLE1BQU0sQ0FBQyxHQUFHLE9BQU8saUJBQWlCLENBQzlCLGFBQWEsT0FBTzthQUNmLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2FBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FDOUIsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUNaLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBbUI7UUFDdEMsSUFBSSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUFFcEMsTUFBTSxPQUFPLEdBQUcsV0FBVzthQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFN0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QixJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtnQkFDbkMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixPQUFPO2FBQ1Y7WUFFRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN2QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRTdDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUV0QixJQUFJLFFBQVEsS0FBSyxHQUFHLElBQUksUUFBUSxLQUFLLEdBQUc7Z0JBQ3BDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXZDLElBQ0ksWUFBWSxLQUFLLElBQUk7Z0JBQ3JCLFlBQVksS0FBSyxJQUFJO2dCQUNyQixZQUFZLEtBQUssSUFBSSxFQUN2QjtnQkFDRSxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxHQUFHLFlBQVksQ0FBQzthQUN6QjtpQkFBTSxJQUNILFNBQVMsS0FBSyxHQUFHO2dCQUNqQixTQUFTLEtBQUssR0FBRztnQkFDakIsU0FBUyxLQUFLLEdBQUcsRUFDbkI7Z0JBQ0UsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sR0FBRyxTQUFTLENBQUM7YUFDdEI7WUFFRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQjtnQkFDakIsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRkFBZ0YsU0FBUywwRUFBMEUsTUFBTSxDQUFDLElBQUksQ0FDMUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FDNUI7cUJBQ0ksR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO3FCQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDbkIsQ0FBQztZQUVOLE1BQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztZQUUvQixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNDLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSztvQkFBRSxPQUFPO2dCQUVuQixJQUNJO29CQUNJLFdBQVc7b0JBQ1gsV0FBVztvQkFDWCxrQkFBa0I7b0JBQ2xCLGtCQUFrQjtpQkFDckIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3hCO29CQUNFLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTt3QkFDaEIsSUFDSSxJQUFJLEtBQUssV0FBVzs0QkFDcEIsSUFBSSxLQUFLLGtCQUFrQixFQUM3Qjs0QkFDRSxJQUFJLE9BQU8sR0FBRyxXQUFXLENBQUM7NEJBQzFCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7Z0NBQ3hCLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs0QkFDakMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sS0FBSyxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDbEQ7cUJBQ0o7eUJBQU0sSUFBSSxNQUFNLEtBQUssR0FBRyxFQUFFO3dCQUN2QixJQUNJLElBQUksS0FBSyxXQUFXOzRCQUNwQixJQUFJLEtBQUssa0JBQWtCLEVBQzdCOzRCQUNFLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQzs0QkFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztnQ0FDeEIsT0FBTyxHQUFHLGtCQUFrQixDQUFDOzRCQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUM7eUJBQzlDO3FCQUNKO3lCQUFNLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTt3QkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO3FCQUMzQzt5QkFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7d0JBQ3hCLElBQ0ksSUFBSSxLQUFLLFdBQVc7NEJBQ3BCLElBQUksS0FBSyxrQkFBa0IsRUFDN0I7NEJBQ0UsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO3lCQUMzQztxQkFDSjt5QkFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7d0JBQ3hCLElBQ0ksSUFBSSxLQUFLLFdBQVc7NEJBQ3BCLElBQUksS0FBSyxrQkFBa0IsRUFDN0I7NEJBQ0UsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO3lCQUMzQztxQkFDSjt5QkFBTTt3QkFDSCxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUM7cUJBQzNDO2lCQUNKO3FCQUFNO29CQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztpQkFDM0M7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtnQkFDbEIsU0FBUyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQzlDO2lCQUFNLElBQUksUUFBUSxLQUFLLEdBQUcsRUFBRTtnQkFDekIsU0FBUyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2FBQzdDO1lBRUQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLElBQUksZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQ3pCLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUNELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUV6RCxPQUFPLFVBQVUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxNQUFNLENBQUMsdUJBQXVCLENBQzFCLFFBQWEsRUFDYixRQUE0QztRQUU1QyxNQUFNLGFBQWEsR0FBNkIsV0FBVyxDQUN2RDtZQUNJLE9BQU8sRUFBRSxFQUFFO1lBQ1gsSUFBSSxFQUFFLEVBQUU7U0FDWCxFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQWEsRUFBRSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbkMsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTztZQUN2RCxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBRW5FLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztZQUMxQixJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRS9CLElBQ0ksYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2dCQUM1QixhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRTFDLE9BQU87WUFDWCxJQUNJLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTTtnQkFDekIsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV2QyxPQUFPO1lBRVgsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFFbkIsSUFBSSxLQUFLLEVBQUUsUUFBUSxDQUFDO1lBRXBCLGdCQUFnQjtZQUNoQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN0RCxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDN0QsVUFBVSxDQUFDLElBQUksQ0FDWCxJQUFJLENBQUMsdUJBQXVCLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUNyRCxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDeEI7aUJBQU07Z0JBQ0gsUUFBUSxJQUFJLEVBQUU7b0JBQ1YsS0FBSyxhQUFhO3dCQUNkLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ2pELE1BQU07b0JBQ1YsS0FBSyxXQUFXO3dCQUNaLFVBQVUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQy9DLE1BQU07b0JBQ1YsS0FBSyxPQUFPO3dCQUNSLEtBQUssR0FBRyxLQUFLLENBQUM7d0JBQ2QsUUFBUSxHQUFHLEVBQUUsQ0FBQzt3QkFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3RCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3ZCO3dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQ1gsc0JBQXNCLEtBQUssS0FBSyxRQUFRLElBQUksQ0FDL0MsQ0FBQzt3QkFDRixNQUFNO29CQUNWLEtBQUssa0JBQWtCO3dCQUNuQixLQUFLLEdBQUcsS0FBSyxDQUFDO3dCQUNkLFFBQVEsR0FBRyxFQUFFLENBQUM7d0JBQ2QsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUN0QixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN2Qjt3QkFDRCxVQUFVLENBQUMsSUFBSSxDQUNYLGlDQUFpQyxLQUFLLEtBQUssUUFBUSxJQUFJLENBQzFELENBQUM7d0JBQ0YsTUFBTTtvQkFDVixLQUFLLGVBQWUsQ0FBQztvQkFDckIsS0FBSyx3QkFBd0IsQ0FBQztvQkFDOUIsS0FBSyx5QkFBeUIsQ0FBQztvQkFDL0IsS0FBSyw0QkFBNEIsQ0FBQztvQkFDbEMsS0FBSywyQkFBMkI7d0JBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQ1gsc0NBQXNDLEtBQUssSUFBSSxDQUNsRCxDQUFDO3dCQUNGLE1BQU07b0JBQ1YsS0FBSyxjQUFjO3dCQUNmLFVBQVUsQ0FBQyxJQUFJLENBQ1gsb0NBQW9DLEtBQUssSUFBSSxDQUNoRCxDQUFDO3dCQUNGLE1BQU07b0JBQ1YsS0FBSyxZQUFZO3dCQUNiLFVBQVUsQ0FBQyxJQUFJLENBQ1gsZ0NBQWdDLEtBQUssSUFBSSxDQUM1QyxDQUFDO3dCQUNGLE1BQU07b0JBQ1YsS0FBSyxlQUFlLENBQUM7b0JBQ3JCLEtBQUssY0FBYyxDQUFDO29CQUNwQixLQUFLLHFCQUFxQixDQUFDO29CQUMzQixLQUFLLG1CQUFtQixDQUFDO29CQUN6QixLQUFLLG9CQUFvQixDQUFDO29CQUMxQixLQUFLLGtCQUFrQixDQUFDO29CQUN4QixLQUFLLFFBQVEsQ0FBQztvQkFDZCxLQUFLLFlBQVksQ0FBQztvQkFDbEIsS0FBSyxlQUFlLENBQUM7b0JBQ3JCLEtBQUssYUFBYSxDQUFDO29CQUNuQixLQUFLLGNBQWM7d0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksa0JBQWtCLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ3BELE1BQU07b0JBQ1YsS0FBSyxnQkFBZ0IsQ0FBQztvQkFDdEIsS0FBSyxlQUFlLENBQUM7b0JBQ3JCLEtBQUssc0JBQXNCLENBQUM7b0JBQzVCLEtBQUssb0JBQW9CLENBQUM7b0JBQzFCLEtBQUsscUJBQXFCLENBQUM7b0JBQzNCLEtBQUssbUJBQW1CLENBQUM7b0JBQ3pCLEtBQUssU0FBUyxDQUFDO29CQUNmLEtBQUssYUFBYSxDQUFDO29CQUNuQixLQUFLLGdCQUFnQixDQUFDO29CQUN0QixLQUFLLGNBQWMsQ0FBQztvQkFDcEIsS0FBSyxlQUFlO3dCQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxtQkFBbUIsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDckQsTUFBTTtvQkFDVixLQUFLLE9BQU87d0JBQ1IsVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDM0MsTUFBTTtvQkFDVixLQUFLLGVBQWU7d0JBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQzNDLE1BQU07b0JBQ1Y7d0JBQ0ksTUFBTSxLQUFLLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDO3dCQUN2QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUFFLE9BQU87d0JBQ3ZDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQzt3QkFDdEMsTUFBTTtpQkFDYjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxHQUFRO1FBQ3pDLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUV4QixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNyRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsQ0FBQyxDQUFDLENBQUE7b0JBQUUsU0FBUztnQkFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQVUsS0FBSyxDQUFDLENBQUM7Z0JBQzFELElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25DO1lBRUQsTUFBTSxNQUFNLEdBQUcsR0FBRztpQkFDYixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztpQkFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7aUJBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2lCQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLElBQUksUUFBUSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxNQUFNLEtBQUssSUFBSSxDQUFDLENBQUM7YUFDekM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQ3ZDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFZLEVBQUUsRUFBVTtRQUN6QyxNQUFNLE1BQU0sR0FBNEI7WUFDcEMsSUFBSSxFQUFFLEVBQUU7WUFDUixVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO1FBRUYsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsSUFBSSxHQUFHO2dCQUNWLEdBQUcsaUJBQWlCLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQzdDLEtBQUssQ0FBQyxDQUNWLEdBQUc7Z0JBQ0gsR0FBRyxpQkFBaUIsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsS0FDN0MsS0FBSyxDQUFDLENBQ1YsR0FBRztnQkFDSCxHQUFHLGlCQUFpQixDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxLQUM3QyxLQUFLLENBQUMsQ0FDVixHQUFHO2dCQUNILEdBQUcsaUJBQWlCLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLEtBQzdDLEtBQUssQ0FBQyxDQUNWLEdBQUc7YUFDTixDQUFDO1lBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDN0QsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQzdELEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxDQUFDO2dCQUM3RCxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLENBQUMsQ0FBQztnQkFDN0QsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNmO2FBQU07WUFDSCxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzVDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFDcEMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUM3QyxJQUFJLFdBQVcsS0FBSyxjQUFjO2dCQUFFLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDL0QsSUFBSSxhQUFhLEtBQUssZ0JBQWdCO2dCQUNsQyxnQkFBZ0IsR0FBRyxTQUFTLENBQUM7WUFFakMsSUFBSSxZQUFZLEdBQUcsbUJBQW1CLGFBQWEsRUFBRSxFQUNqRCxVQUFVLEdBQUcsbUJBQW1CLFdBQVcsRUFBRSxDQUFDO1lBRWxELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTtvQkFDL0IsSUFBSSxjQUFjLEVBQUU7d0JBQ2hCLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxjQUFjLEVBQUU7NEJBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxvQkFBb0IsQ0FDdEMsU0FBUyxpQkFBaUIsQ0FDdkIsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLE1BQU0sb0JBQW9CLENBQ3ZELE9BQU8sQ0FDWCxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLG9CQUFvQixDQUN0QyxFQUFFLENBQ04sR0FBRyxPQUFPLGlCQUFpQixDQUN4QixHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsTUFBTSxvQkFBb0IsQ0FDdkQsTUFBTSxDQUFDOzRCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxtQkFBbUIsQ0FDckMsU0FBUyxpQkFBaUIsQ0FDdkIsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLE1BQU0sbUJBQW1CLENBQ3RELE9BQU8sQ0FDWCxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLG1CQUFtQixDQUNyQyxFQUFFLENBQ04sR0FBRyxPQUFPLGlCQUFpQixDQUN4QixHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsTUFBTSxtQkFBbUIsQ0FDdEQsTUFBTSxDQUFDOzRCQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxJQUFJLENBQ3RCLFNBQVMsaUJBQWlCLENBQ3ZCLEdBQUcsVUFBVSxJQUFJLENBQ3BCLE9BQU8sQ0FDWCxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FDOUMsR0FBRyxPQUFPLGlCQUFpQixDQUN4QixHQUFHLFVBQVUsSUFBSSxDQUNwQixNQUFNLENBQUM7eUJBQ1g7cUJBQ0o7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7NEJBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxJQUFJLENBQ3RCLFNBQVMsaUJBQWlCLENBQ3ZCLEdBQUcsVUFBVSxJQUFJLENBQ3BCLElBQUksQ0FDUixDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FDOUMsR0FBRyxPQUFPLGlCQUFpQixDQUFDLEdBQUcsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDOzRCQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixHQUFHLGlCQUFpQixDQUNoQixHQUFHLFlBQVksSUFBSSxDQUN0QixTQUFTLGlCQUFpQixDQUN2QixHQUFHLFVBQVUsSUFBSSxDQUNwQixJQUFJLENBQ1IsQ0FBQzs0QkFDRixNQUFNLENBQUMsVUFBVSxDQUNiLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxFQUFFLENBQzlDLEdBQUcsT0FBTyxpQkFBaUIsQ0FBQyxHQUFHLFVBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQzs0QkFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLElBQUksQ0FDdEIsU0FBUyxpQkFBaUIsQ0FDdkIsR0FBRyxVQUFVLElBQUksQ0FDcEIsSUFBSSxDQUNSLENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FDYixHQUFHLGlCQUFpQixDQUFDLEdBQUcsWUFBWSxJQUFJLENBQUMsRUFBRSxDQUM5QyxHQUFHLE9BQU8saUJBQWlCLENBQUMsR0FBRyxVQUFVLElBQUksQ0FBQyxHQUFHLENBQUM7eUJBQ3REOzZCQUFNOzRCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxJQUFJLFFBQVEsQ0FBQyxNQUFNLG9CQUFvQixDQUN6RCxTQUFTLGlCQUFpQixDQUN2QixHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsTUFBTSxvQkFBb0IsQ0FDdkQsT0FBTyxDQUNYLENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FDYixHQUFHLGlCQUFpQixDQUNoQixHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsTUFBTSxvQkFBb0IsQ0FDekQsRUFBRSxDQUNOLEdBQUcsT0FBTyxpQkFBaUIsQ0FDeEIsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLE1BQU0sb0JBQW9CLENBQ3ZELE1BQU0sQ0FBQzs0QkFDUixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixHQUFHLGlCQUFpQixDQUNoQixHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsTUFBTSxtQkFBbUIsQ0FDeEQsU0FBUyxpQkFBaUIsQ0FDdkIsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLE1BQU0sbUJBQW1CLENBQ3RELE9BQU8sQ0FDWCxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLElBQUksUUFBUSxDQUFDLE1BQU0sbUJBQW1CLENBQ3hELEVBQUUsQ0FDTixHQUFHLE9BQU8saUJBQWlCLENBQ3hCLEdBQUcsVUFBVSxJQUFJLFFBQVEsQ0FBQyxNQUFNLG1CQUFtQixDQUN0RCxNQUFNLENBQUM7NEJBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLFdBQVcsVUFBVSxJQUFJLENBQzNDLE9BQU8sQ0FDWCxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FDOUMsR0FBRyxPQUFPLGlCQUFpQixDQUN4QixHQUFHLFVBQVUsSUFBSSxDQUNwQixNQUFNLENBQUM7eUJBQ1g7cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWMsRUFBRSxPQUFnQjtRQUM3QyxhQUFhO1FBRWIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLGFBQWE7WUFDZCxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxLQUFLLElBQUksT0FBTywrQkFBK0IsQ0FDNUYsQ0FBQztRQUVOLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUV4QixnQkFBZ0I7UUFDaEIsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3BDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBRTdDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxLQUNyQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ25CLEdBQUcsQ0FDTixDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEtBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FDbkIsR0FBRyxDQUNOLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLGlCQUFpQixDQUFDLEdBQUcsWUFBWSxJQUFJLENBQUMsS0FDckMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUNuQixHQUFHLENBQ04sQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxZQUFZLElBQUksQ0FBQyxLQUNyQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ25CLEdBQUcsQ0FDTixDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksV0FBVyxDQUFDLEtBQzVDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FDbkIsR0FBRyxDQUNOLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLGlCQUFpQixDQUFDLEdBQUcsWUFBWSxXQUFXLENBQUMsS0FDNUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUNuQixHQUFHLENBQ04sQ0FBQztnQkFDRixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxZQUFZLFdBQVcsQ0FBQyxLQUM1QyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ25CLEdBQUcsQ0FDTixDQUFDO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksV0FBVyxDQUFDLEtBQzVDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FDbkIsR0FBRyxDQUNOLENBQUM7YUFDTDtpQkFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLG9CQUFvQixDQUN0QyxLQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQ25DLENBQUM7aUJBQ0w7cUJBQU0sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLGlCQUFpQixDQUNoQixHQUFHLFlBQVksb0JBQW9CLENBQ3RDLEtBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FDMUMsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxvQkFBb0IsQ0FDdEMsTUFBTSxDQUNWLENBQUM7aUJBQ0w7Z0JBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDeEIsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLGlCQUFpQixDQUNoQixHQUFHLFlBQVksbUJBQW1CLENBQ3JDLEtBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FDbEMsQ0FBQztpQkFDTDtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUM5QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsaUJBQWlCLENBQ2hCLEdBQUcsWUFBWSxtQkFBbUIsQ0FDckMsS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUN0QyxDQUFDO2lCQUNMO3FCQUFNO29CQUNILElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FDaEIsR0FBRyxZQUFZLG1CQUFtQixDQUNyQyxNQUFNLENBQ1YsQ0FBQztpQkFDTDtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUU7b0JBQ3hELElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFlBQVksSUFBSSxDQUFDLEtBQ3JDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FDbkIsR0FBRyxDQUNOLENBQUM7aUJBQ0w7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQXFCO1FBQ3JCLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQ25DLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRXhELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDeEMsb0VBQW9FO1lBRXBFLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxNQUFNLE1BQU0sR0FBRyxHQUFHO2lCQUNiLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2lCQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztpQkFDbkIsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUM7aUJBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFMUIsSUFBSSxRQUFRLEdBQUcsYUFBYSxNQUFNLEVBQUUsQ0FBQztZQUVyQyxJQUFJLEdBQUcsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxNQUMvQixjQUFjLENBQUMsR0FBRyxDQUN0QixJQUFJLENBQ1AsQ0FBQzthQUNMO2lCQUFNO2dCQUNILElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLFFBQVEsRUFBRSxDQUFDLEtBQy9CLGNBQWMsQ0FBQyxHQUFHLENBQ3RCLEdBQUcsQ0FDTixDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQWUsRUFBRSxLQUFjLEVBQUUsT0FBZ0I7UUFDNUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsS0FBYyxFQUFFLE9BQWdCO1FBQ3hELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9DLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQ04sT0FBZSxFQUNmLEtBQVUsRUFDVixLQUFjLEVBQ2QsT0FBZ0I7UUFFaEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0MsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBeUJEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksTUFBTTtRQUNOLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBZ0JELElBQUksT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7UUFDRCxhQUFhO1FBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUM5QixFQUFFLEVBQ0YsV0FBVyxDQUNQLGNBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQ3hCLENBQ0osQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsR0FBRyxDQUFDLE9BQU8sRUFBRSxlQUF3QixLQUFLO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QyxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDRDQUE0QyxJQUFJLENBQUMsRUFBRSxrQ0FBa0MsT0FBTyw2QkFBNkIsQ0FDMUosQ0FBQztTQUNMO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxjQUFjO1FBQ1YsYUFBYTtRQUNiLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsZUFBZSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUM1RCxDQUFDLENBQUM7UUFDSCx3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILElBQUksQ0FBQyxVQUFrQixFQUFFO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZO1FBQ1IsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsR0FBRyxDQUFDLE9BQWUsRUFBRSxLQUFVO1FBQzNCLCtDQUErQztRQUMvQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3Qyx5QkFBeUI7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE9BQU87WUFDUCxLQUFLO1NBQ1IsQ0FBQyxDQUFDO1FBQ0gsd0JBQXdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILE9BQU8sQ0FBQyxPQUFZO1FBQ2hCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsV0FBVyxDQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQ3JCLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLEVBQUUsQ0FDaEIsQ0FBQztRQUNGLHlCQUF5QjtRQUN6QixhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1NBQzdELENBQUMsQ0FBQztRQUNILHdCQUF3QjtRQUN4QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUs7UUFDRCxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUMzQix3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsVUFBVTtRQUNOLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUVmLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtZQUNuRSxNQUFNLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNuQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUc7Z0JBQ2IsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxtQkFBbUIsU0FBUyxFQUFFLENBQUM7Z0JBQzNELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNULENBQUM7U0FDTDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNHLFlBQVksQ0FDZCxRQUFxQzs7WUFFckMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFDL0IsZUFBZSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUMsNkJBQTZCO1lBRTdCLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzRCw2QkFBNkI7Z0JBRTdCLHFFQUFxRTtnQkFFckUseUJBQXlCO2dCQUN6Qix1QkFBdUI7Z0JBQ3ZCLDJJQUEySTtnQkFDM0ksU0FBUztnQkFDVCxJQUFJO2dCQUVKLE1BQU0sQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUVuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUM7b0JBQ2xCLElBQUksRUFBRSxTQUFTO29CQUNmLE1BQU0sRUFBRSxFQUFFO29CQUNWLGFBQWE7b0JBQ2IsS0FBSyxFQUFFO3dCQUNILEtBQUssRUFBRSxVQUFVO3dCQUNqQixRQUFRLEVBQUUsaUJBQWlCLENBQUMsbUJBQW1CLFNBQVMsRUFBRSxDQUFDO3dCQUMzRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ1Q7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUM5QyxlQUFlLENBQ2xCLEVBQUU7b0JBQ0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzFDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBMkI7d0JBQzNDLElBQUksRUFBRSxTQUFTO3dCQUNmLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixLQUFLLGdDQUNELFFBQVEsRUFBRSxpQkFBaUIsQ0FDdkIsbUJBQW1CLFNBQVMsSUFBSSxVQUFVLEVBQUUsQ0FDL0MsSUFFRSxTQUFTLEtBQ1osQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQ2hCO3FCQUNKLENBQUMsQ0FBQztvQkFFSCxhQUFhO29CQUNiLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTt3QkFDakIsS0FBSyxJQUFJLENBQ0wsb0JBQW9CLEVBQ3BCLGNBQWM7d0JBQ2QsYUFBYTt5QkFDaEIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTs0QkFDbEMsSUFBSSxvQkFBb0IsS0FBSyxTQUFTO2dDQUFFLFNBQVM7NEJBRWpELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUUvQyxRQUFRLENBQTJCO2dDQUMvQixJQUFJLEVBQUUsb0JBQW9CO2dDQUMxQixNQUFNLEVBQUUsVUFBVTtnQ0FDbEIsS0FBSyxnQ0FDRCxRQUFRLEVBQUUsaUJBQWlCLENBQ3ZCLG1CQUFtQixvQkFBb0IsSUFBSSxVQUFVLEVBQUUsQ0FDMUQsSUFFRSxjQUFjLEtBQ2pCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUNiLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUNoQjs2QkFDSixDQUFDLENBQUM7eUJBQ047cUJBQ0o7aUJBQ0o7YUFDSjtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7S0FBQTs7QUFycUNEOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBQ0ksOEJBQW1CLEdBQStCLEVBQUUsQ0FBQyJ9