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
import { __escapeQueue } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
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
            ${itemObj.example
            ? html `
                      <div class="${this.utils.cls('_examples')}">
                          <h2
                              class="${this.utils.cls('_section-title', 's-typo--h2 s-mbe--30')}"
                          >
                              ${this.props.i18n.examplesTitle}
                          </h2>
                          ${itemObj.example.map((example) => html `
                                  <s-code-example bare=${this.props.bare}>
                                      <code lang="${example.language}">
                                          ${example.code}
                                      </code>
                                  </s-code-example>
                              `)}
                      </div>
                  `
            : ''}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLHdCQUF3QixNQUFNLG9DQUFvQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLHlDQUF5QyxDQUFDLENBQUMsK0JBQStCO0FBRTVGLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQVNoQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxlQUFlO0lBQ3RELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysd0JBQXdCLENBQzNCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQWNEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2Is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