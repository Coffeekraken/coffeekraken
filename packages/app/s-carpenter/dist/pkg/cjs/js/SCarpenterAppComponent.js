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
        this._values = {};
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
            this._data = yield this._getData(this.props.specs);
            if (!this._data) {
                throw new Error(`[SCarpenter] Sorry but no valid specs have been specified...`);
            }
            // active the default media if not set
            if (!this.state.activeMedia) {
                this.state.activeMedia = (_b = (_a = this._data.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.defaultMedia;
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
            // getting the editor element
            this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
            if (!this._$editor) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls('_editor')}" element found...`);
            }
            // handle media method
            yield this._init();
            // listen for escape key press to close editor
            (0, keyboard_1.__hotkey)('escape').on('press', () => {
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
            yield (0, datetime_1.__wait)(2000);
            // Create UI placeholders
            this._updateUiPlaceholders();
            // remove the "scrolling='no'" attribute on website iframe
            this._$websiteIframe.removeAttribute('scrolling');
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
        // listen for click on links in the iframe to close the editor
        this._$websiteDocument.addEventListener('click', (e) => {
            // check the clicked item
            if (e.target.tagName === 'A' && e.target.hasAttribute('href')) {
                this._closeEditor();
                return;
            }
            // traverse up to see if clicked element is in a link
            const $link = (0, dom_1.__traverseUp)(e.target, ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'));
            if ($link) {
                this._closeEditor();
            }
        });
        (0, keyboard_1.__hotkey)('escape', {
            // from the website itself
            element: this._$websiteDocument,
        }).on('press', () => {
            this._closeEditor();
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
     * Listen for specs editor updates
     */
    _listenSpecsEditorUpdate() {
        // listen for actual updated
        this.addEventListener('s-specs-editor.change', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            console.log('CURRENT', this._$currentElm);
            // make use of the specified adapter to update the component/section/etc...
            const adapterResult = yield SCarpenterAppComponent._registeredAdapters[this.props.adapter].setProps({
                $elm: this._$currentElm,
                props: (_a = e.detail.values) !== null && _a !== void 0 ? _a : {},
                component: this,
            });
            // save current values in "_values" stack
            this._values[this._$currentElm.id] = (_b = e.detail.values) !== null && _b !== void 0 ? _b : {};
            if (adapterResult) {
                this._$currentElm = adapterResult;
            }
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
        this._$editor.addEventListener('scroll', (e) => {
            if (Math.abs(this._$editor.scrollTop) >= 100) {
                this._$editor.classList.add('scrolled');
            }
            else {
                this._$editor.classList.remove('scrolled');
            }
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
        $toolbar.classList.add('s-carpenter-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;
        const html = [];
        html.push(`
            <button s-carpenter-app-action="edit" class="s-carpenter-toolbar_edit">
                <i class="fa-regular fa-pen-to-square"></i> <span>Edit</span>
            </button>
        `);
        if ((_a = this.props.features) === null || _a === void 0 ? void 0 : _a.delete) {
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
            if ($elm || this._$preselectedElm) {
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
            this.currentSpecs = null;
            this.requestUpdate();
            yield (0, datetime_1.__wait)();
            // try to get the spec from the data fetched at start
            let potentialDotpath = $elm.getAttribute('s-specs');
            if (this._data.specs[potentialDotpath]) {
                this.currentSpecs = this._data.specs[potentialDotpath];
            }
            else {
                potentialDotpath = `${potentialDotpath}.${potentialDotpath.split('.').slice(-1)[0]}`;
                if (this._data.specs[potentialDotpath]) {
                    this.currentSpecs = this._data.specs[potentialDotpath];
                }
            }
            if (!this.currentSpecs) {
                throw new Error(`<red>[SCarpenterAppComponent]</red> Sorry but the requested "${potentialDotpath}" specs dotpath does not exists...`);
            }
            // get values
            const values = (_d = this._values[this._$currentElm.id]) !== null && _d !== void 0 ? _d : (yield SCarpenterAppComponent._registeredAdapters[this.props.adapter].getProps({
                $elm: this._$currentElm,
                component: this,
            }));
            // save the getted values
            if (values) {
                this.currentSpecs.values = values;
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
            // if (newSpecs !== this.currentSpecs) {
            //     this.currentSpecs = null;
            //     this.requestUpdate();
            //     await __wait();
            //     this.currentSpecs = newSpecs;
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
            if (!this.props.ghostSpecs) {
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
        var _a, _b, _c, _d, _e, _f, _g;
        if (!this._data) {
            return '';
        }
        return (0, lit_1.html) `
            ${this.props.sidebar
            ? (0, lit_1.html) `
                      <nav class="${this.utils.cls('_sidebar')}" s-carpenter-ui>
                          <div class="${this.utils.cls('_logo')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
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
            ? (0, lit_1.html) `
                          <s-specs-editor
                              media="${this.state.activeMedia}"
                              .specs=${this.currentSpecs}
                              .features=${this.props.features}
                              .frontspec=${(_a = this._data.frontspec) !== null && _a !== void 0 ? _a : {}}
                          >
                          </s-specs-editor>
                      `
            : (0, lit_1.html) `
                          <div class="_loader carpenter-loader-blocks">
                              <div class="_block-1"></div>
                              <div class="_block-2"></div>
                              <div class="_block-3"></div>
                          </div>
                      `}
            </nav>

            ${((_c = (_b = this._data.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries)
            ? (0, lit_1.html) `
                      <nav
                          class="${this.utils.cls('_controls')}"
                          s-carpenter-ui
                      >
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys((_f = (_e = (_d = this._data.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries) !== null && _f !== void 0 ? _f : {}).map((query) => {
                return (0, lit_1.html) `
                                      <li
                                          @pointerup=${() => this._activateMedia(query)}
                                          class="${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} _query _item"
                                      >
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.specs[query])}
                                          ${(0, string_1.__upperFirst)(query)}
                                      </li>
                                  `;
            })}
                          </ul>

                          ${((_g = this.props.features) === null || _g === void 0 ? void 0 : _g.save)
                ? (0, lit_1.html) ` <button class="_save">Save page</button> `
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFDakcsbUVBQWdGO0FBRWhGLDJEQUFzRDtBQUN0RCwyREFBd0Q7QUFDeEQsdURBQXlFO0FBQ3pFLHVEQUFvRTtBQUNwRSw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELDRHQUFzRjtBQUV0RixpREFLaUM7QUFFakMsa0ZBQTBEO0FBRTFELDREQUFtQztBQWdyQ2QsaUJBaHJDZCxtQkFBUSxDQWdyQ1k7QUE5cUMzQixpREFBZ0U7QUFDaEUseUVBQW1EO0FBRW5ELGFBQWE7QUFDYixpRUFBMEM7QUFDMUMsMkdBQW1FO0FBZ0NuRSw2QkFBNkI7QUFDN0IsSUFBQSxpQ0FBNkIsR0FBRSxDQUFDO0FBQ2hDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QyxJQUFBLHdCQUFxQixHQUFFLENBQUM7QUF3Q3hCLE1BQXFCLHNCQUF1QixTQUFRLHlCQUFlO0lBQy9ELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHNDQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLG1CQUFVLENBQUM7U0FDMUIsQ0FBQztJQUNOLENBQUM7SUFLRCxNQUFNLENBQUMsZUFBZSxDQUNsQixFQUFVLEVBQ1YsT0FBb0M7UUFFcEMsSUFBSSxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUNYLDJDQUEyQyxFQUFFLDZCQUE2QixDQUM3RSxDQUFDO1NBQ0w7UUFDRCxzQkFBc0IsQ0FBQyxtQkFBbUIs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