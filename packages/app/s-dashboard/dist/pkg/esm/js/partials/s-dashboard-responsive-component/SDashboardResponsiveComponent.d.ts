import __SLitComponent from '@coffeekraken/s-lit-component';
import '../../../../../../src/js/partials/s-dashboard-responsive-component/s-dashboard-responsive-component.css';
export default class SDashboardResponsiveComponent extends __SLitComponent {
    
    get document(): Document;
    _displayType: string;
    _mediaConfig: any;
    _theme: any;
    _activeQuery: any;
    constructor();
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
