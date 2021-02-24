/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
let process = {};import {
  SvelteElement,
  attribute_to_object,
  dispatch_dev,
  init,
  insert_dev,
  noop,
  safe_not_equal,
  validate_slots
} from "svelte/internal";
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
  validate_slots("undefined", slots, []);
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
      console.warn(`<undefined> was created with unknown prop '${key}'`);
  });
  return [];
}
class Coco extends SvelteElement {
  constructor(options) {
    super();
    init(this, {
      target: this.shadowRoot,
      props: attribute_to_object(this.attributes)
    }, instance, create_fragment, safe_not_equal, {});
    if (options) {
      if (options.target) {
        insert_dev(options.target, this, options.anchor);
      }
    }
  }
}
var coco_default = Coco;
export {
  coco_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL3NlYXJjaC9jb2NvLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiBjb2NvLnN2ZWx0ZSBnZW5lcmF0ZWQgYnkgU3ZlbHRlIHYzLjMyLjAgKi9cbmltcG9ydCB7XG5cdFN2ZWx0ZUVsZW1lbnQsXG5cdGF0dHJpYnV0ZV90b19vYmplY3QsXG5cdGRpc3BhdGNoX2Rldixcblx0aW5pdCxcblx0aW5zZXJ0X2Rldixcblx0bm9vcCxcblx0c2FmZV9ub3RfZXF1YWwsXG5cdHZhbGlkYXRlX3Nsb3RzXG59IGZyb20gXCJzdmVsdGUvaW50ZXJuYWxcIjtcblxuY29uc3QgZmlsZSA9IFwiY29jby5zdmVsdGVcIjtcblxuZnVuY3Rpb24gY3JlYXRlX2ZyYWdtZW50KGN0eCkge1xuXHRjb25zdCBibG9jayA9IHtcblx0XHRjOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG5cdFx0XHR0aGlzLmMgPSBub29wO1xuXHRcdH0sXG5cdFx0bDogZnVuY3Rpb24gY2xhaW0obm9kZXMpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIm9wdGlvbnMuaHlkcmF0ZSBvbmx5IHdvcmtzIGlmIHRoZSBjb21wb25lbnQgd2FzIGNvbXBpbGVkIHdpdGggdGhlIGBoeWRyYXRhYmxlOiB0cnVlYCBvcHRpb25cIik7XG5cdFx0fSxcblx0XHRtOiBub29wLFxuXHRcdHA6IG5vb3AsXG5cdFx0aTogbm9vcCxcblx0XHRvOiBub29wLFxuXHRcdGQ6IG5vb3Bcblx0fTtcblxuXHRkaXNwYXRjaF9kZXYoXCJTdmVsdGVSZWdpc3RlckJsb2NrXCIsIHtcblx0XHRibG9jayxcblx0XHRpZDogY3JlYXRlX2ZyYWdtZW50Lm5hbWUsXG5cdFx0dHlwZTogXCJjb21wb25lbnRcIixcblx0XHRzb3VyY2U6IFwiXCIsXG5cdFx0Y3R4XG5cdH0pO1xuXG5cdHJldHVybiBibG9jaztcbn1cblxuZnVuY3Rpb24gaW5zdGFuY2UoJCRzZWxmLCAkJHByb3BzKSB7XG5cdGxldCB7ICQkc2xvdHM6IHNsb3RzID0ge30sICQkc2NvcGUgfSA9ICQkcHJvcHM7XG5cdHZhbGlkYXRlX3Nsb3RzKFwidW5kZWZpbmVkXCIsIHNsb3RzLCBbXSk7XG5cdGNvbnN0IHdyaXRhYmxlX3Byb3BzID0gW107XG5cblx0T2JqZWN0LmtleXMoJCRwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdGlmICghfndyaXRhYmxlX3Byb3BzLmluZGV4T2Yoa2V5KSAmJiBrZXkuc2xpY2UoMCwgMikgIT09IFwiJCRcIikgY29uc29sZS53YXJuKGA8dW5kZWZpbmVkPiB3YXMgY3JlYXRlZCB3aXRoIHVua25vd24gcHJvcCAnJHtrZXl9J2ApO1xuXHR9KTtcblxuXHRyZXR1cm4gW107XG59XG5cbmNsYXNzIENvY28gZXh0ZW5kcyBTdmVsdGVFbGVtZW50IHtcblx0Y29uc3RydWN0b3Iob3B0aW9ucykge1xuXHRcdHN1cGVyKCk7XG5cblx0XHRpbml0KFxuXHRcdFx0dGhpcyxcblx0XHRcdHtcblx0XHRcdFx0dGFyZ2V0OiB0aGlzLnNoYWRvd1Jvb3QsXG5cdFx0XHRcdHByb3BzOiBhdHRyaWJ1dGVfdG9fb2JqZWN0KHRoaXMuYXR0cmlidXRlcylcblx0XHRcdH0sXG5cdFx0XHRpbnN0YW5jZSxcblx0XHRcdGNyZWF0ZV9mcmFnbWVudCxcblx0XHRcdHNhZmVfbm90X2VxdWFsLFxuXHRcdFx0e31cblx0XHQpO1xuXG5cdFx0aWYgKG9wdGlvbnMpIHtcblx0XHRcdGlmIChvcHRpb25zLnRhcmdldCkge1xuXHRcdFx0XHRpbnNlcnRfZGV2KG9wdGlvbnMudGFyZ2V0LCB0aGlzLCBvcHRpb25zLmFuY2hvcik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvY287Il0sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFXQSxNQUFNLE9BQU87QUFFYix5QkFBeUI7QUFDeEIsUUFBTSxRQUFRO0FBQUEsSUFDYixHQUFHO0FBQ0YsV0FBSyxJQUFJO0FBQUE7QUFBQSxJQUVWLEdBQUcsZUFBZTtBQUNqQixZQUFNLElBQUksTUFBTTtBQUFBO0FBQUEsSUFFakIsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBO0FBR0osZUFBYSx1QkFBdUI7QUFBQSxJQUNuQztBQUFBLElBQ0EsSUFBSSxnQkFBZ0I7QUFBQSxJQUNwQixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUjtBQUFBO0FBR0QsU0FBTztBQUFBO0FBR1Isa0JBQWtCLFFBQVE7QUFDekIsTUFBSSxDQUFFLFNBQVMsUUFBUSxJQUFJLFdBQVk7QUFDdkMsaUJBQWUsYUFBYSxPQUFPO0FBQ25DLFFBQU0saUJBQWlCO0FBRXZCLFNBQU8sS0FBSyxTQUFTLFFBQVE7QUFDNUIsUUFBSSxDQUFDLENBQUMsZUFBZSxRQUFRLFFBQVEsSUFBSSxNQUFNLEdBQUcsT0FBTztBQUFNLGNBQVEsS0FBSyw4Q0FBOEM7QUFBQTtBQUczSCxTQUFPO0FBQUE7QUFqRFIsbUJBb0RtQjtBQUFBLEVBQ2xCLFlBQVk7QUFDWDtBQUVBLFNBQ0MsTUFDQTtBQUFBLE1BQ0MsUUFBUSxLQUFLO0FBQUEsTUFDYixPQUFPLG9CQUFvQixLQUFLO0FBQUEsT0FFakMsVUFDQSxpQkFDQSxnQkFDQTtBQUdELFFBQUk7QUFDSCxVQUFJLFFBQVE7QUFDWCxtQkFBVyxRQUFRLFFBQVEsTUFBTSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNN0MsSUFBTyxlQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
