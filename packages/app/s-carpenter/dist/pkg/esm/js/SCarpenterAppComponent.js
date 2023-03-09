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
import { __injectStyle, __querySelectorLive, __whenIframeReady, } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './defineApp';
import { __injectIframeContent } from '@coffeekraken/sugar/dom';
import __ajaxAdapter from './adapters/ajaxAdapter';
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
            // set the document in which to search for items (s-specs) etc...
            this._$document = this.props.window.document;
            this._window = this.props.window;
            // get the first s-spec element that we can find
            // or get the first item in the body
            // and set it to the state.$currentElement to be sure we have something to
            // work with in the adapter, etc...
            let $firstSpecsElement = this._$document.querySelector('[s-specs]');
            if (!$firstSpecsElement) {
                $firstSpecsElement = this._$document.body.children[0];
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
            // const $backdrop = document.createElement('div');
            // $backdrop.classList.add(this.utils.cls('_backdrop'));
            // this.prepend($backdrop);
            // $backdrop.addEventListener('pointerover', (e) => {
            //     console.log('SS', e);
            // });
            // $backdrop.addEventListener('pointerout', (e) => {
            //     console.log('OUT', e);
            // });
            // handle media method
            yield this._handleMediaMethod();
            // create the toolbar element
            this._initToolbar();
            // listen for escape key press to close editor
            __hotkey('escape').on('press', () => {
                this._closeEditor();
            });
            __hotkey('escape', {
                // from the website itself
                element: this._$document,
            }).on('press', () => {
                this._closeEditor();
            });
            // listen for toolbar actions
            this._listenToolbarActions();
            // watch for hover on carpenter elements
            this._watchHoverOnSpecElements();
            // listen spec editor update
            this._listenSpecsEditorUpdate();
            // handle popstate
            this._window.addEventListener('popstate', (e) => {
                this._changePage(e.state.dotpath, false);
            });
            // handle "scrolled" class on the editor
            this._handleScrolledClassOnEditor();
            // Create UI placeholders
            setTimeout(() => {
                this._updateUiPlaceholders();
            }, 200);
        });
    }
    _updateUiPlaceholders() {
        if (!this._$uiPlaceholders) {
            this._$uiPlaceholders = document.createElement('div');
            this._$uiPlaceholders.classList.add('s-carpenter_ui-placeholders', 'active');
            let outTimeout, isActive = false;
            this._$uiPlaceholders.addEventListener('pointermove', (e) => {
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
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const mediaMethod = (_b = (_a = this._data.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.method;
            if (mediaMethod === 'container') {
                // getting the viewport element
                if (typeof this.props.viewportElm === HTMLElement) {
                    this._$viewport = this.props.viewportElm;
                }
                else if (typeof this.props.viewportElm === 'string') {
                    this._$viewport = this._window.document.querySelector(this.props.viewportElm);
                }
            }
            else if ((_d = (_c = this._data.frontspec) === null || _c === void 0 ? void 0 : _c.media) === null || _d === void 0 ? void 0 : _d.queries) {
                // create the wrapping iframe
                this._$websiteIframe = document.createElement('iframe');
                this._$websiteIframe.classList.add('s-carpenter_website-iframe');
                // get the actual page html to inject into the iframe
                const html = this._$document.documentElement.innerHTML;
                // prepend the website iframe in the body
                this._$document.body.prepend(this._$websiteIframe);
                // wait until the iframe is ready
                yield __whenIframeReady(this._$websiteIframe);
                // injecting the whole website into the iframe
                __injectIframeContent(this._$websiteIframe, html);
                // wait until the iframe is ready
                yield __whenIframeReady(this._$websiteIframe);
                // empty the document of all the nodes
                // unless the iframes
                ['body'].forEach((container) => {
                    Array.from(this._$document.querySelectorAll(`${container} > *`)).forEach((node) => {
                        var _a, _b;
                        if (((_b = (_a = node.tagName) === null || _a === void 0 ? void 0 : _a.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(_a)) === 'iframe') {
                            return;
                        }
                        node.remove();
                    });
                });
                // reset the _window and _$document references
                this._window = this._$websiteIframe.contentWindow;
                this._$document = this._$websiteIframe.contentWindow.document;
                // the "viewport" is not the website iframe
                this._$viewport = this._$websiteIframe;
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
            `, {
                    rootNode: this._$document.body,
                });
            }
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
                this.state.hoveredElement = $elm;
                // set the hovered dotpath
                this.state.hoveredDotpath = $elm.getAttribute('s-specs');
            });
        }, {
            rootNode: this._$document.body,
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
        const $toolbar = this._$document.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        this._$toolbar = $toolbar;
        const $i = this._$document.createElement('i');
        $i.classList.add('fa-regular', 'fa-pen-to-square');
        $toolbar.appendChild($i);
        // append toolbar to viewport
        this._$document.body.appendChild($toolbar);
        return this._$toolbar;
    }
    /**
     * Listen for toolbar actions
     */
    _listenToolbarActions() {
        this._$toolbar.addEventListener('pointerup', (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // do not activate 2 times the same element
            if (((_a = this.state.$currentElement.id) === null || _a === void 0 ? void 0 : _a.trim()) &&
                this.state.$currentElement.id === this.state.$hoveredElement.id) {
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
        }));
    }
    /**
     * Activate the element when toolbar has been clicked
     */
    _setCurrentElement($elm) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // ensure we have an id
            if (!$elm.id.trim()) {
                $elm.setAttribute('id', __uniqid());
            }
            // do not activate 2 times the same element
            if (this.state.$currentElement.id === $elm.id) {
                return;
            }
            // get values
            const values = (_a = this._values[$elm.id]) !== null && _a !== void 0 ? _a : (yield SCarpenterComponent._registeredAdapters[this.props.adapter].getProps({
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
        this._$toolbar.style.top = `${targetRect.top + this._window.scrollY}px`;
        this._$toolbar.style.left = `${targetRect.left + targetRect.width + this._window.scrollX}px`;
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
        this._$viewport.style.width = width;
    }
    /**
     * Change page with the dotpath
     */
    _changePage(dotpath, pushState = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.adapter].change({
                dotpath,
                $elm: this.props.specs
                    ? this._$document.body.children[0]
                    : this.state.$currentElement,
                props: this.props,
                component: this,
            });
            if (adapterResult) {
                this.state.$currentElement = adapterResult;
            }
            // save arrival state
            if (pushState) {
                this._window.history.pushState({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLEVBQ0gsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixpQkFBaUIsR0FDcEIsTUFBTSx5QkFBeUIsQ0FBQztBQUVqQyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUEyQm5ELG9CQUFvQjtBQUNwQiw2QkFBNkIsRUFBRSxDQUFDO0FBa0RoQyxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFrQixFQUFFLEVBQUUsS0FBa0IsUUFBUSxDQUFDLElBQUk7UUFDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVB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