import {
  SvelteElement,
  attribute_to_object,
  dispatch_dev,
  globals,
  init,
  insert_dev,
  noop,
  safe_not_equal,
  validate_slots
} from "svelte/internal";
const {console: console_1} = globals;
const file = "coco.svelte";
function create_fragment(ctx) {
  const block = {
    c: function create() {
      this.c = noop;
    },
    l: function claim(nodes) {
      throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    },
    m: noop,
    p: noop,
    i: noop,
    o: noop,
    d: noop
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
function instance($$self, $$props) {
  let {$$slots: slots = {}, $$scope} = $$props;
  validate_slots("my-element", slots, []);
  console.log("ploefefep");
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
      console_1.warn(`<my-element> was created with unknown prop '${key}'`);
  });
  return [];
}
class Coco extends SvelteElement {
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
customElements.define("my-element", Coco);
var coco_default = Coco;
export {
  coco_default as default
};
//# sourceMappingURL=coco.js.map
