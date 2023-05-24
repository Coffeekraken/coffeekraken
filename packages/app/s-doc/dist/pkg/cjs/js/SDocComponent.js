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
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
const SDocComponentInterface_1 = __importDefault(require("./interface/SDocComponentInterface"));
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
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(this.props.endpoints.base), categories = yield request.json();
            this._categories = categories;
            this.requestUpdate();
        });
    }
    _loadItem(itemObj) {
        return __awaiter(this, void 0, void 0, function* () {
            // request the item if needed
            if (!itemObj.cache) {
                // set the item loading state
                itemObj.loading = true;
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
                itemObj.loading = false;
                this._item = itemObj.cache;
                this.requestUpdate();
            });
        });
    }
    _loadItems(category, loadFirstItem = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(this.props.endpoints.items.replace(':filters', encodeURIComponent(JSON.stringify(category.filters)))), items = yield request.json();
            category.items = items;
            // load first item if needed
            if (loadFirstItem) {
                const firstItemId = Object.keys(items)[0];
                this._loadItem(items[firstItemId]);
            }
            else {
                this.requestUpdate();
            }
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._firstCategory) {
                yield this._loadItems(this._firstCategory, true);
            }
        });
    }
    _renderItems(items) {
        return (0, lit_1.html) `
            <ul class="s-fs-tree ${this.utils.cls('_items')}">
                ${Object.keys(items).map((namespace) => {
            var _a, _b;
            const itemObj = items[namespace];
            return (0, lit_1.html) `
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
                ? (0, lit_1.html) `
                                          <div
                                              class="s-loader:square-dots s-color:accent s-mie:10"
                                          ></div>
                                      `
                : ''}
                                <span>${(_b = itemObj.as) !== null && _b !== void 0 ? _b : itemObj.name}</span>
                            </div>
                        </li>
                    `;
        })}
            </ul>
        `;
    }
    _renderItem(itemObj) {
        var _a;
        return (0, lit_1.html) `
            ${itemObj.name
            ? (0, lit_1.html) `
                      <h1 class="s-typo:h1 s-mbe:30 _title">
                          ${(_a = itemObj.as) !== null && _a !== void 0 ? _a : itemObj.name}
                          ${itemObj.status
                ? (0, lit_1.html) ` <span
                                    class="s-badge s-color:${itemObj.status ===
                    'stable'
                    ? 'success'
                    : itemObj.status === 'beta'
                        ? 'accent'
                        : 'error'} _status"
                                    >${itemObj.status}</span
                                >`
                : ''}
                      </h1>
                  `
            : ''}
            ${itemObj.description
            ? (0, lit_1.html) `
                <p class="s-typo:lead s-mbe:30 _description">${itemObj.description}</h1>
            `
            : ''}
            ${itemObj.example
            ? (0, lit_1.html) `
                      ${itemObj.example.map((example) => (0, lit_1.html) `
                              <s-code-example>
                                  <code lang="${example.language}">
                                      ${example.code}
                                  </code>
                              </s-code-example>
                          `)}
                  `
            : ''}
            ${itemObj.param
            ? (0, lit_1.html) `
                      <div class="_params">
                          ${Object.keys(itemObj.param).map((param) => {
                var _a, _b;
                const paramObj = itemObj.param[param];
                return (0, lit_1.html) `
                                  <div class="_param">
                                      <div class="_param-metas">
                                          <div class="_param-name">
                                              ${paramObj.name}
                                          </div>
                                          <div class="_param-type">
                                              ${(_b = (_a = paramObj.type) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : paramObj.type}
                                          </div>
                                          <div class="_param-default">
                                              ${paramObj.default}
                                          </div>
                                      </div>
                                      <p class="_param-description">
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
        return (0, lit_1.html) `
            <ul class="s-fs-tree ${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
            const categoryObj = categories[categoryId];
            if (i === 0 && !this._item) {
                categoryObj.selected = true;
                this._firstCategory = categoryObj;
            }
            return (0, lit_1.html) `
                        <li
                            class="${this.utils.cls('_category')} ${categoryObj.selected ? 'active' : ''}"
                            @click=${(e) => {
                e.stopPropagation();
                categoryObj.selected = !categoryObj.selected;
                if (categoryObj.children) {
                }
                else {
                    this._loadItems(categoryObj);
                }
                this.requestUpdate();
            }}
                        >
                            <div>
                                ${categoryObj.selected
                ? (0, lit_1.html) `
                                          <i class="s-icon:folder-opened"></i>
                                      `
                : (0, lit_1.html) ` <i class="s-icon:folder"></i> `}
                                <span> ${categoryObj.title} </span>
                            </div>
                            ${categoryObj.selected && categoryObj.children
                ? (0, lit_1.html) `
                                      ${this._renderCategories(categoryObj.children)}
                                  `
                : categoryObj.items
                    ? (0, lit_1.html) `
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
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_explorer')}">
                ${this._renderCategories(this._categories)}
            </div>
            <div class="${this.utils.cls('_content')}">
                ${this._item ? (0, lit_1.html) ` ${this._renderItem(this._item)} ` : ''}
            </div>
        `;
    }
}
exports.default = SDocComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9GQUE0RDtBQUU1RCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGdHQUEwRTtBQUUxRSxhQUFhO0FBQ2Isa0dBQTRELENBQUMsK0JBQStCO0FBRTVGLHNEQUFnQztBQXlTWCxpQkF6U2QsZ0JBQVEsQ0F5U1k7QUFyUzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQXFCLGFBQWMsU0FBUSx5QkFBZTtJQUN0RCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRixnQ0FBd0IsQ0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sSUFBQSxTQUFHLEVBQUE7Y0FDSixJQUFBLGVBQVMsRUFBQyw2QkFBSyxDQUFDO1NBQ3JCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFLRDtRQUNJLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQUM7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxnQ0FBd0I7U0FDdEMsQ0FBQyxDQUNMLENBQUM7SUFDTixDQUFDO0lBRUssS0FBSzs7WUFDUCxNQUFNLE9BQU8sR0FBRyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFDbEQsVUFBVSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRDLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBRTlCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsT0FBTzs7WUFDbkIsNkJBQTZCO1lBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO2dCQUNoQiw2QkFBNkI7Z0JBQzdCLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBRXJCLE1BQU0sT0FBTyxHQUFHLE1BQU0sS0FBSyxDQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQ3ZELEVBQ0QsSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUVoQyxzQ0FBc0M7Z0JBQ3RDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1lBRUQseUJBQXlCO1lBQ3pCLGtFQUFrRTtZQUNsRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFFckIsbUNBQW1DO1lBQ25DLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLFFBQWEsRUFBRSxhQUFhLEdBQUcsS0FBSzs7WUFDakQsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzlCLFVBQVUsRUFDVixrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUN2RCxDQUNKLEVBQ0QsS0FBSyxHQUFHLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBRWpDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBRXZCLDRCQUE0QjtZQUM1QixJQUFJLGFBQWEsRUFBRTtnQkFDZixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUN4QjtRQUNMLENBQUM7S0FBQTtJQUdLLFlBQVk7O1lBQ2QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNyQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwRDtRQUNMLENBQUM7S0FBQTtJQUVELFlBQVksQ0FBQyxLQUFVO1FBQ25CLE9BQU8sSUFBQSxVQUFJLEVBQUE7bUNBQ2dCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztrQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTs7WUFDbkMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3FDQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FDeEMsRUFBRSxNQUFLLE9BQU8sQ0FBQyxFQUFFO2dCQUNuQixDQUFDLENBQUMsUUFBUTtnQkFDVixDQUFDLENBQUMsRUFBRTtxQ0FDQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNYLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixDQUFDOzs7a0NBR0ssT0FBTyxDQUFDLE9BQU87Z0JBQ2IsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzs7O3VDQUlIO2dCQUNILENBQUMsQ0FBQyxFQUFFO3dDQUNBLE1BQUEsT0FBTyxDQUFDLEVBQUUsbUNBQUksT0FBTyxDQUFDLElBQUk7OztxQkFHN0MsQ0FBQztRQUNOLENBQUMsQ0FBQzs7U0FFVCxDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFPOztRQUNmLE9BQU8sSUFBQSxVQUFJLEVBQUE7Y0FDTCxPQUFPLENBQUMsSUFBSTtZQUNWLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7NEJBRU0sTUFBQSxPQUFPLENBQUMsRUFBRSxtQ0FBSSxPQUFPLENBQUMsSUFBSTs0QkFDMUIsT0FBTyxDQUFDLE1BQU07Z0JBQ1osQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBOzZEQUN5QixPQUFPLENBQUMsTUFBTTtvQkFDdkMsUUFBUTtvQkFDSixDQUFDLENBQUMsU0FBUztvQkFDWCxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFNO3dCQUMzQixDQUFDLENBQUMsUUFBUTt3QkFDVixDQUFDLENBQUMsT0FBTzt1Q0FDVixPQUFPLENBQUMsTUFBTTtrQ0FDbkI7Z0JBQ0osQ0FBQyxDQUFDLEVBQUU7O21CQUVmO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7Y0FDTixPQUFPLENBQUMsV0FBVztZQUNqQixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7K0RBQ3lDLE9BQU8sQ0FBQyxXQUFXO2FBQ3JFO1lBQ0csQ0FBQyxDQUFDLEVBQUU7Y0FDTixPQUFPLENBQUMsT0FBTztZQUNiLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTt3QkFDRSxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDakIsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBOztnREFFSyxPQUFPLENBQUMsUUFBUTt3Q0FDeEIsT0FBTyxDQUFDLElBQUk7OzsyQkFHekIsQ0FDSjttQkFDSjtZQUNILENBQUMsQ0FBQyxFQUFFO2NBQ04sT0FBTyxDQUFDLEtBQUs7WUFDWCxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7OzRCQUVNLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFOztnQkFDdkMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsT0FBTyxJQUFBLFVBQUksRUFBQTs7OztnREFJTyxRQUFRLENBQUMsSUFBSTs7O2dEQUdiLE1BQUEsTUFBQSxRQUFRLENBQUMsSUFBSSwwQ0FBRSxHQUFHLG1DQUNwQixRQUFRLENBQUMsSUFBSTs7O2dEQUdYLFFBQVEsQ0FBQyxPQUFPOzs7OzRDQUlwQixRQUFRLENBQUMsV0FBVzs7OytCQUdqQyxDQUFDO1lBQ04sQ0FBQyxDQUFDOzttQkFFVDtZQUNILENBQUMsQ0FBQyxFQUFFO1NBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxVQUFlO1FBQzdCLE9BQU8sSUFBQSxVQUFJLEVBQUE7bUNBQ2dCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztrQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hCLFdBQVcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQzthQUNyQztZQUNELE9BQU8sSUFBQSxVQUFJLEVBQUE7O3FDQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUNuQixXQUFXLENBQ2QsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7cUNBQ2hDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1gsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztnQkFDN0MsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2lCQUN6QjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNoQztnQkFDRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekIsQ0FBQzs7O2tDQUdLLFdBQVcsQ0FBQyxRQUFRO2dCQUNsQixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7O3VDQUVIO2dCQUNILENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQSxpQ0FBaUM7eUNBQ2xDLFdBQVcsQ0FBQyxLQUFLOzs4QkFFNUIsV0FBVyxDQUFDLFFBQVEsSUFBSSxXQUFXLENBQUMsUUFBUTtnQkFDMUMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBO3dDQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FDcEIsV0FBVyxDQUFDLFFBQVEsQ0FDdkI7bUNBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUNuQixDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7d0NBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO21DQUN6QztvQkFDSCxDQUFDLENBQUMsRUFBRTs7cUJBRWYsQ0FBQztRQUNOLENBQUMsQ0FBQzs7U0FFVCxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzBCQUNPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQztrQkFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7OzBCQUVoQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7a0JBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTs7U0FFbEUsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWpRRCxnQ0FpUUMifQ==