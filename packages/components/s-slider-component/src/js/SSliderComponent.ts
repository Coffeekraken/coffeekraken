// @ts-nocheck

import __SLitComponent, {
    ISLitComponentDefaultProps,
} from '@coffeekraken/s-lit-component';
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

/**
 * @name                SSliderComponent
 * @as                  Slider
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSliderComponentInterface.ts
 * @menu                Styleguide / UI              /styleguide/ui/s-slider
 * @platform            html
 * @status              beta
 *
 * This component specify a range with some additional features than the native one like
 * displaying the value automatically in tooltip or inline.
 *
 * @support         chromium
 * @support         firefox
 * @support         safari
 * @support         edge
 *
 * @event           s-slider.goto                    Dispatched just before the transitionn
 * @event           s-slider.goto-end                Dispatched just after the transition
 * @event           s-slider.next                       Dispatched just before the transition to the next slide
 * @event           s-slider.previous                       Dispatched just before the transition to the previous slide
 * @event           s-slider.play                        Dispatched when the slider is set to play
 * @event           s-slider.stop                        Dispatched when the slider is set to stop
 * @event           s-slider                       Dispatched for every events of this component. Check the detail.eventType prop for event type
 *
 * @feature         Exteremely customizable
 * @feature         Simply controls (next, previous) built-in
 * @feature         Default dots navigation built-in
 * @feature         Custom navigation capabilities built-in
 * @feature         Horizontal and vertical direction built-in
 * @ƒeature         Mousewheel navigation built-in
 * @feature         Swipe navigation built-in
 * @feature         Loop capability built-in
 * @feature         Timer capability built-in
 * @feature         Mousewheel navigation
 * @feature         Custom behavior (extensions) capabilities built-in
 * @feature         Slideable behavior available
 *
 * @install          bash
 * npm i @coffeekraken/s-slider-component
 *
 * @install         js
 * import { define, SSliderSlideableBehavior } from '@coffeekraken/s-slider-component';
 * define({
 *      behaviors: {
 *          slideable: {
 *              class: SSliderSlideableBehavior
 *              settings: {}
 *          }
 *      }
 * });
 *
 * @example         html        Simple slider
 * <s-slider controls nav responsive='{"mobile":{"lnf":"default-contained"}}'>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Slideable slider
 * <s-slider behavior="slideable" controls nav id="coco">
 *      <responsive media="tablet" lnf="default-contained"></responsive>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:lead">Click and drag</p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Tight slider
 * <s-slider behavior="slideable" lnf="default-tight" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Contained slider
 * <s-slider behavior="slideable" lnf="default-contained" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Vertical slider
 * <s-slider behavior="slideable" direction="vertical" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Vertical tight slider
 * <s-slider behavior="slideable" direction="vertical" lnf="default-tight" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Vertical contained slider
 * <s-slider behavior="slideable" direction="vertical" lnf="default-contained" controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Slider with progressbar
 * <s-slider behavior="slideable" progress controls nav>
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @example         html        Slider with progressbar, loop and timer
 * <s-slider behavior="slideable" progress loop controls nav timer="2500">
 *    <div s-slider-slide class="s-bg--accent">
 *           <h1 class="s-typo:h1">Slide #1</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:complementary">
 *           <h1 class="s-typo:h1">Slide #2</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:info">
 *           <h1 class="s-typo:h1">Slide #3</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *       <div s-slider-slide class="s-bg:error">
 *           <h1 class="s-typo:h1">Slide #4</h1>
 *           <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw </p>
 *       </div>
 *   </s-slider>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSliderComponentProps extends ISLitComponentDefaultProps {
    direction: 'horizontal' | 'vertical';
    behaviors: __SSliderBehavior[];
    behavior: __SSliderBehavior | string | 'none' | 'default';
    controls: boolean;
    nav: boolean;
    mousewheel: boolean;
    clickOnSlide: boolean;
    slide: number;
    loop: boolean;
    progress: boolean;
    timer: number;
    swipe: boolean;
    autoplay: boolean;
    nextIconClass: string;
    previousIconClass: string;
    transitionDuration: number;
    transitionEasing: number;
    transitionHandler: Function;
}

export interface ISSliderComponentSlide {
    id: string;
    idx: number;
    $slide: HTMLElement;
    timer: ISSliderComponentTimer;
}

export interface ISSliderComponentTimer {
    total: number;
    current: number;
    percentage: number;
}

export default class SSlider extends __SLitComponent {
    static get properties() {
        return __SLitComponent.createProperties(
            {},
            __SSliderComponentInterface,
        );
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    $root: HTMLElement;
    $slides: HTMLElement[] = [];
    $navs: HTMLElement[] = [];
    $slidesContainer: HTMLElement;
    $slidesWrapper: HTMLElement;

    state = {
        currentSlideIdx: 0,
        playing: true,
    };
    _timer = {
        total: 0,
        current: 0,
        percentage: 0,
    };

    constructor() {
        super(
            __deepMerge({
                name: 's-slider',
                interface: __SSliderComponentInterface,
            }),
        );

        // assign a uniqid if not already setted
        if (!this.id) {
            this.setAttribute('sid', `s-slider-${__uniqid()}`);
        }

        this.$slides = Array.from(
            document.querySelectorAll(`[s-slider-slide]`),
        ).filter(($slide) => {
            const $parentSlider = __querySelectorUp($slide, 's-slider');
            if (!$parentSlider) return true;
            if ($parentSlider === this) return true;
            return false;
        });

        this.$slides.forEach(($item) => {
            // add the item class
            $item.classList.add(this.componentUtils.className('__slide'));
        });
    }
    async mount() {
        // set the initial slide idx from properties
        this.state.currentSlideIdx = this.props.slide;
    }
    async firstUpdated() {
        // bare elements
        this.$root = this.querySelector(
            `.${this.componentUtils.className('__root')}`,
        );

        // slides
        this.$slidesWrapper = this.querySelector(
            `.${this.componentUtils.className(
                '__slides-wrapper',
            )}:not(s-slider#${
                this.id
            } s-slider .${this.componentUtils.className('__slides-wrapper')})`,
        );
        this.$slidesContainer = this.querySelector(
            `.${this.componentUtils.className('__slides')}:not(s-slider#${
                this.id
            } s-slider .${this.componentUtils.className('__slides')})`,
        );

        // default behavior
        if (
            this.props.behavior &&
            this.props.behavior !== 'none' &&
            this.props.behavior !== 'default'
        ) {
            if (typeof this.props.behavior === 'string') {
                let behavior;
                for (let [behaviorId, behaviorObj] of Object.entries(
                    this.props.behaviors,
                )) {
                    const id = behaviorObj.class?.id ?? behaviorObj.id;
                    if (id === this.props.behavior) {
                        behavior = behaviorObj;
                        break;
                    }
                }
                if (!behavior) {
                    throw new Error(
                        `The behavior "${this.props.behavior}" is not available`,
                    );
                }
                if (!behavior.class) {
                    throw new Error(
                        `The behavior "${this.props.behavior}" is not valid. You must provide the "<yellow>class</yellow>" property and an optional "<yellow>settings</yellow>" one...`,
                    );
                }
                this.behavior = new behavior.class(behavior.settings ?? {});
            } else if (__isClass(this.props.behavior)) {
                this.behavior = new this.props.behavior({});
            } else if (this.props.behavior instanceof __SSliderBehavior) {
                this.behavior = this.props.behavior;
            } else {
                throw new Error(
                    `Invalid behavior type, must be a string, an SSliderBehavior extended class or an SSliderBehavior instance`,
                );
            }
            this.behavior.$slider = this;
            this.behavior.firstUpdated?.();
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
    }

    /**
     * This function init the swipe listener to pass from slides to slides
     */
    _handleSwipe() {
        __onSwipe(this.$root, (swipe) => {
            if (this.props.direction === 'horizontal') {
                if (swipe.left) {
                    this.next();
                } else if (swipe.right) {
                    this.previous();
                }
            } else if (this.props.direction === 'vertical') {
                if (swipe.top) {
                    this.next();
                } else if (swipe.down) {
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
            } else if (e.deltaY > 0) {
                this.next();
            }
        });
    }

    /**
     * This function listen for click on slides and navigate to it
     */
    _handleClickOnSlide() {
        this.$slidesContainer.addEventListener('click', (e) => {
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
        this.$slides?.forEach(($slide) => {
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
                [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].forEach(
                    (threshold, idx) => {
                        if (highestRatio >= threshold) {
                            $slide.classList.add(`in-${threshold * 100}`);
                        } else {
                            $slide.classList.remove(`in-${threshold * 100}`);
                        }
                    },
                );
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
    _initAttributesActions(): void {
        // next/previous
        ['next', 'previous'].forEach((action) => {
            __querySelectorLive(
                `[s-slider-${action}]:not(s-slider#${this.id} s-slider [s-slider-${action}])`,
                ($elm) => {
                    $elm.addEventListener('click', (e) => {
                        e.preventDefault();
                        this[action](true);
                    });
                },
                {
                    rootNode: this,
                },
            );
        });
        // goto
        __querySelectorLive(
            '[s-slider-goto]',
            ($elm) => {
                $elm.addEventListener('click', (e) => {
                    const slideIdx =
                        parseInt($elm.getAttribute('s-slider-goto')) ?? 0;
                    this.goTo(slideIdx, true);
                });
            },
            {
                rootNode: this,
            },
        );
    }

    /**
     * This function is just to dispatch event easier with just the name and the details you want...
     */
    _dispatch(name: string, detail: any = {}) {
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
    getCurrentSlideIdx(): number {
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
    setCurrentSlideByIdx(idx: number): void {
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
    setCurrentSlide(idIdxOrElement: string | number): SSLiderComponent {
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
    get currentSlideIdx(): number {
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
    getCurrentSlideElement(): HTMLElement {
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
    get currentSlideElement(): HTMLElement {
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
    getNextSlideIdx(): number {
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
    get nextSlideIdx(): number {
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
    getNextSlideElement(): HTMLElement {
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
    get nextSlideElement(): HTMLElement {
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
    getPreviousSlideIdx(): number {
        const previousSlideIdx = this.state.currentSlideIdx - 1;
        if (previousSlideIdx <= 0) return 0;
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
    get previousSlideIdx(): number {
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
    getPreviousSlideElement(): HTMLElement {
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
    get previousSlideItem(): HTMLElement {
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
    getSlideIdxById(id: string): number {
        for (let i = 0; i < this.$slides.length; i++) {
            if (this.$slides[i].getAttribute('s-slider-slide') === id) return i;
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
    getSlideElementByIdx(idx: number): HTMLElement {
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
    getCurrentSlide(): ISSliderComponentSlide {
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
    get currentSlide(): ISSliderComponentSlide {
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
    getSlide(
        idIdxOrElement: string | number | HTMLElement,
    ): ISSliderComponentSlide {
        let $slide, id, idx, timer;
        if (idIdxOrElement instanceof HTMLElement) {
            const id = idIdxOrElement.getAttribute('s-slider-slide');
            if (id) return this.getSlide(id);
            return this.getSlide(
                Array.from(this.$slides).indexOf(idIdxOrElement),
            );
        } else if (typeof idIdxOrElement === 'number') {
            idx = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
            id = $slide.getAttribute('s-slider-slide');
            timer = $slide._sSliderComponentTimer;
            if (!timer) {
                timer = {
                    total: $slide.getAttribute('timer') ?? this.props.timer,
                    current: 0,
                    percentage: 0,
                };
                $slide._sSliderComponentTimer = timer;
            }
        } else if (typeof idIdxOrElement === 'string') {
            idx = this.getSlideIdxById(idIdxOrElement);
            id = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
            timer = $slide._sSliderComponentTimer;
            if (!timer) {
                timer = {
                    total: $slide.getAttribute('timer') ?? this.props.timer,
                    current: 0,
                    percentage: 0,
                };
                $slide._sSliderComponentTimer = timer;
            }
        }
        if (!$slide) return;
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
    getFirstSlide(): ISSliderComponentSlide {
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
    getLastSlide(): ISSliderComponentSlide {
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
    async goTo(
        slideIdIdxOrElement: number | string | HTMLElement,
        userAction: boolean = true,
    ): SSliderComponent {
        const nextSlide = this.getSlide(slideIdIdxOrElement);
        if (!nextSlide || nextSlide.idx === this.currentSlide.idx) return;
        const currentSlide = this.getCurrentSlide();
        this.state.currentSlideIdx = nextSlide.idx;
        this.props.slide = nextSlide.idx;

        if (currentSlide.idx + 1 === nextSlide.idx) {
            this._dispatch('next', {
                currentSlide,
                nextSlide,
            });
        } else if (currentSlide.idx - 1 === nextSlide.idx) {
            this._dispatch('previous', {
                currentSlide,
                nextSlide,
            });
        }

        this._dispatch('goto', {
            currentSlide,
            nextSlide,
        });

        await this._transitionHandler(currentSlide.$side, nextSlide.$slide);

        this._dispatch('goto-end', {
            currentSlide,
            nextSlide,
        });

        if (this.isPlaying()) {
            this._playSlide(this.state.currentSlideIdx);
        }

        return this;
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
    next(userAction: boolean): SSliderComponent {
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
    previous(userAction: boolean): SSliderComponent {
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
    getTimer(
        slideIdIdxOrElement?: number | string | HTMLElement,
    ): ISSliderComponentTimer {
        // return global timer if no slide is specified
        if (!slideIdIdxOrElement) {
            let total = 0,
                current = 0;
            for (let i = 0; i < this.$slides.length; i++) {
                const slide = this.getSlide(i);
                if (i < this.state.currentSlideIdx) {
                    current += slide.timer.total;
                } else if (i === this.state.currentSlideIdx) {
                    current += slide.timer.current;
                }
                total += slide.timer.total ?? 0;
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
    isPlaying(): boolean {
        if (!this.state.playing) return false;
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
    play(): SSliderComponent {
        if (!this.props.timer) return;
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
    stop(): SSliderComponent {
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
    _playSlide(
        idIdxOrElement: number | string | HTMLElement,
    ): SSliderComponent {
        const slide = this.getSlide(idIdxOrElement);
        if (!slide || !slide.timer) return;

        const interval = 100;
        let elapsed = 0;

        const slideInterval = setInterval(() => {
            if (!this.isPlaying()) return;
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
        if (this.props.transitionHandler) {
            this.props.transitionHandler($from, $to);
            return;
        }

        if (this.props.behavior?.goTo) {
            this.props.behavior.goTo($from, $to);
            return;
        }

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
        if (!this.$slides.length) return;
        const currentSlide = this.getCurrentSlide();
        let slide = this.getCurrentSlide();
        return html`
            <div
                class="${this.componentUtils.className('__root')}"
                behavior="${this.props.behavior?.id}"
                style="
                    --s-slider-slide: ${this.state.currentSlideIdx};
                    --s-slider-total: ${this.$slides.length};
                    ${slide
                    ? `
                        --s-slider-slide-timer-total: ${
                            slide.timer.total / 1000
                        }s;
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
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__progress',
                              )}"
                          >
                              <div
                                  class="${this.componentUtils.className(
                                      '__progress-bar',
                                  )}"
                              ></div>
                          </div>
                      `
                    : ''}
                <div class="${this.componentUtils.className('__nav')}">
                    ${this.$slides.map(($slide, idx) => {
                        return html`
                            <div
                                class="${this.componentUtils.className(
                                    '__nav-item',
                                )} ${idx === currentSlide.idx ? 'active' : ''}"
                                @click=${() => this.goTo(idx)}
                            ></div>
                        `;
                    })}
                </div>
                ${this.props.controls
                    ? html`
                          <div
                              class="${this.componentUtils.className(
                                  '__controls',
                              )}"
                          >
                              <div
                                  class="${this.componentUtils.className(
                                      '__controls-previous',
                                  )} ${this.isFirst() && !this.props.loop
                                      ? ''
                                      : 'active'}"
                                  @click=${() => this.previous()}
                              >
                                  ${this.props.previousIconClass
                                      ? html`
                                            <i
                                                class="${this.props
                                                    .previousIconClass}"
                                            ></i>
                                        `
                                      : html`<div
                                            class="${this.componentUtils.className(
                                                '__controls-previous-arrow',
                                            )}"
                                        ></div>`}
                              </div>
                              <div
                                  class="${this.componentUtils.className(
                                      '__controls-next',
                                  )} ${this.isLast() && !this.props.loop
                                      ? ''
                                      : 'active'}"
                                  @click=${() => this.next()}
                              >
                                  ${this.props.nextIconClass
                                      ? html`
                                            <i
                                                class="${this.props
                                                    .nextIconClass}"
                                            ></i>
                                        `
                                      : html`<div
                                            class="${this.componentUtils.className(
                                                '__controls-next-arrow',
                                            )}"
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
export function define(
    props: Partial<ISSliderComponentProps> = {},
    tagName = 's-slider',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSlider);
}
