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
import { __get, __set, __sort } from '@coffeekraken/sugar/object';
// import __micromatch from 'micromatch';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SInterface from '@coffeekraken/s-interface';
import { __isColor } from '@coffeekraken/sugar/is';
import { __deepMerge, __flatten, __objectHash, } from '@coffeekraken/sugar/object';
import { __dashCase } from '@coffeekraken/sugar/string';
import __knownCssProperties from 'known-css-properties';
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
class shadesNameInterface extends __SInterface {
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
export default class SThemeBase extends __SEventEmitter {
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
        const queries = __sort((_a = media.queries) !== null && _a !== void 0 ? _a : {}, (a, b) => {
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
    static getTheme(theme, variant, settings) {
        var _a, _b;
        const themesNames = Object.keys(__SSugarConfig.get('theme.themes'));
        theme = theme !== null && theme !== void 0 ? theme : (_a = this._firstGetedThemeSettings) === null || _a === void 0 ? void 0 : _a.theme;
        variant = variant !== null && variant !== void 0 ? variant : (_b = this._firstGetedThemeSettings) === null || _b === void 0 ? void 0 : _b.variant;
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
        return __objectHash(config);
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
        varName = `--${__dashCase(varName)}`;
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
        const dashProp = __dashCase(property);
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
        const finalSettings = __deepMerge({
            exclude: [],
            only: [],
        }, settings);
        const propsStack = [];
        Object.keys(jsObject).forEach((prop) => {
            var _a;
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
        if (__isColor(to)) {
            const color = new __SColor(to);
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
            `--s-theme: ${themeInstance.theme};`,
            `--s-variant: ${themeInstance.variant};`,
        ];
        // handle colors
        themeInstance.loopOnColors((colorObj) => {
            const baseVariable = colorObj.value.variable;
            if (colorObj.name === 'accent') {
                console.log('Color', colorObj);
            }
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
        const flattenedTheme = __flatten(themeObjWithoutColors);
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
            let variable = `--${__dashCase(`s-${varKey}`)}`;
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
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
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
        let value = __get(this._config, dotPath);
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
        // if (this._cachedConfig) {
        //     return this._cachedConfig;
        // }
        // @ts-ignore
        this._cachedConfig = Object.assign({}, __deepMerge(__SSugarConfig.get('theme.themes')[this.id], this._overridedConfig));
        return this._cachedConfig;
    }
    get(dotPath, settings = {}) {
        const finalSettings = __deepMerge({
            preventThrow: false,
            defaultFallback: true,
        }, settings);
        // proxy non existing ui configs
        dotPath = this.proxyNonExistingUiDotpath(dotPath);
        // get the value
        let value = __get(this._config, dotPath);
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
                variable: `--${__dashCase(`s-color-${colorName}`)}`,
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
        if (__isColor(colorName)) {
            colorInstance = new __SColor(colorName);
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
            colorInstance = new __SColor(colorValue);
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
                    shadeNameVar += `-${__dashCase(shadeName)}`;
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
                const c = new __SColor(colorValue);
                callback({
                    name: colorName,
                    shade: '',
                    // @ts-ignore
                    value: {
                        color: colorValue,
                        variable: `--${__dashCase(`s-color-${colorName}`)}`,
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
                        shadeDash: __dashCase(shadeName),
                        value: Object.assign(Object.assign({ variable: `--${__dashCase(`s-color-${colorName}-${shadeName}`)}` }, shadeObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
                                value: Object.assign(Object.assign({ variable: `--${__dashCase(`s-color-${shadesColorName}-${shadeName}`)}` }, shadesObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLHlDQUF5QztBQUN6QyxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbkQsT0FBTyxFQUNILFdBQVcsRUFDWCxTQUFTLEVBQ1QsWUFBWSxHQUNmLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hELE9BQU8sb0JBQW9CLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sbUJBQW9CLFNBQVEsWUFBWTtJQUMxQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7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