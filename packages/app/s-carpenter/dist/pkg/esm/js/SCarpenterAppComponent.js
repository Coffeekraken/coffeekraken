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
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './defineApp';
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
        this._$iframe = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b.querySelector('iframe.s-carpenter_iframe');
        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.href = '/dist/css/carpenter.css';
        document.body.appendChild($style);
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // get the data
            this._data = yield this._getData(this.props.specs);
            if (!this._data) {
                throw new Error(`[SCarpenter] Sorry but no valid specs have been specified...`);
            }
            // active the default media if not set
            if (!this.state.activeMedia) {
                this.state.activeMedia = this._data.frontspec.media.defaultMedia;
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
            // listen for escape key press to close editor
            __hotkey('escape').on('press', () => {
                this._closeEditor();
            });
            // create the toolbar element
            this._getToolbarElement();
            // watch for hover on carpenter elements
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
            // listen spec editor update
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
            // listen on click
            this._$toolbar.addEventListener('pointerup', (e) => __awaiter(this, void 0, void 0, function* () {
                var _c;
                // do not activate 2 times the same element
                if (((_c = this.state.$currentElement.id) === null || _c === void 0 ? void 0 : _c.trim()) &&
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
            // handle popstate
            this._window.addEventListener('popstate', (e) => {
                this._changePage(e.state.dotpath, false);
            });
        });
    }
    firstUpdated() {
        this._$editor = document.querySelector(`.${this.utils.cls('_editor')}`);
        if (!this._$editor) {
            throw new Error(`<red>[SCarpenterAppComponent]</red> Something goes wrong. No ".${this.utils.cls('_editor')}" element found...`);
        }
        // handle "scrolled" class on the editor
        this._handleScrolledClassOnEditor();
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
        (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.classList.add('s-carpenter--open');
    }
    /**
     * close the editor
     */
    _closeEditor() {
        var _a;
        document.body.classList.remove('s-carpenter-app--open');
        (_a = this._$iframe) === null || _a === void 0 ? void 0 : _a.classList.remove('s-carpenter--open');
    }
    /**
     * Create the toolbar element
     */
    _getToolbarElement() {
        if (this._$toolbar) {
            return this._$toolbar;
        }
        const $toolbar = document.createElement('div');
        $toolbar.classList.add('s-carpenter-toolbar');
        this._$toolbar = $toolbar;
        const $i = document.createElement('i');
        $i.classList.add('fa-regular', 'fa-pen-to-square');
        $toolbar.appendChild($i);
        // append toolbar to viewport
        this._$document.body.appendChild($toolbar);
        // return the created toolbar
        return $toolbar;
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
        const $toolbar = this._getToolbarElement();
        const targetRect = $from.getBoundingClientRect();
        $toolbar.style.top = `${targetRect.top + this._window.scrollY}px`;
        $toolbar.style.left = `${targetRect.left + targetRect.width + this._window.scrollX}px`;
    }
    /**
     * Activate a particular media query
     */
    _activateMedia(media) {
        this.state.activeMedia = media;
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
        var _a, _b, _c;
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

            ${((_c = (_b = this._data.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) && this.props.iframe
            ? html `
                      <style>
                          :root {
                              --s-carpenter-content-width: ${this._data
                .frontspec.media.queries[this.state.activeMedia].maxWidth
                ? `${(this._data.frontspec.media.queries[this.state.activeMedia].maxWidth /
                    100) *
                    75}px`
                : '100vw'};
                          }
                      </style>
                      <nav class="${this.utils.cls('_media')}">
                          <ul
                              class="${this.utils.cls('_queries', 's-tabs', 's-bare')}"
                          >
                              ${Object.keys(this._data.frontspec.media.queries).map((query) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDM0QsT0FBTyw4QkFBOEIsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU5RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUM7QUFFbkMsT0FBTyxhQUFhLE1BQU0sd0JBQXdCLENBQUM7QUEwQm5ELG9CQUFvQjtBQUNwQiw2QkFBNkIsRUFBRSxDQUFDO0FBa0RoQyxNQUFNLENBQUMsT0FBTyxPQUFPLG1CQUFvQixTQUFRLGVBQWU7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFrQixFQUFFLEVBQUUsS0FBa0IsUUFBUSxDQUFDLElBQUk7UUFDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsRUFDN0IsVUFBVSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQ2xDLGdCQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFVB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