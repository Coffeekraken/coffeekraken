import {
    For,
    onMount,
    onUpdate,
    Show,
    useDefaultProps,
    useMetadata,
    useRef,
    useStore,
} from '@builder.io/mitosis';

import __SComponent from '@coffeekraken/s-component';
import { __elementAreaStats } from '@coffeekraken/sugar/dom';
import { __easeInterval } from '@coffeekraken/sugar/function';
import { __uniqid } from '@coffeekraken/sugar/string';
import __css from '../../../../src/css/s-slider-component.css';
import __SSliderComponentInterface from '../../../../src/js/interface/SSliderComponentInterface';

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

const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

useMetadata({
    isAttachedToShadowDom: true,
});

export const preview = `
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
`;

export default function SSlider(props: Props) {
    // default props
    useDefaultProps<Props>(DEFAULT_PROPS);

    // const component = new __SComponent('s-code-example');
    const $container = useRef<HTMLElement>(null),
        $slides = useRef<HTMLElement>(null),
        $root = useRef<HTMLElement>(null),
        $code = useRef<HTMLElement>(null);

    // state
    const state = useStore({
        _status: 'idle',
        _id: null,
        _currentSlideId: null,
        _component: null,
        _behaviors: {},
        _slideElements: [],
        _slidesIds: [],
        mount() {
            try {
                state._component.injectStyleInShadowRoot(
                    [__css, ...(props.cssDeps ?? [])],
                    $container,
                );
            } catch (e) {}

            state._behaviors = {
                default({ fromSlideId, toSlideId }) {
                    const $slidesWrapper = $slides;

                    $slidesWrapper._isScrollingFromNextOrPrevious = false;

                    if (!$slidesWrapper._isBehaviorInited) {
                        $slidesWrapper._isBehaviorInited = true;

                        // const $slideElements = $slides.querySelector('slot');
                        // console.log('^slot', slots.assignedNodes());

                        // state._slideElements.forEach(($slide) => {
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
                            if ($slidesWrapper._isScrollingFromNextOrPrevious) {
                                return;
                            }
                            clearTimeout(scrollTimeout);
                            scrollTimeout = setTimeout(() => {
                                let $inViewSlide,
                                    largerPercentage = 0;

                                for (
                                    let i = 0;
                                    i < state._slideElements.length;
                                    i++
                                ) {
                                    const $slide = state._slideElements[i];

                                    const stats = __elementAreaStats($slide, {
                                        relativeTo: $slidesWrapper,
                                    });
                                    if (
                                        stats.percentageX + stats.percentageY >
                                        largerPercentage
                                    ) {
                                        largerPercentage =
                                            stats.percentageX +
                                            stats.percentageY;
                                        $inViewSlide = $slide;
                                    }
                                }

                                state.goTo(
                                    state.getSlideIdByElement($inViewSlide),
                                );

                                // console.log($inViewSlide);
                            }, 100);
                        });
                    }

                    const $from = state.getSlideElementById(fromSlideId),
                        $to = state.getSlideElementById(toSlideId);

                    const fromRect = $from.getBoundingClientRect(),
                        toRect = $to.getBoundingClientRect(),
                        parentRect = $slidesWrapper.getBoundingClientRect();

                    let startX = $slidesWrapper.scrollLeft,
                        startY = $slidesWrapper.scrollTop;
                    const dist =
                        props.direction === 'vertical'
                            ? toRect.y - parentRect.top
                            : toRect.x - parentRect.left;

                    // remove "smooth" from the scroll-behavior css
                    const initialScrollBehavior =
                            $slidesWrapper.style.scrollBehavior,
                        initialScrollSnapType =
                            $slidesWrapper.style.scrollSnapType;
                    $slidesWrapper.style.scrollBehavior = 'initial';
                    $slidesWrapper.style.scrollSnapType = 'initial';

                    $slidesWrapper._isScrollingFromNextOrPrevious = true;
                    __easeInterval(
                        props.transitionDuration,
                        (percentage) => {
                            const offset = (dist / 100) * percentage;
                            if (props.direction === 'vertical') {
                                $slidesWrapper.scrollTop = startY + offset;
                            } else {
                                $slidesWrapper.scrollLeft = startX + offset;
                            }
                        },
                        {
                            easing: props.transitionEasing,
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
            };

            // get all the slides elements
            state._slideElements = Array.from(
                document.querySelectorAll('[s-slider-slide]'),
            );

            // set all the slides ids
            state._slidesIds = state._slideElements.map(($slide, i) => {
                return $slide.hasAttribute('id') ? $slide.id : i;
            });

            // activate the correct slide first
            if (props.slide) {
                state._currentSlideId = props.slide;
            } else {
                state._currentSlideId = state._slidesIds[0];
            }

            state.goTo(state._currentSlideId);
        },
        getSlideIdByElement($slide) {
            const idx = state._slideElements.indexOf($slide);
            if (idx === -1) {
                return;
            }
            return state._slidesIds[idx];
        },
        getSlideIdxByElement($slide) {
            return state.getSlideIdxById(state.getSlideIdByElement($slide));
        },
        getSlideElementById(id) {
            const slideIdx = state._slidesIds.indexOf(id);
            return state._slideElements[slideIdx];
        },
        getSlideIdxById(id) {
            return state._slidesIds.indexOf(id);
        },
        getFirstSlideId() {
            return state._slidesIds[0];
        },
        getLastSlideId() {
            return state._slidesIds[state._slidesIds.length - 1];
        },
        getPreviousSlideId() {
            const currentSlideIdx = state.getCurrentSlideIdx();
            if (currentSlideIdx > 0) {
                return state._slidesIds[currentSlideIdx - 1];
            }
            return state.getLastSlideId();
        },
        getNextSlideId() {
            const currentSlideIdx = state.getCurrentSlideIdx();
            if (currentSlideIdx < state._slidesIds.length) {
                return state._slidesIds[currentSlideIdx + 1];
            }
            return state.getFirstSlideId();
        },
        getCurrentSlideIdx() {
            return state.getSlideIdxById(state._currentSlideId);
        },
        isLast() {
            return state._currentSlideId === state.getLastSlideId();
        },
        isFirst() {
            return state._currentSlideId === state.getFirstSlideId();
        },
        previous() {
            if (!props.loop && state.isFirst()) {
                return;
            }
            state.goTo(state.getPreviousSlideId());
        },
        next() {
            if (!props.loop && state.isLast()) {
                return;
            }
            state.goTo(state.getNextSlideId());
        },
        goTo(slideId) {
            // call the behavior
            const behaviorFn =
                props.behaviors?.[props.behavior] ??
                state._behaviors[props.behavior];
            behaviorFn?.({
                fromSlideId: state._currentSlideId,
                toSlideId: slideId,
                component: state._component,
                getSlideElementById: state.getSlideElementById,
                getSlideIdxById: state.getSlideIdxById,
                getFirstSlideId: state.getFirstSlideId,
                getLastSlideId: state.getLastSlideId,
                isLast: state.isLast,
                isFirst: state.isFirst,
            });

            // assign the new state current slide id
            state._currentSlideId = slideId;
        },
    });

    onUpdate(() => {
        $root.style.setProperty('--s-slider-slide', state.getCurrentSlideIdx());
        $root.style.setProperty('--s-slider-total', state._slidesIds.length);
    });

    // when component is mounting
    onMount(() => {
        __SSliderComponentInterface;
        state._component = new __SComponent('s-slider', {
            bare: false,
        });
        state._id = `s-slider-${__uniqid()}`;
        state.mount();
        state._status = 'mounted';
    });

    // component template
    return (
        <div
            id={state._id}
            ref={$container}
            class={state._component?.className('', null, 's-bare')}
            status={state._status}
            direction={props.direction}
            behavior={props.behavior ?? 'default'}
            lnf={props.lnf ?? 'default'}
            {...{
                controls: props.controls,
                nav: props.nav,
                swipe: props.swipe,
                mousewheel: props.mousewheel,
                clickOnSlide: props.clickOnSlide,
                loop: props.loop,
            }}
        >
            <div class={state._component?.className('__root')} ref={$root}>
                <div class={state._component?.className('__slides-wrapper')}>
                    <div
                        ref={$slides}
                        class={state._component?.className('__slides')}
                    >
                        {props.children}
                    </div>
                </div>
                <Show when={state._slideElements.length}>
                    <div class="s-slider__nav">
                        <For each={state._slideElements}>
                            {(child) => (
                                <div
                                    class={`s-slider__nav-item ${
                                        state.getSlideIdxByElement(child) ==
                                        state.getCurrentSlideIdx()
                                            ? 'active'
                                            : ''
                                    }`}
                                ></div>
                            )}
                        </For>
                    </div>
                </Show>
                <div class="s-slider__controls">
                    <div
                        class={`s-slider__controls-previous ${
                            props.loop || !state.isFirst() ? 'active' : ''
                        }`}
                        onPointerUp={() => state.previous()}
                    >
                        <div class="s-slider__controls-previous-arrow"></div>
                    </div>
                    <div
                        class={`s-slider__controls-next ${
                            props.loop || !state.isLast() ? 'active' : ''
                        }`}
                        onPointerUp={() => state.next()}
                    >
                        <div class="s-slider__controls-next-arrow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
