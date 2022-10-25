import __SSliderBehavior from '../SSliderBehavior';
import __SSliderCssAnimationBehaviorInterface from './interface/SSliderCssAnimationBehaviorInterface';

// @ts-ignore
import __css from '../../../../../src/css/s-slider-slideable-behavior.css'; // relative to /dist/pkg/esm/js/behaviors

export interface ISSliderBehaviorSettings {
    friction: number;
}

export default class SSliderCssAnimationBehavior extends __SSliderBehavior {
    static get properties() {
        return __SSliderBehavior.properties(
            {},
            __SSliderCssAnimationBehaviorInterface,
        );
    }

    static get styles() {
        return __css;
    }

    static interface = __SSliderCssAnimationBehaviorInterface;
    static id = 'cssAnimation';

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
            ...__SSliderCssAnimationBehaviorInterface.defaults(),
            ...settings,
        });
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

    // _handleSlide() {
    //     __slideable(this.$slider.$slidesWrapper, {
    //         friction: this.settings.friction,
    //         direction: this.$slider.props.direction,
    //     })
    //         .on('start', () => {
    //             this.$slider.stop();
    //         })
    //         .on('refocusStart', ($slide) => {
    //             // if (this._$lastGoToSlide !== $slide) return;
    //             this.$slider.setCurrentSlide($slide);
    //         });
    // }
}
