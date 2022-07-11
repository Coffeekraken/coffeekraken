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
 * theme.loopOnColors(({name, modifier, value}) => {
 *      // do something...
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

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
    defaultQuery: string;
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
    cssVariables: string[];
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
    variant: string;
    state?: string;
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
     * @name      themes
     * @type      String
     * @static
     *
     * Store the names of all the available themes
     *
     * @since     2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get themes(): string[] {
        return Object.keys(__SSugarConfig.get('theme.themes'));
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
    static getTheme(theme?: string, variant?: string): SThemeBase {
        if (!theme) {
            theme = __SSugarConfig.get('theme.theme');
        }
        if (!variant) {
            variant = __SSugarConfig.get('theme.variant');
        }

        if (this._instanciatedThemes[`${theme}-${variant}`]) {
            return this._instanciatedThemes[`${theme}-${variant}`];
        }

        const themes = __SSugarConfig.get('theme.themes');

        if (!themes[`${theme}-${variant}`])
            throw new Error(
                `<red>[${
                    this.theme
                }]</red> Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists. Here's the available themes: <green>${Object.keys(
                    themes,
                ).join(',')}</green>`,
            );
        this._instanciatedThemes[`${theme}-${variant}`] = new this(
            theme,
            variant,
        );
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
    static hash(dotPath: string = ''): string {
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
    static cssVar(dotPath: string, fallback = true): string {
        let fb = this.getTheme().get(dotPath);
        if (!fallback || (typeof fb === 'string' && fb.includes(','))) fb = 0;

        const v = `var(${__compressVarName(
            `--s-theme-${dotPath
                .replace(/\./gm, '-')
                .replace(/:/gm, '-')
                .replace(/\?/gm, '')
                .replace(/--/gm, '-')}`,
        )}, ${fb})`;
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
    static buildMediaQuery(queryString: string): string {
        let currentQueryList: string[] = [];

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

            if (
                firstTwoChar === '>=' ||
                firstTwoChar === '<=' ||
                firstTwoChar === '=='
            ) {
                mediaName = mediaName.slice(2);
                action = firstTwoChar;
            } else if (
                firstChar === '<' ||
                firstChar === '>' ||
                firstChar === '='
            ) {
                mediaName = mediaName.slice(1);
                action = firstChar;
            }

            const mediaQueryConfig = this.get('media.queries')[mediaName];
            if (!mediaQueryConfig)
                throw new Error(
                    `<red>[postcssSugarPlugin.media]</red> Sorry but the requested media "<yellow>${mediaName}</yellow>" does not exists in the config. Here's the available medias: ${Object.keys(
                        this.get('media.queries'),
                    )
                        .map((l) => `<green>${l}</green>`)
                        .join(',')}`,
                );

            const queryList: string[] = [];

            Object.keys(mediaQueryConfig).forEach((prop) => {
                const value = mediaQueryConfig[prop];
                if (!value) return;

                if (
                    [
                        'min-width',
                        'max-width',
                        'min-device-width',
                        'max-device-width',
                    ].indexOf(prop) !== -1
                ) {
                    if (action === '>') {
                        if (
                            prop === 'max-width' ||
                            prop === 'max-device-width'
                        ) {
                            let argName = 'min-width';
                            if (prop.includes('-device'))
                                argName = 'min-device-width';
                            queryList.push(`(${argName}: ${value + 1}px)`);
                        }
                    } else if (action === '<') {
                        if (
                            prop === 'min-width' ||
                            prop === 'min-device-width'
                        ) {
                            let argName = 'max-width';
                            if (prop.includes('-device'))
                                argName = 'max-device-width';
                            queryList.push(`(${argName}: ${value}px)`);
                        }
                    } else if (action === '=') {
                        queryList.push(`(${prop}: ${value}px)`);
                    } else if (action === '>=') {
                        if (
                            prop === 'min-width' ||
                            prop === 'min-device-width'
                        ) {
                            queryList.push(`(${prop}: ${value}px)`);
                        }
                    } else if (action === '<=') {
                        if (
                            prop === 'max-width' ||
                            prop === 'max-device-width'
                        ) {
                            queryList.push(`(${prop}: ${value}px)`);
                        }
                    } else {
                        queryList.push(`(${prop}: ${value}px)`);
                    }
                } else {
                    queryList.push(`(${prop}: ${value}px)`);
                }
            });

            if (lastChar === '-') {
                queryList.push('(orientation: landscape)');
            } else if (lastChar === '|') {
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

            let color, modifier;

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
                        color = value;
                        modifier = '';
                        if (Array.isArray(value)) {
                            color = value[0];
                            modifier = value[1];
                        }
                        propsStack.push(
                            `color: sugar.color(${color}, ${modifier});`,
                        );
                        break;
                    case 'background-color':
                        color = value;
                        modifier = '';
                        if (Array.isArray(value)) {
                            color = value[0];
                            modifier = value[1];
                        }
                        propsStack.push(
                            `background-color: sugar.color(${color}, ${modifier});`,
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

            let variable = __compressVarName(`--s-theme-${varKey}`);

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
    static remapCssColor(from: string, to: string): ISThemeRemapColorResult {
        const result: ISThemeRemapColorResult = {
            vars: [],
            properties: {},
        };

        if (__isColor(to)) {
            const color = new __SColor(to);
            result.vars = [
                `${__compressVarName(`--s-theme-color-${from}-h`)}: ${
                    color.h
                };`,
                `${__compressVarName(`--s-theme-color-${from}-s`)}: ${
                    color.s
                };`,
                `${__compressVarName(`--s-theme-color-${from}-l`)}: ${
                    color.l
                };`,
                `${__compressVarName(`--s-theme-color-${from}-a`)}: ${
                    color.a
                };`,
            ];
            result.properties[__compressVarName(`--s-theme-color-${from}-h`)] =
                color.h;
            result.properties[__compressVarName(`--s-theme-color-${from}-s`)] =
                color.s;
            result.properties[__compressVarName(`--s-theme-color-${from}-l`)] =
                color.l;
            result.properties[__compressVarName(`--s-theme-color-${from}-a`)] =
                color.a;
        } else {
            const toColorName = to.split('-').slice(0, 1)[0],
                fromColorName = from.split('-').slice(0, 1)[0];
            let toColorVariant = to.split('-').pop(),
                fromColorVariant = from.split('-').pop();
            if (toColorName === toColorVariant) toColorVariant = undefined;
            if (fromColorName === fromColorVariant)
                fromColorVariant = undefined;

            let fromVariable = `--s-theme-color-${fromColorName}`,
                toVariable = `--s-theme-color-${toColorName}`;

            this.getTheme().loopOnColors((colorObj) => {
                if (colorObj.name === toColorName) {
                    if (toColorVariant) {
                        if (colorObj.variant === toColorVariant) {
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-saturation-offset`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-${colorObj.variant}-saturation-offset`,
                                )}, 0);`,
                            );
                            result.properties[
                                `${__compressVarName(
                                    `${fromVariable}-saturation-offset`,
                                )}`
                            ] = `var(${__compressVarName(
                                `${toVariable}-${colorObj.variant}-saturation-offset`,
                            )}, 0)`;
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-lightness-offset`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-${colorObj.variant}-lightness-offset`,
                                )}, 0);`,
                            );
                            result.properties[
                                `${__compressVarName(
                                    `${fromVariable}-lightness-offset`,
                                )}`
                            ] = `var(${__compressVarName(
                                `${toVariable}-${colorObj.variant}-lightness-offset`,
                            )}, 0)`;
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-a`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-a`,
                                )}, 1);`,
                            );
                            result.properties[
                                `${__compressVarName(`${fromVariable}-a`)}`
                            ] = `var(${__compressVarName(
                                `${toVariable}-a`,
                            )}, 1)`;
                        }
                    } else {
                        if (
                            !colorObj.state &&
                            !colorObj.variant &&
                            colorObj.value.color
                        ) {
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-h`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-h`,
                                )});`,
                            );
                            result.properties[
                                `${__compressVarName(`${fromVariable}-h`)}`
                            ] = `var(${__compressVarName(`${toVariable}-h`)})`;
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-s`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-s`,
                                )});`,
                            );
                            result.properties[
                                `${__compressVarName(`${fromVariable}-s`)}`
                            ] = `var(${__compressVarName(`${toVariable}-s`)})`;
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-l`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-l`,
                                )});`,
                            );
                            result.properties[
                                `${__compressVarName(`${fromVariable}-l`)}`
                            ] = `var(${__compressVarName(`${toVariable}-l`)})`;
                        } else if (!colorObj.value.color) {
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-${colorObj.variant}-saturation-offset`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-${colorObj.variant}-saturation-offset`,
                                )}, 0);`,
                            );
                            result.properties[
                                `${__compressVarName(
                                    `${fromVariable}-${colorObj.variant}-saturation-offset`,
                                )}`
                            ] = `var(${__compressVarName(
                                `${toVariable}-${colorObj.variant}-saturation-offset`,
                            )}, 0)`;
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-${colorObj.variant}-lightness-offset`,
                                )}: var(${__compressVarName(
                                    `${toVariable}-${colorObj.variant}-lightness-offset`,
                                )}, 0);`,
                            );
                            result.properties[
                                `${__compressVarName(
                                    `${fromVariable}-${colorObj.variant}-lightness-offset`,
                                )}`
                            ] = `var(${__compressVarName(
                                `${toVariable}-${colorObj.variant}-lightness-offset`,
                            )}, 0)`;
                            result.vars.push(
                                `${__compressVarName(
                                    `${fromVariable}-a: var(${toVariable}-a`,
                                )}, 1);`,
                            );
                            result.properties[
                                `${__compressVarName(`${fromVariable}-a`)}`
                            ] = `var(${__compressVarName(
                                `${toVariable}-a`,
                            )}, 1)`;
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
    static toCssVars(theme?: string, variant?: string): string[] {
        // @ts-ignore

        const themeInstance = this.getTheme(theme, variant);
        if (!themeInstance)
            throw new Error(
                `Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`,
            );

        let vars: string[] = [];

        // handle colors
        themeInstance.loopOnColors((colorObj) => {
            const baseVariable = colorObj.value.variable;

            if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
                vars.push(
                    `${__compressVarName(`${baseVariable}-h`)}: ${
                        colorObj.value.h
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-s`)}: ${
                        colorObj.value.s
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-l`)}: ${
                        colorObj.value.l
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-a`)}: ${
                        colorObj.value.a
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-origin-h`)}: ${
                        colorObj.value.h
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-origin-s`)}: ${
                        colorObj.value.s
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-origin-l`)}: ${
                        colorObj.value.l
                    };`,
                );
                vars.push(
                    `${__compressVarName(`${baseVariable}-origin-a`)}: ${
                        colorObj.value.a
                    };`,
                );
            } else if (!colorObj.value.color) {
                if (colorObj.value.saturate) {
                    vars.push(
                        `${__compressVarName(
                            `${baseVariable}-saturation-offset`,
                        )}: ${colorObj.value.saturate};`,
                    );
                } else if (colorObj.value.desaturate) {
                    vars.push(
                        `${__compressVarName(
                            `${baseVariable}-saturation-offset`,
                        )}: ${colorObj.value.desaturate * -1};`,
                    );
                } else {
                    vars.push(
                        `${__compressVarName(
                            `${baseVariable}-saturation-offset`,
                        )}: 0;`,
                    );
                }
                if (colorObj.value.lighten) {
                    vars.push(
                        `${__compressVarName(
                            `${baseVariable}-lightness-offset`,
                        )}: ${colorObj.value.lighten};`,
                    );
                } else if (colorObj.value.darken) {
                    vars.push(
                        `${__compressVarName(
                            `${baseVariable}-lightness-offset`,
                        )}: ${colorObj.value.darken * -1};`,
                    );
                } else {
                    vars.push(
                        `${__compressVarName(
                            `${baseVariable}-lightness-offset`,
                        )}: 0;`,
                    );
                }
                if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                    vars.push(
                        `${__compressVarName(`${baseVariable}-a`)}: ${
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
                vars.push(
                    `${__compressVarName(`${variable}`)}: "${
                        flattenedTheme[key]
                    }";`,
                );
            } else {
                vars.push(
                    `${__compressVarName(`${variable}`)}: ${
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
    static getSafe(dotPath: string, theme?: string, variant?: string): any {
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
    static get(dotPath: string, theme?: string, variant?: string): any {
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
    static set(
        dotPath: string,
        value: any,
        theme?: string,
        variant?: string,
    ): any {
        const instance = this.getTheme(theme, variant);
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
    constructor(theme?: string, variant?: string) {
        super({});

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
     * @name          get
     * @type          Function
     *
     * This method allows you to access a value of the current theme
     * using a dot path like "color.primary.default", etc...
     *
     * @param         {String}        dotPath         The dot path of the config you want to get
     * @return        {Any}                           The value of the getted configuration
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get _config() {
        // @ts-ignore
        return Object.assign(
            {},
            __deepMerge(
                __SSugarConfig.get('theme.themes')[this.id],
                this._overridedConfig,
            ),
        );
    }
    get(dotPath, preventThrow: boolean = false): any {
        const value = __get(this._config, dotPath);
        if (value === undefined && !preventThrow) {
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
        Object.keys(this._config.color).forEach((color) => {
            const colorObj = this._config.color[color];
            if (!colorObj.color) return;
            const c = new __SColor(colorObj.color);
            map[color] = {
                color: colorObj.color,
                variable: __compressVarName(`--s-theme-color-${color}`),
                r: c.r,
                g: c.g,
                b: c.b,
                h: c.h,
                s: c.s,
                l: c.l,
                a: c.a,
            };
        });
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
     * - name       {String}        The name of the color like "primary", "secondary", etc...
     * - variant    {String}        The name of the variant like "background", "surface", etc...
     * - state      {String}        The name of the state like "hover", "active", etc...
     * - value      {ISThemeColor | ISThemeColorModifiers}        The actual color object
     *
     * @since             2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async loopOnColors(
        callback: ISThemeLoopOnColorsCallback,
    ): Promise<boolean> {
        const colorsObj = this.get('color');
        let triggeredStop = false;

        for (let [colorName, colorObj] of Object.entries(colorsObj)) {
            // if (triggeredStop) return;
            const colorObj = colorsObj[colorName];

            const defaultColorObj = Object.assign({}, colorObj.default ?? {});

            if (!colorObj.color) {
                throw new Error(
                    `Sorry but your color "<yellow>${colorName}</yellow>" does not provide a "<cyan>color</cyan>" property and this is required...`,
                );
            }

            const c = new __SColor(colorObj.color);

            const _res = callback({
                name: colorName,
                variant: '',
                state: '',
                // @ts-ignore
                value: {
                    color: colorObj.color,
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
            // @ts-ignore
            if (_res === false || _res === -1) {
                return true;
            }

            for (let [stateName, stateObj] of Object.entries(colorObj)) {
                // if (triggeredStop) return;
                const originalStateName = stateName;

                if (stateName === 'default') stateName = ':default';

                let state = stateName.match(/^:/) ? stateName.slice(1) : '',
                    variant = !stateName.match(/^:/) ? stateName : '',
                    res;

                let variantColorObj = Object.assign(
                    {},
                    colorObj[originalStateName],
                );
                if (state !== 'default')
                    variantColorObj = {
                        ...defaultColorObj,
                        ...variantColorObj,
                    };

                if (stateName === 'color') {
                } else if (stateName.match(/^:/)) {
                    for (let [variant, variantObj] of Object.entries(
                        variantColorObj,
                    )) {
                        const newColor = c.apply(variantObj, true);
                        res = callback(<ISThemeLoopOnColorsColor>{
                            name: colorName,
                            state: state === 'default' ? '' : state,
                            variant,
                            value: {
                                variable:
                                    state && state !== 'default'
                                        ? __compressVarName(
                                              `--s-theme-color-${colorName}-${state}-${variant}`,
                                          )
                                        : __compressVarName(
                                              `--s-theme-color-${colorName}-${variant}`,
                                          ),
                                ...variantColorObj[variant],
                                r: newColor.r,
                                g: newColor.g,
                                b: newColor.b,
                                h: newColor.h,
                                s: newColor.s,
                                l: newColor.l,
                                a: newColor.a,
                            },
                        });
                        if (res === false || res === -1) {
                            return true;
                        }
                    }
                } else {
                    const newColor = c.apply(variantColorObj, true);
                    res = callback(<ISThemeLoopOnColorsColor>{
                        name: colorName,
                        variant,
                        state,
                        value: {
                            variable: state
                                ? __compressVarName(
                                      `--s-theme-color-${colorName}-${state}-${variant}`,
                                  )
                                : __compressVarName(
                                      `--s-theme-color-${colorName}-${variant}`,
                                  ),
                            ...variantColorObj,
                            r: newColor.r,
                            g: newColor.g,
                            b: newColor.b,
                            h: newColor.h,
                            s: newColor.s,
                            l: newColor.l,
                            a: newColor.a,
                        },
                    });
                    if (res === false || res === -1) {
                        return true;
                    }
                }
            }
        }

        return true;
    }
}
