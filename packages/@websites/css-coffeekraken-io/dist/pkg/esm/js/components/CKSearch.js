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
import { __define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SRequest from '@coffeekraken/s-request';
import { __cursorToEnd } from '@coffeekraken/sugar/dom';
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
export function __define(props = {}, tagName = 'ck-search') {
    __SLitComponent.define(tagName, CKSearch, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDaEcsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLHVCQUF1QixDQUNuQjtJQUNJLEtBQUssRUFBRSxNQUFNO0lBQ2IsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNELGFBQWEsRUFBRSxJQUFJO0lBQ25CLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQ3hDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDN0IsZUFBZTtRQUNmLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkQ7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDM0IsT0FB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