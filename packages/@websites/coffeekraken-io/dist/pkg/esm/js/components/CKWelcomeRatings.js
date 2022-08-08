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
import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import __ratingsApi from '../generic/ratingsApi';
export default class CKWelcomeRatings extends __SLitComponent {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this._loaded = false;
    }
    static get properties() {
        return __SLitComponent.createProperties();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            __ratingsApi.read().then((ratings) => {
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
        return __pickRandom(this._ratings, 3);
    }
    render() {
        return html `
            ${this.pickRandomRatings().map((rating, i) => html `
                    <a href="#ratings">
                        <div class="__rating-${i + 1}">
                            <div class="s-avatar s-font:100">
                                ${rating.pictureUrl
            ? html ` <img src="${rating.pictureUrl}" /> `
            : html `
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
export function define(props = {}, tagName = 'ck-welcome-ratings') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKWelcomeRatings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSw2Q0FBNkMsQ0FBQztBQUV2RSxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQVF6RDtRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQVBQLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFRaEIsQ0FBQztJQWJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDOUMsQ0FBQztJQWFLLEtBQUs7O1lBQ1AsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2YsT0FBTztZQUNILElBQUk7WUFDSixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLEtBQUs7WUFDTCxJQUFJO1lBQ0osbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixLQUFLO1lBQ0wsSUFBSTtZQUNKLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsS0FBSzthQUNSLENBQUM7U0FDTDtRQUVELE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTtjQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEdBQUcsQ0FDMUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7OytDQUVZLENBQUMsR0FBRyxDQUFDOztrQ0FFbEIsTUFBTSxDQUFDLFVBQVU7WUFDZixDQUFDLENBQUMsSUFBSSxDQUFBLGNBQWMsTUFBTSxDQUFDLFVBQVUsT0FBTztZQUM1QyxDQUFDLENBQUMsSUFBSSxDQUFBOzs7O3VDQUlIOzs7K0RBR3dCLENBQUMsR0FBRyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxNQUFNO1lBQ1IsQ0FBQyxDQUFDLE9BQU87OztzQ0FHUCxNQUFNLENBQUMsSUFBSTs7OzZDQUdKLE1BQU0sQ0FBQyxNQUFNOzs7Ozs7O2lCQU96QyxDQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQUMsUUFBYSxFQUFFLEVBQUUsT0FBTyxHQUFHLG9CQUFvQjtJQUNsRSxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3JELENBQUMifQ==