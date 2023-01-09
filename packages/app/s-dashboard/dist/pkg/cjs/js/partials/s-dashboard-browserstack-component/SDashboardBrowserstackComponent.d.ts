import __SLitComponent from '@coffeekraken/s-lit-component';
import '../../../../../../src/js/partials/s-dashboard-browserstack-component/s-dashboard-browserstack-component.css';
export default class SDashboardBrowserstackComponent extends __SLitComponent {
    _maxVersions: number;
    _credentials: {
        username: string;
        password: string;
    };
    _browsers: any;
    _browserSvgs: {
        safari: any;
        'Mobile Safari': any;
        'Android Browser': any;
        'IE Mobile': any;
        edge: any;
        firefox: any;
        opera: any;
        chrome: any;
        yandex: any;
    };
    constructor();
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
