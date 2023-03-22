import __SLitComponent from '@coffeekraken/s-lit-component';

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

import __define from './defineApp';

import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __ajaxAdapter from './adapters/ajaxAdapter';

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

export interface ISCarpenterComponentProps {
    window: Window;
    specs: string;
    features: ISCarpenterAppComponentFeatures;
    adapter: 'ajax';
    viewportElm: HTMLElement;
    nav: boolean;
    pagesLink: string;
    iframe: boolean;
    ghostSpecs: boolean;
    logo: string;
    icons: ISCarpenterAppComponentIconsProp;
}

// define components/features
__sSpecsEditorComponentDefine();
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
    props: specs;
    component: SCarpenterComponent;
}

export interface ISCarpenterComponentAdapter {
    setProps(params: ISCarpenterComponentAdapterParams): Promise<HTMLElement>;
    change(params: ISCarpenterComponentAdapterParams): Promise<HTMLElement>;
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

    static _registeredAdapters: Record<string, ISCarpenterComponentAdapter> = {
        ajax: __ajaxAdapter,
    };
    static registerAdapter(
        id: string,
        adapter: ISCarpenterComponentAdapter,
    ): void {
        if (SCarpenterAppComponent._registeredAdapters[id]) {
            throw new Error(
                `[SCarpenterAppComponent] Sorry but the "${id}" adapter already exists...`,
            );
        }
        SCarpenterAppComponent._registeredAdapters[id] = adapter;
    }

    static state = {
        activeNavigationFolders: [],
        activeMedia: null,
        isLoading: true,
        loadingStack: {},
    };

    currentSpecs = null;

    _values = {};

    _$currentElm;
    _$preselectedElm;

    _data;
    _websiteWindow;
    _$websiteDocument; // store the document
    _$websiteIframe; // store the website iframe if the "media" method stored in the frontspec.json file is not set to "container". In this case, we must wrap the website into a proper iframe for the @media queries to work
    _$websiteViewport; // store the viewport element in the website that will be used to resize it with media

    _$editor; // store the actual editor "panel"
    _editorWindow;
    _$editorDocument;
    _$editorIframe; // store the iframe in which the carpenter is inited if is one
    _$toolbar; // store the toolbar displayed on the website elements when hovering them

    _$carpenterComponent; // store the reference to the "s-carpenter" component in the initial page

    _rootWindow;
    _$rootDocument;

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

        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }

    async mount() {
        // get the data
        this._data = await this._getData(this.props.specs);
        if (!this._data) {
            throw new Error(
                `[SCarpenter] Sorry but no valid specs have been specified...`,
            );
        }

        // active the default media if not set
        if (!this.state.activeMedia) {
            this.state.activeMedia = this._data.frontspec?.media?.defaultMedia;
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
        __hotkey('escape').on('press', () => {
            this._closeEditor();
        });

        // register shortcuts in the editor iframe
        this._registerShortcuts(this._$editorDocument);

        // listen spec editor update
        this._listenSpecsEditorUpdate();

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
     * Reguster keyboard shortcuts in a particular "scope".
     * The "scope" is the different document like the _$websiteDocument,
     * _$rootDocument, etc...
     */
    _registerShortcuts($scope: Document): void {
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
    }

    /**
     * Init the interactivity things on the iframed website.
     * This contains things like the toolbar, the hover to display it, etc...
     */
    _initWebsiteIframeContent() {
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
        this._watchHoverOnSpecElements();

        // listen for click on links in the iframe to close the editor
        this._$websiteDocument.addEventListener('click', (e) => {
            // check the clicked item
            if (e.target.tagName === 'A' && e.target.hasAttribute('href')) {
                this._closeEditor();
                return;
            }

            // traverse up to see if clicked element is in a link
            const $link = __traverseUp(
                e.target,
                ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'),
            );
            if ($link) {
                this._closeEditor();
            }
        });

        __hotkey('escape', {
            // from the website itself
            element: this._$websiteDocument,
        }).on('press', () => {
            this._closeEditor();
        });
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
                this._$preselectedElm = null;

                // wait until iframe is ready
                await __whenIframeReady(this._$websiteIframe);

                // reset the _window and _$websiteDocument references
                this._websiteWindow = this._$websiteIframe.contentWindow;
                this._$websiteDocument =
                    this._$websiteIframe.contentWindow.document;

                // remove the "s-carpenter" in the iframe
                this._$websiteDocument.querySelector('s-carpenter')?.remove?.();

                // get the first element in the iframe
                const $firstElm =
                    this._$websiteDocument.querySelector('[s-specs]');
                if ($firstElm) {
                    await this._setCurrentElement($firstElm);
                }

                // register shortcuts in the website iframe
                this._registerShortcuts(this._$websiteDocument);

                // init the interactivity in the website iframe
                this._initWebsiteIframeContent();

                // "auto-edit" property
                if (this.props.autoEdit) {
                    this._edit($firstElm);
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
     * Listen for specs editor updates
     */
    _listenSpecsEditorUpdate() {
        // listen for actual updated
        this.addEventListener('s-specs-editor.change', async (e) => {
            console.log('CURRENT', this._$currentElm);

            // make use of the specified adapter to update the component/section/etc...
            const adapterResult =
                await SCarpenterAppComponent._registeredAdapters[
                    this.props.adapter
                ].setProps({
                    $elm: this._$currentElm,
                    props: e.detail.values ?? {},
                    component: this,
                });

            // save current values in "_values" stack
            this._values[this._$currentElm.id] = e.detail.values ?? {};

            if (adapterResult) {
                this._$currentElm = adapterResult;
            }
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
    _watchHoverOnSpecElements() {
        __querySelectorLive(
            `[s-specs]`,
            ($elm) => {
                $elm.addEventListener('pointerover', (e) => {
                    // position toolbar
                    this._setToolbarPosition(e.currentTarget);

                    // do nothing more if already activated
                    if (
                        e.currentTarget.id &&
                        e.currentTarget.id === this._$currentElm?.id
                    ) {
                        return;
                    }
                    if (this._$toolbar?.parent) {
                        return;
                    }

                    // activate the element if needed
                    this._positionToolbarOnElement(e.currentTarget);

                    // set the "pre" activate element
                    this._$preselectedElm = $elm;
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
        this._$editor.addEventListener('scroll', (e) => {
            if (Math.abs(this._$editor.scrollTop) >= 100) {
                this._$editor.classList.add('scrolled');
            } else {
                this._$editor.classList.remove('scrolled');
            }
        });
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
        $toolbar.classList.add('s-carpenter-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;

        const html: string[] = [];

        html.push(`
            <button s-carpenter-app-action="edit" class="s-carpenter-toolbar_edit">
                <i class="fa-regular fa-pen-to-square"></i> <span>Edit</span>
            </button>
        `);
        if (this.props.features?.delete) {
            html.push(`
                <button s-carpenter-app-action="delete" class="s-carpenter-toolbar_delete" confirm="Confirm?">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            `);
        }

        this._$toolbar.innerHTML = html;

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
                    this._edit();
                    break;
                case 'delete':
                    console.log('DELETE');
                    break;
            }
        });
    }

    /**
     * Edit an item
     */
    async _edit($elm?: HTMLElement) {
        // set the current element
        if ($elm || this._$preselectedElm) {
            await this._setCurrentElement($elm ?? this._$preselectedElm);
        }

        // open the editor
        this._openEditor();

        // request new UI update
        this.requestUpdate();
    }

    /**
     * Activate the element when toolbar has been clicked
     */
    async _setCurrentElement($elm: HTMLElement): void {
        if (!$elm) {
            throw new Error(
                `<red>[SCarpenterAppComponent]</red> Cannot call _setCurrentElement without any args...`,
            );
        }

        // ensure we have an id
        if (!$elm.id?.trim?.()) {
            $elm.setAttribute('id', __uniqid());
        }

        // do not activate 2 times the same element
        if (this._$currentElm?.id === $elm.id) {
            return;
        }

        // remove the preselected element
        this._$preselectedElm = null;

        // set the current element
        this._$currentElm = $elm;

        // force reset the specs editor
        this.currentSpecs = null;
        this.requestUpdate();
        await __wait();

        // try to get the spec from the data fetched at start
        let potentialDotpath = $elm.getAttribute('s-specs');
        if (this._data.specs[potentialDotpath]) {
            this.currentSpecs = this._data.specs[potentialDotpath];
        } else {
            potentialDotpath = `${potentialDotpath}.${
                potentialDotpath.split('.').slice(-1)[0]
            }`;
            if (this._data.specs[potentialDotpath]) {
                this.currentSpecs = this._data.specs[potentialDotpath];
            }
        }

        if (!this.currentSpecs) {
            throw new Error(
                `<red>[SCarpenterAppComponent]</red> Sorry but the requested "${potentialDotpath}" specs dotpath does not exists...`,
            );
        }

        // get values
        const values =
            this._values[this._$currentElm.id] ??
            (await SCarpenterAppComponent._registeredAdapters[
                this.props.adapter
            ].getProps({
                $elm: this._$currentElm,
                component: this,
            }));

        // save the getted values
        if (values) {
            this.currentSpecs.values = values;
        }
    }

    /**
     * Add the "editor" micro menu to the element
     */
    _positionToolbarOnElement($elm: HTMLElement): void {
        if ($elm.id && this._$currentElm?.id === $elm.id) {
            return;
        }

        // position toolbar
        this._setToolbarPosition($elm);
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
            this._data.frontspec.media.queries[this.state.activeMedia].maxWidth
                ? `${
                      (this._data.frontspec.media.queries[
                          this.state.activeMedia
                      ].maxWidth /
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
    async _changePage(
        dotpath: string,
        pushState: boolean = true,
    ): Promise<void> {
        // update the loading state
        this.state.loadingStack[dotpath] = true;
        this.state.isLoading = true;

        // change the iframe source
        this._$websiteIframe.src = this.props.pagesLink.replace(
            '%dotpath',
            dotpath,
        );

        // const adapterResult = await SCarpenterComponent._registeredAdapters[
        //     this.props.adapter
        // ].change({
        //     dotpath,
        //     $elm: this.props.specs
        //         ? this._$websiteDocument.body.children[0]
        //         : this._$currentElm,
        //     props: this.props,
        //     component: this,
        // });
        // if (adapterResult) {
        //     this._$currentElm = adapterResult;
        // }

        // save arrival state
        if (pushState) {
            this._rootWindow.history.pushState(
                {
                    dotpath,
                },
                document.title,
                this.props.pagesLink.replace('%dotpath', dotpath),
            );
        }

        // update UI
        this.requestUpdate();

        // // update the currentSpecs
        // const newSpecs = this._data.specs[dotpath];
        // if (newSpecs !== this.currentSpecs) {
        //     this.currentSpecs = null;
        //     this.requestUpdate();
        //     await __wait();
        //     this.currentSpecs = newSpecs;
        //     this.requestUpdate();
        // }
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
     * Grab the data depending on the passed source.
     * Can be a url where to fetch the data or an id pointing to an HTMLTemplateElement that
     * store the JSON data
     */
    async _getData(source: string): any {
        let data;

        try {
            if (source.startsWith('{')) {
                data = JSON.parse(source);
            } else if (
                source.startsWith('/') ||
                source.match(/^https?\:\/\//)
            ) {
                data = await fetch(source).then((response) => response.json());
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
        if (!this.props.ghostSpecs) {
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
        if (!this._data) {
            return '';
        }

        return html`
            ${this.props.sidebar
                ? html`
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
                              <ul class="s-fs-tree">
                                  ${Object.keys(this._data.specsByTypes).map(
                                      (type) => {
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
                                                              specsObj[dotpath];
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
                                      },
                                  )}
                              </ul>
                          </div>
                      </nav>
                  `
                : ''}

            <nav
                class="${this.utils.cls('_editor')} ${this.currentSpecs
                    ? 'active'
                    : ''}"
                s-carpenter-ui
            >
                ${this.currentSpecs && !this.state.isLoading
                    ? html`
                          <s-specs-editor
                              media="${this.state.activeMedia}"
                              .specs=${this.currentSpecs}
                              .features=${this.props.features}
                              .frontspec=${this._data.frontspec ?? {}}
                          >
                          </s-specs-editor>
                      `
                    : html`
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      `}
            </nav>

            ${this._data.frontspec?.media?.queries
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
                                  this._data.frontspec?.media?.queries ?? {},
                              ).map((query) => {
                                  return html`
                                      <li
                                          @pointerup=${() =>
                                              this._activateMedia(query)}
                                          class="${query ===
                                          this.state.activeMedia
                                              ? 'active'
                                              : ''} _query _item"
                                      >
                                          ${unsafeHTML(this.props.specs[query])}
                                          ${__upperFirst(query)}
                                      </li>
                                  `;
                              })}
                          </ul>

                          ${this.props.features?.save
                              ? html` <button class="_save">Save page</button> `
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
