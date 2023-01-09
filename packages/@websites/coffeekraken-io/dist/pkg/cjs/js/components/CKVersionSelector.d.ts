import __SLitComponent from '@coffeekraken/s-lit-component';
export default class CKVersionSelector extends __SLitComponent {
    static get properties(): any;
    static state: {
        lastViewedVersion: any;
    };
    _versions: any;
    _currentVersion: any;
    _currentVersionObj: any;
    _lastViewedVersion: any;
    constructor();
    firstUpdated(): Promise<void>;
    mount(): Promise<void>;
    isNewVersion(): boolean;
    render(): any;
}
export declare function define(props?: any, tagName?: string): void;
