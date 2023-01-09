import __SLitComponent, { ISLitComponentDefaultProps } from '@coffeekraken/s-lit-component';

export interface ISRangeComponentValuesProp {
    name: string;
    value: any;
}
export interface ISRangeComponentProps extends ISLitComponentDefaultProps {
    name: string;
    value: string;
    values: ISRangeComponentValuesProp[];
    min: number;
    max: number;
    step: number;
    target: string;
    tooltip: boolean;
    disabled: boolean;
}
export default class SRangeComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    constructor();
    firstUpdated(): Promise<void>;
    _handleTarget(): void;
    _handleTooltip(): void;
    render(): import("lit-html").TemplateResult<1>;
}

export declare function define(props?: Partial<ISRangeComponentProps>, tagName?: string): void;
