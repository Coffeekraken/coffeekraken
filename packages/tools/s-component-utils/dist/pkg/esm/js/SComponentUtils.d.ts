import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';
export interface ISComponentUtilsSettings {
    name: string;
    interface?: typeof __SInterface;
    style: string;
    state: ISComponentUtilsStateSettings;
    defaultProps?: any;
    prefixEvent: boolean;
    useTagNameForClassName: boolean;
}
export interface ISComponentUtilsStateSettings {
    save: boolean;
    id: string;
}
export interface ISComponentUtilsPropsSettings {
    interface: typeof __SInterface;
    reflectAttributes: boolean;
}
export interface ISComponentUtilsDispatchSettings {
    $elm: HTMLElement;
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
}
export interface ISComponentUtilsDefaultProps {
    id: string;
    mounted: boolean;
    mountWhen: 'directly' | 'direct' | 'inViewport' | 'nearViewport' | 'interact';
    activeWhen: 'inViewport' | 'lod';
    mountDelay: number;
    adoptStyle: boolean;
    responsive: any;
    verbose: boolean;
}
export default class SComponentUtils extends __SClass {
    
    static fastdom: {
        mutate: Function;
        measure: Function;
    };
    
    _props: any;
    get props(): any;
    
    static _isResponsivePropsWarningLogged: boolean;
    
    node: HTMLElement;
    
    fastdom: {
        mutate: Function;
        measure: Function;
    };
    
    get name(): string;
    
    state: string;
    DefaultPropsInterface: __SInterface;
    
    static _defaultProps: any;
    static setDefaultProps(selector: string | string[], props: any): void;
    
    static getDefaultProps(selector: string): any;
    
    get componentUtilsSettings(): ISComponentUtilsSettings;
    _whenMountPromise: any;
    _whenMountedPromise: any;
    _isInViewport: boolean;
    
    constructor(node: HTMLElement, settings?: Partial<ISComponentUtilsSettings>);
    
    setProps(props: any): void;
    
    initProps(props: any, settings: ISComponentUtilsPropsSettings): any;
    
    private _isThemeAvailable;
    
    private _isFrontAvailable;
    
    private _isFrontspecAvailable;
    
    handleProps(props: any, settings?: Partial<ISComponentUtilsPropsSettings>): void;
    
    handleState(state: any, settings?: Partial<ISComponentUtilsStateSettings>): void;
    
    makePropsResponsive(props: any): void;
    _mediaQueries: {};
    _applyResponsiveProps(props?: any): void;
    
    waitAndExecute(when: string | string[], callback: Function): Promise<any>;
    
    dispatchEvent(eventName: string, settings?: Partial<ISComponentUtilsDispatchSettings>): void;
    
    adoptStyleInShadowRoot($shadowRoot: HTMLElement, $context: HTMLElement | typeof document): Promise<any>;
    
    _defaultProps: any;
    defaultProps(interf?: typeof __SInterface): any;
    
    _PropsInterface: any;
    PropsInterface(interf?: typeof __SInterface): any;
    static _injectedStyles: string[];
    injectStyle(css: any, id?: any): void;
    
    exposeApi(apiObj: any, ctx?: any): void;
    
    cls(cls?: string, style?: string): string;
    
    uCls(cls?: string, style?: string): string;
    
    isMounted(): boolean;
    
    isInViewport(): boolean;
    
    isActive(): boolean;
}
