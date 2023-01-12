import __SLitComponent from '@coffeekraken/s-lit-component';
import { css, html, unsafeCSS } from 'lit';
import __SRatingComponentInterface from './interface/SRatingComponentInterface';
import __define from './define';
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
        return __SLitComponent.propertiesFromInterface({}, __SRatingComponentInterface);
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
export { __define as define };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZUFBZSxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBRWhGLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sa0NBQWtDLENBQUMsQ0FBQywrQkFBK0I7QUFVckY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFFSCxNQUFNLENBQUMsT0FBTyxPQUFPLGdCQUFpQixTQUFRLGVBQWU7SUFrQnpEO1FBQ0ksS0FBSyxDQUFDO1lBQ0YsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxDQUFDLENBQUM7UUFSUCxVQUFLLEdBQUc7WUFDSixLQUFLLEVBQUUsQ0FBQztTQUNYLENBQUM7SUFPRixDQUFDO0lBdEJELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sZUFBZSxDQUFDLHVCQUF1QixDQUMxQyxFQUFFLEVBQ0YsMkJBQTJCLENBQzlCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEdBQUcsQ0FBQTtjQUNKLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQztJQUNOLENBQUM7SUFhRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBTTtRQUNiLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFFMUIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRTtZQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDckIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQTs7eUJBRU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDOzBDQUNOLElBQUksQ0FBQyxLQUFLO2FBQy9CLEtBQUsscUJBQXFCLElBQUksQ0FBQyxLQUFLO2FBQ3BDLEdBQUcscUJBQXFCLElBQUksQ0FBQyxLQUFLO2FBQ2xDLEdBQUcseUJBQXlCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSzs7Ozs0QkFJSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7NkJBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLOzs7NkJBR2hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUM5QyxnQkFBZ0IsQ0FDbkI7O3NCQUVDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQTs7eUNBRU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDdEIsQ0FBQyxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7O3lCQUV4QyxDQUNKOzs7NkJBR1EsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQzlDLGdCQUFnQixDQUNuQjs7c0JBRUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNuQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFBOzt5Q0FFTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUNBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RCLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzt5QkFFeEMsQ0FDSjs7O1NBR1osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVELE9BQU8sRUFBRSxRQUFRLElBQUksTUFBTSxFQUFFLENBQUMifQ==