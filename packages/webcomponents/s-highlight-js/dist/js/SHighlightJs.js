/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
import {
  SvelteElement,
  add_location,
  append_dev,
  attribute_to_object,
  detach_dev,
  dispatch_dev,
  element,
  globals,
  init,
  insert_dev,
  noop,
  safe_not_equal,
  validate_slots
} from "svelte/internal";
const {console: console_1} = globals;
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import __SSvelteComponent from "@coffeekraken/sugar/js/svelte/SSvelteComponent";
const file = "SHighlightJs.svelte";
function create_fragment(ctx) {
  let div;
  let h1;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      h1.textContent = "Hello worlc";
      this.c = noop;
      add_location(h1, file, 34, 1, 555);
      add_location(div, file, 33, 0, 548);
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: function mount(target, anchor) {
      insert_dev(target, div, anchor);
      append_dev(div, h1);
    },
    p: noop,
    i: noop,
    o: noop,
    d: function destroy(detaching) {
      if (detaching)
        detach_dev(div);
    }
  };
  dispatch_dev("SvelteRegisterBlock", {
    block,
    id: create_fragment.name,
    type: "component",
    source: "",
    ctx
  });
  return block;
}
function instance($$self, $$props, $$invalidate) {
  let {$$slots: slots = {}, $$scope} = $$props;
  validate_slots("s-highlight-js", slots, []);
  hljs.registerLanguage("javascript", javascript);
  class MyCoolComponent extends __SSvelteComponent {
    constructor() {
      super({svelteComponent: {}});
    }
  }
  console.log("fff");
  new MyCoolComponent();
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
      console_1.warn(`<s-highlight-js> was created with unknown prop '${key}'`);
  });
  $$self.$capture_state = () => ({
    hljs,
    javascript,
    __SSvelteComponent,
    MyCoolComponent
  });
  return [];
}
class SHighlightJs extends SvelteElement {
  constructor(options) {
    super();
    this.shadowRoot.innerHTML = `<style>h1{color:blue;background:red}</style>`;
    init(this, {
      target: this.shadowRoot,
      props: attribute_to_object(this.attributes),
      customElement: true
    }, instance, create_fragment, safe_not_equal, {});
    if (options) {
      if (options.target) {
        insert_dev(options.target, this, options.anchor);
      }
    }
  }
}
customElements.define("s-highlight-js", SHighlightJs);
var SHighlightJs_default = SHighlightJs;
export {
  SHighlightJs_default as default
};
//# sourceMappingURL=SHighlightJs.js.map
