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
import { define as __sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';
import { __injectStyle, __querySelectorLive, __traverseUp, __whenIframeReady, } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './defineApp';
import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __ajaxAdapter from './adapters/ajaxAdapter';
// @ts-ignore
import __websiteUiCss from '../css/s-carpenter-app-website-ui.css';
// define components
__sSpecsEditorComponentDefine();
export default class SCarpenterComponent extends __SLitComponent {
    static create(attributes = {}, to = document.body) {
        const domParser = new DOMParser(), $carpenter = domParser.parseFromString(`<s-carpenter ${Object.keys(attributes).map((attr) => {
            const value = attributes[attr];
            return ` ${attr}="${value}" `;
        })}></s-carpenter>`, 'text/html');
        to.appendChild($carpenter.body.children[0]);
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SCarpenterComponentInterface);
    }
    static get styles() {
        return css ``;
        return css `
            ${unsafeCSS(__css)}
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
        super(__deepMerge({
            name: 's-carpenter-app',
            interface: __SCarpenterComponentInterface,
            carpenter: __SSugarConfig.get('carpenter'),
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
            __hotkey('escape').on('press', () => {
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
            yield __wait(200);
            // Create UI placeholders
            this._updateUiPlaceholders();
            yield __wait(2000);
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
        this._watchHoverOnSpecElements();
        // listen for click on links in the iframe to close the editor
        this._$websiteDocument.addEventListener('click', (e) => {
            // check the clicked item
            if (e.target.tagName === 'A' && e.target.hasAttribute('href')) {
                this._closeEditor();
                return;
            }
            // traverse up to see if clicked element is in a link
            const $link = __traverseUp(e.target, ($elm) => $elm.tagName === 'A' && $elm.hasAttribute('href'));
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
            yield __whenIframeReady(this._$websiteIframe);
            // injecting the whole website into the iframe
            __injectIframeContent(this._$websiteIframe, $html.documentElement.innerHTML);
            this._$websiteIframe.addEventListener('load', (e) => __awaiter(this, void 0, void 0, function* () {
                yield __whenIframeReady(this._$websiteIframe);
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
            yield __whenIframeReady(this._$websiteIframe);
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
        __querySelectorLive(`[s-specs]`, ($elm) => {
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
            yield __wait();
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
                $elm.setAttribute('id', __uniqid());
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
                yield __wait();
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
        return html `
            ${this.props.sidebar
            ? html `
                      <nav class="${this.utils.cls('_sidebar')}">
                          <div class="${this.utils.cls('_logo')}">
                              ${unsafeHTML(this.props.logo)}
                          </div>

                          <div class="${this.utils.cls('_navigation')}">
                              <ul class="s-fs-tree">
                                  ${Object.keys(this._data.specsBySources).map((sourceId) => {
                var _a;
                const sourceObj = this._data.specsBySources[sourceId];
                if (typeof sourceObj === 'function') {
                    return '';
                }
                return html `
                                              <li
                                                  class="${this.state.activeNavigationFolders.includes(sourceId)
                    ? 'active'
                    : ''}"
                                              >
                                                  <div
                                                      @pointerup=${() => this._toggleNavigationFolder(sourceId)}
                                                  >
                                                      ${this.state.activeNavigationFolders.includes(sourceId)
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
                                                          >${(_a = sourceObj.title) !== null && _a !== void 0 ? _a : sourceId}</span
                                                      >
                                                  </div>
                                                  <ul>
                                                      ${Object.keys(sourceObj.specs).map((dotpath) => {
                    var _a;
                    const specObj = sourceObj.specs[dotpath];
                    return html `
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
            ? html `
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
            ? html `
                      <nav class="${this.utils.cls('_media')}" s-ui>
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys((_f = (_e = (_d = this._data.frontspec) === null || _d === void 0 ? void 0 : _d.media) === null || _e === void 0 ? void 0 : _e.queries) !== null && _f !== void 0 ? _f : {}).map((query) => {
                return html `
                                      <li
                                          @pointerup=${() => this._activateMedia(query)}
                                          class="s-color s-color--accent ${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} ${this.utils.cls('_query _item')}"
                                      >
                                          ${unsafeHTML(this.props.specs[query])}
                                          ${__upperFirst(query)}
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
SCarpenterComponent._registeredAdapters = {
    ajax: __ajaxAdapter,
};
SCarpenterComponent.state = {
    activeNavigationFolders: [],
    hoveredDotpath: null,
    $currentElement: null,
    $hoveredElement: null,
    activeMedia: null,
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixZQUFZLEVBQ1osaUJBQWlCLEdBQ3BCLE1BQU0seUJBQXlCLENBQUM7QUFFakMsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxRQUFRLE1BQU0sYUFBYSxDQUFDO0FBRW5DLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2hFLE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELGFBQWE7QUFDYixPQUFPLGNBQWMsTUFBTSx1Q0FBdUMsQ0FBQztBQXlCbkUsb0JBQW9CO0FBQ3BCLDZCQUE2QixFQUFFLENBQUM7QUFrRGhDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW9CLFNBQVEsZUFBZTtJQUM1RCxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWtCLEVBQUUsRUFBRSxL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