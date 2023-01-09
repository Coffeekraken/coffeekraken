import __SLitComponent from '@coffeekraken/s-lit-component';
import '../../../../../../src/js/partials/s-dashboard-frontend-checker-component/s-dashboard-frontend-checker-component.css';
import { ISFrontendCheckerCheckResult } from '@coffeekraken/s-frontend-checker';
export default class SDashboardFrontendCheckerComponent extends __SLitComponent {
    constructor();
    _checkResults: ISFrontendCheckerCheckResult[];
    _displayStatus: ('success' | 'warning' | 'error')[];
    _level: number;
    firstUpdated(): void;
    _chooseLevel(level: number): void;
    _toggleStatus(status: 'success' | 'warning' | 'error'): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
