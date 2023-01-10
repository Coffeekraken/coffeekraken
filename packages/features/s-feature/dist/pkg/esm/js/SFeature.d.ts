import __SClass from '@coffeekraken/s-class';
import type { ISComponentUtilsSettings } from '@coffeekraken/s-component-utils';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __SInterface from '@coffeekraken/s-interface';

export interface ISFeatureSettings extends ISComponentUtilsSettings {
    name: string;
    interface?: typeof __SInterface;
    defaultProps?: any;
}
export interface ISFeatureDefaultProps {
    id: string;
    mountWhen: 'directly' | 'inViewport';
}
export interface ISFeature {
    name: string;
    node: HTMLElement;
    props: any;
    componentUtils: __SComponentUtils;
}
export default class SFeature extends __SClass implements ISFeature {
    
    name: String;
    
    node: HTMLElement;
    
    props: any;
    componentUtils: __SComponentUtils;
    cu: __SComponentUtils;
    
    static setDefaultProps(selector: string | string[], props: any): void;
    
    static define(name: string, featureCls: typeof SFeature, defaultProps?: any): void;
    
    constructor(name: string, node: HTMLElement, settings?: Partial<ISFeatureSettings>);
}
