// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLitComponent from '@coffeekraken/s-lit-component';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
export default class SSlider extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SSliderComponentInterface,
            },
        }));
        this.$slides = [];
        this.$navs = [];
        this._currentPageIdx = 0;
        this._currentSlideIdx = 0;
    }
    static get properties() {
        return __SLitComponent.properties({}, __SSliderComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    firstUpdated() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // bare elements
            this.$slidesContainer = this.querySelector(`.${this.componentUtils.className('__slides')}`);
            this.$root = this.querySelector(`.${this.componentUtils.className('')}`);
            // navs
            this.$navs = this.querySelectorAll('[s-slider-nav]');
            this.$navs.forEach($nav => {
                $nav.classList.add(this.componentUtils.className('__nav'));
                this.$root.append($nav);
            });
            // slides
            this.$slides = this.querySelectorAll('[s-slider-slide]');
            this.$slides.forEach($item => {
                // add the item class
                $item.classList.add(this.componentUtils.className('__slide'));
                // add item into the container
                this.$slidesContainer.append($item);
            });
            // default behavior
            if (this.props.behavior) {
                this.behavior.$slider = this;
                (_b = (_a = this.behavior).firstUpdated) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
        });
    }
    /**
     * @name        currentPageIdx
     * @type    HTMLElement
     *
     * Access the current page idx. Begin from 0...
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get currentPageIdx() {
        return this._currentPageIdx;
    }
    /**
     * @name        getCurrentSlideIdx
     * @type    Function
     *
     * Access the current slide idx. Begin from 0...
     *
     * @return      {Number}        The current slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getCurrentSlideIdx() {
        return this._currentSlideIdx;
    }
    /**
     * @name        setCurrentSlideIdx
     * @type    Function
     *
     * Set the current slide idx.
     *
     * @param       {Number}        idx         The current slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setCurrentSlideIdx(idx) {
        this._currentSlideIdx = idx;
        this.requestUpdate();
    }
    /**
     * @name        currentSlideIdx
     * @type        Number
     *
     * Access the current slide idx. Begin from 0...
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get currentSlideIdx() {
        return this.getCurrentSlideIdx();
    }
    /**
     * @name        getCurrentSlideElement
     * @type    Function
     *
     * Access the current slide item.
     *
     * @return      {HTMLElement}           The current slide element
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getCurrentSlideElement() {
        return this.$slides[this._currentSlideIdx];
    }
    /**
     * @name        currentSlideElement
     * @type    HTMLElement
     *
     * Access the current slide item.
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get currentSlideElement() {
        return this.getCurrentSlideElement();
    }
    /**
     * @name        getNextSlideIdx
     * @type    HTMLElement
     *
     * Access the next slide idx.
     *
     * @return      {Number}        The next slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getNextSlideIdx() {
        const nextSlideIdx = this._currentSlideIdx + 1;
        if (nextSlideIdx >= this.$slides.length - 1)
            return this.$slides.length - 1;
        return nextSlideIdx;
    }
    /**
     * @name        nextSlideIdx
     * @type    Number
     *
     * Access the next slide idx.
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get nextSlideIdx() {
        return this.getNextSlideIdx();
    }
    /**
     * @name        getNextSlideElement
     * @type    Function
     *
     * Access the next slide idx.
     *
     * @return      {HTMLElement}           The next slide element
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getNextSlideElement() {
        return this.$slides[this.getNextSlideIdx()];
    }
    /**
     * @name        nextSlideElement
     * @type    Function
     *
     * Access the next slide idx.
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get nextSlideElement() {
        return this.getNextSlideElement();
    }
    /**
     * @name        getPreviousSlideIdx
     * @type    Function
     *
     * Access the previous slide idx.
     *
     * @return      {HTMLElement}           The previous slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getPreviousSlideIdx() {
        const previousSlideIdx = this._currentSlideIdx - 1;
        if (previousSlideIdx <= 0)
            return 0;
        return previousSlideIdx;
    }
    /**
     * @name        previousSlideIdx
     * @type    Number
     * @get
     *
     * Access the previous slide idx.
     *
     * @return      {HTMLElement}           The previous slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get previousSlideIdx() {
        return this.getPreviousSlideIdx();
    }
    /**
     * @name        getPreviousSlideElement
     * @type    Function
     *
     * Access the previous slide element.
     *
     * @return      {HTMLElement}           The previous slide element
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getPreviousSlideElement() {
        return this.$slides[this.getPreviousSlideIdx()];
    }
    /**
     * @name        previousSlideElement
     * @type    Function
     *
     * Access the previous slide element.
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get previousSlideItem() {
        return this.$slides[this.getPreviousSlideIdx()];
    }
    /**
     * @name        goTo
     * @type    Function
     *
     * Go to a specific slide.
     *
     * @param       {Number}    slideIdx    The slide idx to go to
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    goTo(slideIdx) {
        if (!this.$slides[slideIdx])
            return;
        const $nextItem = this.$slides[slideIdx];
        const $currentItem = this.getCurrentSlideElement();
        this._currentSlideIdx = slideIdx;
        this._transitionHandler($currentItem, $nextItem);
    }
    /**
     * @name        next
     * @type    Function
     *
     * Go to the next slide
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    next() {
        const $nextItem = this.getNextSlideElement();
        const $currentItem = this.getCurrentSlideElement();
        this._currentSlideIdx = this.getNextSlideIdx();
        this._transitionHandler($currentItem, $nextItem);
    }
    /**
     * @name        previous
     * @type    Function
     *
     * Go to the previous slide
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    previous() {
        const $previousItem = this.getPreviousSlideItem();
        const $currentItem = this.getCurrentSlideElement();
        this._currentSlideIdx = this.getPreviousSlideIdx();
        this._transitionHandler($currentItem, $previousItem);
    }
    /**
     * Function that is in charge of making the transition happend.
     * It will use the setted behavior if this one support custom transition,
     * of simply changing the current slide.
     */
    _transitionHandler($from, $to) {
        const $slideableItem = this.$root.children[0];
        const translates = __getTranslateProperties($slideableItem);
        if (this.props.transitionHandler) {
            this.props.transitionHandler($from, $to);
            return;
        }
        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds = this.$root.getBoundingClientRect();
        const deltaX = nextBounds.left - sliderBounds.left, deltaY = nextBounds.top;
        __easeInterval(this.props.transitionDuration, (percent) => {
            if (this.props.direction === 'horizontal') {
                const computedDelta = translates.x + (deltaX / 100 * percent) * -1;
                $slideableItem.style.transform = `translateX(${computedDelta}px)`;
            }
            else {
                const computedDelta = translates.y + (deltaY * -1 / 100 * percent) * -1;
                $slideableItem.style.transform = `translateY(${computedDelta}px)`;
            }
        }, {
            easing: this.props.transitionEasing
        });
        this.requestUpdate();
    }
    // _handleScroll() {
    //     // handle scroll
    //     this.$root.addEventListener('scroll', (e) => {
    //         let scrollTop = e.target.scrollTop;
    //         let scrollLeft = e.target.scrollLeft;
    //         let elmWidth = e.target.offsetWidth,
    //             elmHeight = e.target.offsetHeight;
    //         const fullWidth = elmWidth * this.$slides.length,
    //             fullHeight = elmHeight * this.$slides.length;
    //         const scrollXPercent = 100 / fullWidth * (scrollLeft + elmWidth),
    //             scrollYPercent = 100 / fullHeight * (scrollTop + elmHeight);
    //         this._scrollXPercent = scrollXPercent;
    //         this._scrollYPercent = scrollYPercent;
    //         if (this.props.direction === 'horizontal') {
    //             this._currentPageIdx = Math.round(scrollXPercent / 100 * this.$slides.length) - 1;
    //             this._currentSlideIdx = Math.round(this.props.itemsByPage * this._currentPageIdx);
    //         } else if (this.props.direction === 'vertical') {
    //             this._currentPageIdx = Math.round(scrollYPercent / 100 * this.$slides.length) - 1;
    //             this._currentSlideIdx = Math.round(this.props.itemsByPage * this._currentPageIdx);
    //         }
    //         this.requestUpdate();
    //     });
    // }
    render() {
        var _a, _b;
        return html `
            <div class="${this.componentUtils.className('')}"
                behavior="${(_b = (_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.id}"
                style="
                    --s-slider-block-reveal: ${this.props.sideReveal};
                    --s-slider-page: ${this.currentPageIdx};
                    --s-slider-item: ${this.currentSlideIdx};
                    --s-slider-total: ${this.$slides.length};
                "
            >
                    <div class="${this.componentUtils.className('__slides')}"></div>
            </div>
        `;
    }
}
/**
 * @name            webcomponent
 * @type            Function
 *
 * This function allows you to define (register) your webcomponent with some default
 * props if needed.
 *
 * @param           {any}           [props={}]              Some default props you want to set for your webcomponent
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export function define(props = {}, tagName = 's-slider') {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSlider);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUlkLE9BQU8sZUFFTixNQUFNLCtCQUErQixDQUFDO0FBRXZDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQyxPQUFPLEtBQUssTUFBTSwrQkFBK0IsQ0FBQztBQUNsRCxPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sd0JBQXdCLE1BQU0seURBQXlELENBQUM7QUFDL0YsT0FBTyxjQUFjLE1BQU0sa0RBQWtELENBQUM7QUEyQzlFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLGVBQWU7SUFxQmhEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsMkJBQTJCO2FBQ3pDO1NBQ0osQ0FBQyxDQUNMLENBQUM7UUFqQk4sWUFBTyxHQUFrQixFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFHMUIsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBYXJCLENBQUM7SUEvQkQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDO2tCQUNOLEtBQUs7YUFDVixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUFzQkssWUFBWTs7O1lBRWQsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV6RSxPQUFPO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTO1lBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekIscUJBQXFCO2dCQUNyQixLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCw4QkFBOEI7Z0JBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxtQkFBbUI7WUFDbkIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUM3QixNQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsRUFBQyxZQUFZLGtEQUFJLENBQUM7YUFDbEM7O0tBcUJKO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLGNBQWM7UUFDZCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGtCQUFrQixDQUFDLEdBQVc7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxlQUFlO1FBQ2YsT0FBTyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILHNCQUFzQjtRQUNsQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGVBQWU7UUFDWCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLElBQUksWUFBWSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUM1RSxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILG1CQUFtQjtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsbUJBQW1CO1FBQ2YsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ25ELElBQUksZ0JBQWdCLElBQUksQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILHVCQUF1QjtRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLGlCQUFpQjtRQUNqQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksQ0FBQyxRQUFnQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFBRSxPQUFPO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUk7UUFDQSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM3QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsUUFBUTtRQUNKLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQ2xELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsa0JBQWtCLENBQUMsS0FBSyxFQUFFLEdBQUc7UUFFekIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsd0JBQXdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFNUQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE9BQU87U0FDVjtRQUVELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQy9DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUV4RCxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQzlDLE1BQU0sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBRTVCLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDdEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLEVBQUU7Z0JBQ3ZDLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLGFBQWEsS0FBSyxDQUFDO2FBQ3JFO2lCQUFNO2dCQUNILE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLGFBQWEsS0FBSyxDQUFDO2FBQ3JFO1FBRUwsQ0FBQyxFQUFFO1lBQ0MsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO1NBQ3RDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0Qsb0JBQW9CO0lBQ3BCLHVCQUF1QjtJQUN2QixxREFBcUQ7SUFDckQsOENBQThDO0lBQzlDLGdEQUFnRDtJQUVoRCwrQ0FBK0M7SUFDL0MsaURBQWlEO0lBRWpELDREQUE0RDtJQUM1RCw0REFBNEQ7SUFFNUQsNEVBQTRFO0lBQzVFLDJFQUEyRTtJQUUzRSxpREFBaUQ7SUFDakQsaURBQWlEO0lBRWpELHVEQUF1RDtJQUN2RCxpR0FBaUc7SUFDakcsaUdBQWlHO0lBQ2pHLDREQUE0RDtJQUM1RCxpR0FBaUc7SUFDakcsaUdBQWlHO0lBQ2pHLFlBQVk7SUFDWixnQ0FBZ0M7SUFDaEMsVUFBVTtJQUNWLElBQUk7SUFDSixNQUFNOztRQUNGLE9BQU8sSUFBSSxDQUFBOzBCQUNPLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNuQyxFQUFFLENBQ0w7NEJBQ1csTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSwwQ0FBRSxXQUFXLDBDQUFFLEVBQUU7OytDQUVqQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7dUNBQzdCLElBQUksQ0FBQyxjQUFjO3VDQUNuQixJQUFJLENBQUMsZUFBZTt3Q0FDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNOzs7a0NBR3pCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzs7U0FFbEUsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBeUMsRUFBRSxFQUMzQyxPQUFPLEdBQUcsVUFBVTtJQUVwQixlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFDIn0=