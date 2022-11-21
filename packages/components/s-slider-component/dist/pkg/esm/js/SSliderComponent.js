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
import { __easeInterval } from '@coffeekraken/sugar/function';
import { __uniqid } from '@coffeekraken/sugar/string';
import __css from '../../../../src/css/s-slider-component.css'; // relative to /dist/pkg/esm/js
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __SSliderBehavior from './SSliderBehavior';
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
            currentSlideIdx: 0,
            playing: true,
        };
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // assign a uniqid if not already setted
            if (!this.id) {
                this.setAttribute('id', `s-slider-${__uniqid()}`);
            }
            this.$slides = Array.from(this.querySelectorAll(`[s-slider-slide]`)).filter(($slide) => {
                const $parentSlider = __querySelectorUp($slide, '.s-slider');
                if (!$parentSlider || $parentSlider === this) {
                    $slide.classList.add(...this.componentUtils.className('__slide').split(' '));
                    return true;
                }
                return false;
            });
            // set the initial slide idx from properties
            this.state.currentSlideIdx = this.props.slide;
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
                this.props.behavior !== 'none' &&
                this.props.behavior !== 'default') {
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
                this.behavior.$slider = this;
                (_e = (_d = this.behavior).firstUpdated) === null || _e === void 0 ? void 0 : _e.call(_d);
            }
            // prevent user scroll for default behavior
            this._preventUserScrollForDefaultBehavior();
            // listen for intersections
            this.props.intersectionClasses && this._handleIntersections();
            // listen for mousewheel
            this.props.mousewheel && this._handleMousewheel();
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
        if (this.props.behavior === 'default') {
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
        this.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.previous();
            }
            else if (e.deltaY > 0) {
                this.next();
            }
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
                        this.goTo($slide);
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
            if (!force && (!nextSlide || nextSlide.idx === this.currentSlide.idx))
                return;
            const currentSlide = this.getCurrentSlide();
            this.state.currentSlideIdx = nextSlide.idx;
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
            return this.goTo(this.getLastSlide().id);
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
            var _a;
            if (this.props.transitionHandler) {
                yield this.props.transitionHandler($from, $to);
                return resolve();
            }
            if ((_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.goTo) {
                yield this.props.behavior.goTo($from, $to);
                return resolve();
            }
            // default
            if (this.props.behavior === 'default') {
                if (this.props.direction === 'vertical') {
                    this.$slidesWrapper.style.overflowY = 'auto';
                }
                else {
                    this.$slidesWrapper.style.overflowX = 'auto';
                }
                const $slidesWrapper = this.$slidesWrapper;
                const toRect = $to.getBoundingClientRect();
                let startX = this.$slidesWrapper.scrollLeft, startY = this.$slidesWrapper.scrollTop;
                const dist = this.props.direction === 'vertical' ? toRect.y : toRect.x;
                const _this = this;
                __easeInterval(this.props.transitionDuration, (percentage) => {
                    const offset = (dist / 100) * percentage;
                    // console.log(offset);
                    if (this.props.direction === 'vertical') {
                        this.$slidesWrapper.scroll(0, startY + offset);
                    }
                    else {
                        this.$slidesWrapper.scroll(startX + offset, 0);
                    }
                }, {
                    easing: this.props.transitionEasing,
                    onEnd() {
                        if (_this.props.direction === 'vertical') {
                            $slidesWrapper.style.overflowY = 'hidden';
                        }
                        else {
                            $slidesWrapper.style.overflowX = 'hidden';
                        }
                        resolve();
                    },
                });
            }
        }));
    }
    render() {
        var _a;
        if (!this.$slides.length)
            return;
        const currentSlide = this.getCurrentSlide();
        let slide = this.getCurrentSlide();
        return html `
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
                    ${this.$slides.map(($slide, idx) => {
            return html `
                            <div
                                class="${this.componentUtils.className('__nav-item')} ${idx === currentSlide.idx ? 'active' : ''}"
                                @pointerup=${() => this.goTo(idx)}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsYUFBYTtBQUNiLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsaUJBQWlCLEdBQ3BCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLEtBQUssTUFBTSw0Q0FBNEMsQ0FBQyxDQUFDLCtCQUErQjtBQUMvRixPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFrUmxELE1BQU0sQ0FBQyxPQUFPLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQW1DekQ7UUFDSSxLQUFLLENBQ0QsV0FBVyxDQUFDO1lBQ1IsSUFBSSxFQUFFLFVBQVU7WUFDaEIsU0FBUyxFQUFFLDJCQUEyQjtTQUN6QyxDQUFDLENBQ0wsQ0FBQztRQVpOLFdBQU0sR0FBRztZQUNMLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixVQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDO0lBU0YsQ0FBQztJQXpDRCxNQUFNLEtBQUssVUFBVTtRQUNqQixPQUFPLGVBQWUsQ0FBQyx1QkFBdUIsQ0FDMUMsRUFB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