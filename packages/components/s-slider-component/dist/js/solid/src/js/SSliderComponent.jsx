import { Show, For, onMount, createSignal } from "solid-js";
import __SComponent from "@coffeekraken/s-component";
import { __elementAreaStats } from "@coffeekraken/sugar/dom";
import { __easeInterval } from "@coffeekraken/sugar/function";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";

const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

function S(props) {
  const [_status, set_status] = createSignal("idle");
  const [_id, set_id] = createSignal(null);
  const [_currentSlideId, set_currentSlideId] = createSignal(null);
  const [_component, set_component] = createSignal(null);
  const [_behaviors, set_behaviors] = createSignal({});
  const [_slideElements, set_slideElements] = createSignal([]);
  const [_slidesIds, set_slidesIds] = createSignal([]);

  function mount() {
    try {
      _component().injectStyleInShadowRoot([__css, ...(props.cssDeps ?? [])], $container);
    } catch (e) {}

    set_behaviors({
      default({
        fromSlideId,
        toSlideId
      }) {
        const $slidesWrapper = $slides;
        $slidesWrapper._isScrollingFromNextOrPrevious = false;

        if (!$slidesWrapper._isBehaviorInited) {
          $slidesWrapper._isBehaviorInited = true; // const $slideElements = $slides.querySelector('slot');
          // console.log('^slot', slots.assignedNodes());
          // _slideElements().forEach(($slide) => {
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
          $slidesWrapper.addEventListener("scroll", e => {
            if ($slidesWrapper._isScrollingFromNextOrPrevious) {
              return;
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              let $inViewSlide,
                  largerPercentage = 0;

              for (let i = 0; i < _slideElements().length; i++) {
                const $slide = _slideElements()[i];

                const stats = __elementAreaStats($slide, {
                  relativeTo: $slidesWrapper
                });

                if (stats.percentageX + stats.percentageY > largerPercentage) {
                  largerPercentage = stats.percentageX + stats.percentageY;
                  $inViewSlide = $slide;
                }
              }

              goTo(getSlideIdByElement($inViewSlide)); // console.log($inViewSlide);
            }, 100);
          });
        }

        const $from = getSlideElementById(fromSlideId),
              $to = getSlideElementById(toSlideId);
        const fromRect = $from.getBoundingClientRect(),
              toRect = $to.getBoundingClientRect(),
              parentRect = $slidesWrapper.getBoundingClientRect();
        let startX = $slidesWrapper.scrollLeft,
            startY = $slidesWrapper.scrollTop;
        const dist = props.direction === "vertical" ? toRect.y - parentRect.top : toRect.x - parentRect.left; // remove "smooth" from the scroll-behavior css

        const initialScrollBehavior = $slidesWrapper.style.scrollBehavior,
              initialScrollSnapType = $slidesWrapper.style.scrollSnapType;
        $slidesWrapper.style.scrollBehavior = "initial";
        $slidesWrapper.style.scrollSnapType = "initial";
        $slidesWrapper._isScrollingFromNextOrPrevious = true;

        __easeInterval(props.transitionDuration, percentage => {
          const offset = dist / 100 * percentage;

          if (props.direction === "vertical") {
            $slidesWrapper.scrollTop = startY + offset;
          } else {
            $slidesWrapper.scrollLeft = startX + offset;
          }
        }, {
          easing: props.transitionEasing,

          onEnd() {
            $slidesWrapper.style.scrollBehavior = initialScrollBehavior;
            $slidesWrapper.style.scrollSnapType = initialScrollSnapType;
            $slidesWrapper._isScrollingFromNextOrPrevious = false;
          }

        });
      }

    }); // get all the slides elements

    set_slideElements(Array.from(document.querySelectorAll("[s-slider-slide]"))); // set all the slides ids

    set_slidesIds(_slideElements().map(($slide, i) => {
      return $slide.hasAttribute("id") ? $slide.id : i;
    })); // activate the correct slide first

    if (props.slide) {
      set_currentSlideId(props.slide);
    } else {
      set_currentSlideId(_slidesIds()[0]);
    }

    goTo(_currentSlideId());
  }

  function getSlideIdByElement($slide) {
    const idx = _slideElements().indexOf($slide);

    if (idx === -1) {
      return;
    }

    return _slidesIds()[idx];
  }

  function getSlideIdxByElement($slide) {
    return getSlideIdxById(getSlideIdByElement($slide));
  }

  function getSlideElementById(id) {
    const slideIdx = _slidesIds().indexOf(id);

    return _slideElements()[slideIdx];
  }

  function getSlideIdxById(id) {
    return _slidesIds().indexOf(id);
  }

  function getFirstSlideId() {
    return _slidesIds()[0];
  }

  function getLastSlideId() {
    return _slidesIds()[_slidesIds().length - 1];
  }

  function getPreviousSlideId() {
    const currentSlideIdx = getCurrentSlideIdx();

    if (currentSlideIdx > 0) {
      return _slidesIds()[currentSlideIdx - 1];
    }

    return getLastSlideId();
  }

  function getNextSlideId() {
    const currentSlideIdx = getCurrentSlideIdx();

    if (currentSlideIdx < _slidesIds().length) {
      return _slidesIds()[currentSlideIdx + 1];
    }

    return getFirstSlideId();
  }

  function getCurrentSlideIdx() {
    return getSlideIdxById(_currentSlideId());
  }

  function isLast() {
    return _currentSlideId() === getLastSlideId();
  }

  function isFirst() {
    return _currentSlideId() === getFirstSlideId();
  }

  function previous() {
    if (!props.loop && isFirst()) {
      return;
    }

    goTo(getPreviousSlideId());
  }

  function next() {
    if (!props.loop && isLast()) {
      return;
    }

    goTo(getNextSlideId());
  }

  function goTo(slideId) {
    // call the behavior
    const behaviorFn = props.behaviors?.[props.behavior] ?? _behaviors()[props.behavior];

    behaviorFn?.({
      fromSlideId: _currentSlideId(),
      toSlideId: slideId,
      component: _component(),
      getSlideElementById: getSlideElementById,
      getSlideIdxById: getSlideIdxById,
      getFirstSlideId: getFirstSlideId,
      getLastSlideId: getLastSlideId,
      isLast: isLast,
      isFirst: isFirst
    }); // assign the new state current slide id

    set_currentSlideId(slideId);
  }

  let $container;
  let $root;
  let $slides;
  onMount(() => {
    __SSliderComponentInterface;
    set_component(new __SComponent("s-slider", {
      bare: false
    }));
    set_id(`s-slider-${__uniqid()}`);
    mount();
    set_status("mounted");
  });
  return <div class={_component()?.className("", null, "s-bare")} {...{
    controls: props.controls,
    nav: props.nav,
    swipe: props.swipe,
    mousewheel: props.mousewheel,
    clickOnSlide: props.clickOnSlide,
    loop: props.loop
  }} id={_id()} ref={$container} status={_status()} direction={props.direction} behavior={props.behavior ?? "default"} lnf={props.lnf ?? "default"}>
      <div class={_component()?.className("__root")} ref={$root}>
        <div class={_component()?.className("__slides-wrapper")}>
          <div class={_component()?.className("__slides")} ref={$slides}>
            {props.children}
          </div>
        </div>
        <Show when={_slideElements().length}>
          <div class="s-slider__nav">
            <For each={_slideElements()}>
              {(child, _index) => {
              const index = _index();

              return <div class={`s-slider__nav-item ${getSlideIdxByElement(child) == getCurrentSlideIdx() ? "active" : ""}`}></div>;
            }}
            </For>
          </div>
        </Show>
        <div class="s-slider__controls">
          <div class={`s-slider__controls-previous ${props.loop || !isFirst() ? "active" : ""}`} onPointerUp={event => previous()}>
            <div class="s-slider__controls-previous-arrow"></div>
          </div>
          <div class={`s-slider__controls-next ${props.loop || !isLast() ? "active" : ""}`} onPointerUp={event => next()}>
            <div class="s-slider__controls-next-arrow"></div>
          </div>
        </div>
      </div>
    </div>;
}

export default S;