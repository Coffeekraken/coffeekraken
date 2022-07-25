// @ts-nocheck

import __pickRandom from '@coffeekraken/sugar/shared/array/pickRandom';

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';
import __ratingsApi from '../generic/ratingsApi';

export default class CKWelcomeRatings extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties();
    }

    _ratings;
    _loaded = false;

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }

    async mount() {
        __ratingsApi.read().then((ratings) => {
            this._ratings = ratings;
            this._loaded = true;
            this.requestUpdate();
        });
    }

    pickRandomRatings() {
        if (!this._loaded) {
            return [
                {
                    name: '...',
                    rating: 5,
                },
                {
                    name: '...',
                    rating: 5,
                },
                {
                    name: '...',
                    rating: 5,
                },
            ];
        }

        return __pickRandom(this._ratings, 3);
    }

    render() {
        console.log('render');
        return html`
            ${this.pickRandomRatings().map(
                (rating, i) => html`
                    <a href="#ratings">
                        <div class="__rating-${i + 1}">
                            <div class="s-avatar s-color:accent s-font:100">
                                ${rating.pictureUrl
                                    ? html` <img src="${rating.pictureUrl}" /> `
                                    : html`
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
                                ></s-rating>
                            </div>
                        </div>
                    </a>
                `,
            )}
        `;
    }
}

export function define(props: any = {}, tagName = 'ck-welcome-ratings') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKWelcomeRatings);
}
