var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SCarpenterPage from './SCarpenterPage.js';
import __SCarpenterNodeAjaxAdapter from './adapters/SCarpenterNodeAjaxAdapter.js';
import __SCarpenterPageAjaxAdapter from './adapters/SCarpenterPageAjaxAdapter.js';
import { __debounce } from '@coffeekraken/sugar/function';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
import { __whenRemoved } from '@coffeekraken/sugar/dom';
import { __idCompliant, __urlCompliant } from '@coffeekraken/sugar/string';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SCarpenterNode from './SCarpenterNode.js';
import __layoutNodeHook from './nodesHooks/layout.js';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';
import { define as __sSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __deepMerge, __filterObject } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface.js';
import { __injectStyle, __querySelectorLive, __traverseUp, __whenIframeReady, } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __injectIframeContent } from '@coffeekraken/sugar/dom';
// @ts-ignore
import __indexCss from '../css/index.css';
import __websiteUiCss from '../css/s-carpenter-app-website-ui.css';
// define components/features
document.body.setAttribute('s-sugar', 'true');
__sSugarFeatureDefine();
export default class SCarpenterAppComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SCarpenterComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__indexCss)}
        `;
    }
    static registerAdapter(id, adapter) {
        if (SCarpenterAppComponent._registeredAdapters[id]) {
            throw new Error(`[SCarpenter] Sorry but the "${id}" adapter already exists...`);
        }
        SCarpenterAppComponent._registeredAdapters[id] = adapter;
    }
    constructor() {
        var _a, _b;
        super(__deepMerge({
            name: 's-carpenter-app',
            interface: __SCarpenterComponentInterface,
            carpenter: __SSugarConfig.get('carpenter'),
        }));
        this.currentSpecs = null;
        this._isSpecsEditorValid = true;
        this._askErrors = {};
        this._askData = {};
        this._$editorIframe = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.querySelector('iframe.s-carpenter_editor-iframe');
        this._editorWindow = window;
        this._$editorDocument = document;
        const frontspec = new __SFrontspec();
        this._media = frontspec.get('media');
        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // define the s-specs-editor component
            __sSpecsEditorComponentDefine({
                features: {
                    delete: this.props.features.node.delete,
                    upload: this.props.features.upload,
                    save: this.props.features.node.save,
                    media: this.props.features.media,
                },
            });
            // if the "scopes" feature is enabled
            if (this.props.features.scopes) {
                yield this._loadScopes();
            }
            // Specs (all the specs)
            yield this._loadSpecs();
            // active the default media if not set
            if (!this.state.activeMedia) {
                this.state.activeMedia = (_b = (_a = this.props.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.defaultMedia;
            }
            // check the specified adapter
            if (!SCarpenterAppComponent._registeredAdapters[this.props.adapter]) {
                throw new Error(`[SCarpenterAppComponent] Sorry but the specified "${this.props.adapter}" is not registered...`);
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
            // confirm exit page
            this._confirmExit();
        });
    }
    /**
     * Ask user if really want to exit the page when
     * some unsaved changes exists
     */
    _confirmExit() {
        window.onbeforeunload = () => {
            if (this.hasUnsavedChanges()) {
                if (confirm(this.props.i18n.unsavedConfirmation))
                    return true;
                else
                    return false;
            }
        };
    }
    /**
     * Load the scopes
     */
    _loadScopes() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.props.endpoints.scopes.replace('%base', this.props.endpoints.base), {
                method: 'GET',
            });
            const scopes = yield response.json();
            this._scopes = scopes;
        });
    }
    /**
     * Load the scopes
     */
    _loadSpecs() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.props.endpoints.specs
                .replace('%base', this.props.endpoints.base)
                .replace('/%specs', ''), {
                method: 'GET',
            });
            const specs = yield response.json();
            this._specs = specs;
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __wait(1000);
            // getting the editor element
            this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
            if (!this._$editor) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls('_editor')}" element found...`);
            }
            // handle media method
            yield this._init();
            // register shortcuts in the editor iframe
            this._registerKeyboardShortcuts();
            // listen spec editor events like save, change, etc...
            this._listenSpecsEditorEvents();
            // handle popstate
            this._websiteWindow.addEventListener('popstate', (e) => {
                this._changePage(e.state.dotpath, false);
            });
            // handle "scrolled" class on the editor
            this._handleScrolledClassOnEditor();
            yield __wait(2000);
            // Create UI placeholders
            this._updateUiPlaceholders();
            // remove the "scrolling='no'" attribute on website iframe
            this._$websiteIframe.removeAttribute('scrolling');
            // init the "container" feature to add new content into them
            this._initWebsiteContainers();
            // reset the activate media
            this.state.activeMedia && this._activateMedia(this.state.activeMedia);
            // emit the "s-carpenter-app.ready" event in the root document
            this._$rootDocument.dispatchEvent(new CustomEvent('s-carpenter-app.ready', {
                bubbles: true,
                detail: this,
            }));
        });
    }
    /**
     * Check if their's some unsaved changes un page or components...
     */
    hasUnsavedChanges() {
        for (let [key, node] of Object.entries(this._nodesStack)) {
            if (node.hasUnsavedChanges()) {
                return true;
            }
        }
        return false;
    }
    /**
     * Init the containers marked by a "s-container" attribute
     * to allow adding new content into the page
     */
    _initWebsiteContainers() {
        __querySelectorLive('[s-container]', ($elm) => {
            const $container = document.createElement('div');
            $container.classList.add(this.utils.cls('_website-add-component'));
            const $toolbar = document.createElement('div');
            $toolbar.setAttribute('s-carpenter-website-ui', 'true');
            $toolbar.classList.add(this.utils.cls('_add-component-container'));
            $elm.addEventListener('keyup', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            const $addFiltrableInputContainer = document.createElement('label');
            $addFiltrableInputContainer.innerHTML = `
                    <s-carpenter-app-add-component>
                        <div class="_group">
                            <span class="_icon">${this.props.icons.component}</span>
                            <input type="text" id="s-carpenter-app-add-component" placeholder="${this.props.i18n.addComponent}" class="${this.utils.cls('_add-component-input')}" />
                        </div>
                    </s-carpenter-app-add-component>`;
            $toolbar.appendChild($addFiltrableInputContainer);
            $container.appendChild($toolbar);
            $elm.appendChild($container);
            $elm._sCarpenterContainer = $container;
        }, {
            once: true,
            rootNode: this._$websiteDocument,
        });
        __querySelectorLive(`[s-container] > *:not(.${this.utils.cls('_website-add-component')})`, ($child) => {
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
        }, {
            rootNode: this._$websiteDocument,
        });
    }
    /**
     * Reguster keyboard shortcuts in a particular "scope".
     * The "scope" is the different document like the _$websiteDocument,
     * _$rootDocument, etc...
     */
    _registerKeyboardShortcuts($scopes) {
        // "§" key to hide the editor
        let currentMode = this.state.mode;
        const $documents = [
            this._$editorDocument,
            this._$websiteDocument,
            this._$rootDocument,
        ];
        if (!$scopes) {
            $scopes = $documents;
        }
        else if (!Array.isArray($scopes)) {
            $scopes = [$scopes];
        }
        $scopes.forEach(($scope) => {
            $scope.addEventListener('keydown', (e) => {
                if (e.key === '§') {
                    $documents.forEach(($document) => {
                        var _a, _b;
                        (_b = (_a = $document.body) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.add('s-carpenter--preview');
                    });
                    // save the current mode
                    currentMode = this.state.mode;
                }
            });
            $scope.addEventListener('keyup', (e) => {
                var _a, _b, _c;
                Object.keys((_c = (_b = (_a = this.props.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.queries) !== null && _c !== void 0 ? _c : {})
                    .reverse()
                    .map((query, i) => {
                    if (e.key === `${i + 1}`) {
                        this._activateMedia(query);
                    }
                });
                if (e.key === '§') {
                    $documents.forEach(($document) => {
                        var _a, _b;
                        (_b = (_a = $document.body) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove('s-carpenter--preview');
                    });
                    // restore mode
                    this._setMode(currentMode);
                }
                else if (e.key === 'i') {
                    this._setMode('insert');
                }
                else if (e.key === 'e') {
                    this._setMode('edit');
                }
                else if (e.key === 'm') {
                    this._setMode('move');
                }
            });
        });
    }
    /**
     * Register some mouse "shortcuts"
     */
    _registerMouseShortcutsInWebsite() {
        __querySelectorLive('[s-node]', ($node) => {
            $node.parentNode.addEventListener('dblclick', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this._edit(this._preselectedNode.uid);
            });
        }, {
            rootNode: this._$websiteDocument,
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
        __injectStyle(`
            body::-webkit-scrollbar {
                width: 2px;
                height: 2px;
            }
            body::-webkit-scrollbar-track {                
                background-color: hsla(calc(var(--s-color-accent-h, 0) + var(--s-color-accent-spin ,0)),calc((var(--s-color-accent-s, 0)) * 1%),calc((var(--s-color-accent-l, 0)) * 1%),0.1);                                        
            }
            body::-webkit-scrollbar-thumb {
                background-color: hsla(calc(var(--s-color-accent-h, 0) + var(--s-color-accent-spin ,0)),calc((var(--s-color-accent-s, 0)) * 1%),calc((var(--s-color-accent-l, 0)) * 1%),var(--s-color-accent-a, 1));            
            }
            .s-wireframe body::-webkit-scrollbar-track{
                background-color: rgba(0,0,0,0.05);
            }  
            ${__websiteUiCss}  
        `, {
            rootNode: this._$websiteDocument.body,
        });
        // create the toolbar element
        this._initToolbar();
        this._initToolbarPositioning();
        // listen for toolbar actions
        this._listenToolbarActions();
        // watch for hover on carpenter elements
        this._initMoveMode();
        // prevent default links behaviors
        this._preventExternalLinksBehaviors();
        // // add a "container" in the s-root element if it is empty
        // const $root = this._$websiteDocument.querySelector('[s-root]');
        // if (!$root) {
        //     throw new Error(
        //         `<red>[SCarpenter]</red> in order to work, the SCarpenter editor need an element with the "s-root" attribute on it. This element represent where your nodes are going to be rendered`,
        //     );
        // }
        // if (!$root.children.length) {
        //     $root.setAttribute('s-container', 'root');
        // }
        // listen for click on links in the iframe to close the editor
        this._$websiteDocument.addEventListener('click', (e) => {
            let $link = e.target;
            if (e.target.tagName !== 'A') {
                $link = __traverseUp(e.target, ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'));
            }
            if (!$link) {
                return;
            }
            if ($link.hasAttribute('target') &&
                $link.getAttribute('target') === '_blank') {
                return;
            }
            // close the editor
            this._closeEditor();
        });
        if (this.props.escape) {
            __escapeQueue(() => {
                this._closeEditor();
            }, {
                rootNode: this._$websiteDocument,
            });
        }
        // mode
        this._setMode(this.state.mode);
    }
    /**
     * Update the current page from the website HTML
     */
    _updateCarpenterPage() {
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
    _updateCarpenterNodesStack() {
        // reset stack
        this._nodesStack = {};
        // search for elements
        const $nodes = this._$websiteDocument.querySelectorAll('[s-node][s-specs]');
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
        __querySelectorLive('a[href]:not([target="_blank"])', ($link) => {
            $link.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
        }, {
            rootNode: this._$websiteDocument,
        });
    }
    _updateUiPlaceholders() {
        if (!this._$uiPlaceholders) {
            this._$uiPlaceholders = document.createElement('div');
            this._$uiPlaceholders.classList.add('s-carpenter_ui-placeholders', 'active');
            let outTimeout, isActive = false;
            this._$uiPlaceholders.addEventListener('pointerover', (e) => {
                if (isActive)
                    return;
                isActive = true;
                clearTimeout(outTimeout);
                this._$editorIframe.classList.add('active');
                this._$uiPlaceholders.classList.remove('active');
            });
            this._$editorDocument
                .querySelector('.s-carpenter_editor-bkg')
                .addEventListener('pointerover', (e) => {
                if (!isActive)
                    return;
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
                    var _a, _b;
                    (_b = (_a = $ui._placeholder) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
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
    _init() {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
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
            (_b = (_a = $html.querySelector('s-carpenter')) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_d = (_c = $html.querySelector('.s-carpenter_editor-iframe')) === null || _c === void 0 ? void 0 : _c.remove) === null || _d === void 0 ? void 0 : _d.call(_c);
            // prepend the website iframe in the body
            this._$websiteDocument.body.prepend(this._$websiteIframe);
            // wait until the iframe is ready
            yield __whenIframeReady(this._$websiteIframe);
            // injecting the whole website into the iframe
            __injectIframeContent(this._$websiteIframe, $html.documentElement.innerHTML);
            // listen when the iframe is loaded to init correctly the
            // carpenter stuffs like _websiteWindow, _$websiteDocument, etc...
            this._$websiteIframe.addEventListener('load', (e) => __awaiter(this, void 0, void 0, function* () {
                var _e, _f;
                // clean the root document body
                this._cleanRootDocument();
                // reset the loading state
                this.state.loadingStack = {};
                this.state.status.loading = false;
                // reset the toolbar
                this._$toolbar = null;
                // reset state
                this._preselectedNode = null;
                // wait until iframe is ready
                yield __whenIframeReady(this._$websiteIframe);
                // reset the _window and _$websiteDocument references
                this._websiteWindow = this._$websiteIframe.contentWindow;
                this._$websiteDocument =
                    this._$websiteIframe.contentWindow.document;
                // define the filtrable input for the add component
                this._defineAddComponentFiltrableInput();
                // remove the "s-carpenter" in the iframe
                (_f = (_e = this._$websiteDocument.querySelector('s-carpenter')) === null || _e === void 0 ? void 0 : _e.remove) === null || _f === void 0 ? void 0 : _f.call(_e);
                // register shortcuts in the website iframe
                this._registerKeyboardShortcuts(this._$websiteDocument);
                // register mouse shortcuts like double-click on nodes, etc...
                this._registerMouseShortcutsInWebsite();
                // init the interactivity in the website iframe
                this._initWebsiteIframeContent();
                // "auto-edit" property
                if (this.props.autoEdit) {
                    // get the first element in the iframe
                    const $firstNode = this._$websiteDocument.querySelector('[s-node][s-specs]');
                    if ($firstNode) {
                        const uid = $firstNode.getAttribute('s-node');
                        yield this._setCurrentNode(uid);
                        this._edit();
                    }
                }
                // show the iframe again (just to avoid weird visual effects...)
                this._$websiteIframe.style.opacity = 1;
                // resolve only if is the first init
                resolve();
            }));
            // wait until the iframe is ready
            yield __whenIframeReady(this._$websiteIframe);
        }));
    }
    /**
     * Clean root document body
     */
    _cleanRootDocument() {
        // empty the document of all the nodes
        // unless the iframes
        ['body'].forEach((container) => {
            Array.from(this._$rootDocument.querySelectorAll(`${container} > *`)).forEach((node) => {
                var _a, _b, _c, _d;
                if (((_b = (_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'iframe' ||
                    ((_d = (_c = node.tagName) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 's-carpenter') {
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
        var _a;
        const items = [], itemsByCategories = {};
        for (let [specs, specsObj] of Object.entries((_a = this._specs) !== null && _a !== void 0 ? _a : {})) {
            if (!specsObj.category) {
                _console.log(`<red>[SCarpenter]</red> Your "${specs}" specs does not specify any "category". It will be ignored...`);
                continue;
            }
            // take in consideration ONLY the categories that are specified in the "categories" props
            if (!this.props.categories[specsObj.category]) {
                continue;
            }
            if (!itemsByCategories[specsObj.category]) {
                itemsByCategories[specsObj.category] = [];
            }
            itemsByCategories[specsObj.category].push({
                title: specsObj.title,
                description: specsObj.description,
                category: specsObj.category,
                preview: specsObj.preview,
                specs,
            });
            items.push({
                title: specsObj.title,
                description: specsObj.description,
                category: specsObj.category,
                preview: specsObj.preview,
                specs,
            });
        }
        __querySelectorLive('s-carpenter-app-add-component', ($elm) => {
            $elm.addEventListener('s-filtrable-input.select', (e) => __awaiter(this, void 0, void 0, function* () {
                // get a proper uniqid
                const nodeMetas = yield this._ask('nodeMetas', {
                    prefix: `${e.detail.item.specs.split('.').pop()}`,
                    image: {
                        url: e.detail.item.preview,
                    },
                });
                // add the component
                this._addComponent({
                    uid: nodeMetas.uid,
                    specs: e.detail.item.specs,
                    $after: __traverseUp(e.target, ($elm) => $elm.classList.contains('s-carpenter-app_website-add-component')),
                });
            }));
        }, {
            rootNode: this._$websiteDocument,
        });
        __SFiltrableInputComponent({
            mountWhen: 'interact',
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
                            return html `
                                    <div class="_item _item-category">
                                        <div class="_icon">
                                            ${unsafeHTML(item.icon)}
                                        </div>
                                        <div class="_metas">
                                            <h3 class="_title">
                                                ${unsafeHTML(item.title)}
                                            </h3>
                                            <p class="_description">
                                                ${item.description}
                                            </p>
                                        </div>
                                    </div>
                                `;
                            break;
                        default:
                            return html `
                                    <div class="_item _item-component">
                                        <div class="_preview">
                                            ${item.preview
                                ? html `
                                                      <img
                                                          src="${item.preview}?v=${__uniqid()}"
                                                      />
                                                  `
                                : html `
                                                      ${unsafeHTML(this.props
                                    .noPreviewIcon)}
                                                  `}
                                        </div>
                                        <div class="_metas">
                                            <h3 class="_title">
                                                ${unsafeHTML(item.title)}
                                            </h3>
                                            <span class="_description"
                                                >${unsafeHTML(item.description)}</span
                                            >
                                        </div>
                                    </div>
                                `;
                            break;
                    }
                }
            },
            searchValudPreprocess(value) {
                return value.replace(/^\/[a-zA-Z0-9]+\s?/, '');
            },
            items: ({ value }) => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d, _e, _f, _g, _h;
                if (!value) {
                    const categoriesItems = [];
                    for (let [category, itemsInThisCategory,] of Object.entries(itemsByCategories !== null && itemsByCategories !== void 0 ? itemsByCategories : {})) {
                        categoriesItems.push({
                            title: (_c = (_b = this.props.categories[category]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : __upperFirst(category),
                            description: (_e = (_d = this.props.categories[category]) === null || _d === void 0 ? void 0 : _d.description) !== null && _e !== void 0 ? _e : '',
                            icon: (_g = (_f = this.props.categories[category]) === null || _f === void 0 ? void 0 : _f.icon) !== null && _g !== void 0 ? _g : '',
                            type: 'category',
                            value: `/${category} `,
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
                let filteredItems = items;
                if (value.match(/^\/[a-zA-Z0-9]+/)) {
                    const category = (_h = value
                        .trim()
                        .match(/^\/([a-zA-Z0-9]+)/)) === null || _h === void 0 ? void 0 : _h[1];
                    if (category && itemsByCategories[category]) {
                        filteredItems = itemsByCategories[category];
                    }
                }
                return filteredItems;
            }),
        }, 's-carpenter-app-add-component', {
            window: this._websiteWindow,
        });
    }
    /**
     * Check if the current mode is the same as the passed one
     */
    isMode(mode) {
        return this.state.mode === mode;
    }
    /**
     * Set the edit/insert mode
     */
    _setMode(mode) {
        var _a, _b;
        // protect agains switchingg to a none authorized mode
        if (!this.props.features.node[mode]) {
            return;
        }
        // apply the mode on the website body inside the iframe
        const $bodies = [
            (_a = this._$editorDocument) === null || _a === void 0 ? void 0 : _a.body,
            (_b = this._$websiteDocument) === null || _b === void 0 ? void 0 : _b.body,
            this._$rootDocument.body,
        ];
        $bodies.forEach(($body) => {
            var _a, _b;
            (_a = $body === null || $body === void 0 ? void 0 : $body.classList) === null || _a === void 0 ? void 0 : _a.remove(`s-carpenter--${this.state.mode}`);
            (_b = $body === null || $body === void 0 ? void 0 : $body.classList) === null || _b === void 0 ? void 0 : _b.add(`s-carpenter--${mode}`);
        });
        // set the mode in state
        this.state.mode = mode;
    }
    /**
     * Get the SCarpenterElement instance from a standard HTMLElement
     */
    getElementFromDomNode($node) {
        return this._nodesStack[$node.children[0].getAttribute('s-node')];
    }
    /**
     * Add a component into a container
     */
    _addComponent(specs) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const uid = (_a = specs.uid) !== null && _a !== void 0 ? _a : __uniqid();
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
            yield this._setCurrentNode(uid);
            yield this.applyComponent();
            if (specs.specs.includes('layout')) {
                yield __layoutNodeHook.add({
                    node: this._currentNode,
                });
            }
            // open the editor
            this._edit();
            // save component
            yield this._currentNode.save();
            // save the page
            yield this._savePage();
        });
    }
    applyComponent(values) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._currentNode.setValues(values);
            this.requestUpdate();
        });
    }
    /**
     * Listen for specs editor events like save, change, etc...
     */
    _listenSpecsEditorEvents() {
        // listen for save
        this.addEventListener('s-specs-editor.ready', (e) => __awaiter(this, void 0, void 0, function* () {
            // store the specs editor reference
            this._$specsEditor = e.target;
        }));
        // listen for save
        this.addEventListener('s-specs-editor.save', (e) => __awaiter(this, void 0, void 0, function* () {
            this._currentNode.save();
        }));
        // listen for actual updated
        this.addEventListener('s-specs-editor.change', (e) => __awaiter(this, void 0, void 0, function* () {
            // apply the component
            this.applyComponent(e.detail.values);
        }));
        // listen for media change in the specs editor
        this.addEventListener('s-specs-editor.changeMedia', (e) => {
            // change the media internaly
            this._activateMedia(e.detail);
        });
    }
    _solidColorImage(color, width, height) {
        const drawingCanvas = document.createElement('canvas');
        let context = drawingCanvas.getContext('2d');
        context.canvas.width = width;
        context.canvas.height = height;
        let pixSize = 1;
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                context.fillStyle = color; // assumes the data is in #hex format already.
                context.fillRect(j * pixSize, i * pixSize, pixSize, pixSize);
            }
        }
        drawingCanvas.style.position = 'absolute';
        drawingCanvas.style.left = '200vw';
        return drawingCanvas;
    }
    _removeAllDragClasses() {
        var _a, _b, _c;
        // remove all drag classes
        Array.from((_a = this._$websiteDocument.querySelectorAll('[s-container]')) !== null && _a !== void 0 ? _a : []).forEach(($cont) => {
            $cont.classList.remove('drag-over');
        });
        // all classes on the bodies
        const $bodies = [
            (_b = this._$editorDocument) === null || _b === void 0 ? void 0 : _b.body,
            (_c = this._$websiteDocument) === null || _c === void 0 ? void 0 : _c.body,
            this._$rootDocument.body,
        ];
        $bodies.forEach(($body) => {
            $body.classList.remove('s-carpenter--drag');
        });
    }
    /**
     * Watch hover on specs element to position the toolbar
     */
    _initMoveMode() {
        let $draggedElm;
        __querySelectorLive('[s-container]', ($container) => {
            $container.addEventListener('dragover', (e) => {
                if (!this.isMode('move')) {
                    return;
                }
                e.stopPropagation();
                e.preventDefault();
                $container.classList.add('drag-over');
            });
            $container.addEventListener('dragover', (e) => {
                if (!this.isMode('move')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
            });
            $container.addEventListener('dragleave', (e) => {
                if (!this.isMode('move')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                $container.classList.remove('drag-over');
            });
            $container.addEventListener('drop', (e) => {
                if (!this.isMode('move')) {
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                // remove all drag classes
                this._removeAllDragClasses();
                // remove drag classes
                $draggedElm === null || $draggedElm === void 0 ? void 0 : $draggedElm.classList.remove('drag');
                e.currentTarget.appendChild($draggedElm);
            });
        }, {
            rootNode: this._$websiteDocument.body,
        });
        __querySelectorLive(`[s-node][s-specs]`, ($node) => {
            // get the parent element that is actually the
            // element to move
            const $elm = $node.parentNode;
            // add node class
            $elm.classList.add(this.utils.cls('_node'));
            $elm.setAttribute('draggable', 'true');
            let $preview;
            $preview = document.createElement('div');
            $preview.classList.add(this.utils.cls('_drag-preview'));
            $elm.addEventListener('dragstart', (e) => {
                var _a, _b;
                // only in move mode
                if (!this.isMode('move')) {
                    e.preventDefault();
                    return;
                }
                // stop the propagation
                e.stopPropagation();
                // set the dragged element
                $draggedElm = $elm;
                // add drag classes
                $elm.classList.add('drag');
                const $bodies = [
                    (_a = this._$editorDocument) === null || _a === void 0 ? void 0 : _a.body,
                    (_b = this._$websiteDocument) === null || _b === void 0 ? void 0 : _b.body,
                    this._$rootDocument.body,
                ];
                $bodies.forEach(($body) => {
                    $body.classList.add('s-carpenter--drag');
                });
                // create the preview
                const bounds = $elm.getBoundingClientRect();
                $preview.style.width = `${bounds.width}px`;
                $preview.style.height = `${bounds.height}px`;
                document.body.appendChild($preview);
                e.dataTransfer.setDragImage($preview, e.clientX - bounds.left, e.clientY - bounds.top);
            });
            $elm.addEventListener('drop', (e) => {
                var _a;
                // only in move mode
                if (!this.isMode('move')) {
                    return;
                }
                e.stopPropagation();
                e.preventDefault();
                // remove drag classes
                $draggedElm.classList.remove('drag');
                // remove all the drag related classes
                e.currentTarget.classList.remove('drag-x-before', 'drag-x-after', 'drag-y-before', 'drag-y-after');
                // check the mouse position over the element
                const bounds = $elm.getBoundingClientRect();
                // if (e.clientX - bounds.left > bounds.width * 0.5) {
                //     $elm.classList.remove('drag-x-before');
                //     $elm.classList.add('drag-x-after');
                // } else {
                //     $elm.classList.add('drag-x-before');
                //     $elm.classList.remove('drag-x-after');
                // }
                if (e.clientY - bounds.top > bounds.height * 0.5) {
                    e.currentTarget.after($draggedElm);
                }
                else {
                    e.currentTarget.before($draggedElm);
                }
                // remove all drag classes
                this._removeAllDragClasses();
                // remove the preview
                (_a = $preview.remove) === null || _a === void 0 ? void 0 : _a.call($preview);
            });
            $elm.addEventListener('dragend', (e) => {
                // only in move mode
                if (!this.isMode('move')) {
                    return;
                }
                // stop propagation
                e.stopPropagation();
                e.preventDefault();
            });
        }, {
            rootNode: this._$websiteDocument.body,
        });
    }
    /**
     * Watch hover on specs element to position the toolbar
     */
    _initToolbarPositioning() {
        __querySelectorLive(`[s-node][s-specs]`, ($node) => {
            // get the parent element that is actually the
            // element to move
            const $elm = $node.parentNode;
            $elm.addEventListener('pointerover', (e) => {
                var _a;
                // add hover class
                $elm.classList.add('hover');
                e.stopPropagation();
                const element = this.getElementFromDomNode(e.currentTarget);
                // do nothing more if already activated
                if (element.uid === ((_a = this._preselectedNode) === null || _a === void 0 ? void 0 : _a.uid)) {
                    return;
                }
                // position toolbar
                this._setToolbarTitleAndPosition($elm, __upperFirst(element.specs.split('.').pop()));
                // set the "pre" activate element
                this._preselectedNode = element;
            });
            $elm.addEventListener('pointerout', (e) => {
                // remove hover class
                $elm.classList.remove('hover');
            });
        }, {
            rootNode: this._$websiteDocument.body,
        });
    }
    /**
     * Handle "scrolled" class on the editor
     */
    _handleScrolledClassOnEditor() {
        __querySelectorLive(`.${this.utils.cls('_editor-wrapper')}`, ($wrapper) => {
            $wrapper.addEventListener('scroll', (e) => {
                if (Math.abs($wrapper.scrollTop) >= 100) {
                    this._$editor.classList.add('scrolled');
                }
                else {
                    this._$editor.classList.remove('scrolled');
                }
            });
        });
    }
    /**
     * Check if editor is opened
     */
    isEditorOpen() {
        return document.body.classList.contains('s-carpenter--open');
    }
    /**
     * open the editor
     */
    _openEditor() {
        var _a;
        document.body.classList.add('s-carpenter--open');
        (_a = this._$editorIframe) === null || _a === void 0 ? void 0 : _a.classList.add('s-carpenter--open');
        this._$rootDocument.body.classList.add('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
        __escapeQueue(() => {
            this._closeEditor();
        }, {
            id: 'closeEditor',
        });
    }
    /**
     * close the editor
     */
    _closeEditor() {
        var _a;
        document.body.classList.remove('s-carpenter--open');
        (_a = this._$editorIframe) === null || _a === void 0 ? void 0 : _a.classList.remove('s-carpenter--open');
        this._$rootDocument.body.classList.remove('s-carpenter--open');
        setTimeout(() => {
            this._updateUiPlaceholders();
        }, 400);
    }
    /**
     * Create the toolbar element
     */
    _initToolbar() {
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add(this.utils.cls('_toolbar'));
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;
        const html = [];
        html.push(`
            <div class="_title"></div>
        `);
        if (this.props.features.node.save) {
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
        if (this.props.features.node.delete) {
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
        this._$toolbar.addEventListener('pointerup', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const action = e.target.getAttribute('s-carpenter-app-action');
            if (e.target.needConfirmation) {
                return;
            }
            switch (action) {
                case 'edit':
                    (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
                    this._edit((_c = this._preselectedNode) === null || _c === void 0 ? void 0 : _c.uid);
                    break;
                case 'save':
                    (_d = this._preselectedNode) === null || _d === void 0 ? void 0 : _d.save();
                    break;
                case 'delete':
                    (_e = this._preselectedNode) === null || _e === void 0 ? void 0 : _e.delete();
                    break;
            }
        }));
    }
    /**
     * Edit an item
     */
    _edit(uid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!uid && !this._preselectedNode) {
                return;
            }
            // set the current element
            if (uid && uid !== ((_a = this._currentNode) === null || _a === void 0 ? void 0 : _a.uid)) {
                yield this._setCurrentNode(uid);
            }
            // open the editor
            this._openEditor();
            // request new UI update
            this.requestUpdate();
        });
    }
    /**
     * Activate the element when toolbar has been clicked
     */
    _setCurrentNode(uid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!uid) {
                throw new Error(`<red>[SCarpenter]</red> Cannot call _setCurrentNode without any args...`);
            }
            if (!this._nodesStack[uid]) {
                throw new Error(`<red>[SCarpenter]</red> The passed "${uid}" does not exists in the elements stacks...`);
            }
            // do not activate 2 times the same element
            if (((_a = this._currentNode) === null || _a === void 0 ? void 0 : _a.uid) === uid) {
                return;
            }
            // remove the preselected element
            this._preselectedNode = null;
            this._currentNode = null;
            // force UI to refresh
            this.requestUpdate();
            yield __wait();
            // set the current element
            this._currentNode = this._nodesStack[uid];
            yield this._currentNode.getData();
            yield __wait(200);
            this.requestUpdate();
        });
    }
    /**
     * Set the toolbar position
     */
    _setToolbarTitleAndPosition($from, title = '') {
        const targetRect = $from.getBoundingClientRect();
        this._$toolbar.style.top = `${(targetRect.top < 100 ? 100 : targetRect.top) +
            this._websiteWindow.scrollY}px`;
        let left = targetRect.left + targetRect.width + this._websiteWindow.scrollX;
        if (this.isEditorOpen() &&
            left >= this._$rootDocument.documentElement.clientWidth - 400) {
            left -= 500;
        }
        else if (targetRect.left + targetRect.width >=
            this._$rootDocument.documentElement.clientWidth - 50) {
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
    getStatus(of, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.props.endpoints[`${of}s`]
                .replace('%base', this.props.endpoints.base)
                .replace('%uid', uid)}/status`, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            });
            return yield response.json();
        });
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
        const width = `${this._media.queries[this.state.activeMedia].maxWidth
            ? `${(this._media.queries[this.state.activeMedia].maxWidth /
                100) *
                75}px`
            : '100vw'}`;
        this._$websiteViewport.style.setProperty('--s-carpenter-viewport-width', width);
    }
    /**
     * Change page with the dotpath
     */
    _changePage(specs, pushState = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // update the loading state
            this.state.loadingStack[specs] = true;
            this.state.status.loading = true;
            // change the iframe source
            this._$websiteIframe.src = this.props.pagesUrl.replace('%specs', specs);
            // save arrival state
            if (pushState) {
                this._rootWindow.history.pushState({
                    specs,
                }, document.title, this.props.pagesUrl.replace('%specs', specs));
            }
            // update UI
            this.requestUpdate();
        });
    }
    _toggleNavigationFolder(folderId) {
        if (this.state.activeNavigationFolders.includes(folderId)) {
            this.state.activeNavigationFolders.splice(this.state.activeNavigationFolders.indexOf(folderId), 1);
        }
        else {
            this.state.activeNavigationFolders.push(folderId);
        }
        this.requestUpdate();
    }
    /**
     * Render an error
     */
    _renderError(error) {
        return html `
            <div class="${this.utils.cls('_error')}">
                <p class="_text">${error}</p>
            </div>
        `;
    }
    /**
     * Render the "scope selector"
     */
    _renderScopeSelector(callback) {
        let selectedScope = Object.keys(this._scopes)[0];
        return html `
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
                        ${Object.keys(this._scopes).map((scope) => html `
                                <option id="${scope}" value="${scope}">
                                    ${this._scopes[scope].name} |
                                    ${this._scopes[scope].description}
                                </option>
                            `)}
                    </select>
                </label>
                <label class="s-label">
                    <span></span>
                    <button
                        class="s-btn s-color:accent"
                        @pointerup=${(e) => {
            var _a;
            callback === null || callback === void 0 ? void 0 : callback(selectedScope);
            (_a = this._askCallback) === null || _a === void 0 ? void 0 : _a.call(this, selectedScope);
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
    _renderPageMetasForm(callback) {
        var _a, _b, _c, _d, _e, _f, _g;
        return html `
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
            this._askData.slug = `/${__urlCompliant(e.target.value)}`;
            this._askData.uid = __idCompliant(this._askData.name);
            this._askErrors = {};
            this.requestUpdate();
        }}
                    />
                    ${((_a = this._askErrors) === null || _a === void 0 ? void 0 : _a.name)
            ? html ` ${this._renderError(this._askErrors.name)} `
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
                        .value=${(_b = this._askData.slug) !== null && _b !== void 0 ? _b : ''}
                        value="${(_c = this._askData.slug) !== null && _c !== void 0 ? _c : ''}"
                        placeholder="${this.props.i18n.newPageSlugPlaceholder}"
                        @change=${(e) => {
            this._askData.slug = e.target.value;
            this._askData.slug = __urlCompliant(this._askData.slug);
            delete this._askErrors.slug;
            this.requestUpdate();
        }}
                    />
                    ${((_d = this._askErrors) === null || _d === void 0 ? void 0 : _d.slug)
            ? html ` ${this._renderError(this._askErrors.slug)} `
            : ''}
                </label>
                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.newPageUidLabel}</span>
                    <input
                        type="text"
                        class="s-input"
                        maxlength="100"
                        .value=${(_e = this._askData.uid) !== null && _e !== void 0 ? _e : ''}
                        value="${(_f = this._askData.uid) !== null && _f !== void 0 ? _f : ''}"
                        placeholder="${this.props.i18n.newPageUidPlaceholder}"
                        @change=${(e) => {
            this._askData.uid = __idCompliant(e.target.value);
            delete this._askErrors.uid;
            this.requestUpdate();
        }}
                    />
                    ${((_g = this._askErrors) === null || _g === void 0 ? void 0 : _g.uid)
            ? html ` ${this._renderError(this._askErrors.uid)} `
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
                        @pointerup=${(e) => __awaiter(this, void 0, void 0, function* () {
            var _h;
            const createResult = yield this._createPage(this._askData);
            if (createResult.error) {
                this._askErrors.uid = createResult.error;
                this.requestUpdate();
            }
            else {
                callback === null || callback === void 0 ? void 0 : callback(this._askData);
                (_h = this._askCallback) === null || _h === void 0 ? void 0 : _h.call(this, this._askData);
            }
        })}
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
    _renderNodeMetasForm(callback) {
        var _a, _b, _c;
        return html `
            <div class="${this.utils.cls('_node-metas-form')}">
                <h1 class="s-typo:h1 s-mbe:30">
                    ${this.props.i18n.newNodeTitle}
                </h1>

                <p class="s-typo:p s-mbe:30">
                    ${this.props.i18n.newNodeDescription}
                </p>

                <label class="s-label:block s-mbe:30">
                    <span>${this.props.i18n.newNodeUidLabel}</span>
                    <div class="s-input-container:group">
                        <div class="s-btn s-color:complementary">
                            ${this._askData.prefix.trim().replace(/s$/, '')}-
                        </div>
                        <input
                            type="text"
                            class="s-input"
                            maxlength="100"
                            autofocus
                            required
                            .value=${(_a = this._askData.uid) !== null && _a !== void 0 ? _a : ''}
                            value="${(_b = this._askData.uid) !== null && _b !== void 0 ? _b : ''}"
                            placeholder="${this.props.i18n
            .newNodeUidPlaceholder}"
                            @keyup=${__debounce(200, (e) => __awaiter(this, void 0, void 0, function* () {
            if (!e.target.value) {
                this._askErrors.uid =
                    this.props.i18n.newNodeUidRequired;
                return this.requestUpdate();
            }
            this._askData.uid = __idCompliant(e.target.value);
            const nodeStatus = yield this.getStatus('node', this._askData.uid);
            if (nodeStatus.exists) {
                this._askErrors.uid =
                    this.props.i18n.newNodeUidAlreadyTaken;
            }
            else {
                delete this._askErrors.uid;
            }
            this.requestUpdate();
        }))}
                        />
                    </div>
                    ${((_c = this._askErrors) === null || _c === void 0 ? void 0 : _c.uid)
            ? html ` ${this._renderError(this._askErrors.uid)} `
            : ''}
                </label>
                <label class="s-label">
                    <span></span>
                    <button
                        class="s-btn s-color:accent"
                        ?disabled=${!this._askData.uid || this._askErrors.uid}
                        @pointerup=${(e) => __awaiter(this, void 0, void 0, function* () {
            var _d;
            // add the "category" prefix
            this._askData.uid = `${this._askData.prefix.replace(/s$/, '')}-${__idCompliant(this._askData.uid)}`;
            // confirm the uid
            callback === null || callback === void 0 ? void 0 : callback(this._askData);
            (_d = this._askCallback) === null || _d === void 0 ? void 0 : _d.call(this, this._askData);
        })}
                    >
                        ${this.props.i18n.newNodeButton}
                    </button>
                </label>
            </div>
        `;
    }
    _createPage(pageMetas) {
        return __awaiter(this, void 0, void 0, function* () {
            // set loading state
            this.state.status.loading = true;
            // send the new page request
            const response = yield fetch(this.props.endpoints.pages
                .replace('%base', this.props.endpoints.base)
                .replace('%uid', pageMetas.uid), {
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
            });
            const result = yield response.json();
            // set loading state
            this.state.status.loading = false;
            return result;
        });
    }
    _ask(what, initialData = {}) {
        this._askErrors = {};
        this._askData = initialData;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
        }));
    }
    /**
     * This method will create a new page
     */
    newPage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let scope;
            // ask for the "scope" if the scope feature is enabled
            if (this.props.features.scopes &&
                Object.keys((_a = this._scopes) !== null && _a !== void 0 ? _a : {}).length) {
                // ask for the page scope
                scope = yield this._ask('scope', {
                    image: {
                        url: 'https://picsum.photos/600/600?v=scope',
                    },
                });
            }
            const result = yield this._ask('pageMetas', {
                image: {
                    url: 'https://picsum.photos/600/600?v=pageMetas',
                },
                scope,
            });
            _console.log('COCO', result);
        });
    }
    /**
     * This method takes all the content from the page and save it through the adapter(s)
     * by respecting the ISPage interface available in the @specim3n/types package.
     */
    _savePage() {
        return __awaiter(this, void 0, void 0, function* () {
            // go grab all the s-container elements in the website
            const $nodes = this._$websiteDocument.querySelectorAll('[s-container], [s-node][s-specs]');
            if (!$nodes) {
                return;
            }
            // update status
            this.state.status.savingPage = true;
            const data = {
                uid: this._page.uid,
                name: this._page.name,
                scope: this._page.scope,
                slug: this._page.slug,
                type: 'page',
                nodes: [],
            }, flatData = {};
            Array.from($nodes).forEach(($node) => {
                var _a, _b;
                const nodeUid = (_a = $node.getAttribute('s-container')) !== null && _a !== void 0 ? _a : $node.getAttribute('s-node');
                flatData[nodeUid] = {
                    uid: nodeUid,
                };
                if ($node.getAttribute('s-node')) {
                    flatData[nodeUid].type = 'node';
                }
                else if ($node.getAttribute('s-container')) {
                    flatData[nodeUid].type = 'container';
                }
                else {
                    flatData[nodeUid].type = 'unknown';
                }
                const $belong = __traverseUp($node, ($elm) => {
                    var _a;
                    if ($node.tagName === 'TEMPLATE' &&
                        $node.parentElement === $elm) {
                        return;
                    }
                    if ($elm.hasAttribute('s-container')) {
                        return true;
                    }
                    if ((_a = $elm.children[0]) === null || _a === void 0 ? void 0 : _a.hasAttribute('s-node')) {
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
                const belongId = (_b = $belong.getAttribute('s-container')) !== null && _b !== void 0 ? _b : $belong.children[0].getAttribute('s-node');
                if (!belongId) {
                    throw new Error('<red>[SCarpenter]</red> The component logged bellow does not have any "s-container" id or any "id" attribute...');
                }
                if (!flatData[belongId].nodes) {
                    flatData[belongId].nodes = [];
                }
                flatData[belongId].nodes.push(flatData[nodeUid]);
            });
            const response = yield fetch(this.props.endpoints.pages
                .replace('%base', this.props.endpoints.base)
                .replace('%uid', data.uid), {
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
            // update status
            this.state.status.savingPage = 'success';
            setTimeout(() => {
                this.state.status.savingPage = false;
            }, 1000);
        });
    }
    /**
     * Grab the data depending on the passed source.
     * Can be a url where to fetch the data or an id pointing to an HTMLTemplateElement that
     * store the JSON data
     */
    _getData(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                if (source.startsWith('{')) {
                    data = JSON.parse(source);
                }
                else if (source.startsWith('/') ||
                    source.match(/^https?\:\/\//)) {
                    data = yield fetch(source).then((response) => response.json());
                }
                else {
                    const $template = document.querySelector(`template#${source}, template${source}`);
                    if ($template) {
                        // @ts-ignore
                        data = JSON.parse($template.content.textContent);
                    }
                }
            }
            catch (e) { }
            // warn if no data
            if (!data) {
                throw new Error(`[SCarpenterAppComponent] The passed source "${source}" does not provide any valid data...`);
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
                    if (type)
                        return;
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
        });
    }
    _carpenterLogo() {
        return html `
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        return html `
            ${this.props.sidebar
            ? html `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>
                      </nav>
                  `
            : ''}

            <nav
                class="${this.utils.cls('_editor')} ${this._currentNode
            ? 'active'
            : ''}"
                s-carpenter-ui
            >
                ${!this.state.status.loading && ((_b = (_a = this._currentNode) === null || _a === void 0 ? void 0 : _a.isReady) === null || _b === void 0 ? void 0 : _b.call(_a))
            ? html `
                          <div class="${this.utils.cls('_editor-wrapper')}">
                              <s-specs-editor
                                  uid="${this._currentNode.uid}"
                                  media="${this.state.activeMedia}"
                                  default-media="${this.props.defaultMedia}"
                                  .source=${this._currentNode.source}
                                  .specs=${this._currentNode.specsObj}
                                  .values=${this._currentNode.values}
                                  .frontspec=${(_c = this.props.frontspec) !== null && _c !== void 0 ? _c : {}}
                                  @s-specs-editor.error=${(e) => {
                this._isSpecsEditorValid = false;
                this.requestUpdate();
            }}
                                  @s-specs-editor.valid=${(e) => {
                this._isSpecsEditorValid = true;
                this.requestUpdate();
            }}
                              >
                              </s-specs-editor>
                          </div>
                      `
            : html `
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
                            ${this.props.features.page.create
            ? html `
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

                ${((_e = (_d = this.props.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries)
            ? html `
                          <ul class="${this.utils.cls('_queries')}">
                              ${Object.keys((_h = (_g = (_f = this.props.frontspec) === null || _f === void 0 ? void 0 : _f.media) === null || _g === void 0 ? void 0 : _g.queries) !== null && _h !== void 0 ? _h : {}).map((query, i) => {
                return html `
                                      <li
                                          tabindex="0"
                                          @pointerup=${() => this._activateMedia(query)}
                                          class="s-tooltip-container ${query ===
                    this.state.activeMedia
                    ? 'is-active'
                    : ''} _query"
                                      >
                                          ${unsafeHTML(this.props.icons[query])}
                                          <div class="s-tooltip:right">
                                              ${__upperFirst(query)}
                                              (${Object.keys(this.props.frontspec.media
                    .queries).length - i})
                                          </div>
                                      </li>
                                  `;
            })}
                          </ul>
                      `
            : ''}

                <ul class="${this.utils.cls('_modes')}">
                    <li
                        tabindex="0"
                        @pointerup=${() => {
            this._setMode('edit');
        }}
                        class="s-tooltip-container ${this.state.mode === 'edit'
            ? 'is-active'
            : ''} _mode"
                    >
                        ${unsafeHTML(this.props.icons.edit)}
                        <div class="s-tooltip:right">Edit (e)</div>
                    </li>
                    <li
                        tabindex="0"
                        @pointerup=${() => {
            this._setMode('insert');
        }}
                        class="s-tooltip-container ${this.state.mode ===
            'insert'
            ? 'is-active'
            : ''} _mode"
                    >
                        ${unsafeHTML(this.props.icons.insert)}
                        <div class="s-tooltip:right">Insert (i)</div>
                    </li>
                    <li
                        tabindex="0"
                        @pointerup=${() => {
            this._setMode('move');
        }}
                        class="s-tooltip-container ${this.state.mode === 'move'
            ? 'is-active'
            : ''} _mode"
                    >
                        ${unsafeHTML(this.props.icons.move)}
                        <div class="s-tooltip:right">Move (m)</div>
                    </li>
                </ul>
            </nav>

            ${this._page
            ? html `
                      <div class="${this.utils.cls('_metas')}" s-carpenter-ui>
                          <ol class="breadcrumb">
                              <li class="_item">
                                  <span class="_label">Page</span>
                                  ${this._page.name}
                              </li>
                              ${this._currentNode
                ? html `
                                        <li class="_item">
                                            <span class="_label">Node</span>
                                            ${(_p = (_l = (_k = (_j = this._currentNode.values) === null || _j === void 0 ? void 0 : _j.name) === null || _k === void 0 ? void 0 : _k.value) !== null && _l !== void 0 ? _l : (_o = (_m = this._currentNode.values) === null || _m === void 0 ? void 0 : _m.title) === null || _o === void 0 ? void 0 : _o.value) !== null && _p !== void 0 ? _p : this._currentNode.uid}
                                        </li>
                                    `
                : ''}
                          </ol>
                      </div>
                  `
            : ''}.
            ${this.props.features.page.save
            ? html `
                      <div class="${this.utils.cls('_actions')}" s-carpenter-ui>
                          ${this.props.features.page.save && this._page
                ? html `
                                    <button
                                        ?disabled=${!this._isSpecsEditorValid ||
                    !this._page.isReady()}
                                        class="_save ${this.state.status
                    .savingPage === 'success'
                    ? 'success'
                    : this.state.status.savingPage
                        ? 'loading'
                        : ''}"
                                        @click=${(e) => {
                    if (this.state.status.savingPage) {
                        return;
                    }
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
            ${this.state.status.loading
            ? html `
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
            ? html `
                      <div class="${this.utils.cls('_ask')}" s-carpenter-ui>
                          ${this._askData.image
                ? html `
                                    <figure class="s-media-container">
                                        <img
                                            class="s-media"
                                            src="${this._askData.image.url}"
                                        />
                                    </figure>
                                `
                : ''}
                          <div class="${this.utils.cls('_ask-body')}">
                              ${this._askFor === 'scope'
                ? this._renderScopeSelector()
                : this._askFor === 'pageMetas'
                    ? this._renderPageMetasForm()
                    : this._askFor === 'nodeMetas'
                        ? this._renderNodeMetasForm()
                        : ''}
                          </div>
                      </div>
                  `
            : ''}
        `;
    }
}
SCarpenterAppComponent._registeredAdapters = {
    ajax: {
        node: __SCarpenterNodeAjaxAdapter,
        page: __SCarpenterPageAjaxAdapter,
    },
};
SCarpenterAppComponent.state = {
    activeNavigationFolders: [],
    activeMedia: null,
    isLoading: true,
    loadingStack: {},
    status: {
        loading: true,
        savingPage: false,
    },
    mode: 'edit',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0scUJBQXFCLENBQUM7QUFJbkQsT0FBTywyQkFBMkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLDJCQUEyQixNQUFNLHlDQUF5QyxDQUFDO0FBRWxGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0UsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxnQkFBZ0IsTUFBTSxxQkFBcUIsQ0FBQztBQUVuRCxPQUFPLGdCQUFnQixNQUFNLHdCQUF3QixDQUFDO0FBRXRELE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWhGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFD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