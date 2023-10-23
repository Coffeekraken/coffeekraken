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
        this._items = {};
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
            // listen for popstate
            window.addEventListener('hashchange', (e) => {
                // this._goTo(e.state);
                const potentialItem = this._items[document.location.hash.replace(/^#/, '')];
                if (potentialItem) {
                    this._goTo(potentialItem);
                }
            });
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
    /**
     * Go to a specific doc item
     */
    _goTo(itemObj) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this._loadItem(itemObj);
            yield __wait(100);
            (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a);
            __scrollTo(this._$body, {
                offset: 100,
            });
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
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (category._loading) {
                return;
            }
            category._loading = true;
            this._status.loading = true;
            const request = yield fetch(`${this.props.endpoints.base}${this.props.endpoints.items}/${__base64.encrypt(JSON.stringify(category.filters))}${this.props.fetchExtension
                ? `.${this.props.fetchExtension}`
                : ''}`), items = yield request.json();
            // save in global stack
            this._items = Object.assign(Object.assign({}, this._items), items);
            const potentialItem = items[(_b = (_a = document.location.hash) === null || _a === void 0 ? void 0 : _a.replace) === null || _b === void 0 ? void 0 : _b.call(_a, /^#/, '')];
            if (potentialItem) {
                this._goTo(potentialItem);
            }
            // save in category
            category.items = items;
            // load first item if needed
            if (!potentialItem && loadFirstItem) {
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
                e.stopPropagation();
                document.location.hash = itemObj.id;
                this._goTo(itemObj);
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
            <div class="${this.utils.cls('_section _config')}">
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
            <div class="${this.utils.cls('_section _css-classes')}">
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
            <div class="${this.utils.cls('_section _params')}">
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
    _renderItemInstall(itemObj) {
        var _a;
        if (!((_a = itemObj.install) === null || _a === void 0 ? void 0 : _a.length)) {
            return '';
        }
        return html `
            <div class="${this.utils.cls('_section _install')}">
                <h2 class="${this.utils.cls('_section-title', 's-mbe-30')}">
                    ${this.props.i18n.installTitle}
                </h2>

                <s-code-example bare=${this.props.bare}>
                    <code language="${itemObj.install[0].language}">
                        ${itemObj.install[0].code}
                    </code>
                </s-code-example>
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
                ${this._renderItemInstall(itemObj)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXRELE9BQU8sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLHdCQUF3QixNQUFNLHVDQUF1QyxDQUFDO0FBRTdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUU3RCxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0seUNBQXlDLENBQUMsQ0FBQywrQkFBK0I7QUFXNUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBRUgsTUFBTSxDQUFDLE9BQU8sT0FBTyxhQUFjLFNBQVEsZUFBZTtJQUN0RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHdCQUF3QixDQUMzQixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxHQUFHLENBQUE7Y0FDSixTQUFTLENBQUMsS0FBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFpQkQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLE9BQU87WUFDYixTQUFTLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUMsQ0FDTCxDQUFDO1FBckJOLFlBQU8sR0FBeUI7WUFDNUIsT0FBTyxFQUFFLEtBQUs7WUFDZCxVQUFVLEVBQUUsS0FBSztTQUNwQixDQUFDO1FBR0YsV0FBTSxHQUFRLEVBQUUsQ0FBQztJQWdCakIsQ0FBQztJQUVLLEtBQUs7O1lBQ1AsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBRTFCLHNCQUFzQjtZQUN0QixNQUFNLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FDbkIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztnQkFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxFQUNWLEVBQUUsRUFDRixFQUFFLENBQ0wsRUFDRCxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFFOUIsc0JBQXNCO1lBQ3RCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsdUJBQXVCO2dCQUN2QixNQUFNLGFBQWEsR0FDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxhQUFhLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDN0I7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFHSyxZQUFZOztZQUNkLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FDeEMsQ0FBQztZQUVGLG1CQUFtQjtZQUNuQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFeEUsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2RSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFMUMsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNILGtCQUFrQjtRQUNkLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDZixLQUFLLEVBQUUsZUFBZTtZQUN0QixXQUFXLEVBQUUsaUNBQWlDO1NBQ2pELENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxRQUFRLENBQUMsUUFBUSxFQUFFO1lBQ2YsS0FBSyxFQUFFLFFBQVE7WUFDZixXQUFXLEVBQUUsMEJBQTBCO1NBQzFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1lBQ2pCLE1BQUEsSUFBSSxDQUFDLGFBQWEsMENBQUUsS0FBSyxFQUFFLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDRyxLQUFLLENBQUMsT0FBWTs7O1lBQ3BCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEIsTUFBTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsTUFBQSxNQUFBLFFBQVEsQ0FBQyxhQUFhLDBDQUFFLElBQUksa0RBQUksQ0FBQztZQUNqQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDcEIsTUFBTSxFQUFFLEdBQUc7YUFDZCxDQUFDLENBQUM7O0tBQ047SUFFSyxTQUFTLENBQUMsT0FBTzs7WUFDbkIsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNoQiw2QkFBNkI7Z0JBQzdCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFckIsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQ25CLEdBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFDekIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztvQkFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7b0JBQ2pDLENBQUMsQ0FBQyxFQUNWLEVBQUUsQ0FDTCxFQUNELElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFFaEMsc0NBQXNDO2dCQUN0QyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzthQUN4QjtZQUVELHlCQUF5QjtZQUN6QixrRUFBa0U7WUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLG1DQUFtQztZQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFOztnQkFDWixPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFckIsa0JBQWtCO2dCQUNsQixNQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsUUFBUSxtREFBRztvQkFDcEIsR0FBRyxFQUFFLENBQUM7b0JBQ04sUUFBUSxFQUFFLFFBQVE7aUJBQ3JCLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQ3BCLFFBQWEsRUFDYixhQUFhLEdBQUcsS0FBSzs7O1lBRXJCLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRTtnQkFDbkIsT0FBTzthQUNWO1lBQ0QsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRTVCLE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUNuQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FDekIsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYztnQkFDckIsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pDLENBQUMsQ0FBQyxFQUNWLEVBQUUsQ0FDTCxFQUNELEtBQUssR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLE1BQU0sbUNBQ0osSUFBSSxDQUFDLE1BQU0sR0FDWCxLQUFLLENBQ1gsQ0FBQztZQUVGLE1BQU0sYUFBYSxHQUNmLEtBQUssQ0FBQyxNQUFBLE1BQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBDQUFFLE9BQU8sbURBQUcsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM3QjtZQUVELG1CQUFtQjtZQUNuQixRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUV2Qiw0QkFBNEI7WUFDNUIsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUM3QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDeEI7O0tBQ0o7SUFFRCxPQUFPLENBQUMsS0FBYTtRQUNqQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRTVCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ1osR0FBRyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHO1NBQzlDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixhQUFhLENBQ1QsR0FBRyxFQUFFO1lBQ0QsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzNCLENBQUMsRUFDRDtZQUNJLEVBQUUsRUFBRSxPQUFPO1NBQ2QsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWhDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWhDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN6QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7U0FDMUI7YUFBTTtZQUNILElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ25CLElBQUksU0FBUyxDQUFDO1FBQ2QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLFNBQVMsR0FBRyxJQUFJLE1BQU0sQ0FDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUN0QyxJQUFJLENBQ1AsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUE7c0NBQ21CLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztrQkFDNUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNqQixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUN2QixPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2I7WUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDdkIsT0FBTyxDQUFDLENBQUM7YUFDWjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDO2FBQ0QsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7O1lBQ2YsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRWpDLGdCQUFnQjtZQUNoQixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbEQsT0FBTzthQUNWO1lBRUQsT0FBTyxJQUFJLENBQUE7Ozt5Q0FHTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQ3hDLEVBQUUsTUFBSyxPQUFPLENBQUMsRUFBRTtnQkFDbkIsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1YsQ0FBQyxDQUFDLEVBQUU7OzZDQUVLLENBQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JCLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUE7OztzQ0FHSyxPQUFPLENBQUMsT0FBTztnQkFDYixDQUFDLENBQUMsSUFBSSxDQUFBOztnRkFFa0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ3hDLElBQUksRUFDSix5QkFBeUIsQ0FDNUI7OzJDQUVSO2dCQUNILENBQUMsQ0FBQyxFQUFFOzswQ0FFRixJQUFJLENBQUMsWUFBWTtnQkFDZixDQUFDLENBQUMsSUFBSSxDQUFBO29EQUNFLFVBQVUsQ0FDUixlQUFlLENBQ1gsTUFBQSxPQUFPLENBQUMsRUFBRSxtQ0FDTixPQUFPLENBQUMsSUFBSSxFQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDbkIsR0FBRyxDQUNOLEVBQ0QsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDTixPQUFPLDZCQUE2QixLQUFLLFNBQVMsQ0FBQztnQkFDdkQsQ0FBQyxDQUNKLENBQ0o7K0NBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLE1BQUEsT0FBTyxDQUFDLEVBQUUsbUNBQUksT0FBTyxDQUFDLElBQUk7Ozs7eUJBSS9DLENBQUM7UUFDTixDQUFDLENBQUM7O1NBRWIsQ0FBQztJQUNOLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxPQUFZOztRQUMzQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLFNBQVMsQ0FBQyxNQUFBLE9BQU8sQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQ2xDLEtBQUssR0FBRyxVQUFVLENBQ2QsZ0JBQWdCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUMxQixnQkFBZ0IsQ0FDbkIsd0JBQXdCLE9BQU8sQ0FBQyxPQUFPLFdBQVcsQ0FDdEQsQ0FBQztTQUNMO1FBRUQsT0FBTyxJQUFJLENBQUE7Y0FDTCxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFdBQVc7WUFDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQTtvQ0FDYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztpREFDcEIsT0FBTyxDQUFDLE9BQU87NEJBQ3BDLEtBQUs7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQSx5QkFBeUIsS0FBSyxVQUFVO2dCQUM5QyxDQUFDLENBQUMsRUFBRTs7bUJBRWY7WUFDSCxDQUFDLENBQUMsRUFBRTtTQUNYLENBQUM7SUFDTixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBWTs7UUFDekIsT0FBTyxJQUFJLENBQUE7NkJBQ1UsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2tCQUNuQyxPQUFPLENBQUMsSUFBSTtZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUE7dUNBQ2EsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQztnQ0FDM0MsTUFBQSxPQUFPLENBQUMsRUFBRSxtQ0FBSSxPQUFPLENBQUMsSUFBSTtnQ0FDMUIsT0FBTyxDQUFDLE1BQU07Z0JBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQTtpREFDUyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsU0FBUyxFQUNULG1CQUNJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUTtvQkFDdkIsQ0FBQyxDQUFDLFNBQVM7b0JBQ1gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssTUFBTTt3QkFDM0IsQ0FBQyxDQUFDLFFBQVE7d0JBQ1YsQ0FBQyxDQUFDLE9BQ1YsRUFBRSxDQUNMOzJDQUNFLE9BQU8sQ0FBQyxNQUFNO3NDQUNuQjtnQkFDSixDQUFDLENBQUMsRUFBRTs7dUJBRWY7WUFDSCxDQUFDLENBQUMsRUFBRTtrQkFDTixDQUFBLE1BQUEsTUFBQSxNQUFBLE9BQU8sQ0FBQyxJQUFJLDBDQUFFLEdBQUcsMENBQUUsV0FBVyxrREFBSSxNQUFLLFFBQVE7WUFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQTt3Q0FDYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDO2dDQUMzQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOzZDQUNwQixPQUFPLENBQUMsSUFBSTs7dUJBRWxDO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7a0JBQ04sT0FBTyxDQUFDLFdBQVc7WUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQTs0QkFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLEtBQzVDLE9BQU8sQ0FBQyxXQUNaO2FBQ1Q7WUFDTyxDQUFDLENBQUMsRUFBRTs7U0FFZixDQUFDO0lBQ04sQ0FBQztJQUVELGlCQUFpQixDQUFDLFNBQWM7O1FBQzVCLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDOzhCQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7a0NBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzswQkFDdEMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQzs7c0JBRTdDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7a0NBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQzswQkFDdEMsTUFBQSxNQUFBLFNBQVMsQ0FBQyxJQUFJLDBDQUFFLEdBQUcsbUNBQUksU0FBUyxDQUFDLElBQUk7Ozs0QkFHbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7c0JBQzFDLFNBQVMsQ0FBQyxXQUFXOzs7U0FHbEMsQ0FBQztJQUNOLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxPQUFZO1FBQzlCLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDOzs2QkFFcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ25CLCtCQUErQixFQUMvQixVQUFVLENBQ2I7O3NCQUVDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWU7OztjQUd2QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sSUFBSSxDQUFBO2tDQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztzQ0FDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUM7MENBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztrQ0FDdkMsTUFBTSxDQUFDLElBQUk7OztvQ0FHVCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzs4QkFDNUMsTUFBTSxDQUFDLFdBQVc7OztpQkFHL0IsQ0FBQztRQUNOLENBQUMsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBWTtRQUMxQixPQUFPLElBQUksQ0FBQTswQkFDTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQzs2QkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDO3NCQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXOztrQkFFL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEMsT0FBTyxJQUFJLENBQUE7c0NBQ08sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDOzBDQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7OENBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztzQ0FDckMsUUFBUSxDQUFDLElBQUk7c0NBQ2IsUUFBUSxDQUFDLFFBQVE7Z0JBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQTt1REFDUyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsV0FBVyxFQUNYLFlBQVksQ0FDZjttREFDSTtnQkFDWCxDQUFDLENBQUMsRUFBRTs7a0NBRVYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQzs4Q0FDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO3NDQUNyQyxNQUFBLE1BQUEsUUFBUSxDQUFDLElBQUksMENBQUUsR0FBRyxtQ0FBSSxRQUFRLENBQUMsSUFBSTs7O3dDQUdqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztrQ0FDMUMsUUFBUSxDQUFDLFdBQVc7OztxQkFHakMsQ0FBQztRQUNOLENBQUMsQ0FBQzs7U0FFVCxDQUFDO0lBQ04sQ0FBQztJQUVELGtCQUFrQixDQUFDLE9BQVk7O1FBQzNCLElBQUksQ0FBQyxDQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sMENBQUUsTUFBTSxDQUFBLEVBQUU7WUFDMUIsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDOzZCQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7c0JBQ25ELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVk7Ozt1Q0FHWCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7c0NBQ2hCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTswQkFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJOzs7O1NBSXhDLENBQUM7SUFDTixDQUFDO0lBRUQsbUJBQW1CLENBQUMsT0FBWTtRQUM1QixPQUFPLElBQUksQ0FBQTtjQUNMLE9BQU8sQ0FBQyxPQUFPO1lBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQTtvQ0FDYyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzs7dUNBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixnQkFBZ0IsRUFDaEIsVUFBVSxDQUNiOztnQ0FFQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhOzs0QkFFakMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2pCLENBQUMsT0FBTyxFQUFFLEVBQUU7O2dCQUFDLE9BQUEsSUFBSSxDQUFBOzsrQ0FFQSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDbkIsVUFBVSxFQUNWLFVBQVUsQ0FDYjs7O21EQUdZLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixnQkFBZ0IsRUFDaEIsVUFBVSxDQUNiOzs0Q0FFQyxZQUFZLENBQUMsTUFBQSxPQUFPLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUM7O3dDQUVyQyxDQUFBLE1BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLDBDQUFFLFdBQVcsRUFBRTtvQkFDakMsWUFBWTtvQkFDUixDQUFDLENBQUMsSUFBSSxDQUFBO3lEQUNTLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixrQkFBa0IsRUFDbEIsVUFBVSxDQUNiOztrREFFQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzttREFDdkI7b0JBQ1QsQ0FBQyxDQUFDLEVBQUU7NkRBQ2UsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJOzREQUNoQixPQUFPLENBQUMsUUFBUTtnREFDNUIsT0FBTyxDQUFDLElBQUk7Ozs7K0JBSTdCLENBQUE7YUFBQSxDQUNKOzttQkFFUjtZQUNILENBQUMsQ0FBQyxFQUFFO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBTzs7UUFDZixtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFBOztzQkFFRCxVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzs7YUFFcEMsQ0FBQztTQUNMO1FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDN0MsT0FBTyxJQUFJLENBQUE7a0JBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQzs7OEJBRWxCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztzQkFDbEMsT0FBTyxDQUFDLFNBQVM7aUJBQ2QsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDUixHQUFHLENBQ0EsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTtrQ0FDYixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDOzZCQUN0QyxDQUNKOzthQUVaLENBQUM7U0FDTDtRQUVELGFBQWE7UUFDYixPQUFPLENBQUMsVUFBVSxHQUFHLE1BQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsMENBQUUsUUFBUSxDQUFDO1FBRXBELGVBQWU7UUFDZixPQUFPLElBQUksQ0FBQTs7O3VCQUdJLFdBQVcsQ0FBQyxNQUFBLE1BQUEsT0FBTyxDQUFDLFNBQVMsMENBQUUsS0FBSyxtREFBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7O2tCQUV2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDO2tCQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2tCQUNoQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDO2tCQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7a0JBQ3BELE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTs7U0FFdEUsQ0FBQztJQUNOLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFlLEVBQUUsSUFBSSxHQUFHLE1BQU07UUFDNUMsT0FBTyxJQUFJLENBQUE7d0JBQ0ssSUFBSSxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztrQkFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzlDO3FCQUFNO29CQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDeEM7YUFDSjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixXQUFXLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUM7YUFDckM7WUFDRCxPQUFPLElBQUksQ0FBQTs7O3FDQUdNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixXQUFXLENBQ2QsSUFBSSxXQUFXLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUMxQyxDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsRUFBRTs7eUNBRUssQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDZixDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO2dCQUM3QyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekIsQ0FBQzs7O2tDQUdLLFdBQVcsQ0FBQyxRQUFRO2dCQUNsQixDQUFDLENBQUMsSUFBSSxDQUFBOzt1Q0FFSDtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFBLGlDQUFpQzt5Q0FDbEMsV0FBVyxDQUFDLEtBQUs7OzhCQUU1QixXQUFXLENBQUMsUUFBUSxJQUFJLFdBQVcsQ0FBQyxRQUFRO2dCQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFBO3dDQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsV0FBVyxDQUFDLFFBQVEsRUFDcEIsT0FBTyxDQUNWO21DQUNKO2dCQUNILENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDM0MsV0FBVyxDQUFDLEtBQUs7b0JBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUE7d0NBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO21DQUN6QztvQkFDSCxDQUFDLENBQUMsRUFBRTs7cUJBRWYsQ0FBQztRQUNOLENBQUMsQ0FBQzs7U0FFVCxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTs7eUJBRU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDOzZCQUN2QixDQUFPLENBQUMsRUFBRSxFQUFFO1lBQ3JCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUMsQ0FBQTs7a0JBRUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7MEJBRXpCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQzs7NkJBRXhCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixTQUFTLEVBQ1QseUJBQXlCLENBQzVCOzs7Ozt1Q0FLa0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTTtpQ0FDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2lDQUMvQixDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUM7Ozs7OztrQkFNUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7OzBCQUdoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7OEJBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztzQkFDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7OEJBRWpELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztzQkFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVTtZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFBOzsyQ0FFYSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzs7MkNBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtpQkFDbkIsZ0JBQWdCOytDQUNSLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2YsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM3QixDQUFDOztvQ0FFQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVU7Z0JBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUE7OENBQ0UsVUFBVSxDQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FDbEM7eUNBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTs4Q0FDRSxVQUFVLENBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO3FCQUNYLGVBQWUsQ0FDdkI7eUNBQ0o7OzJCQUVkO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7O2tCQUVWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztZQUNsQixDQUFDLENBQUMsSUFBSSxDQUFBO3dDQUNjLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztnQ0FDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDOzt1QkFFekM7WUFDSCxDQUFDLENBQUMsRUFBRTs7U0FFZixDQUFDO0lBQ04sQ0FBQztDQUNKIn0=