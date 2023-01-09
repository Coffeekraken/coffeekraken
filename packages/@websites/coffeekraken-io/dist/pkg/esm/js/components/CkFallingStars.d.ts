import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKFallingStars extends __SLitComponent {
    static get properties(): any;
    constructor();
    _starsCount: number;
    _maxCount: number;
    firstUpdated(): Promise<void>;
    new(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
