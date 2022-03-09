// @ts-nocheck

import __SSliderBehavior from './SSliderBehavior';
import __SSliderSlideableBehavior from './behaviors/SSliderSlideableBehavior';
import __SLitComponent, {
    ISLitComponentDefaultProps
} from '@coffeekraken/s-lit-component';
import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';

/**
 * @name                Range
 * @namespace           js
 * @type                CustomElement
 * @interface           ./interface/SSliderComponentInterface.js
 * @menu                Styleguide / Forms              /styleguide/form/s-range
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
 * @install          bash 
 * npm i @coffeekraken/s-range-component
 * 
 * @install         js
 * import { define } from '@coffeekraken/s-range-component';
 * define();
 * 
 * @example         html        Simple range
 * <s-range name="myCoolRange" value="90" class="s-color:accent s-mbe:30"></s-range>
 *
 * @since           2.0.0
 * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSliderComponentProps extends ISLitComponentDefaultProps {
    direction: 'horizontal' | 'vertical';
    behavior: __SSliderBehavior;
    itemsByPage: number;
    sideReveal: number;
    transitionDuration: number;
    transitionEasing: number;
    transitionHandler: Function;
}

export default class SSlider extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SSliderComponentInterface);
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

    _currentPageIdx = 0;
    _currentSlideIdx = 0;

    constructor() {
        super(
            __deepMerge({
                litComponent: {
                    shadowDom: false,
                },
                componentUtils: {
                    interface: __SSliderComponentInterface,
                },
            }),
        );
    }
    async firstUpdated() {

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
            this.behavior.firstUpdated?.();
        }

        // listen for intersections
        this._handleIntersections();

        // handle scroll
        // this._handleScroll();

        // handle slide
        // this._handleSlide();

        // setTimeout(() => {
        //     this.next();
        // }, 1000);
        // setTimeout(() => {
        //     this.next();
        // }, 2000);
        // setTimeout(() => {
        //     this.next();
        // }, 3000);
        // setTimeout(() => {
        //     this.goTo(0);
        // }, 4000);

    }

    /**
     * This function listen for intersection changes on slides and apply classes depending on this
     */
    _handleIntersections() {
         this.$slides?.forEach($slide => {

            function buildThresholdList() {
                let thresholds = [];
                let numSteps = 10;
                for (let i=1.0; i<=numSteps; i++) {
                    let ratio = i/numSteps;
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
                [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1].forEach((threshold, idx) => {
                    if (highestRatio >= threshold) {
                        $slide.classList.add(`in-${threshold*100}`);
                    } else {
                        $slide.classList.remove(`in-${threshold*100}`);
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
     * This function simply apply the current state of the slider
     */
    requestUpdate() {
        super.requestUpdate();
        // update slides classes
        this.$slides?.forEach(($slide, i) => {
            if (i === this.currentSlideIdx) $slide.classList.add('active');
            else $slide.classList.remove('active');
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
    get currentPageIdx(): number {
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
    getCurrentSlideIdx(): number {
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
    setCurrentSlideIdx(idx: number): void {
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
        return this.$slides[this._currentSlideIdx]
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
        const nextSlideIdx = this._currentSlideIdx + 1;
        if (nextSlideIdx >= this.$slides.length - 1) return this.$slides.length - 1;
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
        const previousSlideIdx = this._currentSlideIdx - 1;
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
    goTo(slideIdx: number) {
        if (!this.$slides[slideIdx]) return;
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

        const deltaX = nextBounds.left - sliderBounds.left,
            deltaY = nextBounds.top;

        __easeInterval(this.props.transitionDuration, (percent) => {
            if (this.props.direction === 'horizontal') {
                const computedDelta = translates.x + (deltaX / 100 * percent) * -1;
                $slideableItem.style.transform = `translateX(${computedDelta}px)`;
            } else {
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
        return html`
            <div class="${this.componentUtils.className(
                    '',
                )}"
                behavior="${this.props.behavior?.constructor?.id}"
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
export function define(
    props: Partial<ISSliderComponentProps> = {},
    tagName = 's-slider',
) {
    __SLitComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, SSlider);
}
