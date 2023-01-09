import __SLitComponent from '@coffeekraken/s-lit-component';
export interface SPanelComponentProps {
    position: 'top' | 'left' | 'bottom' | 'right' | 'modal';
    active: boolean;
    backdrop: boolean;
    triggerer: string;
    closeOn: ('click' | 'escape')[];
}

export default class SPanelComponent extends __SLitComponent {
    static _activePanels: SPanelComponent[];
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    _$nodes: any;
    _$container: any;
    _containerTransitionProps: any;
    _$backdrop: any;
    _backdropTransitionProps: any;
    _template: any;
    constructor();
    mount(): Promise<void>;
    isTopPanel(): boolean;
    updated(changedProperties: any): void;
    firstUpdated(): void;
    open(): void;
    activate(): void;
    close(): void;
    unactivate(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: Partial<SPanelComponentProps>, tagName?: string): void;
