import __SFeature from '@coffeekraken/s-feature';
import __define from './define';

export interface ISDepsFeatureProps {
    css: string;
    cssPartialsPath: string;
}
export interface ISDepsFeatureRegisterDepsObj {
    css: string;
}
export default class SDepsFeature extends __SFeature {
    static resolvedSelectors: string[];
    static registerDeps(selector: string, props?: Partial<ISDepsFeatureProps>): void;
    
    static _checkAndApplyReadyStateForElement($elm: any, props?: Partial<ISDepsFeatureProps>): void;
    
    static _handleCssDepsForElement($elm: HTMLElement, props?: Partial<ISDepsFeatureProps>): void;
    
    static _handleDepsForElement($elm: HTMLElement, props?: Partial<ISDepsFeatureProps>): void;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): Promise<void>;
}
export { __define as define };
