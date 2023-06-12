"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const s_lit_component_1 = __importStar(require("@coffeekraken/s-lit-component"));
const string_1 = require("@coffeekraken/sugar/string");
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const unsafe_html_js_1 = require("lit/directives/unsafe-html.js");
const SDocComponentInterface_1 = __importDefault(require("./interface/SDocComponentInterface"));
const is_1 = require("@coffeekraken/sugar/is");
const string_2 = require("@coffeekraken/sugar/string");
// @ts-ignore
const s_doc_component_css_1 = __importDefault(require("../../../../src/css/s-doc-component.css")); // relative to /dist/pkg/esm/js
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
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
class SDocComponent extends s_lit_component_1.default {
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SDocComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_doc_component_css_1.default)}
        `;
    }
    static get state() {
        return {};
    }
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-doc',
            interface: SDocComponentInterface_1.default,
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
        (0, keyboard_1.__escapeQueue)(() => {
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
        return (0, s_lit_component_1.html) `
            <ul class="${this.utils.cls('_items')}">
                ${Object.keys(items).map((namespace) => {
            var _a, _b, _c;
            const itemObj = items[namespace];
            // filter search
            if (this._searchValue && !searchReg.test(itemObj.id)) {
                return;
            }
            return (0, s_lit_component_1.html) `
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
                ? (0, s_lit_component_1.html) `
                                          <div
                                              class="s-loader:square-dots ${this.utils.cls(null, 's-color:accent s-mie:10')}"
                                          ></div>
                                      `
                : ''}
                                <span>
                                    ${this._searchValue
                ? (0, s_lit_component_1.html) `
                                              ${(0, unsafe_html_js_1.unsafeHTML)((0, string_2.__replaceChunks)((_b = itemObj.as) !== null && _b !== void 0 ? _b : itemObj.name, this._searchValue.split(' '), (chunk) => {
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
        if ((0, is_1.__isColor)((_a = itemObj.default) !== null && _a !== void 0 ? _a : '')) {
            addon = (0, unsafe_html_js_1.unsafeHTML)(`<span class="${this.utils.cls('_color-preview')}" style="background: ${itemObj.default}"></span>`);
        }
        return (0, s_lit_component_1.html) `
            ${itemObj.default !== undefined && itemObj.default !== 'undefined'
            ? (0, s_lit_component_1.html) `
                      <div class="${this.utils.cls('_config-default')}">
                          <span class="_value">${itemObj.default}</span>
                          ${addon
                ? (0, s_lit_component_1.html) ` <span class="_addon">${addon}</span> `
                : ''}
                      </div>
                  `
            : ''}
        `;
    }
    _renderItemMetas(itemObj) {
        var _a, _b, _c, _d;
        return (0, s_lit_component_1.html) `
            <header class="${this.utils.cls('_metas')}">
                ${itemObj.name
            ? (0, s_lit_component_1.html) `
                          <h1
                              class="${this.utils.cls('_doc-title', 's-typo--h1 s-mbe--30')}"
                          >
                              ${(_a = itemObj.as) !== null && _a !== void 0 ? _a : itemObj.name}
                              ${itemObj.status
                ? (0, s_lit_component_1.html) ` <span
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
            ? (0, s_lit_component_1.html) `
                          <div class="${this.utils.cls('_file', 's-mbe--30')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.file)}
                              <span>.sugar/${itemObj.name}.config.ts</span>
                          </div>
                      `
            : ''}
                ${itemObj.description
            ? (0, s_lit_component_1.html) `
                <p class="${this.utils.cls('_doc-description', 's-typo--lead s-mbe--30')}">${itemObj.description}</h1>
            `
            : ''}
            </header>
        `;
    }
    _renderItemConfig(configObj) {
        var _a, _b;
        return (0, s_lit_component_1.html) `
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
        return (0, s_lit_component_1.html) `
            ${itemObj.example
            ? (0, s_lit_component_1.html) `
                      <div class="${this.utils.cls('_examples')}">
                          <h2
                              class="${this.utils.cls('_section-title', 's-typo--h2 s-mbe--30')}"
                          >
                              ${this.props.i18n.examplesTitle}
                          </h2>
                          ${itemObj.example.map((example) => {
                var _a, _b;
                return (0, s_lit_component_1.html) `
                                  <div
                                      class="${this.utils.cls('_example', 's-mbe--50')}"
                                  >
                                      <h3
                                          class="${this.utils.cls('_example-title', 's-typo--h3 s-mbe--50')}"
                                      >
                                          ${(0, string_1.__upperFirst)((_a = example.title) !== null && _a !== void 0 ? _a : '')}
                                      </h3>
                                      ${((_b = itemObj.type.raw) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ===
                    'styleguide'
                    ? (0, s_lit_component_1.html) `<div
                                                class="${this.utils.cls('_example-preview', 's-mbe--50')}"
                                            >
                                                ${(0, unsafe_html_js_1.unsafeHTML)(example.code)}
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
            return (0, s_lit_component_1.html) `
                <div class="s-format:text s-rhythm:vertical">
                    ${(0, unsafe_html_js_1.unsafeHTML)(itemObj.docHtml)}
                </div>
            `;
        }
        if (itemObj.type.raw.toLowerCase() === 'config') {
            return (0, s_lit_component_1.html) `
                ${this._renderItemMetas(itemObj)}

                <div class="${this.utils.cls('_configs')}">
                    ${itemObj.docblocks
                .slice(1)
                .map((configObj) => (0, s_lit_component_1.html) `
                                ${this._renderItemConfig(configObj)}
                            `)}
                </div>
            `;
        }
        // default item
        return (0, s_lit_component_1.html) `
            ${this._renderItemMetas(itemObj)}
            ${this._renderItemExamples(itemObj)}
            ${itemObj.param
            ? (0, s_lit_component_1.html) `
                      <div class="${this.utils.cls('_params')}">
                          <h2
                              class="${this.utils.cls('_section-title', 's-typo--h2 s-mbe--30')}"
                          >
                              ${this.props.i18n.paramsTitle}
                          </h2>
                          ${Object.keys(itemObj.param).map((param) => {
                var _a, _b;
                const paramObj = itemObj.param[param];
                return (0, s_lit_component_1.html) `
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
        return (0, s_lit_component_1.html) `
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
            return (0, s_lit_component_1.html) `
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
                ? (0, s_lit_component_1.html) `
                                          <i class="s-icon:folder-opened"></i>
                                      `
                : (0, s_lit_component_1.html) ` <i class="s-icon:folder"></i> `}
                                <span> ${categoryObj.title} </span>
                            </div>
                            ${categoryObj.selected && categoryObj.children
                ? (0, s_lit_component_1.html) `
                                      ${this._renderCategories(categoryObj.children)}
                                  `
                : (categoryObj.selected || this._searchValue) &&
                    categoryObj.items
                    ? (0, s_lit_component_1.html) `
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
        return (0, s_lit_component_1.html) `
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
                    ${this._item ? (0, s_lit_component_1.html) ` ${this._renderItem(this._item)} ` : ''}
                </div>
                <div class="${this.utils.cls('_toolbar')}">
                    ${this.props.features.fullscreen
            ? (0, s_lit_component_1.html) `
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
                ? (0, s_lit_component_1.html) `
                                            ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons.exitFullscreen)}
                                        `
                : (0, s_lit_component_1.html) `
                                            ${(0, unsafe_html_js_1.unsafeHTML)(this.props.icons
                    .enterFullscreen)}
                                        `}
                              </button>
                          `
            : ''}
                </div>
                ${this._status.loading
            ? (0, s_lit_component_1.html) `
                          <div class="${this.utils.cls('_loading')}">
                              ${(0, unsafe_html_js_1.unsafeHTML)(this.props.loaderSvg)}
                          </div>
                      `
            : ''}
            </div>
        `;
    }
}
exports.default = SDocComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUZBQXNFO0FBRXRFLHVEQUEwRDtBQUUxRCwyREFBNkQ7QUFDN0QsdURBQXlEO0FBQ3pELDZCQUFxQztBQUNyQyxrRUFBMkQ7QUFDM0QsZ0dBQTBFO0FBRTFFLCtDQUFtRDtBQUVuRCx1REFBNkQ7QUFFN0QsYUFBYTtBQUNiLGtHQUE0RCxDQUFDLCtCQUErQjtBQUU1RixzREFBZ0M7QUF5b0JYLGlCQXpvQmQsZ0JBQVEsQ0F5b0JZO0FBaG9CM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NHO0FBRUgsTUFBcUIsYUFBYyxTQUFRLHlCQUFlO0lBQ3RELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLGdDQUF3QixDQUMzQixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDLDZCQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssS0FBSztRQUNaLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQWNEO1FBQ0ksS0FBSyxDQUNELElBQUEsb0JBQVcsRUFBQztZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2IsU0FBUyxFQUFFLGdDQUF3QjtTQUN0QyxDQUFDLENBQ0wsQ0FBQztRQWxCTixZQUFPLEdBQXlCO1lBQzVCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsVUFBVSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQWdCRixDQUFDO0lBRUssS0FBSzs7WUFDUCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFFMUIsc0JBQXNCO1lBQ3RCLE1BQU0sT0FB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