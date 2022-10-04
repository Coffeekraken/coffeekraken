import {
    For,
    onMount,
    Show,
    useDefaultProps,
    useMetadata,
    useRef,
    useStore,
} from '@builder.io/mitosis';

import __SComponent from '@coffeekraken/s-component';
import { __uniqid } from '@coffeekraken/sugar/string';
import __css from '../../../../../src/css/s-slider-component.css';
import __SSliderComponentInterface from '../../../../../src/js/interface/SSLiderComponentInterface';

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
    behabiors: Record<string, any>;
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

export default function S(props: Props) {
    // default props
    useDefaultProps<Props>(DEFAULT_PROPS);

    // const component = new __SComponent('s-code-example');
    const $container = useRef<HTMLElement>(null),
        $slides = useRef<HTMLElement>(null),
        $code = useRef<HTMLElement>(null);

    // state
    const state = useStore({
        status: 'idle',
        id: null,
        currentSlideId: null,
        component: null,
        slideElements: [],
        slidesIds: [],
        mount() {
            try {
                state.component.injectStyleInShadowRoot(
                    [__css, ...(props.cssDeps ?? [])],
                    $container,
                );
            } catch (e) {}

            state.slideElements = Array.from(
                document.querySelectorAll('[s-slider-slide]'),
            );
        },
    });

    // onUpdate(() => {
    //     // // update max-lines property
    //     // $content?.style.setProperty('--max-lines', props.lines ?? 999999);
    // });

    // when component is mounting
    onMount(() => {
        __SSliderComponentInterface;
        state.component = new __SComponent('s-slider', {
            bare: false,
        });
        state.id = `s-slider-${__uniqid()}`;
        state.mount();
        state.status = 'mounted';
    });

    // component template
    return (
        <div
            id={state.id}
            ref={$container}
            class={state.component?.className('', null, 's-bare')}
            status={state.status}
            lnf={props.lnf ?? 'default'}
        >
            <div class={state.component?.className('__root')}>
                <div class={state.component?.className('__slides-wrapper')}>
                    <div
                        ref={$slides}
                        class={state.component?.className('__slides')}
                    >
                        {props.children}
                    </div>
                </div>
                <Show when={state.slideElements.length}>
                    <div class="s-slider__nav">
                        <For each={state.slideElements}>
                            {(child, idx) => (
                                <div
                                    class={`s-slider__nav-item ${
                                        true ? 'active' : ''
                                    }`}
                                ></div>
                            )}
                        </For>
                    </div>
                </Show>
                <div class="s-slider__controls">
                    <div class="s-slider__controls-previous ">
                        <div class="s-slider__controls-previous-arrow"></div>
                    </div>
                    <div class="s-slider__controls-next active">
                        <div class="s-slider__controls-next-arrow"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
