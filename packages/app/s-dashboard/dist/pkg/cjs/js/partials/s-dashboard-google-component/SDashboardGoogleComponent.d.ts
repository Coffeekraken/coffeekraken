import __SLitComponent from '@coffeekraken/s-lit-component';
import '../../../../../../src/js/partials/s-dashboard-google-component/s-dashboard-google-component.css';
export default class SDashboardGoogleComponent extends __SLitComponent {
    _gtm: string;
    _ga: string;
    
    get document(): Document;
    constructor();
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
