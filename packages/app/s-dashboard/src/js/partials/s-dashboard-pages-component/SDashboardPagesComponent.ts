// @ts-nocheck

import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SRequest from '@coffeekraken/s-request';
import { __xmlToJson } from '@coffeekraken/sugar/convert';
import { css, html, unsafeCSS } from 'lit';

import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface.js';

import __SDashboardPagesComponentAttrsInterface from './interface/SDashboardPagesComponentAttrsInterface.js';

import __css from './s-dashboard-pages-component.css';

__sFiltrableInputDefine(
    {
        inline: true,
        value: 'loc',
        label: (item) => {
            return `${item.type} ${item.namespace}`;
        },
        classes: {
            container: 'ck-panel',
            list: 'ck-list',
            listItem: 'ck-list__item',
        },
        closeOnSelect: true,
        filtrable: ['title', 'loc'],
        templates: ({ type, item, html, unsafeHTML }) => {
            if (type === 'item') {
                return html`
                    <div class="s-dashboard-pages_list-item">
                        ${item.title
                            ? html`
                                  <div class="s-mbe:10">
                                      <h4
                                          class="s-dashboard-pages_list-item-title s-typo:bold s-tc:accent s-grow"
                                      >
                                          ${unsafeHTML(item.title)}
                                      </h4>
                                  </div>
                              `
                            : ''}
                        <p class="_description s-typo:p s-truncate:1">
                            ${unsafeHTML(item.loc ?? '')}
                        </p>
                    </div>
                `;
            }
        },
        items: async ({ value }) => {
            async function fetchItems() {
                const request = new __SRequest({
                    url: '/sitemap.xml',
                });
                const result = await request.send();
                const json = __xmlToJson(result.data);

                // __localStorage.setItem('s-dashboard-pages', json.urlset.url);

                return json.urlset.url;
            }

            let items;
            // const cached = await __localStorage.getItem('s-dashboard-pages');
            // console.log('CACH', cached);
            // if (!cached) {
            items = await fetchItems();
            // } else {
            //     fetchItems();
            //     items = cached;
            // }
            return items;
        },
    },
    's-dashboard-pages-internal',
);

export const events = ['s-dashboard-pages.selectItem'];

export default class SDashboardPages extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
            {},
            _SDashboardComponentWidgetInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    /**
     * @name            document
     * @type            Document
     * @get
     *
     * Access the document that the dashboard is using.
     * If in an iframe, take the parent document, otherwise, the document itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get document(): Document {
        return window.parent?.document ?? document;
    }

    constructor() {
        super({
            shadowDom: false,
            interface: __SDashboardPagesComponentAttrsInterface,
        });
    }

    _$filtrableInput;
    _$input;
    firstUpdated() {
        this._$input = this.querySelector('input');
        this._$filtrableInput = this.querySelector(
            's-dashboard-pages-internal',
        );

        this.addEventListener('s-filtrable-input.items', (e) => {
            this.requestUpdate();
        });

        // __hotkey('ctrl+p').on('press', () => {
        //     __cursorToEnd(this._$input);
        // });

        document.addEventListener('dashboard.changePage', () => {
            this._$input.focus();
            setTimeout(() => {
                this._$input.select();
            }, 200);
        });

        this.addEventListener('s-filtrable-input.select', (e) => {
            const { item, $elm } = e.detail;

            this.dispatchEvent(
                new CustomEvent('s-dashboard-pages.selectItem', {
                    bubbles: true,
                    detail: {
                        item,
                        $elm,
                    },
                }),
            );

            if (this.settings.onSelect) {
                this.settings.onSelect({ item, $elm });
            } else {
                this.document.location.href = item.loc;
            }
        });

        if (document.isChangePageWanted) {
            setTimeout(() => {
                this._$input.focus();
                setTimeout(() => {
                    this._$input.select();
                }, 200);
            });
        }
    }
    render() {
        return html`
            <div class="s-dashboard-pages s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">
                    Pages
                    <span class="ck-count"
                        >${this._$filtrableInput?.state?.items?.length}</span
                    >
                </h2>

                <s-dashboard-pages-internal class="s-width:100">
                    <input
                        placeholder="Change page..."
                        type="text"
                        name="page"
                        class="s-input s-color:accent s-width:100"
                    />
                </s-dashboard-pages-internal>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 's-dashboard-pages') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardPages);
}
