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
const SCarpenterAjaxAdapter_1 = __importDefault(require("./adapters/SCarpenterAjaxAdapter"));
const dom_1 = require("@coffeekraken/sugar/dom");
const string_1 = require("@coffeekraken/sugar/string");
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const SCarpenterNode_1 = __importDefault(require("./SCarpenterNode"));
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_specs_editor_component_1 = require("@coffeekraken/s-specs-editor-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
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
            _console.log('specs', specs);
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
                (0, keyboard_1.__hotkey)('escape').on('press', () => {
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
        // "§" key to hide the editor
        let isEditorHided = false;
        $scope.addEventListener('keydown', (e) => {
            if (isEditorHided)
                return;
            if (!this.isEditorOpen())
                return;
            if (e.key === '§') {
                isEditorHided = true;
                this._closeEditor();
            }
        });
        $scope.addEventListener('keyup', (e) => {
            if (!isEditorHided)
                return;
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
            (0, keyboard_1.__hotkey)('escape', {
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
                this.state.isLoading = false;
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
        const items = [];
        for (let [specs, specsObj] of Object.entries((_a = this._specs) !== null && _a !== void 0 ? _a : {})) {
            items.push(Object.assign(Object.assign({}, specsObj), { specs }));
        }
        (0, dom_2.__querySelectorLive)('s-carpenter-app-add-component', ($elm) => {
            $elm.addEventListener('s-filtrable-input.select', (e) => {
                _console.log('sss', e.detail);
                this._addComponent({
                    specs: e.detail.item.specs,
                    $after: (0, dom_2.__traverseUp)(e.target, ($elm) => $elm.classList.contains('s-carpenter-app_website-container')),
                });
            });
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
        return __awaiter(this, void 0, void 0, function* () {
            const uid = (0, string_2.__uniqid)();
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
            this._edit();
        });
    }
    applyComponent(values) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._currentNode.setValues(values);
        });
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
        this.addEventListener('s-specs-editor.change', (e) => __awaiter(this, void 0, void 0, function* () {
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
        return document.body.classList.contains('s-carpenter-app--open');
    }
    /**
     * open the editor
     */
    _openEditor() {
        var _a;
        document.body.classList.add('s-carpenter-app--open');
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
        document.body.classList.remove('s-carpenter-app--open');
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
            _console.log('cu', uid, this._currentNode);
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
    _renderNewPageForm(callback) {
        var _a, _b, _c, _d, _e, _f, _g;
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_page-name-form')}">
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
                uid: 'my-page',
                type: 'root',
                nodes: {},
            }, flatData = {};
            Array.from($nodes).forEach(($node) => {
                var _a, _b;
                const nodeUid = (_a = $node.getAttribute('s-container')) !== null && _a !== void 0 ? _a : $node.getAttribute('s-node');
                flatData[nodeUid] = {
                    uid: nodeUid,
                    type: $node.hasAttribute('s-container')
                        ? 'container'
                        : 'component',
                };
                const $belong = (0, dom_2.__traverseUp)($node, ($elm) => {
                    var _a;
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
                        data.nodes = {};
                    }
                    data.nodes[nodeUid] = flatData[nodeUid];
                    return;
                }
                const belongId = (_b = $belong.getAttribute('s-container')) !== null && _b !== void 0 ? _b : $belong.children[0].getAttribute('s-node');
                if (!belongId) {
                    throw new Error('<red>[SCarpenter]</red> The component logged bellow does not have any "s-container" id or any "id" attribute...');
                }
                if (!flatData[belongId].nodes) {
                    flatData[belongId].nodes = {};
                }
                flatData[belongId].nodes[nodeUid] = flatData[nodeUid];
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        _console.log(this._currentNode, (_a = this._currentNode) === null || _a === void 0 ? void 0 : _a.isReady());
        return (0, lit_1.html) `
            ${this.props.sidebar
            ? (0, lit_1.html) `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
                          </div>

                          <!-- <div class="${this.utils.cls('_navigation')}">
                              ${!this._data.specsByTypes
                ? (0, lit_1.html) ` <p>Loading...</p> `
                : (0, lit_1.html) `
                                    <ul class="s-fs-tree">
                                        ${Object.keys(this._data.specsByTypes).map((type) => {
                    const specsObj = this._data.specsByTypes[type];
                    return (0, lit_1.html) `
                                                <li
                                                    class="${this.state.activeNavigationFolders.includes(type)
                        ? 'active'
                        : ''}"
                                                >
                                                    <div
                                                        @pointerup=${() => this._toggleNavigationFolder(type)}
                                                    >
                                                        ${this.state.activeNavigationFolders.includes(type)
                        ? (0, lit_1.html) `
                                                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props
                            .icons
                            .folderOpen)}
                                                              `
                        : (0, lit_1.html) `
                                                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props
                            .icons
                            .folderClose)}
                                                              `}
                                                        <span tabindex="0"
                                                            >${(0, string_2.__upperFirst)(type)}</span
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
                        return (0, lit_1.html) `
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
                            ? (0, lit_1.html) `
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
                            : (0, lit_1.html) `
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
            ? (0, lit_1.html) `
                          <div class="${this.utils.cls('_editor-wrapper')}">
                              ${((_b = this._currentNode) === null || _b === void 0 ? void 0 : _b.isReady())
                ? (0, lit_1.html) `
                                        <s-specs-editor
                                            uid="${this._currentNode.uid}"
                                            media="${this.state.activeMedia}"
                                            default-media="${this.props
                    .defaultMedia}"
                                            .source=${this._currentNode.source}
                                            .specs=${this._currentNode.specsObj}
                                            .values=${this._currentNode.values}
                                            .frontspec=${(_c = this.props.frontspec) !== null && _c !== void 0 ? _c : {}}
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
                : (0, lit_1.html) `<p>Loading...</p>`}
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
                <div class="${this.utils.cls('_logo')}">
                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
                </div>

                <div
                    class="${this.utils.cls('_menu')} dropup-menu"
                    tabindex="0"
                >
                    ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.menu)}
                    <div class="_dropdown">
                        <ol class="_menu">
                            ${this.props.features.newPage
            ? (0, lit_1.html) `
                                      <li
                                          class="_menu-item"
                                          @pointerup=${(e) => {
                this.newPage();
            }}
                                      >
                                          New page
                                      </li>
                                  `
            : ''}
                        </ol>
                    </div>
                </div>

                ${((_e = (_d = this.props.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries)
            ? (0, lit_1.html) `
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys((_h = (_g = (_f = this.props.frontspec) === null || _f === void 0 ? void 0 : _f.media) === null || _g === void 0 ? void 0 : _g.queries) !== null && _h !== void 0 ? _h : {})
                .reverse()
                .map((query) => {
                return (0, lit_1.html) `
                                          <li
                                              @pointerup=${() => this._activateMedia(query)}
                                              class="${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} _query _item"
                                          >
                                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[query])}
                                              ${(0, string_2.__upperFirst)(query)}
                                          </li>
                                      `;
            })}
                          </ul>
                      `
            : ''}
                ${((_j = this.props.features) === null || _j === void 0 ? void 0 : _j.insert)
            ? (0, lit_1.html) `
                          <label class="_modes s-tooltip-container">
                              <span class="_edit">
                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.i18n.modeEdit)}
                              </span>
                              <input
                                  type="checkbox"
                                  class="_switch"
                                  .checked=${this.state.mode === 'insert'}
                                  ?checked=${this.state.mode === 'insert'}
                                  @change=${(e) => {
                this._setMode(e.target.checked ? 'insert' : 'edit');
            }}
                              />
                              <span class="_insert">
                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.i18n.modeInsert)}
                              </span>
                              <div
                                  class="s-tooltip s-color:accent s-white-space:nowrap"
                              >
                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.i18n.modeToggle)}
                              </div>
                          </label>
                      `
            : ''}
                ${((_k = this.props.features) === null || _k === void 0 ? void 0 : _k.savePage)
            ? (0, lit_1.html) `
                          <button
                              ?disabled=${!this._isSpecsEditorValid}
                              class="_save"
                              @click=${(e) => {
                this._savePage();
            }}
                          >
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.save)} Save page
                          </button>
                      `
            : ''}
            </nav>
            ${this.state.isLoading
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
                ? (0, lit_1.html) ` ${this._renderScopeSelector()} `
                : this._askFor === 'pageMetas'
                    ? (0, lit_1.html) ` ${this._renderNewPageForm()} `
                    : ''}
                      </div>
                  `
            : ''}
        `;
    }
}
exports.default = SCarpenterAppComponent;
SCarpenterAppComponent._registeredAdapters = {
    ajax: SCarpenterAjaxAdapter_1.default,
};
SCarpenterAppComponent.state = {
    activeNavigationFolders: [],
    activeMedia: null,
    isLoading: true,
    loadingStack: {},
    mode: 'edit',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUc1RCw2RkFBdUU7QUFFdkUsaURBQXdEO0FBRXhELHVEQUEyRTtBQUUzRSw0RUFBcUQ7QUFFckQsc0VBQWdEO0FBRWhELDJGQUFpRztBQUNqRyxxRkFBaUc7QUFDakcsbUVBQWdGO0FBRWhGLDJEQUFzRDtBQUN0RCwyREFBd0Q7QUFDeEQsdURBQXlFO0FBQ3pFLHVEQUFvRTtBQUNwRSw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELDRHQUFzRjtBQUV0RixpREFLaUM7QUFFakMsa0ZBQTBEO0FBSTFELDREQUFtQztBQTY4RGQsaUJBNzhEZCxtQkFBUSxDQTY4RFk7QUEzOEQzQixpREFBZ0U7QUFFaEUsYUFBYTtBQUNiLGlFQUEwQztBQUMxQywyR0FBbUU7QUF3RG5FLDZCQUE2QjtBQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsSUFBQSx3QkFBcUIsR0FBRSxDQUFDO0FBd0N4QixNQUFxQixzQkFBdUIsU0FBUSx5QkFBZTtJQUMvRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixzQ0FBOEIsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxtQkFBVSxDQUFDO1NBQzFCLENBQUM7SUFDTixDQUFDO0lBS0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFVLEVBQUUsT0FBNEI7UUFDM0QsSUFBSSxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUNYLCtCQUErQixFQUFFLDZCQUE2QixDQUNq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