import __SLitComponent from '@coffeekraken/s-lit-component';
import type { ISSpecsEditorComponentSource } from '@coffeekraken/s-specs-editor-component';
import __define from './defineApp';
export interface ISCarpenterAppComponentIconsProp {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
    folderOpen: string;
    folderClose: string;
}
export interface ISCarpenterAppComponentFeatures {
    save: boolean;
    upload: boolean;
    nav: boolean;
    media: boolean;
}
export interface ISCarpenterAppComponentAddComponent {
    namespace: string;
    $after: HTMLElement;
}
export interface ISCarpenterAppComponentData {
    uid: string;
    values?: any;
    currentSpecs: any;
    specs: any;
    source?: ISSpecsEditorComponentSource;
    specsByTypes: Record<string, any>;
}
export interface ISCarpenterComponentProps {
    window: Window;
    features: ISCarpenterAppComponentFeatures;
    adapter: 'ajax';
    data: ISCarpenterAppComponentData;
    viewportElm: HTMLElement;
    nav: boolean;
    savePageUrl: string;
    escape: boolean;
    pagesLink: string;
    iframe: boolean;
    frontspec: any;
    ghostSpecs: boolean;
    logo: string;
    icons: ISCarpenterAppComponentIconsProp;
}

export interface ISCarpenterComponentAdapterParams {
    $elm?: HTMLElement;
    dotpath?: string;
    values: any;
    component: SCarpenterAppComponent;
}
export interface ISCarpenterComponentAdapter {
    getData($elm: HTMLElement): Promise<any>;
    setValues(params: ISCarpenterComponentAdapterParams): Promise<HTMLElement>;
    change(params: ISCarpenterComponentAdapterParams): Promise<HTMLElement>;
}
export default class SCarpenterAppComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static _registeredAdapters: Record<string, ISCarpenterComponentAdapter>;
    static registerAdapter(id: string, adapter: ISCarpenterComponentAdapter): void;
    static state: {
        activeNavigationFolders: any[];
        activeMedia: any;
        isLoading: boolean;
        loadingStack: {};
        mode: string;
    };
    currentSpecs: any;
    _$currentElm: any;
    _$preselectedElm: any;
    _data: ISCarpenterAppComponentData;
    _websiteWindow: any;
    _$websiteDocument: any;
    _$websiteIframe: any;
    _$websiteViewport: any;
    _$editor: any;
    _editorWindow: any;
    _$editorDocument: any;
    _$editorIframe: any;
    _$toolbar: any;
    _$carpenterComponent: any;
    _rootWindow: any;
    _$rootDocument: any;
    _addingNew: boolean;
    _isSpecsEditorValid: boolean;
    constructor();
    mount(): Promise<void>;
    firstUpdated(): Promise<void>;
    
    _initWebsiteContainers(): void;
    
    _registerShortcuts($scope: Document): void;
    
    _initWebsiteIframeContent(): void;
    
    _preventExternalLinksBehaviors(): void;
    
    _$uiPlaceholders: any;
    _updateUiPlaceholders(): void;
    
    _init(): Promise<void>;
    
    _cleanRootDocument(): void;
    
    _defineAddComponentFiltrableInput(): void;
    
    _setMode(mode: 'edit' | 'insert'): void;
    
    _addComponent(specs: ISCarpenterAppComponentAddComponent): Promise<void>;
    applyComponent(values?: any): Promise<void>;
    
    _listenSpecsEditorEvents(): void;
    
    _watchHoverOnSpecElements(): void;
    
    _handleScrolledClassOnEditor(): void;
    
    isEditorOpen(): boolean;
    
    _openEditor(): void;
    
    _closeEditor(): void;
    
    _initToolbar(): HTMLElement;
    
    _listenToolbarActions(): void;
    
    _edit($elm?: HTMLElement): Promise<void>;
    
    _setCurrentElement($elm: HTMLElement): void;
    
    _setToolbarPosition($from: any): void;
    
    _activateMedia(media: any): void;
    
    _setViewportSize(): void;
    
    _changePage(dotpath: string, pushState?: boolean): Promise<void>;
    _toggleNavigationFolder(folderId: any): void;
    
    _savePage(): Promise<void>;
    
    _saveComponent(data: any): Promise<void>;
    
    _getData(source: string | ISCarpenterAppComponentData): any;
    _carpenterLogo(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
