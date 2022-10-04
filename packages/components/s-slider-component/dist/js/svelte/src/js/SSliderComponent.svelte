<script>
  import { onMount } from "svelte";

  import __SComponent from "@coffeekraken/s-component";
  import { __uniqid } from "@coffeekraken/sugar/string";
  import __css from "../../../../../src/css/s-slider-component.css";
  import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
  const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

  export let cssDeps;
  export let lnf;

  function mount() {
    try {
      component.injectStyleInShadowRoot(
        [__css, ...(cssDeps ?? [])],
        $container
      );
    } catch (e) {}

    slideElements = Array.from(document.querySelectorAll("[s-slider-slide]"));
  }

  let $container;
  let $slides;

  let status = "idle";
  let id = null;
  let currentSlideId = null;
  let component = null;
  let slideElements = [];
  let slidesIds = [];

  onMount(() => {
    __SSliderComponentInterface;
    component = new __SComponent("s-slider", {
      bare: false,
    });
    id = `s-slider-${__uniqid()}`;
    mount();
    status = "mounted";
  });
</script>

<div
  {id}
  bind:this={$container}
  class={component?.className("", null, "s-bare")}
  {status}
  lnf={lnf ?? "default"}
>
  <div class={component?.className("__root")}>
    <div class={component?.className("__slides-wrapper")}>
      <div bind:this={$slides} class={component?.className("__slides")}>
        <slot />
      </div>
    </div>

    {#if slideElements.length}
      <div class="s-slider__nav">
        {#each slideElements as child, idx}
          <div class={`s-slider__nav-item ${true ? "active" : ""}`} />
        {/each}
      </div>
    {/if}
    <div class="s-slider__controls">
      <div class="s-slider__controls-previous ">
        <div class="s-slider__controls-previous-arrow" />
      </div>
      <div class="s-slider__controls-next active">
        <div class="s-slider__controls-next-arrow" />
      </div>
    </div>
  </div>
</div>
