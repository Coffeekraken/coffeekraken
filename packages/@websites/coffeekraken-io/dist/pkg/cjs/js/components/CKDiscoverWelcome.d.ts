import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKDiscoverWelcome extends __SLitComponent {
    static get properties(): any;
    constructor();
    _docmap: any;
    item: any;
    timeout: any;
    firstUpdated(): Promise<void>;
    grabItem(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
