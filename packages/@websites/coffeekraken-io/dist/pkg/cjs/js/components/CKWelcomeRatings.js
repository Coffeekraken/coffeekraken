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
const array_1 = require("@coffeekraken/sugar/array");
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
const ratingsApi_1 = __importDefault(require("../generic/ratingsApi"));
class CKWelcomeRatings extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._loaded = false;
    }
    static get properties() {
        return s_lit_component_1.default.createProperties();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            ratingsApi_1.default.read().then((ratings) => {
                this._ratings = ratings;
                this._loaded = true;
                this.requestUpdate();
            });
        });
    }
    pickRandomRatings() {
        if (!this._loaded) {
            return [
            // {
            //     name: '...',
            //     rating: 5,
            // },
            // {
            //     name: '...',
            //     rating: 5,
            // },
            // {
            //     name: '...',
            //     rating: 5,
            // },
            ];
        }
        return (0, array_1.__pickRandom)(this._ratings, 3);
    }
    render() {
        return (0, lit_1.html) `
            ${this.pickRandomRatings().map((rating, i) => (0, lit_1.html) `
                    <a href="#ratings">
                        <div class="__rating-${i + 1}">
                            <div class="s-avatar s-font:100">
                                ${rating.pictureUrl
            ? (0, lit_1.html) ` <img src="${rating.pictureUrl}" /> `
            : (0, lit_1.html) `
                                          <span
                                              class="s-loader:square-dots s-color:accent"
                                          ></span>
                                      `}
                            </div>
                            <div
                                class="s-tooltip:interactive:${i < 2
            ? 'left'
            : 'right'}"
                            >
                                <p class="s-mbe:20 s-text:right">
                                    ${rating.name}
                                </p>
                                <s-rating
                                    value="${rating.rating}"
                                    readonly
                                    class="s-color:accent"
                                ></s-rating>
                            </div>
                        </div>
                    </a>
                `)}
        `;
    }
}
exports.default = CKWelcomeRatings;
function define(props = {}, tagName = 'ck-welcome-ratings') {
    s_lit_component_1.default.setDefaultProps(tagName, props);
    customElements.define(tagName, CKWelcomeRatings);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxxREFBeUQ7QUFFekQsb0ZBQTREO0FBQzVELDZCQUEyQjtBQUMzQix1RUFBaUQ7QUFFakQsTUFBcUIsZ0JBQWlCLFNBQVEseUJBQWU7SUFRekQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFQUCxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUWhCLENBQUM7SUFiRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBYUssS0FBSzs7WUFDUCxvQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTztZQUNILElBQUk7WUFDSixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLEtBQUs7WUFDTCxJQUFJO1lBQ0osbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixLQUFLO1lBQ0wsSUFBSTtZQUNKLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsS0FBSzthQUNSLENBQUM7U0FDTDtRQUVELE9BQU8sSUFBQSxvQkFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUEsVUFBSSxFQUFBO2NBQ0wsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsR0FBRyxDQUMxQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBOzsrQ0FFWSxDQUFDLEdBQUcsQ0FBQzs7a0NBRWxCLE1BQU0sQ0FBQyxVQUFVO1lBQ2YsQ0FBQyxDQUFDLElBQUEsVUFBSSxFQUFBLGNBQWMsTUFBTSxDQUFDLFVBQVUsT0FBTztZQUM1QyxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7Ozs7dUNBSUg7OzsrREFHd0IsQ0FBQyxHQUFHLENBQUM7WUFDaEMsQ0FBQyxDQUFDLE1BQU07WUFDUixDQUFDLENBQUMsT0FBTzs7O3NDQUdQLE1BQU0sQ0FBQyxJQUFJOzs7NkNBR0osTUFBTSxDQUFDLE1BQU07Ozs7Ozs7aUJBT3pDLENBQ0o7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBaEZELG1DQWdGQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsb0JBQW9CO0lBQ2xFLHlCQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFIRCx3QkFHQyJ9