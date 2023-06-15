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
import { __xmlToJson } from '@coffeekraken/sugar/convert';
import { html } from 'lit';
import _SDashboardComponentWidgetInterface from '../../interface/SDashboardComponentWidgetInterface';
import __SDashboardPagesComponentAttrsInterface from './interface/SDashboardPagesComponentAttrsInterface';
import '../../../../../../src/js/partials/s-dashboard-pages-component/s-dashboard-pages-component.css';
__sFiltrableInputDefine({
    inline: true,
    value: 'loc',
    label: (item) => {
        return `${item.type} ${item.namespace}`;
    },
    classes: {
        container: 'ck-panel',
        list: 'ck-list',
        listItem: 'ck-list__item',
    },
    closeOnSelect: true,
    filtrable: ['title', 'loc'],
    templates: ({ type, item, html, unsafeHTML }) => {
        var _a;
        if (type === 'item') {
            return html `
                    <div class="s-dashboard-pages_list-item">
                        ${item.title
                ? html `
                                  <div class="s-mbe:10">
                                      <h4
                                          class="s-dashboard-pages_list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                      >
                                          ${unsafeHTML(item.title)}
                                      </h4>
                                  </div>
                              `
                : ''}
                        <p class="_description s-typo:p s-truncate:1">
                            ${unsafeHTML((_a = item.loc) !== null && _a !== void 0 ? _a : '')}
                        </p>
                    </div>
                `;
        }
    },
    items: ({ value }) => __awaiter(void 0, void 0, void 0, function* () {
        function fetchItems() {
            return __awaiter(this, void 0, void 0, function* () {
                const request = new __SRequest({
                    url: '/sitemap.xml',
                });
                const result = yield request.send();
                const json = __xmlToJson(result.data);
                // __localStorage.setItem('s-dashboard-pages', json.urlset.url);
                return json.urlset.url;
            });
        }
        let items;
        // const cached = await __localStorage.getItem('s-dashboard-pages');
        // console.log('CACH', cached);
        // if (!cached) {
        items = yield fetchItems();
        // } else {
        //     fetchItems();
        //     items = cached;
        // }
        return items;
    }),
}, 's-dashboard-pages-internal');
export const events = ['s-dashboard-pages.selectItem'];
export default class SDashboardPages extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, _SDashboardComponentWidgetInterface);
    }
    /**
     * @name            document
     * @type            Document
     * @get
     *
     * Access the document that the dashboard is using.
     * If in an iframe, take the parent document, otherwise, the document itself
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get document() {
        var _a, _b;
        return (_b = (_a = window.parent) === null || _a === void 0 ? void 0 : _a.document) !== null && _b !== void 0 ? _b : document;
    }
    constructor() {
        super({
            shadowDom: false,
            interface: __SDashboardPagesComponentAttrsInterface,
        });
    }
    firstUpdated() {
        this._$input = this.querySelector('input');
        this._$filtrableInput = this.querySelector('s-dashboard-pages-internal');
        this.addEventListener('s-filtrable-input.items', (e) => {
            this.requestUpdate();
        });
        // __hotkey('ctrl+p').on('press', () => {
        //     __cursorToEnd(this._$input);
        // });
        document.addEventListener('dashboard.changePage', () => {
            this._$input.focus();
            setTimeout(() => {
                this._$input.select();
            }, 200);
        });
        this.addEventListener('s-filtrable-input.select', (e) => {
            const { item, $elm } = e.detail;
            this.dispatchEvent(new CustomEvent('s-dashboard-pages.selectItem', {
                bubbles: true,
                detail: {
                    item,
                    $elm,
                },
            }));
            if (this.settings.onSelect) {
                this.settings.onSelect({ item, $elm });
            }
            else {
                this.document.location.href = item.loc;
            }
        });
        if (document.isChangePageWanted) {
            setTimeout(() => {
                this._$input.focus();
                setTimeout(() => {
                    this._$input.select();
                }, 200);
            });
        }
    }
    render() {
        var _a, _b, _c;
        return html `
            <div class="s-dashboard-pages s-width:100">
                <h2 class="s-typo:h6 s-mbe:20">
                    Pages
                    <span class="ck-count"
                        >${(_c = (_b = (_a = this._$filtrableInput) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.items) === null || _c === void 0 ? void 0 : _c.length}</span
                    >
                </h2>

                <s-dashboard-pages-internal class="s-width:100">
                    <input
                        placeholder="Change page..."
                        type="text"
                        name="page"
                        class="s-input s-color:accent s-width:100"
                    />
                </s-dashboard-pages-internal>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-dashboard-pages') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardPages);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUYsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxtQ0FBbUMsTUFBTSxvREFBb0QsQ0FBQztBQUVyRyxPQUFPLHdDQUF3QyxNQUFNLG9EQUFvRCxDQUFDO0FBRTFHLE9BQU8sK0ZBQStGLENBQUM7QUFFdkcsdUJBQXVCLENBQ25CO0lBQ0ksTUFBTSxFQUFFLElBQUk7SUFDWixLQUFLLEVBQUUsS0FBSztJQUNaLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDRCxPQUFPLEVBQUU7UUFDTCxTQUFTLEVBQUUsVUFBVTtRQUNyQixJQUFJLEVBQUUsU0FBUztRQUNmLFFBQVEsRUFBRSxlQUFlO0tBQzVCO0lBQ0QsYUFBYSxFQUFFLElBQUk7SUFDbkIsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztJQUMzQixTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUU7O1FBQzVDLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQTs7MEJBRUQsSUFBSSxDQUFDLEtBQUs7Z0JBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozs7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