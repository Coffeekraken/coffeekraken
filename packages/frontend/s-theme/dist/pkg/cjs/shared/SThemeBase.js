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
     * @name      current
     * @type      STheme
     * @static
     *
     * Access the current theme
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get current() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let theme = this.theme, variant = this.variant;
        const themeInstance = this.getTheme(theme, variant);
        return themeInstance;
        if (document) {
            if (!((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme)) {
                if (!document.env)
                    document.env = {};
                if (!document.env.SUGAR)
                    document.env.SUGAR = {};
                document.env.SUGAR.theme = new this();
            }
            return (_d = (_c = document.env) === null || _c === void 0 ? void 0 : _c.SUGAR) === null || _d === void 0 ? void 0 : _d.theme;
        }
        else if (process) {
            if (!((_f = (_e = process.env) === null || _e === void 0 ? void 0 : _e.SUGAR) === null || _f === void 0 ? void 0 : _f.theme)) {
                if (!process.env)
                    process.env = {};
                if (!process.env.SUGAR)
                    process.env.SUGAR = {};
                process.env.SUGAR.theme = new this();
            }
            return (_h = (_g = process.env) === null || _g === void 0 ? void 0 : _g.SUGAR) === null || _h === void 0 ? void 0 : _h.theme;
        }
        else {
            throw new Error(`<red>[STheme]</red> It seems that you are trying to access the current theme outside of a browser or nodejs context...`);
        }
    }
    /**
     * @name            getCurrentTheme
     * @type            Function
     * @static
     *
     * This method allows you to get the current applied theme STheme instance
     *
     * @return          {STheme}                                    The STheme instance that represent the current applied theme
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getCurrentTheme() {
        return this.current;
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
        const themesNames = Object.keys(s_sugar_config_1.default.get('theme.themes'));
        if (!themesNames.includes(`${theme}-${variant}`)) {
            throw new Error(`<red>[STheme]</red> The requested theme "<yellow>${theme}</yellow>" with the variant "<yellow>${variant}</yellow>" does not exists...`);
        }
        if (this._instanciatedThemes[`${theme}-${variant}`]) {
            return this._instanciatedThemes[`${theme}-${variant}`];
        }
        this._instanciatedThemes[`${theme}-${variant}`] = new this(theme, variant, settings);
        return this._instanciatedThemes[`${theme}-${variant}`];
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
    get metas() {
        var _a;
        return (_a = this.get('metas')) !== null && _a !== void 0 ? _a : {};
    }
    set metas(v) {
        this._metas = v;
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
     * @name            isDark
     * @type            Function
     *
     * This method returns true if the theme variant is dark, false if not
     *
     * @return      {Boolean}               true if variant is dark, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isDark() {
        return this.variant === 'dark';
    }
    /**
     * @name            isMobileFirst
     * @type            Function
     *
     * This method returns true if the theme is configured to be mobile first.
     * Mobile first is true when the "config.theme.media.defaultAction" is set to "<="
     *
     * @return      {Boolean}               true if variant is dark, false otherwise
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isMobileFirst() {
        return this.getSafe('media.defaultAction') === '>=';
    }
    /**
     * @name            getMetas
     * @type            Function
     *
     * This method allows you to get the theme metas like "name", "theme" and "variant" from the passed HTMLElement
     *
     * @return      {any}                               The theme metas object containing the "name", "theme" and "variant" properties
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getMetas() {
        return this.metas;
    }
    /**
     * @name                resolveCssPropertyValue
     * @type                Function
     *
     * This method allows you to pass a css property with a value and get back his final value
     * resolved depending on the theme configuration.
     *
     * @param       {String}            property        The css property to resolve
     * @param       {any}               value           The css property value to resolve
     * @return      {any}                               The resolved css value
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveCssPropertyValue(property, value, settings) {
        var _a, _b, _c, _d;
        const dashProp = (0, string_1.__dashCase)(property);
        switch (dashProp) {
            case 'font-family':
                const fontObj = this.get(`fontFamily.${value}`);
                return (_a = fontObj === null || fontObj === void 0 ? void 0 : fontObj.fontFamily) !== null && _a !== void 0 ? _a : value;
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
                return ((_b = this.resolveColor(color, shade, modifier, Object.assign(Object.assign({}, (settings !== null && settings !== void 0 ? settings : {})), { return: 'value' }))) !== null && _b !== void 0 ? _b : value);
                break;
            case 'transition':
                return (_c = this.getSafe(`transition.${value}`)) !== null && _c !== void 0 ? _c : value;
                break;
            case 'depth':
                return (_d = this.getSafe(`depth.${value}`, settings)) !== null && _d !== void 0 ? _d : value;
                break;
        }
        // by default, return the passed value
        return value;
    }
    /**
     * @name                resolveCssObjectPropertiesValues
     * @type                Function
     *
     * This method allows you to passe a js object with some css properties and to
     * resolve each of these properties values using the `resolveCssPropertyValue` method
     *
     * @param       {Object}            object      The css properties object to resolve values from
     * @return      {Object}                        The css properties object with resolved values
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolveCssObjectPropertiesValues(object, settings) {
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
     *
     * This method allows you to pass a javascript object that contain css properties
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
    jsObjectToCssProperties(jsObject, settings) {
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
    jsConfigObjectToCssProperties(obj) {
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
     *
     * This method allows you to remap a color to another and returns the needed css
     * variables string.
     *
     * @param           {String}            from            The color name you want to remap
     * @param           {String}            to              The color you want to assign
     * @return          {String}                            The generated css variables string
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    remapCssColor(from, to, settings) {
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
            this.loopOnColors((colorObj) => {
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
     *
     * This method allows you to transform a theme/variant into css variables
     *
     * @param       {String}        theme           The theme name you want to transform
     * @param       {String}        variant         The theme variant you want to transform
     * @return      {String}                        The converted css variables string
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    toCssVars(settings) {
        let vars = [
            `--s-theme: ${this.theme};`,
            `--s-variant: ${this.variant};`,
        ];
        // handle colors
        this.loopOnColors((colorObj) => {
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
        const themeObjWithoutColors = Object.assign({}, this.get('.'));
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
        // if (this._cachedConfig) {
        //     return this._cachedConfig;
        // }
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
     * import { cssVar } from '@coffeekraken/s-sugarcss-plugin';
     * cssVar('ui.button.padding'); // => var(--s-ui-button-padding, 1em 1.2em)
     *
     * @since       2.0.0
     * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    cssVar(dotPath, fallback = true, settings) {
        // proxy non existint dotPath
        dotPath = this.proxyNonExistingUiDotpath(dotPath);
        // prepare final variable name
        let varName = `s-${dotPath
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-')}`;
        varName = `--${(0, string_1.__dashCase)(varName)}`;
        let fb = this.get(dotPath);
        if (!fallback || (typeof fb === 'string' && fb.includes(',')))
            fb = 0;
        const v = `var(${varName}, ${fb})`;
        return v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCx1REFBa0U7QUFDbEUseUNBQXlDO0FBQ3pDLG9GQUE0RDtBQUM1RCw0RUFBcUQ7QUFDckQsK0NBQW1EO0FBQ25ELHVEQUlvQztBQUNwQyx1REFBd0Q7QUFDeEQsZ0ZBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLG1CQUFvQixTQUFRLHFCQUFZO0lBQzFDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQW9LRCxNQUFxQixVQUFXLFNBQVEseUJBQWU7SUFDbkQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBVTs7UUFDdkIsbURBQW1EO1FBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQ3RCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsbUJBQW1C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