// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
import __xmlToJson from '@coffeekraken/sugar/shared/convert/xmlToJson';
import __localStorage from '@coffeekraken/sugar/js/storage/localStorage';

import '../../../../../../src/js/partials/s-dashboard-pages-component/s-dashboard-pages-component.css';

__sFiltrableInputDefine(
    {
        value: 'loc',
        label: (item) => {
            return `${item.type} ${item.namespace}`;
        },
        closeOnSelect: true,
        filtrable: ['title', 'loc'],
        templates: ({ type, item, html, unsafeHTML }) => {
            if (type === 'item') {
                return html`
                    <div class="s-dashboard-pages__list-item">
                        ${item.title
                            ? html`
                                  <div class="s-mbe:10">
                                      <h4
                                          class="s-dashboard-pages__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                      >
                                          ${unsafeHTML(item.title)}
                                      </h4>
                                  </div>
                              `
                            : ''}
                        <p class="__description s-typo:p s-truncate:1">
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

                __localStorage.setItem('s-dashboard-pages', json.urlset.url);

                return json.urlset.url;
            }

            let items;
            const cached = await __localStorage.getItem('s-dashboard-pages');
            if (!cached) {
                items = await fetchItems();
            } else {
                fetchItems();
                items = cached;
            }
            return items;
        },
    },
    's-dashboard-pages-internal',
);

export default class SDashboardPages extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }
    _$input;
    firstUpdated() {
        this._$input = this.querySelector('input');

        // __hotkey('ctrl+p').on('press', () => {
        //     __cursorToEnd(this._$input);
        // });

        this.addEventListener('selectItem', (e) => {
            const { item, $elm } = e.detail;

            console.log('SEleected', item, $elm);

            // if (item.type === 'category' || item.type === 'package') {
            //     this._$input.value = item.value + ' ';
            //     __cursorToEnd(this._$input);
            // } else {
            //     if (item.menu?.slug) {
            //         if (item.package.name !== window.packageJson.name) {
            //             $elm.dispatchEvent(
            //                 new CustomEvent('location.href', {
            //                     detail: `/package/${item.package.name}${item.menu.slug}`,
            //                     bubbles: true,
            //                 }),
            //             );
            //             // document.location.href = `/${item.package.name}${item.menu.slug}`;
            //         } else {
            //             $elm.dispatchEvent(
            //                 new CustomEvent('location.href', {
            //                     detail: `${item.menu.slug}`,
            //                     bubbles: true,
            //                 }),
            //             );
            //             // document.location.href = item.menu.slug;
            //         }
            //     } else {
            //         $elm.dispatchEvent(
            //             new CustomEvent('location.href', {
            //                 detail: `/api/${item.fullNamespace}`,
            //                 bubbles: true,
            //             }),
            //         );
            //         // document.location.href = `/api/${item.fullNamespace}`;
            //     }

            //     this._$input.value = '';
            //     this._$input.blur();
            // }
        });
    }
    render() {
        return html`
            <div class="s-dashboard-pages s-width:100">
                <s-dashboard-pages-internal class="s-width:100">
                    <input
                        placeholder="Change page..."
                        type="text"
                        name="page"
                        class="s-input s-scale:08 s-color:accent s-width:100"
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
