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
const s_carpenter_app_website_ui_css_1 = __importDefault(require("../css/s-carpenter-app-website-ui.css"));
// define components
(0, s_specs_editor_component_1.define)();
class SCarpenterComponent extends s_lit_component_1.default {
    static create(attributes = {}, to = document.body) {
        const domParser = new DOMParser(), $carpenter = domParser.parseFromString(`<s-carpenter ${Object.keys(attributes).map((attr) => {
            const value = attributes[attr];
            return ` ${attr}="${value}" `;
        })}></s-carpenter>`, 'text/html');
        to.appendChild($carpenter.body.children[0]);
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCarpenterComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) ``;
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(__css)}
        `;
    }
    static registerAdapter(id, adapter) {
        if (SCarpenterComponent._registeredAdapters[id]) {
            throw new Error(`[SCarpenterComponent] Sorry but the "${id}" adapter already exists...`);
        }
        SCarpenterComponent._registeredAdapters[id] = adapter;
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
            if (!SCarpenterComponent._registeredAdapters[this.props.adapter]) {
                throw new Error(`[SCarpenterComponent] Sorry but the specified "${this.props.adapter}" is not registered...`);
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
            console.log('Carp', this._$carpenterComponent);
            // get the first s-spec element that we can find
            // or get the first item in the body
            // and set it to the state.$currentElement to be sure we have something to
            // work with in the adapter, etc...
            let $firstSpecsElement = this._$websiteDocument.querySelector('[s-specs]');
            if (!$firstSpecsElement) {
                $firstSpecsElement = this._$websiteDocument.body.children[0];
            }
            this.state.$currentElement = $firstSpecsElement;
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
            yield this._handleMediaMethod();
            // listen for escape key press to close editor
            (0, keyboard_1.__hotkey)('escape').on('press', () => {
                this._closeEditor();
            });
            // listen spec editor update
            this._listenSpecsEditorUpdate();
            // handle popstate
            this._websiteWindow.addEventListener('popstate', (e) => {
                this._changePage(e.state.dotpath, false);
            });
            // handle "scrolled" class on the editor
            this._handleScrolledClassOnEditor();
            yield (0, datetime_1.__wait)(200);
            // Create UI placeholders
            this._updateUiPlaceholders();
            yield (0, datetime_1.__wait)(2000);
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
        const $uis = this.querySelectorAll('[s-ui]');
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
    _handleMediaMethod() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // const mediaMethod = this._data.frontspec?.media?.method;
            // if (fmediaMethod === 'container') {
            //     // getting the viewport element
            //     if (typeof this.props.viewportElm === HTMLElement) {
            //         this._$websiteViewport = this.props.viewportElm;
            //     } else if (typeof this.props.viewportElm === 'string') {
            //         this._$websiteViewport =
            //             this._websiteWindow.document.querySelector(
            //                 this.props.viewportElm,
            //             );
            //     }
            // } else if (this._data.frontspec?.media?.queries) {
            // create the wrapping iframe
            this._$websiteIframe = document.createElement('iframe');
            this._$websiteIframe.classList.add('s-carpenter_website-iframe');
            this._$websiteIframe.setAttribute('src', 'about:blank');
            this._$websiteIframe.setAttribute('scrolling', 'no');
            // set the website viewport to be able to resize it using the media controls
            this._$websiteViewport = this._$websiteIframe;
            // get the actual page html to inject into the iframe
            const html = this._$websiteDocument.documentElement.innerHTML;
            const parser = new DOMParser();
            const $html = parser.parseFromString(html, 'text/html');
            // remove initial carpenter component
            (_b = (_a = $html.querySelector('s-carpenter')) === null || _a === void 0 ? void 0 : _a.remove) === null || _b === void 0 ? void 0 : _b.call(_a);
            // prepend the website iframe in the body
            this._$websiteDocument.body.prepend(this._$websiteIframe);
            // wait until the iframe is ready
            yield (0, dom_1.__whenIframeReady)(this._$websiteIframe);
            // injecting the whole website into the iframe
            (0, dom_2.__injectIframeContent)(this._$websiteIframe, $html.documentElement.innerHTML);
            this._$websiteIframe.addEventListener('load', (e) => __awaiter(this, void 0, void 0, function* () {
                yield (0, dom_1.__whenIframeReady)(this._$websiteIframe);
                // reset the toolbar
                this._$toolbar = null;
                // reset state
                this.state.$currentElement = null;
                this.state.$hoveredElement = null;
                // reset the _window and _$websiteDocument references
                this._websiteWindow = this._$websiteIframe.contentWindow;
                this._$websiteDocument =
                    this._$websiteIframe.contentWindow.document;
                // init the interactivity in the website iframe
                this._initWebsiteIframeContent();
            }));
            // wait until the iframe is ready
            yield (0, dom_1.__whenIframeReady)(this._$websiteIframe);
            // empty the document of all the nodes
            // unless the iframes
            ['body'].forEach((container) => {
                Array.from(this._$websiteDocument.querySelectorAll(`${container} > *`)).forEach((node) => {
                    var _a, _b, _c, _d;
                    if (((_b = (_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'iframe' ||
                        ((_d = (_c = node.tagName) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 's-carpenter') {
                        return;
                    }
                    node.remove();
                });
            });
        });
    }
    /**
     * Listen for specs editor updates
     */
    _listenSpecsEditorUpdate() {
        // listen for actual updated
        this.addEventListener('s-specs-editor.update', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            // make use of the specified adapter to update the component/section/etc...
            const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.adapter].setProps({
                $elm: this.state.$currentElement,
                props: (_a = e.detail.values) !== null && _a !== void 0 ? _a : {},
                component: this,
            });
            // save current values in "_values" stack
            this._values[this.state.$currentElement.id] = (_b = e.detail.values) !== null && _b !== void 0 ? _b : {};
            if (adapterResult) {
                this.state.$currentElement = adapterResult;
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
                    e.currentTarget.id === ((_a = this.state.$currentElement) === null || _a === void 0 ? void 0 : _a.id)) {
                    return;
                }
                if ((_b = this._$toolbar) === null || _b === void 0 ? void 0 : _b.parent) {
                    return;
                }
                // activate the element if needed
                this._positionToolbarOnElement(e.currentTarget);
                // set the "pre" activate element
                this.state.$hoveredElement = $elm;
                // set the hovered dotpath
                this.state.hoveredDotpath = $elm.getAttribute('s-specs');
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
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = this._$websiteDocument.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        $toolbar.setAttribute('s-carpenter-website-ui', 'true');
        this._$toolbar = $toolbar;
        const html = `
            <button s-carpenter-app-action="edit" class="s-carpenter-toolbar_edit">
                <i class="fa-regular fa-pen-to-square"></i> <span>Edit</span>
            </button>
            <button s-carpenter-app-action="remove" class="s-carpenter-toolbar_remove">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
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
            switch (action) {
                case 'edit':
                    this._edit();
                    break;
                case 'remove':
                    break;
            }
        }));
    }
    /**
     * Edit an item
     */
    _edit() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            // do not activate 2 times the same element
            if (((_b = (_a = this.state.$currentElement) === null || _a === void 0 ? void 0 : _a.id) === null || _b === void 0 ? void 0 : _b.trim()) &&
                ((_c = this.state.$currentElement) === null || _c === void 0 ? void 0 : _c.id) === ((_d = this.state.$hoveredElement) === null || _d === void 0 ? void 0 : _d.id)) {
                this._openEditor();
                return;
            }
            // force reset the specs editor
            this.currentSpecs = null;
            this.requestUpdate();
            yield (0, datetime_1.__wait)();
            // try to get the spec from the data fetched at start
            let potentialDotpath = this.state.hoveredDotpath;
            if (this._data.specsMap[potentialDotpath]) {
                this.currentSpecs = this._data.specsMap[potentialDotpath];
            }
            else {
                potentialDotpath = `${potentialDotpath}.${potentialDotpath.split('.').slice(-1)[0]}`;
                if (this._data.specsMap[potentialDotpath]) {
                    this.currentSpecs = this._data.specsMap[potentialDotpath];
                }
            }
            if (!this.currentSpecs) {
                return;
            }
            // set the current element
            this._setCurrentElement(this.state.$hoveredElement);
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // ensure we have an id
            if (!$elm.id.trim()) {
                $elm.setAttribute('id', (0, string_1.__uniqid)());
            }
            // do not activate 2 times the same element
            if (((_a = this.state.$currentElement) === null || _a === void 0 ? void 0 : _a.id) === $elm.id) {
                return;
            }
            // get values
            const values = (_b = this._values[$elm.id]) !== null && _b !== void 0 ? _b : (yield SCarpenterComponent._registeredAdapters[this.props.adapter].getProps({
                $elm,
                component: this,
            }));
            // save the getted values
            if (values) {
                this.currentSpecs.values = values;
            }
            // set the current element
            this.state.$currentElement = $elm;
        });
    }
    /**
     * Add the "editor" micro menu to the element
     */
    _positionToolbarOnElement($elm) {
        var _a;
        if ($elm.id && ((_a = this.state.$currentElement) === null || _a === void 0 ? void 0 : _a.id) === $elm.id) {
            return;
        }
        // set the hovered element
        this.state.$hoveredElement = $elm;
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
        if (targetRect.width >=
            this._$rootDocument.documentElement.clientWidth - 20) {
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
        this._$websiteViewport.style.width = width;
    }
    /**
     * Change page with the dotpath
     */
    _changePage(dotpath, pushState = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.adapter].change({
                dotpath,
                $elm: this.props.specs
                    ? this._$websiteDocument.body.children[0]
                    : this.state.$currentElement,
                props: this.props,
                component: this,
            });
            if (adapterResult) {
                this.state.$currentElement = adapterResult;
            }
            // save arrival state
            if (pushState) {
                this._websiteWindow.history.pushState({
                    dotpath,
                }, document.title, this.props.pagesLink.replace('%dotpath', dotpath));
            }
            // update the currentSpecs
            const newSpecs = this._data.specsMap[dotpath];
            if (newSpecs !== this.currentSpecs) {
                this.currentSpecs = null;
                this.requestUpdate();
                yield (0, datetime_1.__wait)();
                this.currentSpecs = newSpecs;
                this.requestUpdate();
            }
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
                    const $template = document.querySelectorAll(`template#${source}`);
                    if ($template) {
                        data = JSON.parse($template.content.textContent);
                    }
                }
            }
            catch (e) { }
            // warn if no data
            if (!data) {
                throw new Error(`[SCarpenterComponent] The passed source "${source}" does not provide any valid data...`);
            }
            return data;
        });
    }
    render() {
        var _a, _b, _c, _d, _e, _f;
        if (!this._data) {
            return '';
        }
        return (0, lit_1.html) `
            ${this.props.sidebar
            ? (0, lit_1.html) `
                      <nav class="${this.utils.cls('_sidebar')}">
                          <div class="${this.utils.cls('_logo')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
                              <ul class="s-fs-tree">
                                  ${Object.keys(this._data.specsBySources).map((sourceId) => {
                var _a;
                const sourceObj = this._data.specsBySources[sourceId];
                if (typeof sourceObj === 'function') {
                    return '';
                }
                return (0, lit_1.html) `
                                              <li
                                                  class="${this.state.activeNavigationFolders.includes(sourceId)
                    ? 'active'
                    : ''}"
                                              >
                                                  <div
                                                      @pointerup=${() => this._toggleNavigationFolder(sourceId)}
                                                  >
                                                      ${this.state.activeNavigationFolders.includes(sourceId)
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
                                                          >${(_a = sourceObj.title) !== null && _a !== void 0 ? _a : sourceId}</span
                                                      >
                                                  </div>
                                                  <ul>
                                                      ${Object.keys(sourceObj.specs).map((dotpath) => {
                    var _a;
                    const specObj = sourceObj.specs[dotpath];
                    return (0, lit_1.html) `
                                                              <li
                                                                  class="${document.location.href.includes(specObj
                        .metas
                        .dotpath)
                        ? 'active'
                        : ''}"
                                                                  tabindex="0"
                                                                  @pointerup=${() => this._changePage(specObj
                        .metas
                        .dotpath)}
                                                              >
                                                                  <div>
                                                                      <i
                                                                          class="fa-regular fa-file"
                                                                      ></i>
                                                                      <a
                                                                          >${(_a = specObj.title) !== null && _a !== void 0 ? _a : specObj.name}</a
                                                                      >
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
                s-ui
            >
                ${this.currentSpecs
            ? (0, lit_1.html) `
                          <s-specs-editor
                              media="${this.state.activeMedia}"
                              specs="${JSON.stringify(this.currentSpecs)}"
                              frontspec="${JSON.stringify((_a = this._data.frontspec) !== null && _a !== void 0 ? _a : {})}"
                          >
                          </s-specs-editor>
                      `
            : ''}
            </nav>

            ${((_c = (_b = this._data.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries)
            ? (0, lit_1.html) `
                      <nav class="${this.utils.cls('_media')}" s-ui>
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys((_f = (_e = (_d = this._data.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries) !== null && _f !== void 0 ? _f : {}).map((query) => {
                return (0, lit_1.html) `
                                      <li
                                          @pointerup=${() => this._activateMedia(query)}
                                          class="s-color s-color--accent ${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} ${this.utils.cls('_query _item')}"
                                      >
                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.specs[query])}
                                          ${(0, string_1.__upperFirst)(query)}
                                      </li>
                                  `;
            })}
                          </ul>
                      </nav>
                  `
            : ''}
        `;
    }
}
exports.default = SCarpenterComponent;
SCarpenterComponent._registeredAdapters = {
    ajax: ajaxAdapter_1.default,
};
SCarpenterComponent.state = {
    activeNavigationFolders: [],
    hoveredDotpath: null,
    $currentElement: null,
    $hoveredElement: null,
    activeMedia: null,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFFakcsMkRBQXNEO0FBQ3RELDJEQUF3RDtBQUN4RCx1REFBeUQ7QUFDekQsdURBQW9FO0FBQ3BFLDZCQUEyQztBQUMzQyxrRUFBMkQ7QUFDM0QsNEdBQXNGO0FBRXRGLGlEQUtpQztBQUVqQyxrRkFBMEQ7QUFFMUQsNERBQW1DO0FBNC9CZCxpQkE1L0JkLG1CQUFRLENBNC9CWTtBQTEvQjNCLGlEQUFnRTtBQUNoRSx5RUFBbUQ7QUFFbkQsYUFBYTtBQUNiLDJHQUFtRTtBQXlCbkUsb0JBQW9CO0FBQ3BCLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQWtEaEMsTUFBcUIsbUJBQW9CLFNBQVEseUJBQWU7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFrQixFQUFFLEVBQUUsS0FBa0IsUUFBUSxDQUFDLElBQUk7UUFDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsRUFDN0IsVUFBVSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQ2xDLGdCQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixPQUFPLElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxpQkFBaUIsRUFDbkIsV0FBVyxDQUNkLENBQUM7UUFFTixFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFB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