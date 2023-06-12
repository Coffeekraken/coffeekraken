import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CkSettings extends __SLitComponent {
    static get properties(): any;
    static state: {};
    _packages: any;
    constructor();
    mount(): Promise<void>;
    fetchMenu(): Promise<any>;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
