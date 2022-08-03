"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
class CKDocSubNav extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._$items = [];
        document.addEventListener("s-page-transition.end", (e) => {
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
                this.classList.remove("active");
                return;
            }
            this._$items = Array.from($source.querySelectorAll("section.docblock.first [id]:not(code [id]):not(template [id]):not(.preview-html [id]), h4#doc-api")).filter(($item) => {
                if (!$item.id)
                    return false;
                if ($item.innerText.match(/@/))
                    return false;
                switch ($item.tagName.toLowerCase()) {
                    // case 'h1':
                    case "h2":
                    case "h3":
                    case "h4":
                    case "h5":
                    case "p":
                        // case 'h6':
                        return true;
                        break;
                }
                return false;
            });
            if (this._$items.length) {
                this.classList.add("active");
            }
            else {
                this.classList.remove("active");
            }
            this.requestUpdate();
        });
    }
    render() {
        return (0, lit_1.html) `
      <div class="ck-doc-sub-nav">
        <div class="__list">
          ${this._$items.map(($item, i) => (0, lit_1.html) `
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
    (0, decorators_js_1.property)({ type: String })
], CKDocSubNav.prototype, "source", void 0);
exports.default = CKDocSubNav;
function define(props = {}, tagName = "ck-doc-sub-nav") {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, CKDocSubNav);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLHFEQUE2QztBQUU3QyxNQUFxQixXQUFZLFNBQVEseUJBQWU7SUFJdEQ7UUFDRSxLQUFLLENBQUM7WUFDSixZQUFZLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLEtBQUs7YUFDakI7U0FDRixDQUFDLENBQUM7UUFXTCxZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQVQxQixRQUFRLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN2RCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFJSyxZQUFZOztZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBRUssU0FBUzs7WUFDYixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3ZCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDdEIsbUdBQW1HLENBQ3BHLENBQ0YsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUFFLE9BQU8sS0FBSyxDQUFDO2dCQUM1QixJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDN0MsUUFBUSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNuQyxhQUFhO29CQUNiLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssSUFBSSxDQUFDO29CQUNWLEtBQUssR0FBRzt3QkFDTixhQUFhO3dCQUNiLE9BQU8sSUFBSSxDQUFDO3dCQUNaLE1BQU07aUJBQ1Q7Z0JBQ0QsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDO1lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtJQUVELE1BQU07UUFDSixPQUFPLElBQUEsVUFBSSxFQUFBOzs7WUFHSCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDaEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTtpRUFDbUMsS0FBSyxDQUFDLEVBQUU7OzJDQUU5QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDUCxRQUFRLEVBQUU7YUFDVixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OzJDQUdkLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFOzs7eUJBR3hDLENBQ2Q7OztLQUdOLENBQUM7SUFDSixDQUFDO0NBQ0Y7QUFwRkM7SUFEQyxJQUFBLHdCQUFRLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7MkNBQ3BCO0FBRlQsOEJBc0ZDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxnQkFBZ0I7SUFDaEUseUJBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFIRCx3QkFHQyJ9