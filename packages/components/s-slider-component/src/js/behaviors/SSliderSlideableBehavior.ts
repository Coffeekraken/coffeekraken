import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __SSliderBehavior from '../SSliderBehavior';
import __SSliderSlideableBehaviorInterface from './interface/SSliderSlideableBehaviorInterface';

// @ts-ignore
import __css from '../../../../../src/css/s-slider-slideable-behavior.css'; // relative to /dist/pkg/esm/js/behaviors

export interface ISSliderBehaviorSettings {
    friction: number;
}

export default class SSliderSlideableBehavior extends __SSliderBehavior {
    static get properties() {
        return __SSliderBehavior.properties(
            {},
            __SSliderSlideableBehaviorInterface,
        );
    }

    static get styles() {
        return __css;
    }

    static interface = __SSliderSlideableBehaviorInterface;
    static id = 'slideable';

    // @ts-ignore
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
        super({
            ...__SSliderSlideableBehaviorInterface.defaults(),
            ...settings,
        });
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
        console.log('SSS', this.settings);
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
