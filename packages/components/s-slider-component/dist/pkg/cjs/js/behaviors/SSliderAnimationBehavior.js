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
SSliderCssAnimationBehavior.id = 'slideable';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkZBQXFFO0FBQ3JFLHlFQUFtRDtBQUNuRCw0SEFBc0c7QUFFdEcsYUFBYTtBQUNiLDZIQUEyRSxDQUFDLHlDQUF5QztBQU1ySCxNQUFxQiwyQkFBNEIsU0FBUSx5QkFBaUI7SUFrQnRFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0MsS0FBSyxpQ0FDRSw4Q0FBc0MsQ0FBQyxRQUFRLEVBQUUsR0FDakQsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDO0lBaENELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWlCLENBQUMsVUFBVSxDQUMvQixFQUFFLEVBQ0YsOENBQXNDLENBQ3pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLHlDQUFLLENBQUM7SUFDakIsQ0FBQztJQXlCRCxZQUFZO1FBQ1IsZUFBZTtRQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ2pELGFBQWE7WUFDYixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUztTQUMxQyxDQUFDO2FBQ0csRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMzQiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztBQXhETCw4Q0F5REM7QUE3Q1UscUNBQVMsR0FBRyw4Q0FBc0MsQ0FBQztBQUNuRCw4QkFBRSxHQUFHLFdBQVcsQ0FBQyJ9