import __SLitComponent, { ISLitComponentDefaultProps } from '@coffeekraken/s-lit-component';
import __define from './define';

export interface ISScrollComponentProps extends ISLitComponentDefaultProps {
    to: 'top' | 'bottom' | string;
    duration: number;
    offset: number;
    offsetX: number;
    offsetY: number;
}
export default class SScrollComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    constructor();
    firstUpdated(): Promise<void>;
    _scrollTo(target: string): void;
    render(): import("lit-html").TemplateResult<1>;
}

export { __define as define };
