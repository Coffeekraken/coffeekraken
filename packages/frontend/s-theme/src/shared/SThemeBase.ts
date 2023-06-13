import __SColor from '@coffeekraken/s-color';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __compressCssVarName } from '@coffeekraken/sugar/css';
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

export interface ISThemeLodSettings {
    enabled: boolean;
    level: number;
    botLevel: number;
    method: 'class' | 'file';
    stylesheet: string | HTMLLinkElement;
}

export interface ISThemeCssSettings {
    compressVarNames: boolean;
}

export interface ISThemeSettings {
    lod: Partial<ISThemeLodSettings>;
    css: Partial<ISThemeCssSettings>;
}

export interface ISThemeDefaultStaticSettings {
    theme: string;
    variant: string;
}

export interface ISThemeResolveColorSettings
    extends ISThemeDefaultStaticSettings {
    return: 'value' | 'var';
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
    schema: string;
    schemaDash: string;
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
     * @name      theme
     * @type      String
     * @static
     *
     * Store the current theme setted in the config.theme namespace
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get theme(): string {
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
    static get variant(): string {
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
    static get themesNames(): string[] {
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
    static isDark(): boolean {
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
    static isMobileFirst(): boolean {
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
    static getThemeMetas(): any {
        let defaultTheme = __SSugarConfig.get('theme.theme'),
            defaultVariant = __SSugarConfig.get('theme.variant');

        let theme = defaultTheme,
            variant = defaultVariant;

        const metas =
            __SSugarConfig.get(`theme.themes.${theme}-${variant}.metas`) ?? {};

        return __deepMerge(
            {
                name: `${theme ?? defaultTheme}-${variant ?? defaultVariant}`,
                theme: theme ?? defaultTheme,
                variant: variant ?? defaultVariant,
            },
            metas,
        );
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
    static _firstGetedThemeSettings: any;
    static getTheme(
        theme: string,
        variant: string,
        settings?: Partial<ISThemeSettings>,
    ): SThemeBase {
        const themesNames = Object.keys(__SSugarConfig.get('theme.themes'));

        theme = theme ?? this._firstGetedThemeSettings?.theme;
        variant = variant ?? this._firstGetedThemeSettings?.variant;

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
            this._instanciatedThemes[`${theme}-${variant}`] = new this(
                theme,
                variant,
                settings,
            );
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
    static hash(
        dotPath: string = '',
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): string {
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
    static resolveFontSize(
        size: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        // get the theme instance
        const theme = this.getTheme(settings?.theme, settings?.variant);

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
    static resolvePadding(
        size: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        // get the theme instance
        const theme = this.getTheme(settings?.theme, settings?.variant);

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
    static resolveMargin(
        size: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        // get the theme instance
        const theme = this.getTheme(settings?.theme, settings?.variant);

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
    static resolveBorderRadius(
        size: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        // get the theme instance
        const theme = this.getTheme(settings?.theme, settings?.variant);

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
    static resolveBorderWidth(
        size: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        // get the theme instance
        const theme = this.getTheme(settings?.theme, settings?.variant);

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
    static resolveColor(
        color: string,
        schema?: string,
        modifier?: string,
        settings?: Partial<ISThemeResolveColorSettings>,
    ): string {
        const theme = this.getTheme(settings?.theme, settings?.variant);
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
    static cssVar(
        dotPath: string,
        fallback = true,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): string {
        // get the theme instance
        const theme = this.getTheme(settings?.theme, settings?.variant);

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
        if (!fallback || (typeof fb === 'string' && fb.includes(','))) fb = 0;

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
    static resolveCssPropertyValue(
        property: string,
        value: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        const dashProp = __dashCase(property);
        switch (dashProp) {
            case 'font-family':
                const fontObj = this.get(`font.family.${value}`);
                return fontObj?.fontFamily ?? value;
                break;
            case 'font-size':
                return this.resolveFontSize(value, settings) ?? value;
                break;
            case 'color':
            case 'background-color':
                let color = value,
                    schema,
                    modifier;
                if (Array.isArray(value) && value.length === 2) {
                    color = value[0];
                    schema = value[1];
                }
                if (Array.isArray(value) && value.length === 3) {
                    color = value[0];
                    schema = value[1];
                    modifier = value[2];
                }
                return (
                    this.resolveColor(color, schema, modifier, {
                        ...(settings ?? {}),
                        return: 'value',
                    }) ?? value
                );
                break;
            case 'border-radius':
            case 'border-top-left-radius':
            case 'border-top-right-radius':
            case 'border-bottom-right-radius':
            case 'border-bottom-left-radius':
                return this.resolveBorderRadius(value) ?? value;
                break;
            case 'border-width':
                return this.resolveBorderWidth(value) ?? value;
                break;
            case 'transition':
                return this.getSafe(`transition.${value}`) ?? value;
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
                return this.resolveMargin(value) ?? value;
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
                return this.resolvePadding(value) ?? value;
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
    static resolveCssObjectPropertiesValues(
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
    static jsObjectToCssProperties(
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
                propsStack.push(`@sugar.media(${prop.replace(/^@/, '')}) {`);
                propsStack.push(
                    this.jsObjectToCssProperties(value, finalSettings),
                );
                propsStack.push(`}`);
            } else {
                switch (prop) {
                    case 'font-family':
                        propsStack.push(`@sugar.font.family(${value});`);
                        break;
                    case 'font-size':
                        propsStack.push(`@sugar.font.size(${value});`);
                        break;

                    case 'color':
                    case 'background-color':
                        let color = value,
                            schema,
                            modifier;
                        if (Array.isArray(value) && value.length === 2) {
                            color = value[0];
                            schema = value[1];
                        }
                        if (Array.isArray(value) && value.length === 3) {
                            color = value[0];
                            schema = value[1];
                            modifier = value[2];
                        }
                        propsStack.push(
                            `${prop}: ${
                                this.resolveColor(color, schema, modifier, {
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
                            `border-radius: sugar.border.radius(${value});`,
                        );
                        break;
                    case 'border-width':
                        propsStack.push(
                            `border-width: sugar.border.width(${value});`,
                        );
                        break;
                    case 'transition':
                        propsStack.push(
                            `transition: sugar.transition(${value});`,
                        );
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
                        if (props.indexOf(prop) === -1) return;
                        propsStack.push(`${prop}: ${value};`);
                        break;
                }
            }
        });
        return propsStack.join('\n');
    }

    static compressVarName(varname: string): string {
        if (!this.cssSettings?.compress?.variables) {
            return varname;
        }
        return __compressCssVarName(varname);
    }

    static jsConfigObjectToCssProperties(obj: any): string[] {
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

            let variable = this.compressVarName(`--s-${varKey}`);

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
    static remapCssColor(
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

            this.getTheme(settings?.theme, settings?.variant).loopOnColors(
                (colorObj) => {
                    if (colorObj.name === toColorName) {
                        if (toColorVariant) {
                            if (colorObj.schema === toColorVariant) {
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-saturation-offset`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-${colorObj.schemaDash}-saturation-offset`,
                                    )}, 0);`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-saturation-offset`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-${colorObj.schemaDash}-saturation-offset`,
                                )}, 0)`;
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-lightness-offset`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-${colorObj.schemaDash}-lightness-offset`,
                                    )}, 0);`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-lightness-offset`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-${colorObj.schemaDash}-lightness-offset`,
                                )}, 0)`;
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-a`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-a`,
                                    )}, 1);`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-a`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-a`,
                                )}, 1)`;
                            }
                        } else {
                            if (!colorObj.schema && colorObj.value.color) {
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-h`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-h`,
                                    )});`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-h`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-h`,
                                )})`;
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-s`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-s`,
                                    )});`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-s`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-s`,
                                )})`;
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-l`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-l`,
                                    )});`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-l`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-l`,
                                )})`;
                            } else {
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-${colorObj.schemaDash}-saturation-offset`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-${colorObj.schemaDash}-saturation-offset`,
                                    )}, 0);`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-${colorObj.schemaDash}-saturation-offset`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-${colorObj.schemaDash}-saturation-offset`,
                                )}, 0)`;
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-${colorObj.schemaDash}-lightness-offset`,
                                    )}: var(${this.compressVarName(
                                        `${toVariable}-${colorObj.schemaDash}-lightness-offset`,
                                    )}, 0);`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-${colorObj.schemaDash}-lightness-offset`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-${colorObj.schemaDash}-lightness-offset`,
                                )}, 0)`;
                                result.vars.push(
                                    `${this.compressVarName(
                                        `${fromVariable}-a: var(${toVariable}-a`,
                                    )}, 1);`,
                                );
                                result.properties[
                                    `${this.compressVarName(
                                        `${fromVariable}-a`,
                                    )}`
                                ] = `var(${this.compressVarName(
                                    `${toVariable}-a`,
                                )}, 1)`;
                            }
                        }
                    }
                },
            );
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
    static toCssVars(
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): string[] {
        // @ts-ignore

        const themeInstance = this.getTheme(settings?.theme, settings?.variant);
        if (!themeInstance)
            throw new Error(
                `Sorry but the requested theme "<yellow>${settings.theme}-${settings.variant}</yellow>" does not exists...`,
            );

        let vars: string[] = [
            `--s: ${themeInstance.theme};`,
            `--s-variant: ${themeInstance.variant};`,
        ];

        // handle colors
        themeInstance.loopOnColors((colorObj) => {
            const baseVariable = colorObj.value.variable;

            if (!colorObj.schema && colorObj.value.color) {
                vars.push(
                    `${this.compressVarName(`${baseVariable}-h`)}: ${
                        colorObj.value.h
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-s`)}: ${
                        colorObj.value.s
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-l`)}: ${
                        colorObj.value.l
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-a`)}: ${
                        colorObj.value.a
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-origin-h`)}: ${
                        colorObj.value.h
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-origin-s`)}: ${
                        colorObj.value.s
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-origin-l`)}: ${
                        colorObj.value.l
                    };`,
                );
                vars.push(
                    `${this.compressVarName(`${baseVariable}-origin-a`)}: ${
                        colorObj.value.a
                    };`,
                );
            } else if (colorObj.schema) {
                if (colorObj.value.saturate) {
                    vars.push(
                        `${this.compressVarName(
                            `${baseVariable}-saturation-offset`,
                        )}: ${colorObj.value.saturate};`,
                    );
                } else if (colorObj.value.desaturate) {
                    vars.push(
                        `${this.compressVarName(
                            `${baseVariable}-saturation-offset`,
                        )}: ${colorObj.value.desaturate * -1};`,
                    );
                } else {
                    vars.push(
                        `${this.compressVarName(
                            `${baseVariable}-saturation-offset`,
                        )}: 0;`,
                    );
                }
                if (colorObj.value.lighten) {
                    vars.push(
                        `${this.compressVarName(
                            `${baseVariable}-lightness-offset`,
                        )}: ${colorObj.value.lighten};`,
                    );
                } else if (colorObj.value.darken) {
                    vars.push(
                        `${this.compressVarName(
                            `${baseVariable}-lightness-offset`,
                        )}: ${colorObj.value.darken * -1};`,
                    );
                } else {
                    vars.push(
                        `${this.compressVarName(
                            `${baseVariable}-lightness-offset`,
                        )}: 0;`,
                    );
                }
                if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                    vars.push(
                        `${this.compressVarName(`${baseVariable}-a`)}: ${
                            colorObj.value.alpha
                        };`,
                    );
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
                vars.push(
                    `${this.compressVarName(`${variable}`)}: "${
                        flattenedTheme[key]
                    }";`,
                );
            } else {
                vars.push(
                    `${this.compressVarName(`${variable}`)}: ${
                        flattenedTheme[key]
                    };`,
                );
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
    static getSafe(
        dotPath: string,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        const instance = this.getTheme(settings?.theme, settings?.variant);
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
    static get(
        dotPath: string,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        const instance = this.getTheme(settings?.theme, settings?.variant);
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
    static set(
        dotPath: string,
        value: any,
        settings?: Partial<ISThemeDefaultStaticSettings>,
    ): any {
        const instance = this.getTheme(settings?.theme, settings?.variant);
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
    proxyNonExistingUiDotpath(dotPath: string): string {
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
    _cachedConfig;
    get _config() {
        if (this._cachedConfig) {
            return this._cachedConfig;
        }
        // @ts-ignore
        this._cachedConfig = Object.assign(
            {},
            __deepMerge(
                __SSugarConfig.get('theme.themes')[this.id],
                this._overridedConfig,
            ),
        );
        return this._cachedConfig;
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
        let value = __get(this._config, dotPath);

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
                variable: `--${__dashCase(
                    this.constructor.compressVarName(`s-color-${colorName}`),
                )}`,
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
    resolveFontSize(size: any): any {
        const defaultSizeStr = this.get('font.size.default'),
            defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''),
            defaultSize = parseInt(defaultSizeStr);

        // try to get the padding with the pased
        const registeredValue = this.getSafe(`font.size.${size}`);

        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        } else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }

        // by default, return the passed size
        return registeredValue ?? size;
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
    resolvePadding(size: any): any {
        const defaultSizeStr = this.get('padding.default'),
            defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''),
            defaultSize = parseInt(defaultSizeStr);

        // try to get the padding with the pased
        const registeredValue = this.getSafe(`padding.${size}`);

        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        } else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }

        // by default, return the passed size
        return registeredValue ?? size;
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
    resolveMargin(size: any): any {
        const defaultSizeStr = this.get('margin.default'),
            defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''),
            defaultSize = parseInt(defaultSizeStr);

        // try to get the padding with the pased
        const registeredValue = this.getSafe(`margin.${size}`);

        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        } else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }

        // by default, return the passed size
        return registeredValue ?? size;
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
    resolveBorderRadius(size: any): any {
        const defaultSizeStr = this.get('border.radius.default'),
            defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''),
            defaultSize = parseInt(defaultSizeStr);

        // try to get the padding with the pased
        const registeredValue = this.getSafe(`border.radius.${size}`);

        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        } else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }

        // by default, return the passed size
        return registeredValue ?? size;
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
    resolveBorderWidth(size: any): any {
        const defaultSizeStr = this.get('border.width.default'),
            defaultSizeUnit = defaultSizeStr.replace(/[0-9]+/gm, ''),
            defaultSize = parseInt(defaultSizeStr);

        // try to get the padding with the pased
        const registeredValue = this.getSafe(`border.width.${size}`);

        // if we have a registered value corresponding
        if (registeredValue !== undefined) {
            // int
            if (typeof registeredValue === 'number') {
                return `${defaultSize * registeredValue}${defaultSizeUnit}`;
            }
        } else if (typeof size === 'number') {
            return `${defaultSize * size}${defaultSizeUnit}`;
        }

        // by default, return the passed size
        return registeredValue ?? size;
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
    resolveColor(
        color: string,
        schema?: string,
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
        let colorSchemaName = schema ?? '';
        let colorModifier = modifier ?? '';

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
        if (__isColor(colorName)) {
            const color = new __SColor(colorName);
            if (colorModifier) {
                color.apply(colorModifier);
            }
            return color.toString();
        } else {
            // check what we want back
            // it can be either a "var" or a "value"
            switch (finalSettings.return) {
                case 'var':
                    const colorVar = `--s-color-${colorName}`;

                    let colorSchemaNameVar = `s-color-${colorName}`;
                    if (colorSchemaName) {
                        colorSchemaNameVar += `-${__dashCase(colorSchemaName)}`;
                    }
                    colorSchemaNameVar =
                        '--' + colorSchemaNameVar.replace(/-{2,999}/gm, '-');

                    finalValue = colorVar;

                    const hParts = [
                        `var(${colorVar}-h, 0)`,
                        `var(${colorSchemaNameVar}-spin ,${
                            modifierParams.spin ?? 0
                        })`,
                    ];

                    const sParts = [`var(${colorVar}-s, 0)`];
                    if (colorSchemaName) {
                        sParts.push(
                            `var(${colorSchemaNameVar}-saturation-offset, 0)`,
                        );
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
                        lParts.push(
                            `var(${colorSchemaNameVar}-lightness-offset, 0)`,
                        );
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
                            : `var(${colorSchemaNameVar}-a, 1)`
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
                    const colorValue = this.getSafe(`color.${color}`) ?? color;

                    // nothing to apply on the color
                    if (!schema && !modifier) {
                        finalValue = colorValue;
                    }

                    // init a new SColor instance
                    let colorInstance = new __SColor(colorValue);

                    if (schema) {
                        let finalSchema = schema;
                        if (typeof schema === 'string') {
                            finalSchema = this.getSafe(
                                `colorSchema.${schema}.color.${color}`,
                            );
                            if (!finalSchema) {
                                finalSchema = this.getSafe(
                                    `colorSchema.${schema}`,
                                );
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
    async loopOnColors(
        callback: ISThemeLoopOnColorsCallback,
    ): Promise<boolean> {
        const colorsObj = this.get('color'),
            colorSchemasObj = this.get('colorSchema');

        for (let [colorName, colorValue] of Object.entries(colorsObj)) {
            const c = new __SColor(colorValue);
            callback({
                name: colorName,
                schema: '',
                // @ts-ignore
                value: {
                    color: colorValue,
                    variable: `--${__dashCase(
                        this.constructor.compressVarName(
                            `s-color-${colorName}`,
                        ),
                    )}`,
                    r: c.r,
                    g: c.g,
                    b: c.b,
                    h: c.h,
                    s: c.s,
                    l: c.l,
                    a: c.a,
                },
            });

            for (let [schemaName, schemaObj] of Object.entries(
                colorSchemasObj,
            )) {
                const newColor = c.apply(schemaObj, true);
                callback(<ISThemeLoopOnColorsColor>{
                    name: colorName,
                    schema: schemaName,
                    schemaDash: __dashCase(schemaName),
                    value: {
                        variable: `--${__dashCase(
                            this.constructor.compressVarName(
                                `s-color-${colorName}-${schemaName}`,
                            ),
                        )}`,
                        // @ts-ignore
                        ...schemaObj,
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
                if (schemaObj.color) {
                    for (let [
                        colorSchemaColorName,
                        colorSchemaObj,
                        // @ts-ignore
                    ] of Object.entries(schemaObj.color)) {
                        if (colorSchemaColorName !== colorName) continue;

                        const newColor = c.apply(colorSchemaObj, true);

                        callback(<ISThemeLoopOnColorsColor>{
                            name: colorSchemaColorName,
                            schema: schemaName,
                            value: {
                                variable: `--${__dashCase(
                                    this.constructor.compressVarName(
                                        `s-color-${colorSchemaColorName}-${schemaName}`,
                                    ),
                                )}`,
                                // @ts-ignore
                                ...colorSchemaObj,
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
