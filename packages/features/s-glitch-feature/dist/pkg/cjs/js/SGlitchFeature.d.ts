import __SFeature from '@coffeekraken/s-feature';
import __define from './define';

export interface ISGlitchFeatureProps {
    fps: number;
    minTimeout: number;
    maxTimeout: number;
    minDuration: number;
    maxDuration: number;
}
export default class SGlitchFeature extends __SFeature {
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): Promise<void>;
}
export { __define as define };
