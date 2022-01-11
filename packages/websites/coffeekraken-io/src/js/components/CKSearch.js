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
__sFiltrableInputDefine({
    value: 'name',
    label: (item) => {
        return `${item.type} ${item.namespace}`;
    },
    filtrable: ['namespace', 'name', 'type'],
    searchValuePreprocess: (value) => {
        if (value.match(/^\/[a-z]+/)) {
            return value.replace(/^\/[a-z]+\s?/, '').trim();
        }
        return value;
    },
    templates: ({ type, item, html, unsafeHTML }) => {
        var _a, _b, _c, _d;
        if (type === 'item') {
            switch (item.type) {
                case 'category':
                    return html `
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.title)}
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
        if (value.match(/^\/([a-z]+)?$/)) {
            return [{
                    value: '/doc',
                    namespace: '/doc',
                    type: 'category',
                    title: 'Documentation',
                    description: 'Search through the documentation',
                }, {
                    value: '/styleguide',
                    namespace: '/styleguide',
                    type: 'category',
                    title: 'Styleguide',
                    description: 'Search through the styleguide',
                }, {
                    value: '/api',
                    namespace: '/api',
                    type: 'category',
                    title: 'API',
                    description: 'Search through the API',
                }];
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
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }
    firstUpdated() {
        this._$input = this.querySelector('input');
        this.addEventListener('select', (e) => {
            var _a;
            const item = e.detail;
            if (item.type === 'category') {
                this._$input.value = item.value + ' ';
                this._$input.focus();
            }
            else {
                if ((_a = item.menu) === null || _a === void 0 ? void 0 : _a.slug) {
                    if (item.package !== window.packageJson.name) {
                        document.location.href = `/${item.package}${item.menu.slug}`;
                    }
                    else {
                        document.location.href = item.menu.slug;
                    }
                }
                else {
                    document.location.href = `/api/${item.fullNamespace}`;
                }
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
                            class="s-input s-color:accent s-scale:11"
                        />
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tTZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDS1NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFFOUYsdUJBQXVCLENBQ25CO0lBQ0ksS0FBSyxFQUFFLE1BQU07SUFDYixLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDeEMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM3QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuRDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDRCxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7O1FBRTVDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUVqQixRQUFPLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ2QsS0FBSyxVQUFVO29CQUNYLE9BQU8sSUFBSSxDQUFBOzs7Ozs7MENBTU8sVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7c0NBSTFCLFVBQVUsQ0FB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