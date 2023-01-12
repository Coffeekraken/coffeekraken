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
import { __pickRandom } from '@coffeekraken/sugar/array';
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
        return __SLitComponent.propertiesFromInterface();
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
                        <div class="_rating-${i + 1}">
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFekQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLFlBQVksTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLGVBQWU7SUFRekQ7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUFQUCxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBUWhCLENBQUM7SUFiRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFhSyxLQUFLOztZQUNQLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNmLE9BQU87WUFDSCxJQUFJO1lBQ0osbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixLQUFLO1lBQ0wsSUFBSTtZQUNKLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsS0FBSztZQUNMLElBQUk7WUFDSixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLEtBQUs7YUFDUixDQUFDO1NBQ0w7UUFFRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7Y0FDTCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQzFCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzs4Q0FFVyxDQUFDLEdBQUcsQ0FBQzs7a0NBRWpCLE1BQU0sQ0FBQyxVQUFVO1lBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQSxjQUFjLE1BQU0sQ0FBQyxVQUFVLE9BQU87WUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQTs7Ozt1Q0FJSDs7OytEQUd3QixDQUFDLEdBQUcsQ0FBQztZQUNoQyxDQUFDLENBQUMsTUFBTTtZQUNSLENBQUMsQ0FBQyxPQUFPOzs7c0NBR1AsTUFBTSxDQUFDLElBQUk7Ozs2Q0FHSixNQUFNLENBQUMsTUFBTTs7Ozs7OztpQkFPekMsQ0FDSjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLFVBQVUsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxvQkFBb0I7SUFDbEUsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNyRCxDQUFDIn0=