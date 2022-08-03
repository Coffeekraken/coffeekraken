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
const s_request_1 = __importDefault(require("@coffeekraken/s-request"));
const lit_1 = require("lit");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const s_filtrable_input_component_1 = require("@coffeekraken/s-filtrable-input-component");
const xmlToJson_1 = __importDefault(require("@coffeekraken/sugar/shared/convert/xmlToJson"));
const localStorage_1 = __importDefault(require("@coffeekraken/sugar/js/storage/localStorage"));
require("../../../../../src/js/partials/SDashboardPagesComponent.css");
(0, s_filtrable_input_component_1.define)({
    value: 'loc',
    label: (item) => {
        return `${item.type} ${item.namespace}`;
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
                const request = new s_request_1.default({
                    url: '/sitemap.xml',
                });
                const result = yield request.send();
                const json = (0, xmlToJson_1.default)(result.data);
                localStorage_1.default.setItem('s-dashboard-pages', json.urlset.url);
                return json.urlset.url;
            });
        }
        let items;
        const cached = yield localStorage_1.default.getItem('s-dashboard-pages');
        if (!cached) {
            items = yield fetchItems();
        }
        else {
            fetchItems();
            items = cached;
        }
        return items;
    }),
}, 's-dashboard-pages-internal');
class SDashboardPages extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }
    firstUpdated() {
        this._$input = this.querySelector('input');
        // __hotkey('ctrl+p').on('press', () => {
        //     __cursorToEnd(this._$input);
        // });
        this.addEventListener('selectItem', (e) => {
            const { item, $elm } = e.detail;
            console.log('SEleected', item, $elm);
            // if (item.type === 'category' || item.type === 'package') {
            //     this._$input.value = item.value + ' ';
            //     __cursorToEnd(this._$input);
            // } else {
            //     if (item.menu?.slug) {
            //         if (item.package.name !== window.packageJson.name) {
            //             $elm.dispatchEvent(
            //                 new CustomEvent('location.href', {
            //                     detail: `/package/${item.package.name}${item.menu.slug}`,
            //                     bubbles: true,
            //                 }),
            //             );
            //             // document.location.href = `/${item.package.name}${item.menu.slug}`;
            //         } else {
            //             $elm.dispatchEvent(
            //                 new CustomEvent('location.href', {
            //                     detail: `${item.menu.slug}`,
            //                     bubbles: true,
            //                 }),
            //             );
            //             // document.location.href = item.menu.slug;
            //         }
            //     } else {
            //         $elm.dispatchEvent(
            //             new CustomEvent('location.href', {
            //                 detail: `/api/${item.fullNamespace}`,
            //                 bubbles: true,
            //             }),
            //         );
            //         // document.location.href = `/api/${item.fullNamespace}`;
            //     }
            //     this._$input.value = '';
            //     this._$input.blur();
            // }
        });
    }
    render() {
        return (0, lit_1.html) `
            <div class="s-dashboard-pages s-width:100">
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
exports.default = SDashboardPages;
function define(props = {}, tagName = 's-dashboard-pages') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardPages);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCx3RUFBaUQ7QUFDakQsNkJBQTJCO0FBQzNCLG9GQUE0RDtBQUU1RCwyRkFBOEY7QUFLOUYsNkZBQXVFO0FBQ3ZFLCtGQUF5RTtBQUV6RSx1RUFBcUU7QUFFckUsSUFBQSxvQ0FBdUIsRUFDbkI7SUFDSSxLQUFLLEVBQUUsS0FBSztJQUNaLEtBQUssRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ1osT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFDRCxhQUFhLEVBQUUsSUFBSTtJQUNuQixTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO0lBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRTs7UUFDNUMsSUFBSSxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFBOzswQkFFRCxJQUFJLENBQUMsS0FBSztnQkFDUixDQUFDLENBQUMsSUFBSSxDQUFBOzs7Ozs0Q0FLVSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7OytCQUduQztnQkFDSCxDQUFDLENBQUMsRUFBRTs7OEJBRUYsVUFBVSxDQUFDLE1BQUEsSUFBSSxDQUFDLEdBQUcsbUNBQUksRUFBRSxDQUFDOzs7aUJBR3ZDLENBQUM7U0FDTDtJQUNMLENBQUM7SUFDRCxLQUFLLEVBQUUsQ0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7UUFDdkIsU0FBZSxVQUFVOztnQkFDckIsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVSxDQUFDO29CQUMzQixHQUFHLEVBQUUsY0FBYztpQkFDdEIsQ0FBQyxDQUFDO2dCQUNILE1BQU0s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