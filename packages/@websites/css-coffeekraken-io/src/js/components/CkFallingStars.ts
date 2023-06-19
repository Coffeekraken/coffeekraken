// @ts-nocheck

import __SLitComponent from '@coffeekraken/s-lit-component';
import { html } from 'lit';

export default class CKFallingStars extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface();
    }

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
    }

    _starsCount = 0;
    _maxCount = 10;

    async firstUpdated() {
        for (let i = 0; i < this._maxCount; i++) {
            const left = `${Math.random() * 100}%`;

            const $starStyle = document.createElement('style');
            $starStyle.rel = 'stylesheet';
            $starStyle.innerHTML = `
                @keyframes star-${i} {
                    0% {
                        top: -50px;
                        left: var(--left);
                        opacity: 1;
                    }
                    80% {
                        opacity: 1;
                    }
                    100% {
                        top: 100%;
                        left: calc(var(--left) - ${
                            10 + Math.round(Math.random() * 0)
                        }%);
                        opacity: 0;
                    }
                }
                ck-falling-stars ._star-${i} {
                    animation: star-${i} var(--falling-time, 1s) ease-in forwards;
                }
            `;
            document.head.appendChild($starStyle);
        }

        this.new();
    }

    new() {
        this._starsCount++;

        const starId = Math.round(Math.random() * this._maxCount);

        const $star = document.createElement('div');
        $star.classList.add('_star');
        $star.classList.add(`_star-${starId}`);
        $star.classList.add(Math.random() < 0.5 ? 'accent' : 'complementary');

        const speed = 1 + Math.random() * 1.5;

        $star.style.setProperty('--left', `${Math.random() * 100}%`);
        $star.style.setProperty('--falling-time', `${speed}s`);
        $star.style.setProperty('--speed', speed);
        $star.style.setProperty('--scale', Math.random() * 2);

        setTimeout(() => {
            $star.remove();
        }, 5000);

        this.appendChild($star);

        setTimeout(this.new.bind(this), Math.random() * 3500);
    }

    render() {
        return html``;
    }
}

export function __define(props: any = {}, tagName = 'ck-falling-stars') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, CKFallingStars);
}
