import __SLitComponent, { html } from '@coffeekraken/s-lit-component';

import { __upperFirst } from '@coffeekraken/sugar/string';

import { __unique } from '@coffeekraken/sugar/array';

import { __camelCase } from '@coffeekraken/sugar/string';

import { __escapeQueue, __hotkey } from '@coffeekraken/sugar/keyboard';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import __SDocComponentInterface from './interface/SDocComponentInterface';

import { __scrollTo } from '@coffeekraken/sugar/dom';

import { __wait } from '@coffeekraken/sugar/datetime';

import { __isColor } from '@coffeekraken/sugar/is';

import { __replaceChunks } from '@coffeekraken/sugar/string';

// @ts-ignore
import __css from '../../../../src/css/s-doc-component.css'; // relative to /dist/pkg/esm/js

export interface ISDocComponentStatus {
    loading: boolean;
    fullscreen: boolean;
}

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

    _status: ISDocComponentStatus = {
        loading: false,
        fullscreen: false,
    };
    _categories: any;
    _item: any;
    _searchValue: string;

    _$body: HTMLElement;
    _$menuBtn: HTMLElement;
    _$explorer: HTMLElement;
    _$searchInput: HTMLInputElement;
    _$placeholder: HTMLElement;

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
        const request = await fetch(this.props.endpoints.base, {}),
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

        // get the explorer
        this._$explorer = this.querySelector(`.${this.utils.cls('_explorer')}`);

        // get the menu button
        this._$menuBtn = this.querySelector(`.${this.utils.cls('_menu-btn')}`);
        document.body.appendChild(this._$menuBtn);

        // get the body element
        this._$body = this.querySelector(`.${this.utils.cls('_body')}`);
    }

    /**
     * Register some shortcuts
     */
    _registerShortcuts(): void {
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
            this._$searchInput?.focus();
        });
    }

    async _loadItem(itemObj): Promise<void> {
        // request the item if needed
        if (!itemObj.cache) {
            // set the item loading state
            itemObj.loading = true;
            this._status.loading = true;
            this.requestUpdate();

            const request = await fetch(
                    `${
                        this.props.endpoints.base
                    }${this.props.endpoints.item.replace(':id', itemObj.id)}`,
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
            this._status.loading = false;
            this._item = itemObj.cache;
            this.requestUpdate();

            // scroll top body
            this._$body?.scrollTo?.({
                top: 0,
                behavior: 'smooth',
            });
        });
    }

    async _loadItems(category: any, loadFirstItem = false): Promise<void> {
        if (category._loading) {
            return;
        }
        category._loading = true;
        this._status.loading = true;

        const request = await fetch(
                `${this.props.endpoints.base}${this.props.endpoints.items}`,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(category.filters),
                },
            ),
            items = await request.json();

        category.items = items;

        // load first item if needed
        if (loadFirstItem) {
            const firstItemId = Object.keys(items)[0];
            this._loadItem(items[firstItemId]);
        } else {
            this._status.loading = false;
            this.requestUpdate();
        }
    }

    _search(value: string): void {
        this._searchValue = value;
        this.requestUpdate();
    }

    _exitFullscreen(): void {
        this._$placeholder.after(this);
        this._$placeholder.remove();

        this.classList.remove(this.utils.cls('-fullscreen'));
        this._status.fullscreen = false;
        this.requestUpdate();

        window.scrollTo({
            top: this.getBoundingClientRect().top - 200,
        });
    }

    _enterFullscreen(): void {
        __escapeQueue(
            () => {
                this._exitFullscreen();
            },
            {
                id: 's-doc',
            },
        );

        this._$placeholder = document.createElement('div');
        this.before(this._$placeholder);

        document.body.appendChild(this);

        this.classList.add(this.utils.cls('-fullscreen'));
        this._status.fullscreen = true;
        this.requestUpdate();
    }

    _toggleFullscreen(): void {
        if (this._status.fullscreen) {
            this._exitFullscreen();
        } else {
            this._enterFullscreen();
        }
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
            <ul role="group" class="${this.utils.cls('_items')}">
                ${__unique(Object.keys(items))
                    .sort((a, b) => {
                        const aObj = items[a],
                            bObj = items[b];
                        if (aObj.name < bObj.name) {
                            return -1;
                        }
                        if (aObj.name > bObj.name) {
                            return 1;
                        }
                        return 0;
                    })
                    .map((namespace) => {
                        const itemObj = items[namespace];

                        // filter search
                        if (this._searchValue && !searchReg.test(itemObj.id)) {
                            return;
                        }

                        return html`
                            <li
                                role="treeitem"
                                class="${this.utils.cls('_item')} ${this._item
                                    ?.id === itemObj.id
                                    ? 'active'
                                    : ''}"
                                tabindex="0"
                                @pointerup=${async (e) => {
                                    e.stopPropagation();
                                    this._loadItem(itemObj);
                                    await __wait(100);
                                    document.activeElement?.blur?.();
                                    __scrollTo(this._$body, {
                                        offset: 100,
                                    });
                                }}
                            >
                                <div>
                                    ${itemObj.loading
                                        ? html`
                                              <div
                                                  class="s-loader:square-dots ${this.utils.cls(
                                                      null,
                                                      's-color:accent s-mie:10',
                                                  )}"
                                              ></div>
                                          `
                                        : ''}
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

    _renderItemDefault(itemObj: any): any {
        let addon = '';
        if (__isColor(itemObj.default ?? '')) {
            addon = unsafeHTML(
                `<span class="${this.utils.cls(
                    '_color-preview',
                )}" style="background: ${itemObj.default}"></span>`,
            );
        }

        return html`
            ${itemObj.default !== undefined && itemObj.default !== 'undefined'
                ? html`
                      <div class="${this.utils.cls('_config-default')}">
                          <span class="_value">${itemObj.default}</span>
                          ${addon
                              ? html` <span class="_addon">${addon}</span> `
                              : ''}
                      </div>
                  `
                : ''}
        `;
    }

    _renderItemMetas(itemObj: any): any {
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
                ${itemObj.type?.raw?.toLowerCase?.() === 'config'
                    ? html`
                          <div class="${this.utils.cls('_file', 's-mbe--30')}">
                              ${unsafeHTML(this.props.icons.file)}
                              <span>.sugar/${itemObj.name}.config.ts</span>
                          </div>
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
        `;
    }

    _renderItemConfig(configObj: any): any {
        return html`
            <div class="${this.utils.cls('_config')}">
                <div class="${this.utils.cls('_config-metas')}">
                    <div class="${this.utils.cls('_config-name')}">
                        ${configObj.id.replace(/^.*\.config\./, '')}
                    </div>
                    ${this._renderItemDefault(configObj)}
                    <div class="${this.utils.cls('_config-type')}">
                        ${configObj.type?.raw ?? configObj.type}
                    </div>
                </div>
                <p class="${this.utils.cls('_param-description')}">
                    ${configObj.description}
                </p>
            </div>
        `;
    }

    _renderItemExamples(itemObj: any): any {
        return html`
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
                                  <div
                                      class="${this.utils.cls(
                                          '_example',
                                          's-mbe--50',
                                      )}"
                                  >
                                      <h3
                                          class="${this.utils.cls(
                                              '_example-title',
                                              's-typo--h3 s-mbe--50',
                                          )}"
                                      >
                                          ${__upperFirst(example.title ?? '')}
                                      </h3>
                                      ${itemObj.type.raw?.toLowerCase() ===
                                      'styleguide'
                                          ? html`<div
                                                class="${this.utils.cls(
                                                    '_example-preview',
                                                    's-mbe--50',
                                                )}"
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
                              `,
                          )}
                      </div>
                  `
                : ''}
        `;
    }

    _renderItem(itemObj): any {
        // markdown support
        if (itemObj.docHtml) {
            return html`
                <div class="s-format:text s-rhythm:vertical">
                    ${unsafeHTML(itemObj.docHtml)}
                </div>
            `;
        }

        if (itemObj.type.raw.toLowerCase() === 'config') {
            return html`
                ${this._renderItemMetas(itemObj)}

                <div class="${this.utils.cls('_configs')}">
                    ${itemObj.docblocks
                        .slice(1)
                        .map(
                            (configObj) => html`
                                ${this._renderItemConfig(configObj)}
                            `,
                        )}
                </div>
            `;
        }

        // default item
        return html`
            <div
                s-deps
                css="${__camelCase(itemObj.namespace?.split?.('.').pop())}"
            >
                ${this._renderItemMetas(itemObj)}
                ${this._renderItemExamples(itemObj)}
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
                                              ${this._renderItemDefault(
                                                  paramObj,
                                              )}
                                              <div
                                                  class="${this.utils.cls(
                                                      '_param-type',
                                                  )}"
                                              >
                                                  ${paramObj.type?.raw ??
                                                  paramObj.type}
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
            </div>
        `;
    }

    _renderCategories(categories: any, role = 'tree'): any {
        return html`
            <ul role="${role}" class="${this.utils.cls('_categories')}">
                ${Object.keys(categories).map((categoryId, i) => {
                    const categoryObj = categories[categoryId];
                    if (!categoryObj.items && !categoryObj.children) {
                        if (!this._firstCategory) {
                            this._loadItems(categoryObj, true);
                        } else {
                            this._loadItems(categoryObj);
                        }
                    }
                    if (!this._firstCategory) {
                        categoryObj.selected = true;
                        this._firstCategory = categoryObj;
                    }
                    return html`
                        <li
                            role="treeitem"
                            class="${this.utils.cls(
                                '_category',
                            )} ${categoryObj.selected || this._searchValue
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
                                          'group',
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
            <button
                class="${this.utils.cls('_menu-btn')}"
                @pointerup=${async (e) => {
                    e.preventDefault();
                    await __wait(100);
                    this._$explorer.focus();
                }}
            >
                ${unsafeHTML(this.props.icons.menu)}
            </button>
            <div class="${this.utils.cls('_explorer')}" tabindex="0">
                <label
                    class="${this.utils.cls(
                        '_search',
                        's-input-container--addon',
                    )}"
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
                    ${this._item ? html` ${this._renderItem(this._item)} ` : ''}
                </div>
                <div class="${this.utils.cls('_toolbar')}">
                    ${this.props.features.fullscreen
                        ? html`
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
                                      ? html`
                                            ${unsafeHTML(
                                                this.props.icons.exitFullscreen,
                                            )}
                                        `
                                      : html`
                                            ${unsafeHTML(
                                                this.props.icons
                                                    .enterFullscreen,
                                            )}
                                        `}
                              </button>
                          `
                        : ''}
                </div>
                ${this._status.loading
                    ? html`
                          <div class="${this.utils.cls('_loading')}">
                              ${unsafeHTML(this.props.loaderSvg)}
                          </div>
                      `
                    : ''}
            </div>
        `;
    }
}
