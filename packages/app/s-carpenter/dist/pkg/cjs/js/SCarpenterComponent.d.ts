import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISCarpenterComponentIconsProp {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    folderOpen: string;
    folderClose: string;
}
export interface ISCarpenterComponentProps {
    src: string;
    specs: string;
    adapter: 'ajax';
    nav: boolean;
    pagesLink: string;
    iframe: boolean;
    logo: string;
    icons: ISCarpenterComponentIconsProp;
}

export default class SCarpenterComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    _data: any;
    _$document: any;
    _$iframe: any;
    _$toolbar: any;
    constructor();
    mount(): Promise<void>;
    render(): string;
}
export { __define as define };
