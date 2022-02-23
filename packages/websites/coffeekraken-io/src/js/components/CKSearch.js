// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SRequest from '@coffeekraken/s-request';
import { html } from 'lit';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
__sFiltrableInputDefine({
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
        var _a, _b, _c, _d;
        if (type === 'item') {
            switch (item.type) {
                case 'category':
                case 'package':
                    return html `
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.name)}
                                    </h4>
                                </div>
                                <p class="__description s-typo:p s-truncate:2">
                                    ${unsafeHTML((_a = item.description) !== null && _a !== void 0 ? _a : '')}
                                </p>
                            </div>
                        `;
                    break;
                default:
                    return html `
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.name)}
                                    </h4>
                                    <div>
                                        ${item.platform.map((platform) => html `
                                                <i
                                                    class="s-platform:${platform.name}"
                                                ></i>
                                            `)}
                                        &nbsp;
                                        <span class="s-badge s-color:main"
                                            >${unsafeHTML((_b = item.type) !== null && _b !== void 0 ? _b : '')}</span
                                        >
                                    </div>
                                </div>
                                <p class="__namespace s-opacity:50 s-font:20 s-mbe:20">
                                    ${unsafeHTML((_c = item.namespace) !== null && _c !== void 0 ? _c : '')}
                                </p>
                                <p class="__description s-typo:p s-truncate:2">
                                    ${unsafeHTML((_d = item.description) !== null && _d !== void 0 ? _d : '')}
                                </p>
                            </div>
                        `;
                    break;
            }
        }
    },
    items: ({ value }) => __awaiter(void 0, void 0, void 0, function* () {
        function fetchItems() {
            return __awaiter(this, void 0, void 0, function* () {
                const request = new __SRequest({
                    url: '/docmap.json',
                });
                const result = yield request.send();
                const items = [];
                Object.keys(result.data.map).forEach((namespace) => {
                    const item = result.data.map[namespace];
                    item.fullNamespace = namespace;
                    items.push(item);
                });
                window.localStorage.setItem('ck-search-items', JSON.stringify(items));
                return items;
            });
        }
        let items;
        const cached = window.localStorage.getItem('ck-search-items');
        if (!cached) {
            items = yield fetchItems();
        }
        else {
            fetchItems();
            items = JSON.parse(cached);
        }
        if (value.match(/^@([a-z_-]+)?$/)) {
            let packageName = value.replace(/^@/, '');
            let packages = {};
            items.forEach((item) => {
                if (item.package.name.includes(`@coffeekraken/${packageName}`)) {
                    if (!packages[item.package.name]) {
                        packages[item.package.name] = {
                            value: `@${item.package.name.replace('@coffeekraken/', '')}`,
                            namespace: item.package.name,
                            type: 'package',
                            name: item.package.name,
                            description: item.package.description,
                            props: {
                                value: 'value'
                            }
                        };
                    }
                }
            });
            return Object.values(packages);
        }
        if (value.match(/^\/([a-z]+)?$/)) {
            return [{
                    value: '/doc',
                    namespace: '/doc',
                    type: 'category',
                    name: 'Documentation',
                    description: 'Search through the documentation',
                    props: {
                        value: 'value'
                    }
                }, {
                    value: '/styleguide',
                    namespace: '/styleguide',
                    type: 'category',
                    name: 'Styleguide',
                    description: 'Search through the styleguide',
                    props: {
                        value: 'value'
                    }
                }, {
                    value: '/api',
                    namespace: '/api',
                    type: 'category',
                    name: 'API',
                    description: 'Search through the API',
                    props: {
                        value: 'value'
                    }
                }];
        }
        if (value.match(/^@[a-z_-]+\s.*?/)) {
            const packageName = `@coffeekraken/${value.replace(/^@/, '').split(' ')[0].trim()}`;
            return items.filter(item => {
                return item.package.name.startsWith(packageName);
            });
        }
        if (value.match(/^\/[a-z]+.*?/)) {
            if (value.startsWith('/doc')) {
                return items.filter(item => {
                    return item.type === 'Markdown';
                });
            }
            if (value.startsWith('/styleguide')) {
                return items.filter(item => {
                    return item.type === 'Styleguide';
                });
            }
            if (value.startsWith('/api')) {
                return items.filter(item => {
                    return item.type !== 'Markdown' && item.type !== 'Styleguide';
                });
            }
        }
        return items;
    }),
}, 'ck-search-input');
export default class CKSearch extends __SLitComponent {
    constructor() {
        var _a, _b;
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        const queryObj = __queryStringToObject((_a = document.location.search) !== null && _a !== void 0 ? _a : '');
        this._search = (_b = queryObj.search) !== null && _b !== void 0 ? _b : '';
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
    firstUpdated() {
        this._$input = this.querySelector('input');
        if (document.location.hash) {
            this, this._handleAnchor(document.location.hash.replace('#', ''));
        }
        __hotkey('ctrl+p').on('press', () => {
            __cursorToEnd(this._$input);
        });
        this.addEventListener('selectItem', (e) => {
            var _a;
            const { item, $elm } = e.detail;
            if (item.type === 'category' || item.type === 'package') {
                this._$input.value = item.value + ' ';
                __cursorToEnd(this._$input);
            }
            else {
                if ((_a = item.menu) === null || _a === void 0 ? void 0 : _a.slug) {
                    if (item.package.name !== window.packageJson.name) {
                        $elm.dispatchEvent(new CustomEvent('location.href', {
                            detail: `/${item.package.name}${item.menu.slug}`,
                            bubbles: true
                        }));
                        // document.location.href = `/${item.package.name}${item.menu.slug}`;
                    }
                    else {
                        $elm.dispatchEvent(new CustomEvent('location.href', {
                            detail: item.menu.slug,
                            bubbles: true
                        }));
                        // document.location.href = item.menu.slug;
                    }
                }
                else {
                    $elm.dispatchEvent(new CustomEvent('location.href', {
                        detail: `/api/${item.fullNamespace}`,
                        bubbles: true
                    }));
                    // document.location.href = `/api/${item.fullNamespace}`;
                }
                this._$input.value = '';
                this._$input.blur();
            }
        });
    }
    render() {
        return html `
            <div class="ck-search">
                <div class="ck-search__background"></div>
                <div class="ck-search__content s-color:accent">
                    <ck-search-input>
                        <input
                            placeholder="Search..."
                            type="text"
                            name="search"
                            value="${this._search}"
                            class="s-input s-color:accent"
                        />
                        <template type="before">
                            <div class="s-p:30" id="search-tips">
                                <p class="s-mbe:20">
                                    <span class="s-typo:p s-tc:current">Search tips</span>
                                    <i class="s-icon:close s-float:right" s-activate href="#search-tips"></i>
                                </p>
                                <p class="s-typo:p">
                                    <span class="s-badge:outline s-mie:10">/...</span> Categories&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-badge:outline s-mie:10">@...</span> Packages&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-badge s-color:complementary s-mie:10">CMD+P</span> Search shortcut
                                </p>
                            </div>
                        </template>
                    </ck-search-input>
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 'ck-search') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKSearch);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tTZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDS1NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUYsT0FBTyxxQkFBcUIsTUFBTSxvREFBb0QsQ0FBQztBQUN2RixPQUFPLFFBQVEsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RCxPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8sYUFBYSxNQUFNLDhDQUE4QyxDQUFDO0FBRXpFLHVCQUF1QixDQUNuQjtJQUNJLEtBQUssRUFBRSxNQUFNO0lBQ2IsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNELGFBQWEsRUFBRSxJQUFJO0lBQ25CLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQ3hDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFFN0IsZUFBZTtRQUNmLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMs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