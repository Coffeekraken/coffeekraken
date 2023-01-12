import __SFeature from '@coffeekraken/s-feature';
import __define from './define';
export interface ISPageTransitionFeatureProps {
    patchBody: boolean;
    scrollTop: boolean;
    before: Function;
    after: Function;
    onError: Function;
    autoStyle: boolean;
    injectErrorIcon: boolean;
    brokenLinkIcon: string;
}

export default class SPageTransitionFeature extends __SFeature {
    
    _currentUrl: string;
    
    _currentRequestedUrl: string;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
    _isEligibleLink($link: HTMLElement): boolean;
    transitionTo(url: string, $source: any): Promise<void>;
    
    _onAfter($source: HTMLElement, code: number, url?: string, newState?: any): void;
}
export { __define as define };
