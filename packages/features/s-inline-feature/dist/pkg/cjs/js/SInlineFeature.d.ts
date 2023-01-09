import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import __define from './define';
import '../../../../src/css/s-inline-feature.css';
export interface IInlineFeatureProps {
}

export default class SInlineFeature extends __SFeature implements ISFeature {
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
    
    _inlineImg(src: any): Promise<void>;
}
export { __define as define };
