import __SLitComponent from '@coffeekraken/s-lit-component';
import __SCarpenterPage from './SCarpenterPage';
import __SCarpenterNodeAdapter from './SCarpenterNodeAdapter';
import __SCarpenterPageAdapter from './SCarpenterPageAdapter';
import __SCarpenterNode from './SCarpenterNode';
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
export interface ISCarpenterAdapter {
    node: __SCarpenterNodeAdapter;
    page: __SCarpenterPageAdapter;
}
export interface ISCarpenterAppComponentFeatures {
    save: boolean;
    upload: boolean;
    nav: boolean;
    media: boolean;
}
export interface ISCarpenterAppComponentCategory {
    title: string;
    description: string;
}
export interface ISCarpenterAppComponentAddComponent {
    uid: string;
    specs: string;
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
export interface ISCarpenterComponentEnpoints {
    base: string;
    specs: string;
    nodes: string;
    pages: string;
}
export interface ISCarpenterComponentProps {
    window: Window;
    features: ISCarpenterAppComponentFeatures;
    categories: Record<string, ISCarpenterAppComponentCategory>;
    adapter: 'ajax';
    data: ISCarpenterAppComponentData;
    viewportElm: HTMLElement;
    nav: boolean;
    endpoints: ISCarpenterComponentEnpoints;
    escape: boolean;
    pagesUrl: string;
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
    getData(): Promise<any>;
    setValues(values: any): Promise<HTMLElement>;
}
export default class SCarpenterAppComponent extends __SLitComponent {
    static get properties(): any;
    static get styles(): import("lit").CSSResult;
    static _registeredAdapters: Record<string, ISCarpenterAdapter>;
    static registerAdapter(id: string, adapter: ISCarpenterAdapter): void;
    static state: {
        activeNavigationFolders: any[];
        activeMedia: any;
        isLoading: boolean;
        loadingStack: {};
        mode: string;
    };
    currentSpecs: any;
    _currentNode: any;
    _preselectedNode: any;
    _page: __SCarpenterPage;
    _nodesStack: Record<string, __SCarpenterNode>;
    _data: ISCarpenterAppComponentData;
    _websiteWindow: any;
    _$websiteDocument: any;
    _$websiteIframe: any;
    _$websiteViewport: any;
    _$specsEditor: any;
    _$editor: any;
    _editorWindow: any;
    _$editorDocument: any;
    _$editorIframe: any;
    _$toolbar: any;
    _$carpenterComponent: any;
    _rootWindow: any;
    _$rootDocument: any;
    _isSpecsEditorValid: boolean;
    _scopes: any;
    _categories: any;
    _specs: any;
    _media: any;
    constructor();
    mount(): Promise<void>;
    
    _loadScopes(): Promise<void>;
    
    _loadSpecs(): Promise<void>;
    firstUpdated(): Promise<void>;
    
    _initWebsiteContainers(): void;
    
    _registerShortcuts($scope: Document): void;
    
    _initWebsiteIframeContent(): void;
    
    _updateCarpenterPage(): void;
    
    _updateCarpenterNodesStack(): void;
    
    _preventExternalLinksBehaviors(): void;
    
    _$uiPlaceholders: any;
    _updateUiPlaceholders(): void;
    
    _init(): Promise<void>;
    
    _cleanRootDocument(): void;
    
    _defineAddComponentFiltrableInput(): void;
    
    _setMode(mode: 'edit' | 'insert'): void;
    
    getElementFromDomNode($node: HTMLElement): __SCarpenterNode;
    
    _addComponent(specs: ISCarpenterAppComponentAddComponent): Promise<void>;
    applyComponent(values?: any): Promise<void>;
    
    _listenSpecsEditorEvents(): void;
    
    _watchHoverOnNodes(): void;
    
    _handleScrolledClassOnEditor(): void;
    
    isEditorOpen(): boolean;
    
    _openEditor(): void;
    
    _closeEditor(): void;
    
    _initToolbar(): HTMLElement;
    
    _listenToolbarActions(): void;
    
    _edit(uid?: string): Promise<void>;
    
    _setCurrentNode(uid: string): void;
    
    _setToolbarTitleAndPosition($from: HTMLElement, title?: string): void;
    
    getStatus(of: 'node' | 'page', uid: string): Promise<void>;
    
    _activateMedia(media: any): void;
    
    _setViewportSize(): void;
    
    _changePage(specs: string, pushState?: boolean): Promise<void>;
    _toggleNavigationFolder(folderId: any): void;
    
    _renderError(error: string): any;
    
    _renderScopeSelector(callback?: Function): any;
    
    _renderPageMetasForm(callback?: Function): any;
    
    _renderNodeMetasForm(callback?: Function): any;
    _createPage(pageMetas: any): Promise<any>;
    
    _askFor: any;
    _askErrors: Record<string, string>;
    _askData: any;
    _askCallback: any;
    _ask(what: 'scope' | 'pageMetas' | 'nodeMetas', initialData?: any): Promise<any>;
    
    newPage(): Promise<void>;
    
    _savePage(): Promise<void>;
    
    _getData(source: string | ISCarpenterAppComponentData): any;
    _carpenterLogo(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
export { __define as define };
