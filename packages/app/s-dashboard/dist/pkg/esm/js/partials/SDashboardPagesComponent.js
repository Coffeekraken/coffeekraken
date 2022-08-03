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
import __xmlToJson from '@coffeekraken/sugar/shared/convert/xmlToJson';
import __localStorage from '@coffeekraken/sugar/js/storage/localStorage';
import '../../../../../src/js/partials/SDashboardPagesComponent.css';
__sFiltrableInputDefine({
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
                const request = new __SRequest({
                    url: '/sitemap.xml',
                });
                const result = yield request.send();
                const json = __xmlToJson(result.data);
                __localStorage.setItem('s-dashboard-pages', json.urlset.url);
                return json.urlset.url;
            });
        }
        let items;
        const cached = yield __localStorage.getItem('s-dashboard-pages');
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
export default class SDashboardPages extends __SLitComponent {
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
        return html `
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
export function define(props = {}, tagName = 's-dashboard-pages') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SDashboardPages);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBRTVELE9BQU8sRUFBRSxNQUFNLElBQUksdUJBQXVCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUs5RixPQUFPLFdBQVcsTUFBTSw4Q0FBOEMsQ0FBQztBQUN2RSxPQUFPLGNBQWMsTUFBTSw2Q0FBNkMsQ0FBQztBQUV6RSxPQUFPLDZEQUE2RCxDQUFDO0FBRXJFLHVCQUF1QixDQUNuQjtJQUNJLEtBQUssRUFBRSxLQUFLO0lBQ1osS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDWixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNELGFBQWEsRUFBRSxJQUFJO0lBQ25CLFNBQVMsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDM0IsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFOztRQUM1QyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUE7OzBCQUVELElBQUksQ0FBQyxLQUFLO2dCQUNSLENBQUMsQ0FBQyxJQUFJLENBQUE7Ozs7OzRDQUtVLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7K0JBR25DO2dCQUNILENBQUMsQ0FBQyxFQUFFOzs4QkFFRixVQUFVLENBQUMsTUFBQSxJQUFJLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUM7OztpQkFHdkMsQ0FBQztTQUNMO0lBQ0wsQ0FBQztJQUNELEtBQUssRUFBRSxDQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtRQUN2QixTQUFlLFVBQVU7O2dCQUNyQixNQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQztvQkFDM0IsR0FBRyxFQUFFLGNBQWM7aUJBQ3RCLENBQUMsQ0FBQztnQkFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdEMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU3RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQzNCLENBQUM7U0FBQTtRQUVELElBQUksS0FBSyxDQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULEtBQUssR0FBRyxNQUFNLFVBQVUsRUFBRSxDQUFDO1NBQzlCO2FBQU07WUFDSCxVQUFVLEVBQUUsQ0FBQztZQUNiLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDbEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUE7Q0FDSixFQUNELDRCQUE0QixDQUMvQixDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFnQixTQUFRLGVBQWU7SUFDeEQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQyx5Q0FBeUM7UUFDekMsbUNBQW1DO1FBQ25DLE1BQU07UUFFTixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBRWhDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVyQyw2REFBNkQ7WUFDN0QsNkNBQTZDO1lBQzdDLG1DQUFtQztZQUNuQyxXQUFXO1lBQ1gsNkJBQTZCO1lBQzdCLCtEQUErRDtZQUMvRCxrQ0FBa0M7WUFDbEMscURBQXFEO1lBQ3JELGdGQUFnRjtZQUNoRixxQ0FBcUM7WUFDckMsc0JBQXNCO1lBQ3RCLGlCQUFpQjtZQUNqQixvRkFBb0Y7WUFDcEYsbUJBQW1CO1lBQ25CLGtDQUFrQztZQUNsQyxxREFBcUQ7WUFDckQsbURBQW1EO1lBQ25ELHFDQUFxQztZQUNyQyxzQkFBc0I7WUFDdEIsaUJBQWlCO1lBQ2pCLDBEQUEwRDtZQUMxRCxZQUFZO1lBQ1osZUFBZTtZQUNmLDhCQUE4QjtZQUM5QixpREFBaUQ7WUFDakQsd0RBQXdEO1lBQ3hELGlDQUFpQztZQUNqQyxrQkFBa0I7WUFDbEIsYUFBYTtZQUNiLG9FQUFvRTtZQUNwRSxRQUFRO1lBRVIsK0JBQStCO1lBQy9CLDJCQUEyQjtZQUMzQixJQUFJO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7Ozs7Ozs7OztTQVdWLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxtQkFBbUI7SUFDakUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDcEQsQ0FBQyJ9