/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
let process = {};import {
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
} from "/node_modules/svelte/internal/index.mjs";
const {console: console_1} = globals;
import {onMount} from "/node_modules/svelte/index.mjs";
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
      add_location(h1, file, 33, 1, 903);
      add_location(div, file, 32, 0, 896);
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
      props: attribute_to_object(this.attributes)
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL3ByZXR0aWVyLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKiBwcmV0dGllci5zdmVsdGUgZ2VuZXJhdGVkIGJ5IFN2ZWx0ZSB2My4zMi4wICovXG5pbXBvcnQge1xuXHRTdmVsdGVFbGVtZW50LFxuXHRhZGRfbG9jYXRpb24sXG5cdGFwcGVuZF9kZXYsXG5cdGF0dHJpYnV0ZV90b19vYmplY3QsXG5cdGRldGFjaF9kZXYsXG5cdGRpc3BhdGNoX2Rldixcblx0ZWxlbWVudCxcblx0Z2xvYmFscyxcblx0aW5pdCxcblx0aW5zZXJ0X2Rldixcblx0bm9vcCxcblx0c2FmZV9ub3RfZXF1YWwsXG5cdHZhbGlkYXRlX3Nsb3RzXG59IGZyb20gXCJzdmVsdGUvaW50ZXJuYWxcIjtcblxuY29uc3QgeyBjb25zb2xlOiBjb25zb2xlXzEgfSA9IGdsb2JhbHM7XG5pbXBvcnQgeyBvbk1vdW50IH0gZnJvbSBcInN2ZWx0ZVwiO1xuY29uc3QgZmlsZSA9IFwicHJldHRpZXIuc3ZlbHRlXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZV9mcmFnbWVudChjdHgpIHtcblx0bGV0IGRpdjtcblx0bGV0IGgxO1xuXG5cdGNvbnN0IGJsb2NrID0ge1xuXHRcdGM6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcblx0XHRcdGRpdiA9IGVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRoMSA9IGVsZW1lbnQoXCJoMVwiKTtcblx0XHRcdGgxLnRleHRDb250ZW50ID0gXCJIZWxsbyB3b3JsY1wiO1xuXHRcdFx0dGhpcy5jID0gbm9vcDtcblx0XHRcdGFkZF9sb2NhdGlvbihoMSwgZmlsZSwgMzMsIDEsIDkwMyk7XG5cdFx0XHRhZGRfbG9jYXRpb24oZGl2LCBmaWxlLCAzMiwgMCwgODk2KTtcblx0XHR9LFxuXHRcdGw6IGZ1bmN0aW9uIGNsYWltKG5vZGVzKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmh5ZHJhdGUgb25seSB3b3JrcyBpZiB0aGUgY29tcG9uZW50IHdhcyBjb21waWxlZCB3aXRoIHRoZSBgaHlkcmF0YWJsZTogdHJ1ZWAgb3B0aW9uXCIpO1xuXHRcdH0sXG5cdFx0bTogZnVuY3Rpb24gbW91bnQodGFyZ2V0LCBhbmNob3IpIHtcblx0XHRcdGluc2VydF9kZXYodGFyZ2V0LCBkaXYsIGFuY2hvcik7XG5cdFx0XHRhcHBlbmRfZGV2KGRpdiwgaDEpO1xuXHRcdH0sXG5cdFx0cDogbm9vcCxcblx0XHRpOiBub29wLFxuXHRcdG86IG5vb3AsXG5cdFx0ZDogZnVuY3Rpb24gZGVzdHJveShkZXRhY2hpbmcpIHtcblx0XHRcdGlmIChkZXRhY2hpbmcpIGRldGFjaF9kZXYoZGl2KTtcblx0XHR9XG5cdH07XG5cblx0ZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlUmVnaXN0ZXJCbG9ja1wiLCB7XG5cdFx0YmxvY2ssXG5cdFx0aWQ6IGNyZWF0ZV9mcmFnbWVudC5uYW1lLFxuXHRcdHR5cGU6IFwiY29tcG9uZW50XCIsXG5cdFx0c291cmNlOiBcIlwiLFxuXHRcdGN0eFxuXHR9KTtcblxuXHRyZXR1cm4gYmxvY2s7XG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlKCQkc2VsZiwgJCRwcm9wcywgJCRpbnZhbGlkYXRlKSB7XG5cdGxldCB7ICQkc2xvdHM6IHNsb3RzID0ge30sICQkc2NvcGUgfSA9ICQkcHJvcHM7XG5cdHZhbGlkYXRlX3Nsb3RzKFwicy1wcmV0dGllclwiLCBzbG90cywgW10pO1xuXG5cdG9uTW91bnQoKCkgPT4ge1xuXHRcdC8vIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuXHRcdC8vIFx0Y29uc29sZS5sb2coJ2JlZXAnKTtcblx0XHQvLyB9LCAxMDAwKTtcblx0XHQvLyByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG5cdFx0Y29uc29sZS5sb2coXCJNT1VOVEVEXCIpO1xuXHR9KTtcblxuXHRjb25zb2xlLmxvZyhcIlBMT1BcIik7XG5cdGNvbnN0IHdyaXRhYmxlX3Byb3BzID0gW107XG5cblx0T2JqZWN0LmtleXMoJCRwcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdGlmICghfndyaXRhYmxlX3Byb3BzLmluZGV4T2Yoa2V5KSAmJiBrZXkuc2xpY2UoMCwgMikgIT09IFwiJCRcIikgY29uc29sZV8xLndhcm4oYDxzLXByZXR0aWVyPiB3YXMgY3JlYXRlZCB3aXRoIHVua25vd24gcHJvcCAnJHtrZXl9J2ApO1xuXHR9KTtcblxuXHQkJHNlbGYuJGNhcHR1cmVfc3RhdGUgPSAoKSA9PiAoeyBvbk1vdW50IH0pO1xuXHRyZXR1cm4gW107XG59XG5cbmNsYXNzIFByZXR0aWVyIGV4dGVuZHMgU3ZlbHRlRWxlbWVudCB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcigpO1xuXG5cdFx0aW5pdChcblx0XHRcdHRoaXMsXG5cdFx0XHR7XG5cdFx0XHRcdHRhcmdldDogdGhpcy5zaGFkb3dSb290LFxuXHRcdFx0XHRwcm9wczogYXR0cmlidXRlX3RvX29iamVjdCh0aGlzLmF0dHJpYnV0ZXMpXG5cdFx0XHR9LFxuXHRcdFx0aW5zdGFuY2UsXG5cdFx0XHRjcmVhdGVfZnJhZ21lbnQsXG5cdFx0XHRzYWZlX25vdF9lcXVhbCxcblx0XHRcdHt9XG5cdFx0KTtcblxuXHRcdGlmIChvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy50YXJnZXQpIHtcblx0XHRcdFx0aW5zZXJ0X2RldihvcHRpb25zLnRhcmdldCwgdGhpcywgb3B0aW9ucy5hbmNob3IpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoXCJzLXByZXR0aWVyXCIsIFByZXR0aWVyKTtcbmV4cG9ydCBkZWZhdWx0IFByZXR0aWVyOyJdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCQSxNQUFNLENBQUUsU0FBUyxhQUFjO0FBQy9CO0FBQ0EsTUFBTSxPQUFPO0FBRWIseUJBQXlCO0FBQ3hCLE1BQUk7QUFDSixNQUFJO0FBRUosUUFBTSxRQUFRO0FBQUEsSUFDYixHQUFHO0FBQ0YsWUFBTSxRQUFRO0FBQ2QsV0FBSyxRQUFRO0FBQ2IsU0FBRyxjQUFjO0FBQ2pCLFdBQUssSUFBSTtBQUNULG1CQUFhLElBQUksTUFBTSxJQUFJLEdBQUc7QUFDOUIsbUJBQWEsS0FBSyxNQUFNLElBQUksR0FBRztBQUFBO0FBQUEsSUFFaEMsR0FBRyxlQUFlO0FBQ2pCLFlBQU0sSUFBSSxNQUFNO0FBQUE7QUFBQSxJQUVqQixHQUFHLGVBQWUsUUFBUTtBQUN6QixpQkFBVyxRQUFRLEtBQUs7QUFDeEIsaUJBQVcsS0FBSztBQUFBO0FBQUEsSUFFakIsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsR0FBRyxpQkFBaUI7QUFDbkIsVUFBSTtBQUFXLG1CQUFXO0FBQUE7QUFBQTtBQUk1QixlQUFhLHVCQUF1QjtBQUFBLElBQ25DO0FBQUEsSUFDQSxJQUFJLGdCQUFnQjtBQUFBLElBQ3BCLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSO0FBQUE7QUFHRCxTQUFPO0FBQUE7QUFHUixrQkFBa0IsUUFBUSxTQUFTO0FBQ2xDLE1BQUksQ0FBRSxTQUFTLFFBQVEsSUFBSSxXQUFZO0FBQ3ZDLGlCQUFlLGNBQWMsT0FBTztBQUVwQyxVQUFRO0FBS1AsWUFBUSxJQUFJO0FBQUE7QUFHYixVQUFRLElBQUk7QUFDWixRQUFNLGlCQUFpQjtBQUV2QixTQUFPLEtBQUssU0FBUyxRQUFRO0FBQzVCLFFBQUksQ0FBQyxDQUFDLGVBQWUsUUFBUSxRQUFRLElBQUksTUFBTSxHQUFHLE9BQU87QUFBTSxnQkFBVSxLQUFLLCtDQUErQztBQUFBO0FBRzlILFNBQU8saUJBQWlCLE1BQU8sRUFBRTtBQUNqQyxTQUFPO0FBQUE7QUFoRlIsdUJBbUZ1QjtBQUFBLEVBQ3RCLFlBQVk7QUFDWDtBQUVBLFNBQ0MsTUFDQTtBQUFBLE1BQ0MsUUFBUSxLQUFLO0FBQUEsTUFDYixPQUFPLG9CQUFvQixLQUFLO0FBQUEsT0FFakMsVUFDQSxpQkFDQSxnQkFDQTtBQUdELFFBQUk7QUFDSCxVQUFJLFFBQVE7QUFDWCxtQkFBVyxRQUFRLFFBQVEsTUFBTSxRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNN0MsZUFBZSxPQUFPLGNBQWM7QUFDcEMsSUFBTyxtQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
