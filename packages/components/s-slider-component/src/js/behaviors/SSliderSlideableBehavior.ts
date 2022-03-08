import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __SSliderBehavior from '../SSliderBehavior';
import __css from '../../css/s-slider-slideable-behavior.css';

export interface ISSliderBehaviorSettings {
    direction: 'horizontal' | 'vertical';
}

export default class SSliderSlideableBehavior extends __SSliderBehavior {

    static get styles() {
        return __css;
    }

    static id = 'slideable';

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
    constructor(settings?: ISSliderBehaviorSettings) {
        super(settings);
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