import __SLitComponent from '@coffeekraken/s-lit-component';
import '../../../../../../src/js/partials/s-dashboard-web-vitals-component/s-dashboard-web-vitals-component.css';
export default class SDashboardWebVitalsComponent extends __SLitComponent {
    _webVitals: any;
    
    get document(): Document;
    constructor();
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
