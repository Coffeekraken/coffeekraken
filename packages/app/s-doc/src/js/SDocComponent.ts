import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import __SDocComponentInterface from './interface/SDocComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-doc-component.css'; // relative to /dist/pkg/esm/js

import __define from './define';

export interface ISDocComponentProps {}

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
        return __SLitComponent.propertiesFromInterface(
            {},
            __SDocComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    static get state() {
        return {};
    }

    _categories: any;
    _item: any;

    constructor() {
        super(
            __deepMerge({
                name: 's-doc',
                interface: __SDocComponentInterface,
            }),
        );
    }

    async mount() {
        const request = await fetch(this.props.endpoints.base),
            categories = await request.json();

        this._categories = categories;

        this.requestUpdate();
    }

    async _loadItem(itemObj): Promise<void> {
        // request the item if needed
        if (!itemObj.cache) {
            // set the item loading state
            itemObj.loading = true;
            this.requestUpdate();

            const request = await fetch(
                    this.props.endpoints.item.replace(':id', itemObj.id),
                ),
                item = await request.json();

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
    }

    async _loadItems(category: any, loadFirstItem = false): Promise<void> {
        const request = await fetch(
                this.props.endpoints.items.replace(
                    ':filters',
                    encodeURIComponent(JSON.stringify(category.filters)),
                ),
            ),
            items = await request.json();

        category.items = items;

        // load first item if needed
        if (loadFirstItem) {
            const firstItemId = Object.keys(items)[0];
            this._loadItem(items[firstItemId]);
        } else {
            this.requestUpdate();
        }
    }

    _firstCategory;
    async firstUpdated() {
        if (this._firstCategory) {
            await this._loadItems(this._firstCategory, true);
        }
    }

    _renderItems(items: any): any {
        return html`
            <ul class="s-fs-tree ${this.utils.cls('_items')}">
                ${Object.keys(items).map((namespace) => {
                    const itemObj = items[namespace];
                    return html`
                        <li
                            class="${this.utils.cls('_item')} ${this._item
                                ?.id === itemObj.id
                                ? 'active'
                                : ''}"
                            @click=${(e) => {
                                e.stopPropagation();
                                this._loadItem(itemObj);
                            }}
                        >
                            <div>
                                ${itemObj.loading
                                    ? html`
                                          <div
                                              class="s-loader:square-dots s-color:accent s-mie:10"
                                          ></div>
                                      `
                                    : ''}
                                <span>${itemObj.as ?? itemObj.name}</span>
                            </div>
                        </li>
                    `;
                })}
            </ul>
        `;
    }

    _renderItem(itemObj): any {
        return html`
            ${itemObj.name
                ? html`
                      <h1 class="s-typo:h1 s-mbe:30 _title">
                          ${itemObj.as ?? itemObj.name}
                          ${itemObj.status
                              ? html` <span
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
                ? html`
                <p class="s-typo:lead s-mbe:30 _description">${itemObj.description}</h1>
            `
                : ''}
            ${itemObj.example
                ? html`
                      ${itemObj.example.map(
                          (example) => html`
                              <s-code-example>
                                  <code lang="${example.language}">
                                      ${example.code}
                                  </code>
                              </s-code-example>
                          `,
                      )}
                  `
                : ''}
            ${itemObj.param
                ? html`
                      <div class="_params">
                          ${Object.keys(itemObj.param).map((param) => {
                              const paramObj = itemObj.param[param];
                              return html`
                                  <div class="_param">
                                      <div class="_param-metas">
                                          <div class="_param-name">
                                              ${paramObj.name}
                                          </div>
                                          <div class="_param-type">
                                              ${paramObj.type?.raw ??
                                              paramObj.type}
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

    _renderCategories(categories: any): any {
        return html`
            <ul class="s-fs-tree ${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
                    const categoryObj = categories[categoryId];
                    if (i === 0 && !this._item) {
                        categoryObj.selected = true;
                        this._firstCategory = categoryObj;
                    }
                    return html`
                        <li
                            class="${this.utils.cls(
                                '_category',
                            )} ${categoryObj.selected ? 'active' : ''}"
                            @click=${(e) => {
                                e.stopPropagation();
                                categoryObj.selected = !categoryObj.selected;
                                if (categoryObj.children) {
                                } else {
                                    this._loadItems(categoryObj);
                                }
                                this.requestUpdate();
                            }}
                        >
                            <div>
                                ${categoryObj.selected
                                    ? html`
                                          <i class="s-icon:folder-opened"></i>
                                      `
                                    : html` <i class="s-icon:folder"></i> `}
                                <span> ${categoryObj.title} </span>
                            </div>
                            ${categoryObj.selected && categoryObj.children
                                ? html`
                                      ${this._renderCategories(
                                          categoryObj.children,
                                      )}
                                  `
                                : categoryObj.items
                                ? html`
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
        return html`
            <div class="${this.utils.cls('_explorer')}">
                ${this._renderCategories(this._categories)}
            </div>
            <div class="${this.utils.cls('_content')}">
                ${this._item ? html` ${this._renderItem(this._item)} ` : ''}
            </div>
        `;
    }
}

export { __define as define };
