import __SLitComponent from '@coffeekraken/s-lit-component';

import __SCarpenterAdapter from './SCarpenterAdapter';
import __SCarpenterAjaxAdapter from './adapters/SCarpenterAjaxAdapter';

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

export interface ISCarpenterAppComponentFeatures {
    save: boolean;
    upload: boolean;
    nav: boolean;
    media: boolean;
}

export interface ISCarpenterAppComponentAddComponent {
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

export interface ISCarpenterComponentProps {
    window: Window;
    features: ISCarpenterAppComponentFeatures;
    adapter: 'ajax';
    data: ISCarpenterAppComponentData;
    viewportElm: HTMLElement;
    nav: boolean;
    savePageUrl: string;
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

    static _registeredAdapters: Record<string, __SCarpenterAdapter> = {
        ajax: __SCarpenterAjaxAdapter,
    };
    static registerAdapter(id: string, adapter: __SCarpenterAdapter): void {
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

        // get the data
        // this._data = await this._getData(this.props.data);
        // if (!this._data) {
        //     throw new Error(
        //         `[SCarpenter] Sorry but no valid specs have been specified...`,
        //     );
        // }

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
        let isEditorHided = false;
        $scope.addEventListener('keydown', (e) => {
            if (isEditorHided) return;
            if (!this.isEditorOpen()) return;
            if (e.key === '§') {
                isEditorHided = true;
                this._closeEditor();
            }
        });
        $scope.addEventListener('keyup', (e) => {
            if (!isEditorHided) return;
            isEditorHided = false;
            this._openEditor();
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
     * Update the element stack
     */
    _updateCarpenterNodesStack() {
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
            this.addEventListener('pointerout', (e) => {
                if (!isActive) return;
                isActive = false;
                outTimeout = setTimeout(() => {
                    this._$editorIframe.classList.remove('active');
                    this._$uiPlaceholders.classList.add('active');
                }, 100);
            });
        }

        const $uis = this.querySelectorAll('[s-carpenter-ui]');
        Array.from($uis).forEach(($ui) => {
            // create if needed
            if (!$ui._placeholder) {
                $ui._placeholder = document.createElement('div');
                $ui._placeholder.classList.add('s-carpenter_ui-placeholder');
                this._$uiPlaceholders.appendChild($ui._placeholder);
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
        // for (let [type, typesObj] of Object.entries(this._data.specsByTypes)) {
        //     for (let [namespace, specs] of Object.entries(typesObj)) {
        //         items.push({
        //             name: specs.title,
        //             type,
        //             namespace,
        //         });
        //     }
        // }

        __querySelectorLive(
            's-carpenter-app-add-component',
            ($elm) => {
                $elm.addEventListener('s-filtrable-input.select', (e) => {
                    this._addComponent({
                        namespace: e.detail.item.namespace,
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
                value: 'namespace',
                placeholder: this.props.i18n.addComponent,
                label(item) {
                    return item.name;
                },
                closeOnSelect: true,
                resetOnSelect: true,
                showKeywords: true,
                filtrable: ['name', 'type'],
                templates: ({ type, item, html, unsafeHTML }) => {
                    if (type === 'item') {
                        return html`
                            <div class="_item">
                                ${unsafeHTML(item.name)}
                                <span class="_type" :
                                    >(${unsafeHTML(item.type)})</span
                                >
                            </div>
                        `;
                    }
                },
                items: async () => {
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
        const uid = __uniqid();
        const $newComponent = document.createElement('div');
        $newComponent.innerHTML = `
        <template s-node="${uid}">${JSON.stringify({
            uid,
            specs: specs.specs,
            values: {},
        })}</template>
        `;
        const $node = $newComponent.querySelector('[s-node]');
        $node.setAttribute('is-new', 'true');
        this._nodesStack[uid] = new __SCarpenterNode($node, this);
        specs.$after.before($newComponent);
        await this.applyComponent();
        this._edit();
    }

    async applyComponent(values?: any): Promise<void> {
        await this._currentNode.setValues(values);
    }

    /**
     * Listen for specs editor events like save, change, etc...
     */
    _listenSpecsEditorEvents() {
        // listen for save
        this.addEventListener('s-specs-editor.ready', (e) => {
            // store the specs editor reference
            this._$specsEditor = e.target;
        });

        // listen for save
        this.addEventListener('s-specs-editor.save', (e) => {
            this._currentNode.save();
        });

        // listen for actual updated
        this.addEventListener('s-specs-editor.change', async (e) => {
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

                    // position toolbar
                    this._setToolbarPosition(e.currentTarget);

                    const element = this.getElementFromDomNode(e.currentTarget);

                    // do nothing more if already activated
                    if (element.uid === this._preselectedNode?.uid) {
                        return;
                    }

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
        return document.body.classList.contains('s-carpenter-app--open');
    }

    /**
     * open the editor
     */
    _openEditor() {
        document.body.classList.add('s-carpenter-app--open');
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
        document.body.classList.remove('s-carpenter-app--open');
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

        // force UI to refresh
        this._currentNode = null;
        this.requestUpdate();
        await __wait();

        // set the current element
        this._currentNode = this._nodesStack[uid];
        await this._currentNode.getData();
        this.requestUpdate();
    }

    /**
     * Set the toolbar position
     */
    _setToolbarPosition($from) {
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

        this._$toolbar.style.left = `${left}px`;
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
                id: 'my-page',
                type: 'root',
                nodes: {},
            },
            flatData = {};

        Array.from($nodes).forEach(($node) => {
            const componentUid =
                $node.getAttribute('s-container') ??
                $node.getAttribute('s-node');
            flatData[componentUid] = {
                uid: componentUid,
                type: $node.hasAttribute('s-container')
                    ? 'container'
                    : 'component',
            };

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
                    data.nodes = {};
                }
                data.nodes[componentUid] = flatData[componentUid];
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

            if (!flatData[belongId].nodes) {
                flatData[belongId].nodes = {};
            }
            flatData[belongId].nodes[componentUid] = flatData[componentUid];
        });

        const response = await fetch(this.props.savePageUrl, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data),
        });
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
        _console.log(this._currentNode, this._currentNode?.isReady());

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

            ${this.props.frontspec?.media?.queries
                ? html`
                      <nav
                          class="${this.utils.cls('_controls')}"
                          s-carpenter-ui
                      >
                          <ul
                              class="${this.utils.cls(
                                  '_queries',
                                  's-tabs',
                                  's-bare',
                              )}"
                          >
                              ${Object.keys(
                                  this.props.frontspec?.media?.queries ?? {},
                              )
                                  .reverse()
                                  .map((query) => {
                                      return html`
                                          <li
                                              @pointerup=${() =>
                                                  this._activateMedia(query)}
                                              class="${query ===
                                              this.state.activeMedia
                                                  ? 'active'
                                                  : ''} _query _item"
                                          >
                                              ${unsafeHTML(
                                                  this.props.icons[query],
                                              )}
                                              ${__upperFirst(query)}
                                          </li>
                                      `;
                                  })}
                          </ul>

                          ${this.props.features?.insert
                              ? html`
                                    <label class="_modes s-tooltip-container">
                                        <span class="_edit">
                                            ${unsafeHTML(
                                                this.props.i18n.modeEdit,
                                            )}
                                        </span>
                                        <input
                                            type="checkbox"
                                            class="_switch"
                                            .checked=${this.state.mode ===
                                            'insert'}
                                            ?checked=${this.state.mode ===
                                            'insert'}
                                            @change=${(e) => {
                                                this._setMode(
                                                    e.target.checked
                                                        ? 'insert'
                                                        : 'edit',
                                                );
                                            }}
                                        />
                                        <span class="_insert">
                                            ${unsafeHTML(
                                                this.props.i18n.modeInsert,
                                            )}
                                        </span>
                                        <div
                                            class="s-tooltip s-color:accent s-white-space:nowrap"
                                        >
                                            ${unsafeHTML(
                                                this.props.i18n.modeToggle,
                                            )}
                                        </div>
                                    </label>
                                `
                              : ''}
                          ${this.props.features?.savePage
                              ? html`
                                    <button
                                        ?disabled=${!this._isSpecsEditorValid}
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
                      </nav>
                  `
                : ''}
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
        `;
    }
}

export { __define as define };
