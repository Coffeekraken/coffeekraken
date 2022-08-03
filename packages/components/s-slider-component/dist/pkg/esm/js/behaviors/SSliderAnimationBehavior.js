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
SSliderCssAnimationBehavior.id = 'slideable';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8saUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxzQ0FBc0MsTUFBTSxrREFBa0QsQ0FBQztBQUV0RyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sd0RBQXdELENBQUMsQ0FBQyx5Q0FBeUM7QUFNckgsTUFBTSxDQUFDLE9BQU8sT0FBTywyQkFBNEIsU0FBUSxpQkFBaUI7SUFrQnRFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0MsS0FBSyxpQ0FDRSxzQ0FBc0MsQ0FBQyxRQUFRLEVBQUUsR0FDakQsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDO0lBaENELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUMvQixFQUFFLEVBQ0Ysc0NBQXNDLENBQ3pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBeUJELFlBQVk7UUFDUixlQUFlO1FBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakQsYUFBYTtZQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsWUFBWTtRQUNSLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRTtZQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTO1NBQzFDLENBQUM7YUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQzNCLCtDQUErQztZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7O0FBNUNNLHFDQUFTLEdBQUcsc0NBQXNDLENBQUM7QUFDbkQsOEJBQUUsR0FBRyxXQUFXLENBQUMifQ==