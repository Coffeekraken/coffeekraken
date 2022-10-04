<template>
  <div
    :id="id"
    ref="$container"
    :class="_classStringToObject(component?.className('', null, 's-bare'))"
    :status="status"
    :lnf="lnf ?? 'default'"
  >
    <div :class="_classStringToObject(component?.className('__root'))">
      <div
        :class="_classStringToObject(component?.className('__slides-wrapper'))"
      >
        <div
          ref="$slides"
          :class="_classStringToObject(component?.className('__slides'))"
        >
          <slot />
        </div>
      </div>

      <template v-if="slideElements.length">
        <div class="s-slider__nav">
          <template :key="index" v-for="(child, index) in slideElements">
            <div class="s-slider__nav-item active"></div>
          </template>
        </div>
      </template>

      <div class="s-slider__controls">
        <div class="s-slider__controls-previous">
          <div class="s-slider__controls-previous-arrow"></div>
        </div>
        <div class="s-slider__controls-next active">
          <div class="s-slider__controls-next-arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import __SComponent from "@coffeekraken/s-component";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

export default {
  name: "s",

  props: ["cssDeps", "lnf"],

  data: () => ({
    status: "idle",
    id: null,
    component: null,
    slideElements: [],
    slidesIds: [],
  }),

  mounted() {
    __SSliderComponentInterface;
    this.component = new __SComponent("s-slider", {
      bare: false,
    });
    this.id = `s-slider-${__uniqid()}`;
    this.mount();
    this.status = "mounted";
  },

  methods: {
    mount() {
      try {
        this.component.injectStyleInShadowRoot(
          [__css, ...(this.cssDeps ?? [])],
          this.$refs.$container
        );
      } catch (e) {}

      this.slideElements = Array.from(
        document.querySelectorAll("[s-slider-slide]")
      );
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
