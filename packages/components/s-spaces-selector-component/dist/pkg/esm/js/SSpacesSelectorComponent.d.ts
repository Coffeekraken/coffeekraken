import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISSpacesSelectorComponentProps {
}

export default class SSpacesSelectorComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static get state(): {};
    _spacesNames: string[];
    constructor();
    firstUpdated(): void;
    clear(): void;
    _updateSelect(e: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
