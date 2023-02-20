import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKDocSubNav extends __SLitComponent {
    static get properties(): any;
    constructor();
    _$items: HTMLElement[];
    firstUpdated(): Promise<void>;
    _grabItem(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
