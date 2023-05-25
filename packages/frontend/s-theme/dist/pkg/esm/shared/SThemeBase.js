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
import { __compressCssVarName } from '@coffeekraken/sugar/css';
import { __get, __sort } from '@coffeekraken/sugar/object';
import __set from '@coffeekraken/sugar/shared/object/set';
// import __micromatch from 'micromatch';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SInterface from '@coffeekraken/s-interface';
import { __isColor } from '@coffeekraken/sugar/is';
import { __deepMerge, __flatten, __objectHash, } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
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
 * theme.loopOnColors(({name, schema, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class colorSchemaNameInterface extends __SInterface {
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
        // prepare final variable name
        let varName = `s-theme-${dotPath
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-')}`;
        varName = `--${__dashCase(varName)}`;
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
    static compressVarName(varname) {
        var _a, _b;
        if (!((_b = (_a = this.cssSettings) === null || _a === void 0 ? void 0 : _a.compress) === null || _b === void 0 ? void 0 : _b.variables)) {
            return varname;
        }
        return __compressCssVarName(varname);
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
            let variable = this.compressVarName(`--s-theme-${varKey}`);
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
                `${this.compressVarName(`--s-theme-color-${from}-h`)}: ${color.h};`,
                `${this.compressVarName(`--s-theme-color-${from}-s`)}: ${color.s};`,
                `${this.compressVarName(`--s-theme-color-${from}-l`)}: ${color.l};`,
                `${this.compressVarName(`--s-theme-color-${from}-a`)}: ${color.a};`,
            ];
            result.properties[this.compressVarName(`--s-theme-color-${from}-h`)] = color.h;
            result.properties[this.compressVarName(`--s-theme-color-${from}-s`)] = color.s;
            result.properties[this.compressVarName(`--s-theme-color-${from}-l`)] = color.l;
            result.properties[this.compressVarName(`--s-theme-color-${from}-a`)] = color.a;
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
                            result.vars.push(`${this.compressVarName(`${fromVariable}-saturation-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-saturation-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-lightness-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-lightness-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
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
                            result.vars.push(`${this.compressVarName(`${fromVariable}-${colorObj.schema}-saturation-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-${colorObj.schema}-saturation-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schema}-saturation-offset`)}, 0)`;
                            result.vars.push(`${this.compressVarName(`${fromVariable}-${colorObj.schema}-lightness-offset`)}: var(${this.compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0);`);
                            result.properties[`${this.compressVarName(`${fromVariable}-${colorObj.schema}-lightness-offset`)}`] = `var(${this.compressVarName(`${toVariable}-${colorObj.schema}-lightness-offset`)}, 0)`;
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
            `--s-theme: ${themeInstance.theme};`,
            `--s-theme-variant: ${themeInstance.variant};`,
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
        const flattenedTheme = __flatten(themeObjWithoutColors);
        const keep = [
            '--s-theme-easing',
            '--s-theme-timing',
            '--s-theme-transition',
            '--s-theme-scale',
            '--s-theme-opacity',
            '--s-theme-width',
            '--s-theme-height',
            '--s-theme-depth',
            '--s-theme-size',
            '--s-theme-font',
            '--s-theme-border',
            '--s-theme-space',
            '--s-theme-margin',
            '--s-theme-padding',
            '--s-theme-offsize',
            '--s-theme-color',
            '--s-theme-layout',
        ];
        Object.keys(flattenedTheme).forEach((key) => {
            const value = flattenedTheme[key];
            const varKey = key
                .replace(/\./gm, '-')
                .replace(/:/gm, '-')
                .replace(/\?/gm, '')
                .replace(/--/gm, '-');
            let variable = `--${__dashCase(`s-theme-${varKey}`)}`;
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
        if (this._cachedConfig) {
            return this._cachedConfig;
        }
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
                variable: `--${__dashCase(this.constructor.compressVarName(`s-theme-color-${colorName}`))}`,
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
        if (__isColor(colorName)) {
            const color = new __SColor(colorName);
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
                    let colorInstance = new __SColor(colorValue);
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
                const c = new __SColor(colorValue);
                callback({
                    name: colorName,
                    schema: '',
                    // @ts-ignore
                    value: {
                        color: colorValue,
                        variable: `--${__dashCase(this.constructor.compressVarName(`s-theme-color-${colorName}`))}`,
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
                        value: Object.assign(Object.assign({ variable: `--${__dashCase(this.constructor.compressVarName(`s-theme-color-${colorName}-${schemaName}`))}` }, schemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
                                value: Object.assign(Object.assign({ variable: `--${__dashCase(this.constructor.compressVarName(`s-theme-color-${colorSchemaColorName}-${schemaName}`))}` }, colorSchemaObj), { r: newColor.r, g: newColor.g, b: newColor.b, h: newColor.h, s: newColor.s, l: newColor.l, a: newColor.a }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFDMUQseUNBQXlDO0FBQ3pDLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQ0gsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEdBQ2YsTUFBTSw0QkFBNEIsQ0FBQztBQUNwQyxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLG9CQUFvQixNQUFNLHNCQUFzQixDQUFDO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLHdCQUF5QixTQUFRLFlBQVk7SUFDL0MsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNE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