"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_color_1 = __importDefault(require("@coffeekraken/s-color"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const object_1 = require("@coffeekraken/sugar/object");
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
// import __micromatch from 'micromatch';
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const css_1 = require("@coffeekraken/sugar/css");
const is_1 = require("@coffeekraken/sugar/is");
const object_2 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const known_css_properties_1 = __importDefault(require("known-css-properties"));
const object_hash_1 = __importDefault(require("object-hash"));
class SThemeBase extends s_event_emitter_1.default {
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
        this.theme = theme !== null && theme !== void 0 ? theme : s_sugar_config_1.default.get('theme.theme');
        this.variant = variant !== null && variant !== void 0 ? variant : s_sugar_config_1.default.get('theme.variant');
        if (!s_sugar_config_1.default.get(`theme.themes.${this.theme}-${this.variant}`)) {
            throw new Error(`Sorry but the requested theme "<yellow>${this.theme}-${this.variant}</yellow>" does not exists...`);
        }
    }
    /**
     * @name            sortMedia
     * @type            Function
     * @static
     *
     * This function takes as input the "media" object of the `frontspec.json` file and sort the "queries"
     * depending on the "defaultAction" specified.
     *
     * @param       {Object}            media      The media object to process
     * @return      {Object}                        THe new media object with queries sorted correctly
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static sortMedia(media) {
        var _a;
        // do nothing if the defaultAction is not specified
        if (!media.defaultAction) {
            return media;
        }
        // sort the queries
        const queries = (0, object_1.__sort)((_a = media.queries) !== null && _a !== void 0 ? _a : {}, (a, b) => {
            if (media.defaultAction === '<=') {
                return a.value.minWidth < b.value.minWidth ? 1 : -1;
            }
            else if (media.defaultAction === '>=') {
                return a.value.minWidth > b.value.minWidth ? 1 : -1;
            }
            return 0;
        });
        media.queries = queries;
        return media;
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
        return s_sugar_config_1.default.get('theme.theme');
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
        return s_sugar_config_1.default.get('theme.variant');
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
        return Object.keys(s_sugar_config_1.default.get('theme.themes'));
    }
    /**
     * @name            isDark
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
     * @name            isMobileFirst
     * @type            Function
     * @static
     *
     * This method returns true if the theme is configured to be mobile first.
     * Mobile first is true when the "config.theme.media.defaultAction" is set to "<="
     *
     * @return      {Boolean}               true if variant is dark, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isMobileFirst() {
        return this.getSafe('media.defaultAction') === '>=';
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
        let defaultTheme = s_sugar_config_1.default.get('theme.theme'), defaultVariant = s_sugar_config_1.default.get('theme.variant');
        let theme = defaultTheme, variant = defaultVariant;
        const metas = (_a = s_sugar_config_1.default.get(`theme.themes.${theme}-${variant}.metas`)) !== null && _a !== void 0 ? _a : {};
        return (0, object_2.__deepMerge)({
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
        const themes = s_sugar_config_1.default.get('theme.themes');
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
        const themesNames = Object.keys(s_sugar_config_1.default.get('theme.themes'));
        if (!theme) {
            theme = s_sugar_config_1.default.get('theme.theme');
        }
        if (!variant) {
            variant = s_sugar_config_1.default.get('theme.variant');
        }
        if (!themesNames.includes(`${theme}-${variant}`)) {
            theme = s_sugar_config_1.default.get('theme.theme');
            variant = s_sugar_config_1.default.get('theme.variant');
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
        return (0, object_hash_1.default)(config);
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
        const v = `var(${(0, css_1.__compressVarName)(`--s-theme-${dotPath
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
                // dash case
                const dashProp = (0, dashCase_1.default)(prop);
                const value = mediaQueryConfig[prop];
                if (!value)
                    return;
                if ([
                    'min-width',
                    'max-width',
                    'min-device-width',
                    'max-device-width',
                ].indexOf(dashProp) !== -1) {
                    if (action === '>') {
                        if (dashProp === 'max-width' ||
                            dashProp === 'max-device-width') {
                            let argName = 'min-width';
                            if (dashProp.includes('-device'))
                                argName = 'min-device-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    }
                    else if (action === '<') {
                        if (dashProp === 'min-width' ||
                            dashProp === 'min-device-width') {
                            let argName = 'max-width';
                            if (dashProp.includes('-device'))
                                argName = 'max-device-width';
                            queryList.push(`(${argName}: ${value}px)`);
                        }
                    }
                    else if (action === '=') {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                    else if (action === '>=') {
                        if (dashProp === 'min-width' ||
                            dashProp === 'min-device-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    }
                    else if (action === '<=') {
                        if (dashProp === 'max-width' ||
                            dashProp === 'max-device-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    }
                    else {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                }
                else {
                    queryList.push(`(${dashProp}: ${value}px)`);
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
        const finalSettings = (0, object_2.__deepMerge)({
            exclude: [],
            only: [],
        }, settings);
        const propsStack = [];
        Object.keys(jsObject).forEach((prop) => {
            if (finalSettings.exclude.indexOf(prop) !== -1)
                return;
            if (finalSettings.exclude.indexOf((0, dashCase_1.default)(prop)) !== -1)
                return;
            const originalProp = prop;
            prop = (0, dashCase_1.default)(prop).trim();
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
                        const props = known_css_properties_1.default.all;
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
        for (let [key, value] of Object.entries((0, object_2.__flatten)(obj))) {
            if ((0, is_1.__isColor)(value)) {
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
            let variable = (0, css_1.__compressVarName)(`--s-theme-${varKey}`);
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
        if ((0, is_1.__isColor)(to)) {
            const color = new s_color_1.default(to);
            result.vars = [
                `${(0, css_1.__compressVarName)(`--s-theme-color-${from}-h`)}: ${color.h};`,
                `${(0, css_1.__compressVarName)(`--s-theme-color-${from}-s`)}: ${color.s};`,
                `${(0, css_1.__compressVarName)(`--s-theme-color-${from}-l`)}: ${color.l};`,
                `${(0, css_1.__compressVarName)(`--s-theme-color-${from}-a`)}: ${color.a};`,
            ];
            result.properties[(0, css_1.__compressVarName)(`--s-theme-color-${from}-h`)] =
                color.h;
            result.properties[(0, css_1.__compressVarName)(`--s-theme-color-${from}-s`)] =
                color.s;
            result.properties[(0, css_1.__compressVarName)(`--s-theme-color-${from}-l`)] =
                color.l;
            result.properties[(0, css_1.__compressVarName)(`--s-theme-color-${from}-a`)] =
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
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-saturation-offset`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-saturation-offset`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-lightness-offset`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-lightness-offset`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-a`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-a`)}, 1);`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-a`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-a`)}, 1)`;
                        }
                    }
                    else {
                        if (!colorObj.schema && colorObj.value.color) {
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-h`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-h`)});`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-h`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-h`)})`;
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-s`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-s`)});`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-s`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-s`)})`;
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-l`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-l`)});`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-l`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-l`)})`;
                        }
                        else {
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-${colorObj.schema}-saturation-offset`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-${colorObj.schema}-saturation-offset`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-${colorObj.schema}-lightness-offset`)}: var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-${colorObj.schema}-lightness-offset`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
                            result.vars.push(`${(0, css_1.__compressVarName)(`${fromVariable}-a: var(${toVariable}-a`)}, 1);`);
                            result.properties[`${(0, css_1.__compressVarName)(`${fromVariable}-a`)}`] = `var(${(0, css_1.__compressVarName)(`${toVariable}-a`)}, 1)`;
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
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-h`)}: ${colorObj.value.h};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-s`)}: ${colorObj.value.s};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-l`)}: ${colorObj.value.l};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-a`)}: ${colorObj.value.a};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-origin-h`)}: ${colorObj.value.h};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-origin-s`)}: ${colorObj.value.s};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-origin-l`)}: ${colorObj.value.l};`);
                vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-origin-a`)}: ${colorObj.value.a};`);
            }
            else if (colorObj.schema) {
                if (colorObj.value.saturate) {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-saturation-offset`)}: ${colorObj.value.saturate};`);
                }
                else if (colorObj.value.desaturate) {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-saturation-offset`)}: ${colorObj.value.desaturate * -1};`);
                }
                else {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-saturation-offset`)}: 0;`);
                }
                if (colorObj.value.lighten) {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-lightness-offset`)}: ${colorObj.value.lighten};`);
                }
                else if (colorObj.value.darken) {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-lightness-offset`)}: ${colorObj.value.darken * -1};`);
                }
                else {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-lightness-offset`)}: 0;`);
                }
                if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                    vars.push(`${(0, css_1.__compressVarName)(`${baseVariable}-a`)}: ${colorObj.value.alpha};`);
                }
            }
        });
        // others than colors
        const themeObjWithoutColors = Object.assign({}, themeInstance.get('.'));
        delete themeObjWithoutColors.color;
        const flattenedTheme = (0, object_2.__flatten)(themeObjWithoutColors);
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
                vars.push(`${(0, css_1.__compressVarName)(`${variable}`)}: "${flattenedTheme[key]}";`);
            }
            else {
                vars.push(`${(0, css_1.__compressVarName)(`${variable}`)}: ${flattenedTheme[key]};`);
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
        return s_sugar_config_1.default.get('theme.themes');
    }
    get _config() {
        if (this._cachedConfig) {
            return this._cachedConfig;
        }
        // @ts-ignore
        this._cachedConfig = Object.assign({}, (0, object_2.__deepMerge)(s_sugar_config_1.default.get('theme.themes')[this.id], this._overridedConfig));
        return this._cachedConfig;
    }
    get(dotPath, preventThrow = false) {
        let value = (0, object_1.__get)(this._config, dotPath);
        if (value && dotPath === 'media') {
            // sort the media requested
            // @ts-ignore
            value = this.constructor.sortMedia(value);
        }
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
        return (0, object_hash_1.default)(config);
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
        return s_sugar_config_1.default.get('theme');
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
        (0, set_1.default)(this._overridedConfig, dotPath, value);
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
        this._overridedConfig = (0, object_2.__deepMerge)(this._overridedConfig, configs !== null && configs !== void 0 ? configs : {});
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
            const c = new s_color_1.default(colorValue);
            map[colorName] = {
                color: colorValue,
                variable: (0, css_1.__compressVarName)(`--s-theme-color-${colorName}`),
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
                const c = new s_color_1.default(colorValue);
                const _res = callback({
                    name: colorName,
                    schema: '',
                    // @ts-ignore
                    value: {
                        color: colorValue,
                        variable: (0, css_1.__compressVarName)(`--s-theme-color-${colorName}`),
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
                        value: Object.assign(Object.assign({ variable: (0, css_1.__compressVarName)(`--s-theme-color-${colorName}-${schemaName}`) }, schemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
                                value: Object.assign(Object.assign({ variable: (0, css_1.__compressVarName)(`--s-theme-color-${colorSchemaColorName}-${schemaName}`) }, colorSchemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
                            });
                        }
                    }
                }
            }
            return true;
        });
    }
}
exports.default = SThemeBase;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCx1REFBMkQ7QUFDM0QsZ0ZBQTBEO0FBQzFELHlDQUF5QztBQUN6QyxvRkFBNEQ7QUFDNUQsaURBQTREO0FBQzVELCtDQUFtRDtBQUNuRCx1REFBb0U7QUFDcEUsMEZBQW9FO0FBQ3BFLGdGQUF3RDtBQUN4RCw4REFBdUM7QUErSnZDLE1BQXFCLFVBQVcsU0FBUSx5QkFBZTtJQTJoQ25EOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksS0FBYyxFQUFFLE9BQWdCO1FBQ3hDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQTUrQmQ7Ozs7Ozs7OztXQVNHO1FBQ0sscUJBQWdCLEdBQVEsRUFBRSxDQUFDO1FBbytCL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRTtZQUNuRSxNQUFNLElBQUksS0FBSyxDQUNYLDBDQUEwQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLCtCQUErQixDQUN0RyxDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBL2lDRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFVOztRQUN2QixtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVB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