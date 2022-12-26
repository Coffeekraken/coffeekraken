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
import { __onSwipe } from '@coffeekraken/sugar/dom';
import { __isClass } from '@coffeekraken/sugar/is';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { css, html, unsafeCSS } from 'lit';
// @ts-ignore
import { __querySelectorLive, __querySelectorUp, } from '@coffeekraken/sugar/dom';
import { __uniqid } from '@coffeekraken/sugar/string';
import __css from '../../../../src/css/s-slider-component.css'; // relative to /dist/pkg/esm/js
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __scrollBehavior from './behaviors/scrollBehavior';
export default class SSliderComponent extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-slider',
            interface: __SSliderComponentInterface,
        }));
        this._timer = {
            total: 0,
            current: 0,
            percentage: 0,
        };
        /**
         * @name            getBehavior
         * @type            Function
         *
         * This method allows you to get the behavior object with all his functions binded
         * to this current slider instance
         *
         * @since       2.0.0
         * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._bindedBehaviors = {};
    }
    static get properties() {
        return __SLitComponent.propertiesFromInterface({}, __SSliderComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    static get state() {
        return {
            currentPage: 0,
            previousSlideIdx: 0,
            currentSlideIdx: 0,
            playing: true,
        };
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // register "built-in" behaviors
            this.props.behaviors.scroll = __scrollBehavior;
            // assign a uniqid if not already setted
            if (!this.id) {
                this.setAttribute('id', `s-slider-${__uniqid()}`);
            }
            this.$slides = Array.from(this.querySelectorAll(`[s-slider-slide],s-slider-slide`)).filter(($slide) => {
                const $parentSlider = __querySelectorUp($slide, '.s-slider');
                if (!$parentSlider || $parentSlider === this) {
                    $slide.classList.add(...this.componentUtils.className('__slide').split(' '));
                    return true;
                }
                return false;
            });
            // set the initial slide idx from properties
            if (this.props.slide) {
                this.setCurrentSlide(this.props.slide);
            }
            // listen for resizing and apply things like pad, etc...
            let resizeTimeout;
            window.addEventListener('resize', (e) => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    // pad
                    yield this.applyPad();
                    // transition to current slide again
                    this.goTo(this.getCurrentSlideIdx(), true);
                }), 200);
            });
        });
    }
    firstUpdated() {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            // bare elements
            this.$root = this.querySelector(`.${this.componentUtils.uniqueClassName('__root')}`);
            // slides
            this.$slidesWrapper = this.querySelector(`.${this.componentUtils.uniqueClassName('__slides-wrapper')}:not(s-slider#${this.id} s-slider .${this.componentUtils.uniqueClassName('__slides-wrapper')})`);
            this.$slidesContainer = this.querySelector(`.${this.componentUtils.uniqueClassName('__slides')}:not(s-slider#${this.id} s-slider .${this.componentUtils.uniqueClassName('__slides')})`);
            // default behavior
            if (this.props.behavior &&
                this.props.behavior !== 'scroll' &&
                this.props.behavior !== 'transform') {
                if (typeof this.props.behavior === 'string') {
                    let behavior;
                    for (let [behaviorId, behaviorObj] of Object.entries(this.props.behaviors)) {
                        const id = (_b = (_a = behaviorObj.class) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : behaviorObj.id;
                        if (id === this.props.behavior) {
                            behavior = behaviorObj;
                            break;
                        }
                    }
                    if (!behavior) {
                        throw new Error(`The behavior "${this.props.behavior}" is not available`);
                    }
                    if (!behavior.class) {
                        throw new Error(`The behavior "${this.props.behavior}" is not valid. You must provide the "<yellow>class</yellow>" property and an optional "<yellow>settings</yellow>" one...`);
                    }
                    this.behavior = new behavior.class((_c = behavior.settings) !== null && _c !== void 0 ? _c : {});
                }
                else if (__isClass(this.props.behavior)) {
                    this.behavior = new this.props.behavior({});
                }
                else if (this.props.behavior instanceof __SSliderBehavior) {
                    this.behavior = this.props.behavior;
                }
                else {
                    throw new Error(`Invalid behavior type, must be a string, an SSliderBehavior extended class or an SSliderBehavior instance`);
                }
                (_e = (_d = this.behavior).firstUpdated) === null || _e === void 0 ? void 0 : _e.call(_d);
            }
            // setup through behavior
            yield ((_g = (_f = this.getBehavior()).setup) === null || _g === void 0 ? void 0 : _g.call(_f));
            // pad
            this.applyPad();
            // prevent user scroll for default behavior
            this._preventUserScrollForDefaultBehavior();
            // listen for intersections
            this.props.intersectionClasses && this._handleIntersections();
            // listen for mousewheel
            this._handleMousewheel();
            // click on slide
            this.props.clickOnSlide && this._handleClickOnSlide();
            // swipe
            this.props.swipe && this._handleSwipe();
            // actions
            this._initAttributesActions();
            // go to first slide
            this.goTo(this.props.slide, true);
            // timer
            if (this.props.autoplay && this.props.timer) {
                this.play();
            }
        });
    }
    /**
     * @name        applyPad
     * @type        Function
     * @async
     *
     * This method apply the "pad" start and end on the slides wrapper
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    applyPad() {
        return __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                // pad through behavior
                if (this.getBehavior().pad) {
                    yield this.getBehavior().pad();
                }
                else {
                    yield this._pad();
                }
            }), 20);
        });
    }
    /**
     * Default pad function if not specified in the behavior
     */
    _pad() {
        const sliderRect = this.getBoundingClientRect(), firstPageRect = this.getFirstPageRect(), lastPageRect = this.getLastPageRect();
        let padStart = 0, padEnd = 0;
        // different calculation depending on direction
        if (this.props.direction === 'vertical') {
            // calculate padStart
            padStart = (sliderRect.height - firstPageRect.height) * 0.5;
            padEnd = (sliderRect.height - lastPageRect.height) * 0.5;
        }
        else {
            // calculate padStart
            padStart = (sliderRect.width - firstPageRect.width) * 0.5;
            padEnd = (sliderRect.width - lastPageRect.width) * 0.5;
        }
        // set the css property
        this.style.setProperty('--s-slider-pad-start', `${Math.round(padStart)}px`);
        this.style.setProperty('--s-slider-pad-end', `${Math.round(padEnd)}px`);
    }
    /**
     * This function init the swipe listener to pass from slides to slides
     */
    _handleSwipe() {
        __onSwipe(this.$root, (swipe) => {
            if (this.props.direction === 'horizontal') {
                if (swipe.left) {
                    this.next();
                }
                else if (swipe.right) {
                    this.previous();
                }
            }
            else if (this.props.direction === 'vertical') {
                if (swipe.top) {
                    this.next();
                }
                else if (swipe.down) {
                    this.previous();
                }
            }
        });
    }
    /**
     * This function prevent user scroll when using the "default" behavior
     */
    _preventUserScrollForDefaultBehavior() {
        return;
        // default
        if (this.props.behavior === 'scroll') {
            // prevent scroll and touchmove events
            let pastScrollLeft = this.$slidesWrapper.scrollLeft, pastScrollTop = this.$slidesWrapper.scrollTop;
            ['mousewheel', 'touchmove'].forEach((eventName) => {
                this.$slidesWrapper.addEventListener(eventName, (e) => {
                    if (this.props.direction === 'vertical') {
                        const currentScrollTop = e.currentTarget.scrollTop;
                    }
                    else {
                        const currentScrollLeft = e.currentTarget.scrollLeft;
                        console.log('c', currentScrollLeft, pastScrollLeft);
                        if (currentScrollLeft !== pastScrollLeft) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                        pastScrollLeft = currentScrollLeft;
                    }
                });
            });
        }
    }
    /**
     * This function listen for mousewheel events and will handle the scroll
     */
    _handleMousewheel() {
        this.$slidesWrapper.addEventListener('wheel', (e) => {
            if (!this.props.mousewheel) {
                if (this.props.direction === 'horizontal' &&
                    Math.abs(e.deltaX) > 0) {
                    e.preventDefault();
                }
                else if (this.props.direction === 'vertical' &&
                    Math.abs(e.deltaY) > 0) {
                    e.preventDefault();
                }
            }
            // if (e.deltaY < 0) {
            //     this.previous();
            // } else if (e.deltaY > 0) {
            //     this.next();
            // }
        });
    }
    /**
     * This function listen for click on slides and navigate to it
     */
    _handleClickOnSlide() {
        this.$slidesContainer.addEventListener('pointerup', (e) => {
            for (let [i, $slide] of this.$slides.entries()) {
                if ($slide.contains(e.target) || $slide === e.target) {
                    if (this.currentSlide !== $slide) {
                        const slide = this.getSlide($slide);
                        this.goTo(slide.idx);
                    }
                }
            }
        });
    }
    /**
     * This function listen for intersection changes on slides and apply classes depending on this
     */
    _handleIntersections() {
        var _a;
        (_a = this.$slides) === null || _a === void 0 ? void 0 : _a.forEach(($slide) => {
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
                rootMargin: '0px',
                threshold: buildThresholdList(),
            };
            observer = new IntersectionObserver(handleIntersect, options);
            observer.observe($slide);
        });
    }
    /**
     * This function grab the elements that have attributes like "s-slider-next", "s-slider-previous", "s-slider-goto", etc...
     * and init them to process the action
     */
    _initAttributesActions() {
        // next/previous
        ['next', 'previous'].forEach((action) => {
            __querySelectorLive(`[s-slider-${action}]:not(s-slider#${this.id} s-slider [s-slider-${action}])`, ($elm) => {
                $elm.addEventListener('pointerup', (e) => {
                    e.preventDefault();
                    this[action](true);
                });
            }, {
                scopes: false,
                rootNode: this,
            });
        });
        // goto
        __querySelectorLive(`[s-slider-goto]:not(s-slider#${this.id} .s-slider [s-slider-goto])`, ($elm) => {
            $elm.addEventListener('pointerup', (e) => {
                var _a;
                const slideIdx = (_a = parseInt($elm.getAttribute('s-slider-goto'))) !== null && _a !== void 0 ? _a : 0;
                this.goTo(slideIdx, true);
            });
        }, {
            scopes: false,
            rootNode: this,
        });
    }
    /**
     * This function is just to dispatch event easier with just the name and the details you want...
     */
    _dispatch(name, detail = {}) {
        this.componentUtils.dispatchEvent(name, {
            detail,
        });
    }
    /**
     * @name        isSlideInPage
     * @type        Function
     *
     * This method allows you to check if the passed slide is in the current "page" or not
     *
     * @param       {String|HTMLElement}        slide           A slide idx of the slide element
     * @param       {Number}                [page=this.state.currentPage]       The page to check the slide against
     * @return      {Boolean}           true if the actual slide is the last one, false otherwise
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isSlideInPage(slide, page = this.state.currentPage) {
        const slideObj = this.getSlide(slide);
        return (slideObj.idx >= page * this.props.slidesByPage &&
            slideObj.idx < (page + 1) * this.props.slidesByPage);
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
        return this.state.currentSlideIdx >= this.$slides.length - 1;
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
        return this.state.currentSlideIdx <= 0;
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
        return this.state.currentSlideIdx;
    }
    /**
     * @name        setCurrentSlideByIdx
     * @type    Function
     *
     * Set the current slide idx.
     *
     * @param       {Number}        idx         The current slide idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    setCurrentSlideByIdx(idx) {
        // prevent from setting the same slide that the current one
        if (idx === this.state.currentSlideIdx) {
            return;
        }
        // save the previous slide idx
        this.state.previousSlideIdx = this.state.currentSlideIdx;
        // set the new slide idx
        this.props.slide = idx;
        this.state.currentSlideIdx = idx;
        // update the current page
        this.state.currentPage = Math.ceil(idx / this.props.slidesByPage);
        // update the slides classes
        this.updateSlidesClasses();
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
        return this.$slides[this.state.currentSlideIdx];
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
        const nextSlideIdx = this.state.currentSlideIdx + 1;
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
        const previousSlideIdx = this.state.currentSlideIdx - 1;
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
     * This method allows you to get back the current slide object <ISSliderComponentSlide> either by it's id, or by it's idx.
     *
     * @return      {ISSliderComponentSlide}        The slide object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getCurrentSlide() {
        return this.getSlide(this.state.currentSlideIdx);
    }
    /**
     * @name            currentSlide
     * @type            ISSliderComponentSlide
     *
     * Access the current slide object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get currentSlide() {
        return this.getCurrentSlide();
    }
    /**
     * @name            getLastPage
     * @type            Function
     *
     * Get the last page idx
     *
     * @return      {Number}            The last page idx
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getLastPage() {
        return Math.ceil(this.$slides.length / this.props.slidesByPage) - 1;
    }
    /**
     * @name        getFirstPageSlides
     * @type        Function
     *
     * This method allows you to get all first page slides.
     *
     * @return      {ISSliderComponentSlide[]}          An array of slides
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getFirstPageSlides() {
        return this.getPageSlides(0);
    }
    /**
     * @name        getLastPageSlides
     * @type        Function
     *
     * This method allows you to get all last page slides.
     *
     * @return      {ISSliderComponentSlide[]}          An array of slides
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getLastPageSlides() {
        return this.getPageSlides(this.getLastPage());
    }
    /**
     * @name        getPageRect
     * @type        Function
     *
     * This method allows you to get a page rect just like the getBoundingClientRect native function
     *
     * @param       {Number}               [pageOrSlideElement=this.state.currentPage]        The page you want the rect object from
     * @return      {ISSliderPageRect}          The page rect object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getPageRect(pageOrSlideElement = this.state.currentPage) {
        let page = pageOrSlideElement;
        // if the passed page parameter is an HTMLElement
        if (pageOrSlideElement instanceof HTMLElement) {
            const slide = this.getSlide(pageOrSlideElement);
            page = slide.page;
        }
        // get the slides of the page
        const slides = this.getPageSlides(page);
        const rect = {
            top: -1,
            left: -1,
            right: -1,
            bottom: -1,
            width: -1,
            height: -1,
            x: -1,
            y: -1,
        };
        slides.forEach((slide) => {
            const slideRect = slide.$slide.getBoundingClientRect();
            if (rect.top === -1 || slideRect.top < rect.top) {
                rect.top = slideRect.top;
            }
            if (rect.left === -1 || slideRect.left < rect.left) {
                rect.left = slideRect.left;
            }
            if (rect.right === -1 || slideRect.right > rect.right) {
                rect.right = slideRect.right;
            }
            if (rect.bottom === -1 || slideRect.bottom > rect.bottom) {
                rect.bottom = slideRect.bottom;
            }
        });
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
        rect.x = rect.left;
        rect.y = rect.top;
        return rect;
    }
    /**
     * @name        getFirstPageRect
     * @type        Function
     *
     * This method allows you to get the first page rect just like the getBoundingClientRect native function
     *
     * @return      {ISSliderPageRect}          The page rect object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getFirstPageRect() {
        return this.getPageRect(0);
    }
    /**
     * @name        getLastPageRect
     * @type        Function
     *
     * This method allows you to get the last page rect just like the getBoundingClientRect native function
     *
     * @return      {ISSliderPageRect}          The page rect object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getLastPageRect() {
        return this.getPageRect(this.getLastPage());
    }
    /**
     * @name        getPageSlides
     * @type        Function
     *
     * This method allows you to get all the slides in a particular "page".
     *
     * @param       {Number}        page        The page you want to get slides from
     * @return      {ISSliderComponentSlide[]}          An array of slides
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getPageSlides(page) {
        const slides = [];
        for (let i = page * this.props.slidesByPage; i < (page + 1) * this.props.slidesByPage; i++) {
            if (i < this.$slides.length) {
                slides.push(this.getSlide(i));
            }
        }
        return slides;
    }
    /**
     * @name        getSlide
     * @type        Function
     *
     * This method allows you to get back a slide object <ISSliderComponentSlide> either by it's id, or by it's idx.
     *
     * @param       {String|Number}    idIdxOrElement    The slide id or idx
     * @return      {ISSliderComponentSlide}        The slide object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getSlide(idIdxOrElement) {
        var _a, _b;
        let $slide, id, idx, timer;
        if (idIdxOrElement instanceof HTMLElement) {
            const id = idIdxOrElement.getAttribute('s-slider-slide');
            if (id)
                return this.getSlide(id);
            return this.getSlide(Array.from(this.$slides).indexOf(idIdxOrElement));
        }
        else if (typeof idIdxOrElement === 'number') {
            idx = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
            id = $slide.getAttribute('s-slider-slide');
            timer = $slide._sSliderComponentTimer;
            if (!timer) {
                timer = {
                    total: (_a = $slide.getAttribute('timer')) !== null && _a !== void 0 ? _a : this.props.timer,
                    current: 0,
                    percentage: 0,
                };
                $slide._sSliderComponentTimer = timer;
            }
        }
        else if (typeof idIdxOrElement === 'string') {
            idx = this.getSlideIdxById(idIdxOrElement);
            id = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
            timer = $slide._sSliderComponentTimer;
            if (!timer) {
                timer = {
                    total: (_b = $slide.getAttribute('timer')) !== null && _b !== void 0 ? _b : this.props.timer,
                    current: 0,
                    percentage: 0,
                };
                $slide._sSliderComponentTimer = timer;
            }
        }
        if (!$slide)
            return;
        return {
            id,
            idx,
            page: Math.ceil(idx / this.props.slidesByPage),
            $slide,
            timer,
        };
    }
    /**
     * @name            getFirstSlide
     * @type           Function
     *
     * This method allows you to get the first slide of the slider
     *
     * @return      {ISSliderComponentSlide}       The first slide object
     *
     * @since      2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getFirstSlide() {
        return this.getSlide(0);
    }
    /**
     * @name            getLastSlide
     * @type           Function
     *
     * This method allows you to get the last slide of the slider
     *
     * @return      {ISSliderComponentSlide}       The last slide object
     *
     * @since      2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getLastSlide() {
        return this.getSlide(this.$slides.length - 1);
    }
    getBehavior() {
        if (this._bindedBehaviors[this.props.behavior]) {
            return this._bindedBehaviors[this.props.behavior];
        }
        const behavior = Object.assign({}, this.props.behaviors[this.props.behavior]);
        if (!behavior) {
            throw new Error(`[SSliderComponent] The requested "${this.props.behavior}" does not exists. Here's the available ones:\n${Object.keys(this.props.behaviors).map((b) => `\n- ${b}`)}`);
        }
        Object.keys(behavior).forEach((fnName) => {
            if (typeof behavior[fnName] === 'function') {
                behavior[fnName] = behavior[fnName].bind(this);
            }
        });
        this._bindedBehaviors[this.props.behavior] = behavior;
        return behavior;
    }
    /**
     * @name        updateSlidesClasses
     * @type        Function
     *
     * This method allows you to update the slides "active" class accordingly to the
     * slider state. This can be used inside of a custom behavior for example.
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    updateSlidesClasses() {
        const currentSlide = this.getCurrentSlide();
        this.$slides.forEach(($slide, i) => {
            // multiple slides by page
            if (this.props.slidesByPage > 1 && this.isSlideInPage($slide)) {
                $slide.classList.add('active');
            }
            else if ($slide === currentSlide.$slide) {
                $slide.classList.add('active');
            }
            else {
                $slide.classList.remove('active');
            }
        });
    }
    /**
     * @name        goTo
     * @type    Function
     *
     * Go to a specific slide.
     *
     * @param       {Number|String}    slideIdIdxOrElement    The slide idx, id or HTMLElement to go to
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    goTo(slideIdIdxOrElement, force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextSlide = this.getSlide(slideIdIdxOrElement);
            if (!force && (!nextSlide || nextSlide.idx === this.currentSlide.idx)) {
                return;
            }
            const currentSlide = this.getCurrentSlide();
            this.setCurrentSlideByIdx(nextSlide.idx);
            this.props.slide = nextSlide.idx;
            if (currentSlide.idx + 1 === nextSlide.idx) {
                this._dispatch('next', {
                    currentSlide,
                    nextSlide,
                });
            }
            else if (currentSlide.idx - 1 === nextSlide.idx) {
                this._dispatch('previous', {
                    currentSlide,
                    nextSlide,
                });
            }
            this._dispatch('goto', {
                currentSlide,
                nextSlide,
            });
            this.updateSlidesClasses();
            currentSlide.$slide.classList.add('post-active');
            currentSlide.$slide.classList.remove('active');
            nextSlide.$slide.classList.add('pre-active');
            yield this._transitionHandler(currentSlide.$slide, nextSlide.$slide);
            currentSlide.$slide.classList.remove('post-active');
            nextSlide.$slide.classList.remove('pre-active');
            nextSlide.$slide.classList.add('active');
            this._dispatch('goto-end', {
                currentSlide,
                nextSlide,
            });
            if (this.isPlaying()) {
                this._playSlide(this.state.currentSlideIdx);
            }
            return this;
        });
    }
    /**
     * @name        next
     * @type    Function
     *
     * Go to the next slide
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    next() {
        if (this.props.loop && this.isLast()) {
            return this.goTo(0);
        }
        return this.goTo(this.nextSlideIdx);
    }
    /**
     * @name        previous
     * @type    Function
     *
     * Go to the previous slide
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    previous() {
        if (this.props.loop && this.isFirst()) {
            return this.goTo(this.getLastSlide().idx);
        }
        return this.goTo(this.getPreviousSlideIdx());
    }
    /**
     * @name        getTimer
     * @type        Function
     *
     * This method allows you to get back the timer object
     *
     * @return      {ISSliderComponentTimer}      The timer object
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    getTimer(slideIdIdxOrElement) {
        var _a;
        // return global timer if no slide is specified
        if (!slideIdIdxOrElement) {
            let total = 0, current = 0;
            for (let i = 0; i < this.$slides.length; i++) {
                const slide = this.getSlide(i);
                if (i < this.state.currentSlideIdx) {
                    current += slide.timer.total;
                }
                else if (i === this.state.currentSlideIdx) {
                    current += slide.timer.current;
                }
                total += (_a = slide.timer.total) !== null && _a !== void 0 ? _a : 0;
            }
            this._timer.total = total;
            this._timer.current = current;
            this._timer.percentage = Math.round((100 / total) * current);
            return this._timer;
        }
        // get the slide timer
        const slide = this.getSlide(slideIdIdxOrElement);
        return slide.timer;
    }
    /**
     * @name        isPlaying
     * @type    Function
     *
     * This method allows you to know if the slider is currently playing or not
     *
     * @return      {Boolean}           trie if the slider is playing or not
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    isPlaying() {
        if (!this.state.playing)
            return false;
        return this.props.timer !== undefined;
    }
    /**
     * @name        play
     * @type    Function
     *
     * This method allows you to play the slider when a `timer` has been defined
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    play() {
        if (!this.props.timer)
            return;
        this.componentUtils.dispatchEvent('play', {
            detail: this,
        });
        this.state.playing = true;
        this._playSlide(this.currentSlide.idx);
        return this;
    }
    /**
     * @name        stop
     * @type    Function
     *
     * This method allows you to stop the slider
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    stop() {
        this.componentUtils.dispatchEvent('stop', {
            detail: this,
        });
        this.state.playing = false;
        return this;
    }
    /**
     * @name        _playSlide
     * @type    Function
     *
     * This method allows you to play a particular slide
     *
     * @return      {SSliderComponent}          The slider element to maintain chainability
     *
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _playSlide(idIdxOrElement) {
        const slide = this.getSlide(idIdxOrElement);
        if (!slide || !slide.timer)
            return;
        const interval = 100;
        let elapsed = 0;
        const slideInterval = setInterval(() => {
            if (!this.isPlaying())
                return;
            elapsed += interval;
            slide.timer.current = elapsed;
            slide.timer.percentage = (100 / slide.timer.total) * elapsed;
            if (elapsed >= slide.timer.total) {
                clearInterval(slideInterval);
                slide.timer.current = 0;
                slide.timer.percentage = 0;
                this.next(false);
            }
        }, interval);
        return this;
    }
    /**
     * Function that is in charge of making the transition happend.
     * It will use the setted behavior if this one support custom transition,
     * of simply changing the current slide.
     */
    _transitionHandler($from, $to) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            // set current slide width/height variable
            this.style.setProperty('--s-slider-slide-height', `${Math.round(this.getCurrentSlide().$slide.getBoundingClientRect()
                .height)}px`);
            this.style.setProperty('--s-slider-slide-width', `${Math.round(this.getCurrentSlide().$slide.getBoundingClientRect().width)}px`);
            if (this.props.transitionHandler) {
                yield this.props.transitionHandler($from, $to);
                return resolve();
            }
            if ((_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.goTo) {
                yield this.props.behavior.goTo($from, $to);
                return resolve();
            }
            // call the behavior transition function
            yield ((_c = (_b = this.getBehavior()).transition) === null || _c === void 0 ? void 0 : _c.call(_b, $from, $to));
            // resolve
            resolve();
            // default
            // if (this.props.behavior === 'scroll') {
            // } else if (this.props.behavior === 'transform') {
            //     const toRect = $to.getBoundingClientRect(),
            //         sliderWrapperRect =
            //             this.$slidesWrapper.getBoundingClientRect(),
            //         fromRect = $from.getBoundingClientRect(),
            //         sliderRect = this.getBoundingClientRect();
            //     const translates = __getTranslateProperties(
            //         this.$slidesWrapper,
            //     );
            //     const _this = this;
            //     const fromOffset = (sliderRect.width - fromRect.width) * 0.5;
            //     const toOffset = (sliderRect.width - toRect.width) * 0.5;
            //     const dist = toRect.x - fromRect.x - toOffset + fromOffset;
            //     __easeInterval(
            //         this.props.transitionDuration,
            //         (percentage) => {
            //             const offset = (dist / 100) * percentage * -1;
            //             // console.log(offset);
            //             if (this.props.direction === 'vertical') {
            //                 _this.$slidesWrapper.style.transform = `translateY(${
            //                     translates.y + offset
            //                 }px)`;
            //             } else {
            //                 _this.$slidesWrapper.style.transform = `translateX(${
            //                     translates.x + offset
            //                 }px)`;
            //             }
            //         },
            //         {
            //             easing: this.props.transitionEasing,
            //             onEnd() {
            //                 resolve();
            //             },
            //         },
            //     );
            // }
        }));
    }
    render() {
        var _a;
        if (!this.$slides.length)
            return;
        const currentSlide = this.getCurrentSlide();
        let slide = this.getCurrentSlide();
        this.style.setProperty('--s-slider-slide', this.state.currentSlideIdx);
        this.style.setProperty('--s-slider-total-slides', this.$slides.length);
        this.style.setProperty('--s-slider-page', this.state.currentPage);
        this.style.setProperty('--s-slider-total-pages', Math.ceil(this.$slides.length / this.props.slidesByPage));
        this.style.setProperty('--s-slider-slides-by-page', this.props.slidesByPage);
        this.style.setProperty('--s-slider-slide-timer-total', `${(_a = slide.timer.total) !== null && _a !== void 0 ? _a : 0 / 1000}s`);
        return html `
            <div class="${this.componentUtils.className('__root')}">
                <div
                    class="${this.componentUtils.className('__slides-wrapper')}"
                >
                    <div class="${this.componentUtils.className('__slides')}">
                        <div
                            class="${this.componentUtils.className('__pad __pad-start')}"
                        ></div>
                        ${this.$slides.map(($slide) => {
            return $slide;
        })}
                        <div
                            class="${this.componentUtils.className('__pad __pad-end')}"
                        ></div>
                    </div>
                </div>
                <div
                    class="${this.componentUtils.className('__ui', `${typeof this.props.uiContainer === 'string'
            ? `s-container--${this.props.uiContainer}`
            : this.props.uiContainer === true
                ? 's-container'
                : ''}`)}"
                >
                    ${this.props.progress
            ? html `
                              <div
                                  class="${this.componentUtils.className('__progress')}"
                              >
                                  <div
                                      class="${this.componentUtils.className('__progress-bar')}"
                                  ></div>
                              </div>
                          `
            : ''}
                    <div class="${this.componentUtils.className('__nav')}">
                        ${[
            ...Array(Math.ceil(this.$slides.length /
                this.props.slidesByPage)),
        ].map((i, idx) => {
            return html `
                                <div
                                    class="${this.componentUtils.className('__nav-item')} ${this.isSlideInPage(currentSlide.idx, idx)
                ? 'active'
                : ''}"
                                    @pointerup=${() => this.goTo(idx * this.props.slidesByPage)}
                                ></div>
                            `;
        })}
                    </div>
                    ${this.props.controls
            ? html `
                              <div
                                  class="${this.componentUtils.className('__controls')}"
                              >
                                  <div
                                      class="${this.componentUtils.className('__controls-previous')} ${this.isFirst() && !this.props.loop
                ? ''
                : 'active'}"
                                      @pointerup=${() => this.previous()}
                                  >
                                      ${this.props.previousIconClass
                ? html `
                                                <i
                                                    class="${this.props
                    .previousIconClass}"
                                                ></i>
                                            `
                : html `<div
                                                class="${this.componentUtils.className('__controls-previous-arrow')}"
                                            ></div>`}
                                  </div>
                                  <div
                                      class="${this.componentUtils.className('__controls-next')} ${this.isLast() && !this.props.loop
                ? ''
                : 'active'}"
                                      @pointerup=${() => this.next()}
                                  >
                                      ${this.props.nextIconClass
                ? html `
                                                <i
                                                    class="${this.props
                    .nextIconClass}"
                                                ></i>
                                            `
                : html `<div
                                                class="${this.componentUtils.className('__controls-next-arrow')}"
                                            ></div>`}
                                  </div>
                              </div>
                          `
            : ''}
                </div>
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
    __SLitComponent.define(tagName, SSliderComponent, props);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsYUFBYTtBQUNiLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEdBQ3BCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sS0FBSyxNQUFNLDRDQUE0QyxDQUFDLENBQUMsK0JBQStCO0FBQy9GLE9BQU8sMkJBQTJCLE1BQU0sdUNBQXVDLENBQUM7QUFFaEYsT0FBTyxnQkFBZ0IsTUFBTSw0QkFBNEIsQ0FBQztBQXdTMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxnQkFBaUIsU0FBUSxlQUFlO0lBcUN6RDtRQUNJLEtBQUssQ0FDRCxXQUFXLENBQUM7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixTQUFTLEVBQUUsMkJBQTJCO1NBQ3pDLENBQUMsQ0FDTCxDQUFDO1FBWk4sV0FBTSxHQUFHO1lBQ0wsS0FBSyxFQUFFLENBQUM7WUFDUixPQUFPLEVBQUUsQ0FBQztZQUNWLFVBQVUsRUFBRSxDQUFDO1NBQ2hCLENBQUM7UUE4OEJGOzs7Ozs7Ozs7V0FTRztRQUNILHFCQUFnQixHQUFHLEVBQUUsQ0FBQztJQS84QnRCLENBQUM7SUEzQ0QsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsdUJBQXVCLENB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