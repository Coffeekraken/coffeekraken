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
        return (0, lit_1.html) `
            <div class="ck-doc-sub-nav" s-deps css="ckDocSubNav">
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
function define(props = {}, tagName = 'ck-doc-sub-nav') {
    s_lit_component_1.default.define(tagName, CKDocSubNav, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLHFEQUE2QztBQUU3QyxNQUFxQixXQUFZLFNBQVEseUJBQWU7SUFJcEQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFXUCxZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQVR4QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNyRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFJSyxZQUFZOztZQUNkLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO0tBQUE7SUFFSyxTQUFTOztZQUNYLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FDckIsT0FBTyxDQUFDLGdCQUFnQixDQUNwQixtR0FBbUcsQ0FDdEcsQ0FDSixDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzdDLFFBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDakMsYUFBYTtvQkFDYixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLElBQUksQ0FBQztvQkFDVixLQUFLLEdBQUc7d0JBQ0osYUFBYTt3QkFDYixPQUFPLElBQUksQ0FBQzt3QkFDWixNQUFNO2lCQUNiO2dCQUNELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbkM7WUFFRCxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7OztzQkFHRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FDZCxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBO2lFQUN1QixLQUFLLENBQUMsRUFBRTs7MkNBRTlCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNMLFFBQVEsRUFBRTthQUNWLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7MkNBR2hCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFOzs7eUJBR3hDLENBQ0o7OztTQUdaLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFwRkc7SUFEQyxJQUFBLHdCQUFRLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7MkNBQ3BCO0FBRlgsOEJBc0ZDO0FBRUQsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxnQkFBZ0I7SUFDOUQseUJBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRkQsd0JBRUMifQ==