import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __SSliderBehavior from '../SSliderBehavior';
import __css from '../../css/s-slider-slideable-behavior.css';
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
        super(settings);
    }
    static get styles() {
        return __css;
    }
    firstUpdated() {
        // handle slide
        this._handleSlide();
    }
    _handleSlide() {
        __slideable(this.$slider.$root, {
            direction: this.$slider.props.direction,
            onRefocus: ($slide) => {
                console.log('re', $slide);
                this.$slider.setCurrentSlideIdx([...this.$slider.$slides].indexOf($slide));
            }
        });
    }
}
SSliderSlideableBehavior.id = 'slideable';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlclNsaWRlYWJsZUJlaGF2aW9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU1NsaWRlclNsaWRlYWJsZUJlaGF2aW9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8saUJBQWlCLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxLQUFLLE1BQU0sMkNBQTJDLENBQUM7QUFNOUQsTUFBTSxDQUFDLE9BQU8sT0FBTyx3QkFBeUIsU0FBUSxpQkFBaUI7SUFRbkU7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUMzQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQWxCRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFrQkQsWUFBWTtRQUNSLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVk7UUFDUixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDNUIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVM7WUFDdkMsU0FBUyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQy9FLENBQUM7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDOztBQTdCTSwyQkFBRSxHQUFHLFdBQVcsQ0FBQyJ9