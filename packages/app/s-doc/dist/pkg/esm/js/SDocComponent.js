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
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SDocComponentInterface from './interface/SDocComponentInterface';
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
        return html `
            <ul class="s-fs-tree ${this.utils.cls('_items')}">
                ${Object.keys(items).map((namespace) => {
            var _a, _b;
            const itemObj = items[namespace];
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
        return html `
            ${itemObj.name
            ? html `
                      <h1 class="s-typo:h1 s-mbe:30 _title">
                          ${(_a = itemObj.as) !== null && _a !== void 0 ? _a : itemObj.name}
                          ${itemObj.status
                ? html ` <span
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
            ? html `
                <p class="s-typo:lead s-mbe:30 _description">${itemObj.description}</h1>
            `
            : ''}
            ${itemObj.example
            ? html `
                      ${itemObj.example.map((example) => html `
                              <s-code-example>
                                  <code lang="${example.language}">
                                      ${example.code}
                                  </code>
                              </s-code-example>
                          `)}
                  `
            : ''}
            ${itemObj.param
            ? html `
                      <div class="_params">
                          ${Object.keys(itemObj.param).map((param) => {
                var _a, _b;
                const paramObj = itemObj.param[param];
                return html `
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
        return html `
            <ul class="s-fs-tree ${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
            const categoryObj = categories[categoryId];
            if (i === 0 && !this._item) {
                categoryObj.selected = true;
                this._firstCategory = categoryObj;
            }
            return html `
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
                : categoryObj.items
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
                ${this._renderCategories(this._categories)}
            </div>
            <div class="${this.utils.cls('_content')}">
                ${this._item ? html ` ${this._renderItem(this._item)} ` : ''}
            </div>
        `;
    }
}
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsT0FBTyx3QkFBd0IsTUFBTSxvQ0FBb0MsQ0FBQztBQUUxRSxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0seUNBQXlDLENBQUMsQ0FBQywrQkFBK0I7QUFFNUYsT0FBTyxRQUFRLE1BQU0sVUFBVSxDQUFDO0FBSWhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLGVBQWU7SUFDdEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix3QkFBd0IsQ0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxLQUFLO1FBQ1osT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBS0Q7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLE9BQU87WUFDYixTQUFTLEVBQUUsd0JBQXdCO1NBQ3RDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVLLEtBQUs7O1lBQ1AsTUFBTSxPQUFPLEdBQUcsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQ2xELFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVB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