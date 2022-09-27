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
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
const ratingsApi_1 = __importDefault(require("../generic/ratingsApi"));
class CKRatings extends s_lit_component_1.default {
    constructor() {
        super({
            shadowDom: false,
        });
        this._settings = {};
        this._ratingsApi = ratingsApi_1.default;
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
        return s_lit_component_1.default.createProperties();
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
            ratingsApi_1.default.init();
            this.state.ratings = yield ratingsApi_1.default.read();
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
            const ratingObj = yield ratingsApi_1.default.getRatingObjForCurrentUser();
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
            yield ratingsApi_1.default.create({
                rating: this.state.rating,
                comment: this.state.comment,
            });
            this.state.state = 'success';
        });
    }
    renderRating(ratingObj) {
        return (0, lit_1.html) `
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
        return (0, lit_1.html) `
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
            ? (0, lit_1.html) `
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
            ? (0, lit_1.html) `
            <div class="s-flex s-gap:20 s-mbe:50" s-appear in="bottom">
              <button
                class="s-btn:outline s-color:accent"
                @click=${() => this._signInWithGoogle()}
              >
                <i class="s-icon:google s-mie:10"></i> Sign in with Google
              </button>
              <div class="s-flex-item:grow">
                ${this.state.user.pictureUrl
                ? (0, lit_1.html) `
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
                ? (0, lit_1.html) `
            <i
              s-appear
              in="right"
              class="s-icon:check s-tc:success s-font:60 s-mbe:30"
            ></i>

            <h3 class="s-typo:h5 s-mbe:30" s-appear in="bottom">
              ${this.state.state === 'success'
                    ? (0, lit_1.html) `
                    Thanks a lot<br />
                    for your
                    <span class="s-tc:complementary">precious feedback</span>!
                  `
                    : (0, lit_1.html) `
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
                    ? (0, lit_1.html) ` Sending `
                    : this.state.state === 'success'
                        ? (0, lit_1.html) ` Tgabjs!!! `
                        : this.state.state === 'idle'
                            ? (0, lit_1.html) `
            <h4 class="s-typo:h5 s-mbe:50" s-appear in="bottom">
              Here's what people think about Coffeekraken...
            </h4>

            <div class="__list">
              ${this.state.ratings.map((ratingObj) => (0, lit_1.html) ` ${this.renderRating(ratingObj)} `)}
            </div>
          `
                            : ''}
    `;
    }
}
exports.default = CKRatings;
function define(props = {}, tagName = 'ck-ratings') {
    s_lit_component_1.default.define(tagName, CKRatings, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsNkJBQTJCO0FBQzNCLHVFQUFpRDtBQUVqRCxNQUFxQixTQUFVLFNBQVEseUJBQWU7SUF3QnBEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFDO1FBMUJMLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFRZixnQkFBVyxHQUFHLG9CQUFZLENBQUM7UUFFM0IsVUFBSyxHQUFHO1lBQ04sT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRTtnQkFDSixLQUFLLEVBQUUsU0FBUztnQkFDaEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsVUFBVSxFQUFFLFNBQVM7YUFDdEI7WUFDRCxNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsT0FBTyxFQUFFLEVBQUU7U0FDWixDQUFDO0lBTUYsQ0FBQztJQXpCRCw4Q0FBOEM7SUFFOUMsTUFBTSxLQUFLLFVBQVU7UUFDbkIsT0FBTyx5QkFBZSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQXVCSyxLQUFLOztZQUNULE9BQU87WUFDUCxvQkFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sb0JBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNoQiwyQkFBMkI7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3JDLENBQUMs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