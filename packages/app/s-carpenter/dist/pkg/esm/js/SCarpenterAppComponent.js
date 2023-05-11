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
import __layoutNodeHook from './nodesHooks/layout';
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
            // await this._loadCategories();
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
    // /**
    //  * Load the categories
    //  */
    // async _loadCategories(): Promise<void> {
    //     const response = await fetch(
    //         this.props.endpoints.categories.replace(
    //             '%base',
    //             this.props.endpoints.base,
    //         ),
    //         {
    //             method: 'GET',
    //         },
    //     );
    //     const categories = await response.json();
    //     this._categories = categories;
    // }
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
            $toolbar.classList.add(this.utils.cls('_toolbar-container'));
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
        var _a, _b;
        // "§" key to hide the editor
        let currentMode = this.state.mode;
        const $bodies = [
            (_a = this._$editorDocument) === null || _a === void 0 ? void 0 : _a.body,
            (_b = this._$websiteDocument) === null || _b === void 0 ? void 0 : _b.body,
            this._$rootDocument.body,
        ];
        $scope.addEventListener('keydown', (e) => {
            if (e.key === '§') {
                $bodies.forEach(($body) => {
                    var _a;
                    (_a = $body === null || $body === void 0 ? void 0 : $body.classList) === null || _a === void 0 ? void 0 : _a.add('s-carpenter--preview');
                });
                // set the mode to edit
                this._setMode('edit');
            }
        });
        $scope.addEventListener('keyup', (e) => {
            if (e.key === '§') {
                $bodies.forEach(($body) => {
                    var _a;
                    (_a = $body === null || $body === void 0 ? void 0 : $body.classList) === null || _a === void 0 ? void 0 : _a.remove('s-carpenter--preview');
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
                specs,
            });
            items.push({
                title: specsObj.title,
                description: specsObj.description,
                category: specsObj.category,
                specs,
            });
        }
        items.forEach((i) => {
            _console.log('item', i.specs);
        });
        __querySelectorLive('s-carpenter-app-add-component', ($elm) => {
            $elm.addEventListener('s-filtrable-input.select', (e) => __awaiter(this, void 0, void 0, function* () {
                // get a proper uniqid
                const nodeMetas = yield this._ask('nodeMetas', {
                    prefix: `${e.detail.item.specs.split('.').pop()}`,
                });
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
            searchValudPreprocess(value) {
                return value.replace(/^\/[a-zA-Z0-9]+\s?/, '');
            },
            items: ({ value }) => __awaiter(this, void 0, void 0, function* () {
                var _b, _c, _d, _e, _f;
                if (!value) {
                    const categoriesItems = [];
                    for (let [category, itemsInThisCategory,] of Object.entries(itemsByCategories !== null && itemsByCategories !== void 0 ? itemsByCategories : {})) {
                        categoriesItems.push({
                            title: (_c = (_b = this.props.categories[category]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : __upperFirst(category),
                            description: (_e = (_d = this.props.categories[category]) === null || _d === void 0 ? void 0 : _d.description) !== null && _e !== void 0 ? _e : '',
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
                    const category = (_f = value
                        .trim()
                        .match(/^\/([a-zA-Z0-9]+)/)) === null || _f === void 0 ? void 0 : _f[1];
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
     * Set the edit/insert mode
     */
    _setMode(mode) {
        var _a, _b;
        // protect agains switchingg to a none authorized mode
        if (!this.props.features[mode]) {
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
            this._edit();
        });
    }
    applyComponent(values) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._currentNode.setValues(values);
            // await this._currentNode.save();
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
    /**
     * Watch hover on specs element to position the toolbar
     */
    _initMoveMode() {
        let $draggedElm;
        __querySelectorLive('[s-container]', ($container) => {
            $container.addEventListener('dragenter', (e) => {
                e.stopPropagation();
                e.preventDefault();
            });
            $container.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            $container.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
            $container.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
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
                var _a, _b, _c;
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
                const $bodies = [
                    (_a = this._$editorDocument) === null || _a === void 0 ? void 0 : _a.body,
                    (_b = this._$websiteDocument) === null || _b === void 0 ? void 0 : _b.body,
                    this._$rootDocument.body,
                ];
                $bodies.forEach(($body) => {
                    $body.classList.remove('s-carpenter--drag');
                });
                // remove the preview
                (_c = $preview.remove) === null || _c === void 0 ? void 0 : _c.call($preview);
            });
            $elm.addEventListener('dragend', (e) => {
                // stop propagation
                e.stopPropagation();
                e.preventDefault();
            });
            $node.addEventListener('dragover', (e) => {
                // stop propagation
                e.stopPropagation();
                e.preventDefault();
                // prevent dragging into itself
                if ($draggedElm === null || $draggedElm === void 0 ? void 0 : $draggedElm.contains(e.target)) {
                    return;
                }
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
                    $elm.classList.remove('drag-y-before');
                    $elm.classList.add('drag-y-after');
                }
                else {
                    $elm.classList.add('drag-y-before');
                    $elm.classList.remove('drag-y-after');
                }
            });
            $elm.addEventListener('dragenter', (e) => {
                e.stopPropagation();
                e.preventDefault();
                // prevent dragging into itself
                // if ($draggedElm?.contains(e.target)) {
                //     return;
                // }
            });
            $elm.addEventListener('dragleave', (e) => {
                // stop propagation
                e.stopPropagation();
                e.preventDefault();
                // remove all the drag related classes
                e.currentTarget.classList.remove('drag-x-before', 'drag-x-after', 'drag-y-before', 'drag-y-after');
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
        $toolbar.classList.add(this.utils.cls('_toolbar'));
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
            _console.log('seted', this._currentNode);
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
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

                ${((_e = (_d = this.props.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries)
            ? html `
                          <ul class="${this.utils.cls('_queries')}">
                              ${Object.keys((_h = (_g = (_f = this.props.frontspec) === null || _f === void 0 ? void 0 : _f.media) === null || _g === void 0 ? void 0 : _g.queries) !== null && _h !== void 0 ? _h : {}).map((query) => {
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
            ${((_q = this.props.features) === null || _q === void 0 ? void 0 : _q.savePage)
            ? html `
                      <div class="${this.utils.cls('_actions')}" s-carpenter-ui>
                          ${((_r = this.props.features) === null || _r === void 0 ? void 0 : _r.savePage) && this._page
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
    status: {
        loading: true,
        savingPage: false,
    },
    mode: 'edit',
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sZ0JBQWdCLE1BQU0sa0JBQWtCLENBQUM7QUFJaEQsT0FBTywyQkFBMkIsTUFBTSxzQ0FBc0MsQ0FBQztBQUMvRSxPQUFPLDJCQUEyQixNQUFNLHNDQUFzQyxDQUFDO0FBRS9FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0UsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxnQkFBZ0IsTUFBTSxrQkFBa0IsQ0FBQztBQUVoRCxPQUFPLGdCQUFnQixNQUFNLHFCQUFxQixDQUFDO0FBRW5ELE9BQU8sRUFBRSxNQUFNLElBQUksMEJBQTBCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsTUFBTSxJQUFJLDZCQUE2QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDakcsT0FBTyxFQUFFLE1BQU0sSUFBSSxxQkFBcUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWhGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxH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