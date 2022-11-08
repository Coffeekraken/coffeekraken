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
import { __injectIframeContent, __isInIframe } from '@coffeekraken/sugar/dom';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __uniqid, __upperFirst } from '@coffeekraken/sugar/string';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SCarpenterComponentInterface from './interface/SCarpenterComponentInterface';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __define from './define';
import __ajaxAdapter from './adapters/ajaxAdapter';
// @ts-ignore
import __css from '../../../../src/css/s-carpenter-component.css'; // relative to /dist/pkg/esm/js
// define components
__sSpecsEditorComponentDefine();
export default class SCarpenterComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-carpenter',
            interface: __SCarpenterComponentInterface,
            carpenter: __SSugarConfig.get('carpenter'),
        }));
        this.currentSpecs = null;
        this._values = {};
    }
    static create(attributes = {}, to = document.body) {
        if (__isInIframe() || document.querySelector('s-carpenter')) {
            return;
        }
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
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // do not mount if is in an iframe
            if (__isInIframe()) {
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
                // make sure we don't have any src on the iframe
                this._$iframe.setAttribute('src', 'about:blank');
                // manage to add the iframe inside the body
                // alongside with the s-carpenter component
                this.remove();
                document.body.innerHTML = '';
                document.body.appendChild(this._$iframe);
                document.body.appendChild(this);
                // wait for the iframe to be ready
                // @TODO        check for better solution
                yield __wait(500);
                // inject the iframe content
                __injectIframeContent(this._$iframe, iframeHtml);
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
                window.history.pushState({
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
            <div class="${this.componentUtils.className('', null, 's-bare')}">
                ${this.props.sidebar
            ? html `
                          <nav
                              class="${this.componentUtils.className('__sidebar')}"
                          >
                              <div
                                  class="${this.componentUtils.className('__logo')}"
                              >
                                  ${unsafeHTML(this.props.logo)}
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

                <nav class="__editor ${this.currentSpecs ? 'active' : ''}">
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
                          <nav
                              class="${this.componentUtils.className('__media')}"
                          >
                              <ul
                                  class="${this.componentUtils.className('__queries', 's-tabs', 's-bare')}"
                              >
                                  ${Object.keys(this._data.frontspec.media.queries).map((query) => {
                return html `
                                          <li
                                              @pointerup=${() => this._activateMedia(query)}
                                              class="s-color s-color--accent ${query ===
                    this.state.activeMedia
                    ? 'active'
                    : ''} ${this.componentUtils.className('__query __item')}"
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
            </div>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRWhDLE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQyxDQUFDLCtCQUErQjtBQXFCbEcsb0JBQW9CO0FBQ3BCLDZCQUE2QixFQUFFLENBQUM7QUEwQ2hDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sbUJBQW9CLFNBQVEsZUFBZTtJQStENUQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFD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