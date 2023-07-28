import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SRatingComponentInterface from './interface/SRatingComponentInterface.js';
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
        return __SLitComponent.propertiesFromInterface({}, __SRatingComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(__css)}
        `;
    }
    constructor() {
        super({
            name: 's-rating',
            interface: __SRatingComponentInterface,
        });
        this.state = {
            value: 0,
        };
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
        return html `
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
                    class="${this.utils.cls('_base')} ${this.utils.cls('_icons-wrapper')}"
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
                    class="${this.utils.cls('_rate')} ${this.utils.cls('_icons-wrapper')}"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLDJCQUEyQixNQUFNLDBDQUEwQyxDQUFDO0FBRW5GLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSxrQ0FBa0MsQ0FBQyxDQUFDLCtCQUErQjtBQVVyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQ0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLGVBQWU7SUFDekQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENBQzFDLEVBQUUsRUFDRiwyQkFBMkIsQ0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQU1EO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxDQUFDLENBQUM7UUFSUCxVQUFLLEdBQUc7WUFDSixLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7SUFPRixDQUFDO0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsVUFBVSxDQUFDLE1BQU07UUFDYixlQUFlO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBRTFCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ3JCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxNQUFNO1FBQ0YsT0FBTyxJQUFJLENBQUE7O3lCQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQzswQ0FDTixJQUFJLENBQUMsS0FBSzthQUMvQixLQUFLLHFCQUFxQixJQUFJLENBQUMsS0FBSzthQUNwQyxHQUFHLHFCQUFxQixJQUFJLENBQUMsS0FBSzthQUNsQyxHQUFHLHlCQUF5QixDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Ozs7NEJBSUosSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJOzZCQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzs7OzZCQUdoQixJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FDOUMsZ0JBQWdCLENBQ25COztzQkFFQyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQ25DLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUE7O3lDQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RCLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzt5QkFFeEMsQ0FDSjs7OzZCQUdRLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QyxnQkFBZ0IsQ0FDbkI7O3NCQUVDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7eUNBRU0sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN0QixDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTs7eUJBRXhDLENBQ0o7OztTQUdaLENBQUM7SUFDTixDQUFDO0NBQ0oifQ==