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
            previousSlideIdx: 0,
            currentSlideIdx: 0,
            playing: true,
        };
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // register "built-in" behaviors
            this.props.behaviors.scroll = scrollBehavior_1.default;
            // assign a uniqid if not already setted
            if (!this.id) {
                this.setAttribute('id', `s-slider-${(0, string_1.__uniqid)()}`);
            }
            this.$slides = Array.from(this.querySelectorAll(`[s-slider-slide]`)).filter(($slide) => {
                const $parentSlider = (0, dom_2.__querySelectorUp)($slide, '.s-slider');
                if (!$parentSlider || $parentSlider === this) {
                    $slide.classList.add(...this.componentUtils.className('__slide').split(' '));
                    return true;
                }
                return false;
            });
            // setup through behavior
            yield ((_b = (_a = this.getBehavior()).setup) === null || _b === void 0 ? void 0 : _b.call(_a));
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
        var _a, _b, _c, _d, _e;
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
            // pad through behavior
            if (this.getBehavior().pad) {
                yield this.getBehavior().pad();
            }
            else {
                yield this._pad();
            }
        });
    }
    /**
     * Default pad function if not specified in the behavior
     */
    _pad() {
        const firstSlide = this.getFirstSlide(), lastSlide = this.getLastSlide(), firstRect = firstSlide.$slide.getBoundingClientRect(), lastRect = lastSlide.$slide.getBoundingClientRect(), sliderRect = this.getBoundingClientRect();
        let padStart = 0, padEnd = 0;
        if (this.props.direction === 'vertical') {
            padStart = (sliderRect.height - firstRect.height) * 0.5;
            padEnd = (sliderRect.height - lastRect.height) * 0.5;
        }
        else {
            padStart = (sliderRect.width - firstRect.width) * 0.5;
            console.log(sliderRect.width, lastRect.width);
            padEnd = (sliderRect.width - lastRect.width) * 0.5;
        }
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
        this.componentUtils.dispatchEvent(name, {
            detail,
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
        // save the previous slide idx
        this.state.previousSlideIdx = this.state.currentSlideIdx;
        // set the new slide idx
        this.props.slide = idx;
        this.state.currentSlideIdx = idx;
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
        const behavior = this.props.behaviors[this.props.behavior];
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
            this.$slides.forEach(($slide, i) => {
                if ($slide === nextSlide.$slide) {
                    $slide.classList.add('active');
                }
                else {
                    $slide.classList.remove('active');
                }
            });
            currentSlide.$slide.classList.add('post-active');
            currentSlide.$slide.classList.remove('active');
            nextSlide.$slide.classList.add('pre-active');
            console.log('transition0', currentSlide, nextSlide);
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
        return (0, lit_1.html) `
            <div
                class="${this.componentUtils.className('__root')}"
                behavior="${(_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.id}"
                style="
                    --s-slider-slide: ${this.state.currentSlideIdx};
                    --s-slider-total: ${this.$slides.length};
                    ${slide
            ? `
                        --s-slider-slide-timer-total: ${slide.timer.total / 1000}s;
                    `
            : ''}
                "
            >
                <div
                    class="${this.componentUtils.className('__slides-wrapper')}"
                >
                    <div class="${this.componentUtils.className('__slides')}">
                        ${this.$slides.map(($slide) => {
            return $slide;
        })}
                    </div>
                </div>
                <div class="${this.componentUtils.className('__ui')}">
                    ${this.props.progress
            ? (0, lit_1.html) `
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
                        ${this.$slides.map(($slide, idx) => {
            return (0, lit_1.html) `
                                <div
                                    class="${this.componentUtils.className('__nav-item')} ${idx === currentSlide.idx
                ? 'active'
                : ''}"
                                    @pointerup=${() => this.goTo(idx)}
                                ></div>
                            `;
        })}
                    </div>
                    ${this.props.controls
            ? (0, lit_1.html) `
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
                ? (0, lit_1.html) `
                                                <i
                                                    class="${this.props
                    .previousIconClass}"
                                                ></i>
                                            `
                : (0, lit_1.html) `<div
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
                ? (0, lit_1.html) `
                                                <i
                                                    class="${this.props
                    .nextIconClass}"
                                                ></i>
                                            `
                : (0, lit_1.html) `<div
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFFdUM7QUFDdkMsaURBQW9EO0FBQ3BELCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQsNkJBQTJDO0FBQzNDLGFBQWE7QUFDYixpREFHaUM7QUFDakMsdURBQXNEO0FBQ3RELHdHQUErRCxDQUFDLCtCQUErQjtBQUMvRixzR0FBZ0Y7QUFFaEYsZ0ZBQTBEO0FBMFIxRCxNQUFxQixnQkFBaUIsU0FBUSx5QkFBZTtJQW9DekQ7UUFDSSxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUFDO1lBQ1IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLG1DQUEyQjtTQUN6QyxDQUFDLENBQ0wsQ0FBQztRQVpOLFdBQU0sR0FBRztZQUNMLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixVQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBaXdCRjs7Ozs7Ozs7O1dBU0c7UUFDSCxxQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFsd0J0QixDQUFDO0lBMUNELE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8seUJBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFBRSxFQUNGLG1DQUEyQixDQUM5QixDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU0sS0FBSyxNQUFNO1FBQ2IsT0FBTyxJQUFBLFNBQUcsRUFBQTtjQUNKLElBQUEsZUFBUyxFQUFDO2tCQUNOLGdDQUFLO2FBQ1YsQ0FBQztTQUNMLENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxLQUFLLEtBQUs7UUFDWixPQUFPO1lBQ0gsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixlQUFlLEVBQUUsQ0FBQztZQUNsQixPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDO0lBQ04sQ0FBQztJQXNCSyxLQUFLOzs7WUFDUCxnQ0FBZ0M7WUFDaEMsSUFB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