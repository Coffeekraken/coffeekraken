<template>
  <div class="s-inline" :status="status" :loaded="loaded">
    <template v-if="status === 'mounted'">
      <div ref="container"></div>
    </template>
  </div>
</template>

<script>
import "../../../../../src/css/s-inline.css";
import __SInlineComponentInterface from "../../../../../src/js/interface/SInlineComponentInterface";
const DEFAULT_PROPS = __SInlineComponentInterface.defaults();

export default {
  name: "s-inline",

  props: ["src"],

  data: () => ({ status: "idle", loaded: false, svgCode: null }),

  mounted() {
    __SInlineComponentInterface;
    this.status = "mounted";
    this.load();
  },

  methods: {
    load() {
      (async () => {
        const r = await fetch(this.src);
        const text = await r.text();
        const parser = new DOMParser();
        const svg = parser.parseFromString(text, "text/html").body.innerHTML;
        this.svgCode = svg;
        this.loaded = true;
        this.$refs.container.innerHTML = svg;
      })();
    },
  },
};
</script>
