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

__sFiltrableInputDefine(
    {
        value: 'name',
        label: (item) => {
            return `${item.type} ${item.namespace}`;
        },
        closeOnSelect: true,
        filtrable: ['namespace', 'name', 'type'],
        searchValuePreprocess: (value) => {
            // "@" searches
            if (value.match(/^@[a-z_-]+\s.*/)) {
                return value.replace(/^@[a-z_-]+\s/, '').trim();
            }
            if (value.match(/^@[a-z_-]+/)) {
                return value.replace(/^@/, '').trim();
            }

            // "/" searches
            if (value.match(/^\/[a-z]+\s.*/)) {
                return value.replace(/^\/[a-z]+\s/, '').trim();
            }
            if (value.match(/^\/[a-z]+/)) {
                return value.replace(/^\//, '').trim();
            }

            // default
            return value;
        },
        templates: ({ type, item, html, unsafeHTML }) => {
            if (type === 'item') {
                switch (item.type) {
                    case 'category':
                    case 'package':
                        return html`
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.name)}
                                    </h4>
                                </div>
                                <p class="__description s-typo:p s-truncate:2">
                                    ${unsafeHTML(item.description ?? '')}
                                </p>
                            </div>
                        `;
                        break;
                    default:
                        return html`
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.name)}
                                    </h4>
                                    <div>
                                        ${item.platform?.map(
                                            (platform) => html`
                                                <i
                                                    class="s-platform:${platform.name}"
                                                ></i>
                                            `,
                                        )}
                                        &nbsp;
                                        <span class="s-badge s-color:main"
                                            >${unsafeHTML(
                                                item.type ?? '',
                                            )}</span
                                        >
                                    </div>
                                </div>
                                <p
                                    class="__namespace s-opacity:50 s-font:20 s-mbe:20"
                                >
                                    ${unsafeHTML(item.namespace ?? '')}
                                </p>
                                <p class="__description s-typo:p s-truncate:2">
                                    ${unsafeHTML(item.description ?? '')}
                                </p>
                            </div>
                        `;
                        break;
                }
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

                // window.localStorage.setItem(
                //     'ck-search-items',
                //     JSON.stringify(items),
                // );

                return items;
            }

            let items;

            // const cached = window.localStorage.getItem('ck-search-items');
            // if (!cached) {
            items = await fetchItems();
            // } else {
            //     fetchItems();
            //     items = JSON.parse(cached);
            // }

            if (value.match(/^@([a-z_-]+)?$/)) {
                let packageName = value.replace(/^@/, '');

                let packages = {};
                items.forEach((item) => {
                    if (
                        item.package.name.includes(
                            `@coffeekraken/${packageName}`,
                        )
                    ) {
                        if (!packages[item.package.name]) {
                            packages[item.package.name] = {
                                value: `@${item.package.name.replace(
                                    '@coffeekraken/',
                                    '',
                                )}`,
                                namespace: item.package.name,
                                type: 'package',
                                name: item.package.name,
                                description: item.package.description,
                                props: {
                                    value: 'value',
                                },
                            };
                        }
                    }
                });
                return Object.values(packages);
            }

            if (value.match(/^\/([a-z]+)?$/)) {
                return [
                    {
                        value: '/doc',
                        namespace: '/doc',
                        type: 'category',
                        name: 'Documentation',
                        description: 'Search through the documentation',
                        props: {
                            value: 'value',
                        },
                    },
                    {
                        value: '/styleguide',
                        namespace: '/styleguide',
                        type: 'category',
                        name: 'Styleguide',
                        description: 'Search through the styleguide',
                        props: {
                            value: 'value',
                        },
                    },
                    {
                        value: '/api',
                        namespace: '/api',
                        type: 'category',
                        name: 'API',
                        description: 'Search through the API',
                        props: {
                            value: 'value',
                        },
                    },
                ];
            }

            if (value.match(/^@[a-z_-]+\s.*?/)) {
                const packageName = `@coffeekraken/${value
                    .replace(/^@/, '')
                    .split(' ')[0]
                    .trim()}`;
                return items.filter((item) => {
                    return item.package.name.startsWith(packageName);
                });
            }

            if (value.match(/^\/[a-z]+.*?/)) {
                if (value.startsWith('/doc')) {
                    return items.filter((item) => {
                        return item.type === 'Markdown';
                    });
                }
                if (value.startsWith('/styleguide')) {
                    return items.filter((item) => {
                        return item.type === 'Styleguide';
                    });
                }
                if (value.startsWith('/api')) {
                    return items.filter((item) => {
                        return (
                            item.type !== 'Markdown' &&
                            item.type !== 'Styleguide'
                        );
                    });
                }
            }

            return items;
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
        const queryObj = __queryStringToObject(document.location.search ?? '');
        this._search = queryObj.search ?? '';

        __querySelectorLive('[href^="#search="]', ($elm) => {
            $elm.addEventListener('click', (e) => {
                this._handleAnchor(e.target.href.split('#').pop());
                e.preventDefault();
                e.stopPropagation();
            });
        });
    }
    _handleAnchor(anchor) {
        const keywords = anchor.replace('search=', '').split('=').pop();
        this._$input.value = keywords;
        this._$input.focus();
    }
    _$input;
    _search;
    firstUpdated() {
        this._$input = this.querySelector('input');

        // if (document.location.hash) {
        //     this._handleAnchor(document.location.hash.replace('#', ''));
        // }

        __hotkey('ctrl+f').on('press', () => {
            __cursorToEnd(this._$input);
        });

        this.addEventListener('s-filtrable-input.select', (e) => {
            const { item, $elm } = e.detail;

            console.log(e);

            if (item.type === 'category' || item.type === 'package') {
                this._$input.value = item.value + ' ';
                __cursorToEnd(this._$input);
            } else {
                if (item.menu?.slug) {
                    if (item.package.name !== window.packageJson.name) {
                        $elm.dispatchEvent(
                            new CustomEvent('location.href', {
                                detail: `/package/${item.package.name}${item.menu.slug}`,
                                bubbles: true,
                            }),
                        );
                        // document.location.href = `/${item.package.name}${item.menu.slug}`;
                    } else {
                        $elm.dispatchEvent(
                            new CustomEvent('location.href', {
                                detail: `${item.menu.slug}`,
                                bubbles: true,
                            }),
                        );
                        // document.location.href = item.menu.slug;
                    }
                } else {
                    $elm.dispatchEvent(
                        new CustomEvent('location.href', {
                            detail: `/api/${item.fullNamespace}`,
                            bubbles: true,
                        }),
                    );
                    // document.location.href = `/api/${item.fullNamespace}`;
                }

                this._$input.value = '';
                this._$input.blur();
            }
        });
    }
    render() {
        return html`
            <div class="ck-search">
                <div class="ck-search__background"></div>
                <div class="ck-search__content s-color:accent">
                    <ck-search-input>
                        <input
                            placeholder="Search..."
                            type="text"
                            name="search"
                            value="${this._search}"
                            class="s-input s-color:accent s-scale:08"
                        />
                        <template type="before">
                            <div class="s-p:30" id="search-tips">
                                <p class="s-mbe:20">
                                    <span class="s-typo:p s-tc:current"
                                        >Search tips</span
                                    >
                                    <i
                                        class="s-icon:close s-float:right"
                                        s-activate
                                        href="#search-tips"
                                    ></i>
                                </p>
                                <p class="s-typo:p">
                                    <span class="s-badge:outline s-mie:10"
                                        >/...</span
                                    >
                                    Categories&nbsp;&nbsp;&nbsp;&nbsp;<span
                                        class="s-badge:outline s-mie:10"
                                        >@...</span
                                    >
                                    Packages&nbsp;&nbsp;&nbsp;&nbsp;<span
                                        class="s-badge s-color:complementary s-mie:10"
                                        >CTRL+F</span
                                    >
                                    Search shortcut
                                </p>
                            </div>
                        </template>
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
