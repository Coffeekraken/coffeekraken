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
import { __unique } from '@coffeekraken/sugar/array';
import { __camelCase } from '@coffeekraken/sugar/string';
import { __base64 } from '@coffeekraken/sugar/crypto';
import { __escapeQueue, __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDocComponentInterface from './interface/SDocComponentInterface.js';
import { __scrollTo } from '@coffeekraken/sugar/dom';
import { __wait } from '@coffeekraken/sugar/datetime';
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
            const request = yield fetch(`${this.props.endpoints.base}${this.props.fetchExtension
                ? `.${this.props.fetchExtension}`
                : ''}`, {}), categories = yield request.json();
            this._categories = categories;
            this.requestUpdate();
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // get the search input
            this._$searchInput = this.querySelector(`.${this.utils.cls('_search-input')}`);
            // get the explorer
            this._$explorer = this.querySelector(`.${this.utils.cls('_explorer')}`);
            // get the menu button
            this._$menuBtn = this.querySelector(`.${this.utils.cls('_menu-btn')}`);
            document.body.appendChild(this._$menuBtn);
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
        __hotkey('ctrl+f', {
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
                const request = yield fetch(`${this.props.endpoints.base}${this.props.endpoints.item.replace(':id', itemObj.id)}${this.props.fetchExtension
                    ? `.${this.props.fetchExtension}`
                    : ''}`), item = yield request.json();
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
    _loadCategoryItems(category, loadFirstItem = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (category._loading) {
                return;
            }
            category._loading = true;
            this._status.loading = true;
            const request = yield fetch(`${this.props.endpoints.base}${this.props.endpoints.items}/${__base64.encrypt(JSON.stringify(category.filters))}${this.props.fetchExtension
                ? `.${this.props.fetchExtension}`
                : ''}`), items = yield request.json();
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
            <ul role="group" class="${this.utils.cls('_items')}">
                ${__unique(Object.keys(items))
            .sort((a, b) => {
            const aObj = items[a], bObj = items[b];
            if (aObj.name < bObj.name) {
                return -1;
            }
            if (aObj.name > bObj.name) {
                return 1;
            }
            return 0;
        })
            .map((namespace) => {
            var _a, _b, _c;
            const itemObj = items[namespace];
            // filter search
            if (this._searchValue && !searchReg.test(itemObj.id)) {
                return;
            }
            return html `
                            <li
                                role="treeitem"
                                class="${this.utils.cls('_item')} ${((_a = this._item) === null || _a === void 0 ? void 0 : _a.id) === itemObj.id
                ? 'active'
                : ''}"
                                tabindex="0"
                                @pointerup=${(e) => __awaiter(this, void 0, void 0, function* () {
                var _d, _e;
                e.stopPropagation();
                this._loadItem(itemObj);
                yield __wait(100);
                (_e = (_d = document.activeElement) === null || _d === void 0 ? void 0 : _d.blur) === null || _e === void 0 ? void 0 : _e.call(_d);
                __scrollTo(this._$body, {
                    offset: 100,
                });
            })}
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
                    return `<span class="s-tc-accent">${chunk}</span>`;
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
                          <h1 class="${this.utils.cls('_title', 's-mbe-30')}">
                              ${(_a = itemObj.as) !== null && _a !== void 0 ? _a : itemObj.name}
                              ${itemObj.status
                ? html ` <span
                                        class="${this.utils.cls('_status', `s-badge s-color:${itemObj.status === 'stable'
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
                          <div class="${this.utils.cls('_file', 's-mbe-30')}">
                              ${unsafeHTML(this.props.icons.file)}
                              <span>.sugar/${itemObj.name}.config.ts</span>
                          </div>
                      `
            : ''}
                ${itemObj.description
            ? html `
                <p class="${this.utils.cls('_description', 's-mbe-30')}">${itemObj.description}</h1>
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
    _renderItemCssClasses(itemObj) {
        return html `
            <div class="${this.utils.cls('_css-classes')}">
                <h2
                    class="${this.utils.cls('_section-title _classes-title', 's-mbe-30')}"
                >
                    ${this.props.i18n.cssClassesTitle}
                </h2>
            </div>
            ${Object.keys(itemObj.cssClasses).map((cls) => {
            const clsObj = itemObj.cssClasses[cls];
            return html `
                    <div class="${this.utils.cls('_classes')}">
                        <div class="${this.utils.cls('_classes-metas')}">
                            <div class="${this.utils.cls('_classes-name')}">
                                ${clsObj.name}
                            </div>
                        </div>
                        <p class="${this.utils.cls('_classes-description')}">
                            ${clsObj.description}
                        </p>
                    </div>
                `;
        })}
        `;
    }
    _renderItemParams(itemObj) {
        return html `
            <div class="${this.utils.cls('_params')}">
                <h2 class="${this.utils.cls('_section-title', 's-mbe-30')}">
                    ${this.props.i18n.paramsTitle}
                </h2>
                ${Object.keys(itemObj.param).map((param) => {
            var _a, _b;
            const paramObj = itemObj.param[param];
            return html `
                        <div class="${this.utils.cls('_param')}">
                            <div class="${this.utils.cls('_param-metas')}">
                                <div class="${this.utils.cls('_param-name')}">
                                    ${paramObj.name}
                                    ${paramObj.required
                ? html `<span
                                              class="${this.utils.cls('_required', 's-required')}"
                                          ></span>`
                : ''}
                                </div>
                                ${this._renderItemDefault(paramObj)}
                                <div class="${this.utils.cls('_param-type')}">
                                    ${(_b = (_a = paramObj.type) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : paramObj.type}
                                </div>
                            </div>
                            <p class="${this.utils.cls('_param-description')}">
                                ${paramObj.description}
                            </p>
                        </div>
                    `;
        })}
            </div>
        `;
    }
    _renderItemExamples(itemObj) {
        return html `
            ${itemObj.example
            ? html `
                      <div class="${this.utils.cls('_section _examples')}">
                          <h2
                              class="${this.utils.cls('_section-title', 's-mbe-30')}"
                          >
                              ${this.props.i18n.examplesTitle}
                          </h2>
                          ${itemObj.example.map((example) => {
                var _a, _b;
                return html `
                                  <div
                                      class="${this.utils.cls('_example', 's-mbe-50')}"
                                  >
                                      <h3
                                          class="${this.utils.cls('_example-title', 's-mbe-50')}"
                                      >
                                          ${__upperFirst((_a = example.title) !== null && _a !== void 0 ? _a : '')}
                                      </h3>
                                      ${((_b = itemObj.type.raw) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ===
                    'styleguide'
                    ? html `<div
                                                class="${this.utils.cls('_example-preview', 's-mbe-50')}"
                                            >
                                                ${unsafeHTML(example.code)}
                                            </div>`
                    : ''}
                                      <s-code-example bare=${this.props.bare}>
                                          <code language="${example.language}">
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
        var _a, _b, _c;
        // markdown support
        if (itemObj.docHtml) {
            return html `
                <div class="s-format:text s-rhythm:vertical">
                    ${unsafeHTML(itemObj.docHtml)}
                </div>
            `;
        }
        console.log('IT', itemObj);
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
        // cssClasses
        itemObj.cssClasses = (_a = itemObj.docblocks[0]) === null || _a === void 0 ? void 0 : _a.cssClass;
        // default item
        return html `
            <div
                s-deps
                css="${__camelCase((_c = (_b = itemObj.namespace) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.call(_b, '.').pop())}"
            >
                ${this._renderItemMetas(itemObj)}
                ${this._renderItemExamples(itemObj)}
                ${itemObj.param ? this._renderItemParams(itemObj) : ''}
                ${itemObj.cssClasses ? this._renderItemCssClasses(itemObj) : ''}
            </div>
        `;
    }
    _renderCategories(categories, role = 'tree') {
        return html `
            <ul role="${role}" class="${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
            const categoryObj = categories[categoryId];
            if (!categoryObj.items && !categoryObj.children) {
                if (!this._firstCategory) {
                    this._loadCategoryItems(categoryObj, true);
                }
                else {
                    this._loadCategoryItems(categoryObj);
                }
            }
            if (!this._firstCategory) {
                categoryObj.selected = true;
                this._firstCategory = categoryObj;
            }
            return html `
                        <li
                            role="treeitem"
                            class="${this.utils.cls('_category')} ${categoryObj.selected || this._searchValue
                ? 'active'
                : ''}"
                            tabindex="0"
                            @pointerup=${(e) => {
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
                                      ${this._renderCategories(categoryObj.children, 'group')}
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
            <button
                class="${this.utils.cls('_menu-btn')}"
                @pointerup=${(e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            yield __wait(100);
            this._$explorer.focus();
        })}
            >
                ${unsafeHTML(this.props.icons.menu)}
            </button>
            <div class="${this.utils.cls('_explorer')}" tabindex="0">
                <label
                    class="${this.utils.cls('_search', 's-input-container-addon')}"
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
                <div class="${this.utils.cls('_body')}" tabindex="0">
                    ${this._item ? html ` ${this._renderItem(this._item)} ` : ''}
                </div>
                <div class="${this.utils.cls('_toolbar')}">
                    ${this.props.features.fullscreen
            ? html `
                              <button
                                  class="${this.utils.cls('_fullscreen-btn')}"
                                  aria-label="Toggle documentation fullscreen mode"
                                  title="${this.props.i18n
                .toggleFullscreen} (CTRL+D"
                                  @pointerup=${(e) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLHdCQUF3QixNQUFNLHVDQUF1QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0seUNBQXlDLENBQUMsQ0FBQywrQkFBK0I7QUFXNUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxhQUFjLFNBQVEsZUFBZTtJQUN0RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUs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