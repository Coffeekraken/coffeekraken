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
            const request = yield fetch(this.props.endpoints.base, {}), categories = yield request.json();
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
            console.log('IT', itemObj);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTFELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sd0JBQXdCLE1BQU0sdUNBQXVDLENBQUM7QUFFN0UsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXJELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRTdELGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx5Q0FBeUMsQ0FBQyxDQUFDLCtCQUErQjtBQVM1Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLGFBQWMsU0FBUSxlQUFlO0lBQ3RELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0Ysd0JBQXdCLENBQzNCLENB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