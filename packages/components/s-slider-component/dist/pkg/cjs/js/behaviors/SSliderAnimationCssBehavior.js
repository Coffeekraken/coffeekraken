"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slideable_1 = __importDefault(require("@coffeekraken/sugar/js/dom/slide/slideable"));
const SSliderBehavior_1 = __importDefault(require("../SSliderBehavior"));
const SSliderCssAnimationBehaviorInterface_1 = __importDefault(require("./interface/SSliderCssAnimationBehaviorInterface"));
// @ts-ignore
const s_slider_slideable_behavior_css_1 = __importDefault(require("../../../../../src/css/s-slider-slideable-behavior.css")); // relative to /dist/pkg/esm/js/behaviors
class SSliderCssAnimationBehavior extends SSliderBehavior_1.default {
    /**
     * @name            constructor
     * @type        Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super(Object.assign(Object.assign({}, SSliderCssAnimationBehaviorInterface_1.default.defaults()), settings));
        console.log('VBE');
    }
    static get properties() {
        return SSliderBehavior_1.default.properties({}, SSliderCssAnimationBehaviorInterface_1.default);
    }
    static get styles() {
        return s_slider_slideable_behavior_css_1.default;
    }
    firstUpdated() {
        // handle slide
        this._handleSlide();
        this.$slider.addEventListener('s-slider-goto', (e) => {
            // @ts-ignore
            this._$lastGoToSlide = e.detail.$slide;
        });
    }
    _handleSlide() {
        (0, slideable_1.default)(this.$slider.$slidesWrapper, {
            friction: this.settings.friction,
            direction: this.$slider.props.direction,
        })
            .on('start', () => {
            this.$slider.stop();
        })
            .on('refocusStart', ($slide) => {
            // if (this._$lastGoToSlide !== $slide) return;
            this.$slider.setCurrentSlide($slide);
        });
    }
}
exports.default = SSliderCssAnimationBehavior;
SSliderCssAnimationBehavior.interface = SSliderCssAnimationBehaviorInterface_1.default;
SSliderCssAnimationBehavior.id = 'cssAnimation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkZBQXFFO0FBQ3JFLHlFQUFtRDtBQUNuRCw0SEFBc0c7QUFFdEcsYUFBYTtBQUNiLDZIQUEyRSxDQUFDLHlDQUF5QztBQU1ySCxNQUFxQiwyQkFBNEIsU0FBUSx5QkFBaUI7SUFrQnRFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0MsS0FBSyxpQ0FDRSw4Q0FBc0MsQ0FBQyxRQUFRLEVBQUUsR0FDakQsUUFBUSxFQUNiLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFsQ0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBaUIsQ0FBQyxVQUFVLENBQy9CLEVBQUUsRUFDRiw4Q0FBc0MsQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8seUNBQUssQ0FBQztJQUNqQixDQUFDO0lBMkJELFlBQVk7UUFDUixlQUFlO1FBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakQsYUFBYTtZQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTO1NBQzFDLENBQUM7YUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzNCLCtDQUErQztZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7O0FBMURMLDhDQTJEQztBQS9DVSxxQ0FBUyxHQUFHLDhDQUFzQyxDQUFDO0FBQ25ELDhCQUFFLEdBQUcsY0FBYyxDQUFDIn0=