import __SFeature from '@coffeekraken/s-feature';
import __define from './define';

export interface ISFloatingFeatureProps {
}
export default class SFloatingFeature extends __SFeature {
    _$ref: any;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
}
export { __define as define };
