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
    //   state = __state.define("ck-ratings", {});
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }
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
export function __define(props = {}, tagName = 'ck-ratings') {
    __SLitComponent.define(tagName, CKRatings, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGVBQWU7SUFHbEQsOENBQThDO0lBRTlDLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDckQsQ0FBQztJQWlCRDtRQUNJLEtBQUssQ0FBQztZQUNGLFNBQVMsRUFBRSxLQUFLO1NBQ25CLENBQUMsQ0FBQztRQTFCUCxjQUFTLEdBQUcsRUFBRSxDQUFDO1FBUWYsZ0JBQVcsR0FBRyxZQUFZLENBQUM7UUFFM0IsVUFBSyxHQUFHO1lBQ0osT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsVUFBVSxFQUFFLFNBQVM7YUFDeEI7WUFDRCxNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLEVBQUU7U0FDZCxDQUFDO0lBTUYsQ0FBQztJQUVLLEtBQUs7O1lBQ1AsT0FBTztZQUNQLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNkLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsSUFB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