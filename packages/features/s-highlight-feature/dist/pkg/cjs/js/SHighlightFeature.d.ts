import __SFeature from '@coffeekraken/s-feature';
import __define from './define';

export interface ISHighlightFeatureProps {
    type: 'light';
    size: number;
    intensity: number;
}
export default class SHighlightFeature extends __SFeature {
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): Promise<void>;
}
export { __define as define };
