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
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const SCarpenterNode_1 = __importDefault(require("./SCarpenterNode"));
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_specs_editor_component_1 = require("@coffeekraken/s-specs-editor-component");
const s_sugar_feature_1 = require("@coffeekraken/s-sugar-feature");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SCarpenterComponentInterface_1 = __importDefault(require("./interface/SCarpenterComponentInterface"));
const dom_1 = require("@coffeekraken/sugar/dom");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const defineApp_1 = __importDefault(require("./defineApp"));
exports.define = defineApp_1.default;
const dom_2 = require("@coffeekraken/sugar/dom");
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
            // get the data
            // this._data = await this._getData(this.props.data);
            // if (!this._data) {
            //     throw new Error(
            //         `[SCarpenter] Sorry but no valid specs have been specified...`,
            //     );
            // }
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
        (0, dom_1.__querySelectorLive)('[s-container]', ($elm) => {
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
        (0, dom_1.__querySelectorLive)(`[s-container] > *:not(.${this.utils.cls('_website-container')})`, ($child) => {
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
        (0, dom_1.__injectStyle)(`
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
                $link = (0, dom_1.__traverseUp)(e.target, ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'));
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
        (0, dom_1.__querySelectorLive)('a[href]:not([target="_blank"])', ($link) => {
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
            this.addEventListener('pointerout', (e) => {
                if (!isActive)
                    return;
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
            yield (0, dom_1.__whenIframeReady)(this._$websiteIframe);
            // injecting the whole website into the iframe
            (0, dom_2.__injectIframeContent)(this._$websiteIframe, $html.documentElement.innerHTML);
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
                yield (0, dom_1.__whenIframeReady)(this._$websiteIframe);
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
            yield (0, dom_1.__whenIframeReady)(this._$websiteIframe);
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
        const items = [];
        // for (let [type, typesObj] of Object.entries(this._data.specsByTypes)) {
        //     for (let [namespace, specs] of Object.entries(typesObj)) {
        //         items.push({
        //             name: specs.title,
        //             type,
        //             namespace,
        //         });
        //     }
        // }
        (0, dom_1.__querySelectorLive)('s-carpenter-app-add-component', ($elm) => {
            $elm.addEventListener('s-filtrable-input.select', (e) => {
                this._addComponent({
                    namespace: e.detail.item.namespace,
                    $after: (0, dom_1.__traverseUp)(e.target, ($elm) => $elm.classList.contains('s-carpenter-app_website-container')),
                });
            });
        }, {
            rootNode: this._$websiteDocument,
        });
        (0, s_filtrable_input_component_1.define)({
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
                    return html `
                            <div class="_item">
                                ${unsafeHTML(item.name)}
                                <span class="_type" :
                                    >(${unsafeHTML(item.type)})</span
                                >
                            </div>
                        `;
                }
            },
            items: () => __awaiter(this, void 0, void 0, function* () {
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
            const uid = (0, string_1.__uniqid)();
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
            this._nodesStack[uid] = new SCarpenterNode_1.default($node, this);
            specs.$after.before($newComponent);
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
        (0, dom_1.__querySelectorLive)(`[s-node][s-specs]`, ($node) => {
            // add node class
            $node.parentNode.classList.add(this.utils.cls('_node'));
            $node.parentNode.addEventListener('pointerover', (e) => {
                var _a;
                // add hover class
                e.currentTarget.classList.add('hover');
                e.stopPropagation();
                // position toolbar
                this._setToolbarPosition(e.currentTarget);
                const element = this.getElementFromDomNode(e.currentTarget);
                // do nothing more if already activated
                if (element.uid === ((_a = this._preselectedNode) === null || _a === void 0 ? void 0 : _a.uid)) {
                    return;
                }
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
        (0, dom_1.__querySelectorLive)(`.${this.utils.cls('_editor-wrapper')}`, ($wrapper) => {
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
            // force UI to refresh
            this._currentNode = null;
            this.requestUpdate();
            yield (0, datetime_1.__wait)();
            // set the current element
            this._currentNode = this._nodesStack[uid];
            yield this._currentNode.getData();
            this.requestUpdate();
        });
    }
    /**
     * Set the toolbar position
     */
    _setToolbarPosition($from) {
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
                id: 'my-page',
                type: 'root',
                nodes: {},
            }, flatData = {};
            Array.from($nodes).forEach(($node) => {
                var _a, _b;
                const componentUid = (_a = $node.getAttribute('s-container')) !== null && _a !== void 0 ? _a : $node.getAttribute('s-node');
                flatData[componentUid] = {
                    uid: componentUid,
                    type: $node.hasAttribute('s-container')
                        ? 'container'
                        : 'component',
                };
                const $belong = (0, dom_1.__traverseUp)($node, ($elm) => {
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
                    data.nodes[componentUid] = flatData[componentUid];
                    return;
                }
                const belongId = (_b = $belong.getAttribute('s-container')) !== null && _b !== void 0 ? _b : $belong.children[0].getAttribute('s-node');
                if (!belongId) {
                    throw new Error('<red>[SCarpenter]</red> The component logged bellow does not have any "s-container" id or any "id" attribute...');
                }
                if (!flatData[belongId].nodes) {
                    flatData[belongId].nodes = {};
                }
                flatData[belongId].nodes[componentUid] = flatData[componentUid];
            });
            const response = yield fetch(this.props.savePageUrl, {
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
                                                            >${(0, string_1.__upperFirst)(type)}</span
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

            ${((_e = (_d = this.props.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries)
            ? (0, lit_1.html) `
                      <nav
                          class="${this.utils.cls('_controls')}"
                          s-carpenter-ui
                      >
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
                                              ${(0, string_1.__upperFirst)(query)}
                                          </li>
                                      `;
            })}
                          </ul>

                          ${((_j = this.props.features) === null || _j === void 0 ? void 0 : _j.insert)
                ? (0, lit_1.html) `
                                    <label class="_modes s-tooltip-container">
                                        <span class="_edit">
                                            ${(0, unsafe_html_js_1.unsafeHTML)(this.props.i18n.modeEdit)}
                                        </span>
                                        <input
                                            type="checkbox"
                                            class="_switch"
                                            .checked=${this.state.mode ===
                    'insert'}
                                            ?checked=${this.state.mode ===
                    'insert'}
                                            @change=${(e) => {
                    this._setMode(e.target.checked
                        ? 'insert'
                        : 'edit');
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
                                        ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.save)}
                                        Save page
                                    </button>
                                `
                : ''}
                      </nav>
                  `
            : ''}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUc1RCw2RkFBdUU7QUFFdkUsNEVBQXFEO0FBRXJELHNFQUFnRDtBQUVoRCwyRkFBaUc7QUFDakcscUZBQWlHO0FBQ2pHLG1FQUFnRjtBQUVoRiwyREFBc0Q7QUFDdEQsMkRBQXdEO0FBQ3hELHVEQUF5RTtBQUN6RSx1REFBb0U7QUFDcEUsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCw0R0FBc0Y7QUFFdEYsaURBS2lDO0FBRWpDLGtGQUEwRDtBQUkxRCw0REFBbUM7QUE2akRkLGlCQTdqRGQsbUJBQVEsQ0E2akRZO0FBM2pEM0IsaURBQWdFO0FBRWhFLGFBQWE7QUFDYixpRUFBMEM7QUFDMUMsMkdBQW1FO0FBaURuRSw2QkFBNkI7QUFDN0IsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLElBQUEsd0JBQXFCLEdBQUUsQ0FBQztBQXdDeEIsTUFBcUIsc0JBQXVCLFNBQVEseUJBQWU7SUFDL0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysc0NBQThCLENBQ2pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsbUJBQVUsQ0FBQztTQUMxQixDQUFDO0lBQ04sQ0FBQztJQUtELE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBVSxFQUFFLE9BQTRCO1FBQzNELElBQUksc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsRUFBRSw2QkFBNkIsQ0FDakUsQ0FBQztTQUNMO1FBQ0Qsc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQzdELENBQUM7SUEwQ0Q7O1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsU0FBUyxFQUFFLHNDQUE4QjtZQUN6QyxTQUFTLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FDTCxDQUFDO1FBdkNOLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBNEJwQix3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFZdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFBLE1BQUEsTUFBTSxDQUFDLEdBQUcsMENBQUUsUUFBUSwwQ0FBRSxhQUFhLENBQ3JELGtDQUFrQyxDQUNyQyxDQUFDO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUVqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLHFCQUFZLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQztRQUMxQixNQUFNLENBQUMsSUFBSSxHQUFHLHlCQUF5QixDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFSyxLQUFLOzs7WUFDUCxzQ0FBc0M7WUFDdEMsSUFBQSxpQ0FBNkIsRUFBQztnQkFDMUIsUUFBUSxFQUFFO29CQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNO29CQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTTtvQkFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWE7b0JBQ3ZDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLO2lCQUNuQzthQUNKLENBQUMsQ0FBQztZQUVILGVBQWU7WUFDZixxREFBcUQ7WUFDckQscUJBQXFCO1lBQ3JCLHVCQUF1QjtZQUN2QiwwRUFBMEU7WUFDMUUsU0FBUztZQUNULElBQUk7WUFFSixzQ0FBc0M7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLDBDQUFFLEtBQUssMENBQUUsWUFBWSxDQUFDO2FBQ3RFO1lBRUQsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNqRSxNQUFNLElBQUksS0FBSyxDQUNYLHFEQUFxRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sd0JBQXdCLENBQ2xHLENBQUM7YUFDTDtZQUVELG1DQUFtQztZQUNuQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBRXJDLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFFeEMsc0NBQXNDO1lBQ3RDLElBQUksQ0FBQyxvQkFBb0I7Z0JBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztLQUN4RDtJQUVLLFlBQVk7O1lBQ2QsTUFBTSxJQUFBLGlCQUFNLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFFbkIsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRUFBa0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzVFLFNBQVMsQ0FDWixvQkFBb0IsQ0FDeEIsQ0FBQzthQUNMO1lBRUQsc0JBQXNCO1lBQ3RCLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLDhDQUE4QztZQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFBLG1CQUFRLEVBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7b0JBQ2hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELDBDQUEwQztZQUMxQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFL0Msc0RBQXNEO1lBQ3RELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBRWhDLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNuRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1lBRUgsd0NBQXdDO1lBQ3hDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1lBRXBDLE1BQU0sSUFBQSxpQkFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO1lBRW5CLHlCQUF5QjtZQUN6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUU3QiwwREFBMEQ7WUFDMUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFbEQsNERBQTREO1lBQzVELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBRTlCLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFdEUsOERBQThEO1lBQzlELElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUM3QixJQUFJLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDckMsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLElBQUk7YUFDZixDQUFDLENBQ0wsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNILHNCQUFzQjtRQUNsQixJQUFBLHlCQUFtQixFQUNmLGVBQWUsRUFDZixDQUFDLElBQUksRUFBRSxFQUFFO1lBQ0wsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7WUFFL0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQyxRQUFRLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hELFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUMvQyxDQUFDO1lBRUYsTUFBTSwyQkFBMkIsR0FDN0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwQywyQkFBMkIsQ0FBQyxTQUFTLEdBQUc7OztrREFJeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FDckI7aUdBRUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFDcEIsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbEMsc0JBQXNCLENBQ3pCOztxREFFb0MsQ0FBQztZQUV0QyxRQUFRLENBQUMsV0FBVyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDbEQsVUFBVSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxVQUFVLENBQUM7UUFDM0MsQ0FBQyxFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7U0FDbkMsQ0FDSixDQUFDO1FBRUYsSUFBQSx5QkFBbUIsRUFDZiwwQkFBMEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUNqRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ1AsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLE9BQU8sQ0FBQztZQUNaLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxVQUFVLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtvQkFDakMsT0FBTztpQkFDVjtnQkFDRCxVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFFOUIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QixPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtvQkFDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1osQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQ0Q7WUFDSSxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtTQUNuQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtCQUFrQixDQUFDLE1BQWdCO1FBQy9CLDZCQUE2QjtRQUM3QixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDMUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JDLElBQUksYUFBYTtnQkFBRSxPQUFPO1lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUFFLE9BQU87WUFDakMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDZixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsYUFBYTtnQkFBRSxPQUFPO1lBQzNCLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25FO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gseUJBQXlCO1FBQ3JCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUVsQywrQkFBK0I7UUFDL0IsSUFBQSxtQkFBYSxFQUNUOzs7Ozs7Ozs7Ozs7OztjQWNFLHdDQUFjO1NBQ25CLEVBQ0c7WUFDSSxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUk7U0FDeEMsQ0FDSixDQUFDO1FBRUYsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQiw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFN0Isd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUV0Qyw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ25ELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUU7Z0JBQzFCLEtBQUssR0FBRyxJQUFBLGtCQUFZLEVBQ2hCLENBQUMsQ0FBQyxNQUFNLEVBQ1IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQzlELENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsT0FBTzthQUNWO1lBRUQsSUFDSSxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztnQkFDNUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxRQUFRLEVBQzNDO2dCQUNFLE9BQU87YUFDVjtZQUVELG1CQUFtQjtZQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ25CLElBQUEsbUJBQVEsRUFBQyxRQUFRLEVBQUU7Z0JBQ2YsMEJBQTBCO2dCQUMxQixPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjthQUNsQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTztRQUNQLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBMEI7UUFDdEIsY0FBYztRQUNkLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXRCLHNCQUFzQjtRQUN0QixNQUFNLE1BQU0sR0FDUixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVqRSxtQ0FBbUM7UUFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO1lBQzlCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQzdDLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSx3QkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOEJBQThCO1FBQzFCLElBQUEseUJBQW1CLEVBQ2YsZ0NBQWdDLEVBQ2hDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDTixLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7U0FDbkMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQVNELHFCQUFxQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUMvQiw2QkFBNkIsRUFDN0IsUUFBUSxDQUNYLENBQUM7WUFDRixJQUFJLFVBQVUsRUFDVixRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDeEQsSUFBSSxRQUFRO29CQUFFLE9BQU87Z0JBQ3JCLFFBQVEsR0FBRyxJQUFJLENBQUM7Z0JBQ2hCLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLFFBQVE7b0JBQUUsT0FBTztnQkFDdEIsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFDakIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ3pCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQzdCLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRTtnQkFDbkIsR0FBRyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztnQkFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDdkQ7WUFFRCxlQUFlO1lBQ2YsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDN0MsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2pELEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUNuRCxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUM7WUFDckQsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDL0Q7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEtBQUs7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLGlFQUFpRTtZQUNqRSxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBRXZDLDRFQUE0RTtZQUM1RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUU5QyxxREFBcUQ7WUFDckQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUM7WUFDOUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUMvQixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUV4RCxxQ0FBcUM7WUFDckMsTUFBQSxNQUFBLEtBQUssQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDBDQUFFLE1BQU0sa0RBQUksQ0FBQztZQUMvQyxNQUFBLE1BQUEsS0FBSyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQywwQ0FBRSxNQUFNLGtEQUFJLENBQUM7WUFFOUQseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUxRCxpQ0FBaUM7WUFDakMsTUFBTSxJQUFBLHVCQUFpQixFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUU5Qyw4Q0FBOEM7WUFDOUMsSUFBQSwyQkFBcUIsRUFDakIsSUFBSSxDQUFDLGVBQWUsRUFDcEIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQ2xDLENBQUM7WUFFRix5REFBeUQ7WUFDekQsa0VBQWtFO1lBQ2xFLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7O2dCQUN0RCwrQkFBK0I7Z0JBQy9CLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUUxQiwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUU3QixvQkFBb0I7Z0JBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUV0QixjQUFjO2dCQUNkLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBRTdCLDZCQUE2QjtnQkFDN0IsTUFBTSxJQUFBLHVCQUFpQixFQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFFOUMscURBQXFEO2dCQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDO2dCQUN6RCxJQUFJLENBQUMsaUJBQWlCO29CQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7Z0JBRWhELG1EQUFtRDtnQkFDbkQsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7Z0JBRXpDLHlDQUF5QztnQkFDekMsTUFBQSxNQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDBDQUFFLE1BQU0sa0RBQUksQ0FBQztnQkFFaEUsMkNBQTJDO2dCQUMzQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBRWhELCtDQUErQztnQkFDL0MsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7Z0JBRWpDLHVCQUF1QjtnQkFDdkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtvQkFDckIsc0NBQXNDO29CQUN0QyxNQUFNLFVBQVUsR0FDWixJQUFJLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUNoQyxtQkFBbUIsQ0FDdEIsQ0FBQztvQkFDTixJQUFJLFVBQVUsRUFBRTt3QkFDWixNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUM5QyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2hDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDaEI7aUJBQ0o7Z0JBRUQsZ0VBQWdFO2dCQUNoRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUV2QyxvQ0FBb0M7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILGlDQUFpQztZQUNqQyxNQUFNLElBQUEsdUJBQWlCLEVBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0I7UUFDZCxzQ0FBc0M7UUFDdEMscUJBQXFCO1FBQ3JCLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDM0IsS0FBSyxDQUFDLElBQUksQ0FDTixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsU0FBUyxNQUFNLENBQUMsQ0FDM0QsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFpQixFQUFFLEVBQUU7O2dCQUM1QixJQUNJLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFdBQVcsa0RBQUksTUFBSyxRQUFRO29CQUMxQyxDQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxXQUFXLGtEQUFJLE1BQUssYUFBYSxFQUNqRDtvQkFDRSxPQUFPO2lCQUNWO2dCQUNELGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQ0FBaUM7UUFDN0IsTUFBTSxLQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ3hCLDBFQUEwRTtRQUMxRSxpRUFBaUU7UUFDakUsdUJBQXVCO1FBQ3ZCLGlDQUFpQztRQUNqQyxvQkFBb0I7UUFDcEIseUJBQXlCO1FBQ3pCLGNBQWM7UUFDZCxRQUFRO1FBQ1IsSUFBSTtRQUVKLElBQUEseUJBQW1CLEVBQ2YsK0JBQStCLEVBQy9CLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQztvQkFDZixTQUFTLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztvQkFDbEMsTUFBTSxFQUFFLElBQUEsa0JBQVksRUFBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ25CLG1DQUFtQyxDQUN0QyxDQUNKO2lCQUNKLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxFQUNEO1lBQ0ksUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7U0FDbkMsQ0FDSixDQUFDO1FBRUYsSUFBQSxvQ0FBMEIsRUFDdEI7WUFDSSxLQUFLLEVBQUUsV0FBVztZQUNsQixXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWTtZQUN6QyxLQUFLLENBQUMsSUFBSTtnQkFDTixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDckIsQ0FBQztZQUNELGFBQWEsRUFBRSxJQUFJO1lBQ25CLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7WUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFO2dCQUM1QyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7b0JBQ2pCLE9BQU8sSUFBSSxDQUFBOztrQ0FFRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7d0NBRWYsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozt5QkFHcEMsQ0FBQztpQkFDTDtZQUNMLENBQUM7WUFDRCxLQUFLLEVBQUUsR0FBUyxFQUFFO2dCQUNkLE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQTtTQUNKLEVBQ0QsK0JBQStCLEVBQy9CO1lBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzlCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNILFFBQVEsQ0FBQyxJQUF1QjtRQUM1Qix1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FDekMsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2RSx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILHFCQUFxQixDQUFDLEtBQWtCO1FBQ3BDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7T0FFRztJQUNHLGFBQWEsQ0FDZixLQUEwQzs7WUFFMUMsTUFBTSxHQUFHLEdBQUcsSUFBQSxpQkFBUSxHQUFFLENBQUM7WUFDdkIsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRCxhQUFhLENBQUMsU0FBUyxHQUFHOzRCQUNOLEdBQUcsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxHQUFHO2dCQUNILEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztnQkFDbEIsTUFBTSxFQUFFLEVBQUU7YUFDYixDQUFDO1NBQ0QsQ0FBQztZQUNGLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEQsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLHdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMxRCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuQyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLE1BQVk7O1lBQzdCLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCx3QkFBd0I7UUFDcEIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2hELG1DQUFtQztZQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztRQUVILDRCQUE0QjtRQUM1QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTtZQUN2RCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILDhDQUE4QztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0RCw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0I7UUFDZCxJQUFBLHlCQUFtQixFQUNmLG1CQUFtQixFQUNuQixDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04saUJBQWlCO1lBQ2pCLEtBQUssQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXhELEtBQUssQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O2dCQUNuRCxrQkFBa0I7Z0JBQ2xCLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFdkMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUVwQixtQkFBbUI7Z0JBQ25CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRTFDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRTVELHVDQUF1QztnQkFDdkMsSUFBSSxPQUFPLENBQUMsR0FBRyxNQUFLLE1BQUEsSUFBSSxDQUFDLGdCQUFnQiwwQ0FBRSxHQUFHLENBQUEsRUFBRTtvQkFDNUMsT0FBTztpQkFDVjtnQkFFRCxpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFLLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxxQkFBcUI7Z0JBQ3JCLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFDRDtZQUNJLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSTtTQUN4QyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0QkFBNEI7UUFDeEIsSUFBQSx5QkFBbUIsRUFDZixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFDdkMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNULFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUU7b0JBQ3JDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDM0M7cUJBQU07b0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUM5QztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxZQUFZO1FBQ1IsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXOztRQUNQLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3JELE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUM1RCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDakMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVEOztPQUVHO0lBQ0gsWUFBWTs7UUFDUixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4RCxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDL0QsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRDs7T0FFRztJQUNILFlBQVk7O1FBQ1IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN6QjtRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN0RCxRQUFRLENBQUMsWUFBWSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBRTFCLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztRQUUxQixJQUFJLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLDBDQUFFLGFBQWEsRUFBRTtZQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDOztzQkFFQSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJOzthQUU5QixDQUFDLENBQUM7U0FDTjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUM7O2tCQUVBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7O1NBRTlCLENBQUMsQ0FBQztRQUNILElBQUksTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsTUFBTSxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUM7O3NCQUVBLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU07O2FBRWhDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUV6Qyw2QkFBNkI7UUFDN0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILHFCQUFxQjtRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFPLENBQUMsRUFBRSxFQUFFOztZQUNyRCxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDM0IsT0FBTzthQUNWO1lBQ0QsUUFBUSxNQUFNLEVBQUU7Z0JBQ1osS0FBSyxNQUFNO29CQUNQLE1BQUEsTUFBQSxRQUFRLENBQUMsYUFBYSwwQ0FBRSxJQUFJLGtEQUFJLENBQUM7b0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBQSxJQUFJLENBQUMsZ0JBQWdCLDBDQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUN2QyxNQUFNO2dCQUNWLEtBQUssTUFBTTtvQkFDUCxNQUFBLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsSUFBSSxFQUFFLENBQUM7b0JBQzlCLE1BQU07Z0JBQ1YsS0FBSyxRQUFRO29CQUNULE1BQUEsSUFBSSxDQUFDLGdCQUFnQiwwQ0FBRSxNQUFNLEVBQUUsQ0FBQztvQkFDaEMsTUFBTTthQUNiO1FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNHLEtBQUssQ0FBQyxHQUFZOzs7WUFDcEIsMEJBQTBCO1lBQzFCLElBQUksR0FBRyxJQUFJLEdBQUcsTUFBSyxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLEdBQUcsQ0FBQSxFQUFFO2dCQUN2QyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7WUFFRCxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBRW5CLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0tBQ3hCO0lBRUQ7O09BRUc7SUFDRyxlQUFlLENBQUMsR0FBVzs7O1lBQzdCLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FDWCx5RUFBeUUsQ0FDNUUsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsdUNBQXVDLEdBQUcsNkNBQTZDLENBQzFGLENBQUM7YUFDTDtZQUVELDJDQUEyQztZQUMzQyxJQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxHQUFHLE1BQUssR0FBRyxFQUFFO2dCQUNoQyxPQUFPO2FBQ1Y7WUFFRCxpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUU3QixzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sSUFBQSxpQkFBTSxHQUFFLENBQUM7WUFFZiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0tBQ3hCO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUIsQ0FBQyxLQUFLO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUN2QixVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FDekMsSUFBSSxDQUFDO1FBRUwsSUFBSSxJQUFJLEdBQ0osVUFBVSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBRXJFLElBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLEdBQUcsRUFDL0Q7WUFDRSxJQUFJLElBQUksR0FBRyxDQUFDO1NBQ2Y7YUFBTSxJQUNILFVBQVUsQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUs7WUFDbEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsV0FBVyxHQUFHLEVBQUUsRUFDdEQ7WUFDRSxJQUFJLElBQUksR0FBRyxDQUFDO1NBQ2Y7UUFFRCxJQUFJLElBQUksRUFBRSxDQUFDO1FBRVgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLEtBQUs7UUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNaLE1BQU0sS0FBSyxHQUFHLEdBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRO1lBQ2hELENBQUMsQ0FBQyxHQUNJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRO2dCQUNqRCxHQUFHLENBQUM7Z0JBQ1IsRUFDSixJQUFJO1lBQ04sQ0FBQyxDQUFDLE9BQ1YsRUFBRSxDQUFDO1FBQ0gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxXQUFXLENBQ3BDLDhCQUE4QixFQUM5QixLQUFLLENBQ1IsQ0FBQztJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNHLFdBQVcsQ0FBQyxLQUFhLEVBQUUsWUFBcUIsSUFBSTs7WUFDdEQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFFNUIsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFFeEUscUJBQXFCO1lBQ3JCLElBQUksU0FBUyxFQUFFO2dCQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDOUI7b0JBQ0ksS0FBSztpQkFDUixFQUNELFFBQVEsQ0FBQyxLQUFLLEVBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FDL0MsQ0FBQzthQUNMO1lBRUQsWUFBWTtZQUNaLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFRCx1QkFBdUIsQ0FBQyxRQUFRO1FBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUNwRCxDQUFDLENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyRDtRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0csU0FBUzs7WUFDWCxzREFBc0Q7WUFDdEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUNsRCxrQ0FBa0MsQ0FDckMsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsT0FBTzthQUNWO1lBRUQsTUFBTSxJQUFJLEdBQUc7Z0JBQ0wsRUFBRSxFQUFFLFNBQVM7Z0JBQ2IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLEVBQUU7YUFDWixFQUNELFFBQVEsR0FBRyxFQUFFLENBQUM7WUFFbEIsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7Z0JBQ2pDLE1BQU0sWUFBWSxHQUNkLE1BQUEsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsbUNBQ2pDLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRztvQkFDckIsR0FBRyxFQUFFLFlBQVk7b0JBQ2pCLElBQUksRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzt3QkFDbkMsQ0FBQyxDQUFDLFdBQVc7d0JBQ2IsQ0FBQyxDQUFDLFdBQVc7aUJBQ3BCLENBQUM7Z0JBRUYsTUFBTSxPQUFPLEdBQUcsSUFBQSxrQkFBWSxFQUFDLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFOztvQkFDekMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFO3dCQUNsQyxPQUFPLElBQUksQ0FBQztxQkFDZjtvQkFDRCxJQUFJLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsMENBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUMxQyxPQUFPLElBQUksQ0FBQztxQkFDZjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCx5Q0FBeUM7Z0JBQ3pDLHdCQUF3QjtnQkFDeEIsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTt3QkFDYixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztxQkFDbkI7b0JBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQ2xELE9BQU87aUJBQ1Y7Z0JBRUQsTUFBTSxRQUFRLEdBQ1YsTUFBQSxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxtQ0FDbkMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDWCxpSEFBaUgsQ0FDcEgsQ0FBQztpQkFDTDtnQkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDM0IsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7aUJBQ2pDO2dCQUNELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BFLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7Z0JBQ2pELE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxVQUFVO2dCQUNqQixXQUFXLEVBQUUsYUFBYTtnQkFDMUIsT0FBTyxFQUFFO29CQUNMLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ3JDO2dCQUNELGNBQWMsRUFBRSxhQUFhO2dCQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNHLFFBQVEsQ0FBQyxNQUE0Qzs7WUFDdkQsSUFBSSxJQUFJLENBQUM7WUFDVCxJQUFJO2dCQUNBLElBQVUsTUFBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDL0IsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQVMsTUFBTSxDQUFDLENBQUM7aUJBQ3JDO3FCQUFNLElBQ0csTUFBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7b0JBQ3ZCLE1BQU8sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQ3RDO29CQUNFLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBUyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUNqRCxRQUFRLENBQUMsSUFBSSxFQUFFLENBQ2xCLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsWUFBWSxNQUFNLGFBQWEsTUFBTSxFQUFFLENBQzFDLENBQUM7b0JBQ0YsSUFBSSxTQUFTLEVBQUU7d0JBQ1gsYUFBYTt3QkFDYixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3FCQUNwRDtpQkFDSjthQUNKO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLGtCQUFrQjtZQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNQLE1BQU0sSUFBSSxLQUFLLENBQ1gsK0NBQStDLE1BQU0sc0NBQXNDLENBQzlGLENBQUM7YUFDTDtZQUVELHNCQUFzQjtZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFBLHVCQUFjLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtvQkFDbEQsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25DLElBQUksSUFBSSxDQUFDO2dCQUNULEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDbkIsSUFBSSxJQUFJO3dCQUFFLE9BQU87b0JBQ2pCLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTt3QkFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQztxQkFDZjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7aUJBQ2hDO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDO2FBQ2hEO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBQSxVQUFJLEVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQXFCVixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU07O1FBQ0YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE1BQUEsSUFBSSxDQUFDLFlBQVksMENBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUU5RCxPQUFPLElBQUEsVUFBSSxFQUFBO2NBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQ2hCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTtvQ0FDYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7d0NBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztnQ0FDL0IsSUFBQSwyQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7NkNBR2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2dDQUMxQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWTtnQkFDMUIsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBLHFCQUFxQjtnQkFDM0IsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzswQ0FFTSxNQUFNLENBQUMsSUFBSSxDQUNULElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUMxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNYLE1BQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxPQUFPLElBQUEsVUFBSSxFQUFBOzs2REFFTSxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FDaEQsSUFBSSxDQUNQO3dCQUNHLENBQUMsQ0FBQyxRQUFRO3dCQUNWLENBQUMsQ0FBQyxFQUFFOzs7cUVBR1MsR0FBRyxFQUFFLENBQ2QsSUFBSSxDQUFDLHVCQUF1QixDQUN4QixJQUFJLENBQ1A7OzBEQUVILElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUN6QyxJQUFJLENBQ1A7d0JBQ0csQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO29FQUNFLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLFVBQVUsQ0FDbEI7K0RBQ0o7d0JBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO29FQUNFLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLFdBQVcsQ0FDbkI7K0RBQ0o7OytEQUVBLElBQUEscUJBQVksRUFDWCxJQUFJLENBQ1A7Ozs7MERBSUgsTUFBTSxDQUFDLElBQUksQ0FDVCxRQUFRLENBQ1gsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7d0JBQ2QsTUFBTSxPQUFPLEdBQ1QsUUFBUSxDQUNKLE9BQU8sQ0FDVixDQUFDO3dCQUNOLElBQUksSUFBSSxDQUFDO3dCQUNULE1BQU0sWUFBWSxHQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTzs2QkFDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzs2QkFDVixNQUFNLENBQ0gsQ0FBQyxDQUFDLEVBQUUsRUFBRTs0QkFDRixJQUNJLElBQUk7Z0NBQ0osQ0FBQztvQ0FDRyxJQUFJLEVBQ1Y7Z0NBQ0UsT0FBTyxLQUFLLENBQUM7NkJBQ2hCOzRCQUNELElBQUk7Z0NBQ0EsQ0FBQyxDQUFDOzRCQUNOLE9BQU8sSUFBSSxDQUFDO3dCQUNoQixDQUFDLENBQ0o7NkJBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixPQUFPLElBQUEsVUFBSSxFQUFBOzttRkFFWSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUNyRCxZQUFZLENBQ2Y7NEJBQ0csQ0FBQyxDQUFDLFFBQVE7NEJBQ1YsQ0FBQyxDQUFDLEVBQUU7O2lGQUVLLEdBQUcsRUFBRSxDQUNkLElBQUksQ0FBQyxXQUFXLENBQ1osT0FBTzs2QkFDRixLQUFLOzZCQUNMLE9BQU8sQ0FDZjs7OzBFQUdDLElBQUk7NkJBQ0QsS0FBSzs2QkFDTCxZQUFZLENBQ2IsT0FBTzs2QkFDRixLQUFLOzZCQUNMLE9BQU8sQ0FDZjs0QkFDRyxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7Ozs7Ozs7Ozs7OytFQWNIOzRCQUNILENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7OzsrRUFJSDs7OEVBRUQsTUFBQSxPQUFPLENBQUMsS0FBSyxtQ0FDZixPQUFPLENBQUMsSUFBSTs7Ozs2REFJM0IsQ0FBQztvQkFDTixDQUFDLENBQUM7Ozs2Q0FHYixDQUFDO2dCQUNOLENBQUMsQ0FBQzs7aUNBRVQ7OzttQkFHZDtZQUNILENBQUMsQ0FBQyxFQUFFOzs7eUJBR0ssSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVk7WUFDbkQsQ0FBQyxDQUFDLFFBQVE7WUFDVixDQUFDLENBQUMsRUFBRTs7O2tCQUdOLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ25CLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTt3Q0FDYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztnQ0FDekMsQ0FBQSxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLE9BQU8sRUFBRTtnQkFDMUIsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzttREFFVyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUc7cURBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVzs2REFDZCxJQUFJLENBQUMsS0FBSztxQkFDdEIsWUFBWTtzREFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07cURBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUTtzREFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNO3lEQUNyQixNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxtQ0FDakMsRUFBRTtvRUFDc0IsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLG1CQUFtQjt3QkFDcEIsS0FBSyxDQUFDO29CQUNWLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDekIsQ0FBQztvRUFDdUIsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDMUIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztvQkFDaEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN6QixDQUFDOzs7cUNBR1I7Z0JBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBLG1CQUFtQjs7dUJBRXBDO1lBQ0gsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs7Ozs7dUJBTUg7OztjQUdULENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUywwQ0FBRSxLQUFLLDBDQUFFLE9BQU87WUFDbEMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzttQ0FFYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Ozs7dUNBSXZCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixVQUFVLEVBQ1YsUUFBUSxFQUNSLFFBQVEsQ0FDWDs7Z0NBRUMsTUFBTSxDQUFDLElBQUksQ0FDVCxNQUFBLE1BQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsMENBQUUsS0FBSywwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsQ0FDN0M7aUJBQ0ksT0FBTyxFQUFFO2lCQUNULEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNYLE9BQU8sSUFBQSxVQUFJLEVBQUE7OzJEQUVVLEdBQUcsRUFBRSxDQUNkLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO3VEQUNyQixLQUFLO29CQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztvQkFDbEIsQ0FBQyxDQUFDLFFBQVE7b0JBQ1YsQ0FBQyxDQUFDLEVBQUU7O2dEQUVOLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDMUI7Z0RBQ0MsSUFBQSxxQkFBWSxFQUFDLEtBQUssQ0FBQzs7dUNBRTVCLENBQUM7WUFDTixDQUFDLENBQUM7Ozs0QkFHUixDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLDBDQUFFLE1BQU07Z0JBQ3pCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7OzhDQUdVLElBQUEsMkJBQVUsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQzNCOzs7Ozt1REFLVSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7b0JBQzFCLFFBQVE7dURBQ0csSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO29CQUMxQixRQUFRO3NEQUNFLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FDVCxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU87d0JBQ1osQ0FBQyxDQUFDLFFBQVE7d0JBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FDZixDQUFDO2dCQUNOLENBQUM7Ozs4Q0FHQyxJQUFBLDJCQUFVLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUM3Qjs7Ozs7OENBS0MsSUFBQSwyQkFBVSxFQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FDN0I7OztpQ0FHWjtnQkFDSCxDQUFDLENBQUMsRUFBRTs0QkFDTixDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLDBDQUFFLFFBQVE7Z0JBQzNCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7b0RBRWdCLENBQUMsSUFBSSxDQUFDLG1CQUFtQjs7aURBRTVCLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNyQixDQUFDOzswQ0FFQyxJQUFBLDJCQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzs7aUNBRzFDO2dCQUNILENBQUMsQ0FBQyxFQUFFOzttQkFFZjtZQUNILENBQUMsQ0FBQyxFQUFFO2NBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ2xCLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTtvQ0FDYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7bUJBTzNDO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7U0FDWCxDQUFDO0lBQ04sQ0FBQzs7QUF6OUNMLHlDQTA5Q0M7QUE1OENVLDBDQUFtQixHQUF3QztJQUM5RCxJQUFJLEVBQUUsK0JBQXVCO0NBQ2hDLENBQUM7QUFVSyw0QkFBSyxHQUFHO0lBQ1gsdUJBQXVCLEVBQUUsRUFBRTtJQUMzQixXQUFXLEVBQUUsSUFBSTtJQUNqQixTQUFTLEVBQUUsSUFBSTtJQUNmLFlBQVksRUFBRSxFQUFFO0lBQ2hCLElBQUksRUFBRSxNQUFNO0NBQ2YsQ0FBQyJ9