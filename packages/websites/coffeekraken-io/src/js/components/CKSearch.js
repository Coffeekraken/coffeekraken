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
let searchItems;
__sFiltrableInputDefine({
    value: 'name',
    label: (item) => {
        return `${item.type} ${item.namespace}`;
    },
    filtrable: ['namespace', 'name', 'type'],
    templates: ({ type, item, html, unsafeHTML }) => {
        var _a, _b, _c;
        if (type === 'item') {
            return html `
                    <div class="__item">
                        <div class="s-flex s-mbe:10">
                            <h4
                                class="__title s-typo:bold s-tc:accent s-flex-item:grow"
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
                                    >${unsafeHTML((_a = item.type) !== null && _a !== void 0 ? _a : '')}</span
                                >
                            </div>
                        </div>
                        <p class="__namespace s-opacity:50 s-font:20 s-mbe:20">
                            ${unsafeHTML((_b = item.namespace) !== null && _b !== void 0 ? _b : '')}
                        </p>
                        <p class="__description s-typo:p s-truncate:2">
                            ${unsafeHTML((_c = item.description) !== null && _c !== void 0 ? _c : '')}
                        </p>
                    </div>
                `;
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
        const cached = window.localStorage.getItem('ck-search-items');
        if (!cached) {
            const items = yield fetchItems();
            return items;
        }
        else {
            fetchItems();
            const items = JSON.parse(cached);
            return items;
        }
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
        this.addEventListener('select', (e) => {
            var _a;
            const item = e.detail;
            if ((_a = item.menu) === null || _a === void 0 ? void 0 : _a.slug) {
                if (item.package !== window.packageJson.name) {
                    document.location.href = `${item.package}${item.menu.slug}`;
                }
                else {
                    document.location.href = item.menu.slug;
                }
            }
            else {
                document.location.href = `/api/${item.fullNamespace}`;
            }
        });
    }
    render() {
        return html `
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
export function define(props = {}, tagName = 'ck-search') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKSearch);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tTZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDS1NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFJOUYsSUFBSSxXQUFXLENBQUM7QUFDaEIsdUJBQXVCLENBQ25CO0lBQ0ksS0FBSyxFQUFFLE1BQU07SUFDYixLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDeEMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFOztRQUM1QyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUE7Ozs7OztrQ0FNTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O2tDQUdyQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDZixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOztnRUFFVSxRQUFRLENBQUMsSUFBSTs7cUNBRXhDLENBQ0o7Ozt1Q0FHTSxVQUFVLENBQUMsTUFBQSxJQUFJLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUM7Ozs7OzhCQUtwQyxVQUFVLENBQUMsTUFBQSxJQUFJLENBQUMsU0FBUyxtQ0FBSSxFQUFFLENBQUM7Ozs4QkFHaEMsVUFBVSxD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