import __SLitComponent from '@coffeekraken/s-lit-component';
export default class DocNav extends __SLitComponent {
    maxItems: number;
    _maxItemsToDisplay: number;
    _filteredItems: {};
    _docmap: {};
    _saved: {
        search: string;
        platforms: any[];
        types: any[];
        statuses: any[];
    };
    _striptags: any;
    constructor();
    get availablePlatforms(): any[];
    get availableTypes(): any[];
    get availableStatuses(): any[];
    _displayItemsCount: number;
    _filterItems(settings?: {}): void;
    _searchTimeout: number;
    _search(e: any): void;
    _togglePlatform(platform: any): void;
    _toggleType(type: any): void;
    _toggleStatus(status: any): void;
    _restoreState(): Promise<void>;
    _renderExampleTimeout: any;
    _renderExample: boolean;
    render(): import("lit-html").TemplateResult<1>;
}
export declare function define(props?: any, tagName?: string): void;
