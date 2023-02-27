import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SRatingComponentInterface from './interface/SRatingComponentInterface';

import __define from './define';

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
 * @event             s-rating.change            Dispatched when the rating has been updated
 * @event           s-rating                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @import          import { define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
 * 
 * @snippet         __SRatingComponentDefine($1)
 * 
 * @install           shell
 * npm i @coffeekraken/s-rating-component
 *
 * @install           js
 * import { define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
 * __SRatingComponentDefine();
 *
 * @example         html        Simple rating
 * <s-rating name="my-rating" class="s-color:accent"></s-rating>
 *
 * @example         html        More stars
 * <s-rating name="my-rating" class="s-color:accent" min="1" max="10"></s-rating>
 *
 * @example         html        Different icon and color
 * <s-rating name="my-rating" class="s-color:error" icon="heart"></s-rating>
 *
 * @example         html        Changing size
 * <s-rating name="my-rating" class="s-color:accent s-font:80"></s-rating>
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default class SRatingComponent extends __SLitComponent {
    static get properties() {
        return __SLitComponent.propertiesFromInterface(
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
        this.utils.dispatchEvent('change', {
            detail: this.state,
        });
    }

    render() {
        return html`
            <div
                class="${this.utils.cls('_root')}"
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
                    class="${this.utils.cls('_base')} ${this.utils.cls(
                        '_icons-wrapper',
                    )}"
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
                    class="${this.utils.cls('_rate')} ${this.utils.cls(
                        '_icons-wrapper',
                    )}"
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

export { __define as define };
