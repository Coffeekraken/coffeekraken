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
const css_1 = require("@coffeekraken/sugar/css");
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
        const v = `var(${this.compressVarName(varName)}, ${fb})`;
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
                let color = value, schema, modifier;
                if (Array.isArray(value) && value.length === 2) {
                    color = value[0];
                    schema = value[1];
                }
                if (Array.isArray(value) && value.length === 3) {
                    color = value[0];
                    schema = value[1];
                    modifier = value[2];
                }
                return ((_c = this.resolveColor(color, schema, modifier, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { return: 'value' }))) !== null && _c !== void 0 ? _c : value);
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
                    case 'background-color':
                        let color = value, schema, modifier;
                        if (Array.isArray(value) && value.length === 2) {
                            color = value[0];
                            schema = value[1];
                        }
                        if (Array.isArray(value) && value.length === 3) {
                            color = value[0];
                            schema = value[1];
                            modifier = value[2];
                        }
                        propsStack.push(`${prop}: ${(_a = this.resolveColor(color, schema, modifier, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { return: 'var' }))) !== null && _a !== void 0 ? _a : value};`);
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
    static compressVarName(varname) {
        var _a, _b;
        if (!((_b = (_a = this.cssSettings) === null || _a === void 0 ? void 0 : _a.compress) === null || _b === void 0 ? void 0 : _b.variables)) {
            return varname;
        }
        return (0, css_1.__compressCssVarName)(varname);
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
            let variable = this.compressVarName(`--s-${varKey}`);
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
                `${this.compressVarName(`--s-color-${from}-h`)}: ${color.h};`,
                `${this.compressVarName(`--s-color-${from}-s`)}: ${color.s};`,
                `${this.compressVarName(`--s-color-${from}-l`)}: ${color.l};`,
                `${this.compressVarName(`--s-color-${from}-a`)}: ${color.a};`,
            ];
            result.properties[this.compressVarName(`--s-color-${from}-h`)] =
                color.h;
            result.properties[this.compressVarName(`--s-color-${from}-s`)] =
                color.s;
            result.properties[this.compressVarName(`--s-color-${from}-l`)] =
                color.l;
            result.properties[this.compressVarName(`--s-color-${from}-a`)] =
                color.a;
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
                        if (colorObj.schema === toColorVariant) {
                            result.vars.push(`${this.compressVarName(`${fromVariable}-saturation-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-saturation-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-saturation-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-saturation-offset`)}, 0)`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-lightness-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-lightness-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-lightness-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-lightness-offset`)}, 0)`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-a`)}: var(${this.compressVarName(`${toVariable}-a`)}, 1);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-a`)}`] = `var(${this.compressVarName(`${toVariable}-a`)}, 1)`;
                        }
                    }
                    else {
                        if (!colorObj.schema && colorObj.value.color) {
                            result.vars.push(`${this.compressVarName(`${fromVariable}-h`)}: var(${this.compressVarName(`${toVariable}-h`)});`);
                            result.properties[`${this.compressVarName(`${fromVariable}-h`)}`] = `var(${this.compressVarName(`${toVariable}-h`)})`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-s`)}: var(${this.compressVarName(`${toVariable}-s`)});`);
                            result.properties[`${this.compressVarName(`${fromVariable}-s`)}`] = `var(${this.compressVarName(`${toVariable}-s`)})`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-l`)}: var(${this.compressVarName(`${toVariable}-l`)});`);
                            result.properties[`${this.compressVarName(`${fromVariable}-l`)}`] = `var(${this.compressVarName(`${toVariable}-l`)})`;
                        }
                        else {
                            result.vars.push(`${this.compressVarName(`${fromVariable}-${colorObj.schemaDash}-saturation-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-saturation-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-${colorObj.schemaDash}-saturation-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-saturation-offset`)}, 0)`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-${colorObj.schemaDash}-lightness-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-lightness-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-${colorObj.schemaDash}-lightness-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schemaDash}-lightness-offset`)}, 0)`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-a: var(${toVariable}-a`)}, 1);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-a`)}`] = `var(${this.compressVarName(`${toVariable}-a`)}, 1)`;
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
            if (!colorObj.schema && colorObj.value.color) {
                vars.push(`${this.compressVarName(`${baseVariable}-h`)}: ${colorObj.value.h};`);
                vars.push(`${this.compressVarName(`${baseVariable}-s`)}: ${colorObj.value.s};`);
                vars.push(`${this.compressVarName(`${baseVariable}-l`)}: ${colorObj.value.l};`);
                vars.push(`${this.compressVarName(`${baseVariable}-a`)}: ${colorObj.value.a};`);
                vars.push(`${this.compressVarName(`${baseVariable}-origin-h`)}: ${colorObj.value.h};`);
                vars.push(`${this.compressVarName(`${baseVariable}-origin-s`)}: ${colorObj.value.s};`);
                vars.push(`${this.compressVarName(`${baseVariable}-origin-l`)}: ${colorObj.value.l};`);
                vars.push(`${this.compressVarName(`${baseVariable}-origin-a`)}: ${colorObj.value.a};`);
            }
            else if (colorObj.schema) {
                if (colorObj.value.saturate) {
                    vars.push(`${this.compressVarName(`${baseVariable}-saturation-offset`)}: ${colorObj.value.saturate};`);
                }
                else if (colorObj.value.desaturate) {
                    vars.push(`${this.compressVarName(`${baseVariable}-saturation-offset`)}: ${colorObj.value.desaturate * -1};`);
                }
                else {
                    vars.push(`${this.compressVarName(`${baseVariable}-saturation-offset`)}: 0;`);
                }
                if (colorObj.value.lighten) {
                    vars.push(`${this.compressVarName(`${baseVariable}-lightness-offset`)}: ${colorObj.value.lighten};`);
                }
                else if (colorObj.value.darken) {
                    vars.push(`${this.compressVarName(`${baseVariable}-lightness-offset`)}: ${colorObj.value.darken * -1};`);
                }
                else {
                    vars.push(`${this.compressVarName(`${baseVariable}-lightness-offset`)}: 0;`);
                }
                if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                    vars.push(`${this.compressVarName(`${baseVariable}-a`)}: ${colorObj.value.alpha};`);
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
                vars.push(`${this.compressVarName(`${variable}`)}: "${flattenedTheme[key]}";`);
            }
            else {
                vars.push(`${this.compressVarName(`${variable}`)}: ${flattenedTheme[key]};`);
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
                variable: `--${(0, string_1.__dashCase)(this.constructor.compressVarName(`s-color-${colorName}`))}`,
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
        if (colorSchemaName.match(/^--[a-zA-Z]+/)) {
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
                    const colorVar = `--s-color-${colorName}`;
                    let colorSchemaNameVar = `s-color-${colorName}`;
                    if (colorSchemaName) {
                        colorSchemaNameVar += `-${(0, string_1.__dashCase)(colorSchemaName)}`;
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
                        ? alpha
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
                        variable: `--${(0, string_1.__dashCase)(this.constructor.compressVarName(`s-color-${colorName}`))}`,
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
                        schemaDash: (0, string_1.__dashCase)(schemaName),
                        value: Object.assign(Object.assign({ variable: `--${(0, string_1.__dashCase)(this.constructor.compressVarName(`s-color-${colorName}-${schemaName}`))}` }, schemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
                                value: Object.assign(Object.assign({ variable: `--${(0, string_1.__dashCase)(this.constructor.compressVarName(`s-color-${colorSchemaColorName}-${schemaName}`))}` }, colorSchemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCxpREFBK0Q7QUFDL0QsdURBQWtFO0FBQ2xFLHlDQUF5QztBQUN6QyxvRkFBNEQ7QUFDNUQsNEVBQXFEO0FBQ3JELCtDQUFtRDtBQUNuRCx1REFJb0M7QUFDcEMsdURBQXdEO0FBQ3hELGdGQUF3RDtBQUV4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsTUFBTSx3QkFBeUIsU0FBUSxxQkFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF5S0QsTUFBcUIsVUFBVyxTQUFRLHlCQUFlO0lBQ25EOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQVU7O1FBQ3ZCLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUN0QixPQUFPLEtBQUssQ0FBQztTQUNo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