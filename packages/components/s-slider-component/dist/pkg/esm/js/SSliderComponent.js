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
import __onSwipe from '@coffeekraken/sugar/js/dom/detect/onSwipe';
import __isClass from '@coffeekraken/sugar/shared/is/class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
// @ts-ignore
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __querySelectorUp from '@coffeekraken/sugar/js/dom/query/querySelectorUp';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __css from '../../../../src/css/s-slider-component.css'; // relative to /dist/pkg/esm/js
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __SSliderBehavior from './SSliderBehavior';
export default class SSlider extends __SLitComponent {
    constructor() {
        super(__deepMerge({
            name: 's-slider',
            interface: __SSliderComponentInterface,
        }));
        this.$slides = [];
        this.$navs = [];
        this.state = {
            currentSlideIdx: 0,
            playing: true,
        };
        this._timer = {
            total: 0,
            current: 0,
            percentage: 0,
        };
        // assign a uniqid if not already setted
        if (!this.id) {
            this.setAttribute('sid', `s-slider-${__uniqid()}`);
        }
        this.$slides = Array.from(document.querySelectorAll(`[s-slider-slide]`)).filter(($slide) => {
            const $parentSlider = __querySelectorUp($slide, 's-slider');
            if (!$parentSlider)
                return true;
            if ($parentSlider === this)
                return true;
            return false;
        });
        this.$slides.forEach(($item) => {
            // add the item class
            $item.classList.add(this.componentUtils.className('__slide'));
        });
    }
    static get properties() {
        return __SLitComponent.createProperties({}, __SSliderComponentInterface);
    }
    static get styles() {
        return css `
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }
    mount() {
        return __awaiter(this, void 0, void 0, function* () {
            // set the initial slide idx from properties
            this.state.currentSlideIdx = this.props.slide;
        });
    }
    firstUpdated() {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            // bare elements
            this.$root = this.querySelector(`.${this.componentUtils.className('__root')}`);
            // slides
            this.$slidesWrapper = this.querySelector(`.${this.componentUtils.className('__slides-wrapper')}:not(s-slider#${this.id} s-slider .${this.componentUtils.className('__slides-wrapper')})`);
            this.$slidesContainer = this.querySelector(`.${this.componentUtils.className('__slides')}:not(s-slider#${this.id} s-slider .${this.componentUtils.className('__slides')})`);
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
                rootNode: this,
            });
        });
        // goto
        __querySelectorLive('[s-slider-goto]', ($elm) => {
            $elm.addEventListener('pointerup', (e) => {
                var _a;
                const slideIdx = (_a = parseInt($elm.getAttribute('s-slider-goto'))) !== null && _a !== void 0 ? _a : 0;
                this.goTo(slideIdx, true);
            });
        }, {
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
    goTo(slideIdIdxOrElement, userAction = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const nextSlide = this.getSlide(slideIdIdxOrElement);
            if (!nextSlide || nextSlide.idx === this.currentSlide.idx)
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
            yield this._transitionHandler(currentSlide.$side, nextSlide.$slide);
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
    next(userAction) {
        if (this.props.loop && this.isLast()) {
            return this.goTo(0, userAction);
        }
        return this.goTo(this.nextSlideIdx, userAction);
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
    previous(userAction) {
        if (this.props.loop && this.isFirst()) {
            return this.goTo(this.getLastSlide().id, userAction);
        }
        return this.goTo(this.getPreviousSlideIdx(), userAction);
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
        var _a;
        if (this.props.transitionHandler) {
            this.props.transitionHandler($from, $to);
            return;
        }
        if ((_a = this.props.behavior) === null || _a === void 0 ? void 0 : _a.goTo) {
            this.props.behavior.goTo($from, $to);
            return;
        }
        const dist = $to.getBoundingClientRect().x;
        console.log(dist);
        this.$slidesWrapper.scroll(dist, 0);
        // const nextBounds = $to.getBoundingClientRect();
        // const sliderBounds = this.$slidesWrapper.getBoundingClientRect();
        // const deltaX = nextBounds.left - sliderBounds.left,
        //     deltaY = nextBounds.top - sliderBounds.top;
        // __easeInterval(
        //     this.props.transitionDuration,
        //     (percent) => {
        //         if (this.props.direction === 'horizontal') {
        //             const computedDelta =
        //                 translates.x + (deltaX / 100) * percent * -1;
        //             $slideableItem.style.transform = `translateX(${computedDelta}px)`;
        //         } else {
        //             const computedDelta =
        //                 translates.y + (deltaY / 100) * percent * -1;
        //             $slideableItem.style.transform = `translateY(${computedDelta}px)`;
        //         }
        //     },
        //     {
        //         easing: this.props.transitionEasing,
        //     },
        // );
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
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSlider);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBRU4sTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxxQ0FBcUMsQ0FBQztBQUM1RCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0MsYUFBYTtBQUNiLE9BQU8sbUJBQW1CLE1BQU0sb0RBQW9ELENBQUM7QUFDckYsT0FBTyxpQkFBaUIsTUFBTSxrREFBa0QsQ0FBQztBQUNqRixPQUFPLFFBQVEsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEtBQUssTUFBTSw0Q0FBNEMsQ0FBQyxDQUFDLCtCQUErQjtBQUMvRixPQUFPLDJCQUEyQixNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8saUJBQWlCLE1BQU0sbUJBQW1CLENBQUM7QUFrUmxELE1BQU0sQ0FBQyxPQUFPLE9BQU8sT0FBUSxTQUFRLGVBQWU7SUFnQ2hEO1FBQ0ksS0FBSyxDQUNELFdBQVcsQ0FBQztZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLFNBQVMsRUFBRSwyQkFBMkI7U0FDekMsQ0FBQyxDQUNMLENBQUM7UUFyQk4sWUFBTyxHQUFrQixFQUFFLENBQUM7UUFDNUIsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFJMUIsVUFBSyxHQUFHO1lBQ0osZUFBZSxFQUFFLENBQUM7WUFDbEIsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQztRQUNGLFdBQU0sR0FBRztZQUNMLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixVQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDO1FBVUUsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsWUFBWSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3JCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUNoRCxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2hCLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsYUFBYTtnQkFBRSxPQUFPLElBQUksQ0FBQztZQUNoQyxJQUFJLGFBQWEsS0FBSyxJQUFJO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ3hDLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUMzQixxQkFBcUI7WUFDckIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUF6REQsTUFBTSxLQUFLLFVBQVU7UUFDakIsT0FBTyxlQUFlLENBQUMsZ0JBQWdCLENBQ25DLEVBQUUsRUFDRiwyQkFBMkIsQ0FDOUIsQ0FBQztJQUNOLENBQUM7SUFFRCxNQUFNLEtBQUssTUFBTTtRQUNiLE9BQU8sR0FBRyxDQUFBO2NBQ0osU0FBUyxDQUFDO2tCQUNOLEtBQUs7YUFDVixDQUFDO1NBQ0wsQ0FBQztJQUNOLENBQUM7SUE2Q0ssS0FBSzs7WUFDUCw0Q0FBNEM7WUFDNUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBQ0ssWUFBWTs7O1lBQ2QsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDM0IsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUNoRCxDQUFDO1lBRUYsU0FBUztZQUNULElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FDcEMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDN0Isa0JBQWtCLENBQ3JCLGlCQUNHLElBQUksQ0FBQyxFQUNULGNBQWMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUNyRSxDQUFDO1lBQ0YsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQ3RDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGlCQUN6QyxJQUFJLENBQUMsRUFDVCxjQUFjLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQzdELENBQUM7WUFFRixtQkFBbUI7WUFDbkIsSUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7Z0JBQ25CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU07Z0JBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFDbkM7Z0JBQ0UsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtvQkFDekMsSUFBSSxRQUFRLENBQUM7b0JBQ2IsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQ2hELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUN2QixFQUFFO3dCQUNDLE1BQU0sRUFBRSxHQUFHLE1BQUEsTUFBQSxXQUFXLENBQUMsS0FBSywwQ0FBRSxFQUFFLG1DQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUM7d0JBQ25ELElBQUksRUFBRSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFOzRCQUM1QixRQUFRLEdBQUcsV0FBVyxDQUFDOzRCQUN2QixNQUFNO3lCQUNUO3FCQUNKO29CQUNELElBQUksQ0FBQyxRQUFRLEVBQUU7d0JBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDWCxpQkFBaUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLG9CQUFvQixDQUMzRCxDQUFDO3FCQUNMO29CQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNqQixNQUFNLElBQUksS0FBSyxDQUNYLGlCQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsMkhBQTJILENBQ2xLLENBQUM7cUJBQ0w7b0JBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBQSxRQUFRLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztpQkFDL0Q7cUJBQU0sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxZQUFZLGlCQUFpQixFQUFFO29CQUN6RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2lCQUN2QztxQkFBTTtvQkFDSCxNQUFNLElBQUksS0FBSyxDQUNYLDJHQUEyRyxDQUM5RyxDQUFDO2lCQUNMO2dCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDN0IsTUFBQSxNQUFBLElBQUksQ0FBQyxRQUFRLEVBQUMsWUFBWSxrREFBSSxDQUFDO2FBQ2xDO1lBRUQsMkJBQTJCO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFFOUQsd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRWxELGlCQUFpQjtZQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUV0RCxRQUFRO1lBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXhDLFVBQVU7WUFDVixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUU5QixRQUFRO1lBQ1IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2Y7O0tBQ0o7SUFFRDs7T0FFRztJQUNILFlBQVk7UUFDUixTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzVCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxFQUFFO2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNmO3FCQUFNLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjthQUNKO2lCQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO2dCQUM1QyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUU7b0JBQ1gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNmO3FCQUFNLElBQUksS0FBSyxDQUFDLElBQUksRUFBRTtvQkFDbkIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUNuQjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxpQkFBaUI7UUFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO2lCQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxtQkFBbUI7UUFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEQsS0FBSyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQzVDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQ2xELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUU7d0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3JCO2lCQUNKO2FBQ0o7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFvQjs7UUFDaEIsTUFBQSxJQUFJLENBQUMsT0FBTywwQ0FBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM3QixTQUFTLGtCQUFrQjtnQkFDdkIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNwQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ2xDLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7b0JBQ3pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFCO2dCQUNELFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLE9BQU8sVUFBVSxDQUFDO1lBQ3RCLENBQUM7WUFFRCxTQUFTLGVBQWUsQ0FBQyxPQUFPLEVBQUUsUUFBUTtnQkFDdEMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3RCLElBQUksS0FBSyxDQUFDLGlCQUFpQixHQUFHLFlBQVksRUFBRTt3QkFDeEMsWUFBWSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztxQkFDMUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQ3BELENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNmLElBQUksWUFBWSxJQUFJLFNBQVMsRUFBRTt3QkFDM0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztxQkFDakQ7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztxQkFDcEQ7Z0JBQ0wsQ0FBQyxDQUNKLENBQUM7WUFDTixDQUFDO1lBRUQsSUFBSSxRQUFRLENBQUM7WUFFYixJQUFJLE9BQU8sR0FBRztnQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2hCLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixTQUFTLEVBQUUsa0JBQWtCLEVBQUU7YUFDbEMsQ0FBQztZQUVGLFFBQVEsR0FBRyxJQUFJLG9CQUFvQixDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM5RCxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNCQUFzQjtRQUNsQixnQkFBZ0I7UUFDaEIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDcEMsbUJBQW1CLENBQ2YsYUFBYSxNQUFNLGtCQUFrQixJQUFJLENBQUMsRUFBRSx1QkFBdUIsTUFBTSxJQUFJLEVBQzdFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO29CQUNyQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLEVBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLElBQUk7YUFDakIsQ0FDSixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPO1FBQ1AsbUJBQW1CLENBQ2YsaUJBQWlCLEVBQ2pCLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O2dCQUNyQyxNQUFNLFFBQVEsR0FDVixNQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLG1DQUFJLENBQUMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLEVBQ0Q7WUFDSSxRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsSUFBWSxFQUFFLFNBQWMsRUFBRTtRQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUU7WUFDcEMsTUFBTTtTQUNULENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsa0JBQWtCO1FBQ2QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILG9CQUFvQixDQUFDLEdBQVc7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxlQUFlLENBQUMsY0FBK0I7UUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksZUFBZTtRQUNmLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxzQkFBc0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ0gsSUFBSSxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILGVBQWU7UUFDWCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLFlBQVk7UUFDWixPQUFPLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILG1CQUFtQjtRQUNmLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsbUJBQW1CO1FBQ2YsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDeEQsSUFBSSxnQkFBZ0IsSUFBSSxDQUFDO1lBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsT0FBTyxnQkFBZ0IsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLGdCQUFnQjtRQUNoQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsdUJBQXVCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksaUJBQWlCO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILGVBQWUsQ0FBQyxFQUFVO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtnQkFBRSxPQUFPLENBQUMsQ0FBQztTQUN2RTtJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILG9CQUFvQixDQUFDLEdBQVc7UUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsZUFBZTtRQUNYLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFFBQVEsQ0FDSixjQUE2Qzs7UUFFN0MsSUFBSSxNQUFNLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7UUFDM0IsSUFBSSxjQUFjLFlBQVksV0FBVyxFQUFFO1lBQ3ZDLE1BQU0sRUFBRSxHQUFHLGNBQWMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN6RCxJQUFJLEVBQUU7Z0JBQUUsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUNuRCxDQUFDO1NBQ0w7YUFBTSxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtZQUMzQyxHQUFHLEdBQUcsY0FBYyxDQUFDO1lBQ3JCLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzQyxLQUFLLEdBQUcsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxHQUFHO29CQUNKLEtBQUssRUFBRSxNQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLG1DQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztvQkFDdkQsT0FBTyxFQUFFLENBQUM7b0JBQ1YsVUFBVSxFQUFFLENBQUM7aUJBQ2hCLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLHNCQUFzQixHQUFHLEtBQUssQ0FBQzthQUN6QztTQUNKO2FBQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxRQUFRLEVBQUU7WUFDM0MsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDM0MsRUFBRSxHQUFHLGNBQWMsQ0FBQztZQUNwQixNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLEtBQUssR0FBRyxNQUFNLENBQUMsc0JBQXNCLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEdBQUc7b0JBQ0osS0FBSyxFQUFFLE1BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUNBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUN2RCxPQUFPLEVBQUUsQ0FBQztvQkFDVixVQUFVLEVBQUUsQ0FBQztpQkFDaEIsQ0FBQztnQkFDRixNQUFNLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO2FBQ3pDO1NBQ0o7UUFDRCxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDcEIsT0FBTztZQUNILEVBQUU7WUFDRixHQUFHO1lBQ0gsTUFBTTtZQUNOLEtBQUs7U0FDUixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxhQUFhO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsWUFBWTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDRyxJQUFJLENBQ04sbUJBQWtELEVBQ2xELGFBQXNCLElBQUk7O1lBRTFCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHO2dCQUFFLE9BQU87WUFDbEUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztZQUVqQyxJQUFJLFlBQVksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO29CQUNuQixZQUFZO29CQUNaLFNBQVM7aUJBQ1osQ0FBQyxDQUFDO2FBQ047aUJBQU0sSUFBSSxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTtvQkFDdkIsWUFBWTtvQkFDWixTQUFTO2lCQUNaLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ25CLFlBQVk7Z0JBQ1osU0FBUzthQUNaLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXBFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUN2QixZQUFZO2dCQUNaLFNBQVM7YUFDWixDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQy9DO1lBRUQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksQ0FBQyxVQUFtQjtRQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLENBQUMsVUFBbUI7UUFDeEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDeEQ7UUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxRQUFRLENBQ0osbUJBQW1EOztRQUVuRCwrQ0FBK0M7UUFDL0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLElBQUksS0FBSyxHQUFHLENBQUMsRUFDVCxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQ2hDLE9BQU8sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztpQkFDaEM7cUJBQU0sSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQ3pDLE9BQU8sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDbEM7Z0JBQ0QsS0FBSyxJQUFJLE1BQUEsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLG1DQUFJLENBQUMsQ0FBQzthQUNuQztZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQztZQUM3RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7UUFDRCxzQkFBc0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDdEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJO1FBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUFFLE9BQU87UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1lBQ3RDLE1BQU0sRUFBRSxJQUFJO1NBQ2YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUk7UUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7WUFDdEMsTUFBTSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxVQUFVLENBQ04sY0FBNkM7UUFFN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFBRSxPQUFPO1FBRW5DLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFFaEIsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFBRSxPQUFPO1lBQzlCLE9BQU8sSUFBSSxRQUFRLENBQUM7WUFDcEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzdELElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO2dCQUM5QixhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsR0FBRzs7UUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE9BQU87U0FDVjtRQUVELElBQUksTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckMsT0FBTztTQUNWO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXBDLGtEQUFrRDtRQUNsRCxvRUFBb0U7UUFFcEUsc0RBQXNEO1FBQ3RELGtEQUFrRDtRQUVsRCxrQkFBa0I7UUFDbEIscUNBQXFDO1FBQ3JDLHFCQUFxQjtRQUNyQix1REFBdUQ7UUFDdkQsb0NBQW9DO1FBQ3BDLGdFQUFnRTtRQUNoRSxpRkFBaUY7UUFDakYsbUJBQW1CO1FBQ25CLG9DQUFvQztRQUNwQyxnRUFBZ0U7UUFDaEUsaUZBQWlGO1FBQ2pGLFlBQVk7UUFDWixTQUFTO1FBQ1QsUUFBUTtRQUNSLCtDQUErQztRQUMvQyxTQUFTO1FBQ1QsS0FBSztJQUNULENBQUM7SUFDRCxNQUFNOztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUE7O3lCQUVNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzs0QkFDcEMsTUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsMENBQUUsRUFBRTs7d0NBRVgsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlO3dDQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07c0JBQ3JDLEtBQUs7WUFDUCxDQUFDLENBQUM7d0RBRU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFDeEI7cUJBQ0g7WUFDRCxDQUFDLENBQUMsRUFBRTs7Ozs2QkFJSyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQzs7a0NBRTVDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQzswQkFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMxQixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDLENBQUM7OztrQkFHUixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQTs7dUNBRWEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLFlBQVksQ0FDZjs7OzJDQUdZLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxnQkFBZ0IsQ0FDbkI7Ozt1QkFHWjtZQUNILENBQUMsQ0FBQyxFQUFFOzhCQUNNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztzQkFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUE7O3lDQUVNLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQyxZQUFZLENBQ2YsSUFBSSxHQUFHLEtBQUssWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFOzZDQUNoQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7eUJBRXhDLENBQUM7UUFDTixDQUFDLENBQUM7O2tCQUVKLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUNqQixDQUFDLENBQUMsSUFBSSxDQUFBOzt1Q0FFYSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsWUFBWSxDQUNmOzs7MkNBR1ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQ2xDLHFCQUFxQixDQUN4QixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtnQkFDbkMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ0osQ0FBQyxDQUFDLFFBQVE7K0NBQ0QsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7b0NBRWhDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCO2dCQUMxQixDQUFDLENBQUMsSUFBSSxDQUFBOzt5REFFYSxJQUFJLENBQUMsS0FBSztxQkFDZCxpQkFBaUI7O3lDQUU3QjtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUFBO3FEQUNTLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUNsQywyQkFBMkIsQ0FDOUI7Z0RBQ0c7OzsyQ0FHTCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsaUJBQWlCLENBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJO2dCQUNsQyxDQUFDLENBQUMsRUFBRTtnQkFDSixDQUFDLENBQUMsUUFBUTsrQ0FDRCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFOztvQ0FFNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhO2dCQUN0QixDQUFDLENBQUMsSUFBSSxDQUFBOzt5REFFYSxJQUFJLENBQUMsS0FBSztxQkFDZCxhQUFhOzt5Q0FFekI7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQTtxREFDUyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FDbEMsdUJBQXVCLENBQzFCO2dEQUNHOzs7dUJBR3pCO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7O1NBRWYsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FDbEIsUUFBeUMsRUFBRSxFQUMzQyxPQUFPLEdBQUcsVUFBVTtJQUVwQixlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUM1QyxDQUFDIn0=