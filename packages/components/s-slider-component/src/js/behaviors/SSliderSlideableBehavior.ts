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

    _$lastGoToSlide: HTMLElement;

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

        this.$slider.addEventListener('s-slider-goto', (e) => {
            console.log('gogo');
            this._$lastGoToSlide = e.detail.$slide;
        });

    }

    _handleSlide() {
        __slideable(this.$slider.$root, {
            direction: this.$slider.props.direction,
            onRefocus: ($slide) => {
                // if (this._$lastGoToSlide !== $slide) return;
                this.$slider.setCurrentSlide($slide)
            }
        });
    }

}