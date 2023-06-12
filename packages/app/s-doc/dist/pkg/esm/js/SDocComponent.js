var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent, { html } from '@coffeekraken/s-lit-component';
import { __upperFirst } from '@coffeekraken/sugar/string';
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDocComponentInterface from './interface/SDocComponentInterface';
import { __isColor } from '@coffeekraken/sugar/is';
import { __replaceChunks } from '@coffeekraken/sugar/string';
// @ts-ignore
import __css from '../../../../src/css/s-doc-component.css'; // relative to /dist/pkg/esm/js
import __define from './define';
/**
 * @name                SDocComponent
 * @as                  Doc explorer
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SDocComponentInterface.ts
 * @platform            html
 * @status              beta
 *
 * This component allows you to display and explorer documentations
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import      import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
 *
 * @snippet         __SDocComponentDefine($1)
 *
 * @install           shell
 * npm i @coffeekraken/s-doc
 *
 * @install           js
 * import { define as __SDocComponentDefine } from '@coffeekraken/s-doc';
 * __SDocComponentDefine();
 *
 * @example         html        Simple documentation explorer
 * <s-doc></s-doc>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default class SDocComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SDocComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    static get state() {
        return {};
    }
    constructor() {
        super(__deepMerge({
            name: 's-doc',
            interface: __SDocComponentInterface,
        }));
        this._status = {
            loading: false,
            fullscreen: false,
        };
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // add shortcuts
            this._registerShortcuts();
            // load the categories
            const request = yield fetch(this.props.endpoints.base), categories = yield request.json();
            this._categories = categories;
            this.requestUpdate();
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // get the search input
            this._$searchInput = this.querySelector(`.${this.utils.cls('_search-input')}`);
            // get the body element
            this._$body = this.querySelector(`.${this.utils.cls('_body')}`);
        });
    }
    /**
     * Register some shortcuts
     */
    _registerShortcuts() {
        document.addEventListener('keyup', (e) => {
            var _a;
            if (e.key === 's' && e.ctrlKey) {
                (_a = this._$searchInput) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else if (e.key === 'd' && e.ctrlKey) {
                this._toggleFullscreen();
            }
        });
    }
    _loadItem(itemObj) {
        return __awaiter(this, void 0, void 0, function* () {
            // request the item if needed
            if (!itemObj.cache) {
                // set the item loading state
                itemObj.loading = true;
                this._status.loading = true;
                this.requestUpdate();
                const request = yield fetch(this.props.endpoints.item.replace(':id', itemObj.id)), item = yield request.json();
                // store the item in itemObj for later
                itemObj.cache = item;
            }
            // reset the current item
            // this is to make sure the s-code-example update itself correctly
            this._item = null;
            this.requestUpdate();
            // wait a loop and set the new item
            setTimeout(() => {
                var _a, _b;
                itemObj.loading = false;
                this._status.loading = false;
                this._item = itemObj.cache;
                this.requestUpdate();
                // scroll top body
                (_b = (_a = this._$body) === null || _a === void 0 ? void 0 : _a.scrollTo) === null || _b === void 0 ? void 0 : _b.call(_a, {
                    top: 0,
                    behavior: 'smooth',
                });
            });
        });
    }
    _loadItems(category, loadFirstItem = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (category._loading) {
                return;
            }
            category._loading = true;
            this._status.loading = true;
            const request = yield fetch(this.props.endpoints.items.replace(':filters', encodeURIComponent(JSON.stringify(category.filters)))), items = yield request.json();
            category.items = items;
            // load first item if needed
            if (loadFirstItem) {
                const firstItemId = Object.keys(items)[0];
                this._loadItem(items[firstItemId]);
            }
            else {
                this._status.loading = false;
                this.requestUpdate();
            }
        });
    }
    _search(value) {
        this._searchValue = value;
        this.requestUpdate();
    }
    _exitFullscreen() {
        this._$placeholder.after(this);
        this._$placeholder.remove();
        this.classList.remove(this.utils.cls('-fullscreen'));
        this._status.fullscreen = false;
        this.requestUpdate();
        window.scrollTo({
            top: this.getBoundingClientRect().top - 200,
        });
    }
    _enterFullscreen() {
        __escapeQueue(() => {
            this._exitFullscreen();
        }, {
            id: 's-doc',
        });
        this._$placeholder = document.createElement('div');
        this.before(this._$placeholder);
        document.body.appendChild(this);
        this.classList.add(this.utils.cls('-fullscreen'));
        this._status.fullscreen = true;
        this.requestUpdate();
    }
    _toggleFullscreen() {
        if (this._status.fullscreen) {
            this._exitFullscreen();
        }
        else {
            this._enterFullscreen();
        }
    }
    _renderItems(items) {
        let searchReg;
        if (this._searchValue) {
            searchReg = new RegExp(this._searchValue.replace(/\s/gm, '|'), 'gi');
        }
        return html `
            <ul class="${this.utils.cls('_items')}">
                ${Object.keys(items).map((namespace) => {
            var _a, _b, _c;
            const itemObj = items[namespace];
            // filter search
            if (this._searchValue && !searchReg.test(itemObj.id)) {
                return;
            }
            return html `
                        <li
                            class="${this.utils.cls('_item')} ${((_a = this._item) === null || _a === void 0 ? void 0 : _a.id) === itemObj.id
                ? 'active'
                : ''}"
                            @click=${(e) => {
                e.stopPropagation();
                this._loadItem(itemObj);
            }}
                        >
                            <div>
                                ${itemObj.loading
                ? html `
                                          <div
                                              class="s-loader:square-dots ${this.utils.cls(null, 's-color:accent s-mie:10')}"
                                          ></div>
                                      `
                : ''}
                                <span>
                                    ${this._searchValue
                ? html `
                                              ${unsafeHTML(__replaceChunks((_b = itemObj.as) !== null && _b !== void 0 ? _b : itemObj.name, this._searchValue.split(' '), (chunk) => {
                    return `<span class="s-tc--accent">${chunk}</span>`;
                }))}
                                          `
                : (_c = itemObj.as) !== null && _c !== void 0 ? _c : itemObj.name}
                                </span>
                            </div>
                        </li>
                    `;
        })}
            </ul>
        `;
    }
    _renderItemDefault(itemObj) {
        var _a;
        let addon = '';
        if (__isColor((_a = itemObj.default) !== null && _a !== void 0 ? _a : '')) {
            addon = unsafeHTML(`<span class="${this.utils.cls('_color-preview')}" style="background: ${itemObj.default}"></span>`);
        }
        return html `
            ${itemObj.default !== undefined && itemObj.default !== 'undefined'
            ? html `
                      <div class="${this.utils.cls('_config-default')}">
                          <span class="_value">${itemObj.default}</span>
                          ${addon
                ? html ` <span class="_addon">${addon}</span> `
                : ''}
                      </div>
                  `
            : ''}
        `;
    }
    _renderItemMetas(itemObj) {
        var _a, _b, _c, _d;
        return html `
            <header class="${this.utils.cls('_metas')}">
                ${itemObj.name
            ? html `
                          <h1
                              class="${this.utils.cls('_doc-title', 's-typo--h1 s-mbe--30')}"
                          >
                              ${(_a = itemObj.as) !== null && _a !== void 0 ? _a : itemObj.name}
                              ${itemObj.status
                ? html ` <span
                                        class="${this.utils.cls('_doc-status', `s-badge s-color:${itemObj.status === 'stable'
                    ? 'success'
                    : itemObj.status === 'beta'
                        ? 'accent'
                        : 'error'}`)}"
                                        >${itemObj.status}</span
                                    >`
                : ''}
                          </h1>
                      `
            : ''}
                ${((_d = (_c = (_b = itemObj.type) === null || _b === void 0 ? void 0 : _b.raw) === null || _c === void 0 ? void 0 : _c.toLowerCase) === null || _d === void 0 ? void 0 : _d.call(_c)) === 'config'
            ? html `
                          <div class="${this.utils.cls('_file', 's-mbe--30')}">
                              ${unsafeHTML(this.props.icons.file)}
                              <span>.sugar/${itemObj.name}.config.ts</span>
                          </div>
                      `
            : ''}
                ${itemObj.description
            ? html `
                <p class="${this.utils.cls('_doc-description', 's-typo--lead s-mbe--30')}">${itemObj.description}</h1>
            `
            : ''}
            </header>
        `;
    }
    _renderItemConfig(configObj) {
        var _a, _b;
        return html `
            <div class="${this.utils.cls('_config')}">
                <div class="${this.utils.cls('_config-metas')}">
                    <div class="${this.utils.cls('_config-name')}">
                        ${configObj.id.replace(/^.*\.config\./, '')}
                    </div>
                    ${this._renderItemDefault(configObj)}
                    <div class="${this.utils.cls('_config-type')}">
                        ${(_b = (_a = configObj.type) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : configObj.type}
                    </div>
                </div>
                <p class="${this.utils.cls('_param-description')}">
                    ${configObj.description}
                </p>
            </div>
        `;
    }
    _renderItemExamples(itemObj) {
        return html `
            ${itemObj.example
            ? html `
                      <div class="${this.utils.cls('_examples')}">
                          <h2
                              class="${this.utils.cls('_section-title', 's-typo--h2 s-mbe--30')}"
                          >
                              ${this.props.i18n.examplesTitle}
                          </h2>
                          ${itemObj.example.map((example) => {
                var _a, _b;
                return html `
                                  <div
                                      class="${this.utils.cls('_example', 's-mbe--50')}"
                                  >
                                      <h3
                                          class="${this.utils.cls('_example-title', 's-typo--h3 s-mbe--50')}"
                                      >
                                          ${__upperFirst((_a = example.title) !== null && _a !== void 0 ? _a : '')}
                                      </h3>
                                      ${((_b = itemObj.type.raw) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ===
                    'styleguide'
                    ? html `<div
                                                class="${this.utils.cls('_example-preview', 's-mbe--50')}"
                                            >
                                                ${unsafeHTML(example.code)}
                                            </div>`
                    : ''}
                                      <s-code-example bare=${this.props.bare}>
                                          <code lang="${example.language}">
                                              ${example.code}
                                          </code>
                                      </s-code-example>
                                  </div>
                              `;
            })}
                      </div>
                  `
            : ''}
        `;
    }
    _renderItem(itemObj) {
        // markdown support
        if (itemObj.docHtml) {
            return html `
                <div class="s-format:text s-rhythm:vertical">
                    ${unsafeHTML(itemObj.docHtml)}
                </div>
            `;
        }
        if (itemObj.type.raw.toLowerCase() === 'config') {
            return html `
                ${this._renderItemMetas(itemObj)}

                <div class="${this.utils.cls('_configs')}">
                    ${itemObj.docblocks
                .slice(1)
                .map((configObj) => html `
                                ${this._renderItemConfig(configObj)}
                            `)}
                </div>
            `;
        }
        // default item
        return html `
            ${this._renderItemMetas(itemObj)}
            ${this._renderItemExamples(itemObj)}
            ${itemObj.param
            ? html `
                      <div class="${this.utils.cls('_params')}">
                          <h2
                              class="${this.utils.cls('_section-title', 's-typo--h2 s-mbe--30')}"
                          >
                              ${this.props.i18n.paramsTitle}
                          </h2>
                          ${Object.keys(itemObj.param).map((param) => {
                var _a, _b;
                const paramObj = itemObj.param[param];
                return html `
                                  <div class="${this.utils.cls('_param')}">
                                      <div
                                          class="${this.utils.cls('_param-metas')}"
                                      >
                                          <div
                                              class="${this.utils.cls('_param-name')}"
                                          >
                                              ${paramObj.name}
                                          </div>
                                          ${this._renderItemDefault(paramObj)}
                                          <div
                                              class="${this.utils.cls('_param-type')}"
                                          >
                                              ${(_b = (_a = paramObj.type) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : paramObj.type}
                                          </div>
                                      </div>
                                      <p
                                          class="${this.utils.cls('_param-description')}"
                                      >
                                          ${paramObj.description}
                                      </p>
                                  </div>
                              `;
            })}
                      </div>
                  `
            : ''}
        `;
    }
    _renderCategories(categories) {
        return html `
            <ul class="${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
            const categoryObj = categories[categoryId];
            if (!categoryObj.items && !categoryObj.children) {
                if (!this._firstCategory) {
                    this._loadItems(categoryObj, true);
                }
                else {
                    this._loadItems(categoryObj);
                }
            }
            if (!this._firstCategory) {
                categoryObj.selected = true;
                this._firstCategory = categoryObj;
            }
            return html `
                        <li
                            class="${this.utils.cls('_category')} ${categoryObj.selected || this._searchValue
                ? 'active'
                : ''}"
                            @click=${(e) => {
                e.stopPropagation();
                categoryObj.selected = !categoryObj.selected;
                this.requestUpdate();
            }}
                        >
                            <div>
                                ${categoryObj.selected
                ? html `
                                          <i class="s-icon:folder-opened"></i>
                                      `
                : html ` <i class="s-icon:folder"></i> `}
                                <span> ${categoryObj.title} </span>
                            </div>
                            ${categoryObj.selected && categoryObj.children
                ? html `
                                      ${this._renderCategories(categoryObj.children)}
                                  `
                : (categoryObj.selected || this._searchValue) &&
                    categoryObj.items
                    ? html `
                                      ${this._renderItems(categoryObj.items)}
                                  `
                    : ''}
                        </li>
                    `;
        })}
            </ul>
        `;
    }
    render() {
        return html `
            <div class="${this.utils.cls('_explorer')}">
                <label
                    class="${this.utils.cls('_search', 's-input-container--addon')}"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="${this.props.i18n.search} (CTRL+S)"
                        class="${this.utils.cls('_search-input')}"
                        @keyup=${(e) => {
            this._search(e.target.value);
        }}
                    />
                    <div>
                        <i class="s-icon:search"></i>
                    </div>
                </label>
                ${this._renderCategories(this._categories)}
            </div>
            <div class="${this.utils.cls('_content')}">
                <div class="${this.utils.cls('_body')}">
                    ${this._item ? html ` ${this._renderItem(this._item)} ` : ''}
                </div>
                <div class="${this.utils.cls('_toolbar')}">
                    ${this.props.features.fullscreen
            ? html `
                              <button
                                  class="${this.utils.cls('_fullscreen-btn')}"
                                  title="${this.props.i18n
                .toggleFullscreen} (CTRL+D"
                                  @click=${(e) => {
                e.stopPropagation();
                this._toggleFullscreen();
            }}
                              >
                                  ${this._status.fullscreen
                ? html `
                                            ${unsafeHTML(this.props.icons.exitFullscreen)}
                                        `
                : html `
                                            ${unsafeHTML(this.props.icons
                    .enterFullscreen)}
                                        `}
                              </button>
                          `
            : ''}
                </div>
                ${this._status.loading
            ? html `
                          <div class="${this.utils.cls('_loading')}">
                              ${unsafeHTML(this.props.loaderSvg)}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sd0JBQXdCLE1BQU0sb0NBQW9DLENBQUM7QUFFMUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0seUNBQXlDLENBQUMsQ0FBQywrQkFBK0I7QUFFNUYsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBU2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLGVBQWU7SUFDdEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3QkFBd0IsQ0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxLQUFLO1FBQ1osT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lB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