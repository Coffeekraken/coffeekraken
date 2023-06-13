import __SLitComponent from '@coffeekraken/s-lit-component';
import type { IScrollToSettings } from '@coffeekraken/sugar/dom';
import __define from './define';
export interface ISCodeExampleComponentProps {
    theme: string;
    active: string;
    toolbar: 'copy'[];
    toolbarPosition: 'content' | 'nav';
    lines: number;
    items: any[];
    moreLabel: string;
    lessLabel: string;
    moreAction: 'toggle' | string;
    more: boolean;
    scrollOnMore: boolean;
    scrollToSettings: Partial<IScrollToSettings>;
}

export default class SCodeExample extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    _$copy: any;
    _$root: any;
    _$pre: any;
    _$content: any;
    $copy: any;
    $templatesContainer: any;
    state: {
        activeTabId: any;
        more: boolean;
    };
    $templates: any;
    constructor();
    mount(): Promise<void>;
    firstUpdated(): Promise<boolean>;
    setActiveTabByTab(e: any): void;
    get currentItem(): any;
    setActiveTab(id: any): Promise<void>;
    setMoreClass(): Promise<void>;
    toggleMore(): void;
    highlight(id: any): void;
    copy(): void;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
