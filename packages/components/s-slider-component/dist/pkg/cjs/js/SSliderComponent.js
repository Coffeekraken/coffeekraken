"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const dom_1 = require("@coffeekraken/sugar/dom");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const lit_1 = require("lit");
// @ts-ignore
const dom_2 = require("@coffeekraken/sugar/dom");
const string_1 = require("@coffeekraken/sugar/string");
const s_slider_component_css_1 = __importDefault(require("../../../../src/css/s-slider-component.css")); // relative to /dist/pkg/esm/js
const SSliderComponentInterface_1 = __importDefault(require("./interface/SSliderComponentInterface"));
const scrollBehavior_1 = __importDefault(require("./behaviors/scrollBehavior"));
class SSliderComponent extends s_lit_component_1.default {
    constructor() {
        super((0, object_1.__deepMerge)({
            name: 's-slider',
            interface: SSliderComponentInterface_1.default,
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
        return s_lit_component_1.default.propertiesFromInterface({}, SSliderComponentInterface_1.default);
    }
    static get styles() {
        return (0, lit_1.css) `
            ${(0, lit_1.unsafeCSS)(`
                ${s_slider_component_css_1.default}
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
            this.props.behaviors.scroll = scrollBehavior_1.default;
            // assign a uniqid if not already setted
            if (!this.id) {
                this.setAttribute('id', `s-slider-${(0, string_1.__uniqid)()}`);
            }
            this.$slides = Array.from(this.querySelectorAll(`[s-slider-slide],s-slider-slide`)).filter(($slide) => {
                const $parentSlider = (0, dom_2.__querySelectorUp)($slide, '.s-slider');
                if (!$parentSlider || $parentSlider === this) {
                    $slide.classList.add(...this.utils.cls('_slide').split(' '));
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
            this.$root = this.querySelector(`.${this.utils.ucls('_root')}`);
            // slides
            this.$slidesWrapper = this.querySelector(`.${this.utils.ucls('_slides-wrapper')}:not(s-slider#${this.id} s-slider .${this.utils.ucls('_slides-wrapper')})`);
            this.$slidesContainer = this.querySelector(`.${this.utils.ucls('_slides')}:not(s-slider#${this.id} s-slider .${this.utils.ucls('_slides')})`);
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
                else if ((0, is_1.__isClass)(this.props.behavior)) {
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
        (0, dom_1.__onSwipe)(this.$root, (swipe) => {
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
            (0, dom_2.__querySelectorLive)(`[s-slider-${action}]:not(s-slider#${this.id} s-slider [s-slider-${action}])`, ($elm) => {
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
        (0, dom_2.__querySelectorLive)(`[s-slider-goto]:not(s-slider#${this.id} .s-slider [s-slider-goto])`, ($elm) => {
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
        this.utils.dispatchEvent(name, {
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
        this.utils.dispatchEvent('play', {
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
        this.utils.dispatchEvent('stop', {
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
        return (0, lit_1.html) `
            <div class="${this.utils.cls('_root')}">
                <div class="${this.utils.cls('_slides-wrapper')}">
                    <div class="${this.utils.cls('_slides')}">
                        <div
                            class="${this.utils.cls('_pad __pad-start')}"
                        ></div>
                        ${this.$slides.map(($slide) => {
            return $slide;
        })}
                        <div class="${this.utils.cls('_pad __pad-end')}"></div>
                    </div>
                </div>
                <div
                    class="${this.utils.cls('__ui', `${typeof this.props.uiContainer === 'string'
            ? `s-container--${this.props.uiContainer}`
            : this.props.uiContainer === true
                ? 's-container'
                : ''}`)}"
                >
                    ${this.props.progress
            ? (0, lit_1.html) `
                              <div class="${this.utils.cls('_progress')}">
                                  <div
                                      class="${this.utils.cls('__progress-bar')}"
                                  ></div>
                              </div>
                          `
            : ''}
                    <div class="${this.utils.cls('_nav')}">
                        ${[
            ...Array(Math.ceil(this.$slides.length /
                this.props.slidesByPage)),
        ].map((i, idx) => {
            return (0, lit_1.html) `
                                <div
                                    class="${this.utils.cls('__nav-item')} ${this.isSlideInPage(currentSlide.idx, idx)
                ? 'active'
                : ''}"
                                    @pointerup=${() => this.goTo(idx * this.props.slidesByPage)}
                                ></div>
                            `;
        })}
                    </div>
                    ${this.props.controls
            ? (0, lit_1.html) `
                              <div class="${this.utils.cls('_controls')}">
                                  <div
                                      class="${this.utils.cls('__controls-previous')} ${this.isFirst() && !this.props.loop
                ? ''
                : 'active'}"
                                      @pointerup=${() => this.previous()}
                                  >
                                      ${this.props.previousIconClass
                ? (0, lit_1.html) `
                                                <i
                                                    class="${this.props
                    .previousIconClass}"
                                                ></i>
                                            `
                : (0, lit_1.html) `<div
                                                class="${this.utils.cls('__controls-previous-arrow')}"
                                            ></div>`}
                                  </div>
                                  <div
                                      class="${this.utils.cls('__controls-next')} ${this.isLast() && !this.props.loop
                ? ''
                : 'active'}"
                                      @pointerup=${() => this.next()}
                                  >
                                      ${this.props.nextIconClass
                ? (0, lit_1.html) `
                                                <i
                                                    class="${this.props
                    .nextIconClass}"
                                                ></i>
                                            `
                : (0, lit_1.html) `<div
                                                class="${this.utils.cls('__controls-next-arrow')}"
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
exports.default = SSliderComponent;
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
function define(props = {}, tagName = 's-slider') {
    s_lit_component_1.default.define(tagName, SSliderComponent, props);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFFdUM7QUFDdkMsaURBQW9EO0FBQ3BELCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGFBQWE7QUFDYixpREFHaUM7QUFDakMsdURBQXNEO0FBQ3RELHdHQUErRCxDQUFDLCtCQUErQjtBQUMvRixzR0FBZ0Y7QUFFaEYsZ0ZBQTBEO0FBd1MxRCxNQUFxQixnQkFBaUIsU0FBUSx5QkFBZTtJQXFDekQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLG1DQUEyQjtTQUN6QyxDQUFDLENBQ0wsQ0FBQztRQVpOLFdBQU0sR0FBRztZQUNMLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixVQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBczhCRjs7Ozs7Ozs7O1dBU0c7UUFDSCxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUF2OEJ0QixDQUFDO0lBM0NELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUEyQixDQUM5QixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDO2tCQUNOLGdDQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsV0FBVyxFQUFFLENBQUM7WUFDZCxnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLGVBQWUsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sRUFBRSxJQUFJO1NBQ2hCLENBQUM7SUFDTixDQUFDO0lBc0JLLEtBQUs7O1lB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