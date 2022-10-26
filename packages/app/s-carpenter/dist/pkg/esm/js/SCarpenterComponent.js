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
            $elm._id = __uniqid();
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
                yield __wait();
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
        return html `
            <div class="${this.componentUtils.className('', null, 's-bare')}">
                <nav class="${this.componentUtils.className('__sidebar')}">
                    <div class="${this.componentUtils.className('__logo')}">
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
                                                          ${unsafeHTML(this.props.icons
                    .folderOpen)}
                                                      `
                : html `
                                                          ${unsafeHTML(this.props.icons
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
            ? html `
                              <s-specs-editor
                                  specs="${JSON.stringify(this.state.currentSpecs)}"
                              >
                              </s-specs-editor>
                          `
            : ''}
                </nav>

                ${((_b = (_a = this._data.frontspec) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.queries)
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
                                              ${unsafeHTML(this.props.icons[query])}
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
    currentSpecs: null,
    hoveredDotpath: null,
    $currentElement: null,
    activeMedia: 'desktop',
};
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksNkJBQTZCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUVqRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sOEJBQThCLE1BQU0sMENBQTBDLENBQUM7QUFFdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFOUQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBRWhDLE9BQU8sYUFBYSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQyxDQUFDLCtCQUErQjtBQVFsRyxvQkFBb0I7QUFDcEIsNkJBQTZCLEVBQUUsQ0FBQztBQTBDaEMsTUFBTSxDQUFDLE9BQU8sT0FBTyxtQkFBb0IsU0FBUSxlQUFlO0lBMEM1RDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixJQUFJLEVBQUUsYUFBYTtZQUNu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