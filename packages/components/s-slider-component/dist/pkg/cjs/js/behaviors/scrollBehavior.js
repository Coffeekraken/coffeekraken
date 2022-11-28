"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
exports.default = {
    setup() {
        return new Promise((resolve, reject) => {
            // listen for user scroll and set the correct
            // state.currentSlideIdx at scroll end
            let scrollTimeout, isScrollFromUser = false;
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
                    let $elm, lowerToCenter = 999999999999;
                    for (let [key, $slide] of this.$slides.entries()) {
                        const stats = (0, dom_1.__elementAreaStats)($slide, {
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
            const toRect = $to.getBoundingClientRect(), fromRect = $from.getBoundingClientRect(), sliderRect = this.getBoundingClientRect(), _this = this;
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
            (0, function_1.__easeInterval)(this.props.transitionDuration, (percentage) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTZEO0FBQzdELDJEQUE4RDtBQUU5RCxrQkFBZTtJQUNYLEtBQUs7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLDZDQUE2QztZQUM3QyxzQ0FBc0M7WUFDdEMsSUFBSSxhQUFhLEVBQ2IsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2pELE9BQU87Z0JBQ1AsMkJBQTJCO2dCQUMzQiw2Q0FBNkM7Z0JBQzdDLE1BQU07Z0JBQ04sK0JBQStCO2dCQUMvQixJQUFJO2dCQUVKLDJCQUEyQjtnQkFDM0IsY0FBYztnQkFDZCxJQUFJO2dCQUVKLGlEQUFpRDtnQkFDakQsY0FBYztnQkFDZCxJQUFJO2dCQUNKLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDNUIsYUFBYSxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQzVCLDJCQUEyQjtvQkFDM0IsY0FBYztvQkFDZCxJQUFJO29CQUNKLDRCQUE0QjtvQkFFNUIsSUFBSSxJQUFJLEVBQ0osYUFBYSxHQUFHLFlBQVksQ0FBQztvQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7d0JBQzlDLE1BQU0sS0FBSyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsTUFBTSxFQUFFOzRCQUNyQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWM7eUJBQ2xDLENBQUMsQ0FBQzt3QkFDSCxJQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVU7NEJBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsS0FB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