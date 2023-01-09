import __SEventEmitter from '@coffeekraken/s-event-emitter';
export interface ISThemeLodSettings {
    enabled: boolean;
    level: number;
    botLevel: number;
    method: 'class' | 'file';
    stylesheet: string | HTMLLinkElement;
}
export interface ISThemeSettings {
    lod: Partial<ISThemeLodSettings>;
}
export interface ISThemeDefaultStaticSettings {
    theme: string;
    variant: string;
}
export interface ISThemeResolveColorSettings extends ISThemeDefaultStaticSettings {
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
    schema: string;
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
    
    static sortMedia(media: any): any;
    
    theme: string;
    
    variant: string;
    
    private _overridedConfig;
    
    get id(): String;
    
    static get theme(): string;
    
    static get variant(): string;
    
    static get themesNames(): string[];
    
    static isDark(): boolean;
    
    static isMobileFirst(): boolean;
    
    static getThemeMetas(): any;
    
    static get themes(): Object;
    
    static _instanciatedThemes: Record<string, SThemeBase>;
    static _firstGetedThemeSettings: any;
    static getTheme(theme: string, variant: string, settings?: Partial<ISThemeSettings>): SThemeBase;
    
    static hash(dotPath?: string, settings?: Partial<ISThemeDefaultStaticSettings>): string;
    
    static resolveFontSize(size: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static resolvePadding(size: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static resolveMargin(size: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static resolveBorderRadius(size: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static resolveBorderWidth(size: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static resolveColor(color: string, schema?: string, modifier?: string, settings?: Partial<ISThemeResolveColorSettings>): string;
    
    static cssVar(dotPath: string, fallback?: boolean, settings?: Partial<ISThemeDefaultStaticSettings>): string;
    
    static buildMediaQuery(queryString: string): string;
    
    static resolveCssPropertyValue(property: string, value: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static resolveCssObjectPropertiesValues(object: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static jsObjectToCssProperties(jsObject: any, settings?: Partial<IJsObjectToCssProperties>): string;
    static jsConfigObjectToCssProperties(obj: any): string[];
    
    static remapCssColor(from: string, to: string, settings?: Partial<ISThemeDefaultStaticSettings>): ISThemeRemapColorResult;
    
    static toCssVars(settings?: Partial<ISThemeDefaultStaticSettings>): string[];
    
    static getSafe(dotPath: string, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static get(dotPath: string, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    static set(dotPath: string, value: any, settings?: Partial<ISThemeDefaultStaticSettings>): any;
    
    constructor(theme?: string, variant?: string, settings?: Partial<ISThemeSettings>);
    
    get themes(): any;
    
    proxyNonExistingUiDotpath(dotPath: string): string;
    
    getSafe(dotPath: string): any;
    
    _cachedConfig: any;
    get _config(): any;
    get(dotPath: any, settings?: Partial<ISThemeGetSettings>): any;
    
    getOverridedConfig(): any;
    
    emitSavedEvent(): SThemeBase;
    
    hash(dotPath?: string): string;
    
    themesConfig(): ISThemesConfig;
    
    set(dotPath: string, value: any): SThemeBase;
    
    restore(configs: any): SThemeBase;
    
    clear(): SThemeBase;
    
    baseColors(): Record<string, ISThemeColor>;
    
    resolveFontSize(size: any): any;
    
    resolvePadding(size: any): any;
    
    resolveMargin(size: any): any;
    
    resolveBorderRadius(size: any): any;
    
    resolveBorderWidth(size: any): any;
    
    resolveColor(color: string, schema?: string, modifier?: string, settings?: Partial<ISThemeResolveColorSettings>): string;
    
    loopOnColors(callback: ISThemeLoopOnColorsCallback): Promise<boolean>;
}
