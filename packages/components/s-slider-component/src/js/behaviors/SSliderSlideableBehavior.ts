import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __SSliderBehavior from '../SSliderBehavior';
import __css from '../../css/s-slider-slideable-behavior.css';
import __SSliderSlideableBehaviorInterface from './interface/SSliderSlideableBehaviorInterface';

export interface ISSliderBehaviorSettings {
    direction: 'horizontal' | 'vertical';
}

export default class SSliderSlideableBehavior extends __SSliderBehavior {

    static get properties() {
        return __SSliderBehavior.properties({}, __SSliderSlideableBehaviorInterface);
    }

    static get styles() {
        return __css;
    }

    static interface = __SSliderSlideableBehaviorInterface;
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
            this._$lastGoToSlide = e.detail.$slide;
        });

    }

    _handleSlide() {
        __slideable(this.$slider.$slidesWrapper, {
            friction: 0.7,
            direction: this.$slider.props.direction
        }).on('start', () => {
            this.$slider.stop();
        }).on('refocusStart', ($slide) => {
            // if (this._$lastGoToSlide !== $slide) return;
            this.$slider.setCurrentSlide($slide)
        });
    }

}