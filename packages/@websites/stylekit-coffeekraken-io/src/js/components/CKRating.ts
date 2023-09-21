// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import __ratingsApi from '../generic/ratingsApi.js';

export default class CKRatings extends __SLitComponent {
    _settings = {};

    //   state = __state.define("ck-ratings", {});

    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }

    _ratingsApi = __ratingsApi;

    state = {
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

    constructor() {
        super({
            shadowDom: false,
        });
    }

    async mount() {
        return;
        __ratingsApi.init();
        this.state.ratings = await __ratingsApi.read();
    }

    async firstUpdated() {
        // listen for rating update
        this.addEventListener('s-rating.change', (e) => {
            this.state.rating = e.detail.value;
        });
    }

    async _signInWithGoogle() {
        const user = await this._ratingsApi._signInWithGoogle();
        this.state.user = user;
        const ratingObj = await __ratingsApi.getRatingObjForCurrentUser();
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
    }

    async _submit() {
        this.state.state = 'sending';

        await __ratingsApi.create({
            rating: this.state.rating,
            comment: this.state.comment,
        });

        this.state.state = 'success';
    }

    renderRating(ratingObj) {
        return html`
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
        return html`
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
                    ? html`
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
                ? html`
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
                                  ? html`
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
                ? html`
                      <i
                          s-appear
                          in="right"
                          class="s-icon:check s-tc:success s-font:60 s-mbe:30"
                      ></i>

                      <h3 class="s-typo:h5 s-mbe:30" s-appear in="bottom">
                          ${this.state.state === 'success'
                              ? html`
                                    Thanks a lot<br />
                                    for your
                                    <span class="s-tc:complementary"
                                        >precious feedback</span
                                    >!
                                `
                              : html`
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
                ? html` Sending `
                : this.state.state === 'success'
                ? html` Tgabjs!!! `
                : this.state.state === 'idle'
                ? html`
                      <h4 class="s-typo:h5 s-mbe:50" s-appear in="bottom">
                          Here's what people think about Coffeekraken...
                      </h4>

                      <div class="_list">
                          ${this.state.ratings.map(
                              (ratingObj) =>
                                  html` ${this.renderRating(ratingObj)} `,
                          )}
                      </div>
                  `
                : ''}
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-ratings') {
    __SLitComponent.define(tagName, CKRatings, props);
}
