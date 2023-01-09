import __SFeature from '@coffeekraken/s-feature';
import __define from './define';

export interface ISAppearFeatureProps {
    in: string | 'fade' | 'top' | 'right' | 'bottom' | 'left';
    out: string | 'fade' | 'top' | 'right' | 'bottom' | 'left';
    delay: number[];
    duration: number[];
    distance: number[];
    appear: boolean;
}
export default class SAppearFeature extends __SFeature {
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): Promise<void>;
    appear(): void;
}
export { __define as define };
