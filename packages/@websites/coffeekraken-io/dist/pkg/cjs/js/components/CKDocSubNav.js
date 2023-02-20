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
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
class SCKSubNavPropsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            source: {
                type: 'String',
            },
        };
    }
}
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
    static get properties() {
        return s_lit_component_1.default.propertiesFromInterface({}, SCKSubNavPropsInterface);
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
        return (0, lit_1.html) `
            <div class="ck-doc-sub-nav" s-deps css="ckDocSubNav">
                <div class="_list">
                    ${this._$items.map(($item, i) => (0, lit_1.html) `
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
exports.default = CKDocSubNav;
function define(props = {}, tagName = 'ck-doc-sub-nav') {
    s_lit_component_1.default.define(tagName, CKDocSubNav, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUUzQixNQUFNLHVCQUF3QixTQUFRLHFCQUFZO0lBQzlDLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsTUFBcUIsV0FBWSxTQUFRLHlCQUFlO0lBUXBEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsWUFBWSxFQUFFO2dCQUNWLFNBQVMsRUFBRSxLQUFLO2FBQ25CO1NBQ0osQ0FBQyxDQUFDO1FBV1AsWUFBTyxHQUFrQixFQUFFLENBQUM7UUFUeEIsUUFBUSxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLHVCQUF1QixDQUMxQixDQUFDO0lBQ04sQ0FBQztJQW9CSyxZQUFZOztZQUNkLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO0tBQUE7SUFFSyxTQUFTOzs7WUFDWCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQUEsTUFBQSxLQUFLLENBQUMsSUFBSSxDQUNyQixPQUFPLENBQUMsZ0JBQWdCLENBQ3BCLDRFQUE0RSxDQUMvRSxDQUNKLDBDQUFFLE1BQU0sbURBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDNUIsSUFBSSxNQUFBLEtBQUssQ0FBQyxTQUFTLDBDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQzlDLFFBQVEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDakMsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxJQUFJLENBQUM7b0JBQ1YsS0FBSyxHQUFHO3dCQUNKLGFBQWE7d0JBQ2IsT0FBTyxJQUFJLENBQUM7d0JBQ1osTUFBTTtpQkFDYjtnQkFDRCxPQUFPLEtBQUssQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztLQUN4QjtJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBOzs7c0JBR0csSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2QsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTtnRUFFVixLQUFLLENBQUMsRUFDVixvQ0FBb0MsS0FBSyxDQUFDLEVBQUU7OzJDQUU3QixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDTCxRQUFRLEVBQUU7YUFDVixRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQzs7OzJDQUdoQixLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTs7O3lCQUd4QyxDQUNKOzs7U0FHWixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUZELDhCQTRGQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsZ0JBQWdCO0lBQzlELHlCQUFlLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUZELHdCQUVDIn0=