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
                    <div class="s-dashboard-pages__list-item">
                        ${item.title
                ? html `
                                  <div class="s-mbe:10">
                                      <h4
                                          class="s-dashboard-pages__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                      >
                                          ${unsafeHTML(item.title)}
                                      </h4>
                                  </div>
                              `
                : ''}
                        <p class="__description s-typo:p s-truncate:1">
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
    constructor() {
        super({
            shadowDom: false,
            interface: __SDashboardPagesComponentAttrsInterface,
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsTUFBTSxJQUFJLHVCQUF1QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUYsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzFELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyx3Q0FBd0MsTUFBTSxvREFBb0QsQ0FBQztBQUUxRyxPQUFPLCtGQUErRixDQUFDO0FBRXZHLHVCQUF1QixDQUNuQjtJQUNJLE1BQU0sRUFBRSxJQUFJO0lBQ1osS0FBSyxFQUFFLEtBQUs7SUFDWixLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNaLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLFVBQVU7UUFDckIsSUFBSSxFQUFFLFNBQVM7UUFDZixRQUFRLEVBQUUsZUFBZTtLQUM1QjtJQUNELGFBQWEsRUFBRSxJQUFJO0lBQ25CLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFOztRQUM1QyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUE7OzBCQUVELElBQUksQ0FBQyxLQUFLO2dCQUNSLENBQUMsQ0FBQyxJQUFJLENBQUE7Ozs7OzRDQUtVLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFD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