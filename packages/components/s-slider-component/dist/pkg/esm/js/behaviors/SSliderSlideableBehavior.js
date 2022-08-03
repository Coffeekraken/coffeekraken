import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __SSliderBehavior from '../SSliderBehavior';
import __SSliderSlideableBehaviorInterface from './interface/SSliderSlideableBehaviorInterface';
// @ts-ignore
import __css from '../../../../../src/css/s-slider-slideable-behavior.css'; // relative to /dist/pkg/esm/js/behaviors
export default class SSliderSlideableBehavior extends __SSliderBehavior {
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
        super(Object.assign(Object.assign({}, __SSliderSlideableBehaviorInterface.defaults()), settings));
    }
    static get properties() {
        return __SSliderBehavior.properties({}, __SSliderSlideableBehaviorInterface);
    }
    static get styles() {
        return __css;
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
        const translates = __getTranslateProperties($slideableItem);
        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds = this.$slider.$slidesWrapper.getBoundingClientRect();
        const deltaX = nextBounds.left - sliderBounds.left, deltaY = nextBounds.top - sliderBounds.top;
        __easeInterval(this.$slider.props.transitionDuration, (percent) => {
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
        __slideable(this.$slider.$slidesWrapper, {
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
SSliderSlideableBehavior.interface = __SSliderSlideableBehaviorInterface;
SSliderSlideableBehavior.id = 'slideable';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8sd0JBQXdCLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxjQUFjLE1BQU0sa0RBQWtELENBQUM7QUFDOUUsT0FBTyxpQkFBaUIsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLG1DQUFtQyxNQUFNLCtDQUErQyxDQUFDO0FBRWhHLGFBQWE7QUFDYixPQUFPLEtBQUssTUFBTSx3REFBd0QsQ0FBQyxDQUFDLHlDQUF5QztBQU1ySCxNQUFNLENBQUMsT0FBTyxPQUFPLHdCQUF5QixTQUFRLGlCQUFpQjtJQWtCbkU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUMzQyxLQUFLLGlDQUNFLG1DQUFtQyxDQUFDLFFBQVEsRUFBRSxHQUM5QyxRQUFRLEVBQ2IsQ0FBQztJQUNQLENBQUM7SUFoQ0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQy9CLEVBQUUsRUFDRixtQ0FBbUMsQ0FDdEMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF5QkQsWUFBWTtRQUNSLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUc7UUFDWCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFNUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDL0MsTUFBTSxZQUFZLEdBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUV4RCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQzlDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFFL0MsY0FBYyxDQUNWLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUNyQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxFQUFFO2dCQUMvQyxNQUFNLGFBQWEsR0FDZixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakQsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxhQUFhLEtBQUssQ0FBQzthQUNyRTtpQkFBTTtnQkFDSCxNQUFNLGFBQWEsR0FDZixVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakQsY0FBYyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsY0FBYyxhQUFhLEtBQUssQ0FBQzthQUNyRTtRQUNMLENBQUMsRUFDRDtZQUNJLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0I7U0FDOUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVELFlBQVk7UUFDUixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUU7WUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUztTQUMxQyxDQUFDO2FBQ0csRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMzQiwrQ0FBK0M7WUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDOztBQTFFTSxrQ0FBUyxHQUFHLG1DQUFtQyxDQUFDO0FBQ2hELDJCQUFFLEdBQUcsV0FBVyxDQUFDIn0=