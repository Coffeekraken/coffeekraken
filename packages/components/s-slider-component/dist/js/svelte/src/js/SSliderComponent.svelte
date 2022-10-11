<script>
  import { afterUpdate, onMount } from "svelte";

  import __SComponent from "@coffeekraken/s-component";
  import { __elementAreaStats } from "@coffeekraken/sugar/dom";
  import { __easeInterval } from "@coffeekraken/sugar/function";
  import { __uniqid } from "@coffeekraken/sugar/string";
  import __css from "../../../../../src/css/s-slider-component.css";
  import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
  const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

  export let cssDeps;
  export let direction;
  export let transitionDuration;
  export let transitionEasing;
  export let slide;
  export let loop;
  export let behaviors;
  export let behavior;
  export let lnf;
  export let controls;
  export let nav;
  export let swipe;
  export let mousewheel;
  export let clickOnSlide;

  function mount() {
    try {
      _component.injectStyleInShadowRoot(
        [__css, ...(cssDeps ?? [])],
        $container
      );
    } catch (e) {}

    _behaviors = {
      default({ fromSlideId, toSlideId }) {
        const $slidesWrapper = $slides;
        $slidesWrapper._isScrollingFromNextOrPrevious = false;

        if (!$slidesWrapper._isBehaviorInited) {
          $slidesWrapper._isBehaviorInited = true; // const $slideElements = $slides.querySelector('slot');
          // console.log('^slot', slots.assignedNodes());
          // _slideElements.forEach(($slide) => {
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
          $slidesWrapper.addEventListener("scroll", (e) => {
            if ($slidesWrapper._isScrollingFromNextOrPrevious) {
              return;
            }

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              let $inViewSlide,
                largerPercentage = 0;

              for (let i = 0; i < _slideElements.length; i++) {
                const $slide = _slideElements[i];

                const stats = __elementAreaStats($slide, {
                  relativeTo: $slidesWrapper,
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
        const dist =
          direction === "vertical"
            ? toRect.y - parentRect.top
            : toRect.x - parentRect.left; // remove "smooth" from the scroll-behavior css

        const initialScrollBehavior = $slidesWrapper.style.scrollBehavior,
          initialScrollSnapType = $slidesWrapper.style.scrollSnapType;
        $slidesWrapper.style.scrollBehavior = "initial";
        $slidesWrapper.style.scrollSnapType = "initial";
        $slidesWrapper._isScrollingFromNextOrPrevious = true;

        __easeInterval(
          transitionDuration,
          (percentage) => {
            const offset = (dist / 100) * percentage;

            if (direction === "vertical") {
              $slidesWrapper.scrollTop = startY + offset;
            } else {
              $slidesWrapper.scrollLeft = startX + offset;
            }
          },
          {
            easing: transitionEasing,

            onEnd() {
              $slidesWrapper.style.scrollBehavior = initialScrollBehavior;
              $slidesWrapper.style.scrollSnapType = initialScrollSnapType;
              $slidesWrapper._isScrollingFromNextOrPrevious = false;
            },
          }
        );
      },
    }; // get all the slides elements

    _slideElements = Array.from(document.querySelectorAll("[s-slider-slide]")); // set all the slides ids

    _slidesIds = _slideElements.map(($slide, i) => {
      return $slide.hasAttribute("id") ? $slide.id : i;
    }); // activate the correct slide first

    if (slide) {
      _currentSlideId = slide;
    } else {
      _currentSlideId = _slidesIds[0];
    }

    goTo(_currentSlideId);
  }

  function getSlideIdByElement($slide) {
    const idx = _slideElements.indexOf($slide);

    if (idx === -1) {
      return;
    }

    return _slidesIds[idx];
  }

  function getSlideIdxByElement($slide) {
    return getSlideIdxById(getSlideIdByElement($slide));
  }

  function getSlideElementById(id) {
    const slideIdx = _slidesIds.indexOf(id);

    return _slideElements[slideIdx];
  }

  function getSlideIdxById(id) {
    return _slidesIds.indexOf(id);
  }

  function getFirstSlideId() {
    return _slidesIds[0];
  }

  function getLastSlideId() {
    return _slidesIds[_slidesIds.length - 1];
  }

  function getPreviousSlideId() {
    const currentSlideIdx = getCurrentSlideIdx();

    if (currentSlideIdx > 0) {
      return _slidesIds[currentSlideIdx - 1];
    }

    return getLastSlideId();
  }

  function getNextSlideId() {
    const currentSlideIdx = getCurrentSlideIdx();

    if (currentSlideIdx < _slidesIds.length) {
      return _slidesIds[currentSlideIdx + 1];
    }

    return getFirstSlideId();
  }

  function getCurrentSlideIdx() {
    return getSlideIdxById(_currentSlideId);
  }

  function isLast() {
    return _currentSlideId === getLastSlideId();
  }

  function isFirst() {
    return _currentSlideId === getFirstSlideId();
  }

  function previous() {
    if (!loop && isFirst()) {
      return;
    }

    goTo(getPreviousSlideId());
  }

  function next() {
    if (!loop && isLast()) {
      return;
    }

    goTo(getNextSlideId());
  }

  function goTo(slideId) {
    // call the behavior
    const behaviorFn = behaviors?.[behavior] ?? _behaviors[behavior];
    behaviorFn?.({
      fromSlideId: _currentSlideId,
      toSlideId: slideId,
      component: _component,
      getSlideElementById: getSlideElementById,
      getSlideIdxById: getSlideIdxById,
      getFirstSlideId: getFirstSlideId,
      getLastSlideId: getLastSlideId,
      isLast: isLast,
      isFirst: isFirst,
    }); // assign the new state current slide id

    _currentSlideId = slideId;
  }

  let $container;
  let $root;
  let $slides;

  let _status = "idle";
  let _id = null;
  let _currentSlideId = null;
  let _component = null;
  let _behaviors = {};
  let _slideElements = [];
  let _slidesIds = [];

  onMount(() => {
    __SSliderComponentInterface;
    _component = new __SComponent("s-slider", {
      bare: false,
    });
    _id = `s-slider-${__uniqid()}`;
    mount();
    _status = "mounted";
  });

  afterUpdate(() => {
    $root.style.setProperty("--s-slider-slide", getCurrentSlideIdx());
    $root.style.setProperty("--s-slider-total", _slidesIds.length);
  });
</script>

<div
  {...{
    controls: controls,
    nav: nav,
    swipe: swipe,
    mousewheel: mousewheel,
    clickOnSlide: clickOnSlide,
    loop: loop,
  }}
  id={_id}
  bind:this={$container}
  class={_component?.className("", null, "s-bare")}
  status={_status}
  {direction}
  behavior={behavior ?? "default"}
  lnf={lnf ?? "default"}
>
  <div class={_component?.className("__root")} bind:this={$root}>
    <div class={_component?.className("__slides-wrapper")}>
      <div bind:this={$slides} class={_component?.className("__slides")}>
        <slot />
      </div>
    </div>

    {#if _slideElements.length}
      <div class="s-slider__nav">
        {#each _slideElements as child}
          <div
            class={`s-slider__nav-item ${
              getSlideIdxByElement(child) == getCurrentSlideIdx()
                ? "active"
                : ""
            }`}
          />
        {/each}
      </div>
    {/if}
    <div class="s-slider__controls">
      <div
        class={`s-slider__controls-previous ${
          loop || !isFirst() ? "active" : ""
        }`}
        on:pointerup={(event) => {
          previous();
        }}
      >
        <div class="s-slider__controls-previous-arrow" />
      </div>
      <div
        class={`s-slider__controls-next ${loop || !isLast() ? "active" : ""}`}
        on:pointerup={(event) => {
          next();
        }}
      >
        <div class="s-slider__controls-next-arrow" />
      </div>
    </div>
  </div>
</div>
