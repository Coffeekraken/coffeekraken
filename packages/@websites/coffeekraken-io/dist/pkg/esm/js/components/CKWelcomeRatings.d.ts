import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKWelcomeRatings extends __SLitComponent {
    static get properties(): any;
    _ratings: any;
    _loaded: boolean;
    constructor();
    mount(): Promise<void>;
    pickRandomRatings(): any;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
