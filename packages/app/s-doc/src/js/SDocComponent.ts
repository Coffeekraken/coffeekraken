import __SLitComponent from '@coffeekraken/s-lit-component';

import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDocComponentInterface from './interface/SDocComponentInterface';

import { __replaceChunks } from '@coffeekraken/sugar/string';

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
    _searchValue: string;
    _$searchInput: HTMLInputElement;

    constructor() {
        super(
            __deepMerge({
                name: 's-doc',
                interface: __SDocComponentInterface,
            }),
        );
    }

    async mount() {
        // add shortcuts
        this._registerShortcuts();

        // load the categories
        const request = await fetch(this.props.endpoints.base),
            categories = await request.json();
        this._categories = categories;

        this.requestUpdate();
    }

    _firstCategory;
    async firstUpdated() {
        // get the search input
        this._$searchInput = this.querySelector(
            `.${this.utils.cls('_search-input')}`,
        );
    }

    /**
     * Register some shortcuts
     */
    _registerShortcuts(): void {
        document.addEventListener('keyup', (e) => {
            if (e.key === 'd' && e.ctrlKey) {
                this._$searchInput?.focus();
            }
        });
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
        if (category._loading) {
            return;
        }
        category._loading = true;

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

    _search(value: string): void {
        this._searchValue = value;
        this.requestUpdate();
    }

    _renderItems(items: any): any {
        let searchReg;
        if (this._searchValue) {
            searchReg = new RegExp(
                this._searchValue.replace(/\s/gm, '|'),
                'gi',
            );
        }

        return html`
            <ul class="${this.utils.cls('_items')}">
                ${Object.keys(items).map((namespace) => {
                    const itemObj = items[namespace];

                    // filter search
                    if (this._searchValue && !searchReg.test(itemObj.id)) {
                        return;
                    }

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
                                <!-- ${itemObj.loading
                                    ? html`
                                          <div
                                              class="s-loader:square-dots ${this.utils.cls(
                                                  null,
                                                  's-color:accent s-mie:10',
                                              )}"
                                          ></div>
                                      `
                                    : ''} -->
                                <span>
                                    ${this._searchValue
                                        ? html`
                                              ${unsafeHTML(
                                                  __replaceChunks(
                                                      itemObj.as ??
                                                          itemObj.name,
                                                      this._searchValue.split(
                                                          ' ',
                                                      ),
                                                      (chunk) => {
                                                          return `<span class="s-tc--accent">${chunk}</span>`;
                                                      },
                                                  ),
                                              )}
                                          `
                                        : itemObj.as ?? itemObj.name}
                                </span>
                            </div>
                        </li>
                    `;
                })}
            </ul>
        `;
    }

    _renderItem(itemObj): any {
        return html`
            <header class="${this.utils.cls('_metas')}">
                ${itemObj.name
                    ? html`
                          <h1
                              class="${this.utils.cls(
                                  '_doc-title',
                                  's-typo--h1 s-mbe--30',
                              )}"
                          >
                              ${itemObj.as ?? itemObj.name}
                              ${itemObj.status
                                  ? html` <span
                                        class="${this.utils.cls(
                                            '_doc-status',
                                            `s-badge s-color:${
                                                itemObj.status === 'stable'
                                                    ? 'success'
                                                    : itemObj.status === 'beta'
                                                    ? 'accent'
                                                    : 'error'
                                            }`,
                                        )}"
                                        >${itemObj.status}</span
                                    >`
                                  : ''}
                          </h1>
                      `
                    : ''}
                ${itemObj.description
                    ? html`
                <p class="${this.utils.cls(
                    '_doc-description',
                    's-typo--lead s-mbe--30',
                )}">${itemObj.description}</h1>
            `
                    : ''}
            </header>
            ${itemObj.example
                ? html`
                      <div class="${this.utils.cls('_examples')}">
                          <h2
                              class="${this.utils.cls(
                                  '_section-title',
                                  's-typo--h2 s-mbe--30',
                              )}"
                          >
                              ${this.props.i18n.examplesTitle}
                          </h2>
                          ${itemObj.example.map(
                              (example) => html`
                                  <s-code-example bare=${this.props.bare}>
                                      <code lang="${example.language}">
                                          ${example.code}
                                      </code>
                                  </s-code-example>
                              `,
                          )}
                      </div>
                  `
                : ''}
            ${itemObj.param
                ? html`
                      <div class="${this.utils.cls('_params')}">
                          <h2
                              class="${this.utils.cls(
                                  '_section-title',
                                  's-typo--h2 s-mbe--30',
                              )}"
                          >
                              ${this.props.i18n.paramsTitle}
                          </h2>
                          ${Object.keys(itemObj.param).map((param) => {
                              const paramObj = itemObj.param[param];
                              return html`
                                  <div class="${this.utils.cls('_param')}">
                                      <div
                                          class="${this.utils.cls(
                                              '_param-metas',
                                          )}"
                                      >
                                          <div
                                              class="${this.utils.cls(
                                                  '_param-name',
                                              )}"
                                          >
                                              ${paramObj.name}
                                          </div>
                                          <div
                                              class="${this.utils.cls(
                                                  '_param-type',
                                              )}"
                                          >
                                              ${paramObj.type?.raw ??
                                              paramObj.type}
                                          </div>
                                          <div
                                              class="${this.utils.cls(
                                                  '_param-default',
                                              )}"
                                          >
                                              ${paramObj.default}
                                          </div>
                                      </div>
                                      <p
                                          class="${this.utils.cls(
                                              '_param-description',
                                          )}"
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

    _renderCategories(categories: any): any {
        return html`
            <ul class="${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
                    const categoryObj = categories[categoryId];
                    if (!categoryObj.items && !categoryObj.children) {
                        this._loadItems(categoryObj);
                    }
                    return html`
                        <li
                            class="${this.utils.cls(
                                '_category',
                            )} ${categoryObj.selected || this._searchValue
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
                                : (categoryObj.selected || this._searchValue) &&
                                  categoryObj.items
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
                <label
                    class="${this.utils.cls(
                        '_search',
                        's-input-container--addon',
                    )}"
                >
                    <input
                        type="text"
                        name="search"
                        placeholder="${this.props.i18n.search} (CTRL+D)"
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
                ${this._item ? html` ${this._renderItem(this._item)} ` : ''}
            </div>
        `;
    }
}

export { __define as define };
