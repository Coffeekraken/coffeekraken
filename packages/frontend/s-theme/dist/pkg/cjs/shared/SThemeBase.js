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
// import __micromatch from 'micromatch';
const s_event_emitter_1 = __importDefault(require("@coffeekraken/s-event-emitter"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const is_1 = require("@coffeekraken/sugar/is");
const object_2 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const known_css_properties_1 = __importDefault(require("known-css-properties"));
/**
 * @name            SThemeBase
 * @namespace       shared
 * @type            Class
 * @extends         SEventEmitter
 * @platform        node
 * @platform        js
 * @status          beta
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
 * theme.loopOnColors(({name, shade, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class shadesNameInterface extends s_interface_1.default {
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
        return (0, object_2.__objectHash)(config);
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
     * his shade and modifier.
     * You can get back either a css variable or the actual color value by specifying
     * the "settings.return" setting.
     *
     * @param       {String}            color       The color you want to resolve
     * @param       {String}            [shade=null]      The color shade you want
     * @param       {String}            [modifier=null]     The modifier you want to apply. Can be something like "--darken 30%", etc...
     * @param       {ISThemeColorResolveColorSettings}      [settings={}]           Some settings
     * @return      {any}                       The final resolved color
     *
     * @setting         {'var'|'value'}         [return='value']        The return format you want
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static resolveColor(color, shade, modifier, settings) {
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        return theme.resolveColor(color, shade, modifier, settings);
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
     * cssVar('ui.button.padding'); // => var(--s-ui-button-padding, 1em 1.2em)
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static cssVar(dotPath, fallback = true, settings) {
        // get the theme instance
        const theme = this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant);
        // proxy non existint dotPath
        dotPath = theme.proxyNonExistingUiDotpath(dotPath);
        // prepare final variable name
        let varName = `s-${dotPath
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-')}`;
        varName = `--${(0, string_1.__dashCase)(varName)}`;
        let fb = theme.get(dotPath);
        if (!fallback || (typeof fb === 'string' && fb.includes(',')))
            fb = 0;
        const v = `var(${varName}, ${fb})`;
        return v;
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
        const dashProp = (0, string_1.__dashCase)(property);
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
                let color = value, shade, modifier;
                if (Array.isArray(value) && value.length === 2) {
                    color = value[0];
                    shade = value[1];
                }
                if (Array.isArray(value) && value.length === 3) {
                    color = value[0];
                    shade = value[1];
                    modifier = value[2];
                }
                return ((_c = this.resolveColor(color, shade, modifier, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { return: 'value' }))) !== null && _c !== void 0 ? _c : value);
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
     * - `default-color`: Apply the default color using `@s.color` mixin
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
            var _a;
            if (finalSettings.exclude.indexOf(prop) !== -1)
                return;
            if (finalSettings.exclude.indexOf((0, string_1.__dashCase)(prop)) !== -1)
                return;
            const originalProp = prop;
            prop = (0, string_1.__dashCase)(prop).trim();
            if (finalSettings.exclude.length &&
                finalSettings.exclude.indexOf(prop) !== -1)
                return;
            if (finalSettings.only.length &&
                finalSettings.only.indexOf(prop) === -1)
                return;
            const value = jsObject[originalProp];
            if (!value)
                return;
            // media queries
            const medias = Object.keys(this.get('media.queries'));
            if (medias.includes(originalProp)) {
                propsStack.push(`@s.media(${prop.replace(/^@/, '')}) {`);
                propsStack.push(this.jsObjectToCssProperties(value, finalSettings));
                propsStack.push(`}`);
            }
            else {
                switch (prop) {
                    case 'font-family':
                        propsStack.push(`@s.font.family(${value});`);
                        break;
                    case 'font-size':
                        propsStack.push(`@s.font.size(${value});`);
                        break;
                    case 'color':
                    case 'background-color':
                        let color = value, shade, modifier;
                        if (Array.isArray(value) && value.length === 2) {
                            color = value[0];
                            shade = value[1];
                        }
                        if (Array.isArray(value) && value.length === 3) {
                            color = value[0];
                            shade = value[1];
                            modifier = value[2];
                        }
                        propsStack.push(`${prop}: ${(_a = this.resolveColor(color, shade, modifier, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { return: 'var' }))) !== null && _a !== void 0 ? _a : value};`);
                        break;
                    case 'border-radius':
                    case 'border-top-left-radius':
                    case 'border-top-right-radius':
                    case 'border-bottom-right-radius':
                    case 'border-bottom-left-radius':
                        propsStack.push(`border-radius: s.border.radius(${value});`);
                        break;
                    case 'border-width':
                        propsStack.push(`border-width: s.border.width(${value});`);
                        break;
                    case 'transition':
                        propsStack.push(`transition: s.transition(${value});`);
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
                        propsStack.push(`${prop}: s.margin(${value});`);
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
                        propsStack.push(`${prop}: s.padding(${value});`);
                        break;
                    case 'depth':
                        propsStack.push(`@s.depth(${value});`);
                        break;
                    case 'default-color':
                        propsStack.push(`@s.color(${value});`);
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
            let variable = `--s-${varKey}`;
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
                `${`--s-color-${from}-h`}: ${color.h};`,
                `${`--s-color-${from}-s`}: ${color.s};`,
                `${`--s-color-${from}-l`}: ${color.l};`,
                `${`--s-color-${from}-a`}: ${color.a};`,
            ];
            result.properties[`--s-color-${from}-h`] = color.h;
            result.properties[`--s-color-${from}-s`] = color.s;
            result.properties[`--s-color-${from}-l`] = color.l;
            result.properties[`--s-color-${from}-a`] = color.a;
        }
        else {
            const toColorName = to.split('-').slice(0, 1)[0], fromColorName = from.split('-').slice(0, 1)[0];
            let toColorVariant = to.split('-').pop(), fromColorVariant = from.split('-').pop();
            if (toColorName === toColorVariant)
                toColorVariant = undefined;
            if (fromColorName === fromColorVariant)
                fromColorVariant = undefined;
            let fromVariable = `--s-color-${fromColorName}`, toVariable = `--s-color-${toColorName}`;
            this.getTheme(settings === null || settings === void 0 ? void 0 : settings.theme, settings === null || settings === void 0 ? void 0 : settings.variant).loopOnColors((colorObj) => {
                if (colorObj.name === toColorName) {
                    if (toColorVariant) {
                        if (colorObj.shade === toColorVariant) {
                            result.vars.push(`${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0);`);
                            result.properties[`${fromVariable}-saturation-offset`] = `var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0)`;
                            result.vars.push(`${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0);`);
                            result.properties[`${fromVariable}-lightness-offset`] = `var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0)`;
                            result.vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                            result.properties[`${fromVariable}-a`] = `var(${toVariable}-a, 1)`;
                        }
                    }
                    else {
                        if (!colorObj.shade && colorObj.value.color) {
                            result.vars.push(`${fromVariable}-h: var(${toVariable}-h);`);
                            result.properties[`${fromVariable}-h`] = `var(${toVariable}-h)`;
                            result.vars.push(`${fromVariable}-s: var(${toVariable}-s);`);
                            result.properties[`${fromVariable}-s`] = `var(${toVariable}-s)`;
                            result.vars.push(`${fromVariable}-l: var(${toVariable}-l);`);
                            result.properties[`${fromVariable}-l`] = `var(${toVariable}-l)`;
                        }
                        else {
                            result.vars.push(`${fromVariable}-${colorObj.shadeDash}-saturation-offset: var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0);`);
                            result.properties[`${fromVariable}-${colorObj.shadeDash}-saturation-offset`] = `var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0)`;
                            result.vars.push(`${fromVariable}-${colorObj.shadeDash}-lightness-offset: var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0);`);
                            result.properties[`${fromVariable}-${colorObj.shadeDash}-lightness-offset`] = `var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0)`;
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
            `--s: ${themeInstance.theme};`,
            `--s-variant: ${themeInstance.variant};`,
        ];
        // handle colors
        themeInstance.loopOnColors((colorObj) => {
            const baseVariable = colorObj.value.variable;
            if (!colorObj.shade && colorObj.value.color) {
                vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
                vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
                vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
                vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
                vars.push(`${baseVariable}-origin-h: ${colorObj.value.h};`);
                vars.push(`${baseVariable}-origin-s: ${colorObj.value.s};`);
                vars.push(`${baseVariable}-origin-l: ${colorObj.value.l};`);
                vars.push(`${baseVariable}-origin-a: ${colorObj.value.a};`);
            }
            else if (colorObj.shade) {
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
        const themeObjWithoutColors = Object.assign({}, themeInstance.get('.'));
        delete themeObjWithoutColors.color;
        const flattenedTheme = (0, object_2.__flatten)(themeObjWithoutColors);
        const keep = [
            '--s-easing',
            '--s-timing',
            '--s-transition',
            '--s-scale',
            '--s-opacity',
            '--s-width',
            '--s-height',
            '--s-depth',
            '--s-size',
            '--s-font',
            '--s-border',
            '--s-space',
            '--s-margin',
            '--s-padding',
            '--s-offsize',
            '--s-color',
            '--s-layout',
            '--s-shape',
            '--s-ui',
        ];
        Object.keys(flattenedTheme).forEach((key) => {
            const value = flattenedTheme[key];
            const varKey = key
                .replace(/\./gm, '-')
                .replace(/:/gm, '-')
                .replace(/\?/gm, '')
                .replace(/--/gm, '-');
            let variable = `--${(0, string_1.__dashCase)(`s-${varKey}`)}`;
            // filter some variables
            let hasToKeep = false;
            for (let [i, startWith] of keep.entries()) {
                if (variable.startsWith(startWith)) {
                    hasToKeep = true;
                    break;
                }
            }
            if (!hasToKeep) {
                return;
            }
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
        return (0, object_2.__objectHash)(config);
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
        (0, object_1.__set)(this._overridedConfig, dotPath, value);
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
                variable: `--${(0, string_1.__dashCase)(`s-color-${colorName}`)}`,
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
        const defaultSize = this.get('font.size.default');
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`font.size.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}px`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}`;
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
        const defaultSize = this.get('padding.default');
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`padding.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}px`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}px`;
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
        const defaultSize = this.get('margin.default');
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`margin.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}px`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}px`;
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
        const defaultSize = this.get('border.radius.default');
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`border.radius.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}px`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}px`;
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
        const defaultSize = this.get('border.width.default');
        // try to get the padding with the pased
        const registeredValue = this.getSafe(`border.width.${size}`);
        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}px`;
            }
        }
        else if (typeof size === 'number') {
            return `${defaultSize * size}px`;
        }
        // by default, return the passed size
        return registeredValue !== null && registeredValue !== void 0 ? registeredValue : size;
    }
    /**
     * @name        resolveColor
     * @type        Function
     *
     * This method allows you to get back the actual final value of a color with
     * his shade and modifier.
     * You can get back either a css variable or the actual color value by specifying
     * the "settings.return" setting.
     *
     * @param       {String}            color       The color you want to resolve
     * @param       {String}            [shade=null]      The color shade you want
     * @param       {String}            [modifier=null]     The modifier you want to apply. Can be something like "--darken 30%", etc...
     * @param       {ISThemeColorResolveColorSettings}      [settings={}]           Some settings
     * @return      {any}                       The final resolved color
     *
     * @setting         {'var'|'value'}         [return='value']        The return format you want
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveColor(color, shade, modifier, settings) {
        var _a, _b;
        // concrete color string
        if (color.match(/^(hsla?|rgba?|hsv)\(/))
            return color;
        if (color.match(/^var\(--/))
            return color;
        const finalSettings = Object.assign({ return: 'value' }, (settings !== null && settings !== void 0 ? settings : {}));
        let colorName = color;
        let shadeName = shade !== null && shade !== void 0 ? shade : '';
        let colorModifier = modifier !== null && modifier !== void 0 ? modifier : '';
        if (shadeName.match(/^--[a-zA-Z]+/)) {
            colorModifier = shadeName;
            shadeName = undefined;
        }
        let modifierParams = {};
        if (colorModifier) {
            modifierParams = shadesNameInterface.apply(colorModifier);
        }
        let finalValue;
        let colorInstance;
        // is is a color, return it
        if ((0, is_1.__isColor)(colorName)) {
            colorInstance = new s_color_1.default(colorName);
            if (colorModifier) {
                colorInstance.apply(colorModifier);
            }
        }
        else {
            const colorValue = (_a = this.getSafe(`color.${color}`)) !== null && _a !== void 0 ? _a : color;
            // nothing to apply on the color
            if (!shade && !modifier) {
                finalValue = colorValue;
            }
            // init a new SColor instance
            colorInstance = new s_color_1.default(colorValue);
            if (shade) {
                let finalSchema = shade;
                if (typeof shade === 'string') {
                    finalSchema = this.getSafe(`shades.${shade}.color.${color}`);
                    if (!finalSchema) {
                        finalSchema = this.getSafe(`shades.${shade}`);
                    }
                }
                if (finalSchema) {
                    colorInstance = colorInstance.apply(finalSchema);
                }
            }
            if (modifier) {
                colorInstance = colorInstance.apply(modifier);
            }
        }
        // check what we want back
        // it can be either a "var" or a "value"
        switch (finalSettings.return) {
            case 'object':
                finalValue = colorInstance.toObject();
                break;
            case 'var':
                const colorVar = `--s-color-${colorName}`;
                let shadeNameVar = `s-color-${colorName}`;
                if (shadeName) {
                    shadeNameVar += `-${(0, string_1.__dashCase)(shadeName)}`;
                }
                shadeNameVar = '--' + shadeNameVar.replace(/-{2,999}/gm, '-');
                finalValue = colorVar;
                const hParts = [
                    `var(${colorVar}-h, 0)`,
                    `var(${shadeNameVar}-spin ,${(_b = modifierParams.spin) !== null && _b !== void 0 ? _b : 0})`,
                ];
                const sParts = [`var(${colorVar}-s, 0)`];
                if (shadeName) {
                    sParts.push(`var(${shadeNameVar}-saturation-offset, 0)`);
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
                if (shadeName) {
                    lParts.push(`var(${shadeNameVar}-lightness-offset, 0)`);
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
                    ? alpha
                    : `var(${shadeNameVar}-a, 1)`}
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
                finalValue = colorInstance.toString();
                break;
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
     * - shade    {String}        The name of the variant like "background", "surface", etc...
     * - value      {ISThemeColor | ISThemeColorModifiers}        The actual color object
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loopOnColors(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const colorsObj = this.get('color'), shadessObj = this.get('shades');
            for (let [colorName, colorValue] of Object.entries(colorsObj)) {
                const c = new s_color_1.default(colorValue);
                callback({
                    name: colorName,
                    shade: '',
                    // @ts-ignore
                    value: {
                        color: colorValue,
                        variable: `--${(0, string_1.__dashCase)(`s-color-${colorName}`)}`,
                        r: c.r,
                        g: c.g,
                        b: c.b,
                        h: c.h,
                        s: c.s,
                        l: c.l,
                        a: c.a,
                    },
                });
                for (let [shadeName, shadeObj] of Object.entries(shadessObj)) {
                    const newColor = c.apply(shadeObj, true);
                    callback({
                        name: colorName,
                        shade: shadeName,
                        shadeDash: (0, string_1.__dashCase)(shadeName),
                        value: Object.assign(Object.assign({ variable: `--${(0, string_1.__dashCase)(`s-color-${colorName}-${shadeName}`)}` }, shadeObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
                    });
                    // @ts-ignore
                    if (shadeObj.color) {
                        for (let [shadesColorName, shadesObj,
                        // @ts-ignore
                        ] of Object.entries(shadeObj.color)) {
                            if (shadesColorName !== colorName)
                                continue;
                            const newColor = c.apply(shadesObj, true);
                            callback({
                                name: shadesColorName,
                                shade: shadeName,
                                value: Object.assign(Object.assign({ variable: `--${(0, string_1.__dashCase)(`s-color-${shadesColorName}-${shadeName}`)}` }, shadesObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCx1REFBa0U7QUFDbEUseUNBQXlDO0FBQ3pDLG9GQUE0RDtBQUM1RCw0RUFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELHVEQUlvQztBQUNwQyx1REFBd0Q7QUFDeEQsZ0ZBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLG1CQUFvQixTQUFRLHFCQUFZO0lBQzFDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXVLRCxNQUFxQixVQUFXLFNBQVEseUJBQWU7SUFDbkQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBVTs7UUFDdkIsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsbUJBQW1CO1FBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUEsZUFBTSxFQUFDLE1BQUEsS0FBSyxDQUFDLE9BQU8sbUNBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pELElBQUksS0FBSyxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdkQ7aUJBQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtnQkFDckMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RDtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7UUFFSCxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV4QixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBb0NEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxFQUFFO1FBQ0YsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sd0JBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sS0FBSyxPQUFPO1FBQ2QsT0FBTyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsS0FBSyxJQUFJLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxDQUFDLGFBQWE7O1FBQ2hCLElBQUksWUFBWSxHQUFHLHdCQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUNoRCxjQUFjLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFekQsSUFBSSxLQUFLLEdBQUcsWUFBWSxFQUNwQixPQUFPLEdBQUcsY0FBYyxDQUFDO1FBRTdCLE1BQU0sS0FBSyxHQUNQLE1BQUEsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxPQUFPLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7UUFFdkUsT0FBTyxJQUFBLG9CQUFXLEVBQ2Q7WUFDSSxJQUFJLEVBQUUsR0FBRyxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxZQUFZLElBQUksT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksY0FBYyxFQUFFO1lBQzdELEtBQUssRUFBRSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxZQUFZO1lBQzVCLE9BQU8sRUFBRSxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxjQUFjO1NBQ3JDLEVBQ0QsS0FBSyxDQUNSLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxLQUFLLE1BQU07O1FBQ2IsTUFBTSxNQUFNLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEQsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQzFCLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQzlCLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQ2YsT0FBTyxHQUFHLE1BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxPQUFPLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkIsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHO29CQUNuQixLQUFLLEVBQUUsTUFBQSxRQUFRLENBQUMsS0FBSyxtQ0FBSSxFQUFFO29CQUMzQixRQUFRLEVBQUUsRUFBRTtpQkFDZixDQUFDO2FBQ0w7WUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDekMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLENBQUM7YUFDckQ7U0FDSjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFtQkQsTUFBTSxDQUFDLFFBQVEsQ0FDWCxLQUFhLEVBQ2IsT0FBZSxFQUNmLFFBQW1DOztRQUVuQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLHdCQUFjLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFFcEUsS0FBSyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLE1BQUEsSUFBSSxDQUFDLHdCQUF3QiwwQ0FBRSxLQUFLLENBQUM7UUFDdEQsT0FBTyxHQUFHLE9BQU8sYUFBUCxPQUFPLGNBQVAsT0FBTyxHQUFJLE1BQUEsSUFBSSxDQUFDLHdCQUF3QiwwQ0FBRSxPQUFPLENBQUM7UUFFNUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEtBQUssR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixPQUFPLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDakQ7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQzlDLEtBQUssR0FBRyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQyxPQUFPLEdBQUcsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDakQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx3QkFBd0IsR0FBRztnQkFDNUIsS0FBSztnQkFDTCxPQUFPO2dCQUNQLFFBQVE7YUFDWCxDQUFDO1NBQ0w7UUFFRCxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEtBQUssSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDMUQ7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQ3RELEtBQUssRUFDTCxPQUFPLEVBQ1AsUUFBUSxDQUNYLENBQUM7U0FDTDtRQUNELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsS0FBSyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUNQLFVBQWtCLEVBQUUsRUFDcEIsUUFBZ0Q7UUFFaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsT0FBTyxJQUFBLHFCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQVMsRUFDVCxRQUFnRDtRQUVoRCx5QkFBeUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUMsQ0FBQztRQUVoRSxvQkFBb0I7UUFDcEIsT0FBTyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUNqQixJQUFTLEVBQ1QsUUFBZ0Q7UUFFaEQseUJBQXlCO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUssRUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFDLENBQUM7UUFFaEUsb0JBQW9CO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FDaEIsSUFBUyxFQUNULFFBQWdEO1FBRWhELHlCQUF5QjtRQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWhFLG9CQUFvQjtRQUNwQixPQUFPLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxtQkFBbUIsQ0FDdEIsSUFBUyxFQUNULFFBQWdEO1FBRWhELHlCQUF5QjtRQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRWhFLG9CQUFvQjtRQUNwQixPQUFPLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGtCQUFrQixDQUNyQixJQUFTLEVBQ1QsUUFBZ0Q7UUFFaEQseUJBQXlCO1FBQ3pCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUssRUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFDLENBQUM7UUFFaEUsb0JBQW9CO1FBQ3BCLE9BQU8sS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUNmLEtBQWEsRUFDYixLQUFjLEVBQ2QsUUFBaUIsRUFDakIsUUFBK0M7UUFFL0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUMsQ0FBQztRQUNoRSxPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FDVCxPQUFlLEVBQ2YsUUFBUSxHQUFHLElBQUksRUFDZixRQUFnRDtRQUVoRCx5QkFBeUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsS0FBSyxFQUFFLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLENBQUMsQ0FBQztRQUVoRSw2QkFBNkI7UUFDN0IsT0FBTyxHQUFHLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuRCw4QkFBOEI7UUFDOUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxPQUFPO2FBQ3JCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2FBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUM1QixPQUFPLEdBQUcsS0FBSyxJQUFBLG1CQUFVLEVBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUVyQyxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFdEUsTUFBTSxDQUFDLEdBQUcsT0FBTyxPQUFPLEtBQUssRUFBRSxHQUFHLENBQUM7UUFDbkMsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsdUJBQXVCLENBQzFCLFFBQWdCLEVBQ2hCLEtBQVUsRUFDVixRQUFnRDs7UUFFaEQsTUFBTSxRQUFRLEdBQUcsSUFBQSxtQkFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLFFBQVEsUUFBUSxFQUFFO1lBQ2QsS0FBSyxhQUFhO2dCQUNkLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxPQUFPLE1BQUEsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFVBQVUsbUNBQUksS0FBSyxDQUFDO2dCQUNwQyxNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLE9BQU8sTUFBQSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsbUNBQUksS0FBSyxDQUFDO2dCQUN0RCxNQUFNO1lBQ1YsS0FBSyxPQUFPLENBQUM7WUFDYixLQUFLLGtCQUFrQjtnQkFDbkIsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUNiLEtBQUssRUFDTCxRQUFRLENBQUM7Z0JBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUM1QyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNwQjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0JBQzVDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZCO2dCQUNELE9BQU8sQ0FDSCxNQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLGtDQUNqQyxDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxLQUNuQixNQUFNLEVBQUUsT0FBTyxJQUNqQixtQ0FBSSxLQUFLLENBQ2QsQ0FBQztnQkFDRixNQUFNO1lBQ1YsS0FBSyxlQUFlLENBQUM7WUFDckIsS0FBSyx3QkFBd0IsQ0FBQztZQUM5QixLQUFLLHlCQUF5QixDQUFDO1lBQy9CLEtBQUssNEJBQTRCLENBQUM7WUFDbEMsS0FBSywyQkFBMkI7Z0JBQzVCLE9BQU8sTUFBQSxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLG1DQUFJLEtBQUssQ0FBQztnQkFDaEQsTUFBTTtZQUNWLEtBQUssY0FBYztnQkFDZixPQUFPLE1BQUEsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxtQ0FBSSxLQUFLLENBQUM7Z0JBQy9DLE1BQU07WUFDVixLQUFLLFlBQVk7Z0JBQ2IsT0FBTyxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQyxtQ0FBSSxLQUFLLENBQUM7Z0JBQ3BELE1BQU07WUFDVixLQUFLLGVBQWUsQ0FBQztZQUNyQixLQUFLLGNBQWMsQ0FBQztZQUNwQixLQUFLLHFCQUFxQixDQUFDO1lBQzNCLEtBQUssbUJBQW1CLENBQUM7WUFDekIsS0FBSyxvQkFBb0IsQ0FBQztZQUMxQixLQUFLLGtCQUFrQixDQUFDO1lBQ3hCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxZQUFZLENBQUM7WUFDbEIsS0FBSyxlQUFlLENBQUM7WUFDckIsS0FBSyxhQUFhLENBQUM7WUFDbkIsS0FBSyxjQUFjO2dCQUNmLE9BQU8sTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxtQ0FBSSxLQUFLLENBQUM7Z0JBQzFDLE1BQU07WUFDVixLQUFLLGdCQUFnQixDQUFDO1lBQ3RCLEtBQUssZUFBZSxDQUFDO1lBQ3JCLEtBQUssc0JBQXNCLENBQUM7WUFDNUIsS0FBSyxvQkFBb0IsQ0FBQztZQUMxQixLQUFLLHFCQUFxQixDQUFDO1lBQzNCLEtBQUssbUJBQW1CLENBQUM7WUFDekIsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGdCQUFnQixDQUFDO1lBQ3RCLEtBQUssY0FBYyxDQUFDO1lBQ3BCLEtBQUssZUFBZTtnQkFDaEIsT0FBTyxNQUFBLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLG1DQUFJLEtBQUssQ0FBQztnQkFDM0MsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixPQUFPLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssRUFBRSxFQUFFLFFBQVEsQ0FBQyxtQ0FBSSxLQUFLLENBQUM7Z0JBQ3pELE1BQU07U0FDYjtRQUVELHNDQUFzQztRQUN0QyxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FDbkMsTUFBVyxFQUNYLFFBQWdEO1FBRWhELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0RTtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsTUFBTSxDQUFDLHVCQUF1QixDQUMxQixRQUFhLEVBQ2IsUUFBNEM7UUFFNUMsTUFBTSxhQUFhLEdBQTZCLElBQUEsb0JBQVcsRUFDdkQ7WUFDSSxPQUFPLEVBQUUsRUFBRTtZQUNYLElBQUksRUFBRSxFQUFFO1NBQ1gsRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFhLEVBQUUsQ0FBQztRQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztZQUNuQyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPO1lBQ3ZELElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBQSxtQkFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU87WUFFbkUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksR0FBRyxJQUFBLG1CQUFVLEVBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFL0IsSUFDSSxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU07Z0JBQzVCLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFMUMsT0FBTztZQUNYLElBQ0ksYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXZDLE9BQU87WUFFWCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUs7Z0JBQUUsT0FBTztZQUVuQixnQkFBZ0I7WUFDaEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUMvQixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxVQUFVLENBQUMsSUFBSSxDQUNYLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQ3JELENBQUM7Z0JBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtpQkFBTTtnQkFDSCxRQUFRLElBQUksRUFBRTtvQkFDVixLQUFLLGFBQWE7d0JBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDN0MsTUFBTTtvQkFDVixLQUFLLFdBQVc7d0JBQ1osVUFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDM0MsTUFBTTtvQkFFVixLQUFLLE9BQU8sQ0FBQztvQkFDYixLQUFLLGtCQUFrQjt3QkFDbkIsSUFBSSxLQUFLLEdBQUcsS0FBSyxFQUNiLEtBQUssRUFDTCxRQUFRLENBQUM7d0JBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFOzRCQUM1QyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNqQixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNwQjt3QkFDRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQzVDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3ZCO3dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQ1gsR0FBRyxJQUFJLEtBQ0gsTUFBQSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxrQ0FDakMsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsS0FDbkIsTUFBTSxFQUFFLEtBQUssSUFDZixtQ0FBSSxLQUNWLEdBQUcsQ0FDTixDQUFDO3dCQUNGLE1BQU07b0JBRVYsS0FBSyxlQUFlLENBQUM7b0JBQ3JCLEtBQUssd0JBQXdCLENBQUM7b0JBQzlCLEtBQUsseUJBQXlCLENBQUM7b0JBQy9CLEtBQUssNEJBQTRCLENBQUM7b0JBQ2xDLEtBQUssMkJBQTJCO3dCQUM1QixVQUFVLENBQUMsSUFBSSxDQUNYLGtDQUFrQyxLQUFLLElBQUksQ0FDOUMsQ0FBQzt3QkFDRixNQUFNO29CQUNWLEtBQUssY0FBYzt3QkFDZixVQUFVLENBQUMsSUFBSSxDQUNYLGdDQUFnQyxLQUFLLElBQUksQ0FDNUMsQ0FBQzt3QkFDRixNQUFNO29CQUNWLEtBQUssWUFBWTt3QkFDYixVQUFVLENBQUMsSUFBSSxDQUFDLDRCQUE0QixLQUFLLElBQUksQ0FBQyxDQUFDO3dCQUN2RCxNQUFNO29CQUNWLEtBQUssZUFBZSxDQUFDO29CQUNyQixLQUFLLGNBQWMsQ0FBQztvQkFDcEIsS0FBSyxxQkFBcUIsQ0FBQztvQkFDM0IsS0FBSyxtQkFBbUIsQ0FBQztvQkFDekIsS0FBSyxvQkFBb0IsQ0FBQztvQkFDMUIsS0FBSyxrQkFBa0IsQ0FBQztvQkFDeEIsS0FBSyxRQUFRLENBQUM7b0JBQ2QsS0FBSyxZQUFZLENBQUM7b0JBQ2xCLEtBQUssZUFBZSxDQUFDO29CQUNyQixLQUFLLGFBQWEsQ0FBQztvQkFDbkIsS0FBSyxjQUFjO3dCQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGNBQWMsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDaEQsTUFBTTtvQkFDVixLQUFLLGdCQUFnQixDQUFDO29CQUN0QixLQUFLLGVBQWUsQ0FBQztvQkFDckIsS0FBSyxzQkFBc0IsQ0FBQztvQkFDNUIsS0FBSyxvQkFBb0IsQ0FBQztvQkFDMUIsS0FBSyxxQkFBcUIsQ0FBQztvQkFDM0IsS0FBSyxtQkFBbUIsQ0FBQztvQkFDekIsS0FBSyxTQUFTLENBQUM7b0JBQ2YsS0FBSyxhQUFhLENBQUM7b0JBQ25CLEtBQUssZ0JBQWdCLENBQUM7b0JBQ3RCLEtBQUssY0FBYyxDQUFDO29CQUNwQixLQUFLLGVBQWU7d0JBQ2hCLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDakQsTUFBTTtvQkFDVixLQUFLLE9BQU87d0JBQ1IsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLENBQUM7d0JBQ3ZDLE1BQU07b0JBQ1YsS0FBSyxlQUFlO3dCQUNoQixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQzt3QkFDdkMsTUFBTTtvQkFDVjt3QkFDSSxNQUFNLEtBQUssR0FBRyw4QkFBb0IsQ0FBQyxHQUFHLENBQUM7d0JBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQUUsT0FBTzt3QkFDdkMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNO2lCQUNiO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLDZCQUE2QixDQUFDLEdBQVE7UUFDekMsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO1FBRXhCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsa0JBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3JELElBQUksSUFBQSxjQUFTLEVBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsQ0FBQyxDQUFBO29CQUFFLFNBQVM7Z0JBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFVLEtBQUssQ0FBQyxDQUFDO2dCQUMxRCxJQUFJLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQztZQUVELE1BQU0sTUFBTSxHQUFHLEdBQUc7aUJBQ2IsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7aUJBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2lCQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztpQkFDbkIsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUUxQixJQUFJLFFBQVEsR0FBRyxPQUFPLE1BQU0sRUFBRSxDQUFDO1lBRS9CLElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLE1BQU0sS0FBSyxJQUFJLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxLQUFLLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDdkM7U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUNoQixJQUFZLEVBQ1osRUFBVSxFQUNWLFFBQWdEO1FBRWhELE1BQU0sTUFBTSxHQUE0QjtZQUNwQyxJQUFJLEVBQUUsRUFBRTtZQUNSLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLENBQUM7UUFFRixJQUFJLElBQUEsY0FBUyxFQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2YsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxJQUFJLEdBQUc7Z0JBQ1YsR0FBRyxhQUFhLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUc7Z0JBQ3ZDLEdBQUcsYUFBYSxJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxHQUFHO2dCQUN2QyxHQUFHLGFBQWEsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRztnQkFDdkMsR0FBRyxhQUFhLElBQUksSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUc7YUFDMUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ25ELE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNILE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDNUMsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUNwQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzdDLElBQUksV0FBVyxLQUFLLGNBQWM7Z0JBQUUsY0FBYyxHQUFHLFNBQVMsQ0FBQztZQUMvRCxJQUFJLGFBQWEsS0FBSyxnQkFBZ0I7Z0JBQ2xDLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztZQUVqQyxJQUFJLFlBQVksR0FBRyxhQUFhLGFBQWEsRUFBRSxFQUMzQyxVQUFVLEdBQUcsYUFBYSxXQUFXLEVBQUUsQ0FBQztZQUU1QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FDMUQsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDVCxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO29CQUMvQixJQUFJLGNBQWMsRUFBRTt3QkFDaEIsSUFBSSxRQUFRLENBQUMsS0FBSyxLQUFLLGNBQWMsRUFBRTs0QkFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLDJCQUEyQixVQUFVLElBQUksUUFBUSxDQUFDLFNBQVMseUJBQXlCLENBQ3RHLENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FDYixHQUFHLFlBQVksb0JBQW9CLENBQ3RDLEdBQUcsT0FBTyxVQUFVLElBQUksUUFBUSxDQUFDLFNBQVMsd0JBQXdCLENBQUM7NEJBQ3BFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsWUFBWSwwQkFBMEIsVUFBVSxJQUFJLFFBQVEsQ0FBQyxTQUFTLHdCQUF3QixDQUNwRyxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxZQUFZLG1CQUFtQixDQUNyQyxHQUFHLE9BQU8sVUFBVSxJQUFJLFFBQVEsQ0FBQyxTQUFTLHVCQUF1QixDQUFDOzRCQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixHQUFHLFlBQVksV0FBVyxVQUFVLFNBQVMsQ0FDaEQsQ0FBQzs0QkFDRixNQUFNLENBQUMsVUFBVSxDQUNiLEdBQUcsWUFBWSxJQUFJLENBQ3RCLEdBQUcsT0FBTyxVQUFVLFFBQVEsQ0FBQzt5QkFDakM7cUJBQ0o7eUJBQU07d0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7NEJBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsWUFBWSxXQUFXLFVBQVUsTUFBTSxDQUM3QyxDQUFDOzRCQUNGLE1BQU0sQ0FBQyxVQUFVLENBQ2IsR0FBRyxZQUFZLElBQUksQ0FDdEIsR0FBRyxPQUFPLFVBQVUsS0FBSyxDQUFDOzRCQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixHQUFHLFlBQVksV0FBVyxVQUFVLE1BQU0sQ0FDN0MsQ0FBQzs0QkFDRixNQUFNLENBQUMsVUFBVSxDQUNiLEdBQUcsWUFBWSxJQUFJLENBQ3RCLEdBQUcsT0FBTyxVQUFVLEtBQUssQ0FBQzs0QkFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLFdBQVcsVUFBVSxNQUFNLENBQzdDLENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FDYixHQUFHLFlBQVksSUFBSSxDQUN0QixHQUFHLE9BQU8sVUFBVSxLQUFLLENBQUM7eUJBQzlCOzZCQUFNOzRCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNaLEdBQUcsWUFBWSxJQUFJLFFBQVEsQ0FBQyxTQUFTLDJCQUEyQixVQUFVLElBQUksUUFBUSxDQUFDLFNBQVMseUJBQXlCLENBQzVILENBQUM7NEJBQ0YsTUFBTSxDQUFDLFVBQVUsQ0FDYixHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsU0FBUyxvQkFBb0IsQ0FDNUQsR0FBRyxPQUFPLFVBQVUsSUFBSSxRQUFRLENBQUMsU0FBUyx3QkFBd0IsQ0FBQzs0QkFDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osR0FBRyxZQUFZLElBQUksUUFBUSxDQUFDLFNBQVMsMEJBQTBCLFVBQVUsSUFBSSxRQUFRLENBQUMsU0FBUyx3QkFBd0IsQ0FDMUgsQ0FBQzs0QkFDRixNQUFNLENBQUMsVUFBVSxDQUNiLEdBQUcsWUFBWSxJQUFJLFFBQVEsQ0FBQyxTQUFTLG1CQUFtQixDQUMzRCxHQUFHLE9BQU8sVUFBVSxJQUFJLFFBQVEsQ0FBQyxTQUFTLHVCQUF1QixDQUFDOzRCQUNuRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FDWixHQUFHLFlBQVksV0FBVyxVQUFVLFNBQVMsQ0FDaEQsQ0FBQzs0QkFDRixNQUFNLENBQUMsVUFBVSxDQUNiLEdBQUcsWUFBWSxJQUFJLENBQ3RCLEdBQUcsT0FBTyxVQUFVLFFBQVEsQ0FBQzt5QkFDakM7cUJBQ0o7aUJBQ0o7WUFDTCxDQUFDLENBQ0osQ0FBQztTQUNMO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUNaLFFBQWdEO1FBRWhELGFBQWE7UUFFYixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxhQUFhO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FDWCwwQ0FBMEMsUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsT0FBTywrQkFBK0IsQ0FDOUcsQ0FBQztRQUVOLElBQUksSUFBSSxHQUFhO1lBQ2pCLFFBQVEsYUFBYSxDQUFDLEtBQUssR0FBRztZQUM5QixnQkFBZ0IsYUFBYSxDQUFDLE9BQU8sR0FBRztTQUMzQyxDQUFDO1FBRUYsZ0JBQWdCO1FBQ2hCLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNwQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUU3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLGNBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxjQUFjLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksY0FBYyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLGNBQWMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQy9EO2lCQUFNLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDdkIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtvQkFDekIsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLFlBQVksdUJBQXVCLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQ25FLENBQUM7aUJBQ0w7cUJBQU0sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLFlBQVksdUJBQ1gsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUNqQyxHQUFHLENBQ04sQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSx3QkFBd0IsQ0FBQyxDQUFDO2lCQUN0RDtnQkFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO29CQUN4QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsWUFBWSxzQkFBc0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FDakUsQ0FBQztpQkFDTDtxQkFBTSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO29CQUM5QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsWUFBWSxzQkFDWCxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQzdCLEdBQUcsQ0FDTixDQUFDO2lCQUNMO3FCQUFNO29CQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLHVCQUF1QixDQUFDLENBQUM7aUJBQ3JEO2dCQUNELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRTtvQkFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQzVEO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFxQjtRQUNyQixNQUFNLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4RSxPQUFPLHFCQUFxQixDQUFDLEtBQUssQ0FBQztRQUNuQyxNQUFNLGNBQWMsR0FBRyxJQUFBLGtCQUFTLEVBQUMscUJBQXFCLENBQUMsQ0FBQztRQUV4RCxNQUFNLElBQUksR0FBRztZQUNULFlBQVk7WUFDWixZQUFZO1lBQ1osZ0JBQWdCO1lBQ2hCLFdBQVc7WUFDWCxhQUFhO1lBQ2IsV0FBVztZQUNYLFlBQVk7WUFDWixXQUFXO1lBQ1gsVUFBVTtZQUNWLFVBQVU7WUFDVixZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixhQUFhO1lBQ2IsYUFBYTtZQUNiLFdBQVc7WUFDWCxZQUFZO1lBQ1osV0FBVztZQUNYLFFBQVE7U0FDWCxDQUFDO1FBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QyxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsTUFBTSxNQUFNLEdBQUcsR0FBRztpQkFDYixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQztpQkFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7aUJBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2lCQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLElBQUksUUFBUSxHQUFHLEtBQUssSUFBQSxtQkFBVSxFQUFDLEtBQUssTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO1lBRWhELHdCQUF3QjtZQUN4QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDdkMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUNoQyxTQUFTLEdBQUcsSUFBSSxDQUFDO29CQUNqQixNQUFNO2lCQUNUO2FBQ0o7WUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNaLE9BQU87YUFDVjtZQUVELElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN2RDtpQkFBTTtnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxLQUFLLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDckQ7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUNWLE9BQWUsRUFDZixRQUFnRDtRQUVoRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxLQUFLLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ25FLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDekIsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQ04sT0FBZSxFQUNmLFFBQWdEO1FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUssRUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLEdBQUcsQ0FDTixPQUFlLEVBQ2YsS0FBVSxFQUNWLFFBQWdEO1FBRWhELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEtBQUssRUFBRSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxLQUFjLEVBQ2QsT0FBZ0IsRUFDaEIsUUFBbUM7UUFFbkMsS0FBSyxDQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQXZrQzNDOzs7Ozs7Ozs7V0FTRztRQUNLLHFCQUFnQixHQUFRLEVBQUUsQ0FBQztRQStqQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksd0JBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU5RCxJQUFJLENBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUU7WUFDbkUsTUFBTSxJQUFJLEtBQUssQ0FDWCwwQ0FBMEMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTywrQkFBK0IsQ0FDdEcsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksTUFBTTtRQUNOLE9BQU8sd0JBQWMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCx5QkFBeUIsQ0FBQyxPQUFlO1FBQ3JDLHVCQUF1QjtRQUN2QixJQUFJLEtBQUssR0FBRyxJQUFBLGNBQUssRUFBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXpDLDZEQUE2RDtRQUM3RCxxRUFBcUU7UUFDckUsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUM3RCxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxhQUFhLENBQUMsQ0FBQztTQUNuRTtRQUVELHFCQUFxQjtRQUNyQixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE9BQU8sQ0FBQyxPQUFlO1FBQ25CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsWUFBWSxFQUFFLElBQUk7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQWdCRCxJQUFJLE9BQU87UUFDUCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCO1FBQ0QsYUFBYTtRQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDOUIsRUFBRSxFQUNGLElBQUEsb0JBQVcsRUFDUCx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDeEIsQ0FDSixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFDRCxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQXdDLEVBQUU7UUFDbkQsTUFBTSxhQUFhLEdBQXVCLElBQUEsb0JBQVcsRUFDakQ7WUFDSSxZQUFZLEVBQUUsS0FBSztZQUNuQixlQUFlLEVBQUUsSUFBSTtTQUN4QixFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsZ0NBQWdDO1FBQ2hDLE9BQU8sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEQsZ0JBQWdCO1FBQ2hCLElBQUksS0FBSyxHQUFHLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekMsSUFBSSxLQUFLLElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtZQUM5QiwyQkFBMkI7WUFDM0IsYUFBYTtZQUNiLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QztRQUVELElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw0Q0FBNEMsSUFBSSxDQUFDLEVBQUUsa0NBQWtDLE9BQU8sNkJBQTZCLENBQzFKLENBQUM7U0FDTDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILGtCQUFrQjtRQUNkLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO0lBQ2pDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsY0FBYztRQUNWLGFBQWE7UUFDYixhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLGVBQWUsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDNUQsQ0FBQyxDQUFDO1FBQ0gsd0JBQXdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxJQUFJLENBQUMsVUFBa0IsRUFBRTtRQUNyQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sSUFBQSxxQkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWTtRQUNSLE9BQU8sd0JBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxHQUFHLENBQUMsT0FBZSxFQUFFLEtBQVU7UUFDM0IsK0NBQStDO1FBQy9DLElBQUEsY0FBSyxFQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0MseUJBQXlCO1FBQ3pCLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoQixPQUFPO1lBQ1AsS0FBSztTQUNSLENBQUMsQ0FBQztRQUNILHdCQUF3QjtRQUN4QixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxPQUFPLENBQUMsT0FBWTtRQUNoQixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUEsb0JBQVcsRUFDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUNyQixPQUFPLGFBQVAsT0FBTyxjQUFQLE9BQU8sR0FBSSxFQUFFLENBQ2hCLENBQUM7UUFDRix5QkFBeUI7UUFDekIsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUM3RCxDQUFDLENBQUM7UUFDSCx3QkFBd0I7UUFDeEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLO1FBQ0QsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFDM0Isd0JBQXdCO1FBQ3hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFVBQVU7UUFDTixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFFZixLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7WUFDbkUsTUFBTSxDQUFDLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDYixLQUFLLEVBQUUsVUFBVTtnQkFDakIsUUFBUSxFQUFFLEtBQUssSUFBQSxtQkFBVSxFQUFDLFdBQVcsU0FBUyxFQUFFLENBQUMsRUFBRTtnQkFDbkQsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1QsQ0FBQztTQUNMO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxlQUFlLENBQUMsSUFBUztRQUNyQixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEQsd0NBQXdDO1FBQ3hDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFELDhDQUE4QztRQUM5QyxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7WUFDL0IsTUFBTTtZQUNOLElBQUksT0FBTyxlQUFlLEtBQUssUUFBUSxFQUFFO2dCQUNyQyxPQUFPLEdBQUcsV0FBVyxHQUFHLGVBQWUsSUFBSSxDQUFDO2FBQy9DO1NBQ0o7YUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUNqQyxPQUFPLEdBQUcsV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDO1NBQ2xDO1FBRUQscUNBQXFDO1FBQ3JDLE9BQU8sZUFBZSxhQUFmLGVBQWUsY0FBZixlQUFlLEdBQUksSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILGNBQWMsQ0FBQyxJQUFTO1FBQ3BCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVoRCx3Q0FBd0M7UUFDeEMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7UUFFeEQsOENBQThDO1FBQzlDLElBQUksZUFBZSxLQUFLLFNBQVMsRUFBRTtZQUMvQixNQUFNO1lBQ04sSUFBSSxPQUFPLGVBQWUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLE9BQU8sR0FBRyxXQUFXLEdBQUcsZUFBZSxJQUFJLENBQUM7YUFDL0M7U0FDSjthQUFNLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2pDLE9BQU8sR0FBRyxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUM7U0FDcEM7UUFFRCxxQ0FBcUM7UUFDckMsT0FBTyxlQUFlLGFBQWYsZUFBZSxjQUFmLGVBQWUsR0FBSSxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsYUFBYSxDQUFDLElBQVM7UUFDbkIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRS9DLHdDQUF3QztRQUN4QyxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV2RCw4Q0FBOEM7UUFDOUMsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQy9CLE1BQU07WUFDTixJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtnQkFDckMsT0FBTyxHQUFHLFdBQVcsR0FBRyxlQUFlLElBQUksQ0FBQzthQUMvQztTQUNKO2FBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDakMsT0FBTyxHQUFHLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQztTQUNwQztRQUVELHFDQUFxQztRQUNyQyxPQUFPLGVBQWUsYUFBZixlQUFlLGNBQWYsZUFBZSxHQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxtQkFBbUIsQ0FBQyxJQUFTO1FBQ3pCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUV0RCx3Q0FBd0M7UUFDeEMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU5RCw4Q0FBOEM7UUFDOUMsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQy9CLE1BQU07WUFDTixJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtnQkFDckMsT0FBTyxHQUFHLFdBQVcsR0FBRyxlQUFlLElBQUksQ0FBQzthQUMvQztTQUNKO2FBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDakMsT0FBTyxHQUFHLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQztTQUNwQztRQUVELHFDQUFxQztRQUNyQyxPQUFPLGVBQWUsYUFBZixlQUFlLGNBQWYsZUFBZSxHQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxrQkFBa0IsQ0FBQyxJQUFTO1FBQ3hCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVyRCx3Q0FBd0M7UUFDeEMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU3RCw4Q0FBOEM7UUFDOUMsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO1lBQy9CLE1BQU07WUFDTixJQUFJLE9BQU8sZUFBZSxLQUFLLFFBQVEsRUFBRTtnQkFDckMsT0FBTyxHQUFHLFdBQVcsR0FBRyxlQUFlLElBQUksQ0FBQzthQUMvQztTQUNKO2FBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDakMsT0FBTyxHQUFHLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQztTQUNwQztRQUVELHFDQUFxQztRQUNyQyxPQUFPLGVBQWUsYUFBZixlQUFlLGNBQWYsZUFBZSxHQUFJLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSCxZQUFZLENBQ1IsS0FBYSxFQUNiLEtBQWMsRUFDZCxRQUFpQixFQUNqQixRQUErQzs7UUFFL0Msd0JBQXdCO1FBQ3hCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3RELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUUxQyxNQUFNLGFBQWEsbUJBQ2YsTUFBTSxFQUFFLE9BQU8sSUFDWixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksU0FBUyxHQUFHLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLGFBQWEsR0FBRyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUM7UUFFbkMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2pDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDMUIsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUN6QjtRQUVELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLGFBQWEsRUFBRTtZQUNmLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxJQUFJLFVBQVUsQ0FBQztRQUVmLElBQUksYUFBYSxDQUFDO1FBRWxCLDJCQUEyQjtRQUMzQixJQUFJLElBQUEsY0FBUyxFQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3RCLGFBQWEsR0FBRyxJQUFJLGlCQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDeEMsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsYUFBYSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUN0QztTQUNKO2FBQU07WUFDSCxNQUFNLFVBQVUsR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUUsQ0FBQyxtQ0FBSSxLQUFLLENBQUM7WUFFM0QsZ0NBQWdDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLFVBQVUsR0FBRyxVQUFVLENBQUM7YUFDM0I7WUFFRCw2QkFBNkI7WUFDN0IsYUFBYSxHQUFHLElBQUksaUJBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUV6QyxJQUFJLEtBQUssRUFBRTtnQkFDUCxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUMzQixXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDdEIsVUFBVSxLQUFLLFVBQVUsS0FBSyxFQUFFLENBQ25DLENBQUM7b0JBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUM7cUJBQ2pEO2lCQUNKO2dCQUNELElBQUksV0FBVyxFQUFFO29CQUNiLGFBQWEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNwRDthQUNKO1lBQ0QsSUFBSSxRQUFRLEVBQUU7Z0JBQ1YsYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDakQ7U0FDSjtRQUVELDBCQUEwQjtRQUMxQix3Q0FBd0M7UUFDeEMsUUFBUSxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQzFCLEtBQUssUUFBUTtnQkFDVCxVQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN0QyxNQUFNO1lBQ1YsS0FBSyxLQUFLO2dCQUNOLE1BQU0sUUFBUSxHQUFHLGFBQWEsU0FBUyxFQUFFLENBQUM7Z0JBRTFDLElBQUksWUFBWSxHQUFHLFdBQVcsU0FBUyxFQUFFLENBQUM7Z0JBQzFDLElBQUksU0FBUyxFQUFFO29CQUNYLFlBQVksSUFBSSxJQUFJLElBQUEsbUJBQVUsRUFBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2lCQUMvQztnQkFDRCxZQUFZLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUU5RCxVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUV0QixNQUFNLE1BQU0sR0FBRztvQkFDWCxPQUFPLFFBQVEsUUFBUTtvQkFDdkIsT0FBTyxZQUFZLFVBQVUsTUFBQSxjQUFjLENBQUMsSUFBSSxtQ0FBSSxDQUFDLEdBQUc7aUJBQzNELENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLFFBQVEsUUFBUSxDQUFDLENBQUM7Z0JBQ3pDLElBQUksU0FBUyxFQUFFO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxZQUFZLHdCQUF3QixDQUFDLENBQUM7aUJBQzVEO2dCQUNELElBQUksZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLFFBQVE7b0JBQzFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUTtvQkFDekIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVO3dCQUMzQixDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7d0JBQ2hDLENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ2hCLElBQUksZ0JBQWdCLEtBQUssU0FBUyxFQUFFO29CQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBQ2pDO2dCQUVELE1BQU0sTUFBTSxHQUFHLENBQUMsT0FBTyxRQUFRLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLFNBQVMsRUFBRTtvQkFDWCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sWUFBWSx1QkFBdUIsQ0FBQyxDQUFDO2lCQUMzRDtnQkFDRCxJQUFJLGVBQWUsR0FBRyxjQUFjLENBQUMsT0FBTztvQkFDeEMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPO29CQUN4QixDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU07d0JBQ3ZCLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDaEIsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFO29CQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2lCQUNoQztnQkFFRCxJQUFJLEtBQUssR0FDTCxjQUFjLENBQUMsS0FBSyxLQUFLLFNBQVM7b0JBQzlCLENBQUMsQ0FBQyxjQUFjLENBQUMsS0FBSztvQkFDdEIsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFWixVQUFVLEdBQUc7O3NCQUVQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7dUJBR2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7dUJBR2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOztrQkFHckIsY0FBYyxDQUFDLEtBQUssS0FBSyxTQUFTO29CQUM5QixDQUFDLENBQUMsS0FBSztvQkFDUCxDQUFDLENBQUMsT0FBTyxZQUFZLFFBQzdCO2tCQUNFLENBQUM7Z0JBRUgsVUFBVSxHQUFHLFVBQVU7cUJBQ2xCLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLENBQUM7cUJBQ3BDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO3FCQUNwQixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztxQkFDNUIsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUM7cUJBQzVCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDO3FCQUM1QixPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxNQUFNO1lBQ1YsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxVQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN0QyxNQUFNO1NBQ2I7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0csWUFBWSxDQUNkLFFBQXFDOztZQUVyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUMvQixVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVwQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxRQUFRLENBQUM7b0JBQ0wsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsYUFBYTtvQkFDYixLQUFLLEVBQUU7d0JBQ0gsS0FBSyxFQUFFLFVBQVU7d0JBQ2pCLFFBQVEsRUFBRSxLQUFLLElBQUEsbUJBQVUsRUFBQyxXQUFXLFNBQVMsRUFBRSxDQUFDLEVBQUU7d0JBQ25ELENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDTixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ04sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNOLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDVDtpQkFDSixDQUFDLENBQUM7Z0JBRUgsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzFELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUN6QyxRQUFRLENBQTJCO3dCQUMvQixJQUFJLEVBQUUsU0FBUzt3QkFDZixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsU0FBUyxFQUFFLElBQUEsbUJBQVUsRUFBQyxTQUFTLENBQUM7d0JBQ2hDLEtBQUssZ0NBQ0QsUUFBUSxFQUFFLEtBQUssSUFBQSxtQkFBVSxFQUNyQixXQUFXLFNBQVMsSUFBSSxTQUFTLEVBQUUsQ0FDdEMsRUFBRSxJQUVBLFFBQVEsS0FDWCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FDaEI7cUJBQ0osQ0FBQyxDQUFDO29CQUVILGFBQWE7b0JBQ2IsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNoQixLQUFLLElBQUksQ0FDTCxlQUFlLEVBQ2YsU0FBUzt3QkFDVCxhQUFhO3lCQUNoQixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUNqQyxJQUFJLGVBQWUsS0FBSyxTQUFTO2dDQUFFLFNBQVM7NEJBRTVDLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDOzRCQUUxQyxRQUFRLENBQTJCO2dDQUMvQixJQUFJLEVBQUUsZUFBZTtnQ0FDckIsS0FBSyxFQUFFLFNBQVM7Z0NBQ2hCLEtBQUssZ0NBQ0QsUUFBUSxFQUFFLEtBQUssSUFBQSxtQkFBVSxFQUNyQixXQUFXLGVBQWUsSUFBSSxTQUFTLEVBQUUsQ0FDNUMsRUFBRSxJQUVBLFNBQVMsS0FDWixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFDYixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FDaEI7NkJBQ0osQ0FBQyxDQUFDO3lCQUNOO3FCQUNKO2lCQUNKO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7O0FBdDJETCw2QkF1MkRDO0FBMW9ERzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNJLDhCQUFtQixHQUErQixFQUFFLENBQUMifQ==