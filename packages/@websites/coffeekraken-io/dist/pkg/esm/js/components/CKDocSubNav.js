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
import __SInterface from '@coffeekraken/s-interface';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
class SCKSubNavPropsInterface extends __SInterface {
    static get _definition() {
        return {
            source: {
                type: 'String',
            },
        };
    }
}
export default class CKDocSubNav extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKSubNavPropsInterface);
    }
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._$items = [];
        document.addEventListener('s-page-transition.end', (e) => {
            this._$items = [];
            this.requestUpdate();
            setTimeout(() => {
                this._grabItem();
            });
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._grabItem();
        });
    }
    _grabItem() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const $source = document.querySelector(this.source);
            if (!$source) {
                this.classList.remove('active');
                return;
            }
            this._$items = (_b = (_a = Array.from($source.querySelectorAll('[id]:not(code [id]):not(template [id]):not(.preview-html [id]), h4#doc-api'))) === null || _a === void 0 ? void 0 : _a.filter) === null || _b === void 0 ? void 0 : _b.call(_a, ($item) => {
                var _a;
                if (!$item.id)
                    return false;
                if ((_a = $item.innerText) === null || _a === void 0 ? void 0 : _a.match(/@/))
                    return false;
                switch ($item.tagName.toLowerCase()) {
                    case 'h1':
                    case 'h2':
                    case 'h3':
                    case 'h4':
                    case 'h5':
                    case 'p':
                        // case 'h6':
                        return true;
                        break;
                }
                return false;
            });
            if (this._$items.length) {
                this.classList.add('active');
            }
            else {
                this.classList.remove('active');
            }
            this.requestUpdate();
        });
    }
    render() {
        return html `
            <div class="ck-doc-sub-nav" s-deps css="ckDocSubNav">
                <div class="_list">
                    ${this._$items.map(($item, i) => html `
                            <s-scroll class="_list-item" to="#${$item.id}" s-activate trigger="scrollspy:#${$item.id}">
                                    <span class="s-tc:accent class="_index"
                                        >${(i + 1)
            .toString()
            .padStart(2, 0)}</span
                                    >.
                                    <span class="__title s-mis:20"
                                        >${$item.innerText.trim()}</span
                                    >
                            </s-scroll>
                        `)}
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 'ck-doc-sub-nav') {
    __SLitComponent.define(tagName, CKDocSubNav, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sdUJBQXdCLFNBQVEsWUFBWTtJQUM5QyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLGVBQWU7SUFDcEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix1QkFBdUIsQ0FDMUIsQ0FBQztJQUNOLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQVdQLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBVHhCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNyQixVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUlLLFlBQVk7O1lBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQUVLLFNBQVM7OztZQUNYLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBQSxNQUFBLEtBQUssQ0FBQyxJQUFJLENBQ3JCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDcEIsNEVBQTRFLENBQy9FLENBQ0osMENBQUUsTUFBTSxtREFBRyxDQUFDLEtBQUssRUFBRSxFQUFFOztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUM1QixJQUFJLE1BQUEsS0FBSyxDQUFDLFNBQVMsMENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDOUMsUUFBUSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNqQyxLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ0osYUFBYTt3QkFDYixPQUFPLElBQUksQ0FBQzt3QkFDWixNQUFNO2lCQUNiO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkM7WUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O0tBQ3hCO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzs7c0JBR0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2QsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7Z0VBRVYsS0FBSyxDQUFDLEVBQ1Ysb0NBQW9DLEtBQUssQ0FBQyxFQUFFOzsyQ0FFN0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ0wsUUFBUSxFQUFFO2FBQ1YsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7OzsyQ0FHaEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7Ozt5QkFHeEMsQ0FDSjs7O1NBR1osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLGdCQUFnQjtJQUM5RCxlQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEQsQ0FBQyJ9