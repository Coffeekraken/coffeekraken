import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISClipboardCopyComponentProps {
    from: string;
    successTimeout: number;
    errorTimeout: number;
}

export default class SClipboardCopyComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    state: {
        state: string;
    };
    constructor();
    _copyFromTarget(): void;
    
    copy(text: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
