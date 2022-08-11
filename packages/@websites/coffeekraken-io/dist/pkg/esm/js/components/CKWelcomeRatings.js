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
import __pickRandom from "@coffeekraken/sugar/shared/array/pickRandom";
import __SLitComponent from "@coffeekraken/s-lit-component";
import { html } from "lit";
import __ratingsApi from "../generic/ratingsApi";
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
                      <span class="s-loader:square-dots s-color:accent"></span>
                    `}
              </div>
              <div class="s-tooltip:interactive:${i < 2 ? "left" : "right"}">
                <p class="s-mbe:20 s-text:right">${rating.name}</p>
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
export function define(props = {}, tagName = "ck-welcome-ratings") {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKWelcomeRatings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLFlBQVksTUFBTSw2Q0FBNkMsQ0FBQztBQUV2RSxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQVEzRDtRQUNFLEtBQUssQ0FBQztZQUNKLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztRQVBMLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFRaEIsQ0FBQztJQWJELE1BQU0sS0FBSyxVQUFVO1FBQ25CLE9BQU8sZUFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQWFLLEtBQUs7O1lBQ1QsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztnQkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU87WUFDTCxJQUFJO1lBQ0osbUJBQW1CO1lBQ25CLGlCQUFpQjtZQUNqQixLQUFLO1lBQ0wsSUFBSTtZQUNKLG1CQUFtQjtZQUNuQixpQkFBaUI7WUFDakIsS0FBSztZQUNMLElBQUk7WUFDSixtQkFBbUI7WUFDbkIsaUJBQWlCO1lBQ2pCLEtBQUs7YUFDTixDQUFDO1NBQ0g7UUFFRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUE7UUFDUCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxHQUFHLENBQzVCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzttQ0FFUSxDQUFDLEdBQUcsQ0FBQzs7a0JBRXRCLE1BQU0sQ0FBQyxVQUFVO1lBQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUEsY0FBYyxNQUFNLENBQUMsVUFBVSxPQUFPO1lBQzVDLENBQUMsQ0FBQyxJQUFJLENBQUE7O3FCQUVIOztrREFFNkIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPO21EQUN2QixNQUFNLENBQUMsSUFBSTs7MkJBRW5DLE1BQU0sQ0FBQyxNQUFNOzs7Ozs7O1NBTy9CLENBQ0Y7S0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFhLEVBQUUsRUFBRSxPQUFPLEdBQUcsb0JBQW9CO0lBQ3BFLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDbkQsQ0FBQyJ9