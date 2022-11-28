import { __elementAreaStats } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';

export default {
    setup(): Promise<void> {
        return new Promise((resolve, reject) => {
            // listen for user scroll and set the correct
            // state.currentSlideIdx at scroll end
            let scrollTimeout,
                isScrollFromUser = false;
            this.$slidesWrapper.addEventListener('scroll', (e) => {
                // if (
                //     !isScrollFromUser &&
                //     __isUserScrolling(this.$slidesWrapper)
                // ) {
                //     isScrollFromUser = true;
                // }

                // if (!isScrollFromUser) {
                //     return;
                // }

                // if (!__isUserScrolling(this.$slidesWrapper)) {
                //     return;
                // }
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    // if (!isScrollFromUser) {
                    //     return;
                    // }
                    // isScrollFromUser = false;

                    let $elm,
                        lowerToCenter = 999999999999;
                    for (let [key, $slide] of this.$slides.entries()) {
                        const stats = __elementAreaStats($slide, {
                            relativeTo: this.$slidesWrapper,
                        });
                        if (
                            this.props.direction === 'vertical' &&
                            Math.abs(stats.centerOffsetY) <= lowerToCenter
                        ) {
                            lowerToCenter = Math.abs(stats.centerOffsetY);
                            $elm = $slide;
                        } else if (
                            this.props.direction === 'horizontal' &&
                            Math.abs(stats.centerOffsetX) <= lowerToCenter
                        ) {
                            lowerToCenter = Math.abs(stats.centerOffsetX);
                            $elm = $slide;
                        }
                    }
                    if ($elm) {
                        const slideObj = this.getSlide($elm);
                        this.setCurrentSlideByIdx(slideObj.idx);
                    }
                }, 200);
            });
            // resolve the setup
            resolve();
        });
    },
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

                    if (_this.props.direction === 'vertical') {
                        _this.$slidesWrapper.scroll(
                            0,
                            Math.round(startY + offset),
                        );
                    } else {
                        _this.$slidesWrapper.scroll(
                            Math.round(startX + offset),
                            0,
                        );
                    }
                },
                {
                    easing: _this.props.transitionEasing,
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
