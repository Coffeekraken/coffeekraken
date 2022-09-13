"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
const SSliderBehavior_1 = __importDefault(require("../SSliderBehavior"));
const SSliderSlideableBehaviorInterface_1 = __importDefault(require("./interface/SSliderSlideableBehaviorInterface"));
// @ts-ignore
const s_slider_slideable_behavior_css_1 = __importDefault(require("../../../../../src/css/s-slider-slideable-behavior.css")); // relative to /dist/pkg/esm/js/behaviors
class SSliderSlideableBehavior extends SSliderBehavior_1.default {
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
        super(Object.assign(Object.assign({}, SSliderSlideableBehaviorInterface_1.default.defaults()), settings));
    }
    static get properties() {
        return SSliderBehavior_1.default.properties({}, SSliderSlideableBehaviorInterface_1.default);
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
    goTo($from, $to) {
        const $slideableItem = this.$slider.$slidesWrapper.children[0];
        const translates = (0, dom_1.__getTranslateProperties)($slideableItem);
        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds = this.$slider.$slidesWrapper.getBoundingClientRect();
        const deltaX = nextBounds.left - sliderBounds.left, deltaY = nextBounds.top - sliderBounds.top;
        (0, function_1.__easeInterval)(this.$slider.props.transitionDuration, (percent) => {
            if (this.$slider.props.direction === 'horizontal') {
                const computedDelta = translates.x + (deltaX / 100) * percent * -1;
                $slideableItem.style.transform = `translateX(${computedDelta}px)`;
            }
            else {
                const computedDelta = translates.y + (deltaY / 100) * percent * -1;
                $slideableItem.style.transform = `translateY(${computedDelta}px)`;
            }
        }, {
            easing: this.$slider.props.transitionEasing,
        });
    }
    _handleSlide() {
        (0, dom_1.__slideable)(this.$slider.$slidesWrapper, {
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
exports.default = SSliderSlideableBehavior;
SSliderSlideableBehavior.interface = SSliderSlideableBehaviorInterface_1.default;
SSliderSlideableBehavior.id = 'slideable';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBQWdGO0FBQ2hGLDJEQUE4RDtBQUM5RCx5RUFBbUQ7QUFDbkQsc0hBQWdHO0FBRWhHLGFBQWE7QUFDYiw2SEFBMkUsQ0FBQyx5Q0FBeUM7QUFNckgsTUFBcUIsd0JBQXlCLFNBQVEseUJBQWlCO0lBa0JuRTs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQW1DO1FBQzNDLEtBQUssaUNBQ0UsMkNBQW1DLENBQUMsUUFBUSxFQUFFLEdBQzlDLFFBQVEsRUFDYixDQUFDO0lBQ1AsQ0FBQztJQWhDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLHlCQUFpQixDQUFDLFVBQVUsQ0FDL0IsRUFBRSxFQUNGLDJDQUFtQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyx5Q0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF5QkQsWUFBWTtRQUNSLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUc7UUFDWCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxVQUFVLEdBQUcsSUFBQSw4QkFBd0IsRUFBQyxjQUFjLENBQUMsQ0FBQztRQUU1RCxNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQyxNQUFNLFlBQVksR0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRXhELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksRUFDOUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUcsQ0FBQztRQUUvQyxJQUFBLHlCQUFjLEVBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQ3JDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDUixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7Z0JBQy9DLE1BQU0sYUFBYSxHQUNmLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLGFBQWEsS0FBSyxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNILE1BQU0sYUFBYSxHQUNmLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLGFBQWEsS0FBSyxDQUFDO2FBQ3JFO1FBQ0wsQ0FBQyxFQUNEO1lBQ0ksTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQjtTQUM5QyxDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQsWUFBWTtRQUNSLElBQUEsaUJBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTO1NBQzFDLENBQUM7YUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzNCLCtDQUErQztZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7O0FBdEZMLDJDQXVGQztBQTNFVSxrQ0FBUyxHQUFHLDJDQUFtQyxDQUFDO0FBQ2hELDJCQUFFLEdBQUcsV0FBVyxDQUFDIn0=