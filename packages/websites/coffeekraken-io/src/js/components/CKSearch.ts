// @ts-nocheck

import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';
import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';

import { loadDocmap } from '../state/state';

let searchItems;
__sFiltrableInputDefine(
    {
        value: 'name',
        label: (item) => {
            return `${item.type} ${item.namespace}`;
        },
        filtrable: ['namespace', 'name', 'type'],
        templates: ({ type, item, html, unsafeHTML }) => {
            if (type === 'item') {
                return html`
                    <div class="__item">
                        <div class="s-flex s-mbe:10">
                            <h4
                                class="__title s-typo:bold s-tc:accent s-flex-item:grow"
                            >
                                ${unsafeHTML(item.name)}
                            </h4>
                            <div>
                                ${item.platform.map(
                                    (platform) => html`
                                        <i
                                            class="s-platform:${platform.name}"
                                        ></i>
                                    `,
                                )}
                                &nbsp;
                                <span class="s-badge s-color:main"
                                    >${unsafeHTML(item.type ?? '')}</span
                                >
                            </div>
                        </div>
                        <p class="__namespace s-opacity:50 s-font:20 s-mbe:20">
                            ${unsafeHTML(item.namespace ?? '')}
                        </p>
                        <p class="__description s-typo:p s-truncate:2">
                            ${unsafeHTML(item.description ?? '')}
                        </p>
                    </div>
                `;
            }
        },
        items: async ({ value }) => {
            async function fetchItems() {
                const request = new __SRequest({
                    url: '/docmap.json',
                });
                const result = await request.send();
                const items = [];

                Object.keys(result.data.map).forEach((namespace) => {
                    const item = result.data.map[namespace];
                    item.fullNamespace = namespace;
                    items.push(item);
                });

                window.localStorage.setItem(
                    'ck-search-items',
                    JSON.stringify(items),
                );

                return items;
            }

            const cached = window.localStorage.getItem('ck-search-items');
            if (!cached) {
                const items = await fetchItems();
                return items;
            } else {
                fetchItems();
                const items = JSON.parse(cached);
                return items;
            }
        },
    },
    'ck-search-input',
);

export default class CKSearch extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }
    firstUpdated() {
        this.addEventListener('select', (e) => {
            const item = e.detail;
            if (item.menu?.slug) {
                if (item.package !== window.packageJson.name) {
                    document.location.href = `${item.package}${item.menu.slug}`;
                } else {
                    document.location.href = item.menu.slug;
                }
            } else {
                document.location.href = `/api/${item.fullNamespace}`;
            }
        });
    }
    render() {
        return html`
            <div class="ck-search">
                <div class="__background"></div>
                <div class="__content s-color:accent">
                    <ck-search-input>
                        <input
                            placeholder="API search..."
                            type="text"
                            name="search"
                            class="s-input s-color:accent s-scale:11"
                        />
                    </ck-search-input>
                </div>
            </div>
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-search') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKSearch);
}
