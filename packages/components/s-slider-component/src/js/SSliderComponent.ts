// @ts-nocheck

import __SSliderBehavior from './SSliderBehavior';
import __SSliderSlideableBehavior from './behaviors/SSliderSlideableBehavior';
import __SLitComponent, {
    ISLitComponentDefaultProps
} from '@coffeekraken/s-lit-component';
import __SInterface from '@coffeekraken/s-interface';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import __slideable from '@coffeekraken/sugar/js/dom/slide/slideable';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import { css, html, unsafeCSS } from 'lit';
import __css from '../css/s-slider-component.css';
import __SSliderComponentInterface from './interface/SSliderComponentInterface';
import __getTranslateProperties from '@coffeekraken/sugar/js/dom/style/getTranslateProperties';
import __easeInterval from '@coffeekraken/sugar/shared/function/easeInterval';
import __parse from '@coffeekraken/sugar/shared/string/parse';

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
    controls: boolean;
    nextIconClass: string;
    previousIconClass: string;
    transitionDuration: number;
    transitionEasing: number;
    transitionHandler: Function;
}

export interface ISSlideComponentSlide {
    id: string;
    idx: number;
    $slide: HTMLElement
}

export default class SSlider extends __SLitComponent {
    static get properties() {
        return __SLitComponent.properties({}, __SInterface.mix(__SSliderComponentInterface, __SComponentUtils.getDefaultProps('s-slider').behavior?.interface ?? {}));
    }

    static get styles() {
        return css`
            ${unsafeCSS(`
                ${__css}
            `)}
        `;
    }

    $root: HTMLElement;
    $slidesContainer: HTMLElement;
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
                    interface: __SInterface.mix(__SSliderComponentInterface, __SComponentUtils.getDefaultProps('s-slider').behavior?.interface ?? {}),
                },
            }),
        ); 
    }
    async firstUpdated() {

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
            this.behavior.firstUpdated?.();
        }

        // listen for intersections
        this.props.intersectionClasses && this._handleIntersections();

        // handle scroll
        // this._handleScroll();

        // handle slide
        // this._handleSlide();

        // setTimeout(() => {
        //     this.goTo('welcome');
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
     * This function will get the HTMLElement that are tagged with the "s-slide-nav" attribute.
     * If the element has no value, it will be treated as a container and will be filled with HTMLElements that will be the actual
     * navigation items.
     * If the element has a value, it will be treated as a navigation item and will go to the corresponding slide on click.
     */
    _initNavigation() {

        // navs
        this.$navs = this.querySelectorAll('[s-slider-nav]');

        if (!this.$navs.length) {
            Array(this.$slides.length).fill().forEach((v,i) => {
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
     * This function is just to dispatch event easier with just the name and the details you want...
     */
    _dispatch(name: string, detail: any = {}) {
        this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
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
    setCurrentSlideByIdx(idx: number): void {
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
        for (let i=0; i<this.$slides.length; i++) {
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
     * This method allows you to get back the current slide object <ISSlideComponentSlide> either by it's id, or by it's idx.
     * 
     * @return      {ISSlideComponentSlide}        The slide object
     * 
     * @since       2.0.0
     * @author          Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io) 
     */
    getCurrentSlide(): ISSlideComponentSlide {
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
    getSlide(idIdxOrElement: string | number | HTMLElement): ISSlideComponentSlide {
        let $slide, id, idx;
        if (idIdxOrElement instanceof HTMLElement) {
            const id = idIdxOrElement.getAttribute('s-slider-slide');
            return this.getSlide(id);
        } else if (typeof idIdxOrElement === 'number') {
            idx = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
            id = $slide.getAttribute('s-slider-slide');
        } else if (typeof idIdxOrElement === 'string') {
            idx = this.getSlideIdxById(idIdxOrElement);
            id = idIdxOrElement;
            $slide = this.getSlideElementByIdx(idx);
        }
        if (!$slide) return;
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
    async goTo(slideIdIdxOrElement: number): SSliderComponent {
        const nextSlide = this.getSlide(slideIdIdxOrElement);
        if (!nextSlide) return;
        const currentSlide = this.getCurrentSlide();
        this._currentSlideIdx = nextSlide.idx;

        this._dispatch('s-slider-goto', {
            currentSlide,
            nextSlide
        });

        await this._transitionHandler(currentSlide.$side, nextSlide.$slide);

        this._dispatch('s-slider-goto-end', {
            currentSlide,
            nextSlide
        });

        return this;
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
    next(): SSliderComponent {
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
    previous(): SSliderComponent {
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
                behavior="${this.props.behavior?.id}"
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
                                    e.preventDefault();
                                    this.goTo(__parse(e.target.getAttribute('s-slider-nav')) ?? idx);
                                });
                                $nav._navInited = true;
                            }
                            if ($nav.getAttribute('s-slider-nav')) {
                                if ($nav.getAttribute('s-slider-nav') === this.getCurrentSlide().id) $nav.classList.add('active');
                                else $nav.classList.remove('active');
                            } else {
                                if (this.currentSlideIdx === idx) $nav.classList.add('active');
                                else $nav.classList.remove('active');
                            }
                            return $nav;
                        })}
                    </div>
                    ${this.props.controls ? html`
                        <div class="${this.componentUtils.className('__controls')}">
                            <div class="${this.componentUtils.className('__controls-previous')} ${this.isFirst() ? '' : 'active' }" @click=${() => this.previous()}>
                                ${this.props.previousIconClass ? html`
                                    <i class="${this.props.previousIconClass}"></i>
                                ` : html`<div class="${this.componentUtils.className('__controls-previous-arrow')}"></div>`}
                            </div>
                            <div class="${this.componentUtils.className('__controls-next')} ${this.isLast() ? '' : 'active' }" @click=${() => this.next()}>
                                ${this.props.nextIconClass ? html`
                                    <i class="${this.props.nextIconClass}"></i>
                                ` : html`<div class="${this.componentUtils.className('__controls-next-arrow')}"></div>`}
                            </div>
                        </div>
                    `:''}
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
