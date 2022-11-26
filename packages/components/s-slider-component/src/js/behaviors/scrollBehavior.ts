import { __easeInterval } from '@coffeekraken/sugar/function';

export default {
    transition($from: HTMLElement, $to: HTMLElement): Promise<void> {
        return new Promise((resolve, reject) => {
            // disable scroll snaping during transition
            this.$slidesWrapper.style.scrollSnapType = 'none';

            const toRect = $to.getBoundingClientRect(),
                fromRect = $from.getBoundingClientRect(),
                sliderRect = this.getBoundingClientRect(),
                _this = this;
            let startX = this.$slidesWrapper.scrollLeft,
                startY = this.$slidesWrapper.scrollTop,
                fromOffset,
                toOffset,
                dist = 0;

            if (this.props.direction === 'vertical') {
                fromOffset = (sliderRect.height - fromRect.height) * 0.5;
                toOffset = (sliderRect.height - toRect.height) * 0.5;
                dist = toRect.y - fromRect.y - toOffset + fromOffset;
            } else {
                fromOffset = (sliderRect.width - fromRect.width) * 0.5;
                toOffset = (sliderRect.width - toRect.width) * 0.5;
                dist = toRect.x - fromRect.x - toOffset + fromOffset;
            }

            __easeInterval(
                this.props.transitionDuration,
                (percentage) => {
                    const offset = (dist / 100) * percentage;

                    if (this.props.direction === 'vertical') {
                        this.$slidesWrapper.scroll(
                            0,
                            Math.round(startY + offset),
                        );
                    } else {
                        this.$slidesWrapper.scroll(
                            Math.round(startX + offset),
                            0,
                        );
                    }
                },
                {
                    easing: this.props.transitionEasing,
                    onEnd() {
                        if (_this.props.direction === 'vertical') {
                            _this.$slidesWrapper.style.scrollSnapType =
                                'y mandatory';
                        } else {
                            _this.$slidesWrapper.style.scrollSnapType =
                                'x mandatory';
                        }
                        resolve();
                    },
                },
            );
        });
    },
};
