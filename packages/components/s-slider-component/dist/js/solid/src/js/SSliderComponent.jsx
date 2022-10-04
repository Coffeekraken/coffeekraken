import { Show, For, onMount, createSignal } from "solid-js";
import __SComponent from "@coffeekraken/s-component";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";

const DEFAULT_PROPS = __SSliderComponentInterface.defaults();

function S(props) {
  const [status, setStatus] = createSignal("idle");
  const [id, setId] = createSignal(null);
  const [currentSlideId, setCurrentSlideId] = createSignal(null);
  const [component, setComponent] = createSignal(null);
  const [slideElements, setSlideElements] = createSignal([]);
  const [slidesIds, setSlidesIds] = createSignal([]);

  function mount() {
    try {
      component().injectStyleInShadowRoot([__css, ...(props.cssDeps ?? [])], $container);
    } catch (e) {}

    setSlideElements(Array.from(document.querySelectorAll("[s-slider-slide]")));
  }

  let $container;
  let $slides;
  onMount(() => {
    __SSliderComponentInterface;
    setComponent(new __SComponent("s-slider", {
      bare: false
    }));
    setId(`s-slider-${__uniqid()}`);
    mount();
    setStatus("mounted");
  });
  return <div class={component()?.className("", null, "s-bare")} id={id()} ref={$container} status={status()} lnf={props.lnf ?? "default"}>
      <div class={component()?.className("__root")}>
        <div class={component()?.className("__slides-wrapper")}>
          <div class={component()?.className("__slides")} ref={$slides}>
            {props.children}
          </div>
        </div>
        <Show when={slideElements().length}>
          <div class="s-slider__nav">
            <For each={slideElements()}>
              {(child, _index) => {
              const idx = _index();

              return <div class={`s-slider__nav-item ${true ? "active" : ""}`}></div>;
            }}
            </For>
          </div>
        </Show>
        <div class="s-slider__controls">
          <div class="s-slider__controls-previous">
            <div class="s-slider__controls-previous-arrow"></div>
          </div>
          <div class="s-slider__controls-next active">
            <div class="s-slider__controls-next-arrow"></div>
          </div>
        </div>
      </div>
    </div>;
}

export default S;