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
import {onMount} from "svelte";
const file = "prettier.svelte";
function create_fragment(ctx) {
  let div;
  let h1;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      h1.textContent = "Hello worlc";
      this.c = noop;
      add_location(h1, file, 48, 1, 958);
      add_location(div, file, 47, 0, 951);
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
  validate_slots("s-prettier", slots, []);
  onMount(() => {
    console.log("MOUNTED");
  });
  console.log("PLOP");
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
      console_1.warn(`<s-prettier> was created with unknown prop '${key}'`);
  });
  $$self.$capture_state = () => ({onMount});
  return [];
}
class Prettier extends SvelteElement {
  constructor(options) {
    super();
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
customElements.define("s-prettier", Prettier);
var prettier_default = Prettier;
export {
  prettier_default as default
};
//# sourceMappingURL=prettier.js.map
