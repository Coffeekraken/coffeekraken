import type { ISFeature } from '@coffeekraken/s-feature';
import __SFeature from '@coffeekraken/s-feature';
import __define from './define';
export interface ISSugarFeatureProps {
    scrolled: boolean;
    scrolledDelta: number;
    vhvar: boolean;
    viewportEvents: boolean;
    inputAdditionalAttributes: boolean;
    autoResize: boolean;
    linksStateAttributes: boolean;
    preventScrollRestoration: boolean;
    containerQuery: boolean;
    pleasantCss: boolean;
    env: boolean;
}
export default class SSugarFeature extends __SFeature implements ISFeature {
    _matrix: any;
    _originalTransform: any;
    constructor(name: string, node: HTMLElement, settings: any);
    mount(): Promise<void>;
    _clearTransmationsOnResizeTimeout: any;
    _isResizing: boolean;
    _clearTransmationsOnResize(): void;
    _pleasantCss(): void;
    _viewportAware(): void;
    _autofocus(): void;
    _scrolled(): void;
    _vhvar(): void;
    _autoResize(): void;
    _confirmBtn(): void;
}
export { __define as define };
