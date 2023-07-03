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
import __SLitComponent, { html } from '@coffeekraken/s-lit-component';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export default class CkSettings extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }
    constructor() {
        super({
            shadowDom: false,
        });
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            const json = yield this.fetchMenu();
            this._packages = json.packages;
            this.requestUpdate();
        });
    }
    fetchMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('https://cdnv2.coffeekraken.io/global/ck-menu.json', {
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                referrerPolicy: 'no-referrer',
            }), json = yield response.json();
            return json;
        });
    }
    render() {
        if (!this._packages) {
            return;
        }
        const h = html `
            <div class="s-dropdown-container">
                <button>
                    <i class="s-icon:ui-menu-grid-solid"></i>
                </button>
                <div class="s-dropdown:bottom-end">
                    <ul class="_packages">
                        ${this._packages.map((pkg) => html `
                                <li class="_package">
                                    <a
                                        href="${pkg.url}"
                                        title="Coffeekraken ${pkg.title}"
                                    >
                                        <div class="_icon">
                                            ${unsafeHTML(pkg.icon)}
                                        </div>
                                        <div class="_metas">
                                            <h3 class="_title">${pkg.title}</h3>
                                            <p class="_version">
                                                ${pkg.version}
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            `)}
                    </ul>
                </div>
            </div>
        `;
        return h;
    }
}
CkSettings.state = {};
export function __define(props = {}, tagName = 'ck-menu') {
    __SLitComponent.define(tagName, CkSettings, Object.assign({ id: 'ck-menu' }, props));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBQ25ELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDckQsQ0FBQztJQU1EO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVLLEtBQUs7O1lBQ1AsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFSyxTQUFTOztZQUNYLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUNwQixtREFBbUQsRUFDbkQ7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0wsY0FBYyxFQUFFLGtCQUFrQjtpQkFDckM7Z0JBQ0QsY0FBYyxFQUFFLGFBQWE7YUFDaEMsQ0FDSixFQUNELElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqQyxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsT0FBTztTQUNWO1FBQ0QsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFBOzs7Ozs7OzBCQU9JLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUNoQixDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs7Z0RBR08sR0FBRyxDQUFDLEdBQUc7OERBQ08sR0FBRyxDQUFDLEtBQUs7Ozs4Q0FHekIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7OztpRUFHRCxHQUFHLENBQUMsS0FBSzs7a0RBRXhCLEdBQUcsQ0FBQyxPQUFPOzs7Ozs2QkFLaEMsQ0FDSjs7OztTQUloQixDQUFDO1FBRUYsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDOztBQXZFTSxnQkFBSyxHQUFHLEVBQUUsQ0FBQztBQTBFdEIsTUFBTSxVQUFVLFFBQVEsQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsU0FBUztJQUN6RCxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLGtCQUN0QyxFQUFFLEVBQUUsU0FBUyxJQUNWLEtBQUssRUFDVixDQUFDO0FBQ1AsQ0FBQyJ9