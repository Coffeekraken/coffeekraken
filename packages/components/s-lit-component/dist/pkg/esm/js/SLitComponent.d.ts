import type { ISComponentUtilsSettings } from '@coffeekraken/s-component-utils';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';
import { LitElement } from 'lit';
export declare function html(strings: any, ...values: any[]): import("lit-html").TemplateResult<1>;
export interface ISLitComponentSettings extends ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    rootNode?: HTMLElement;
    shadowDom?: boolean;
    defaultProps?: any;
    componentUtils: Partial<ISComponentUtilsSettings>;
}
export interface ISLitComponentDefineSettings {
    window: any;
}
export interface ISLitComponentDefaultProps {
    id: string;
    lnf: string;
    mountWhen: 'directly' | 'direct' | 'inViewport';
    adoptStyle: boolean;
    saveState: boolean;
}
export default class SLitComponent extends LitElement {
    static _keepInjectedCssBeforeStylesheetLinksInited: boolean;
    
    settings: {};
    
    props: any;
    componentUtils: __SComponentUtils;
    cu: __SComponentUtils;
    _shouldUpdate: boolean;
    _state: {};
    get state(): {};
    set state(state: {});
    
    static define(tagName: string, Cls: SLitComponent, props?: any, settings?: Partial<ISLitComponentDefineSettings>): void;
    
    static setDefaultProps(selector: string | string[], props: any): void;
    static propertiesFromInterface(properties: any, int: __SInterface): any;
    
    constructor(settings?: Partial<ISLitComponentSettings>);
    disconnectedCallback(): void;
    
    _mount(): Promise<boolean>;
}
