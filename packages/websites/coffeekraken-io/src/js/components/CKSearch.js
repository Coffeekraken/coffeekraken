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
                searchItems = Object.values(result.data.map);
                window.localStorage.setItem('ck-search-items', JSON.stringify(searchItems));
            });
        }
        const cached = window.localStorage.getItem('ck-search-items');
        if (!cached) {
            const items = yield fetchItems();
            return items;
        }
        // update items
        fetchItems();
        // return cached
        return JSON.parse(cached);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0tTZWFyY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDS1NlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7O0FBRWQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFTOUYsSUFBSSxXQUFXLENBQUM7QUFDaEIsdUJBQXVCLENBQ25CO0lBQ0ksS0FBSyxFQUFFLE1BQU07SUFDYixLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDeEMsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFOztRQUM1QyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUE7Ozs7OztrQ0FNTyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O2tDQUdyQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDZixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOztnRUFFVSxRQUFRLENBQUMsSUFBSTs7cUNBRXhDLENBQ0o7Ozt1Q0FHTSxVQUFVLENBQUMsTUFBQSxJQUFJLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUM7Ozs7OzhCQUtwQyxVQUFVLENBQUMsTUFBQSxJQUFJLENBQUMsU0FBUyxtQ0FBSSxFQUFFLENBQUM7Ozs4QkFHaEMsVUFBVSxDQUFDLE1BQUEsSUFBSSxDQUFDLFdBQVcsbUNBQUksRUFBRSxDQUFDOzs7aUJBRy9DLENBQUM7U0FDTDtJQUNMLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7UUFDdkIsU0FBZSxVQUFVOztnQkFDckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUM7b0JBQzNCLEdBQUcsRUFBRSxjQUFjO2lCQUN0QixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3BDLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdDLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUN2QixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FDOUIsQ0FBQztZQUNOLENBQUM7U0FBQTtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE1BQU0sS0FBSyxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUM7WUFDakMsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxlQUFlO1FBQ2YsVUFBVSxFQUFFLENBQUM7UUFFYixnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQTtDQUNKLEVBQ0QsaUJBQWlCLENBQ3BCLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxlQUFlO0lBQ2pEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7U0FjVixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsV0FBVztJQUN6RCxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUM3QyxDQUFDIn0=