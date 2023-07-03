import { __elementAreaStats } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';
export default {
    setup() {
        return new Promise((resolve, reject) => {
            var _a;
            // listen for user scroll and set the correct
            // state.currentSlideIdx at scroll end
            let scrollTimeout, isScrollFromUser = false;
            (_a = this.$slidesWrapper) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', (e) => {
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
                    if (this.props.slidesByPage > 1) {
                        return;
                    }
                    let $elm, lowerToCenter = 999999999999;
                    for (let [key, $slide] of this.$slides.entries()) {
                        const stats = __elementAreaStats($slide, {
                            relativeTo: this.$slidesWrapper,
                        });
                        if (this.props.direction === 'vertical' &&
                            Math.abs(stats.centerOffsetY) <= lowerToCenter) {
                            lowerToCenter = Math.abs(stats.centerOffsetY);
                            $elm = $slide;
                        }
                        else if (this.props.direction === 'horizontal' &&
                            Math.abs(stats.centerOffsetX) <= lowerToCenter) {
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
    transition($from, $to) {
        return new Promise((resolve, reject) => {
            // disable scroll snaping during transition
            this.$slidesWrapper.style.scrollSnapType = 'none';
            const toRect = this.getPageRect($to), fromRect = this.getPageRect($from), sliderRect = this.getBoundingClientRect(), _this = this;
            let startX = this.$slidesWrapper.scrollLeft, startY = this.$slidesWrapper.scrollTop, fromOffset, toOffset, dist = 0;
            if (this.props.direction === 'vertical') {
                fromOffset = (sliderRect.height - fromRect.height) * 0.5;
                toOffset = (sliderRect.height - toRect.height) * 0.5;
                dist = toRect.y - fromRect.y - toOffset + fromOffset;
            }
            else {
                fromOffset = (sliderRect.width - fromRect.width) * 0.5;
                toOffset = (sliderRect.width - toRect.width) * 0.5;
                dist = toRect.x - fromRect.x - toOffset + fromOffset;
            }
            __easeInterval(this.props.transitionDuration, (percentage) => {
                const offset = (dist / 100) * percentage;
                if (_this.props.direction === 'vertical') {
                    _this.$slidesWrapper.scroll(0, Math.round(startY + offset));
                }
                else {
                    _this.$slidesWrapper.scroll(Math.round(startX + offset), 0);
                }
            }, {
                easing: _this.props.transitionEasing,
                onEnd() {
                    if (_this.props.direction === 'vertical') {
                        _this.$slidesWrapper.style.scrollSnapType =
                            'y mandatory';
                    }
                    else {
                        _this.$slidesWrapper.style.scrollSnapType =
                            'x mandatory';
                    }
                    resolve();
                },
            });
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUU5RCxlQUFlO0lBQ1gsS0FBSztRQUNELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ25DLDZDQUE2QztZQUM3QyxzQ0FBc0M7WUFDdEMsSUFBSSxhQUFhLEVBQ2IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzdCLE1BQUEsSUFBSSxDQUFDLGNBQWMsMENBQUUsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xELE9BQU87Z0JBQ1AsMkJBQTJCO2dCQUMzQiw2Q0FBNkM7Z0JBQzdDLE1BQU07Z0JBQ04sK0JBQStCO2dCQUMvQixJQUFJO2dCQUVKLDJCQUEyQjtnQkFDM0IsY0FBYztnQkFDZCxJQUFJO2dCQUVKLGlEQUFpRDtnQkFDakQsY0FBYztnQkFDZCxJQUFJO2dCQUNKLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDNUIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQzVCLDJCQUEyQjtvQkFDM0IsY0FBYztvQkFDZCxJQUFJO29CQUNKLDRCQUE0QjtvQkFFNUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7d0JBQzdCLE9BQU87cUJBQ1Y7b0JBRUQsSUFBSSxJQUFJLEVBQ0osYUFBYSxHQUFHLFlBQVksQ0FBQztvQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQzlDLE1BQU0sS0FBSyxHQUFHLGtCQUFrQixDQUFDLE1BQU0s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