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
import __SLitComponent from "@coffeekraken/s-lit-component";
import { html } from "lit";
import __ratingsApi from "../generic/ratingsApi";
export default class CKRatings extends __SLitComponent {
    constructor() {
        super({
            shadowDom: false,
        });
        this._settings = {};
        this._ratingsApi = __ratingsApi;
        this.state = {
            already: false,
            state: "idle",
            user: {
                email: undefined,
                name: undefined,
                pictureUrl: undefined,
            },
            rating: 5,
            comment: "",
            ratings: [],
        };
    }
    //   state = __state.define("ck-ratings", {});
    static get properties() {
        return __SLitComponent.createProperties();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.ratings = yield __ratingsApi.read();
        });
    }
    firstUpdated() {
        return __awaiter(this, void 0, void 0, function* () {
            // listen for rating update
            this.addEventListener("s-rating.change", (e) => {
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
                this.state.state = "already";
                this.state.already = true;
            }
        });
    }
    _submit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.state = "sending";
            yield __ratingsApi.create({
                rating: this.state.rating,
                comment: this.state.comment,
            });
            this.state.state = "success";
        });
    }
    renderRating(ratingObj) {
        return html `
      <div class="rating" s-appear in="bottom">
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
            this.state.state = "idle";
        }}
            class="s-icon:ui-tooltip s-tc:complementary s-font:80 s-mbe:30"
          ></i>
        </div>
        ${this.state.state !== "write" && !this.state.already
            ? html `
              <div>
                <a
                  s-appear
                  in="left"
                  class="s-btn s-color:complementary"
                  @click=${(e) => {
                e.stopPropagation();
                e.preventDefault();
                this.state.state = "write";
            }}
                >
                  <i class="s-icon:write s-mie:10"></i>
                  Write a comment!
                </a>
              </div>
            `
            : ""}
      </div>

      <h2 class="s-typo:h4 s-flex-item:grow s-mbe:30">
        We'd <span class="s-tc:accent">love</span><br />to hear
        <span class="s-tc:complementary">from you</span>!
      </h2>

      <p class="s-typo:lead s-mbe:50">
        Want to show your love to the community? Don't hesitate to let a comment
        on your experience using Coffeekraken. We are very grateful for that!
      </p>

      ${this.state.state === "write"
            ? html `
            <div class="s-flex s-gap:20 s-mbe:50" s-appear in="bottom">
              <button
                class="s-btn:outline s-color:accent"
                @click=${() => this._signInWithGoogle()}
              >
                <i class="s-icon:google s-mie:10"></i> Sign in with Google
              </button>
              <button
                class="s-btn:outline s-color:accent"
                @click=${() => this._signInWithGoogle()}
              >
                <i class="s-icon:github s-mie:10"></i> Sign in with Github
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
                : ""}
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
            : this.state.state === "already" || this.state.state === "success"
                ? html `
            <i
              s-appear
              in="right"
              class="s-icon:check s-tc:success s-font:60 s-mbe:30"
            ></i>

            <h3 class="s-typo:h5 s-mbe:30" s-appear in="bottom">
              ${this.state.state === "success"
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
                : this.state.state === "sending"
                    ? html ` Sending `
                    : this.state.state === "success"
                        ? html ` Tgabjs!!! `
                        : this.state.state === "idle"
                            ? html `
            <h4 class="s-typo:h5 s-mbe:50" s-appear in="bottom">
              Here's what people think about Coffeekraken...
            </h4>

            <div class="__list">
              ${this.state.ratings.map((ratingObj) => html ` ${this.renderRating(ratingObj)} `)}
            </div>
          `
                            : ""}
    `;
    }
}
export function define(props = {}, tagName = "ck-ratings") {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKRatings);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sWUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBRWpELE1BQU0sQ0FBQyxPQUFPLE9BQU8sU0FBVSxTQUFRLGVBQWU7SUF3QnBEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBMUJMLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFRZixnQkFBVyxHQUFHLFlBQVksQ0FBQztRQUUzQixVQUFLLEdBQUc7WUFDTixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxTQUFTO2dCQUNoQixJQUFJLEVBQUUsU0FBUztnQkFDZixVQUFVLEVBQUUsU0FBUzthQUN0QjtZQUNELE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsRUFBRTtTQUNaLENBQUM7SUFNRixDQUFDO0lBekJELDhDQUE4QztJQUU5QyxNQUFNLEtBQUssVUFBVTtRQUNuQixPQUFPLGVBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUF1QkssS0FBSzs7WUFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNoQiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxN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