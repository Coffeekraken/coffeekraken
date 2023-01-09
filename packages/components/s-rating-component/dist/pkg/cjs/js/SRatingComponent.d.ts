import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISRatingComponentProps {
    min: number;
    max: number;
    icon: string;
    iconClass: string;
    readonly: boolean;
}

export default class SRatingComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    state: {
        value: number;
    };
    constructor();
    mount(): void;
    _setRating(rating: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
