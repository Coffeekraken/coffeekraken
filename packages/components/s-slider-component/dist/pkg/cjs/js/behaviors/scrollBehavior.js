"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
exports.default = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQTZEO0FBQzdELDJEQUE4RDtBQUU5RCxrQkFBZTtJQUNYLEtBQUs7UUFDRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUNuQyw2Q0FBNkM7WUFDN0Msc0NBQXNDO1lBQ3RDLElBQUksYUFBYSxFQUNiLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUM3QixNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNsRCxPQUFPO2dCQUNQLDJCQUEyQjtnQkFDM0IsNkNBQTZDO2dCQUM3QyxNQUFNO2dCQUNOLCtCQUErQjtnQkFDL0IsSUFBSTtnQkFFSiwyQkFBMkI7Z0JBQzNCLGNBQWM7Z0JBQ2QsSUFBSTtnQkFFSixpREFBaUQ7Z0JBQ2pELGNBQWM7Z0JBQ2QsSUFBSTtnQkFDSixZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzVCLGFBQWEsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUM1QiwyQkFBMkI7b0JBQzNCLGNBQWM7b0JBQ2QsSUFBSTtvQkFDSiw0QkFBNEI7b0JBRTVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO3dCQUM3QixPQUFPO3FCQUNWO29CQUVELElBQUksSUFBSSxFQUNKLGFBQWEsR0FBRyxZQUFZLENBQUM7b0JBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFO3dCQUM5QyxNQUFNLEtBQUssR0FBRyxJQUFBLHdCQUFrQixFQUFDLE1BQU0sRUFBRTs0QkFDckMsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjO3lCQUNsQyxDQUFDLENBQUM7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