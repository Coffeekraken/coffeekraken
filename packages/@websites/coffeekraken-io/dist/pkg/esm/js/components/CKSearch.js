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
import { define as __sFiltrableInputDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SRequest from '@coffeekraken/s-request';
import __cursorToEnd from '@coffeekraken/sugar/js/dom/input/cursorToEnd';
import __hotkey from '@coffeekraken/sugar/js/keyboard/hotkey';
import { html } from 'lit';
__sFiltrableInputDefine({
    value: 'name',
    label: (item) => {
        return `${item.type} ${item.namespace}`;
    },
    closeOnSelect: true,
    resetOnSelect: false,
    showKeywords: true,
    saveState: true,
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
                    ${(_b = item.platform) === null || _b === void 0 ? void 0 : _b.map((platform) => html `
                        <i class="s-platform:${platform.name}"></i>
                      `)}
                    &nbsp;
                    <span class="s-badge s-color:main"
                      >${unsafeHTML((_e = (_d = (_c = item.type) === null || _c === void 0 ? void 0 : _c.types) === null || _d === void 0 ? void 0 : _d[0].type) !== null && _e !== void 0 ? _e : '')}</span
                    >
                  </div>
                </div>
                <p class="__namespace s-opacity:50 s-font:20 s-mbe:20">
                  ${unsafeHTML((_f = item.namespace) !== null && _f !== void 0 ? _f : '')}
                </p>
                <p class="__description s-typo:p s-truncate:2">
                  ${unsafeHTML((_g = item.description) !== null && _g !== void 0 ? _g : '')}
                </p>
              </div>
            `;
                    break;
            }
        }
    },
    items: ({ value }) => __awaiter(void 0, void 0, void 0, function* () {
        return [];
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
            shadowDom: false,
        });
    }
    static get properties() {
        return __SLitComponent.createProperties();
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
                  <span class="s-typo:p s-tc:current">Search tips</span>
                </p>
                <p class="s-typo:p s-color:accent">
                  <span class="s-badge:outline s-mie:10">/...</span>
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
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKSearch);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUYsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sOENBQThDLENBQUM7QUFDekUsT0FBTyxRQUFRLE1BQU0sd0NBQXdDLENBQUM7QUFDOUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUUzQix1QkFBdUIsQ0FDckI7SUFDRSxLQUFLLEVBQUUsTUFBTTtJQUNiLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2QsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFDRCxhQUFhLEVBQUUsSUFBSTtJQUNuQixhQUFhLEVBQUUsS0FBSztJQUNwQixZQUFZLEVBQUUsSUFBSTtJQUNsQixTQUFTLEVBQUUsSUFBSTtJQUNmLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQ3hDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDL0IsZUFBZTtRQUNmLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakQ7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVB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