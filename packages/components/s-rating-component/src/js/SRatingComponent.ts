import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SRatingComponentInterface from './interface/SRatingComponentInterface';

// @ts-ignore
import __css from '../../../../src/css/s-rating.css'; // relative to /dist/pkg/esm/js

export interface ISRatingComponentProps {
    min: number;
    max: number;
    icon: string;
    iconClass: string;
    readonly: boolean;
}

/**
 * @name                SRatingComponent
 * @as                  Rating
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SRatingComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-rating
 * @platform            html
 * @status              beta
 *
 * This component represent a simple rating "stars" based component. You can as well choose the icon you want to use, the number of them, etc...
 *
 * @feature           Rate with icon based range
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @install           shell
 * npm i @coffeekraken/s-rating-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-rating-component';
 * define();
 *
 * @example         html        Copy from an input
 * <div class="s-flex:align-center">
 *      <input class="s-input s-width:30" type="text" value="Hello world" id="my-input" />
 *      <s-rating class="s-mis:20" from="my-input"></s-rating>
 * </div>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SRatingComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties(
            {},
            __SRatingComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(__css)}
        `;
    }

    state = {
        value: 0,
    };

    constructor() {
        super({
            name: 's-rating',
            interface: __SRatingComponentInterface,
        });
    }

    mount() {
        this._setRating(this.props.value);
    }

    _setRating(rating) {
        // update state
        this.state.value = rating;
        // dispatch en update event
        this.dispatchEvent(
            new CustomEvent('s-rating.change', {
                bubbles: true,
                detail: this.state,
            }),
        );
    }

    render() {
        return html`
            <div
                class="${this.componentUtils.className('')}"
                style="--s-rating-rate: ${this.state
                    .value}; --s-rating-min: ${this.props
                    .min}; --s-rating-max: ${this.props
                    .max}; --s-rating-percent: ${(100 / this.props.max) *
                this.state.value};"
            >
                <input
                    type="hidden"
                    name="${this.props.name}"
                    value="${this.state.value}"
                />
                <div
                    class="${this.componentUtils.className(
                        '__base',
                    )} ${this.componentUtils.className('__icons-wrapper')}"
                >
                    ${[...Array(this.props.max).keys()].map(
                        (i) => html`
                            <i
                                class="${this.props.iconClass
                                    ? this.props.iconClass
                                    : `s-icon:${this.props.icon}`}"
                            ></i>
                        `,
                    )}
                </div>
                <div
                    class="${this.componentUtils.className(
                        '__rate',
                    )} ${this.componentUtils.className('__icons-wrapper')}"
                >
                    ${[...Array(this.props.max).keys()].map(
                        (i) => html`
                            <i
                                @click=${() => this._setRating(i + 1)}
                                class="${this.props.iconClass
                                    ? this.props.iconClass
                                    : `s-icon:${this.props.icon}`}"
                            ></i>
                        `,
                    )}
                </div>
            </div>
        `;
    }
}

export function define(
    props: Partial<ISRatingComponentProps> = {},
    tagName = 's-rating',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SRatingComponent);
}
