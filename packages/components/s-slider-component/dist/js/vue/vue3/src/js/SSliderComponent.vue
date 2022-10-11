<template>
  <div
    v-bind="{
      controls: controls,
      nav: nav,
      swipe: swipe,
      mousewheel: mousewheel,
      clickOnSlide: clickOnSlide,
      loop: loop,
    }"
    :id="_id"
    ref="$container"
    :class="_classStringToObject(_component?.className('', null, 's-bare'))"
    :status="_status"
    :direction="direction"
    :behavior="behavior ?? 'default'"
    :lnf="lnf ?? 'default'"
  >
    <div
      :class="_classStringToObject(_component?.className('__root'))"
      ref="$root"
    >
      <div
        :class="_classStringToObject(_component?.className('__slides-wrapper'))"
      >
        <div
          ref="$slides"
          :class="_classStringToObject(_component?.className('__slides'))"
        >
          <slot />
        </div>
      </div>

      <template v-if="_slideElements.length">
        <div class="s-slider__nav">
          <template :key="index" v-for="(child, index) in _slideElements">
            <div
              :class="
                _classStringToObject(
                  `s-slider__nav-item ${
                    getSlideIdxByElement(child) == getCurrentSlideIdx()
                      ? 'active'
                      : ''
                  }`
                )
              "
            ></div>
          </template>
        </div>
      </template>

      <div class="s-slider__controls">
        <div
          :class="
            _classStringToObject(
              `s-slider__controls-previous ${
                loop || !isFirst() ? 'active' : ''
              }`
            )
          "
          @pointerup="previous()"
        >
          <div class="s-slider__controls-previous-arrow"></div>
        </div>
        <div
          :class="
            _classStringToObject(
              `s-slider__controls-next ${loop || !isLast() ? 'active' : ''}`
            )
          "
          @pointerup="next()"
        >
          <div class="s-slider__controls-next-arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import __SComponent from "@coffeekraken/s-component";
import { __elementAreaStats } from "@coffeekraken/sugar/dom";
import { __easeInterval } from "@coffeekraken/sugar/function";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

export default {
  name: "s",

  props: [
    "cssDeps",
    "direction",
    "transitionDuration",
    "transitionEasing",
    "slide",
    "loop",
    "behaviors",
    "behavior",
    "lnf",
    "controls",
    "nav",
    "swipe",
    "mousewheel",
    "clickOnSlide",
  ],

  data: () => ({
    _status: "idle",
    _id: null,
    _currentSlideId: null,
    _component: null,
    _behaviors: {},
    _slideElements: [],
    _slidesIds: [],
  }),

  mounted() {
    __SSliderComponentInterface;
    this._component = new __SComponent("s-slider", {
      bare: false,
    });
    this._id = `s-slider-${__uniqid()}`;
    this.mount();
    this._status = "mounted";
  },
  updated() {
    this.$refs.$root.style.setProperty(
      "--s-slider-slide",
      this.getCurrentSlideIdx()
    );
    this.$refs.$root.style.setProperty(
      "--s-slider-total",
      this._slidesIds.length
    );
  },

  methods: {
    mount() {
      try {
        this._component.injectStyleInShadowRoot(
          [__css, ...(this.cssDeps ?? [])],
          this.$refs.$container
        );
      } catch (e) {}

      this._behaviors = {
        default({ fromSlideId, toSlideId }) {
          const $slidesWrapper = this.$refs.$slides;
          $slidesWrapper._isScrollingFromNextOrPrevious = false;

          if (!$slidesWrapper._isBehaviorInited) {
            $slidesWrapper._isBehaviorInited = true; // const $slideElements = $slides.querySelector('slot');
            // console.log('^slot', slots.assignedNodes());
            // this._slideElements.forEach(($slide) => {
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

                for (let i = 0; i < this._slideElements.length; i++) {
                  const $slide = this._slideElements[i];

                  const stats = __elementAreaStats($slide, {
                    relativeTo: $slidesWrapper,
                  });

                  if (
                    stats.percentageX + stats.percentageY >
                    largerPercentage
                  ) {
                    largerPercentage = stats.percentageX + stats.percentageY;
                    $inViewSlide = $slide;
                  }
                }

                this.goTo(this.getSlideIdByElement($inViewSlide)); // console.log($inViewSlide);
              }, 100);
            });
          }

          const $from = this.getSlideElementById(fromSlideId),
            $to = this.getSlideElementById(toSlideId);
          const fromRect = $from.getBoundingClientRect(),
            toRect = $to.getBoundingClientRect(),
            parentRect = $slidesWrapper.getBoundingClientRect();
          let startX = $slidesWrapper.scrollLeft,
            startY = $slidesWrapper.scrollTop;
          const dist =
            this.direction === "vertical"
              ? toRect.y - parentRect.top
              : toRect.x - parentRect.left; // remove "smooth" from the scroll-behavior css

          const initialScrollBehavior = $slidesWrapper.style.scrollBehavior,
            initialScrollSnapType = $slidesWrapper.style.scrollSnapType;
          $slidesWrapper.style.scrollBehavior = "initial";
          $slidesWrapper.style.scrollSnapType = "initial";
          $slidesWrapper._isScrollingFromNextOrPrevious = true;

          __easeInterval(
            this.transitionDuration,
            (percentage) => {
              const offset = (dist / 100) * percentage;

              if (this.direction === "vertical") {
                $slidesWrapper.scrollTop = startY + offset;
              } else {
                $slidesWrapper.scrollLeft = startX + offset;
              }
            },
            {
              easing: this.transitionEasing,

              onEnd() {
                $slidesWrapper.style.scrollBehavior = initialScrollBehavior;
                $slidesWrapper.style.scrollSnapType = initialScrollSnapType;
                $slidesWrapper._isScrollingFromNextOrPrevious = false;
              },
            }
          );
        },
      }; // get all the slides elements

      this._slideElements = Array.from(
        document.querySelectorAll("[s-slider-slide]")
      ); // set all the slides ids

      this._slidesIds = this._slideElements.map(($slide, i) => {
        return $slide.hasAttribute("id") ? $slide.id : i;
      }); // activate the correct slide first

      if (this.slide) {
        this._currentSlideId = this.slide;
      } else {
        this._currentSlideId = this._slidesIds[0];
      }

      this.goTo(this._currentSlideId);
    },
    getSlideIdByElement($slide) {
      const idx = this._slideElements.indexOf($slide);

      if (idx === -1) {
        return;
      }

      return this._slidesIds[idx];
    },
    getSlideIdxByElement($slide) {
      return this.getSlideIdxById(this.getSlideIdByElement($slide));
    },
    getSlideElementById(id) {
      const slideIdx = this._slidesIds.indexOf(id);

      return this._slideElements[slideIdx];
    },
    getSlideIdxById(id) {
      return this._slidesIds.indexOf(id);
    },
    getFirstSlideId() {
      return this._slidesIds[0];
    },
    getLastSlideId() {
      return this._slidesIds[this._slidesIds.length - 1];
    },
    getPreviousSlideId() {
      const currentSlideIdx = this.getCurrentSlideIdx();

      if (currentSlideIdx > 0) {
        return this._slidesIds[currentSlideIdx - 1];
      }

      return this.getLastSlideId();
    },
    getNextSlideId() {
      const currentSlideIdx = this.getCurrentSlideIdx();

      if (currentSlideIdx < this._slidesIds.length) {
        return this._slidesIds[currentSlideIdx + 1];
      }

      return this.getFirstSlideId();
    },
    getCurrentSlideIdx() {
      return this.getSlideIdxById(this._currentSlideId);
    },
    isLast() {
      return this._currentSlideId === this.getLastSlideId();
    },
    isFirst() {
      return this._currentSlideId === this.getFirstSlideId();
    },
    previous() {
      if (!this.loop && this.isFirst()) {
        return;
      }

      this.goTo(this.getPreviousSlideId());
    },
    next() {
      if (!this.loop && this.isLast()) {
        return;
      }

      this.goTo(this.getNextSlideId());
    },
    goTo(slideId) {
      // call the behavior
      const behaviorFn =
        this.behaviors?.[this.behavior] ?? this._behaviors[this.behavior];
      behaviorFn?.({
        fromSlideId: this._currentSlideId,
        toSlideId: slideId,
        component: this._component,
        getSlideElementById: this.getSlideElementById,
        getSlideIdxById: this.getSlideIdxById,
        getFirstSlideId: this.getFirstSlideId,
        getLastSlideId: this.getLastSlideId,
        isLast: this.isLast,
        isFirst: this.isFirst,
      }); // assign the new state current slide id

      this._currentSlideId = slideId;
    },
    _classStringToObject(str) {
      const obj = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
};
</script>
