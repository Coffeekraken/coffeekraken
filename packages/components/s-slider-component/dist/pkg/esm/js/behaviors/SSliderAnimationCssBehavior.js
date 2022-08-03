import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __SSliderBehavior from '../SSliderBehavior';
import __SSliderCssAnimationBehaviorInterface from './interface/SSliderCssAnimationBehaviorInterface';
// @ts-ignore
import __css from '../../../../../src/css/s-slider-slideable-behavior.css'; // relative to /dist/pkg/esm/js/behaviors
export default class SSliderCssAnimationBehavior extends __SSliderBehavior {
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
        super(Object.assign(Object.assign({}, __SSliderCssAnimationBehaviorInterface.defaults()), settings));
        console.log('VBE');
    }
    static get properties() {
        return __SSliderBehavior.properties({}, __SSliderCssAnimationBehaviorInterface);
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
SSliderCssAnimationBehavior.interface = __SSliderCssAnimationBehaviorInterface;
SSliderCssAnimationBehavior.id = 'cssAnimation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8saUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxzQ0FBc0MsTUFBTSxrREFBa0QsQ0FBQztBQUV0RyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sd0RBQXdELENBQUMsQ0FBQyx5Q0FBeUM7QUFNckgsTUFBTSxDQUFDLE9BQU8sT0FBTywyQkFBNEIsU0FBUSxpQkFBaUI7SUFrQnRFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0MsS0FBSyxpQ0FDRSxzQ0FBc0MsQ0FBQyxRQUFRLEVBQUUsR0FDakQsUUFBUSxFQUNiLENBQUM7UUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFsQ0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQy9CLEVBQUUsRUFDRixzQ0FBc0MsQ0FDekMsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUEyQkQsWUFBWTtRQUNSLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNqRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxZQUFZO1FBQ1IsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFO1lBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFDaEMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVM7U0FDMUMsQ0FBQzthQUNHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDM0IsK0NBQStDO1lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQzs7QUE5Q00scUNBQVMsR0FBRyxzQ0FBc0MsQ0FBQztBQUNuRCw4QkFBRSxHQUFHLGNBQWMsQ0FBQyJ9