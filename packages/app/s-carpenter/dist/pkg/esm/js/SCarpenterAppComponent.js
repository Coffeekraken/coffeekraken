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
import __SCarpenterPage from './SCarpenterPage';
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
import { __injectStyle, __querySelectorLive, __traverseUp, __whenIframeReady, } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './defineApp';
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
                    delete: this.props.features.delete,
                    upload: this.props.features.upload,
                    save: this.props.features.saveComponent,
                    media: this.props.features.media,
                },
            });
            // if the "scopes" feature is enabled
            if (this.props.features.scopes) {
                yield this._loadScopes();
            }
            // "categories"
            yield this._loadCategories();
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
        });
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
    /**
     * Load the categories
     */
    _loadCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.props.endpoints.categories.replace('%base', this.props.endpoints.base), {
                method: 'GET',
            });
            const categories = yield response.json();
            this._categories = categories;
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
     * Init the containers marked by a "s-container" attribute
     * to allow adding new content into the page
     */
    _initWebsiteContainers() {
        __querySelectorLive('[s-container]', ($elm) => {
            const $container = document.createElement('div');
            $container.classList.add(this.utils.cls('_website-container'));
            const $toolbar = document.createElement('div');
            $toolbar.setAttribute('s-carpenter-website-ui', 'true');
            $toolbar.classList.add(this.utils.cls('_website-container-toolbar'));
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
            rootNode: this._$websiteDocument,
        });
        __querySelectorLive(`[s-container] > *:not(.${this.utils.cls('_website-container')})`, ($child) => {
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
    _registerShortcuts($scope) {
        // "§" key to hide the editor
        $scope.addEventListener('keydown', (e) => {
            var _a, _b;
            if (e.key === '§') {
                (_b = (_a = this._$editorDocument) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.classList.add('s-carpenter--preview');
            }
        });
        $scope.addEventListener('keyup', (e) => {
            var _a, _b;
            if (e.key === '§') {
                (_b = (_a = this._$editorDocument) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.classList.remove('s-carpenter--preview');
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
        __injectStyle(`
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
        `, {
            rootNode: this._$websiteDocument.body,
        });
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
                this.state.isLoading = false;
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
                this._registerShortcuts(this._$websiteDocument);
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
        const items = [];
        for (let [specs, specsObj] of Object.entries((_a = this._specs) !== null && _a !== void 0 ? _a : {})) {
            items.push(Object.assign(Object.assign({}, specsObj), { specs }));
        }
        __querySelectorLive('s-carpenter-app-add-component', ($elm) => {
            $elm.addEventListener('s-filtrable-input.select', (e) => __awaiter(this, void 0, void 0, function* () {
                // get a proper uniqid
                const nodeMetas = yield this._ask('nodeMetas');
                // add the component
                this._addComponent({
                    uid: nodeMetas.uid,
                    specs: e.detail.item.specs,
                    $after: __traverseUp(e.target, ($elm) => $elm.classList.contains('s-carpenter-app_website-container')),
                });
            }));
        }, {
            rootNode: this._$websiteDocument,
        });
        __SFiltrableInputComponent({
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
                            return html `
                                    <div class="_item _item-component">
                                        <h3 class="_title">
                                            ${unsafeHTML(item.title)}
                                        </h3>
                                        <span class="_description"
                                            >${unsafeHTML(item.description)}</span
                                        >
                                    </div>
                                `;
                            break;
                    }
                }
            },
            items: ({ value }) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                if (!value) {
                    const categoriesItems = [];
                    for (let [id, categoryObj] of Object.entries((_b = this._categories) !== null && _b !== void 0 ? _b : {})) {
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
                        if (!category)
                            return true;
                        return item.specs.includes(`.${category}.`);
                    });
                    return filteredItems;
                }
                return items;
            }),
        }, 's-carpenter-app-add-component', {
            window: this._websiteWindow,
        });
    }
    /**
     * Set the edit/insert mode
     */
    _setMode(mode) {
        // apply the mode on the website body inside the iframe
        this._$websiteDocument.body.classList.remove(this.utils.cls(`--${this.state.mode}`));
        this._$websiteDocument.body.classList.add(this.utils.cls(`--${mode}`));
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
            this._edit();
        });
    }
    applyComponent(values) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._currentNode.setValues(values);
            yield this._currentNode.save();
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
    /**
     * Watch hover on specs element to position the toolbar
     */
    _watchHoverOnNodes() {
        __querySelectorLive(`[s-node][s-specs]`, ($node) => {
            // add node class
            $node.parentNode.classList.add(this.utils.cls('_node'));
            $node.parentNode.addEventListener('pointerover', (e) => {
                var _a;
                // add hover class
                e.currentTarget.classList.add('hover');
                e.stopPropagation();
                const element = this.getElementFromDomNode(e.currentTarget);
                // do nothing more if already activated
                if (element.uid === ((_a = this._preselectedNode) === null || _a === void 0 ? void 0 : _a.uid)) {
                    return;
                }
                // position toolbar
                this._setToolbarTitleAndPosition(e.currentTarget, __upperFirst(element.specs.split('.').pop()));
                // set the "pre" activate element
                this._preselectedNode = element;
            });
            $node.parentNode.addEventListener('pointerout', (e) => {
                // remove hover class
                e.currentTarget.classList.remove('hover');
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
        var _a, _b;
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add('s-carpenter-website-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;
        const html = [];
        html.push(`
            <div class="_title"></div>
        `);
        if ((_a = this.props.features) === null || _a === void 0 ? void 0 : _a.saveComponent) {
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
        if ((_b = this.props.features) === null || _b === void 0 ? void 0 : _b.delete) {
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
            // await this._currentNode.getData();
            this.requestUpdate();
        });
    }
    /**
     * Set the toolbar position
     */
    _setToolbarTitleAndPosition($from, title = '') {
        const targetRect = $from.getBoundingClientRect();
        this._$toolbar.style.top = `${targetRect.top + this._websiteWindow.scrollY}px`;
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
            this.state.isLoading = true;
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
                    <input
                        type="text"
                        class="s-input"
                        maxlength="100"
                        autofocus
                        required
                        .value=${(_a = this._askData.uid) !== null && _a !== void 0 ? _a : ''}
                        value="${(_b = this._askData.uid) !== null && _b !== void 0 ? _b : ''}"
                        placeholder="${this.props.i18n.newNodeUidPlaceholder}"
                        @keyup=${__debounce(100, (e) => __awaiter(this, void 0, void 0, function* () {
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
            this.state.isLoading = true;
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
            this.state.isLoading = false;
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
                scope = yield this._ask('scope');
            }
            const result = yield this._ask('pageMetas', {
                scope,
            });
            _console.log('COCO', result);
        });
    }
    /**
     * This method takes all the content from the page and save it through the adapter(s)
     * by respecting the ISPage interface available in the @specimen/types package.
     */
    _savePage() {
        return __awaiter(this, void 0, void 0, function* () {
            // go grab all the s-container elements in the website
            const $nodes = this._$websiteDocument.querySelectorAll('[s-container], [s-node][s-specs]');
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        return html `
            ${this.props.sidebar
            ? html `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>

                          <!-- <div class="${this.utils.cls('_navigation')}">
                              ${!this._data.specsByTypes
                ? html ` <p>Loading...</p> `
                : html `
                                    <ul class="s-fs-tree">
                                        ${Object.keys(this._data.specsByTypes).map((type) => {
                    const specsObj = this._data.specsByTypes[type];
                    return html `
                                                <li
                                                    class="${this.state.activeNavigationFolders.includes(type)
                        ? 'active'
                        : ''}"
                                                >
                                                    <div
                                                        @pointerup=${() => this._toggleNavigationFolder(type)}
                                                    >
                                                        ${this.state.activeNavigationFolders.includes(type)
                        ? html `
                                                                  ${unsafeHTML(this.props
                            .icons
                            .folderOpen)}
                                                              `
                        : html `
                                                                  ${unsafeHTML(this.props
                            .icons
                            .folderClose)}
                                                              `}
                                                        <span tabindex="0"
                                                            >${__upperFirst(type)}</span
                                                        >
                                                    </div>
                                                    <ul class="s-fs-tree">
                                                        ${Object.keys(specsObj).map((dotpath) => {
                        var _a;
                        const specObj = specsObj[dotpath];
                        let last;
                        const checkDotPath = specObj.metas.dotpath
                            .split('.')
                            .filter((p) => {
                            if (last &&
                                p ===
                                    last) {
                                return false;
                            }
                            last =
                                p;
                            return true;
                        })
                            .join('.');
                        return html `
                                                                <li
                                                                    class="_item ${this._$rootDocument.location.href.includes(checkDotPath)
                            ? 'active'
                            : ''}"
                                                                    tabindex="0"
                                                                    @pointerup=${() => this._changePage(specObj
                            .metas
                            .dotpath)}
                                                                >
                                                                    <div>
                                                                        ${this
                            .state
                            .loadingStack[specObj
                            .metas
                            .dotpath]
                            ? html `
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
                            : html `
                                                                                  <i
                                                                                      class="fa-regular fa-file"
                                                                                  ></i>
                                                                              `}
                                                                        <span>
                                                                            ${(_a = specObj.title) !== null && _a !== void 0 ? _a : specObj.name}
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
            ? html `
                          <div class="${this.utils.cls('_editor-wrapper')}">
                              ${((_a = this._currentNode) === null || _a === void 0 ? void 0 : _a.isReady())
                ? html `
                                        <s-specs-editor
                                            uid="${this._currentNode.uid}"
                                            media="${this.state.activeMedia}"
                                            default-media="${this.props
                    .defaultMedia}"
                                            .source=${this._currentNode.source}
                                            .specs=${this._currentNode.specsObj}
                                            .values=${this._currentNode.values}
                                            .frontspec=${(_b = this.props.frontspec) !== null && _b !== void 0 ? _b : {}}
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
                : html `<p>Loading...</p>`}
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
                            ${this.props.features.newPage
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

                ${((_d = (_c = this.props.frontspec) === null || _c === void 0 ? void 0 : _c.media) === null || _d === void 0 ? void 0 : _d.queries)
            ? html `
                          <ul class="${this.utils.cls('_queries')}">
                              ${Object.keys((_g = (_f = (_e = this.props.frontspec) === null || _e === void 0 ? void 0 : _e.media) === null || _f === void 0 ? void 0 : _f.queries) !== null && _g !== void 0 ? _g : {}).map((query) => {
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
                                          </div>
                                      </li>
                                  `;
            })}
                          </ul>
                      `
            : ''}
                ${((_h = this.props.features) === null || _h === void 0 ? void 0 : _h.insert)
            ? html `
                          <label class="_modes s-tooltip-container">
                              <input
                                  type="checkbox"
                                  class="_switch"
                                  .checked=${this.state.mode === 'insert'}
                                  ?checked=${this.state.mode === 'insert'}
                                  @change=${(e) => {
                this._setMode(e.target.checked ? 'insert' : 'edit');
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
            ${((_q = this.props.features) === null || _q === void 0 ? void 0 : _q.savePage)
            ? html `
                      <div class="${this.utils.cls('_actions')}" s-carpenter-ui>
                          ${((_r = this.props.features) === null || _r === void 0 ? void 0 : _r.savePage) && this._page
                ? html `
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
    mode: 'edit',
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFJaEQsT0FBTywyQkFBMkIsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLDJCQUEyQixNQUFNLHNDQUFzQyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0UsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxPQUFPLEVBQUUsTUFBTSxJQUFJLDBCQUEwQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSw2QkFBNkIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxNQUFNLElBQUkscUJBQXFCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUVoRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxL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