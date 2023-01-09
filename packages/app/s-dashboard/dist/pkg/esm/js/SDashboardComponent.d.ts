import __SLitComponent from '@coffeekraken/s-lit-component';
export interface ISDashboardComponentProps {
}
export default class SDashboardComponent extends __SLitComponent {
    static get styles(): import("lit").CSSResult;
    
    get document(): Document;
    _pipedEvents: string[];
    _dashboardSettings: any;
    _dashboardConfig: any;
    constructor();
    
    _pipeEvents(): void;
    open(): void;
    close(): void;
    
    _listenShortcuts(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: Partial<ISDashboardComponentProps>, tagName?: string): void;
