import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SRatingComponentInterface from './interface/SRatingComponentInterface';
// @ts-ignore
import __css from '../../../../src/css/s-rating.css'; // relative to /dist/pkg/esm/js
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
 * @install           shell
 * npm i @coffeekraken/s-rating-component
 *
 * @install           js
 * import { define } from '@coffeekraken/s-rating-component';
 * define();
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
    constructor() {
        super({
            name: 's-rating',
            interface: __SRatingComponentInterface,
        });
        this.state = {
            value: 0,
        };
    }
    static get properties() {
        return __SLitComponent.createProperties({}, __SRatingComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    mount() {
        this._setRating(this.props.value);
    }
    _setRating(rating) {
        // update state
        this.state.value = rating;
        // dispatch en update event
        this.componentUtils.dispatchEvent('change', {
            detail: this.state,
        });
    }
    render() {
        return html `
            <div
                class="${this.componentUtils.className('__root')}"
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
                    class="${this.componentUtils.className('__base')} ${this.componentUtils.className('__icons-wrapper')}"
                >
                    ${[...Array(this.props.max).keys()].map((i) => html `
                            <i
                                class="${this.props.iconClass
            ? this.props.iconClass
            : `s-icon:${this.props.icon}`}"
                            ></i>
                        `)}
                </div>
                <div
                    class="${this.componentUtils.className('__rate')} ${this.componentUtils.className('__icons-wrapper')}"
                >
                    ${[...Array(this.props.max).keys()].map((i) => html `
                            <i
                                @click=${() => this._setRating(i + 1)}
                                class="${this.props.iconClass
            ? this.props.iconClass
            : `s-icon:${this.props.icon}`}"
                            ></i>
                        `)}
                </div>
            </div>
        `;
    }
}
export function define(props = {}, tagName = 's-rating') {
    __SLitComponent.setDefaultProps(tagName, props);
    // @ts-ignore
    customElements.define(tagName, SRatingComponent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxrQ0FBa0MsQ0FBQyxDQUFDLCtCQUErQjtBQVVyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUVILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQWtCekQ7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUsMkJBQTJCO1NBQ3pDLENBQUMsQ0FBQztRQVJQLFVBQUssR0FBRztZQUNKLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztJQU9GLENBQUM7SUF0QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsZ0JBQWdCLENBQ25DLEVBQUUsRUFDRiwyQkFBMkIsQ0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQWFELEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2IsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUUxQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFBOzt5QkFFTSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7MENBQ3RCLElBQUksQ0FBQyxLQUFLO2FBQy9CLEtBQUsscUJBQXFCLElBQUksQ0FBQyxLQUFLO2FBQ3BDLEdBQUcscUJBQXFCLElBQUksQ0FBQyxLQUFLO2FBQ2xDLEdBQUcseUJBQXlCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzs7Ozs0QkFJSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7NkJBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLOzs7NkJBR2hCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxRQUFRLENBQ1gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQzs7c0JBRW5ELENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7eUNBRU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDdEIsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7O3lCQUV4QyxDQUNKOzs7NkJBR1EsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFFBQVEsQ0FDWCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDOztzQkFFbkQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNuQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzt5Q0FFTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUNBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RCLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzt5QkFFeEMsQ0FDSjs7O1NBR1osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxNQUFNLENBQ2xCLFFBQXlDLEVBQUUsRUFDM0MsT0FBTyxHQUFHLFVBQVU7SUFFcEIsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEQsYUFBYTtJQUNiLGNBQWMsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDckQsQ0FBQyJ9