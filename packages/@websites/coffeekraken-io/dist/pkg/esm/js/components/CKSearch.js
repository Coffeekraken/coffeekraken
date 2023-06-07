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
import __SEnv from '@coffeekraken/s-env';
import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SRequest from '@coffeekraken/s-request';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
import { __hotkey } from '@coffeekraken/sugar/keyboard';
import { html } from 'lit';
__sFiltrableInputDefine({
    value: 'name',
    label: (item) => {
        return `${item.type} ${item.namespace}`;
    },
    closeOnSelect: true,
    resetOnSelect: false,
    showKeywords: true,
    saveState: false,
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
        var _a, _b, _c, _d, _e, _f, _g;
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
                                <p class="_description s-typo:p s-truncate:2">
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
                                        ${(_b = item.platform) === null || _b === void 0 ? void 0 : _b.map((platform) => html `
                                                <i
                                                    class="s-platform:${platform.name}"
                                                ></i>
                                            `)}
                                        &nbsp;
                                        <span class="s-badge s-color:main"
                                            >${unsafeHTML((_e = (_d = (_c = item.type) === null || _c === void 0 ? void 0 : _c.types) === null || _d === void 0 ? void 0 : _d[0].type) !== null && _e !== void 0 ? _e : '')}</span
                                        >
                                    </div>
                                </div>
                                <p
                                    class="_namespace s-opacity:50 s-font:20 s-mbe:20"
                                >
                                    ${unsafeHTML((_f = item.namespace) !== null && _f !== void 0 ? _f : '')}
                                </p>
                                <p class="_description s-typo:p s-truncate:2">
                                    ${unsafeHTML((_g = item.description) !== null && _g !== void 0 ? _g : '')}
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
                    item.preventSet = true;
                    items.push(item);
                });
                return items;
            });
        }
        let items = yield fetchItems();
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
                            preventClose: true,
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
                    preventClose: true,
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
                    preventClose: true,
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
                    preventClose: true,
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
                    return (item.type !== 'Markdown' &&
                        item.type !== 'Styleguide');
                });
            }
        }
        return items;
    }),
}, 'ck-search-input');
export default class CKSearch extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }
    constructor() {
        super({
            shadowDom: false,
        });
    }
    firstUpdated() {
        this.$input = this.querySelector('input');
        // if (document.location.hash) {
        //     this._handleAnchor(document.location.hash.replace('#', ''));
        // }
        __hotkey('ctrl+f').on('press', () => {
            __cursorToEnd(this.$input);
        });
        this.addEventListener('s-filtrable-input.select', (e) => {
            var _a;
            const { item, $elm } = e.detail;
            if (item.type === 'category' || item.type === 'package') {
                this.$input.value = item.value + ' ';
                __cursorToEnd(this.$input);
            }
            else {
                if ((_a = item.menu) === null || _a === void 0 ? void 0 : _a.slug) {
                    if (item.package.name !== __SEnv.env.PACKAGE.name) {
                        $elm.dispatchEvent(new CustomEvent('location.href', {
                            detail: `/package/${item.package.name}${item.menu.slug}`,
                            bubbles: true,
                        }));
                    }
                    else {
                        $elm.dispatchEvent(new CustomEvent('location.href', {
                            detail: `${item.menu.slug}`,
                            bubbles: true,
                        }));
                    }
                }
                else if (item.id.match(/\.config\./)) {
                    $elm.dispatchEvent(new CustomEvent('location.href', {
                        detail: `/config/explorer/${item.filename.replace(/\.config\.(j|t)s$/, '')}#${item.id
                            .split('.config.')[1]
                            .replace(/\./gm, '-')}`,
                        bubbles: true,
                    }));
                }
                else {
                    $elm.dispatchEvent(new CustomEvent('location.href', {
                        detail: `/api/${item.fullNamespace}`,
                        bubbles: true,
                    }));
                }
            }
        });
    }
    render() {
        return html `
            <div class="ck-search" s-deps css="ckSearch">
                <div class="ck-search__background"></div>
                <div class="ck-search__content">
                    <ck-search-input id="ck-search-input">
                        <input
                            placeholder="Search ( Ctrl+F )..."
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
                                </p>
                                <p class="s-typo:p s-color:accent">
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
                                    Search
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
    __SLitComponent.define(tagName, CKSearch, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUYsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sOENBQThDLENBQUM7QUFDekUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsdUJBQXVCLENBQ25CO0lBQ0ksS0FBSyxFQUFFLE1BQU07SUFDYixLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsYUFBYSxFQUFFLElBQUk7SUFDbkIsYUFBYSxFQUFFLEtBQUs7SUFDcEIsWUFBWSxFQUFFLElBQUk7SUFDbEIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDeEMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUM3QixlQUFlO1FBQ2YsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuRDtRQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMzQixPQUFPLEtBQUssQ0FB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