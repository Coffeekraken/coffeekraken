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
        this.$slider.$slides.forEach(($slide) => {
            console.log($slide);
            // const cssAnimation = new __SCssAnimation($slide);
            // __onDrag($slide, (e) => {
            //     const percent = (100 / 500) * Math.abs(e.deltaX);
            //     console.log(percent);
            //     cssAnimation.seekTo(percent);
            // });
        });
        // handle slide
        // this._handleSlide();
        // this.$slider.addEventListener('s-slider-goto', (e) => {
        //     // @ts-ignore
        //     this._$lastGoToSlide = e.detail.$slide;
        // });
    }
}
SSliderCssAnimationBehavior.interface = __SSliderCssAnimationBehaviorInterface;
SSliderCssAnimationBehavior.id = 'cssAnimation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8saUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxzQ0FBc0MsTUFBTSxrREFBa0QsQ0FBQztBQUl0RyxhQUFhO0FBQ2IsT0FBTyxLQUFLLE1BQU0sd0RBQXdELENBQUMsQ0FBQyx5Q0FBeUM7QUFNckgsTUFBTSxDQUFDLE9BQU8sT0FBTywyQkFBNEIsU0FBUSxpQkFBaUI7SUFrQnRFOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0MsS0FBSyxpQ0FDRSxzQ0FBc0MsQ0FBQyxRQUFRLEVBQUUsR0FDakQsUUFBUSxFQUNiLENBQUM7SUFDUCxDQUFDO0lBaENELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8saUJBQWlCLENBQUMsVUFBVSxDQUMvQixFQUFFLEVBQ0Ysc0NBQXNDLENBQ3pDLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLE1BQU07UUFDYixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBeUJELFlBQVk7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBCLG9EQUFvRDtZQUVwRCw0QkFBNEI7WUFDNUIsd0RBQXdEO1lBQ3hELDRCQUE0QjtZQUU1QixvQ0FBb0M7WUFDcEMsTUFBTTtRQUNWLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZTtRQUNmLHVCQUF1QjtRQUN2QiwwREFBMEQ7UUFDMUQsb0JBQW9CO1FBQ3BCLDhDQUE4QztRQUM5QyxNQUFNO0lBQ1YsQ0FBQzs7QUEzQ00scUNBQVMsR0FBRyxzQ0FBc0MsQ0FBQztBQUNuRCw4QkFBRSxHQUFHLGNBQWMsQ0FBQyJ9