import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
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

    goTo($from, $to) {
        const $slideableItem = this.$slider.$slidesWrapper.children[0];
        const translates = __getTranslateProperties($slideableItem);

        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds =
            this.$slider.$slidesWrapper.getBoundingClientRect();

        const deltaX = nextBounds.left - sliderBounds.left,
            deltaY = nextBounds.top - sliderBounds.top;

        __easeInterval(
            this.$slider.props.transitionDuration,
            (percent) => {
                if (this.$slider.props.direction === 'horizontal') {
                    const computedDelta =
                        translates.x + (deltaX / 100) * percent * -1;
                    $slideableItem.style.transform = `translateX(${computedDelta}px)`;
                } else {
                    const computedDelta =
                        translates.y + (deltaY / 100) * percent * -1;
                    $slideableItem.style.transform = `translateY(${computedDelta}px)`;
                }
            },
            {
                easing: this.$slider.props.transitionEasing,
            },
        );
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
