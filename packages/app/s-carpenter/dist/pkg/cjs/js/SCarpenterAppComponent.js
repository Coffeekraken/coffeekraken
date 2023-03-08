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
const ajaxAdapter_1 = __importDefault(require("./adapters/ajaxAdapter"));
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
            (0, keyboard_1.__hotkey)('escape').on('press', () => {
                this._closeEditor();
            });
            // create the toolbar element
            this._getToolbarElement();
            // watch for hover on carpenter elements
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
                $elm.setAttribute('id', (0, string_1.__uniqid)());
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
        var _a, _b, _c;
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

            ${((_c = (_b = this._data.frontspec) === null || _b === void 0 ? void 0 : _b.media) === null || _c === void 0 ? void 0 : _c.queries) && this.props.iframe
            ? (0, lit_1.html) `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFFakcsMkRBQXNEO0FBQ3RELDJEQUF3RDtBQUN4RCx1REFBeUQ7QUFDekQsdURBQW9FO0FBQ3BFLDZCQUEyQztBQUMzQyxrRUFBMkQ7QUFDM0QsNEdBQXNGO0FBRXRGLGlEQUE4RDtBQUU5RCxrRkFBMEQ7QUFFMUQsNERBQW1DO0FBdXNCZCxpQkF2c0JkLG1CQUFRLENBdXNCWTtBQXJzQjNCLHlFQUFtRDtBQTBCbkQsb0JBQW9CO0FBQ3BCLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQWtEaEMsTUFBcUIsbUJBQW9CLFNBQVEseUJBQWU7SUFDNUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFrQixFQUFFLEVBQUUsS0FBa0IsUUFBUSxDQUFDLElBQUk7UUFDL0QsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsRUFDN0IsVUFBVSxHQUFHLFNBQVMsQ0FBQyxlQUFlLENBQ2xDLGdCQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pELE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixPQUFPLElBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxpQkFBaUIsRUFDbkIsV0FBVyxDQUNkLENBQUM7UUFFTixFQUFFLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHNDQUE4QixDQUNqQyxDQUFDO0lBQ04sQ0FBQztJ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