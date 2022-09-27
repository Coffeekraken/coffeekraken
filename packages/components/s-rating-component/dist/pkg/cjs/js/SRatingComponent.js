"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const lit_1 = require("lit");
const SRatingComponentInterface_1 = __importDefault(require("./interface/SRatingComponentInterface"));
const define_1 = __importDefault(require("./define"));
exports.define = define_1.default;
// @ts-ignore
const s_rating_css_1 = __importDefault(require("../../../../src/css/s-rating.css")); // relative to /dist/pkg/esm/js
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
class SRatingComponent extends s_lit_component_1.default {
    constructor() {
        super({
            name: 's-rating',
            interface: SRatingComponentInterface_1.default,
        });
        this.state = {
            value: 0,
        };
    }
    static get properties() {
        return s_lit_component_1.default.createProperties({}, SRatingComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(s_rating_css_1.default)}
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
        return (0, lit_1.html) `
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
                    ${[...Array(this.props.max).keys()].map((i) => (0, lit_1.html) `
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
                    ${[...Array(this.props.max).keys()].map((i) => (0, lit_1.html) `
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
exports.default = SRatingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9GQUE0RDtBQUM1RCw2QkFBMkM7QUFDM0Msc0dBQWdGO0FBRWhGLHNEQUFnQztBQW9KWCxpQkFwSmQsZ0JBQVEsQ0FvSlk7QUFsSjNCLGFBQWE7QUFDYixvRkFBcUQsQ0FBQywrQkFBK0I7QUFVckY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFFSCxNQUFxQixnQkFBaUIsU0FBUSx5QkFBZTtJQWtCekQ7UUFDSSxLQUFLLENBQUM7WUFDRixJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUsbUNBQTJCO1NBQ3pDLENBQUMsQ0FBQztRQVJQLFVBQUssR0FBRztZQUNKLEtBQUssRUFBRSxDQUFDO1NBQ1gsQ0FBQztJQU9GLENBQUM7SUF0QkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBZSxDQUFDLGdCQUFnQixDQUNuQyxFQUFFLEVBQ0YsbUNBQTJCLENBQzlCLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLElBQUEsU0FBRyxFQUFBO2NBQ0osSUFBQSxlQUFTLEVBQUMsc0JBQUssQ0FBQztTQUNyQixDQUFDO0lBQ04sQ0FBQztJQWFELEtBQUs7UUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2IsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUUxQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFO1lBQ3hDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSztTQUNyQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBQSxVQUFJLEVBQUE7O3lCQUVNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzswQ0FDdEIsSUFBSSxDQUFDLEtBQUs7YUFDL0IsS0FBSyxxQkFBcUIsSUFBSSxDQUFDLEtBQUs7YUFDcEMsR0FBRyxxQkFBcUIsSUFBSSxDQUFDLEtBQUs7YUFDbEMsR0FBRyx5QkFBeUIsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLOzs7OzRCQUlKLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTs2QkFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Ozs2QkFHaEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFFBQVEsQ0FDWCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDOztzQkFFbkQsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUNuQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBQSxVQUFJLEVBQUE7O3lDQUVNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RCLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzt5QkFFeEMsQ0FDSjs7OzZCQUdRLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxRQUFRLENBQ1gsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQzs7c0JBRW5ELENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FDbkMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBOzt5Q0FFTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7eUNBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1lBQ3RCLENBQUMsQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFOzt5QkFFeEMsQ0FDSjs7O1NBR1osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXhGRCxtQ0F3RkMifQ==