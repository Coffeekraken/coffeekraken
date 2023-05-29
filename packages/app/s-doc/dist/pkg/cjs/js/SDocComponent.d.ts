import __SLitComponent from '@coffeekraken/s-lit-component';
import __define from './define';
export interface ISDocComponentStatus {
    loading: boolean;
    fullscreen: boolean;
}
export interface ISDocComponentProps {
}

export default class SDocComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static get state(): {};
    _status: ISDocComponentStatus;
    _categories: any;
    _item: any;
    _searchValue: string;
    _$body: HTMLElement;
    _$searchInput: HTMLInputElement;
    _$placeholder: HTMLElement;
    constructor();
    mount(): Promise<void>;
    _firstCategory: any;
    firstUpdated(): Promise<void>;
    
    _registerShortcuts(): void;
    _loadItem(itemObj: any): Promise<void>;
    _loadItems(category: any, loadFirstItem?: boolean): Promise<void>;
    _search(value: string): void;
    _exitFullscreen(): void;
    _enterFullscreen(): void;
    _toggleFullscreen(): void;
    _renderItems(items: any): any;
    _renderItemDefault(itemObj: any): any;
    _renderItemMetas(itemObj: any): any;
    _renderItemConfig(configObj: any): any;
    _renderItem(itemObj: any): any;
    _renderCategories(categories: any): any;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
