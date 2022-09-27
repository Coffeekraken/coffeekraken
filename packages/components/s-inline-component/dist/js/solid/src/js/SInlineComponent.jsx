import { Show, onMount, createSignal } from "solid-js";
import "../../../../../src/css/s-inline.css";
import __SInlineComponentInterface from "../../../../../src/js/interface/SInlineComponentInterface";

const DEFAULT_PROPS = __SInlineComponentInterface.defaults();

function SInline(props) {
  const [status, setStatus] = createSignal("idle");
  const [loaded, setLoaded] = createSignal(false);
  const [svgCode, setSvgCode] = createSignal(null);

  function load() {
    (async () => {
      const r = await fetch(props.src);
      const text = await r.text();
      const parser = new DOMParser();
      const svg = parser.parseFromString(text, "text/html").body.innerHTML;
      setSvgCode(svg);
      setLoaded(true);
      container.innerHTML = svg;
    })();
  }

  let container;
  onMount(() => {
    __SInlineComponentInterface;
    setStatus("mounted");
    load();
  });
  return <div class="s-inline" status={status()} loaded={loaded()}>
      <Show when={status() === "mounted"}>
        <div ref={container}></div>
      </Show>
    </div>;
}

export default SInline;