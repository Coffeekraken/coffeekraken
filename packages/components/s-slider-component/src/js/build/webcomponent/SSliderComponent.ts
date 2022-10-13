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
type Props = {
    id: string;
    lnf: 'none' | 'default';
    direction: 'horizontal' | 'vertical';
    behaviors: Record<string, any>;
    behavior: 'none' | 'default';
    nextIconClass: string;
    previousIconClass: string;
    controls: boolean;
    nav: boolean;
    swipe: boolean;
    mousewheel: boolean;
    clickOnSlide: boolean;
    loop: boolean;
    slide: number | string;
    progress: boolean;
    timer: number;
    autoplay: boolean;
    intersectionClasses: boolean;
    transitionDuration: number;
    transitionEasing: Function;
    transitionHandler: Function;
    cssDeps: string[];
};

import __css from '../../../../src/css/s-slider-component.css';
import __SSliderComponentInterface from '../../../../src/js/interface/SSliderComponentInterface';
import __SComponent from '@coffeekraken/s-component';
import { __elementAreaStats } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';
import { __uniqid } from '@coffeekraken/sugar/string';
export const DEFAULT_PROPS = __SSliderComponentInterface.defaults();
export const metas = {
    interface: __SSliderComponentInterface,
    preview: `
        <s-slider>
            <div s-slider-slide>
                <img src="https://picsum.photos/1600/900?1" />
            </div>
            <div s-slider-slide>
                <img src="https://picsum.photos/1600/900?2" />
            </div>
            <div s-slider-slide>
                <img src="https://picsum.photos/1600/900?3" />
            </div>
        </s-slider>
    `,
};

/**
 * Usage:
 *
 *  <s-slider></s-slider>
 *
 */
export default class SSlider extends HTMLElement {
    get _$container() {
        return this._root.querySelector("[data-ref='SSlider-$container']");
    }

    get _$root() {
        return this._root.querySelector("[data-ref='SSlider-$root']");
    }

    get _$slides() {
        return this._root.querySelector("[data-ref='SSlider-$slides']");
    }

    get _root() {
        return this.shadowRoot || this;
    }

    constructor() {
        super();
        const self = this;

        this.state = {
            _status: 'idle',
            _id: null,
            _currentSlideId: null,
            _component: null,
            _behaviors: {},
            _slideElements: [],
            _slidesIds: [],
            mount() {
                try {
                    self.state._component.injectStyleInShadowRoot(
                        [__css, ...(self.props.cssDeps ?? [])],
                        self._$container,
                    );
                } catch (e) {
                    console.log(e);
                }

                console.log('DEFAU', DEFAULT_PROPS);
                self.state._behaviors = {
                    default({ fromSlideId, toSlideId }) {
                        const $slidesWrapper = self._$slides;
                        $slidesWrapper._isScrollingFromNextOrPrevious = false;

                        if (!$slidesWrapper._isBehaviorInited) {
                            $slidesWrapper._isBehaviorInited = true; // const $slideElements = $slides.querySelector('slot');
                            // console.log('^slot', slots.assignedNodes());
                            // self.state._slideElements.forEach(($slide) => {
                            //     const observer = new IntersectionObserver(
                            //         (entries, observer) => {
                            //             console.log('mutations', entries);
                            //         },
                            //         {
                            //             // root: $slidesWrapper,
                            //         },
                            //     );
                            //     console.log('SLIT', $slide);
                            //     observer.observe($slide);
                            // });

                            let scrollTimeout;
                            $slidesWrapper.addEventListener('scroll', (e) => {
                                if (
                                    $slidesWrapper._isScrollingFromNextOrPrevious
                                ) {
                                    return;
                                }

                                clearTimeout(scrollTimeout);
                                scrollTimeout = setTimeout(() => {
                                    let $inViewSlide,
                                        largerPercentage = 0;

                                    for (
                                        let i = 0;
                                        i < self.state._slideElements.length;
                                        i++
                                    ) {
                                        const $slide =
                                            self.state._slideElements[i];

                                        const stats = __elementAreaStats(
                                            $slide,
                                            {
                                                relativeTo: $slidesWrapper,
                                            },
                                        );

                                        if (
                                            stats.percentageX +
                                                stats.percentageY >
                                            largerPercentage
                                        ) {
                                            largerPercentage =
                                                stats.percentageX +
                                                stats.percentageY;
                                            $inViewSlide = $slide;
                                        }
                                    }

                                    self.state.goTo(
                                        self.state.getSlideIdByElement(
                                            $inViewSlide,
                                        ),
                                    ); // console.log($inViewSlide);
                                }, 100);
                            });
                        }

                        const $from =
                                self.state.getSlideElementById(fromSlideId),
                            $to = self.state.getSlideElementById(toSlideId);
                        console.log('f', fromSlideId, $from, $to);
                        const fromRect = $from.getBoundingClientRect(),
                            toRect = $to.getBoundingClientRect(),
                            parentRect = $slidesWrapper.getBoundingClientRect();
                        let startX = $slidesWrapper.scrollLeft,
                            startY = $slidesWrapper.scrollTop;
                        const dist =
                            self.props.direction === 'vertical'
                                ? toRect.y - parentRect.top
                                : toRect.x - parentRect.left; // remove "smooth" from the scroll-behavior css

                        const initialScrollBehavior =
                                $slidesWrapper.style.scrollBehavior,
                            initialScrollSnapType =
                                $slidesWrapper.style.scrollSnapType;
                        $slidesWrapper.style.scrollBehavior = 'initial';
                        $slidesWrapper.style.scrollSnapType = 'initial';
                        $slidesWrapper._isScrollingFromNextOrPrevious = true;

                        __easeInterval(
                            self.props.transitionDuration,
                            (percentage) => {
                                const offset = (dist / 100) * percentage;

                                if (self.props.direction === 'vertical') {
                                    $slidesWrapper.scrollTop = startY + offset;
                                } else {
                                    $slidesWrapper.scrollLeft = startX + offset;
                                }
                            },
                            {
                                easing: self.props.transitionEasing,

                                onEnd() {
                                    $slidesWrapper.style.scrollBehavior =
                                        initialScrollBehavior;
                                    $slidesWrapper.style.scrollSnapType =
                                        initialScrollSnapType;
                                    $slidesWrapper._isScrollingFromNextOrPrevious =
                                        false;
                                },
                            },
                        );
                    },
                }; // get all the slides elements

                self.update();
                self.state._slideElements = Array.from(
                    document.querySelectorAll('[s-slider-slide]'),
                ); // set all the slides ids

                self.update();
                self.state._slidesIds = self.state._slideElements.map(
                    ($slide, i) => {
                        return $slide.hasAttribute('id') ? $slide.id : i;
                    },
                ); // activate the correct slide first

                self.update();

                if (self.props.slide) {
                    self.state._currentSlideId = self.props.slide;
                    self.update();
                } else {
                    self.state._currentSlideId = self.state._slidesIds[0];
                    self.update();
                }

                self.state.goTo(self.state._currentSlideId);
            },
            getSlideIdByElement($slide) {
                const idx = self.state._slideElements.indexOf($slide);

                if (idx === -1) {
                    return;
                }

                return self.state._slidesIds[idx];
            },
            getSlideIdxByElement($slide) {
                return self.state.getSlideIdxById(
                    self.state.getSlideIdByElement($slide),
                );
            },
            getSlideElementById(id) {
                const slideIdx = self.state._slidesIds.indexOf(id);

                return self.state._slideElements[slideIdx];
            },
            getSlideIdxById(id) {
                return self.state._slidesIds.indexOf(id);
            },
            getFirstSlideId() {
                return self.state._slidesIds[0];
            },
            getLastSlideId() {
                return self.state._slidesIds[self.state._slidesIds.length - 1];
            },
            getPreviousSlideId() {
                const currentSlideIdx = self.state.getCurrentSlideIdx();

                if (currentSlideIdx > 0) {
                    return self.state._slidesIds[currentSlideIdx - 1];
                }

                return self.state.getLastSlideId();
            },
            getNextSlideId() {
                const currentSlideIdx = self.state.getCurrentSlideIdx();

                if (currentSlideIdx < self.state._slidesIds.length) {
                    return self.state._slidesIds[currentSlideIdx + 1];
                }

                return self.state.getFirstSlideId();
            },
            getCurrentSlideIdx() {
                return self.state.getSlideIdxById(self.state._currentSlideId);
            },
            isLast() {
                return (
                    self.state._currentSlideId === self.state.getLastSlideId()
                );
            },
            isFirst() {
                return (
                    self.state._currentSlideId === self.state.getFirstSlideId()
                );
            },
            previous() {
                if (!self.props.loop && self.state.isFirst()) {
                    return;
                }

                self.state.goTo(self.state.getPreviousSlideId());
            },
            next() {
                if (!self.props.loop && self.state.isLast()) {
                    return;
                }

                self.state.goTo(self.state.getNextSlideId());
            },
            goTo(slideId) {
                console.log(
                    'Go to',
                    slideId,
                    self.state._currentSlideId,
                    self.state._slidesIds,
                    self.state._slideElements,
                ); // call the behavior

                const behaviorFn =
                    self.props.behaviors?.[self.props.behavior] ??
                    self.state._behaviors[self.props.behavior];
                behaviorFn?.({
                    fromSlideId: self.state._currentSlideId,
                    toSlideId: slideId,
                    component: self.state._component,
                    getSlideElementById: self.state.getSlideElementById,
                    getSlideIdxById: self.state.getSlideIdxById,
                    getFirstSlideId: self.state.getFirstSlideId,
                    getLastSlideId: self.state.getLastSlideId,
                    isLast: self.state.isLast,
                    isFirst: self.state.isFirst,
                }); // assign the new state current slide id

                self.state._currentSlideId = slideId;
                self.update();
            },
        };
        if (!this.props) {
            this.props = {};
        }

        this.componentProps = [
            'cssDeps',
            'direction',
            'transitionDuration',
            'transitionEasing',
            'slide',
            'loop',
            'behaviors',
            'behavior',
            'lnf',
            'controls',
            'nav',
            'swipe',
            'mousewheel',
            'clickOnSlide',
            'children',
        ];

        this.updateDeps = [[]];

        // used to keep track of all nodes created by show/for
        this.nodesToDestroy = [];
        // batch updates
        this.pendingUpdate = false;

        // Event handler for 'pointerup' event on div-s-slider-7
        this.onDivSSlider7Pointerup = (event) => {
            this.state.previous();
        };

        // Event handler for 'pointerup' event on div-s-slider-8
        this.onDivSSlider8Pointerup = (event) => {
            this.state.next();
        };

        if (true) {
            this.attachShadow({ mode: 'open' });
        }
    }

    destroyAnyNodes() {
        // destroy current view template refs before rendering again
        this.nodesToDestroy.forEach((el) => el.remove());
        this.nodesToDestroy = [];
    }

    connectedCallback() {
        this.getAttributeNames().forEach((attr) => {
            const jsVar = attr.replace(/-/g, '');
            const regexp = new RegExp(jsVar, 'i');
            this.componentProps.forEach((prop) => {
                if (regexp.test(prop)) {
                    const attrValue = this.getAttribute(attr);
                    if (this.props[prop] !== attrValue) {
                        this.props[prop] = attrValue;
                    }
                }
            });
        });

        // default props
        const defaultProps = __SComponent.getDefaultProps(
            this.tagName.toLowerCase(),
        );
        this.props.id = this.props.id ?? defaultProps.id ?? DEFAULT_PROPS.id;
        this.props.lnf =
            this.props.lnf ?? defaultProps.lnf ?? DEFAULT_PROPS.lnf;
        this.props.direction =
            this.props.direction ??
            defaultProps.direction ??
            DEFAULT_PROPS.direction;
        this.props.behaviors =
            this.props.behaviors ??
            defaultProps.behaviors ??
            DEFAULT_PROPS.behaviors;
        this.props.behavior =
            this.props.behavior ??
            defaultProps.behavior ??
            DEFAULT_PROPS.behavior;
        this.props.nextIconClass =
            this.props.nextIconClass ??
            defaultProps.nextIconClass ??
            DEFAULT_PROPS.nextIconClass;
        this.props.previousIconClass =
            this.props.previousIconClass ??
            defaultProps.previousIconClass ??
            DEFAULT_PROPS.previousIconClass;
        this.props.controls =
            this.props.controls ??
            defaultProps.controls ??
            DEFAULT_PROPS.controls;
        this.props.nav =
            this.props.nav ?? defaultProps.nav ?? DEFAULT_PROPS.nav;
        this.props.swipe =
            this.props.swipe ?? defaultProps.swipe ?? DEFAULT_PROPS.swipe;
        this.props.mousewheel =
            this.props.mousewheel ??
            defaultProps.mousewheel ??
            DEFAULT_PROPS.mousewheel;
        this.props.clickOnSlide =
            this.props.clickOnSlide ??
            defaultProps.clickOnSlide ??
            DEFAULT_PROPS.clickOnSlide;
        this.props.loop =
            this.props.loop ?? defaultProps.loop ?? DEFAULT_PROPS.loop;
        this.props.slide =
            this.props.slide ?? defaultProps.slide ?? DEFAULT_PROPS.slide;
        this.props.progress =
            this.props.progress ??
            defaultProps.progress ??
            DEFAULT_PROPS.progress;
        this.props.timer =
            this.props.timer ?? defaultProps.timer ?? DEFAULT_PROPS.timer;
        this.props.autoplay =
            this.props.autoplay ??
            defaultProps.autoplay ??
            DEFAULT_PROPS.autoplay;
        this.props.intersectionClasses =
            this.props.intersectionClasses ??
            defaultProps.intersectionClasses ??
            DEFAULT_PROPS.intersectionClasses;
        this.props.transitionDuration =
            this.props.transitionDuration ??
            defaultProps.transitionDuration ??
            DEFAULT_PROPS.transitionDuration;
        this.props.transitionEasing =
            this.props.transitionEasing ??
            defaultProps.transitionEasing ??
            DEFAULT_PROPS.transitionEasing;
        this.props.transitionHandler =
            this.props.transitionHandler ??
            defaultProps.transitionHandler ??
            DEFAULT_PROPS.transitionHandler;
        this.props.cssDeps =
            this.props.cssDeps ?? defaultProps.cssDeps ?? DEFAULT_PROPS.cssDeps;

        this._root.innerHTML = `
                        
      <div data-el="div-s-slider-1" data-ref="SSlider-$container">
        <div data-el="div-s-slider-2" data-ref="SSlider-$root">
          <div data-el="div-s-slider-3">
            <div data-el="div-s-slider-4" data-ref="SSlider-$slides">
              <slot></slot>
            </div>
          </div>
      
          <template data-el="show-s-slider">
            <div class="s-slider__nav">
              <template data-el="for-s-slider">
                <div data-el="div-s-slider-6"></div>
              </template>
            </div>
          </template>
      
          <div class="s-slider__controls">
            <div data-el="div-s-slider-7">
              <div class="s-slider__controls-previous-arrow"></div>
            </div>
      
            <div data-el="div-s-slider-8">
              <div class="s-slider__controls-next-arrow"></div>
            </div>
          </div>
        </div>
      </div>`;
        this.pendingUpdate = true;

        this.render();
        this.onMount();
        this.pendingUpdate = false;
        this.update();
    }

    showContent(el) {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement/content
        // grabs the content of a node that is between <template> tags
        // iterates through child nodes to register all content including text elements
        // attaches the content after the template

        const elementFragment = el.content.cloneNode(true);
        const children = Array.from(elementFragment.childNodes);
        children.forEach((child) => {
            if (el?.scope) {
                child.scope = el.scope;
            }
            if (el?.context) {
                child.context = el.context;
            }
            this.nodesToDestroy.push(child);
        });
        el.after(elementFragment);
    }

    onMount() {
        // onMount
        __SSliderComponentInterface;
        this.state._component = new __SComponent('s-slider', {
            bare: false,
        });
        this.update();
        this.state._id = `s-slider-${__uniqid()}`;
        this.update();
        this.state.mount();
        this.state._status = 'mounted';
        this.update();
    }

    onUpdate() {
        const self = this;

        console.log('UPDTE');
        self._$root.style.setProperty(
            '--s-slider-slide',
            self.state.getCurrentSlideIdx(),
        );
        self._$root.style.setProperty(
            '--s-slider-total',
            self.state._slidesIds.length,
        );
    }

    update() {
        if (this.pendingUpdate === true) {
            return;
        }
        this.pendingUpdate = true;
        this.render();
        this.onUpdate();
        this.pendingUpdate = false;
    }

    render() {
        // re-rendering needs to ensure that all nodes generated by for/show are refreshed
        this.destroyAnyNodes();
        this.updateBindings();
    }

    updateBindings() {
        this._root
            .querySelectorAll("[data-el='div-s-slider-1']")
            .forEach((el) => {
                el.setAttribute('id', this.state._id);

                el.className = this.state._component?.className(
                    '',
                    null,
                    's-bare',
                );

                el.setAttribute('status', this.state._status);

                el.setAttribute('direction', this.props.direction);

                el.setAttribute('behavior', this.props.behavior ?? 'default');

                el.setAttribute('lnf', this.props.lnf ?? 'default');
            });

        this._root
            .querySelectorAll("[data-el='div-s-slider-2']")
            .forEach((el) => {
                el.className = this.state._component?.className('__root');
            });

        this._root
            .querySelectorAll("[data-el='div-s-slider-3']")
            .forEach((el) => {
                el.className =
                    this.state._component?.className('__slides-wrapper');
            });

        this._root
            .querySelectorAll("[data-el='div-s-slider-4']")
            .forEach((el) => {
                el.className = this.state._component?.className('__slides');
            });

        this._root
            .querySelectorAll("[data-el='show-s-slider']")
            .forEach((el) => {
                const whenCondition = this.state._slideElements.length;
                if (whenCondition) {
                    this.showContent(el);
                }
            });

        this._root
            .querySelectorAll("[data-el='for-s-slider']")
            .forEach((el) => {
                let array = this.state._slideElements;
                this.renderLoop(el, array, 'child');
            });

        this._root
            .querySelectorAll("[data-el='div-s-slider-6']")
            .forEach((el) => {
                const child = this.getScope(el, 'child');

                el.className = `s-slider__nav-item ${
                    this.state.getSlideIdxByElement(child) ==
                    this.state.getCurrentSlideIdx()
                        ? 'active'
                        : ''
                }`;
            });

        this._root
            .querySelectorAll("[data-el='div-s-slider-7']")
            .forEach((el) => {
                el.className = `s-slider__controls-previous ${
                    this.props.loop || !this.state.isFirst() ? 'active' : ''
                }`;

                el.removeEventListener(
                    'pointerup',
                    this.onDivSSlider7Pointerup,
                );
                el.addEventListener('pointerup', this.onDivSSlider7Pointerup);
            });

        this._root
            .querySelectorAll("[data-el='div-s-slider-8']")
            .forEach((el) => {
                el.className = `s-slider__controls-next ${
                    this.props.loop || !this.state.isLast() ? 'active' : ''
                }`;

                el.removeEventListener(
                    'pointerup',
                    this.onDivSSlider8Pointerup,
                );
                el.addEventListener('pointerup', this.onDivSSlider8Pointerup);
            });
    }

    // Helper to render content
    renderTextNode(el, text) {
        const textNode = document.createTextNode(text);
        if (el?.scope) {
            textNode.scope = el.scope;
        }
        if (el?.context) {
            textNode.context = el.context;
        }
        el.after(textNode);
        this.nodesToDestroy.push(el.nextSibling);
    }

    // scope helper
    getScope(el, name) {
        do {
            let value = el?.scope?.[name];
            if (value !== undefined) {
                return value;
            }
        } while ((el = el.parentNode));
    }

    // Helper to render loops
    renderLoop(template, array, itemName, itemIndex, collectionName) {
        const collection = [];
        for (let [index, value] of array.entries()) {
            const elementFragment = template.content.cloneNode(true);
            const children = Array.from(elementFragment.childNodes);
            const localScope = {};
            let scope = localScope;
            if (template?.scope) {
                const getParent = {
                    get(target, prop, receiver) {
                        if (prop in target) {
                            return target[prop];
                        }
                        if (prop in template.scope) {
                            return template.scope[prop];
                        }
                        return target[prop];
                    },
                };
                scope = new Proxy(localScope, getParent);
            }
            children.forEach((child) => {
                if (itemName !== undefined) {
                    scope[itemName] = value;
                }
                if (itemIndex !== undefined) {
                    scope[itemIndex] = index;
                }
                if (collectionName !== undefined) {
                    scope[collectionName] = array;
                }
                child.scope = scope;
                if (template.context) {
                    child.context = context;
                }
                this.nodesToDestroy.push(child);
                collection.unshift(child);
            });
        }
        collection.forEach((child) => template.after(child));
    }
}

export function define(props = {}, tagName = 's-slider') {
    __SComponent.setDefaultProps(tagName, props);
    customElements.define(tagName, class SSliderComponent extends SSlider {});
}
