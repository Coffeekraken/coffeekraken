import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CkSettings extends __SLitComponent {
    _front: any;
    static get properties(): any;
    static state: {};
    constructor();
    firstUpdated(): Promise<void>;
    mount(): Promise<void>;
    _setLod(level: number): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
