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
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, SCKSubNavPropsInterface);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRTNCLE1BQU0sdUJBQXdCLFNBQVEsWUFBWTtJQUM5QyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sQ0FBQyxPQUFPLE9BQU8sV0FBWSxTQUFRLGVBQWU7SUFRcEQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFXUCxZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQVR4QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFyQkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRix1QkFBdUIsQ0FDMUIsQ0FBQztJQUNOLENBQUM7SUFvQkssWUFBWTs7WUFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQztLQUFBO0lBRUssU0FBUzs7O1lBQ1gsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEMsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFBLE1BQUEsS0FBSyxDQUFDLElBQUksQ0FDckIsT0FBTyxDQUFDLGdCQUFnQixDQUNwQiw0RUFBNEUsQ0FDL0UsQ0FDSiwwQ0FBRSxNQUFNLG1EQUFHLENBQUMsS0FBSyxFQUFFLEVBQUU7O2dCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzVCLElBQUksTUFBQSxLQUFLLENBQUMsU0FBUywwQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUM5QyxRQUFRLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUU7b0JBQ2pDLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssR0FBRzt3QkFDSixhQUFhO3dCQUNiLE9BQU8sSUFBSSxDQUFDO3dCQUNaLE1BQU07aUJBQ2I7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDakIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNoQztpQkFBTTtnQkFDSCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQztZQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7S0FDeEI7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7OztzQkFHRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDZCxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTtnRUFFVixLQUFLLENBQUMsRUFDVixvQ0FBb0MsS0FBSyxDQUFDLEVBQUU7OzJDQUU3QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDTCxRQUFRLEVBQUU7YUFDVixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OzJDQUdoQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTs7O3lCQUd4QyxDQUNKOzs7U0FHWixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsZ0JBQWdCO0lBQzlELGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4RCxDQUFDIn0=