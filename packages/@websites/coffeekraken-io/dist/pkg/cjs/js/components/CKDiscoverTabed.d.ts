import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKDiscoverTabed extends __SLitComponent {
    static get properties(): any;
    constructor();
    _tabs: {
        id: string;
        title: string;
    }[];
    state: {
        activeTabId: string;
    };
    _$discover: any;
    firstUpdated(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
