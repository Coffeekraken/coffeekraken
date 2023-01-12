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
        return __SLitComponent.propertiesFromInterface();
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
                Want to show your love to the community? Don't hesitate to let a
                comment on your experience using Coffeekraken. We are very
                grateful for that!
            </p>

            ${this.state.state === 'write'
            ? html `
                      <div
                          class="s-flex s-gap:20 s-mbe:50"
                          s-appear
                          in="bottom"
                      >
                          <button
                              class="s-btn:outline s-color:accent"
                              @click=${() => this._signInWithGoogle()}
                          >
                              <i class="s-icon:google s-mie:10"></i> Sign in
                              with Google
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
                                                <img
                                                    src="${this.state.user
                    .pictureUrl}"
                                                />
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
            : this.state.state === 'already' ||
                this.state.state === 'success'
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
                                    <span class="s-tc:complementary"
                                        >precious feedback</span
                                    >!
                                `
                    : html `
                                    You have
                                    <span class="s-tc:complementary"
                                        >already<br
                                    /></span>
                                    gived your thoughts...
                                `}
                      </h3>

                      <p class="s-typo:p s-mbe:30" s-appear in="bottom">
                          Your support is really important for us. Thank's again
                          to have taking time give us your thoughts!
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

                      <div class="_list">
                          ${this.state.ratings.map((ratingObj) => html ` ${this.renderRating(ratingObj)} `)}
                      </div>
                  `
                            : ''}
        `;
    }
}
export function define(props = {}, tagName = 'ck-ratings') {
    __SLitComponent.define(tagName, CKRatings, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGVBQWU7SUF3QmxEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsU0FBUyxFQUFFLEtBQUs7U0FDbkIsQ0FBQyxDQUFDO1FBMUJQLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFRZixnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUUzQixVQUFLLEdBQUc7WUFDSixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixVQUFVLEVBQUUsU0FBUzthQUN4QjtZQUNELE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNkLENBQUM7SUFNRixDQUFDO0lBekJELDhDQUE4QztJQUU5QyxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUF1QkssS0FBSzs7WUFDUCxPQUFPO1lBQ1AsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2QsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxJ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