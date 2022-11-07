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
const dom_1 = require("@coffeekraken/sugar/dom");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SCarpenterComponentInterface_1 = __importDefault(require("./interface/SCarpenterComponentInterface"));
const dom_2 = require("@coffeekraken/sugar/dom");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
const ajaxAdapter_1 = __importDefault(require("./adapters/ajaxAdapter"));
// @ts-ignore
const s_carpenter_component_css_1 = __importDefault(require("../../../../src/css/s-carpenter-component.css")); // relative to /dist/pkg/esm/js
// define components
(0, s_specs_editor_component_1.define)();
class SCarpenterComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-carpenter',
            interface: SCarpenterComponentInterface_1.default,
            carpenter: s_sugar_config_1.default.get('carpenter'),
        }));
        this._values = {};
    }
    static create(attributes = {}, to = document.body) {
        if ((0, dom_1.__isInIframe)() || document.querySelector('s-carpenter')) {
            return;
        }
        to.innerHTML += `<s-carpenter ${Object.keys(attributes).map((attr) => {
            const value = attributes[attr];
            return ` ${attr}="${value}" `;
        })}></s-carpenter>`;
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCarpenterComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_carpenter_component_css_1.default)}
        `;
    }
    static registerAdapter(id, adapter) {
        if (SCarpenterComponent._registeredAdapters[id]) {
            throw new Error(`[SCarpenterComponent] Sorry but the "${id}" adapter already exists...`);
        }
        SCarpenterComponent._registeredAdapters[id] = adapter;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // do not mount if is in an iframe
            if ((0, dom_1.__isInIframe)()) {
                return;
            }
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
            this._$document = document;
            // create the iframe if needed
            if (this.props.iframe) {
                if (typeof this.props.iframe === 'string') {
                    this._$iframe = document.querySelector(this.props.iframe);
                    if (!this._$iframe) {
                        throw new Error(`[SCarpenterComponent] You've set an iframe selector to be used but it resolves to nothing...`);
                    }
                }
                else {
                    this._$iframe = document.createElement('iframe');
                }
                // inject the current page content inside the iframe
                const iframeHtml = document.documentElement.outerHTML
                    .replace(/<s-carpenter/gm, '<s-nothing')
                    .replace(/<\/s-carpenter>/gm, '</s-nothing>');
                // add the correct class on the iframe
                this._$iframe.classList.add(this.componentUtils.className('__iframe'));
                // manage to add the iframe inside the body
                // alongside with the s-carpenter component
                this.remove();
                document.body.innerHTML = '';
                document.body.appendChild(this._$iframe);
                document.body.appendChild(this);
                // wait for the iframe to be ready
                // @TODO        check for better solution
                yield (0, datetime_1.__wait)(500);
                console.log('if', this._$iframe);
                // inject the iframe content
                (0, dom_1.__injectIframeContent)(this._$iframe, iframeHtml);
                // set the document to search in
                // which will be the iframe document
                this._$document = this._$iframe.contentWindow.document;
                // listen for escape in the iframe
                this._$document.addEventListener('keyup', (e) => {
                    if (e.keyCode == 27) {
                        this._closeEditor();
                    }
                });
                // add the "in-iframe" class
                this._$document.body.classList.add(this.componentUtils.className('-in-iframe'));
            }
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
            (0, dom_2.__querySelectorLive)(`[s-specs]`, ($elm) => {
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
            // listen on click
            this._$toolbar.addEventListener('pointerup', (e) => __awaiter(this, void 0, void 0, function* () {
                var _c;
                // do not activate 2 times the same element
                if (((_c = this.state.$currentElement.id) === null || _c === void 0 ? void 0 : _c.trim()) &&
                    this.state.$currentElement.id === this.state.$hoveredElement.id) {
                    return;
                }
                // force reset the specs editor
                this.state.currentSpecs = null;
                yield (0, datetime_1.__wait)();
                // try to get the spec from the data fetched at start
                let potentialDotpath = this.state.hoveredDotpath;
                if (this._data.specsMap[potentialDotpath]) {
                    this.state.currentSpecs = this._data.specsMap[potentialDotpath];
                }
                else {
                    potentialDotpath = `${potentialDotpath}.${potentialDotpath.split('.').slice(-1)[0]}`;
                    if (this._data.specsMap[potentialDotpath]) {
                        this.state.currentSpecs =
                            this._data.specsMap[potentialDotpath];
                    }
                }
                if (!this.state.currentSpecs) {
                    return;
                }
                // set the current element
                this._setCurrentElement(this.state.$hoveredElement);
                // open the editor
                this._openEditor();
            }));
            // handle popstate
            window.addEventListener('popstate', (e) => {
                this._changePage(e.state.dotpath, false);
            });
        });
    }
    /**
     * open the editor
     */
    _openEditor() {
        document.body.classList.add('s-carpenter--editor');
    }
    /**
     * close the editor
     */
    _closeEditor() {
        document.body.classList.remove('s-carpenter--editor');
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
                this.state.currentSpecs.values = values;
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
        $toolbar.style.top = `${targetRect.top + window.scrollY}px`;
        $toolbar.style.left = `${targetRect.left + targetRect.width + window.scrollX}px`;
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
            const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.specs].change({
                dotpath,
                $elm: this.props.specs
                    ? this._$document.body.children[0]
                    : this.state.$currentElement,
                props: specs,
                component: this,
            });
            if (adapterResult) {
                this.state.$currentElement = adapterResult;
            }
            // save arrival state
            if (pushState) {
                window.history.pushState({
                    dotpath,
                }, document.title, this.props.specs.replace('%dotpath', dotpath));
            }
            // update the currentSpecs
            const newSpecs = this._data.specsMap[dotpath];
            if (newSpecs !== this.state.currentSpecs) {
                this.state.currentSpecs = null;
                yield (0, datetime_1.__wait)();
                this.state.currentSpecs = newSpecs;
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
        var _a, _b;
        if (!this._data) {
            return '';
        }
        return (0, lit_1.html) `
            <div class="${this.componentUtils.className('', null, 's-bare')}">
                ${this.props.sidebar
            ? (0, lit_1.html) `
                          <nav
                              class="${this.componentUtils.className('__sidebar')}"
                          >
                              <div
                                  class="${this.componentUtils.className('__logo')}"
                              >
                                  ${(0, unsafe_html_js_1.unsafeHTML)(this.props.specs)}
                              </div>

                              <div
                                  class="${this.componentUtils.className('__navigation')}"
                              >
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
                        .specs
                        .folderOpen)}
                                                            `
                    : (0, lit_1.html) `
                                                                ${(0, unsafe_html_js_1.unsafeHTML)(this.props
                        .specs
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
                    class="__editor ${this.state.currentSpecs ? 'active' : ''}"
                >
                    ${this.state.currentSpecs
            ? (0, lit_1.html) `
                              <s-specs-editor
                                  specs="${JSON.stringify(this.state.currentSpecs)}"
                              >
                              </s-specs-editor>
                          `
            : ''}
                </nav>

                ${((_b = (_a = this._data.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.queries) && this.props.iframe
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
                          <nav
                              class="${this.componentUtils.className('__media')}"
                          >
                              <ul
                                  class="${this.componentUtils.className('__queries', 's-tabs', 's-bare')}"
                              >
                                  ${Object.keys(this._data.frontspec.media.queries).map((query) => {
                return (0, lit_1.html) `
                                          <li
                                              @pointerup=${() => this._activateMedia(query)}
                                              class="s-color s-color--accent ${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} ${this.componentUtils.className('__query __item')}"
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
            </div>
        `;
    }
}
exports.default = SCarpenterComponent;
SCarpenterComponent._registeredAdapters = {
    ajax: ajaxAdapter_1.default,
};
SCarpenterComponent.state = {
    activeNavigationFolders: [],
    currentSpecs: null,
    hoveredDotpath: null,
    $currentElement: null,
    $hoveredElement: null,
    activeMedia: 'desktop',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFFakcsMkRBQXNEO0FBQ3RELGlEQUE4RTtBQUM5RSwyREFBd0Q7QUFDeEQsdURBQXlEO0FBQ3pELHVEQUFvRTtBQUNwRSw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELDRHQUFzRjtBQUV0RixpREFBOEQ7QUFFOUQsa0ZBQTBEO0FBRTFELHNEQUFnQztBQWd0QlgsaUJBaHRCZCxnQkFBUSxDQWd0Qlk7QUE5c0IzQix5RUFBbUQ7QUFFbkQsYUFBYTtBQUNiLDhHQUFrRSxDQUFDLCtCQUErQjtBQXFCbEcsb0JBQW9CO0FBQ3BCLElBQUEsaUNBQTZCLEdBQUUsQ0FBQztBQTBDaEMsTUFBcUIsbUJBQW9CLFNBQVEseUJBQWU7SUF1RDVEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxhQUFhO1lBQ25CLFNBQVMsRUFBRSxzQ0FBOEI7WUFDekMsU0FBUyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztTQUM3QyxDQUFDLENBQ0wsQ0FBQztRQWROLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFlYixDQUFDO0lBOURELE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBa0IsRUFBRSxFQUFFLEtBQWtCLFFBQVEsQ0FBQyxJQUFJO1FBQy9ELElBQUksSUFBQSxrQkFBWSxHQUFFLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN6RCxPQUFPO1NBQ1Y7UUFDRCxFQUFFLENBQUMsU0FBUyxJQUFJLGdCQUFnQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2pFLE1BQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FB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