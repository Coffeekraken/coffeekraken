import __SFeature from '@coffeekraken/s-feature';
import __define from './define';
export interface ISPageTransitionFeatureState {
    html: string;
    containerId: string;
}
export interface ISPageTransitionFeatureBefore {
    (api: {
        url: string;
        $source: HTMLElement;
    }): void;
}
export interface ISPageTransitionFeatureAfter {
    (api: {
        code: number;
        url: string;
        newState: ISPageTransitionFeatureState;
        $source: HTMLElement;
    }): void;
}
export interface ISPageTransitionFeatureProps {
    patchBody: boolean;
    scroll: boolean;
    before: ISPageTransitionFeatureBefore;
    after: ISPageTransitionFeatureAfter;
    onError: Function;
    autoStyle: boolean;
    injectErrorIcon: boolean;
    brokenLinkIcon: string;
}

export default class SPageTransitionFeature extends __SFeature {
    
    _currentUrl: string;
    
    _currentState: ISPageTransitionFeatureState;
    
    _currentRequestedUrl: string;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
    _isEligibleLink($link: HTMLElement): boolean;
    transitionTo(url: string, $source: any): Promise<void>;
    
    _applyLoadingState($source?: HTMLElement): void;
    
    _removeLoadingState($source?: HTMLElement): void;
    
    _onAfter($source: HTMLElement, code: number, url?: string, newState?: Partial<ISPageTransitionFeatureState>): void;
}
export { __define as define };
