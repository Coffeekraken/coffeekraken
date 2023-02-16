import __SFeature from '@coffeekraken/s-feature';
import type { IScrollToSettings } from '@coffeekraken/sugar/js/dom/scroll/scrollTo';
import __define from './define';
export interface ISRefocusFeatureProps {
    trigger: string[];
    scrollToSettings: Partial<IScrollToSettings>;
    timeout: number;
    duration: number;
    easing: Function;
    focusedClass: string | boolean;
    focusedClassDuration: number;
    offset: number;
    offsetX: number;
    offsetY: number;
    align: 'start' | 'center' | 'end';
    justify: 'start' | 'center' | 'end';
}

export default class SRefocusFeature extends __SFeature {
    _currentScrolledTargets: HTMLElement[];
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): void;
    _scrollTo($elm: any): Promise<void>;
}
export { __define as define };
