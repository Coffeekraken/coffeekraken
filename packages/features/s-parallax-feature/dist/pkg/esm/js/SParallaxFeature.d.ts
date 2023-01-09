import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import __define from './define';
export interface ISParallaxFeatureProps {
    amount: number;
}

export default class SParallaxFeature extends __SFeature implements ISFeature {
    _matrix: any;
    _originalTransform: any;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
    _setLayerTransform(percentage: any): void;
    _getPositionPercentages(e: any): {
        x: number;
        y: number;
    };
}
export { __define as define };
