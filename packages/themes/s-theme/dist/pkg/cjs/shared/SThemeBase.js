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
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const css_1 = require("@coffeekraken/sugar/css");
const is_1 = require("@coffeekraken/sugar/is");
const object_2 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const known_css_properties_1 = __importDefault(require("known-css-properties"));
const object_hash_1 = __importDefault(require("object-hash"));
/**
 * @name            SThemeBase
 * @namespace       shared
 * @type            Class
 * @extends         SEventEmitter
 *
 * This class represent the sugar theme you've passed the name in the constructor.
 * Once you have an instance of this theme you will have access to a lot of utilities
 * methods like "loopOnColors", etc...
 *
 * @param       {String}        [theme=undefined]        The name of the theme you want to instanciate utilities for. If not specified, will take either the "default" theme, or the theme defined in the sugar.json file
 *
 * @example         js
 * import STheme from '@coffeekraken/s-theme';
 * const theme = new STheme();
 * theme.loopOnColors(({name, schema, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class colorSchemaNameInterface extends s_interface_1.default {
    static get _definition() {
        return {
            saturate: {
                type: 'Number|String',
                default: 0,
            },
            desaturate: {
                type: 'Number',
                default: 0,
            },
            darken: {
                type: 'Number',
                default: 0,
            },
            lighten: {
                type: 'Number',
                default: 0,
            },
            spin: {
                type: 'Number',
                default: 0,
            },
            alpha: {
                type: 'Number',
                default: 1,
            },
        };
    }
}
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
    constructor(theme, variant, settings) {
        super((0, object_2.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
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
    static getTheme(theme, variant, settings) {
        var _a, _b;
        const themesNames = Object.keys(s_sugar_config_1.default.get('theme.themes'));
        theme = theme !== null && theme !== void 0 ? theme : (_a = this._firstGetedThemeSettings) === null || _a === void 0 ? void 0 : _a.theme;
        variant = variant !== null && variant !== void 0 ? variant : (_b = this._firstGetedThemeSettings) === null || _b === void 0 ? void 0 : _b.variant;
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
        if (!this._firstGetedThemeSettings) {
            this._firstGetedThemeSettings = {
                theme,
                variant,
                settings,
            };
        }
        if (this._instanciatedThemes[`${theme}-${variant}`]) {
            return this._instanciatedThemes[`${theme}-${variant}`];
        }
        if (!themesNames[`${theme}-${variant}`]) {
            this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant, settings);
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
    static hash(dotPath = '', settings) {
        const config = this.get(dotPath, settings);
        return (0, object_hash_1.default)(config);
    }
    /**
     * @name        resolveFontSize
     * @type        Function
     * @static
     *
     * This method allows you to get back the actual final font-size value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveFontSize(size, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // resolve font size
        return theme.resolveFontSize(size);
    }
    /**
     * @name        resolvePadding
     * @type        Function
     * @static
     *
     * This method allows you to get back the actual final padding value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolvePadding(size, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // resolve font size
        return theme.resolvePadding(size);
    }
    /**
     * @name        resolveMargin
     * @type        Function
     * @static
     *
     * This method allows you to get back the actual final margin value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveMargin(size, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // resolve font size
        return theme.resolveMargin(size);
    }
    /**
     * @name        resolveBorderRadius
     * @type        Function
     * @static
     *
     * This method allows you to get back the actual final border-radius value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveBorderRadius(size, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // resolve font size
        return theme.resolveBorderRadius(size);
    }
    /**
     * @name        resolveBorderWidth
     * @type        Function
     * @static
     *
     * This method allows you to get back the actual final border-width value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveBorderWidth(size, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // resolve font size
        return theme.resolveBorderWidth(size);
    }
    /**
     * @name        resolveColor
     * @type        Function
     * @static
     *
     * This method allows you to get back the actual final value of a color with
     * his schema and modifier.
     * You can get back either a css variable or the actual color value by specifying
     * the "settings.return" setting.
     *
     * @param       {String}            color       The color you want to resolve
     * @param       {String}            [schema=null]      The color schema you want
     * @param       {String}            [modifier=null]     The modifier you want to apply. Can be something like "--darken 30%", etc...
     * @param       {ISThemeColorResolveColorSettings}      [settings={}]           Some settings
     * @return      {any}                       The final resolved color
     *
     * @setting         {'var'|'value'}         [return='value']        The return format you want
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveColor(color, schema, modifier, settings) {
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        return theme.resolveColor(color, schema, modifier, settings);
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
    static cssVar(dotPath, fallback = true, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // proxy non existint dotPath
        dotPath = theme.proxyNonExistingUiDotpath(dotPath);
        let fb = theme.get(dotPath);
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
        const mediaConfig = this.sortMedia(this.get('media')), sortedMedia = Object.keys(mediaConfig.queries);
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
                let value = mediaQueryConfig[prop];
                if (!value) {
                    if (prop === 'minWidth') {
                        value = 0;
                    }
                    else if (prop === 'maxWidth') {
                        value = 99999;
                    }
                }
                if (['min-width', 'max-width'].indexOf(dashProp) !== -1) {
                    if (action === '>') {
                        if (dashProp === 'max-width') {
                            let argName = 'min-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    }
                    else if (action === '<') {
                        if (dashProp === 'min-width') {
                            let argName = 'max-width';
                            queryList.push(`(${argName}: ${value}px)`);
                        }
                    }
                    else if (action === '=') {
                        queryList.push(`(${dashProp}: ${value}px)`);
                    }
                    else if (action === '>=') {
                        if (sortedMedia.at(-1) === mediaName) {
                            return;
                        }
                        if (dashProp === 'min-width') {
                            queryList.push(`(${dashProp}: ${value}px)`);
                        }
                    }
                    else if (action === '<=') {
                        if (sortedMedia[0] === mediaName) {
                            return;
                        }
                        if (dashProp === 'max-width') {
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
     * @name                resolveCssPropertyValue
     * @type                Function
     * @static
     *
     * This static method allows you to pass a css property with a value and get back his final value
     * resolved depending on the theme configuration.
     *
     * @param       {String}            property        The css property to resolve
     * @param       {any}               value           The css property value to resolve
     * @return      {any}                               The resolved css value
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveCssPropertyValue(property, value, settings) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const dashProp = (0, dashCase_1.default)(property);
        switch (dashProp) {
            case 'font-family':
                const fontObj = this.get(`font.family.${value}`);
                return (_a = fontObj === null || fontObj === void 0 ? void 0 : fontObj.fontFamily) !== null && _a !== void 0 ? _a : value;
                break;
            case 'font-size':
                return (_b = this.resolveFontSize(value, settings)) !== null && _b !== void 0 ? _b : value;
                break;
            case 'color':
            case 'background-color':
                let color = value, schema, modifier;
                if (Array.isArray(value) && value.length === 2) {
                    color = value[0];
                    schema = value[1];
                }
                return ((_c = this.resolveColor(color, schema, null, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { return: 'value' }))) !== null && _c !== void 0 ? _c : value);
                break;
            case 'border-radius':
            case 'border-top-left-radius':
            case 'border-top-right-radius':
            case 'border-bottom-right-radius':
            case 'border-bottom-left-radius':
                return (_d = this.resolveBorderRadius(value)) !== null && _d !== void 0 ? _d : value;
                break;
            case 'border-width':
                return (_e = this.resolveBorderWidth(value)) !== null && _e !== void 0 ? _e : value;
                break;
            case 'transition':
                return (_f = this.getSafe(`transition.${value}`)) !== null && _f !== void 0 ? _f : value;
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
                return (_g = this.resolveMargin(value)) !== null && _g !== void 0 ? _g : value;
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
                return (_h = this.resolvePadding(value)) !== null && _h !== void 0 ? _h : value;
                break;
            case 'depth':
                return (_j = this.getSafe(`depth.${value}`, settings)) !== null && _j !== void 0 ? _j : value;
                break;
        }
        // by default, return the passed value
        return value;
    }
    /**
     * @name                resolveCssObjectPropertiesValues
     * @type                Function
     * @static
     *
     * This static method allows you to passe a js object with some css properties and to
     * resolve each of these properties values using the `resolveCssPropertyValue` method
     *
     * @param       {Object}            object      The css properties object to resolve values from
     * @return      {Object}                        The css properties object with resolved values
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveCssObjectPropertiesValues(object, settings) {
        const newObj = Object.assign({}, object);
        for (let [prop, value] of Object.entries(newObj)) {
            newObj[prop] = this.resolveCssPropertyValue(prop, value, settings);
        }
        return newObj;
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
            let color, schema;
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
                        schema = '';
                        if (Array.isArray(value)) {
                            color = value[0];
                            schema = value[1];
                        }
                        propsStack.push(`color: sugar.color(${color}, ${schema});`);
                        break;
                    case 'background-color':
                        color = value;
                        schema = '';
                        if (Array.isArray(value)) {
                            color = value[0];
                            schema = value[1];
                        }
                        propsStack.push(`background-color: sugar.color(${color}, ${schema});`);
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
    static remapCssColor(from, to, settings) {
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
            this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant).loopOnColors((colorObj) => {
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
    static toCssVars(settings) {
        // @ts-ignore
        const themeInstance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        if (!themeInstance)
            throw new Error(`Sorry but the requested theme "<yellow>${settings.theme}-${settings.variant}</yellow>" does not exists...`);
        let vars = [
            `--s-theme: ${themeInstance.theme};`,
            `--s-theme-variant: ${themeInstance.variant};`,
        ];
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
    static getSafe(dotPath, settings) {
        const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        return instance.get(dotPath, {
            preventThrow: true,
        });
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
    static get(dotPath, settings) {
        const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
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
    static set(dotPath, value, settings) {
        const instance = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
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
    /**
     * @name          proxyNonExistingUiDotpath
     * @type          Function
     *
     * This method alloes you to get the actual dotpath for the passed one.
     * If you try to get "ui.range.borderRadius" and that this config does not exists in the
     * themeUi file(s), it will fallback to "ui.default.borderRadius"
     *
     * @param         {String}        dotPath         The dot path of the config you want to get
     * @return        {String}                           The actual correct dotpath
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    proxyNonExistingUiDotpath(dotPath) {
        // try to get the value
        let value = (0, object_1.__get)(this._config, dotPath);
        // if the dotpath starts with "ui...." and that we don't have
        // a value for now, try to get the value from "ui.default..." instead
        if (value === undefined && dotPath.match(/^ui\.[a-zA-Z0-9]+\./)) {
            dotPath = dotPath.replace(/^ui\.[a-zA-Z0-9]+\./, 'ui.default.');
        }
        // return the dotPath
        return dotPath;
    }
    /**
     * @name          getSafe
     * @type          Function
     *
     * This method allows you to access a value of the current theme
     * using a dot path like "color.accent", etc...
     * This method will not throw an error if nothing's found
     *
     * @param         {String}        dotPath         The dot path of the config you want to get
     * @return        {Any}                           The value of the getted configuration
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSafe(dotPath) {
        return this.get(dotPath, {
            preventThrow: true,
        });
    }
    get _config() {
        if (this._cachedConfig) {
            return this._cachedConfig;
        }
        // @ts-ignore
        this._cachedConfig = Object.assign({}, (0, object_2.__deepMerge)(s_sugar_config_1.default.get('theme.themes')[this.id], this._overridedConfig));
        return this._cachedConfig;
    }
    get(dotPath, settings = {}) {
        const finalSettings = (0, object_2.__deepMerge)({
            preventThrow: false,
            defaultFallback: true,
        }, settings);
        // proxy non existing ui configs
        dotPath = this.proxyNonExistingUiDotpath(dotPath);
        // get the value
        let value = (0, object_1.__get)(this._config, dotPath);
        if (value && dotPath === 'media') {
            // sort the media requested
            // @ts-ignore
            value = this.constructor.sortMedia(value);
        }
        if (value === undefined && !finalSettings.preventThrow) {
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
     * @name        resolveFontSize
     * @type        Function
     *
     * This method allows you to get back the actual final font-size value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveFontSize(size) {
        const defaultSizeStr = this.get('font.size.default'), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''), defaultSize = parseInt(defaultSizeStr);
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`font.size.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }
        // by default, return the passed size
        return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
    }
    /**
     * @name        resolvePadding
     * @type        Function
     *
     * This method allows you to get back the actual final padding value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolvePadding(size) {
        const defaultSizeStr = this.get('padding.default'), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''), defaultSize = parseInt(defaultSizeStr);
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`padding.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }
        // by default, return the passed size
        return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
    }
    /**
     * @name        resolveMargin
     * @type        Function
     *
     * This method allows you to get back the actual final margin value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveMargin(size) {
        const defaultSizeStr = this.get('margin.default'), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''), defaultSize = parseInt(defaultSizeStr);
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`margin.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }
        // by default, return the passed size
        return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
    }
    /**
     * @name        resolveBorderRadius
     * @type        Function
     *
     * This method allows you to get back the actual final border-radius value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveBorderRadius(size) {
        const defaultSizeStr = this.get('border.radius.default'), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''), defaultSize = parseInt(defaultSizeStr);
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`border.radius.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }
        // by default, return the passed size
        return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
    }
    /**
     * @name        resolveBorderWidth
     * @type        Function
     *
     * This method allows you to get back the actual final border-radius value of the passed one
     *
     * @param       {any}           size        The size you want to resolve
     * @return      {any}                       The final resolved size
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveBorderWidth(size) {
        const defaultSizeStr = this.get('border.width.default'), defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''), defaultSize = parseInt(defaultSizeStr);
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`border.width.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }
        // by default, return the passed size
        return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
    }
    /**
     * @name        resolveColor
     * @type        Function
     *
     * This method allows you to get back the actual final value of a color with
     * his schema and modifier.
     * You can get back either a css variable or the actual color value by specifying
     * the "settings.return" setting.
     *
     * @param       {String}            color       The color you want to resolve
     * @param       {String}            [schema=null]      The color schema you want
     * @param       {String}            [modifier=null]     The modifier you want to apply. Can be something like "--darken 30%", etc...
     * @param       {ISThemeColorResolveColorSettings}      [settings={}]           Some settings
     * @return      {any}                       The final resolved color
     *
     * @setting         {'var'|'value'}         [return='value']        The return format you want
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveColor(color, schema, modifier, settings) {
        var _a, _b;
        // concrete color string
        if (color.match(/^(hsla?|rgba?|hsv)\(/))
            return color;
        if (color.match(/^var\(--/))
            return color;
        const finalSettings = Object.assign({ return: 'value' }, (settings !== null && settings !== void 0 ? settings : {}));
        let colorName = color;
        let colorSchemaName = schema !== null && schema !== void 0 ? schema : '';
        let colorModifier = modifier !== null && modifier !== void 0 ? modifier : '';
        if (colorSchemaName.match(/^--[a-z]+/)) {
            colorModifier = colorSchemaName;
            colorSchemaName = undefined;
        }
        let modifierParams = {};
        if (colorModifier) {
            modifierParams = colorSchemaNameInterface.apply(colorModifier);
        }
        let finalValue;
        // is is a color, return it
        if ((0, is_1.__isColor)(colorName)) {
            const color = new s_color_1.default(colorName);
            if (colorModifier) {
                color.apply(colorModifier);
            }
            return color.toString();
        }
        else {
            // check what we want back
            // it can be either a "var" or a "value"
            switch (finalSettings.return) {
                case 'var':
                    const colorVar = `--s-theme-color-${colorName}`;
                    let colorSchemaNameVar = `s-theme-color-${colorName}`;
                    if (colorSchemaName) {
                        colorSchemaNameVar += `-${colorSchemaName}`;
                    }
                    colorSchemaNameVar =
                        '--' + colorSchemaNameVar.replace(/-{2,999}/gm, '-');
                    finalValue = colorVar;
                    const hParts = [
                        `var(${colorVar}-h, 0)`,
                        `var(${colorSchemaNameVar}-spin ,${(_a = modifierParams.spin) !== null && _a !== void 0 ? _a : 0})`,
                    ];
                    const sParts = [`var(${colorVar}-s, 0)`];
                    if (colorSchemaName) {
                        sParts.push(`var(${colorSchemaNameVar}-saturation-offset, 0)`);
                    }
                    let saturationOffset = modifierParams.saturate
                        ? modifierParams.saturate
                        : modifierParams.desaturate
                            ? modifierParams.desaturate * -1
                            : undefined;
                    if (saturationOffset !== undefined) {
                        sParts.push(saturationOffset);
                    }
                    const lParts = [`var(${colorVar}-l, 0)`];
                    if (colorSchemaName) {
                        lParts.push(`var(${colorSchemaNameVar}-lightness-offset, 0)`);
                    }
                    let lightnessOffset = modifierParams.lighten
                        ? modifierParams.lighten
                        : modifierParams.darken
                            ? modifierParams.darken * -1
                            : undefined;
                    if (lightnessOffset !== undefined) {
                        lParts.push(lightnessOffset);
                    }
                    let alpha = modifierParams.alpha !== undefined
                        ? modifierParams.alpha
                        : 1;
                    finalValue = `hsla(
                    calc(
                        ${hParts.join(' + ')}
                    ),
                    calc(
                        (${sParts.join(' + ')}) * 1%
                    ),
                    calc(
                        (${lParts.join(' + ')}) * 1%
                    ),
                    ${modifierParams.alpha !== undefined
                        ? modifierParams.alpha
                        : `var(${colorSchemaNameVar}-a, 1)`}
                    )`;
                    finalValue = finalValue
                        .replace(/(\n|\s{2,99999999})/gm, '')
                        .replace(/\t/gm, ' ')
                        .replace(/\s?\+\s?/gm, ' + ')
                        .replace(/\)\-\s?/gm, ') - ')
                        .replace(/\s?\*\s?/gm, ' * ')
                        .replace(/\s?\/\s?/gm, ' / ');
                    break;
                case 'value':
                default:
                    const colorValue = (_b = this.getSafe(`color.${color}`)) !== null && _b !== void 0 ? _b : color;
                    // nothing to apply on the color
                    if (!schema && !modifier) {
                        finalValue = colorValue;
                    }
                    // init a new SColor instance
                    let colorInstance = new s_color_1.default(colorValue);
                    if (schema) {
                        let finalSchema = schema;
                        if (typeof schema === 'string') {
                            finalSchema = this.getSafe(`colorSchema.${schema}.color.${color}`);
                            if (!finalSchema) {
                                finalSchema = this.getSafe(`colorSchema.${schema}`);
                            }
                        }
                        if (finalSchema) {
                            colorInstance = colorInstance.apply(finalSchema);
                        }
                    }
                    if (modifier) {
                        colorInstance = colorInstance.apply(modifier);
                    }
                    finalValue = colorInstance.toString();
                    break;
            }
        }
        return finalValue;
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
            for (let [colorName, colorValue] of Object.entries(colorsObj)) {
                const c = new s_color_1.default(colorValue);
                callback({
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
                    callback({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCx1REFBMkQ7QUFDM0QsZ0ZBQTBEO0FBQzFELHlDQUF5QztBQUN6QyxvRkFBNEQ7QUFDNUQsNEVBQXFEO0FBQ3JELGlEQUE0RDtBQUM1RCwrQ0FBbUQ7QUFDbkQsdURBQW9FO0FBQ3BFLDBGQUFvRTtBQUNwRSxnRkFBd0Q7QUFDeEQsOERBQXVDO0FBRXZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHdCQUF5QixTQUFRLHFCQUFZO0lBQy9DLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQW1LRCxNQUFxQixVQUFXLFNBQVEseUJBQWU7SUF3MUNuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEtBQWMsRUFDZCxPQUFnQixFQUNoQixRQUFtQztRQUVuQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFR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