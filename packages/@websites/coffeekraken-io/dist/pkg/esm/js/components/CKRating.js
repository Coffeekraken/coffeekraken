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
import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import __ratingsApi from '../generic/ratingsApi';
export default class CKRatings extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._settings = {};
        this._ratingsApi = __ratingsApi;
        this.state = {
            already: false,
            state: 'idle',
            user: {
                email: undefined,
                name: undefined,
                pictureUrl: undefined,
            },
            rating: 5,
            comment: '',
            ratings: [],
        };
    }
    //   state = __state.define("ck-ratings", {});
    static get properties() {
        return __SLitComponent.createProperties();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
            __ratingsApi.init();
            this.state.ratings = yield __ratingsApi.read();
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // listen for rating update
            this.addEventListener('s-rating.change', (e) => {
                this.state.rating = e.detail.value;
            });
        });
    }
    _signInWithGoogle() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this._ratingsApi._signInWithGoogle();
            this.state.user = user;
            const ratingObj = yield __ratingsApi.getRatingObjForCurrentUser();
            if (ratingObj) {
                this.state.user = {
                    email: ratingObj.email,
                    name: ratingObj.name,
                    pictureUrl: ratingObj.pictureUrl,
                };
                this.state.rating = ratingObj.rating;
                this.state.comment = ratingObj.comment;
                this.state.state = 'already';
                this.state.already = true;
            }
        });
    }
    _submit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.state = 'sending';
            yield __ratingsApi.create({
                rating: this.state.rating,
                comment: this.state.comment,
            });
            this.state.state = 'success';
        });
    }
    renderRating(ratingObj) {
        return html `
      <div class="rating" s-deps css="rating" s-appear in="bottom">
        <div class="rating__comment">
          <div class="rating__header">
            <p class="s-font:bold">${ratingObj.name}</p>
            <s-rating
              class="s-color:accent s-mbe:30"
              readonly
              value="${ratingObj.rating}"
            ></s-rating>
          </div>
          <p class="s-typo:p">${ratingObj.comment}</p>
        </div>
        <div class="rating__picture">
          <div class="s-avatar s-color:accent">
            <img src="${ratingObj.pictureUrl}" />
          </div>
        </div>
      </div>
    `;
    }
    render() {
        return html `
      <div class="s-flex:align-bottom">
        <div class="s-flex-item:grow">
          <i
            @click=${() => {
            this.state.state = 'idle';
        }}
            class="s-icon:ui-tooltip s-tc:complementary s-font:80 s-mbe:30"
          ></i>
        </div>
        ${this.state.state !== 'write' && !this.state.already
            ? html `
              <div>
                <a
                  s-appear
                  in="left"
                  class="s-btn s-color:complementary"
                  @click=${(e) => {
                e.stopPropagation();
                e.preventDefault();
                this.state.state = 'write';
            }}
                >
                  <i class="s-icon:write s-mie:10"></i>
                  Write a comment!
                </a>
              </div>
            `
            : ''}
      </div>

      <h2 class="s-typo:h4 s-flex-item:grow s-mbe:30">
        We'd <span class="s-tc:accent">love</span><br />to hear
        <span class="s-tc:complementary">from you</span>!
      </h2>

      <p class="s-typo:lead s-mbe:50">
        Want to show your love to the community? Don't hesitate to let a comment
        on your experience using Coffeekraken. We are very grateful for that!
      </p>

      ${this.state.state === 'write'
            ? html `
            <div class="s-flex s-gap:20 s-mbe:50" s-appear in="bottom">
              <button
                class="s-btn:outline s-color:accent"
                @click=${() => this._signInWithGoogle()}
              >
                <i class="s-icon:google s-mie:10"></i> Sign in with Google
              </button>
              <div class="s-flex-item:grow">
                ${this.state.user.pictureUrl
                ? html `
                      <div class="s-flex:align-center">
                        <div
                          class="s-flex-item:grow s-text:right s-font:bold s-pi:20"
                        >
                          ${this.state.user.name}
                        </div>
                        <div
                          class="s-avatar s-color:accent"
                          style="font-size: 44px;"
                        >
                          <img src="${this.state.user.pictureUrl}" />
                        </div>
                      </div>
                    `
                : ''}
              </div>
            </div>
            <form
              s-appear
              in="bottom"
              @submit=${(e) => {
                e.preventDefault();
                this._submit();
            }}
            >
              <label class="s-label:block s-mbe:30">
                <span class="s-flex">
                  <div class="s-flex-item:grow">Comment</div>
                  <div>
                    <span class="s-font:bold"
                      >${this.state.comment.length}</span
                    >
                    / 150
                  </div>
                </span>
                <textarea
                  ?disabled=${!this.state.user.email}
                  rows="4"
                  maxlength="150"
                  class="s-input"
                  @keyup=${(e) => {
                this.state.comment = e.target.value;
            }}
                ></textarea>
              </label>

              <label class="s-label s-mbe:30">
                <span>Give Coffeekraken a note</span>
                <s-rating class="s-color:accent"></s-rating>
              </label>

              <div class="s-text:right">
                <button
                  type="submit"
                  class="s-btn s-color:accent"
                  ?disabled=${!this.state.user.email ||
                !this.state.comment.length}
                >
                  Submit my comment!
                </button>
              </div>
            </form>
          `
            : this.state.state === 'already' || this.state.state === 'success'
                ? html `
            <i
              s-appear
              in="right"
              class="s-icon:check s-tc:success s-font:60 s-mbe:30"
            ></i>

            <h3 class="s-typo:h5 s-mbe:30" s-appear in="bottom">
              ${this.state.state === 'success'
                    ? html `
                    Thanks a lot<br />
                    for your
                    <span class="s-tc:complementary">precious feedback</span>!
                  `
                    : html `
                    You have
                    <span class="s-tc:complementary">already<br /></span>
                    gived your thoughts...
                  `}
            </h3>

            <p class="s-typo:p s-mbe:30" s-appear in="bottom">
              Your support is really important for us. Thank's again to have
              taking time give us your thoughts!
            </p>

            ${this.renderRating({
                    email: this.state.user.email,
                    name: this.state.user.name,
                    pictureUrl: this.state.user.pictureUrl,
                    rating: this.state.rating,
                    comment: this.state.comment,
                })}
          `
                : this.state.state === 'sending'
                    ? html ` Sending `
                    : this.state.state === 'success'
                        ? html ` Tgabjs!!! `
                        : this.state.state === 'idle'
                            ? html `
            <h4 class="s-typo:h5 s-mbe:50" s-appear in="bottom">
              Here's what people think about Coffeekraken...
            </h4>

            <div class="__list">
              ${this.state.ratings.map((ratingObj) => html ` ${this.renderRating(ratingObj)} `)}
            </div>
          `
                            : ''}
    `;
    }
}
export function define(props = {}, tagName = 'ck-ratings') {
    __SLitComponent.define(CKRatings, props, tagName);
    // __SLitComponent.setDefaultProps(tagName, props);
    // customElements.define(tagName, CKRatings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGVBQWU7SUF3QnBEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBMUJMLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFRZixnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUUzQixVQUFLLEdBQUc7WUFDTixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixVQUFVLEVBQUUsU0FBUzthQUN0QjtZQUNELE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFNRixDQUFDO0lBekJELDhDQUE4QztJQUU5QyxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUF1QkssS0FBSzs7WUFDVCxPQUFPO1lBQ1AsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2hCLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDN0Ms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