<script>
  import { onMount } from "svelte";

  import "../../../../../src/css/s-inline.css";
  import __SInlineComponentInterface from "../../../../../src/js/interface/SInlineComponentInterface";
  const DEFAULT_PROPS = __SInlineComponentInterface.defaults();

  export let src;

  function load() {
    (async () => {
      const r = await fetch(src);
      const text = await r.text();
      const parser = new DOMParser();
      const svg = parser.parseFromString(text, "text/html").body.innerHTML;
      svgCode = svg;
      loaded = true;
      container.innerHTML = svg;
    })();
  }

  let container;

  let status = "idle";
  let loaded = false;
  let svgCode = null;

  onMount(() => {
    __SInlineComponentInterface;
    status = "mounted";
    load();
  });
</script>

<div class="s-inline" {status} {loaded}>
  {#if status === "mounted"}
    <div bind:this={container} />
  {/if}
</div>
