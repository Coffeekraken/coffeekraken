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
import { __escapeQueue, __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDocComponentInterface from './interface/SDocComponentInterface';
import { __isColor } from '@coffeekraken/sugar/is';
import { __replaceChunks } from '@coffeekraken/sugar/string';
// @ts-ignore
import __css from '../../../../src/css/s-doc-component.css'; // relative to /dist/pkg/esm/js
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
 * import { __define as __SDocComponentDefine } from '@coffeekraken/s-doc';
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
        __hotkey('ctrl+d', {
            title: 'Documentation',
            description: 'Access the documentation easily',
        }).on('press', (e) => {
            this._toggleFullscreen();
        });
        __hotkey('ctrl+s', {
            title: 'Search',
            description: 'Search the documentation',
        }).on('press', (e) => {
            var _a;
            (_a = this._$searchInput) === null || _a === void 0 ? void 0 : _a.focus();
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
                const request = yield fetch(`${this.props.endpoints.base}${this.props.endpoints.item.replace(':id', itemObj.id)}`), item = yield request.json();
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
            const request = yield fetch(`${this.props.endpoints.base}${this.props.endpoints.items}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(category.filters),
            }), items = yield request.json();
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
                            tabindex="0"
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
                            tabindex="0"
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
                        placeholder="${this.props.i18n.search} (CTRL+f)"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLHdCQUF3QixNQUFNLG9DQUFvQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsYUFBYTtBQUNiLE9BQU8sS0FBSyxNQUFNLHlDQUF5QyxDQUFDLENBQUMsK0JBQStCO0FBUzVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLGVBQWU7SUFDdEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3QkFBd0IsQ0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxLQUFLO1FBQ1osT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBY0Q7UUFDSSxLQUFLLENBQ0QsV0FB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