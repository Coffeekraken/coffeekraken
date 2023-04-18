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
const ajaxAdapter_1 = __importDefault(require("./adapters/ajaxAdapter"));
// @ts-ignore
const index_css_1 = __importDefault(require("../css/index.css"));
const s_carpenter_app_website_ui_css_1 = __importDefault(require("../css/s-carpenter-app-website-ui.css"));
// define components/features
(0, s_specs_editor_component_1.define)();
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
            throw new Error(`[SCarpenterAppComponent] Sorry but the "${id}" adapter already exists...`);
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
        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // get the data
            this._data = yield this._getData(this.props.data);
            if (!this._data) {
                throw new Error(`[SCarpenter] Sorry but no valid specs have been specified...`);
            }
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
            // listen spec editor update
            this._listenSpecsEditorUpdate();
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
     * Init the containers marked by a "s-carpenter-container" attribute
     * to allow adding new content into the page
     */
    _initWebsiteContainers() {
        (0, dom_1.__querySelectorLive)('[s-carpenter-container]', ($elm) => {
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
        (0, dom_1.__querySelectorLive)(`[s-carpenter-container] > *:not(.${this.utils.cls('_website-container')})`, ($child) => {
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
    }
    /**
     * Init the interactivity things on the iframed website.
     * This contains things like the toolbar, the hover to display it, etc...
     */
    _initWebsiteIframeContent() {
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
        this._watchHoverOnSpecElements();
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
                this._$preselectedElm = null;
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
                // get the first element in the iframe
                const $firstElm = this._$websiteDocument.querySelector('[s-specs]');
                if ($firstElm) {
                    yield this._setCurrentElement($firstElm);
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
        for (let [type, typesObj] of Object.entries(this._data.specsByTypes)) {
            for (let [namespace, specs] of Object.entries(typesObj)) {
                items.push({
                    name: specs.title,
                    type,
                    namespace,
                });
            }
        }
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
     * Add a component into a container
     */ _addComponent(specs) {
        return __awaiter(this, void 0, void 0, function* () {
            const $newComponent = document.createElement('div');
            $newComponent.setAttribute('s-specs', specs.namespace);
            $newComponent.innerHTML = `
            <template s-specs-data>${JSON.stringify({
                values: {},
                $specs: this._data.specs[specs.namespace],
            })}</template>
        `;
            specs.$after.before($newComponent);
            yield this._setCurrentElement($newComponent);
            yield this.applyComponent();
            this._edit(this._$currentElm);
        });
    }
    applyComponent(values) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            _console.log('Apl___', values, this._$currentElm, this._data.currentSpecs);
            // make use of the specified adapter to update the component/section/etc...
            const adapterResult = yield SCarpenterAppComponent._registeredAdapters[this.props.adapter].setValues({
                $elm: this._$currentElm,
                values: (_a = values !== null && values !== void 0 ? values : this._data.values) !== null && _a !== void 0 ? _a : {},
                dotpath: this._data.currentSpecs.metas.dotpath,
                component: this,
            });
            if (adapterResult) {
                this._$currentElm = adapterResult;
            }
        });
    }
    /**
     * Listen for specs editor updates
     */
    _listenSpecsEditorUpdate() {
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
    _watchHoverOnSpecElements() {
        (0, dom_1.__querySelectorLive)(`[s-specs]`, ($elm) => {
            $elm.addEventListener('pointerover', (e) => {
                var _a, _b;
                // position toolbar
                this._setToolbarPosition(e.currentTarget);
                // do nothing more if already activated
                if (e.currentTarget.id &&
                    e.currentTarget.id === ((_a = this._$currentElm) === null || _a === void 0 ? void 0 : _a.id)) {
                    return;
                }
                if ((_b = this._$toolbar) === null || _b === void 0 ? void 0 : _b.parent) {
                    return;
                }
                // activate the element if needed
                this._positionToolbarOnElement(e.currentTarget);
                // set the "pre" activate element
                this._$preselectedElm = $elm;
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
        var _a;
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add('s-carpenter-website-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;
        const html = [];
        html.push(`
            <button s-carpenter-app-action="edit" class="_edit">
                <i class="fa-regular fa-pen-to-square"></i> <span>Edit</span>
            </button>
        `);
        if ((_a = this.props.features) === null || _a === void 0 ? void 0 : _a.delete) {
            html.push(`
                <button s-carpenter-app-action="delete" class="_delete" confirm="Confirm?">
                    <i class="fa-regular fa-trash-can"></i>
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
        }));
    }
    /**
     * Edit an item
     */
    _edit($elm) {
        return __awaiter(this, void 0, void 0, function* () {
            // set the current element
            if ($elm !== null && $elm !== void 0 ? $elm : this._$preselectedElm) {
                yield this._setCurrentElement($elm !== null && $elm !== void 0 ? $elm : this._$preselectedElm);
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
    _setCurrentElement($elm) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            if (!$elm) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Cannot call _setCurrentElement without any args...`);
            }
            // ensure we have an id
            if (!((_b = (_a = $elm.id) === null || _a === void 0 ? void 0 : _a.trim) === null || _b === void 0 ? void 0 : _b.call(_a))) {
                $elm.setAttribute('id', (0, string_1.__uniqid)());
            }
            // do not activate 2 times the same element
            if (((_c = this._$currentElm) === null || _c === void 0 ? void 0 : _c.id) === $elm.id) {
                return;
            }
            // remove the preselected element
            this._$preselectedElm = null;
            // set the current element
            this._$currentElm = $elm;
            // force reset the specs editor
            Object.assign(this._data, {
                values: null,
                currentSpecs: null,
                source: null,
            });
            this.requestUpdate();
            yield (0, datetime_1.__wait)();
            let data = yield SCarpenterAppComponent._registeredAdapters[this.props.adapter].getData({
                $elm: this._$currentElm,
                component: this,
            });
            if (data) {
                data = JSON.parse(JSON.stringify(data));
                // remap the specs
                data.currentSpecs = (_d = data.$specs) !== null && _d !== void 0 ? _d : data.specs;
                delete data.specs;
                Object.assign(this._data, data);
            }
        });
    }
    /**
     * Add the "editor" micro menu to the element
     */
    _positionToolbarOnElement($elm) {
        var _a;
        if ($elm.id && ((_a = this._$currentElm) === null || _a === void 0 ? void 0 : _a.id) === $elm.id) {
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
        const width = `${this._data.frontspec.media.queries[this.state.activeMedia].maxWidth
            ? `${(this._data.frontspec.media.queries[this.state.activeMedia].maxWidth /
                100) *
                75}px`
            : '100vw'}`;
        this._$websiteViewport.style.setProperty('--s-carpenter-viewport-width', width);
    }
    /**
     * Change page with the dotpath
     */
    _changePage(dotpath, pushState = true) {
        return __awaiter(this, void 0, void 0, function* () {
            // update the loading state
            this.state.loadingStack[dotpath] = true;
            this.state.isLoading = true;
            // change the iframe source
            this._$websiteIframe.src = this.props.pagesLink.replace('%dotpath', dotpath);
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
                this._rootWindow.history.pushState({
                    dotpath,
                }, document.title, this.props.pagesLink.replace('%dotpath', dotpath));
            }
            // update UI
            this.requestUpdate();
            // // update the currentSpecs
            // const newSpecs = this._data.specs[dotpath];
            // if (newSpecs !== this._data) {
            //     this._data = null;
            //     this.requestUpdate();
            //     await __wait();
            //     this._data = newSpecs;
            //     this.requestUpdate();
            // }
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (0, lit_1.html) `
            ${this.props.sidebar
            ? (0, lit_1.html) `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
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
                                                                      ${(0, unsafe_html_js_1.unsafeHTML)(this
                            .props
                            .icons
                            .folderOpen)}
                                                                  `
                        : (0, lit_1.html) `
                                                                      ${(0, unsafe_html_js_1.unsafeHTML)(this
                            .props
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
                          </div>
                      </nav>
                  `
            : ''}

            <nav
                class="${this.utils.cls('_editor')} ${this._data
            ? 'active'
            : ''}"
                s-carpenter-ui
            >
                ${this._data.currentSpecs && !this.state.isLoading
            ? (0, lit_1.html) `
                          <div class="${this.utils.cls('_editor-wrapper')}">
                              ${!this._data.currentSpecs || !this._data.values
                ? (0, lit_1.html) ` <p>Loading...</p> `
                : (0, lit_1.html) `
                                        <s-specs-editor
                                            media="${this.state.activeMedia}"
                                            default-media="${this.props
                    .defaultMedia}"
                                            .source=${this._data.source}
                                            .specs=${this._data.currentSpecs}
                                            .values=${this._data.values}
                                            .features=${this.props.features}
                                            .frontspec=${(_a = this.props.frontspec) !== null && _a !== void 0 ? _a : {}}
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
                                    `}
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

            ${((_c = (_b = this.props.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries)
            ? (0, lit_1.html) `
                      <nav
                          class="${this.utils.cls('_controls')}"
                          s-carpenter-ui
                      >
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys((_f = (_e = (_d = this.props.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries) !== null && _f !== void 0 ? _f : {})
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

                          ${((_g = this.props.features) === null || _g === void 0 ? void 0 : _g.insert)
                ? (0, lit_1.html) `
                                    <label class="_modes">
                                        <span class="_edit"> Edit </span>
                                        <input
                                            type="checkbox"
                                            class="_switch"
                                            .checked=${this.state.insertMode}
                                            ?checked=${this.state.insertMode}
                                            @change=${(e) => {
                    this._setMode(e.target.checked
                        ? 'insert'
                        : 'edit');
                }}
                                        />
                                        <span class="_insert"> Insert </span>
                                    </label>
                                `
                : ''}
                          ${((_h = this.props.features) === null || _h === void 0 ? void 0 : _h.save)
                ? (0, lit_1.html) `
                                    <button
                                        ?disabled=${!this._isSpecsEditorValid}
                                        class="_save"
                                    >
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
    ajax: ajaxAdapter_1.default,
};
SCarpenterAppComponent.state = {
    activeNavigationFolders: [],
    activeMedia: null,
    isLoading: true,
    loadingStack: {},
    mode: 'edit',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCwyRkFBaUc7QUFDakcscUZBQWlHO0FBQ2pHLG1FQUFnRjtBQUVoRiwyREFBc0Q7QUFDdEQsMkRBQXdEO0FBQ3hELHVEQUF5RTtBQUN6RSx1REFBb0U7QUFDcEUsNkJBQTJDO0FBQzNDLGtFQUEyRDtBQUMzRCw0R0FBc0Y7QUFFdEYsaURBS2lDO0FBRWpDLGtGQUEwRDtBQUkxRCw0REFBbUM7QUF5OUNkLGlCQXo5Q2QsbUJBQVEsQ0F5OUNZO0FBdjlDM0IsaURBQWdFO0FBQ2hFLHlFQUFtRDtBQUVuRCxhQUFhO0FBQ2IsaUVBQTBDO0FBQzFDLDJHQUFtRTtBQStDbkUsNkJBQTZCO0FBQzdCLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQUNoQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDOUMsSUFBQSx3QkFBcUIsR0FBRSxDQUFDO0FBeUN4QixNQUFxQixzQkFBdUIsU0FBUSx5QkFBZTtJQUMvRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixzQ0FBOEIsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxtQkFBVSxDQUFDO1NBQzFCLENBQUM7SUFDTixDQUFDO0lBS0QsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsRUFBVSxFQUNWLE9BQW9DO1FBRXBDLElBQUksc0JBQXNCLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyQ0FBMkMsRUFBRSw2QkFBNkIsQ0FDN0UsQ0FBQztTQUNMO1FBQ0Qsc0JBQXNC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