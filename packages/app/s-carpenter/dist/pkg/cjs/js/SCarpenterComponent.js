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
            this._data = yield this._getData(this.props.source);
            // active the default media if not set
            if (!this.state.activeMedia) {
                this.state.activeMedia = this._data.frontspec.media.defaultMedia;
            }
            // check the specified adapter
            if (!SCarpenterComponent._registeredAdapters[this.props.adapter]) {
                console.log(this);
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
                    if (e.currentTarget._id &&
                        e.currentTarget._id === ((_a = this.state.$currentElement) === null || _a === void 0 ? void 0 : _a._id)) {
                        return;
                    }
                    if ((_b = this._$toolbar) === null || _b === void 0 ? void 0 : _b.parent) {
                        return;
                    }
                    // activate the element if needed
                    this._activateElement(e.currentTarget);
                    // set the hovered dotpath
                    this.state.hoveredDotpath = $elm.getAttribute('s-specs');
                });
            }, {
                rootNode: this._$document.body,
            });
            // listen spec editor update
            this.addEventListener('s-specs-editor.update', (e) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // make use of the specified adapter to update the component/section/etc...
                const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.adapter].setProps({
                    $elm: this.state.$currentElement,
                    props: (_a = e.detail.values) !== null && _a !== void 0 ? _a : {},
                    component: this,
                });
                if (adapterResult) {
                    this.state.$currentElement = adapterResult;
                }
            }));
            // listen on click
            this._$toolbar.addEventListener('pointerup', (e) => {
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
                console.log(this.state.currentSpecs);
                // open the editor
                this._openEditor();
            });
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
     * Add the "editor" micro menu to the element
     */
    _activateElement($elm) {
        var _a;
        if ($elm._id && ((_a = this.state.$currentElement) === null || _a === void 0 ? void 0 : _a._id) === $elm._id) {
            return;
        }
        // position toolbar
        this._setToolbarPosition($elm);
        // set the current element
        this.state.$currentElement = $elm;
        if (!$elm._id) {
            $elm._id = (0, string_1.__uniqid)();
        }
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
            const adapterResult = yield SCarpenterComponent._registeredAdapters[this.props.adapter].change({
                dotpath,
                $elm: this.props.iframe
                    ? this._$document.body.children[0]
                    : this.state.$currentElement,
                props: {},
                component: this,
            });
            if (adapterResult) {
                this.state.$currentElement = adapterResult;
            }
            // save arrival state
            if (pushState) {
                window.history.pushState({
                    dotpath,
                }, document.title, this.props.pagesLink.replace('%dotpath', dotpath));
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
                if (source.startsWith('/') || source.match(/^http?s\:\/\//)) {
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
                <nav class="${this.componentUtils.className('__sidebar')}">
                    <div class="${this.componentUtils.className('__logo')}">
                        ${(0, unsafe_html_js_1.unsafeHTML)(this.props.logo)}
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
                                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons
                    .folderOpen)}
                                                      `
                : (0, lit_1.html) `
                                                          ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons
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
                                                            class="${document.location.href.includes(specObj.metas
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

                ${((_b = (_a = this._data.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.queries)
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
                                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons[query])}
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
    activeMedia: 'desktop',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCxxRkFBaUc7QUFFakcsMkRBQXNEO0FBQ3RELGlEQUE4RTtBQUM5RSwyREFBd0Q7QUFDeEQsdURBQXlEO0FBQ3pELHVEQUFvRTtBQUNwRSw2QkFBMkM7QUFDM0Msa0VBQTJEO0FBQzNELDRHQUFzRjtBQUV0RixpREFBOEQ7QUFFOUQsa0ZBQTBEO0FBRTFELHNEQUFnQztBQXNtQlgsaUJBdG1CZCxnQkFBUSxDQXNtQlk7QUFwbUIzQix5RUFBbUQ7QUFFbkQsYUFBYTtBQUNiLDhHQUFrRSxDQUFDLCtCQUErQjtBQVFsRyxvQkFBb0I7QUFDcEIsSUFBQSxpQ0FBNkIsR0FBRSxDQUFDO0FBMENoQyxNQUFxQixtQkFBb0IsU0FBUSx5QkFBZTtJQTBDNUQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsU0FBUyxFQUFFLHNDQUE4QjtZQUN6QyxTQUFTLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO1NBQzdDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQWpERCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixzQ0FBOEIsQ0FDakMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyxtQ0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBS0QsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsRUFBVSxFQUNWLE9BQW9DO1FBRXBDLElBQUksbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDWCx3Q0FB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