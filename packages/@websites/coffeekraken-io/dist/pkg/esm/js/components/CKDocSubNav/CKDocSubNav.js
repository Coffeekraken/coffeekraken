// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
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
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            this._grabItem();
        });
    }
    _grabItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const $source = document.querySelector(this.source);
            if (!$source) {
                this.classList.remove('active');
                return;
            }
            this._$items = Array.from($source.querySelectorAll('section.docblock.first [id]:not(code [id]):not(template [id]):not(.preview-html [id]), h4#doc-api')).filter(($item) => {
                if (!$item.id)
                    return false;
                if ($item.innerText.match(/@/))
                    return false;
                switch ($item.tagName.toLowerCase()) {
                    // case 'h1':
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
        <div class="__list">
          ${this._$items.map(($item, i) => html `
                            <s-scroll class="__list-item" to="#${$item.id}">
                                    <span class="s-tc:accent class="__index"
                                        >${(i + 1)
            .toString()
            .padStart(2, 0)}</span
                                    >.
                                    <span class="s-typo:bold __title"
                                        >${$item.innerText.trim()}</span
                                    >
                            </s-scroll>
                        `)}
        </div>
      </div>
    `;
    }
}
__decorate([
    property({ type: String })
], CKDocSubNav.prototype, "source", void 0);
export function define(props = {}, tagName = 'ck-doc-sub-nav') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDocSubNav);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxNQUFNLENBQUMsT0FBTyxPQUFPLFdBQVksU0FBUSxlQUFlO0lBSXREO1FBQ0UsS0FBSyxDQUFDO1lBQ0osWUFBWSxFQUFFO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBV0wsWUFBTyxHQUFrQixFQUFFLENBQUM7UUFUMUIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBSUssWUFBWTs7WUFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVLLFNBQVM7O1lBQ2IsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDWixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEMsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUN2QixPQUFPLENBQUMsZ0JBQWdCLENBQ3RCLG1HQUFtRyxDQUNwRyxDQUNGLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzdDLFFBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDbkMsYUFBYTtvQkFDYixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ04sYUFBYTt3QkFDYixPQUFPLElBQUksQ0FBQzt3QkFDWixNQUFNO2lCQUNUO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQztZQUVELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN2QixDQUFDO0tBQUE7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUE7OztZQUdILElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNoQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTtpRUFDbUMsS0FBSyxDQUFDLEVBQUU7OzJDQUU5QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDUCxRQUFRLEVBQUU7YUFDVixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OzJDQUdkLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFOzs7eUJBR3hDLENBQ2Q7OztLQUdOLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFwRkM7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7MkNBQ3BCO0FBc0ZULE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLGdCQUFnQjtJQUNoRSxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM5QyxDQUFDIn0=