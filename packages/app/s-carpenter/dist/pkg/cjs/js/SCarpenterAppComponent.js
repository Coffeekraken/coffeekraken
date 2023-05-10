"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const SCarpenterPage_1 = __importDefault(require("./SCarpenterPage"));
const SCarpenterNodeAjaxAdapter_1 = __importDefault(require("./adapters/SCarpenterNodeAjaxAdapter"));
const SCarpenterPageAjaxAdapter_1 = __importDefault(require("./adapters/SCarpenterPageAjaxAdapter"));
const function_1 = require("@coffeekraken/sugar/function");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const dom_1 = require("@coffeekraken/sugar/dom");
const string_1 = require("@coffeekraken/sugar/string");
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const SCarpenterNode_1 = __importDefault(require("./SCarpenterNode"));
const layout_1 = __importDefault(require("./nodesHooks/layout"));
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_specs_editor_component_1 = require("@coffeekraken/s-specs-editor-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const keyboard_2 = require("@coffeekraken/sugar/keyboard");
const object_1 = require("@coffeekraken/sugar/object");
const string_2 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SCarpenterComponentInterface_1 = __importDefault(require("./interface/SCarpenterComponentInterface"));
const dom_2 = require("@coffeekraken/sugar/dom");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const defineApp_1 = __importDefault(require("./defineApp"));
exports.define = defineApp_1.default;
const dom_3 = require("@coffeekraken/sugar/dom");
// @ts-ignore
const index_css_1 = __importDefault(require("../css/index.css"));
const s_carpenter_app_website_ui_css_1 = __importDefault(require("../css/s-carpenter-app-website-ui.css"));
// define components/features
document.body.setAttribute('s-sugar', 'true');
(0, s_sugar_feature_1.define)();
class SCarpenterAppComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCarpenterComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(index_css_1.default)}
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
        super((0, object_1.__deepMerge)({
            name: 's-carpenter-app',
            interface: SCarpenterComponentInterface_1.default,
            carpenter: s_sugar_config_1.default.get('carpenter'),
        }));
        this.currentSpecs = null;
        this._isSpecsEditorValid = true;
        this._askErrors = {};
        this._askData = {};
        this._$editorIframe = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.querySelector('iframe.s-carpenter_editor-iframe');
        this._editorWindow = window;
        this._$editorDocument = document;
        const frontspec = new s_frontspec_1.default();
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
            (0, s_specs_editor_component_1.define)({
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
            yield (0, datetime_1.__wait)(1000);
            // getting the editor element
            this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
            if (!this._$editor) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls('_editor')}" element found...`);
            }
            // handle media method
            yield this._init();
            // listen for escape key press to close editor
            if (this.props.escape) {
                (0, keyboard_2.__hotkey)('escape').on('press', () => {
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
            yield (0, datetime_1.__wait)(2000);
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
        (0, dom_2.__querySelectorLive)('[s-container]', ($elm) => {
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
        (0, dom_2.__querySelectorLive)(`[s-container] > *:not(.${this.utils.cls('_website-container')})`, ($child) => {
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
        });
        // "ctrl+i" to change mode
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
        (0, dom_2.__injectStyle)(`
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
            ${s_carpenter_app_website_ui_css_1.default}  
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
                $link = (0, dom_2.__traverseUp)(e.target, ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'));
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
            (0, keyboard_2.__hotkey)('escape', {
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
            this._page = new SCarpenterPage_1.default($page, this);
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
            $elm._sCarpenterNode = new SCarpenterNode_1.default($node, this);
            this._nodesStack[uid] = $elm._sCarpenterNode;
        });
    }
    /**
     * Prevent external links in the website iframe
     */
    _preventExternalLinksBehaviors() {
        (0, dom_2.__querySelectorLive)('a[href]:not([target="_blank"])', ($link) => {
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
                (0, dom_1.__whenRemoved)($ui).then(() => {
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
            yield (0, dom_2.__whenIframeReady)(this._$websiteIframe);
            // injecting the whole website into the iframe
            (0, dom_3.__injectIframeContent)(this._$websiteIframe, $html.documentElement.innerHTML);
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
                yield (0, dom_2.__whenIframeReady)(this._$websiteIframe);
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
            yield (0, dom_2.__whenIframeReady)(this._$websiteIframe);
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
        (0, dom_2.__querySelectorLive)('s-carpenter-app-add-component', ($elm) => {
            $elm.addEventListener('s-filtrable-input.select', (e) => __awaiter(this, void 0, void 0, function* () {
                // get a proper uniqid
                const nodeMetas = yield this._ask('nodeMetas', {
                    prefix: `${e.detail.item.specs.split('.').pop()}`,
                });
                // add the component
                this._addComponent({
                    uid: nodeMetas.uid,
                    specs: e.detail.item.specs,
                    $after: (0, dom_2.__traverseUp)(e.target, ($elm) => $elm.classList.contains('s-carpenter-app_website-container')),
                });
            }));
        }, {
            rootNode: this._$websiteDocument,
        });
        (0, s_filtrable_input_component_1.define)({
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
                            title: (_c = (_b = this.props.categories[category]) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : (0, string_2.__upperFirst)(category),
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
            const uid = (_a = specs.uid) !== null && _a !== void 0 ? _a : (0, string_2.__uniqid)();
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
            this._nodesStack[uid] = new SCarpenterNode_1.default($node, this);
            specs.$after.before($newComponent);
            yield this._setCurrentNode(uid);
            yield this.applyComponent();
            if (specs.specs.includes('layout')) {
                yield layout_1.default.add({
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
    /**
     * Watch hover on specs element to position the toolbar
     */
    _watchHoverOnNodes() {
        (0, dom_2.__querySelectorLive)(`[s-node][s-specs]`, ($node) => {
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
                this._setToolbarTitleAndPosition(e.currentTarget, (0, string_2.__upperFirst)(element.specs.split('.').pop()));
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
        (0, dom_2.__querySelectorLive)(`.${this.utils.cls('_editor-wrapper')}`, ($wrapper) => {
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
            yield (0, datetime_1.__wait)();
            // set the current element
            this._currentNode = this._nodesStack[uid];
            _console.log('seted', this._currentNode);
            yield this._currentNode.getData();
            yield (0, datetime_1.__wait)(200);
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
        return (0, lit_1.html) `
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
        return (0, lit_1.html) `
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
                        ${Object.keys(this._scopes).map((scope) => (0, lit_1.html) `
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
        return (0, lit_1.html) `
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
            this._askData.slug = `/${(0, string_1.__urlCompliant)(e.target.value)}`;
            this._askData.uid = (0, string_1.__idCompliant)(this._askData.name);
            this._askErrors = {};
            this.requestUpdate();
        }}
                    />
                    ${((_a = this._askErrors) === null || _a === void 0 ? void 0 : _a.name)
            ? (0, lit_1.html) ` ${this._renderError(this._askErrors.name)} `
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
            this._askData.slug = (0, string_1.__urlCompliant)(this._askData.slug);
            delete this._askErrors.slug;
            this.requestUpdate();
        }}
                    />
                    ${((_d = this._askErrors) === null || _d === void 0 ? void 0 : _d.slug)
            ? (0, lit_1.html) ` ${this._renderError(this._askErrors.slug)} `
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
            this._askData.uid = (0, string_1.__idCompliant)(e.target.value);
            delete this._askErrors.uid;
            this.requestUpdate();
        }}
                    />
                    ${((_g = this._askErrors) === null || _g === void 0 ? void 0 : _g.uid)
            ? (0, lit_1.html) ` ${this._renderError(this._askErrors.uid)} `
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
        return (0, lit_1.html) `
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
                            @keyup=${(0, function_1.__debounce)(200, (e) => __awaiter(this, void 0, void 0, function* () {
            if (!e.target.value) {
                this._askErrors.uid =
                    this.props.i18n.newNodeUidRequired;
                return this.requestUpdate();
            }
            this._askData.uid = (0, string_1.__idCompliant)(e.target.value);
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
            ? (0, lit_1.html) ` ${this._renderError(this._askErrors.uid)} `
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
            this._askData.uid = `${this._askData.prefix.replace(/s$/, '')}-${(0, string_1.__idCompliant)(this._askData.uid)}`;
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
            const escapePromise = (0, keyboard_1.__escapeQueue)(null, {
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
                const $belong = (0, dom_2.__traverseUp)($node, ($elm) => {
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
                data.specs = (0, object_1.__filterObject)(data.specs, (key, item) => {
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
        return (0, lit_1.html) `
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        return (0, lit_1.html) `
            ${this.props.sidebar
            ? (0, lit_1.html) `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
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
            ? (0, lit_1.html) `
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
            : (0, lit_1.html) `
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      `}
            </nav>

            <nav class="${this.utils.cls('_controls')}" s-carpenter-ui>
                <div class="_logo">${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}</div>

                <div
                    class="${this.utils.cls('_menu')} drop-menu:right"
                    tabindex="0"
                >
                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.menu)}
                    <div class="_drop">
                        <ol class="_menu">
                            ${this.props.features.newPage
            ? (0, lit_1.html) `
                                      <li
                                          class="_menu-item"
                                          @pointerup=${(e) => {
                this.newPage();
            }}
                                      >
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.page)}
                                          New page
                                      </li>
                                  `
            : ''}
                        </ol>
                    </div>
                </div>

                ${((_e = (_d = this.props.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries)
            ? (0, lit_1.html) `
                          <ul class="${this.utils.cls('_queries')}">
                              ${Object.keys((_h = (_g = (_f = this.props.frontspec) === null || _f === void 0 ? void 0 : _f.media) === null || _g === void 0 ? void 0 : _g.queries) !== null && _h !== void 0 ? _h : {}).map((query) => {
                return (0, lit_1.html) `
                                      <li
                                          tabindex="0"
                                          @pointerup=${() => this._activateMedia(query)}
                                          class="s-tooltip-container ${query ===
                    this.state.activeMedia
                    ? 'is-active'
                    : ''} _query"
                                      >
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[query])}
                                          <div class="s-tooltip:right">
                                              ${(0, string_2.__upperFirst)(query)}
                                          </div>
                                      </li>
                                  `;
            })}
                          </ul>
                      `
            : ''}
                ${((_j = this.props.features) === null || _j === void 0 ? void 0 : _j.insert)
            ? (0, lit_1.html) `
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
                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.i18n.modeToggle)}
                              </div>
                          </label>
                      `
            : ''}
            </nav>

            ${this._page
            ? (0, lit_1.html) `
                      <div class="${this.utils.cls('_metas')}" s-carpenter-ui>
                          <ol class="breadcrumb">
                              <li class="_item">
                                  <span class="_label">Page</span>
                                  ${this._page.name}
                              </li>
                              ${this._currentNode
                ? (0, lit_1.html) `
                                        <li class="_item">
                                            <span class="_label">Node</span>
                                            ${(_q = (_m = (_l = (_k = this._currentNode.values) === null || _k === void 0 ? void 0 : _k.name) === null || _l === void 0 ? void 0 : _l.value) !== null && _m !== void 0 ? _m : (_p = (_o = this._currentNode.values) === null || _o === void 0 ? void 0 : _o.title) === null || _p === void 0 ? void 0 : _p.value) !== null && _q !== void 0 ? _q : this._currentNode.uid}
                                        </li>
                                    `
                : ''}
                          </ol>
                      </div>
                  `
            : ''}.
            ${((_r = this.props.features) === null || _r === void 0 ? void 0 : _r.savePage)
            ? (0, lit_1.html) `
                      <div class="${this.utils.cls('_actions')}" s-carpenter-ui>
                          ${((_s = this.props.features) === null || _s === void 0 ? void 0 : _s.savePage) && this._page
                ? (0, lit_1.html) `
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
                                        ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.save)}
                                        Save page
                                    </button>
                                `
                : ''}
                      </div>
                  `
            : ''}.
            ${this.state.status.loading
            ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
exports.default = SCarpenterAppComponent;
SCarpenterAppComponent._registeredAdapters = {
    ajax: {
        node: SCarpenterNodeAjaxAdapter_1.default,
        page: SCarpenterPageAjaxAdapter_1.default,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxzRUFBZ0Q7QUFJaEQscUdBQStFO0FBQy9FLHFHQUErRTtBQUUvRSwyREFBMEQ7QUFFMUQsMkRBQTZEO0FBRTdELGlEQUF3RDtBQUV4RCx1REFBMkU7QUFFM0UsNEVBQXFEO0FBRXJELHNFQUFnRDtBQUVoRCxpRUFBbUQ7QUFFbkQsMkZBQWlHO0FBQ2pHLHFGQUFpRztBQUNqRyxtRUFBZ0Y7QUFFaEYsMkRBQXNEO0FBQ3RELDJEQUF3RDtBQUN4RCx1REFBeUU7QUFDekUsdURBQW9FO0FBQ3BFLDZCQUEyQztBQUMzQyxrRUFBMkQ7QUFDM0QsNEdBQXNGO0FBRXRGLGlEQUtpQztBQUVqQyxrRkFBMEQ7QUFJMUQsNERBQW1DO0FBdWxFZCxpQkF2bEVkLG1CQUFRLENBdWxFWTtBQXJsRTNCLGlEQUFnRTtBQUVoRSxhQUFhO0FBQ2IsaUVBQTBDO0FBQzFDLDJHQUFtRTtBQXlFbkUsNkJBQTZCO0FBQzdCLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxJQUFBLHdCQUFxQixHQUFFLENBQUM7QUF3Q3hCLE1BQXFCLHNCQUF1QixTQUFRLHlCQUFlO0lBQy9ELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHNDQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLG1CQUFVLENBQUM7U0FDMUIsQ0FBQztJQUNOLENBQUM7SUFRRCxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQVUsRUFBRSxPQUEyQjtRQUMxRCxJQUFJLHNCQUFzQixDQUFDLG1CQUFtQixDQUFD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