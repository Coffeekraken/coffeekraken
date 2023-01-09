import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISAssetPickerComponentProps {
}

export default class SAssetPickerComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    state: {
        status: string;
    };
    constructor();
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
