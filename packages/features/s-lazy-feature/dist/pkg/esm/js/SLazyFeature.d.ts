import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import __define from './define';
export interface ISLazyFeatureProps {
}

export default class SLazyFeature extends __SFeature implements ISFeature {
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): Promise<void>;
}
export { __define as define };
