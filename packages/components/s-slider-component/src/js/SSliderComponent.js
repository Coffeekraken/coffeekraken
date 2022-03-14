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
import __SInterface from '@coffeekraken/s-interface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __parse from '@coffeekraken/sugar/shared/string/parse';
export default class SSlider extends __SLitComponent {
    constructor() {
        var _a, _b;
        super(__deepMerge({
            litComponent: {
                shadowDom: false,
            },
            componentUtils: {
                interface: __SInterface.mix(__SSliderComponentInterface, (_b = (_a = __SComponentUtils.getDefaultProps('s-slider').behavior) === null || _a === void 0 ? void 0 : _a.interface) !== null && _b !== void 0 ? _b : {}),
            },
        }));
        this.$slides = [];
        this.$navs = [];
        this._currentPageIdx = 0;
        this._currentSlideIdx = 0;
    }
    static get properties() {
        var _a, _b;
        return __SLitComponent.properties({}, __SInterface.mix(__SSliderComponentInterface, (_b = (_a = __SComponentUtils.getDefaultProps('s-slider').behavior) === null || _a === void 0 ? void 0 : _a.interface) !== null && _b !== void 0 ? _b : {}));
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
            // slides
            this.$slidesWrapper = this.querySelector(`.${this.componentUtils.className('__slides-wrapper')}`);
            this.$slidesContainer = this.querySelector(`.${this.componentUtils.className('__slides')}`);
            this.$slides = this.querySelectorAll('[s-slider-slide]');
            this.$slides.forEach($item => {
                // add the item class
                $item.classList.add(this.componentUtils.className('__slide'));
            });
            // handle navigation
            this._initNavigation();
            // default behavior
            if (this.props.behavior) {
                this.behavior = new this.props.behavior({});
                this.behavior.$slider = this;
                (_b = (_a = this.behavior).firstUpdated) === null || _b === void 0 ? void 0 : _b.call(_a);
            }
            // listen for intersections
            this.props.intersectionClasses && this._handleIntersections();
        });
    }
    /**
     * This function will get the HTMLElement that are tagged with the "s-slide-nav" attribute.
     * If the element has no value, it will be treated as a container and will be filled with HTMLElements that will be the actual
     * navigation items.
     * If the element has a value, it will be treated as a navigation item and will go to the corresponding slide on click.
     */
    _initNavigation() {
        // navs
        this.$navs = this.querySelectorAll('[s-slider-nav]');
        if (!this.$navs.length) {
            Array(this.$slides.length).fill().forEach((v, i) => {
                const $nav = document.createElement('div');
                $nav.setAttribute('s-slider-nav', i);
                this.appendChild($nav);
            });
            // navs
            this.$navs = this.querySelectorAll('[s-slider-nav]');
        }
        this.requestUpdate();
    }
    /**
     * This function listen for intersection changes on slides and apply classes depending on this
     */
    _handleIntersections() {
        var _a;
        (_a = this.$slides) === null || _a === void 0 ? void 0 : _a.forEach($slide => {
            function buildThresholdList() {
                let thresholds = [];
                let numSteps = 10;
                for (let i = 1.0; i <= numSteps; i++) {
                    let ratio = i / numSteps;
                    thresholds.push(ratio);
                }
                thresholds.push(0);
                return thresholds;
            }
            function handleIntersect(entries, observer) {
                let highestRatio = 0;
                entries.forEach((entry) => {
                    if (entry.intersectionRatio > highestRatio) {
                        highestRatio = entry.intersectionRatio;
                    }
                });
                [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].forEach((threshold, idx) => {
                    if (highestRatio >= threshold) {
                        $slide.classList.add(`in-${threshold * 100}`);
                    }
                    else {
                        $slide.classList.remove(`in-${threshold * 100}`);
                    }
                });
            }
            let observer;
            let options = {
                root: this.$root,
                rootMargin: "0px",
                threshold: buildThresholdList()
            };
            observer = new IntersectionObserver(handleIntersect, options);
            observer.observe($slide);
        });
    }
    /**
     * This function is just to dispatch event easier with just the name and the details you want...
     */
    _dispatch(name, detail = {}) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
    }
    /**
     * This function simply apply the current state of the slider
     */
    requestUpdate() {
        var _a;
        super.requestUpdate();
        // update slides classes
        (_a = this.$slides) === null || _a === void 0 ? void 0 : _a.forEach(($slide, i) => {
            if (i === this.currentSlideIdx)
                $slide.classList.add('active');
            else
                $slide.classList.remove('active');
        });
    }
    /**
     * @name        isLast
     * @type        Function
     *
     * This method allows you to check if the actual slide is the last one
     *
     * @return      {Boolean}           true if the actual slide is the last one, false otherwise
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isLast() {
        return this.currentSlideIdx >= this.$slides.length - 1;
    }
    /**
     * @name        isFirst
     * @type        Function
     *
     * This method allows you to check if the actual slide is the first one
     *
     * @return      {Boolean}           true if the actual slide is the first one, false otherwise
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isFirst() {
        return this.currentSlideIdx <= 0;
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
     * @name        setCurrentSlideByIdx
     * @type    Function
     *
     * Set the current slide idx.
     *
     * @param       {Number}        idx         The current slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setCurrentSlideByIdx(idx) {
        this._currentSlideIdx = idx;
        this.requestUpdate();
    }
    /**
    * @name       setCurrentSlide
    * @type        Function
    *
    * This method allows you to get the current clide using an id or an idx.
    *
    * @param       {String|Number|HTMLElement}    idIdxOrElement    The slide id or idx or the slide HTMLElement
    * @return      {SSLiderComponent}              The slider component to maintain chainability
    *
    * @since       2.0.0
    * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
    setCurrentSlide(idIdxOrElement) {
        const slide = this.getSlide(idIdxOrElement);
        this.setCurrentSlideByIdx(slide.idx);
        return this;
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
     * @name        getSlideIdxById
     * @type        Function
     *
     * This method allows you to get back the slide idx by its id.
     *
     * @param       {String}    id     The slide id
     * @return      {Number}        The slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSlideIdxById(id) {
        for (let i = 0; i < this.$slides.length; i++) {
            if (this.$slides[i].getAttribute('s-slider-slide') === id)
                return i;
        }
    }
    /**
     * @name        getSlideElementByIdx
     * @type        Function
     *
     * This method allows you to get back a slide HTMLElement by its index.
     *
     * @param       {Number}    idx    The slide idx
     * @return      {HTMLElement}        The slide HTMLElement
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSlideElementByIdx(idx) {
        return this.$slides[idx];
    }
    /**
     * @name        getCurrentSlide
     * @type        Function
     *
     * This method allows you to get back the current slide object <ISSlideComponentSlide> either by it's id, or by it's idx.
     *
     * @return      {ISSlideComponentSlide}        The slide object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getCurrentSlide() {
        return this.getSlide(this.currentSlideIdx);
    }
    /**
     * @name        getSlide
     * @type        Function
     *
     * This method allows you to get back a slide object <ISSlideComponentSlide> either by it's id, or by it's idx.
     *
     * @param       {String|Number}    idIdxOrElement    The slide id or idx
     * @return      {ISSlideComponentSlide}        The slide object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSlide(idIdxOrElement) {
        let $slide, id, idx;
        if (idIdxOrElement instanceof HTMLElement) {
            const id = idIdxOrElement.getAttribute('s-slider-slide');
            return this.getSlide(id);
        }
        else if (typeof idIdxOrElement === 'number') {
            idx = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
            id = $slide.getAttribute('s-slider-slide');
        }
        else if (typeof idIdxOrElement === 'string') {
            idx = this.getSlideIdxById(idIdxOrElement);
            id = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
        }
        if (!$slide)
            return;
        return {
            id,
            idx,
            $slide
        };
    }
    /**
     * @name        goTo
     * @type    Function
     *
     * Go to a specific slide.
     *
     * @param       {Number|String}    slideIdIdxOrElement    The slide idx, id or HTMLElement to go to
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    goTo(slideIdIdxOrElement) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextSlide = this.getSlide(slideIdIdxOrElement);
            if (!nextSlide)
                return;
            const currentSlide = this.getCurrentSlide();
            this._currentSlideIdx = nextSlide.idx;
            this._dispatch('s-slider-goto', {
                currentSlide,
                nextSlide
            });
            yield this._transitionHandler(currentSlide.$side, nextSlide.$slide);
            this._dispatch('s-slider-goto-end', {
                currentSlide,
                nextSlide
            });
            return this;
        });
    }
    /**
     * @name        next
     * @type    Function
     *
     * Go to the next slide
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    next() {
        return this.goTo(this.nextSlideIdx);
    }
    /**
     * @name        previous
     * @type    Function
     *
     * Go to the previous slide
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    previous() {
        return this.goTo(this.getPreviousSlideIdx());
    }
    /**
     * Function that is in charge of making the transition happend.
     * It will use the setted behavior if this one support custom transition,
     * of simply changing the current slide.
     */
    _transitionHandler($from, $to) {
        const $slideableItem = this.$slidesWrapper.children[0];
        const translates = __getTranslateProperties($slideableItem);
        if (this.props.transitionHandler) {
            this.props.transitionHandler($from, $to);
            return;
        }
        const nextBounds = $to.getBoundingClientRect();
        const sliderBounds = this.$slidesWrapper.getBoundingClientRect();
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
        var _a;
        return html `
            <div class="${this.componentUtils.className('')}"
                behavior="${(_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.id}"
                style="
                    --s-slider-block-reveal: ${this.props.sideReveal};
                    --s-slider-page: ${this.currentPageIdx};
                    --s-slider-item: ${this.currentSlideIdx};
                    --s-slider-total: ${this.$slides.length};
                "
            >
                    <div class="${this.componentUtils.className('__slides-wrapper')}">
                        <div class="${this.componentUtils.className('__slides')}">
                            ${Array.from(this.$slides).map(($slide, idx) => {
            return $slide;
        })}
                        </div>
                    </div>
                    <div class="${this.componentUtils.className('__nav')}">
                        ${Array.from(this.$navs).map(($nav, idx) => {
            if (!$nav._navInited) {
                $nav.addEventListener('click', e => {
                    var _a;
                    e.preventDefault();
                    this.goTo((_a = __parse(e.target.getAttribute('s-slider-nav'))) !== null && _a !== void 0 ? _a : idx);
                });
                $nav._navInited = true;
            }
            if ($nav.getAttribute('s-slider-nav')) {
                if ($nav.getAttribute('s-slider-nav') === this.getCurrentSlide().id)
                    $nav.classList.add('active');
                else
                    $nav.classList.remove('active');
            }
            else {
                if (this.currentSlideIdx === idx)
                    $nav.classList.add('active');
                else
                    $nav.classList.remove('active');
            }
            return $nav;
        })}
                    </div>
                    ${this.props.controls ? html `
                        <div class="${this.componentUtils.className('__controls')}">
                            <div class="${this.componentUtils.className('__controls-previous')} ${this.isFirst() ? '' : 'active'}" @click=${() => this.previous()}>
                                ${this.props.previousIconClass ? html `
                                    <i class="${this.props.previousIconClass}"></i>
                                ` : html `<div class="${this.componentUtils.className('__controls-previous-arrow')}"></div>`}
                            </div>
                            <div class="${this.componentUtils.className('__controls-next')} ${this.isLast() ? '' : 'active'}" @click=${() => this.next()}>
                                ${this.props.nextIconClass ? html `
                                    <i class="${this.props.nextIconClass}"></i>
                                ` : html `<div class="${this.componentUtils.className('__controls-next-arrow')}"></div>`}
                            </div>
                        </div>
                    ` : ''}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1NsaWRlckNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTbGlkZXJDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUlkLE9BQU8sZUFFTixNQUFNLCtCQUErQixDQUFDO0FBQ3ZDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNDLE9BQU8sS0FBSyxNQUFNLCtCQUErQixDQUFDO0FBQ2xELE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyx3QkFBd0IsTUFBTSx5REFBeUQsQ0FBQztBQUMvRixPQUFPLGNBQWMsTUFBTSxrREFBa0QsQ0FBQztBQUM5RSxPQUFPLE9BQU8sTUFBTSx5Q0FBeUMsQ0FBQztBQW1EOUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxPQUFRLFNBQVEsZUFBZTtJQXNCaEQ7O1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtZQUNELGNBQWMsRUFBRTtnQkFDWixTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxNQUFBLE1BQUEsaUJBQWlCLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsMENBQUUsU0FBUyxtQ0FBSSxFQUFFLENBQUM7YUFDcEk7U0FDSixDQUFDLENBQ0wsQ0FBQztRQWpCTixZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUM1QixVQUFLLEdBQWtCLEVBQUUsQ0FBQztRQUcxQixvQkFBZSxHQUFHLENBQUMsQ0FBQztRQUNwQixxQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFhckIsQ0FB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