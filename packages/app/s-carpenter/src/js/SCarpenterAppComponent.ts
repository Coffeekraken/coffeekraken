import __SLitComponent from '@coffeekraken/s-lit-component';

import __SCarpenterPage from './SCarpenterPage';

import __SCarpenterNodeAdapter from './SCarpenterNodeAdapter';
import __SCarpenterPageAdapter from './SCarpenterPageAdapter';
import __SCarpenterNodeAjaxAdapter from './adapters/SCarpenterNodeAjaxAdapter';
import __SCarpenterPageAjaxAdapter from './adapters/SCarpenterPageAjaxAdapter';

import { __debounce } from '@coffeekraken/sugar/function';

import { __escapeQueue } from '@coffeekraken/sugar/keyboard';

import { __whenRemoved } from '@coffeekraken/sugar/dom';

import { __idCompliant, __urlCompliant } from '@coffeekraken/sugar/string';

import __SFrontspec from '@coffeekraken/s-frontspec';

import __SCarpenterNode from './SCarpenterNode';

import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';
import { define as __sSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';

import { __wait } from '@coffeekraken/sugar/datetime';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge, __filterObject } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';

import {
    __injectStyle,
    __querySelectorLive,
    __traverseUp,
    __whenIframeReady,
} from '@coffeekraken/sugar/dom';

import __SSugarConfig from '@coffeekraken/s-sugar-config';

import type { ISSpecsEditorComponentSource } from '@coffeekraken/s-specs-editor-component';

import __define from './defineApp';

import { __injectIframeContent } from '@coffeekraken/sugar/dom';

// @ts-ignore
import __indexCss from '../css/index.css';
import __websiteUiCss from '../css/s-carpenter-app-website-ui.css';

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

// define components/features
document.body.setAttribute('s-sugar', 'true');
__sSugarFeatureDefine();

/**
 * @name                SCarpenterAppComponent
 * @as                  Carpenter
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SCarpenterComponentInterface.ts
 * @platform            html
 * @status              beta
 *
 * This component represent a carpenter UI that display some components/section/etc... and let you change their properties
 * on the fly to see how it behave
 *
 * @todo               documentation
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-carpenter
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

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
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            __SCarpenterComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__indexCss)}
        `;
    }

    static _registeredAdapters: Record<string, ISCarpenterAdapter> = {
        ajax: {
            node: __SCarpenterNodeAjaxAdapter,
            page: __SCarpenterPageAjaxAdapter,
        },
    };
    static registerAdapter(id: string, adapter: ISCarpenterAdapter): void {
        if (SCarpenterAppComponent._registeredAdapters[id]) {
            throw new Error(
                `[SCarpenter] Sorry but the "${id}" adapter already exists...`,
            );
        }
        SCarpenterAppComponent._registeredAdapters[id] = adapter;
    }

    static state = {
        activeNavigationFolders: [],
        activeMedia: null,
        isLoading: true,
        loadingStack: {},
        mode: 'edit',
    };

    currentSpecs = null;

    _currentNode;
    _preselectedNode;

    _page: __SCarpenterPage;
    _nodesStack: Record<string, __SCarpenterNode>;

    _data: ISCarpenterAppComponentData;
    // _cachedData: Record<string, ISCarpenterAppComponentData> = {};

    _websiteWindow;
    _$websiteDocument; // store the document
    _$websiteIframe; // store the website iframe if the "media" method stored in the frontspec.json file is not set to "container". In this case, we must wrap the website into a proper iframe for the @media queries to work
    _$websiteViewport; // store the viewport element in the website that will be used to resize it with media

    _$specsEditor; // store the s-specs-editor component

    _$editor; // store the actual editor "panel"
    _editorWindow;
    _$editorDocument;
    _$editorIframe; // store the iframe in which the carpenter is inited if is one
    _$toolbar; // store the toolbar displayed on the website elements when hovering them

    _$carpenterComponent; // store the reference to the "s-carpenter" component in the initial page

    _rootWindow;
    _$rootDocument;

    _isSpecsEditorValid = true;

    _scopes;
    _categories;
    _specs;
    _media;

    constructor() {
        super(
            __deepMerge({
                name: 's-carpenter-app',
                interface: __SCarpenterComponentInterface,
                carpenter: __SSugarConfig.get('carpenter'),
            }),
        );
        this._$editorIframe = window.top?.document?.querySelector(
            'iframe.s-carpenter_editor-iframe',
        );
        this._editorWindow = window;
        this._$editorDocument = document;

        const frontspec = new __SFrontspec();
        this._media = frontspec.get('media');

        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }

    async mount() {
        // define the s-specs-editor component
        __sSpecsEditorComponentDefine({
            features: {
                delete: this.props.features.delete,
                upload: this.props.features.upload,
                save: this.props.features.saveComponent,
                media: this.props.features.media,
            },
        });

        // if the "scopes" feature is enabled
        if (this.props.features.scopes) {
            await this._loadScopes();
        }

        // "categories"
        await this._loadCategories();

        // Specs (all the specs)
        await this._loadSpecs();

        // active the default media if not set
        if (!this.state.activeMedia) {
            this.state.activeMedia = this.props.frontspec?.media?.defaultMedia;
        }

        // check the specified adapter
        if (!SCarpenterAppComponent._registeredAdapters[this.props.adapter]) {
            throw new Error(
                `[SCarpenterAppComponent] Sorry but the specified "${this.props.adapter}" is not registered...`,
            );
        }

        // set the root document and window
        this._$rootDocument = this.props.window.document;
        this._rootWindow = this.props.window;

        // set the document in which to search for items (s-specs) etc...
        this._$websiteDocument = this.props.window.document;
        this._websiteWindow = this.props.window;

        // get the initial carpenter component
        this._$carpenterComponent =
            this._$rootDocument.querySelector('s-carpenter');
    }

    /**
     * Load the scopes
     */
    async _loadScopes(): Promise<void> {
        const response = await fetch(
            this.props.endpoints.scopes.replace(
                '%base',
                this.props.endpoints.base,
            ),
            {
                method: 'GET',
            },
        );
        const scopes = await response.json();
        this._scopes = scopes;
    }

    /**
     * Load the scopes
     */
    async _loadSpecs(): Promise<void> {
        const response = await fetch(
            this.props.endpoints.specs
                .replace('%base', this.props.endpoints.base)
                .replace('/%specs', ''),
            {
                method: 'GET',
            },
        );
        const specs = await response.json();
        this._specs = specs;
    }

    /**
     * Load the categories
     */
    async _loadCategories(): Promise<void> {
        const response = await fetch(
            this.props.endpoints.categories.replace(
                '%base',
                this.props.endpoints.base,
            ),
            {
                method: 'GET',
            },
        );
        const categories = await response.json();
        this._categories = categories;
    }

    async firstUpdated() {
        await __wait(1000);

        // getting the editor element
        this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
        if (!this._$editor) {
            throw new Error(
                `<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls(
                    '_editor',
                )}" element found...`,
            );
        }

        // handle media method
        await this._init();

        // listen for escape key press to close editor
        if (this.props.escape) {
            __hotkey('escape').on('press', () => {
                this._closeEditor();
            });
        }

        // register shortcuts in the editor iframe
        this._registerShortcuts(this._$editorDocument);

        // listen spec editor events like save, change, etc...
        this._listenSpecsEditorEvents();

        // handle popstate
        this._websiteWindow.addEventListener('popstate', (e) => {
            this._changePage(e.state.dotpath, false);
        });

        // handle "scrolled" class on the editor
        this._handleScrolledClassOnEditor();

        await __wait(2000);

        // Create UI placeholders
        this._updateUiPlaceholders();

        // remove the "scrolling='no'" attribute on website iframe
        this._$websiteIframe.removeAttribute('scrolling');

        // init the "container" feature to add new content into them
        this._initWebsiteContainers();

        // reset the activate media
        this.state.activeMedia && this._activateMedia(this.state.activeMedia);

        // emit the "s-carpenter-app.ready" event in the root document
        this._$rootDocument.dispatchEvent(
            new CustomEvent('s-carpenter-app.ready', {
                bubbles: true,
                detail: this,
            }),
        );
    }

    /**
     * Init the containers marked by a "s-container" attribute
     * to allow adding new content into the page
     */
    _initWebsiteContainers(): void {
        __querySelectorLive(
            '[s-container]',
            ($elm) => {
                const $container = document.createElement('div');
                $container.classList.add(this.utils.cls('_website-container'));

                const $toolbar = document.createElement('div');
                $toolbar.setAttribute('s-carpenter-website-ui', 'true');
                $toolbar.classList.add(
                    this.utils.cls('_website-container-toolbar'),
                );

                const $addFiltrableInputContainer =
                    document.createElement('label');
                $addFiltrableInputContainer.innerHTML = `
                    <s-carpenter-app-add-component>
                        <div class="_group">
                            <span class="_icon">${
                                this.props.icons.component
                            }</span>
                            <input type="text" id="s-carpenter-app-add-component" placeholder="${
                                this.props.i18n.addComponent
                            }" class="${this.utils.cls(
                    '_add-component-input',
                )}" />
                        </div>
                    </s-carpenter-app-add-component>`;

                $toolbar.appendChild($addFiltrableInputContainer);
                $container.appendChild($toolbar);
                $elm.appendChild($container);

                $elm._sCarpenterContainer = $container;
            },
            {
                rootNode: this._$websiteDocument,
            },
        );

        __querySelectorLive(
            `[s-container] > *:not(.${this.utils.cls('_website-container')})`,
            ($child) => {
                const $container = $child.parentNode;
                if (!$container._sCarpenterContainer) {
                    return;
                }

                let timeout;
                $child.addEventListener('pointerover', (e) => {
                    if ($container._$current === $child) {
                        return;
                    }
                    $container._$current = $child;

                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        $child.after($container._sCarpenterContainer);
                    }, 300);
                });
            },
            {
                rootNode: this._$websiteDocument,
            },
        );
    }

    /**
     * Reguster keyboard shortcuts in a particular "scope".
     * The "scope" is the different document like the _$websiteDocument,
     * _$rootDocument, etc...
     */
    _registerShortcuts($scope: Document): void {
        // "§" key to hide the editor
        $scope.addEventListener('keydown', (e) => {
            if (e.key === '§') {
                this._$editorDocument?.body?.classList.add(
                    's-carpenter--preview',
                );
            }
        });
        $scope.addEventListener('keyup', (e) => {
            if (e.key === '§') {
                this._$editorDocument?.body?.classList.remove(
                    's-carpenter--preview',
                );
            }
        });

        // "ctrl+m" to change mode
        $scope.addEventListener('keyup', (e) => {
            if (e.key === 'i' && e.ctrlKey) {
                this._setMode(this.state.mode === 'insert' ? 'edit' : 'insert');
            }
        });
    }

    /**
     * Init the interactivity things on the iframed website.
     * This contains things like the toolbar, the hover to display it, etc...
     */
    _initWebsiteIframeContent() {
        // create page from html
        this._updateCarpenterPage();

        // update the element stack
        this._updateCarpenterNodesStack();

        // inject the scrollbat styling
        __injectStyle(
            `
            body::-webkit-scrollbar {
                width: 2px;
                height: 2px;
            }
            body::-webkit-scrollbar-track {                
                background-color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0)) * 1%),0.1);                                        
            }
            body::-webkit-scrollbar-thumb {
                background-color: hsla(calc(var(--s-theme-color-accent-h, 0) + var(--s-theme-color-accent-spin ,0)),calc((var(--s-theme-color-accent-s, 0)) * 1%),calc((var(--s-theme-color-accent-l, 0)) * 1%),var(--s-theme-color-accent-a, 1));            
            }
            .s-wireframe body::-webkit-scrollbar-track{
                background-color: rgba(0,0,0,0.05);
            }  
            ${__websiteUiCss}  
        `,
            {
                rootNode: this._$websiteDocument.body,
            },
        );

        // create the toolbar element
        this._initToolbar();

        // listen for toolbar actions
        this._listenToolbarActions();

        // watch for hover on carpenter elements
        this._watchHoverOnNodes();

        // prevent default links behaviors
        this._preventExternalLinksBehaviors();

        // listen for click on links in the iframe to close the editor
        this._$websiteDocument.addEventListener('click', (e) => {
            let $link = e.target;
            if (e.target.tagName !== 'A') {
                $link = __traverseUp(
                    e.target,
                    ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'),
                );
            }

            if (!$link) {
                return;
            }

            if (
                $link.hasAttribute('target') &&
                $link.getAttribute('target') === '_blank'
            ) {
                return;
            }

            // close the editor
            this._closeEditor();
        });

        if (this.props.escape) {
            __hotkey('escape', {
                // from the website itself
                element: this._$websiteDocument,
            }).on('press', () => {
                this._closeEditor();
            });
        }

        // mode
        this._setMode(this.state.mode);
    }

    /**
     * Update the current page from the website HTML
     */
    _updateCarpenterPage(): void {
        // get the page
        const $page = this._$websiteDocument.querySelector('[s-page]');

        // if a page has been found, create a new instance of it
        if ($page) {
            this._page = new __SCarpenterPage($page, this);
            this.requestUpdate();
        }
    }

    /**
     * Update the element stack
     */
    _updateCarpenterNodesStack(): void {
        // reset stack
        this._nodesStack = {};

        // search for elements
        const $nodes =
            this._$websiteDocument.querySelectorAll('[s-node][s-specs]');

        // assign each element in the stack
        Array.from($nodes).forEach(($node) => {
            const $elm = $node.parentNode;
            const uid = $node.getAttribute('s-node');
            if ($elm._sCarpenterNode) {
                this._nodesStack[uid] = $elm._sCarpenterNode;
                return;
            }
            $elm._sCarpenterNode = new __SCarpenterNode($node, this);
            this._nodesStack[uid] = $elm._sCarpenterNode;
        });
    }

    /**
     * Prevent external links in the website iframe
     */
    _preventExternalLinksBehaviors() {
        __querySelectorLive(
            'a[href]:not([target="_blank"])',
            ($link) => {
                $link.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                });
            },
            {
                rootNode: this._$websiteDocument,
            },
        );
    }

    /**
     * Create some "placeholders" of the editor UI to inject them into the actual website.
     * This is used to detect when the user is overing an actual UI and remove the "pointer-events: none"
     * on the editor iframe
     * If someone has a better idea.... :)
     */
    _$uiPlaceholders;
    _updateUiPlaceholders() {
        if (!this._$uiPlaceholders) {
            this._$uiPlaceholders = document.createElement('div');
            this._$uiPlaceholders.classList.add(
                's-carpenter_ui-placeholders',
                'active',
            );
            let outTimeout,
                isActive = false;
            this._$uiPlaceholders.addEventListener('pointerover', (e) => {
                if (isActive) return;
                isActive = true;
                clearTimeout(outTimeout);
                this._$editorIframe.classList.add('active');
                this._$uiPlaceholders.classList.remove('active');
            });

            this._$editorDocument
                .querySelector('.s-carpenter_editor-bkg')
                .addEventListener('pointerover', (e) => {
                    if (!isActive) return;
                    isActive = false;
                    this._$editorIframe.classList.remove('active');
                    this._$uiPlaceholders.classList.add('active');
                });
        }

        const $uis = this.querySelectorAll('[s-carpenter-ui]');
        Array.from($uis).forEach(($ui) => {
            // create if needed
            if (!$ui._placeholder) {
                $ui._placeholder = document.createElement('div');
                $ui._placeholder.classList.add('s-carpenter_ui-placeholder');
                this._$uiPlaceholders.appendChild($ui._placeholder);
                __whenRemoved($ui).then(() => {
                    $ui._placeholder?.remove?.();
                });
            }

            // set position
            const uiBounds = $ui.getBoundingClientRect();
            $ui._placeholder.style.top = `${uiBounds.top}px`;
            $ui._placeholder.style.left = `${uiBounds.left}px`;
            $ui._placeholder.style.width = `${uiBounds.width}px`;
            $ui._placeholder.style.height = `${uiBounds.height}px`;
        });

        // add the placeholders into the website
        if (!this._$uiPlaceholders.parent) {
            window.top.document.body.appendChild(this._$uiPlaceholders);
        }
    }

    /**
     * Handle media method.
     * Media is the media queries and his method is either "container" (@container queries), or "media" (plain old media queries).
     * It the method is "media", we need to wrap the website into an iframe to make the responsive preview work fine.
     */
    _init(): Promise<void> {
        return new Promise(async (resolve) => {
            // create the wrapping iframe or get it from the content directly
            this._$websiteIframe = document.createElement('iframe');
            this._$websiteIframe.classList.add('s-carpenter_website-iframe');
            this._$websiteIframe.setAttribute('src', 'about:blank');
            this._$websiteIframe.setAttribute('scrolling', 'no');
            this._$websiteIframe.style.opacity = 0;

            // set the website viewport to be able to resize it using the media controls
            this._$websiteViewport = this._$websiteIframe;

            // get the actual page html to inject into the iframe
            const html = this._$websiteDocument.documentElement.innerHTML;
            const parser = new DOMParser();
            const $html = parser.parseFromString(html, 'text/html');

            // remove initial carpenter component
            $html.querySelector('s-carpenter')?.remove?.();
            $html.querySelector('.s-carpenter_editor-iframe')?.remove?.();

            // prepend the website iframe in the body
            this._$websiteDocument.body.prepend(this._$websiteIframe);

            // wait until the iframe is ready
            await __whenIframeReady(this._$websiteIframe);

            // injecting the whole website into the iframe
            __injectIframeContent(
                this._$websiteIframe,
                $html.documentElement.innerHTML,
            );

            // listen when the iframe is loaded to init correctly the
            // carpenter stuffs like _websiteWindow, _$websiteDocument, etc...
            this._$websiteIframe.addEventListener('load', async (e) => {
                // clean the root document body
                this._cleanRootDocument();

                // reset the loading state
                this.state.loadingStack = {};
                this.state.isLoading = false;

                // reset the toolbar
                this._$toolbar = null;

                // reset state
                this._preselectedNode = null;

                // wait until iframe is ready
                await __whenIframeReady(this._$websiteIframe);

                // reset the _window and _$websiteDocument references
                this._websiteWindow = this._$websiteIframe.contentWindow;
                this._$websiteDocument =
                    this._$websiteIframe.contentWindow.document;

                // define the filtrable input for the add component
                this._defineAddComponentFiltrableInput();

                // remove the "s-carpenter" in the iframe
                this._$websiteDocument.querySelector('s-carpenter')?.remove?.();

                // register shortcuts in the website iframe
                this._registerShortcuts(this._$websiteDocument);

                // init the interactivity in the website iframe
                this._initWebsiteIframeContent();

                // "auto-edit" property
                if (this.props.autoEdit) {
                    // get the first element in the iframe
                    const $firstNode =
                        this._$websiteDocument.querySelector(
                            '[s-node][s-specs]',
                        );
                    if ($firstNode) {
                        const uid = $firstNode.getAttribute('s-node');
                        await this._setCurrentNode(uid);
                        this._edit();
                    }
                }

                // show the iframe again (just to avoid weird visual effects...)
                this._$websiteIframe.style.opacity = 1;

                // resolve only if is the first init
                resolve();
            });

            // wait until the iframe is ready
            await __whenIframeReady(this._$websiteIframe);
        });
    }

    /**
     * Clean root document body
     */
    _cleanRootDocument() {
        // empty the document of all the nodes
        // unless the iframes
        ['body'].forEach((container) => {
            Array.from(
                this._$rootDocument.querySelectorAll(`${container} > *`),
            ).forEach((node: HTMLElement) => {
                if (
                    node.tagName?.toLowerCase?.() === 'iframe' ||
                    node.tagName?.toLowerCase?.() === 's-carpenter'
                ) {
                    return;
                }
                // @ts-ignore
                node.remove();
            });
        });
    }

    /**
     * Define the add component filtrable input
     */
    _defineAddComponentFiltrableInput() {
        const items: any[] = [];
        for (let [specs, specsObj] of Object.entries(this._specs ?? {})) {
            items.push({
                ...specsObj,
                specs,
            });
        }

        __querySelectorLive(
            's-carpenter-app-add-component',
            ($elm) => {
                $elm.addEventListener('s-filtrable-input.select', async (e) => {
                    // get a proper uniqid
                    const nodeMetas = await this._ask('nodeMetas');

                    // add the component
                    this._addComponent({
                        uid: nodeMetas.uid,
                        specs: e.detail.item.specs,
                        $after: __traverseUp(e.target, ($elm) =>
                            $elm.classList.contains(
                                's-carpenter-app_website-container',
                            ),
                        ),
                    });
                });
            },
            {
                rootNode: this._$websiteDocument,
            },
        );

        __SFiltrableInputComponent(
            {
                value: 'specs',
                placeholder: this.props.i18n.addComponent,
                label(item) {
                    return item.name;
                },
                filtrable: ['title', 'type'],
                templates: ({ type, item, html, unsafeHTML }) => {
                    if (type === 'item') {
                        switch (item.type) {
                            case 'category':
                                return html`
                                    <div class="_item _item-category">
                                        <h3 class="_title">
                                            ${unsafeHTML(item.title)}
                                        </h3>
                                        <p class="_description">
                                            ${item.description}
                                        </p>
                                    </div>
                                `;
                                break;
                            default:
                                return html`
                                    <div class="_item _item-component">
                                        <h3 class="_title">
                                            ${unsafeHTML(item.title)}
                                        </h3>
                                        <span class="_description"
                                            >${unsafeHTML(
                                                item.description,
                                            )}</span
                                        >
                                    </div>
                                `;
                                break;
                        }
                    }
                },
                items: async ({ value }) => {
                    if (!value) {
                        const categoriesItems = [];
                        for (let [id, categoryObj] of Object.entries(
                            this._categories ?? {},
                        )) {
                            categoriesItems.push({
                                title: categoryObj.name,
                                description: categoryObj.description,
                                type: 'category',
                                value: `/${id}`,
                                preventClose: true,
                                preventReset: true,
                                preventSelect: true,
                                props: {
                                    value: 'value',
                                },
                            });
                        }

                        return categoriesItems;
                    }

                    if (value.match(/^\/[a-zA-Z0-9]+/)) {
                        const category = value.trim().replace(/^\//, '');
                        let filteredItems = items.filter((item) => {
                            if (!category) return true;
                            return item.specs.includes(`.${category}.`);
                        });
                        return filteredItems;
                    }

                    return items;
                },
            },
            's-carpenter-app-add-component',
            {
                window: this._websiteWindow,
            },
        );
    }

    /**
     * Set the edit/insert mode
     */
    _setMode(mode: 'edit' | 'insert'): void {
        // apply the mode on the website body inside the iframe
        this._$websiteDocument.body.classList.remove(
            this.utils.cls(`--${this.state.mode}`),
        );
        this._$websiteDocument.body.classList.add(this.utils.cls(`--${mode}`));

        // set the mode in state
        this.state.mode = mode;
    }

    /**
     * Get the SCarpenterElement instance from a standard HTMLElement
     */
    getElementFromDomNode($node: HTMLElement): __SCarpenterNode {
        return this._nodesStack[$node.children[0].getAttribute('s-node')];
    }

    /**
     * Add a component into a container
     */
    async _addComponent(
        specs: ISCarpenterAppComponentAddComponent,
    ): Promise<void> {
        const uid = specs.uid ?? __uniqid();
        const $newComponent = document.createElement('div');
        $newComponent.innerHTML = `
        <template s-node="${uid}" s-specs="${specs.specs}">${JSON.stringify({
            uid,
            specs: specs.specs,
            values: {},
        })}</template>
        `;
        const $node = $newComponent.querySelector('[s-node]');
        $node.setAttribute('is-new', 'true');
        this._nodesStack[uid] = new __SCarpenterNode($node, this);
        specs.$after.before($newComponent);
        await this._setCurrentNode(uid);
        await this.applyComponent();
        this._edit();
    }

    async applyComponent(values?: any): Promise<void> {
        await this._currentNode.setValues(values);
        await this._currentNode.save();
        this.requestUpdate();
    }

    /**
     * Listen for specs editor events like save, change, etc...
     */
    _listenSpecsEditorEvents() {
        // listen for save
        this.addEventListener('s-specs-editor.ready', async (e) => {
            // store the specs editor reference
            this._$specsEditor = e.target;
        });

        // listen for save
        this.addEventListener('s-specs-editor.save', async (e) => {
            this._currentNode.save();
        });

        // listen for actual updated
        this.addEventListener('s-specs-editor.change', async (e) => {
            // apply the component
            this.applyComponent(e.detail.values);
        });

        // listen for media change in the specs editor
        this.addEventListener('s-specs-editor.changeMedia', (e) => {
            // change the media internaly
            this._activateMedia(e.detail);
        });
    }

    /**
     * Watch hover on specs element to position the toolbar
     */
    _watchHoverOnNodes() {
        __querySelectorLive(
            `[s-node][s-specs]`,
            ($node) => {
                // add node class
                $node.parentNode.classList.add(this.utils.cls('_node'));

                $node.parentNode.addEventListener('pointerover', (e) => {
                    // add hover class
                    e.currentTarget.classList.add('hover');

                    e.stopPropagation();

                    const element = this.getElementFromDomNode(e.currentTarget);

                    // do nothing more if already activated
                    if (element.uid === this._preselectedNode?.uid) {
                        return;
                    }

                    // position toolbar
                    this._setToolbarTitleAndPosition(
                        e.currentTarget,
                        __upperFirst(element.specs.split('.').pop()),
                    );

                    // set the "pre" activate element
                    this._preselectedNode = element;
                });
                $node.parentNode.addEventListener('pointerout', (e) => {
                    // remove hover class
                    e.currentTarget.classList.remove('hover');
                });
            },
            {
                rootNode: this._$websiteDocument.body,
            },
        );
    }

    /**
     * Handle "scrolled" class on the editor
     */
    _handleScrolledClassOnEditor() {
        __querySelectorLive(
            `.${this.utils.cls('_editor-wrapper')}`,
            ($wrapper) => {
                $wrapper.addEventListener('scroll', (e) => {
                    if (Math.abs($wrapper.scrollTop) >= 100) {
                        this._$editor.classList.add('scrolled');
                    } else {
                        this._$editor.classList.remove('scrolled');
                    }
                });
            },
        );
    }

    /**
     * Check if editor is opened
     */
    isEditorOpen(): boolean {
        return document.body.classList.contains('s-carpenter--open');
    }

    /**
     * open the editor
     */
    _openEditor() {
        document.body.classList.add('s-carpenter--open');
        this._$editorIframe?.classList.add('s-carpenter--open');
        this._$rootDocument.body.classList.add('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }

    /**
     * close the editor
     */
    _closeEditor() {
        document.body.classList.remove('s-carpenter--open');
        this._$editorIframe?.classList.remove('s-carpenter--open');
        this._$rootDocument.body.classList.remove('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }

    /**
     * Create the toolbar element
     */
    _initToolbar(): HTMLElement {
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add('s-carpenter-website-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;

        const html: string[] = [];

        html.push(`
            <div class="_title"></div>
        `);

        if (this.props.features?.saveComponent) {
            html.push(`
                <button s-carpenter-app-action="save" class="_save" confirm="Save?">
                    ${this.props.icons.save}
                </button>
            `);
        }

        html.push(`
            <button s-carpenter-app-action="edit" class="_edit">
                ${this.props.icons.edit} <span>Edit</span>
            </button>
        `);
        if (this.props.features?.delete) {
            html.push(`
                <button s-carpenter-app-action="delete" class="_delete" confirm="Confirm?">
                    ${this.props.icons.delete}
                </button>
            `);
        }

        this._$toolbar.innerHTML = html.join('');

        // append toolbar to viewport
        this._$websiteDocument.body.appendChild($toolbar);

        return this._$toolbar;
    }

    /**
     * Listen for toolbar actions
     */
    _listenToolbarActions() {
        this._$toolbar.addEventListener('pointerup', async (e) => {
            const action = e.target.getAttribute('s-carpenter-app-action');
            if (e.target.needConfirmation) {
                return;
            }
            switch (action) {
                case 'edit':
                    document.activeElement?.blur?.();
                    this._edit(this._preselectedNode?.uid);
                    break;
                case 'save':
                    this._preselectedNode?.save();
                    break;
                case 'delete':
                    this._preselectedNode?.delete();
                    break;
            }
        });
    }

    /**
     * Edit an item
     */
    async _edit(uid?: string) {
        // set the current element
        if (uid && uid !== this._currentNode?.uid) {
            await this._setCurrentNode(uid);
        }

        // open the editor
        this._openEditor();

        // request new UI update
        this.requestUpdate();
    }

    /**
     * Activate the element when toolbar has been clicked
     */
    async _setCurrentNode(uid: string): void {
        if (!uid) {
            throw new Error(
                `<red>[SCarpenter]</red> Cannot call _setCurrentNode without any args...`,
            );
        }

        if (!this._nodesStack[uid]) {
            throw new Error(
                `<red>[SCarpenter]</red> The passed "${uid}" does not exists in the elements stacks...`,
            );
        }

        // do not activate 2 times the same element
        if (this._currentNode?.uid === uid) {
            return;
        }

        // remove the preselected element
        this._preselectedNode = null;
        this._currentNode = null;

        // force UI to refresh
        this.requestUpdate();
        await __wait();

        // set the current element
        this._currentNode = this._nodesStack[uid];

        // await this._currentNode.getData();
        this.requestUpdate();
    }

    /**
     * Set the toolbar position
     */
    _setToolbarTitleAndPosition($from: HTMLElement, title: string = ''): void {
        const targetRect = $from.getBoundingClientRect();
        this._$toolbar.style.top = `${
            targetRect.top + this._websiteWindow.scrollY
        }px`;

        let left =
            targetRect.left + targetRect.width + this._websiteWindow.scrollX;

        if (
            this.isEditorOpen() &&
            left >= this._$rootDocument.documentElement.clientWidth - 400
        ) {
            left -= 500;
        } else if (
            targetRect.left + targetRect.width >=
            this._$rootDocument.documentElement.clientWidth - 50
        ) {
            left -= 300;
        }

        left -= 50;

        const $title = this._$toolbar.querySelector('._title');
        $title.innerHTML = title;

        this._$toolbar.style.left = `${left}px`;
    }

    /**
     * Get a node status
     */
    async getStatus(of: 'node' | 'page', uid: string): Promise<void> {
        const response = await fetch(
            `${this.props.endpoints[`${of}s`]
                .replace('%base', this.props.endpoints.base)
                .replace('%uid', uid)}/status`,
            {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            },
        );
        return await response.json();
    }

    /**
     * Activate a particular media query
     */
    _activateMedia(media) {
        this.state.activeMedia = media;
        this._setViewportSize();
    }

    /**
     * Set the "viewport" his correct size
     */
    _setViewportSize() {
        const width = `${
            this._media.queries[this.state.activeMedia].maxWidth
                ? `${
                      (this._media.queries[this.state.activeMedia].maxWidth /
                          100) *
                      75
                  }px`
                : '100vw'
        }`;
        this._$websiteViewport.style.setProperty(
            '--s-carpenter-viewport-width',
            width,
        );
    }

    /**
     * Change page with the dotpath
     */
    async _changePage(specs: string, pushState: boolean = true): Promise<void> {
        // update the loading state
        this.state.loadingStack[specs] = true;
        this.state.isLoading = true;

        // change the iframe source
        this._$websiteIframe.src = this.props.pagesUrl.replace('%specs', specs);

        // save arrival state
        if (pushState) {
            this._rootWindow.history.pushState(
                {
                    specs,
                },
                document.title,
                this.props.pagesUrl.replace('%specs', specs),
            );
        }

        // update UI
        this.requestUpdate();
    }

    _toggleNavigationFolder(folderId) {
        if (this.state.activeNavigationFolders.includes(folderId)) {
            this.state.activeNavigationFolders.splice(
                this.state.activeNavigationFolders.indexOf(folderId),
                1,
            );
        } else {
            this.state.activeNavigationFolders.push(folderId);
        }
        this.requestUpdate();
    }

    /**
     * Render an error
     */
    _renderError(error: string): any {
        return html`
            <div class="${this.utils.cls('_error')}">
                <p class="_text">${error}</p>
            </div>
        `;
    }

    /**
     * Render the "scope selector"
     */
    _renderScopeSelector(callback?: Function): any {
        let selectedScope = Object.keys(this._scopes)[0];
        return html`
            <div class="${this.utils.cls('_scope-selector')}">
                <h1 class="s-typo:h1 s-mbe:30">
                    ${this.props.i18n.scopeSelectorTitle}
                </h1>

                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.scopeSelectorLabel}</span>
                    <select
                        class="s-select"
                        autofocus
                        @change=${(e) => {
                            selectedScope = e.target.value;
                        }}
                    >
                        ${Object.keys(this._scopes).map(
                            (scope) => html`
                                <option id="${scope}" value="${scope}">
                                    ${this._scopes[scope].name} |
                                    ${this._scopes[scope].description}
                                </option>
                            `,
                        )}
                    </select>
                </label>
                <label class="s-label">
                    <span></span>
                    <button
                        class="s-btn s-color:accent"
                        @pointerup=${(e) => {
                            callback?.(selectedScope);
                            this._askCallback?.(selectedScope);
                        }}
                    >
                        ${this.props.i18n.scopeSelectorButton}
                    </button>
                </label>
            </div>
        `;
    }

    /**
     * Render the "new page" form
     */
    _renderPageMetasForm(callback?: Function): any {
        return html`
            <div class="${this.utils.cls('_page-metas-form')}">
                <h1 class="s-typo:h1 s-mbe:30">
                    ${this.props.i18n.newPageTitle}
                </h1>

                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.newPageNameLabel}</span>
                    <input
                        type="text"
                        class="s-input"
                        maxlength="50"
                        required
                        placeholder="${this.props.i18n.newPageNamePlaceholder}"
                        @change=${(e) => {
                            this._askData.name = e.target.value;
                            this._askData.slug = `/${__urlCompliant(
                                e.target.value,
                            )}`;
                            this._askData.uid = __idCompliant(
                                this._askData.name,
                            );
                            this._askErrors = {};
                            this.requestUpdate();
                        }}
                    />
                    ${this._askErrors?.name
                        ? html` ${this._renderError(this._askErrors.name)} `
                        : ''}
                </label>
                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.newPageSlugLabel}</span>
                    <input
                        type="text"
                        class="s-input"
                        maxlength="100"
                        autofocus
                        required
                        .value=${this._askData.slug ?? ''}
                        value="${this._askData.slug ?? ''}"
                        placeholder="${this.props.i18n.newPageSlugPlaceholder}"
                        @change=${(e) => {
                            this._askData.slug = e.target.value;
                            this._askData.slug = __urlCompliant(
                                this._askData.slug,
                            );
                            delete this._askErrors.slug;
                            this.requestUpdate();
                        }}
                    />
                    ${this._askErrors?.slug
                        ? html` ${this._renderError(this._askErrors.slug)} `
                        : ''}
                </label>
                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.newPageUidLabel}</span>
                    <input
                        type="text"
                        class="s-input"
                        maxlength="100"
                        .value=${this._askData.uid ?? ''}
                        value="${this._askData.uid ?? ''}"
                        placeholder="${this.props.i18n.newPageUidPlaceholder}"
                        @change=${(e) => {
                            this._askData.uid = __idCompliant(e.target.value);
                            delete this._askErrors.uid;
                            this.requestUpdate();
                        }}
                    />
                    ${this._askErrors?.uid
                        ? html` ${this._renderError(this._askErrors.uid)} `
                        : ''}
                </label>
                <label class="s-label">
                    <span></span>
                    <button
                        class="s-btn s-color:accent"
                        ?disabled=${!this._askData.name ||
                        !this._askData.uid ||
                        this._askErrors.name ||
                        this._askErrors.uid}
                        @pointerup=${async (e) => {
                            const createResult = await this._createPage(
                                this._askData,
                            );

                            if (createResult.error) {
                                this._askErrors.uid = createResult.error;
                                this.requestUpdate();
                            } else {
                                callback?.(this._askData);
                                this._askCallback?.(this._askData);
                            }
                        }}
                    >
                        ${this.props.i18n.newPageButton}
                    </button>
                </label>
            </div>
        `;
    }

    /**
     * Render the "new node" form
     */
    _renderNodeMetasForm(callback?: Function): any {
        return html`
            <div class="${this.utils.cls('_node-metas-form')}">
                <h1 class="s-typo:h1 s-mbe:30">
                    ${this.props.i18n.newNodeTitle}
                </h1>

                <p class="s-typo:p s-mbe:30">
                    ${this.props.i18n.newNodeDescription}
                </p>

                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.newNodeUidLabel}</span>
                    <input
                        type="text"
                        class="s-input"
                        maxlength="100"
                        autofocus
                        required
                        .value=${this._askData.uid ?? ''}
                        value="${this._askData.uid ?? ''}"
                        placeholder="${this.props.i18n.newNodeUidPlaceholder}"
                        @keyup=${__debounce(100, async (e) => {
                            if (!e.target.value) {
                                this._askErrors.uid =
                                    this.props.i18n.newNodeUidRequired;
                                return this.requestUpdate();
                            }

                            this._askData.uid = __idCompliant(e.target.value);
                            const nodeStatus = await this.getStatus(
                                'node',
                                this._askData.uid,
                            );
                            if (nodeStatus.exists) {
                                this._askErrors.uid =
                                    this.props.i18n.newNodeUidAlreadyTaken;
                            } else {
                                delete this._askErrors.uid;
                            }
                            this.requestUpdate();
                        })}
                    />
                    ${this._askErrors?.uid
                        ? html` ${this._renderError(this._askErrors.uid)} `
                        : ''}
                </label>
                <label class="s-label">
                    <span></span>
                    <button
                        class="s-btn s-color:accent"
                        ?disabled=${!this._askData.uid || this._askErrors.uid}
                        @pointerup=${async (e) => {
                            callback?.(this._askData);
                            this._askCallback?.(this._askData);
                        }}
                    >
                        ${this.props.i18n.newNodeButton}
                    </button>
                </label>
            </div>
        `;
    }

    async _createPage(pageMetas: any): Promise<any> {
        // set loading state
        this.state.isLoading = true;

        // send the new page request
        const response = await fetch(
            this.props.endpoints.pages
                .replace('%base', this.props.endpoints.base)
                .replace('%uid', pageMetas.uid),
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    scope: pageMetas.scope,
                    name: pageMetas.name,
                    uid: pageMetas.uid,
                    slug: pageMetas.slug,
                }),
            },
        );
        const result = await response.json();

        // set loading state
        this.state.isLoading = false;

        return result;
    }

    /**
     * This method allows you to ask for things like:
     * - scope: A scope generali between user and repo
     */
    _askFor;
    _askErrors: Record<string, string> = {};
    _askData: any = {};
    _askCallback;
    _ask(
        what: 'scope' | 'pageMetas' | 'nodeMetas',
        initialData: any = {},
    ): Promise<any> {
        this._askErrors = {};
        this._askData = initialData;
        return new Promise(async (resolve, reject) => {
            this._askFor = what;
            this._askCallback = (result) => {
                resolve(result);
                this._askFor = undefined;
                this._askErrors = {};
                this._askData = {};
                this.requestUpdate();
            };
            this.requestUpdate();
            setTimeout(() => {
                this._updateUiPlaceholders();
            }, 50);

            const escapePromise = __escapeQueue(null, {
                rootNode: [this._$editorDocument, this._$websiteDocument],
            });
            escapePromise.then(() => {
                this._askFor = undefined;
                this._askErrors = {};
                this._askData = {};
                this.requestUpdate();
            });
        });
    }

    /**
     * This method will create a new page
     */
    async newPage(): Promise<void> {
        let scope;

        // ask for the "scope" if the scope feature is enabled
        if (
            this.props.features.scopes &&
            Object.keys(this._scopes ?? {}).length
        ) {
            // ask for the page scope
            scope = await this._ask('scope');
        }

        const result = await this._ask('pageMetas', {
            scope,
        });

        _console.log('COCO', result);
    }

    /**
     * This method takes all the content from the page and save it through the adapter(s)
     * by respecting the ISPage interface available in the @specimen/types package.
     */
    async _savePage(): Promise<void> {
        // go grab all the s-container elements in the website
        const $nodes = this._$websiteDocument.querySelectorAll(
            '[s-container], [s-node][s-specs]',
        );
        if (!$nodes) {
            return;
        }

        const data = {
                uid: this._page.uid,
                name: this._page.name,
                scope: this._page.scope,
                slug: this._page.slug,
                type: 'root',
                nodes: [],
            },
            flatData = {};

        _console.log('nodes', $nodes);

        Array.from($nodes).forEach(($node) => {
            const nodeUid =
                $node.getAttribute('s-container') ??
                $node.getAttribute('s-node');
            flatData[nodeUid] = {
                uid: nodeUid,
            };

            _console.log('Node', $node, nodeUid);

            if ($node.getAttribute('s-node')) {
                flatData[nodeUid].type = 'node';
            } else if ($node.getAttribute('s-container')) {
                flatData[nodeUid].type = 'container';
            } else {
                flatData[nodeUid].type = 'unknown';
            }

            const $belong = __traverseUp($node, ($elm) => {
                if ($elm.hasAttribute('s-container')) {
                    return true;
                }
                if ($elm.children[0]?.hasAttribute('s-node')) {
                    return true;
                }
            });

            // if not belong to any other components,
            // mean it's a root node
            if (!$belong) {
                if (!data.nodes) {
                    data.nodes = [];
                }
                data.nodes.push(flatData[nodeUid]);
                return;
            }

            const belongId =
                $belong.getAttribute('s-container') ??
                $belong.children[0].getAttribute('s-node');
            if (!belongId) {
                throw new Error(
                    '<red>[SCarpenter]</red> The component logged bellow does not have any "s-container" id or any "id" attribute...',
                );
            }

            _console.log('be', belongId, nodeUid);

            if (!flatData[belongId].nodes) {
                flatData[belongId].nodes = [];
            }
            flatData[belongId].nodes.push(flatData[nodeUid]);
        });

        _console.log('flat', flatData);
        _console.log('page', data);

        return;

        const response = await fetch(
            this.props.endpoints.pages
                .replace('%base', this.props.endpoints.base)
                .replace('%uid', data.uid),
            {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data),
            },
        );
    }

    /**
     * Grab the data depending on the passed source.
     * Can be a url where to fetch the data or an id pointing to an HTMLTemplateElement that
     * store the JSON data
     */
    async _getData(source: string | ISCarpenterAppComponentData): any {
        let data;
        try {
            if ((<any>source).startsWith('{')) {
                data = JSON.parse(<string>source);
            } else if (
                (<any>source).startsWith('/') ||
                (<any>source).match(/^https?\:\/\//)
            ) {
                data = await fetch(<string>source).then((response) =>
                    response.json(),
                );
            } else {
                const $template = document.querySelector(
                    `template#${source}, template${source}`,
                );
                if ($template) {
                    // @ts-ignore
                    data = JSON.parse($template.content.textContent);
                }
            }
        } catch (e) {}

        // warn if no data
        if (!data) {
            throw new Error(
                `[SCarpenterAppComponent] The passed source "${source}" does not provide any valid data...`,
            );
        }

        // filter the "ghosts"
        if (!this.props.ghostSpecs && data.specs) {
            data.specs = __filterObject(data.specs, (key, item) => {
                return !item.ghost;
            });
        }

        data.specsByTypes = {};
        for (let [namespace, specObj] of Object.entries(data.specs)) {
            const parts = namespace.split('.');
            let type;
            parts.forEach((part) => {
                if (type) return;
                if (part !== 'views') {
                    type = part;
                }
            });
            if (!data.specsByTypes[type]) {
                data.specsByTypes[type] = {};
            }
            data.specsByTypes[type][namespace] = specObj;
        }
        return data;
    }

    _carpenterLogo() {
        return html`
            <svg
                width="62"
                height="64"
                viewBox="0 0 62 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M13.7641 10.3858V1.70592C13.7641 0.941977 14.5861 0.460164 15.2527 0.833363L36.9359 12.9732C37.2517 13.15 37.4473 13.4837 37.4473 13.8457V38.8719C37.4473 39.6456 36.6064 40.1262 35.9397 39.7335L28.0526 35.0868C27.7475 34.907 27.5602 34.5793 27.5602 34.2252V19.5822C27.5602 19.2266 27.3713 18.8977 27.0641 18.7185L14.2603 11.2496C13.953 11.0704 13.7641 10.7415 13.7641 10.3858Z"
                    fill="black"
                />
                <path
                    d="M9.07011 58.8847L1.48646 63.1071C0.819001 63.4787 -0.00179823 62.995 2.95924e-06 62.231L0.058594 37.3808C0.0594475 37.0188 0.25586 36.6856 0.572132 36.5095L22.4376 24.3353C23.1136 23.9589 23.9426 24.4599 23.9238 25.2334L23.7007 34.3848C23.6921 34.7388 23.4968 35.0619 23.1875 35.2342L10.3939 42.3574C10.0831 42.5304 9.88765 42.8554 9.88052 43.211L9.58345 58.031C9.57632 58.3866 9.38086 58.7117 9.07011 58.8847Z"
                    fill="black"
                />
                <path
                    d="M53.4768 38.5712L60.9938 42.9112C61.6554 43.2931 61.6617 44.2458 61.0052 44.6365L39.6502 57.3448C39.3392 57.53 38.9523 57.5325 38.6388 57.3515L16.9655 44.8384C16.2955 44.4516 16.2997 43.483 16.9732 43.102L24.9409 38.5949C25.2492 38.4205 25.6266 38.4222 25.9333 38.5993L38.6144 45.9207C38.9225 46.0986 39.3018 46.0994 39.6106 45.923L52.4807 38.569C52.7895 38.3925 53.1688 38.3934 53.4768 38.5712Z"
                    fill="black"
                />
            </svg>
        `;
    }

    render() {
        return html`
            ${this.props.sidebar
                ? html`
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>

                          <!-- <div class="${this.utils.cls('_navigation')}">
                              ${!this._data.specsByTypes
                              ? html` <p>Loading...</p> `
                              : html`
                                    <ul class="s-fs-tree">
                                        ${Object.keys(
                                            this._data.specsByTypes,
                                        ).map((type) => {
                                            const specsObj =
                                                this._data.specsByTypes[type];
                                            return html`
                                                <li
                                                    class="${this.state.activeNavigationFolders.includes(
                                                        type,
                                                    )
                                                        ? 'active'
                                                        : ''}"
                                                >
                                                    <div
                                                        @pointerup=${() =>
                                                            this._toggleNavigationFolder(
                                                                type,
                                                            )}
                                                    >
                                                        ${this.state.activeNavigationFolders.includes(
                                                            type,
                                                        )
                                                            ? html`
                                                                  ${unsafeHTML(
                                                                      this.props
                                                                          .icons
                                                                          .folderOpen,
                                                                  )}
                                                              `
                                                            : html`
                                                                  ${unsafeHTML(
                                                                      this.props
                                                                          .icons
                                                                          .folderClose,
                                                                  )}
                                                              `}
                                                        <span tabindex="0"
                                                            >${__upperFirst(
                                                                type,
                                                            )}</span
                                                        >
                                                    </div>
                                                    <ul class="s-fs-tree">
                                                        ${Object.keys(
                                                            specsObj,
                                                        ).map((dotpath) => {
                                                            const specObj =
                                                                specsObj[
                                                                    dotpath
                                                                ];
                                                            let last;
                                                            const checkDotPath =
                                                                specObj.metas.dotpath
                                                                    .split('.')
                                                                    .filter(
                                                                        (p) => {
                                                                            if (
                                                                                last &&
                                                                                p ===
                                                                                    last
                                                                            ) {
                                                                                return false;
                                                                            }
                                                                            last =
                                                                                p;
                                                                            return true;
                                                                        },
                                                                    )
                                                                    .join('.');
                                                            return html`
                                                                <li
                                                                    class="_item ${this._$rootDocument.location.href.includes(
                                                                        checkDotPath,
                                                                    )
                                                                        ? 'active'
                                                                        : ''}"
                                                                    tabindex="0"
                                                                    @pointerup=${() =>
                                                                        this._changePage(
                                                                            specObj
                                                                                .metas
                                                                                .dotpath,
                                                                        )}
                                                                >
                                                                    <div>
                                                                        ${this
                                                                            .state
                                                                            .loadingStack[
                                                                            specObj
                                                                                .metas
                                                                                .dotpath
                                                                        ]
                                                                            ? html`
                                                                                  <div
                                                                                      class="_loader carpenter-loader-blocks"
                                                                                  >
                                                                                      <div
                                                                                          class="_block-1"
                                                                                      ></div>
                                                                                      <div
                                                                                          class="_block-2"
                                                                                      ></div>
                                                                                      <div
                                                                                          class="_block-3"
                                                                                      ></div>
                                                                                  </div>
                                                                              `
                                                                            : html`
                                                                                  <i
                                                                                      class="fa-regular fa-file"
                                                                                  ></i>
                                                                              `}
                                                                        <span>
                                                                            ${specObj.title ??
                                                                            specObj.name}
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            `;
                                                        })}
                                                    </ul>
                                                </li>
                                            `;
                                        })}
                                    </ul>
                                `}
                          </div> -->
                      </nav>
                  `
                : ''}

            <nav
                class="${this.utils.cls('_editor')} ${this._currentNode
                    ? 'active'
                    : ''}"
                s-carpenter-ui
            >
                ${!this.state.isLoading
                    ? html`
                          <div class="${this.utils.cls('_editor-wrapper')}">
                              ${this._currentNode?.isReady()
                                  ? html`
                                        <s-specs-editor
                                            uid="${this._currentNode.uid}"
                                            media="${this.state.activeMedia}"
                                            default-media="${this.props
                                                .defaultMedia}"
                                            .source=${this._currentNode.source}
                                            .specs=${this._currentNode.specsObj}
                                            .values=${this._currentNode.values}
                                            .frontspec=${this.props.frontspec ??
                                            {}}
                                            @s-specs-editor.error=${(e) => {
                                                this._isSpecsEditorValid =
                                                    false;
                                                this.requestUpdate();
                                            }}
                                            @s-specs-editor.valid=${(e) => {
                                                this._isSpecsEditorValid = true;
                                                this.requestUpdate();
                                            }}
                                        >
                                        </s-specs-editor>
                                    `
                                  : html`<p>Loading...</p>`}
                          </div>
                      `
                    : html`
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      `}
            </nav>

            <nav class="${this.utils.cls('_controls')}" s-carpenter-ui>
                <div class="_logo">${unsafeHTML(this.props.logo)}</div>

                <div
                    class="${this.utils.cls('_menu')} drop-menu:right"
                    tabindex="0"
                >
                    ${unsafeHTML(this.props.icons.menu)}
                    <div class="_drop">
                        <ol class="_menu">
                            ${this.props.features.newPage
                                ? html`
                                      <li
                                          class="_menu-item"
                                          @pointerup=${(e) => {
                                              this.newPage();
                                          }}
                                      >
                                          ${unsafeHTML(this.props.icons.page)}
                                          New page
                                      </li>
                                  `
                                : ''}
                        </ol>
                    </div>
                </div>

                ${this.props.frontspec?.media?.queries
                    ? html`
                          <ul class="${this.utils.cls('_queries')}">
                              ${Object.keys(
                                  this.props.frontspec?.media?.queries ?? {},
                              ).map((query) => {
                                  return html`
                                      <li
                                          tabindex="0"
                                          @pointerup=${() =>
                                              this._activateMedia(query)}
                                          class="s-tooltip-container ${query ===
                                          this.state.activeMedia
                                              ? 'is-active'
                                              : ''} _query"
                                      >
                                          ${unsafeHTML(this.props.icons[query])}
                                          <div class="s-tooltip:right">
                                              ${__upperFirst(query)}
                                          </div>
                                      </li>
                                  `;
                              })}
                          </ul>
                      `
                    : ''}
                ${this.props.features?.insert
                    ? html`
                          <label class="_modes s-tooltip-container">
                              <input
                                  type="checkbox"
                                  class="_switch"
                                  .checked=${this.state.mode === 'insert'}
                                  ?checked=${this.state.mode === 'insert'}
                                  @change=${(e) => {
                                      this._setMode(
                                          e.target.checked ? 'insert' : 'edit',
                                      );
                                  }}
                              />
                              <div class="s-tooltip:right s-white-space:nowrap">
                                  ${unsafeHTML(this.props.i18n.modeToggle)}
                              </div>
                          </label>
                      `
                    : ''}
            </nav>

            ${this._page
                ? html`
                      <div class="${this.utils.cls('_metas')}" s-carpenter-ui>
                          <ol class="breadcrumb">
                              <li class="_item">
                                  <span class="_label">Page</span>
                                  ${this._page.name}
                              </li>
                              ${this._currentNode
                                  ? html`
                                        <li class="_item">
                                            <span class="_label">Node</span>
                                            ${this._currentNode.values?.name
                                                ?.value ??
                                            this._currentNode.values?.title
                                                ?.value ??
                                            this._currentNode.uid}
                                        </li>
                                    `
                                  : ''}
                          </ol>
                      </div>
                  `
                : ''}.
            ${this.props.features?.savePage
                ? html`
                      <div class="${this.utils.cls('_actions')}" s-carpenter-ui>
                          ${this.props.features?.savePage && this._page
                              ? html`
                                    <button
                                        ?disabled=${!this._isSpecsEditorValid ||
                                        !this._page.isReady()}
                                        class="_save"
                                        @click=${(e) => {
                                            this._savePage();
                                        }}
                                    >
                                        ${unsafeHTML(this.props.icons.save)}
                                        Save page
                                    </button>
                                `
                              : ''}
                      </div>
                  `
                : ''}.
            ${this.state.isLoading
                ? html`
                      <div class="${this.utils.cls('_loading')}">
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      </div>
                  `
                : ''}
            ${this._askFor
                ? html`
                      <div class="${this.utils.cls('_ask')}" s-carpenter-ui>
                          ${this._askFor === 'scope'
                              ? this._renderScopeSelector()
                              : this._askFor === 'pageMetas'
                              ? this._renderPageMetasForm()
                              : this._askFor === 'nodeMetas'
                              ? this._renderNodeMetasForm()
                              : ''}
                      </div>
                  `
                : ''}
        `;
    }
}

export { __define as define };
