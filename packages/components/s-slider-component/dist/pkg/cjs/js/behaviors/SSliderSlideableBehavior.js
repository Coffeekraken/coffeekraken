"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slideable_1 = __importDefault(require("@coffeekraken/sugar/js/dom/slide/slideable"));
const getTranslateProperties_1 = __importDefault(require("@coffeekraken/sugar/js/dom/style/getTranslateProperties"));
const easeInterval_1 = __importDefault(require("@coffeekraken/sugar/shared/function/easeInterval"));
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
        const translates = (0, getTranslateProperties_1.default)($slideableItem);
        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds = this.$slider.$slidesWrapper.getBoundingClientRect();
        const deltaX = nextBounds.left - sliderBounds.left, deltaY = nextBounds.top - sliderBounds.top;
        (0, easeInterval_1.default)(this.$slider.props.transitionDuration, (percent) => {
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
exports.default = SSliderSlideableBehavior;
SSliderSlideableBehavior.interface = SSliderSlideableBehaviorInterface_1.default;
SSliderSlideableBehavior.id = 'slideable';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkZBQXFFO0FBQ3JFLHFIQUErRjtBQUMvRixvR0FBOEU7QUFDOUUseUVBQW1EO0FBQ25ELHNIQUFnRztBQUVoRyxhQUFhO0FBQ2IsNkhBQTJFLENBQUMseUNBQXlDO0FBTXJILE1BQXFCLHdCQUF5QixTQUFRLHlCQUFpQjtJQWtCbkU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUMzQyxLQUFLLGlDQUNFLDJDQUFtQyxDQUFDLFFBQVEsRUFBRSxHQUM5QyxRQUFRLEVBQ2IsQ0FBQztJQUNQLENBQUM7SUFoQ0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyx5QkFBaUIsQ0FBQyxVQUFVLENBQy9CLEVBQUUsRUFDRiwyQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8seUNBQUssQ0FBQztJQUNqQixDQUFDO0lBeUJELFlBQVk7UUFDUixlQUFlO1FBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakQsYUFBYTtZQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHO1FBQ1gsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUEsZ0NBQXdCLEVBQUMsY0FBYyxDQUFDLENBQUM7UUFFNUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0MsTUFBTSxZQUFZLEdBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUV4RCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQzlDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFL0MsSUFBQSxzQkFBYyxFQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUNyQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxFQUFFO2dCQUMvQyxNQUFNLGFBQWEsR0FDZixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakQsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxhQUFhLEtBQUssQ0FBQzthQUNyRTtpQkFBTTtnQkFDSCxNQUFNLGFBQWEsR0FDZixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakQsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxhQUFhLEtBQUssQ0FBQzthQUNyRTtRQUNMLENBQUMsRUFDRDtZQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7U0FDOUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELFlBQVk7UUFDUixJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUztTQUMxQyxDQUFDO2FBQ0csRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMzQiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztBQXRGTCwyQ0F1RkM7QUEzRVUsa0NBQVMsR0FBRywyQ0FBbUMsQ0FBQztBQUNoRCwyQkFBRSxHQUFHLFdBQVcsQ0FBQyJ9