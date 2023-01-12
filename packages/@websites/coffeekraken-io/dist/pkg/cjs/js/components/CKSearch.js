"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const cursorToEnd_1 = __importDefault(require("@coffeekraken/sugar/js/dom/input/cursorToEnd"));
const keyboard_1 = require("@coffeekraken/sugar/keyboard");
const lit_1 = require("lit");
(0, s_filtrable_input_component_1.define)({
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
                        <i class="s-platform:${platform.name}"></i>
                      `)}
                    &nbsp;
                    <span class="s-badge s-color:main"
                      >${unsafeHTML((_e = (_d = (_c = item.type) === null || _c === void 0 ? void 0 : _c.types) === null || _d === void 0 ? void 0 : _d[0].type) !== null && _e !== void 0 ? _e : '')}</span
                    >
                  </div>
                </div>
                <p class="_namespace s-opacity:50 s-font:20 s-mbe:20">
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
                const request = new s_request_1.default({
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
class CKSearch extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
    }
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface();
    }
    firstUpdated() {
        this.$input = this.querySelector('input');
        // if (document.location.hash) {
        //     this._handleAnchor(document.location.hash.replace('#', ''));
        // }
        (0, keyboard_1.__hotkey)('ctrl+f').on('press', () => {
            (0, cursorToEnd_1.default)(this.$input);
        });
        this.addEventListener('s-filtrable-input.select', (e) => {
            var _a;
            const { item, $elm } = e.detail;
            if (item.type === 'category' || item.type === 'package') {
                this.$input.value = item.value + ' ';
                (0, cursorToEnd_1.default)(this.$input);
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
        return (0, lit_1.html) `
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
exports.default = CKSearch;
function define(props = {}, tagName = 'ck-search') {
    s_lit_component_1.default.define(tagName, CKSearch, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCwyRkFBOEY7QUFDOUYsb0ZBQTREO0FBQzVELHdFQUFpRDtBQUNqRCwrRkFBeUU7QUFDekUsMkRBQXdEO0FBQ3hELDZCQUEyQjtBQUUzQixJQUFBLG9DQUF1QixFQUNyQjtJQUNFLEtBQUssRUFBRSxNQUFNO0lBQ2IsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUNELGFBQWEsRUFBRSxJQUFJO0lBQ25CLGFBQWEsRUFBRSxLQUFLO0lBQ3BCLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFNBQVMsRUFBRSxLQUFLO0lBQ2hCLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO0lBQ3hDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDL0IsZUFBZTtRQUNmLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakQ7UUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDN0IsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN2QztRQUVELGVBQWU7UUFDZixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDaEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FB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