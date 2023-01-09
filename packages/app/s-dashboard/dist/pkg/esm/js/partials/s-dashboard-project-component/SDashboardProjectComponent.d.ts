import __SLitComponent from '@coffeekraken/s-lit-component';
import '../../../../../../src/js/partials/s-dashboard-project-component/s-dashboard-project-component.css';
export default class SDashboardProjectComponent extends __SLitComponent {
    
    get document(): Document;
    _project: any;
    _activeEnvironmentId: any;
    _activeEnvironment: any;
    constructor();
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
