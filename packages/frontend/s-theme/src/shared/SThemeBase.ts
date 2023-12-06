import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __get, __set, __sort } from '@coffeekraken/sugar/object';
// import __micromatch from 'micromatch';
import __SEventEmitter from '@coffeekraken/s-event-emitter';
import __SInterface from '@coffeekraken/s-interface';
import { __isColor } from '@coffeekraken/sugar/is';
import {
    __deepMerge,
    __flatten,
    __objectHash,
} from '@coffeekraken/sugar/object';
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

export interface ISThemeSettings {}

export interface ISThemeDefaultStaticSettings {
    theme: string;
    variant: string;
}

export interface ISThemeResolveColorSettings
    extends ISThemeDefaultStaticSettings {
    return: 'value' | 'var' | 'object';
}

export interface ISThemeFontFamilyStack {
    [key: string]: ISThemeFontFamily;
}

export interface ISThemeFontFamily {
    import?: string;
    'font-family': string;
    'font-weight'?: string;
    'font-style'?: string;
    'font-display'?: string;
    'cap-height'?: number;
}

export interface ISThemeFont {
    family: ISThemeFontFamilyStack;
}

export interface ISThemeUi {
    [key: string]: any;
}

export interface ISThemeGetSettings {
    preventThrow: boolean;
    defaultFallback: boolean;
}

export interface ISThemeMediaQuery {
    'min-width'?: string | number;
    'max-width'?: string | number;
    'min-height'?: string | number;
    'max-height'?: string | number;
    width?: string | number;
    height?: string | number;
    orientation?: 'landscape' | 'portrait';
    'any-hover'?: any;
    'any-pointer'?: any;
    'aspect-ratio'?: number;
    color?: any;
    'color-gamut'?: any;
    'color-index'?: any;
    grid?: any;
    'inverted-colors'?: any;
    'light-level'?: any;
    'max-aspect-ratio'?: number;
    'max-color'?: any;
    'max-color-index'?: any;
    'max-monochrome'?: any;
    'max-resolution'?: any;
    'min-aspect-ratio'?: any;
    'min-color'?: any;
    'min-color-index'?: any;
    'min-monochrome'?: any;
    'min-resolution'?: any;
    monochrome?: any;
    'overflow-block'?: any;
    'overflow-inline'?: any;
    pointer?: any;
    resolution?: any;
    scan?: any;
    scripting?: any;
    update?: any;
}

export interface ISThemeMediaQueries {
    [key: string]: ISThemeMediaQuery;
}

export interface ISThemeMedia {
    defaultAction: '>' | '<' | '=' | '>=' | '<=';
    method: 'container' | 'media';
    containerName: string;
    queries: ISThemeMediaQueries;
}

export interface IJsObjectToCssProperties {
    exclude: string[];
    only: string[];
}

export interface ISThemeLayout {
    container: Record<string, any>;
}

export interface ISThemesConfig {
    theme: string;
    themes: Record<string, ISThemeConfig>;
}

export interface ISThemeRemapColorResult {
    vars: string[];
    properties: Record<string, number | string>;
}

export interface ISThemeConfig {
    layout: ISThemeLayout;
    transition: Record<string | number, string>;
    ratio: Record<string, number>;
    depth: Record<string | number, string>;
    colorModifier: Record<string | number, string>;
    color: Record<string, Record<string | number, string>>;
    size: Record<string | number, string>;
    font: ISThemeFont;
    ui: ISThemeUi;
    media: ISThemeMedia;
}

export interface ISThemeLoopOnColorsColor {
    name: string;
    shade: string;
    shadeDash: string;
    value: ISThemeColor | ISThemeColorModifiers;
}

export interface ISThemeLoopOnColorsCallback {
    (color: ISThemeLoopOnColorsColor): boolean | void;
}

export interface ISThemeColorModifiers {
    saturate: number;
    desaturate: number;
    lighten: number;
    darken: number;
    spin: number;
    alpha: number;
    [key: string]: any;
}

export interface ISThemeColor {
    color: string;
    variable: string;
    r: number;
    g: number;
    b: number;
    h: number;
    s: number;
    l: number;
    a: number;
    [key: string]: any;
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
    static sortMedia(media: any): any {
        // do nothing if the defaultAction is not specified
        if (!media.defaultAction) {
            return media;
        }

        // sort the queries
        const queries = __sort(media.queries ?? {}, (a, b) => {
            if (media.defaultAction === '<=') {
                return a.value.minWidth < b.value.minWidth ? 1 : -1;
            } else if (media.defaultAction === '>=') {
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
    static get current(): STheme {
        let theme = this.theme,
            variant = this.variant;

        const themeInstance = this.getTheme(theme, variant);

        return themeInstance;

        if (document) {
            if (!document.env?.SUGAR?.theme) {
                if (!document.env) document.env = {};
                if (!document.env.SUGAR) document.env.SUGAR = {};
                document.env.SUGAR.theme = new this();
            }
            return document.env?.SUGAR?.theme;
        } else if (process) {
            if (!process.env?.SUGAR?.theme) {
                if (!process.env) process.env = {};
                if (!process.env.SUGAR) process.env.SUGAR = {};
                process.env.SUGAR.theme = new this();
            }
            return process.env?.SUGAR?.theme;
        } else {
            throw new Error(
                `<red>[STheme]</red> It seems that you are trying to access the current theme outside of a browser or nodejs context...`,
            );
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
    static getCurrentTheme(): STheme {
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
    static get themesNames(): string[] {
        return Object.keys(__SSugarConfig.get('theme.themes'));
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
    static get themes(): Object {
        const themes = __SSugarConfig.get('theme.themes');
        const returnedThemes = {};
        for (let [themeName, themeObj] of Object.entries(themes)) {
            const parts = themeName.split('-'),
                name = parts[0],
                variant = parts[1] ?? 'light';
            if (!returnedThemes[name]) {
                returnedThemes[name] = {
                    metas: themeObj.metas ?? {},
                    variants: {},
                };
            }
            if (!returnedThemes[name].variants[variant]) {
                returnedThemes[name].variants[variant] = themeObj;
            }
        }

        return returnedThemes;
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
    static _instanciatedThemes: Record<string, SThemeBase> = {};
    static getTheme(
        theme: string,
        variant: string,
        settings?: Partial<ISThemeSettings>,
    ): SThemeBase {
        const themesNames = Object.keys(__SSugarConfig.get('theme.themes'));

        if (!themesNames.includes(`${theme}-${variant}`)) {
            throw new Error(
                `<red>[STheme]</red> The requested theme "<yellow>${theme}</yellow>" with the variant "<yellow>${variant}</yellow>" does not exists...`,
            );
        }

        if (this._instanciatedThemes[`${theme}-${variant}`]) {
            return this._instanciatedThemes[`${theme}-${variant}`];
        }

        this._instanciatedThemes[`${theme}-${variant}`] = new this(
            theme,
            variant,
            settings,
        );

        return this._instanciatedThemes[`${theme}-${variant}`];
    }

    /**
     * @name        theme
     * @type        String
     *
     * Store the theme name that this instance represent
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    theme: string;

    /**
     * @name        variant
     * @type        String
     *
     * Store the theme variant that this instance represent
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    variant: string;

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
    private _overridedConfig: any = {};

    /**
     * @name            id
     * @type            String
     *
     * Store the computed theme id builded from the theme name and theme variant
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get id(): String {
        return `${this.theme}-${this.variant}`;
    }

    /**
     * @name            metas
     * @type            Object
     *
     * Access the theme metas object
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _metas: {};
    get metas(): any {
        return this.get('metas') ?? {};
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
    constructor(
        theme?: string,
        variant?: string,
        settings?: Partial<ISThemeSettings>,
    ) {
        super(__deepMerge({}, settings ?? {}));

        this.theme = theme ?? __SSugarConfig.get('theme.theme');
        this.variant = variant ?? __SSugarConfig.get('theme.variant');

        if (!__SSugarConfig.get(`theme.themes.${this.theme}-${this.variant}`)) {
            throw new Error(
                `Sorry but the requested theme "<yellow>${this.theme}-${this.variant}</yellow>" does not exists...`,
            );
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
    isDark(): boolean {
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
    isMobileFirst(): boolean {
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
    getMetas(): any {
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
    resolveCssPropertyValue(
        property: string,
        value: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        const dashProp = __dashCase(property);
        switch (dashProp) {
            case 'font-family':
                const fontObj = this.get(`fontFamily.${value}`);
                return fontObj?.fontFamily ?? value;
                break;
            case 'color':
            case 'background-color':
                let color = value,
                    shade,
                    modifier;
                if (Array.isArray(value) && value.length === 2) {
                    color = value[0];
                    shade = value[1];
                }
                if (Array.isArray(value) && value.length === 3) {
                    color = value[0];
                    shade = value[1];
                    modifier = value[2];
                }
                return (
                    this.resolveColor(color, shade, modifier, {
                        ...(settings ?? {}),
                        return: 'value',
                    }) ?? value
                );
                break;
            case 'transition':
                return this.getSafe(`transition.${value}`) ?? value;
                break;
            case 'depth':
                return this.getSafe(`depth.${value}`, settings) ?? value;
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
    resolveCssObjectPropertiesValues(
        object: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
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
    jsObjectToCssProperties(
        jsObject: any,
        settings?: Partial<IJsObjectToCssProperties>,
    ): string {
        const finalSettings = <IJsObjectToCssProperties>__deepMerge(
            {
                exclude: [],
                only: [],
            },
            settings,
        );

        const propsStack: string[] = [];
        Object.keys(jsObject).forEach((prop) => {
            if (finalSettings.exclude.indexOf(prop) !== -1) return;
            if (finalSettings.exclude.indexOf(__dashCase(prop)) !== -1) return;

            const originalProp = prop;
            prop = __dashCase(prop).trim();

            if (
                finalSettings.exclude.length &&
                finalSettings.exclude.indexOf(prop) !== -1
            )
                return;
            if (
                finalSettings.only.length &&
                finalSettings.only.indexOf(prop) === -1
            )
                return;

            const value = jsObject[originalProp];
            if (!value) return;

            // media queries
            const medias = Object.keys(this.get('media.queries'));
            if (medias.includes(originalProp)) {
                propsStack.push(`@s.media(${prop.replace(/^@/, '')}) {`);
                propsStack.push(
                    this.jsObjectToCssProperties(value, finalSettings),
                );
                propsStack.push(`}`);
            } else {
                switch (prop) {
                    case 'font-family':
                        propsStack.push(`@s.font.family(${value});`);
                        break;
                    case 'font-size':
                        propsStack.push(`@s.font.size(${value});`);
                        break;

                    case 'color':
                    case 'background-color':
                        let color = value,
                            shade,
                            modifier;
                        if (Array.isArray(value) && value.length === 2) {
                            color = value[0];
                            shade = value[1];
                        }
                        if (Array.isArray(value) && value.length === 3) {
                            color = value[0];
                            shade = value[1];
                            modifier = value[2];
                        }
                        propsStack.push(
                            `${prop}: ${
                                this.resolveColor(color, shade, modifier, {
                                    ...(settings ?? {}),
                                    return: 'var',
                                }) ?? value
                            };`,
                        );
                        break;

                    case 'border-radius':
                    case 'border-top-left-radius':
                    case 'border-top-right-radius':
                    case 'border-bottom-right-radius':
                    case 'border-bottom-left-radius':
                        propsStack.push(
                            `border-radius: s.border.radius(${value});`,
                        );
                        break;
                    case 'border-width':
                        propsStack.push(
                            `border-width: s.border.width(${value});`,
                        );
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
                        if (props.indexOf(prop) === -1) return;
                        propsStack.push(`${prop}: ${value};`);
                        break;
                }
            }
        });
        return propsStack.join('\n');
    }

    jsConfigObjectToCssProperties(obj: any): string[] {
        let vars: string[] = [];

        for (let [key, value] of Object.entries(__flatten(obj))) {
            if (__isColor(value)) {
                const color = key.match(/^color\.([a-zA-Z0-9]+)\./);
                if (!color?.[1]) continue;
                const props = this.remapCssColor(color[1], <string>value);
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
            } else {
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
    remapCssColor(
        from: string,
        to: string,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): ISThemeRemapColorResult {
        const result: ISThemeRemapColorResult = {
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
        } else {
            const toColorName = to.split('-').slice(0, 1)[0],
                fromColorName = from.split('-').slice(0, 1)[0];
            let toColorVariant = to.split('-').pop(),
                fromColorVariant = from.split('-').pop();
            if (toColorName === toColorVariant) toColorVariant = undefined;
            if (fromColorName === fromColorVariant)
                fromColorVariant = undefined;

            let fromVariable = `--s-color-${fromColorName}`,
                toVariable = `--s-color-${toColorName}`;

            this.loopOnColors((colorObj) => {
                if (colorObj.name === toColorName) {
                    if (toColorVariant) {
                        if (colorObj.shade === toColorVariant) {
                            result.vars.push(
                                `${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0);`,
                            );
                            result.properties[
                                `${fromVariable}-saturation-offset`
                            ] = `var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0)`;
                            result.vars.push(
                                `${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0);`,
                            );
                            result.properties[
                                `${fromVariable}-lightness-offset`
                            ] = `var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0)`;
                            result.vars.push(
                                `${fromVariable}-a: var(${toVariable}-a, 1);`,
                            );
                            result.properties[
                                `${fromVariable}-a`
                            ] = `var(${toVariable}-a, 1)`;
                        }
                    } else {
                        if (!colorObj.shade && colorObj.value.color) {
                            result.vars.push(
                                `${fromVariable}-h: var(${toVariable}-h);`,
                            );
                            result.properties[
                                `${fromVariable}-h`
                            ] = `var(${toVariable}-h)`;
                            result.vars.push(
                                `${fromVariable}-s: var(${toVariable}-s);`,
                            );
                            result.properties[
                                `${fromVariable}-s`
                            ] = `var(${toVariable}-s)`;
                            result.vars.push(
                                `${fromVariable}-l: var(${toVariable}-l);`,
                            );
                            result.properties[
                                `${fromVariable}-l`
                            ] = `var(${toVariable}-l)`;
                        } else {
                            result.vars.push(
                                `${fromVariable}-${colorObj.shadeDash}-saturation-offset: var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0);`,
                            );
                            result.properties[
                                `${fromVariable}-${colorObj.shadeDash}-saturation-offset`
                            ] = `var(${toVariable}-${colorObj.shadeDash}-saturation-offset, 0)`;
                            result.vars.push(
                                `${fromVariable}-${colorObj.shadeDash}-lightness-offset: var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0);`,
                            );
                            result.properties[
                                `${fromVariable}-${colorObj.shadeDash}-lightness-offset`
                            ] = `var(${toVariable}-${colorObj.shadeDash}-lightness-offset, 0)`;
                            result.vars.push(
                                `${fromVariable}-a: var(${toVariable}-a, 1);`,
                            );
                            result.properties[
                                `${fromVariable}-a`
                            ] = `var(${toVariable}-a, 1)`;
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
    toCssVars(settings?: Partial<ISThemeDefaultStaticSettings>): string[] {
        let vars: string[] = [
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
            } else if (colorObj.shade) {
                if (colorObj.value.saturate) {
                    vars.push(
                        `${baseVariable}-saturation-offset: ${colorObj.value.saturate};`,
                    );
                } else if (colorObj.value.desaturate) {
                    vars.push(
                        `${baseVariable}-saturation-offset: ${
                            colorObj.value.desaturate * -1
                        };`,
                    );
                } else {
                    vars.push(`${baseVariable}-saturation-offset: 0;`);
                }
                if (colorObj.value.lighten) {
                    vars.push(
                        `${baseVariable}-lightness-offset: ${colorObj.value.lighten};`,
                    );
                } else if (colorObj.value.darken) {
                    vars.push(
                        `${baseVariable}-lightness-offset: ${
                            colorObj.value.darken * -1
                        };`,
                    );
                } else {
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
            } else {
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
    proxyNonExistingUiDotpath(dotPath: string): string {
        // try to get the value
        let value = __get(this.config, dotPath);

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
    getSafe(dotPath: string): any {
        return this.get(dotPath, {
            preventThrow: true,
        });
    }

    /**
     * @name          get
     * @type          Function
     *
     * This method allows you to access a value of the current theme
     * using a dot path like "color.accent", etc...
     *
     * @param         {String}        dotPath         The dot path of the config you want to get
     * @return        {Any}                           The value of the getted configuration
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get config() {
        // get config from frontData
        if (this.constructor.frontData?.theme?.themes) {
            const currentTheme = this.constructor.frontData.theme.themes.find(
                (t) => {
                    return t.theme === this.theme && t.variant === this.variant;
                },
            );
            return __deepMerge(currentTheme.config, this._overridedConfig);
        }

        // return from config directly
        return __deepMerge(
            __SSugarConfig.get('theme.themes')[this.id],
            this._overridedConfig,
        );
    }
    get(dotPath, settings: Partial<ISThemeGetSettings> = {}): any {
        const finalSettings: ISThemeGetSettings = __deepMerge(
            {
                preventThrow: false,
                defaultFallback: true,
            },
            settings,
        );

        // proxy non existing ui configs
        dotPath = this.proxyNonExistingUiDotpath(dotPath);

        // get the value
        let value = __get(this.config, dotPath);

        if (value && dotPath === 'media') {
            // sort the media requested
            // @ts-ignore
            value = this.constructor.sortMedia(value);
        }

        if (value === undefined && !finalSettings.preventThrow) {
            throw new Error(
                `<red>[${this.constructor.name}]</red> Sorry but the requested "<yellow>${this.id}</yellow>" theme config "<cyan>${dotPath}</cyan>" does not exists...`,
            );
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
    getOverridedConfig(): any {
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
    cssVar(
        dotPath: string,
        fallback = true,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): string {
        // proxy non existint dotPath
        dotPath = this.proxyNonExistingUiDotpath(dotPath);

        // prepare final variable name
        let varName = `s-${dotPath
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-')}`;
        varName = `--${__dashCase(varName)}`;

        let fb = this.get(dotPath);
        if (!fallback || (typeof fb === 'string' && fb.includes(','))) fb = 0;

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
    emitSavedEvent(): SThemeBase {
        // emit event
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
    hash(dotPath: string = ''): string {
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
    themesConfig(): ISThemesConfig {
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
    set(dotPath: string, value: any): SThemeBase {
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
    restore(configs: any): SThemeBase {
        // restoring the overrided values
        this._overridedConfig = __deepMerge(
            this._overridedConfig,
            configs ?? {},
        );

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
    clear(): SThemeBase {
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
    baseColors(): Record<string, ISThemeColor> {
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
    resolveColor(
        color: string,
        shade?: string,
        modifier?: string,
        settings?: Partial<ISThemeResolveColorSettings>,
    ): string {
        // concrete color string
        if (color.match(/^(hsla?|rgba?|hsv)\(/)) return color;
        if (color.match(/^var\(--/)) return color;

        const finalSettings = {
            return: 'value',
            ...(settings ?? {}),
        };

        let colorName = color;
        let shadeName = shade ?? '';
        let colorModifier = modifier ?? '';

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
        } else {
            const colorValue = this.getSafe(`color.${color}`) ?? color;

            // nothing to apply on the color
            if (!shade && !modifier) {
                finalValue = colorValue;
            }

            // init a new SColor instance
            colorInstance = new __SColor(colorValue);

            if (shade) {
                let finalSchema = shade;
                if (typeof shade === 'string') {
                    finalSchema = this.getSafe(
                        `shades.${shade}.color.${color}`,
                    );
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
                    `var(${shadeNameVar}-spin ,${modifierParams.spin ?? 0})`,
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

                let alpha =
                    modifierParams.alpha !== undefined
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
                ${
                    modifierParams.alpha !== undefined
                        ? alpha
                        : `var(${shadeNameVar}-a, 1)`
                }
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
    async loopOnColors(
        callback: ISThemeLoopOnColorsCallback,
    ): Promise<boolean> {
        const colorsObj = this.get('color'),
            shadessObj = this.get('shades');

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
                callback(<ISThemeLoopOnColorsColor>{
                    name: colorName,
                    shade: shadeName,
                    shadeDash: __dashCase(shadeName),
                    value: {
                        variable: `--${__dashCase(
                            `s-color-${colorName}-${shadeName}`,
                        )}`,
                        // @ts-ignore
                        ...shadeObj,
                        r: newColor.r,
                        g: newColor.g,
                        b: newColor.b,
                        h: newColor.h,
                        s: newColor.s,
                        l: newColor.l,
                        a: newColor.a,
                    },
                });

                // @ts-ignore
                if (shadeObj.color) {
                    for (let [
                        shadesColorName,
                        shadesObj,
                        // @ts-ignore
                    ] of Object.entries(shadeObj.color)) {
                        if (shadesColorName !== colorName) continue;

                        const newColor = c.apply(shadesObj, true);

                        callback(<ISThemeLoopOnColorsColor>{
                            name: shadesColorName,
                            shade: shadeName,
                            value: {
                                variable: `--${__dashCase(
                                    `s-color-${shadesColorName}-${shadeName}`,
                                )}`,
                                // @ts-ignore
                                ...shadesObj,
                                r: newColor.r,
                                g: newColor.g,
                                b: newColor.b,
                                h: newColor.h,
                                s: newColor.s,
                                l: newColor.l,
                                a: newColor.a,
                            },
                        });
                    }
                }
            }
        }

        return true;
    }
}
