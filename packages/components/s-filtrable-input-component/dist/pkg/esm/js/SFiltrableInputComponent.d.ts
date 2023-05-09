import __SLitComponent from '@coffeekraken/s-lit-component';
export interface ISFiltrableInputComponentProps {
    items: any[];
    value: string;
    label: string;
    showKeywords: boolean;
    emptyText: string;
    loadingText: string;
    searchValuePreprocess: Function;
    filterItems: Function;
    filtrable: string[];
    templates: Record<string, Function>;
    closeTimeout: number;
    interactive: boolean;
    closeOnSelect: boolean;
    resetOnSelect: boolean;
    notSelectable: boolean;
    maxItems: number;
    classes: Record<string, string>;
    inline: boolean;
}
export interface ISFiltrableInputState {
    displayedMaxItems: number;
    value: string;
    isLoading: boolean;
}

export default class SFiltrableInputComponent extends __SLitComponent {
    static get styles(): import("lit").CSSResult;
    static get properties(): any;
    static get state(): {
        displayedMaxItems: number;
        searchValue: string;
        items: any[];
    };
    $container: HTMLElement;
    $list: HTMLElement;
    $dropdown: HTMLElement;
    $input: HTMLInputElement;
    $form: HTMLFormElement;
    preselectedItems: any;
    selectedItems: any;
    filteredItems: any;
    _templatesFromHtml: any;
    _baseTemplates: any;
    _items: any;
    _isLoading: boolean;
    constructor();
    mount(): Promise<void>;
    firstUpdated(): Promise<void>;
    _grabTemplates(): void;
    _getTemplate(type: string): any;
    validate(): void;
    validateAndClose(): void;
    resetSelected(): void;
    reset(): void;
    close(): void;
    refreshItems(): Promise<void>;
    filterItems(needUpdate?: boolean): Promise<void>;
    preselectAndValidate(item: any): void;
    preselectValidateAndClose(item: any): void;
    _setPreselectedItem(item: any): void;
    _updateListSizeAndPosition(): void;
    
    _removeKeyword(keyword: string): void;
    render(): import("lit-html").TemplateResult<1>;
}

export declare function define(props?: Partial<ISFiltrableInputComponentProps>, tagName?: string): void;
