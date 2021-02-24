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
} from "svelte/internal";
const {console: console_1} = globals;
import __SSvelteComponent from "@coffeekraken/sugar/js/svelte/SSvelteComponent";
const file = "component.svelte";
function create_fragment(ctx) {
  let div;
  let h1;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      h1.textContent = "Hello worlc";
      this.c = noop;
      add_location(h1, file, 20, 1, 418);
      add_location(div, file, 19, 0, 411);
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
  validate_slots("my-element", slots, []);
  class MyCoolComponent extends __SSvelteComponent {
    constructor() {
      super({svelteComponent: {}});
    }
  }
  console.log("DFF");
  new MyCoolComponent();
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
      console_1.warn(`<my-element> was created with unknown prop '${key}'`);
  });
  $$self.$capture_state = () => ({__SSvelteComponent, MyCoolComponent});
  return [];
}
class Component extends SvelteElement {
  constructor(options) {
    super();
    this.shadowRoot.innerHTML = `<style>h1{color:#f2bc2b;background:red}</style>`;
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
customElements.define("my-element", Component);
var component_default = Component;
export {
  component_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL2NvbXBvbmVudC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogY29tcG9uZW50LnN2ZWx0ZSBnZW5lcmF0ZWQgYnkgU3ZlbHRlIHYzLjMyLjAgKi9cbmltcG9ydCB7XG4gIFN2ZWx0ZUVsZW1lbnQsXG4gIGFkZF9sb2NhdGlvbixcbiAgYXBwZW5kX2RldixcbiAgYXR0cmlidXRlX3RvX29iamVjdCxcbiAgZGV0YWNoX2RldixcbiAgZGlzcGF0Y2hfZGV2LFxuICBlbGVtZW50LFxuICBnbG9iYWxzLFxuICBpbml0LFxuICBpbnNlcnRfZGV2LFxuICBub29wLFxuICBzYWZlX25vdF9lcXVhbCxcbiAgdmFsaWRhdGVfc2xvdHNcbn0gZnJvbSAnc3ZlbHRlL2ludGVybmFsJztcblxuY29uc3QgeyBjb25zb2xlOiBjb25zb2xlXzEgfSA9IGdsb2JhbHM7XG5pbXBvcnQgX19TU3ZlbHRlQ29tcG9uZW50IGZyb20gJ0Bjb2ZmZWVrcmFrZW4vc3VnYXIvanMvc3ZlbHRlL1NTdmVsdGVDb21wb25lbnQnO1xuY29uc3QgZmlsZSA9ICdjb21wb25lbnQuc3ZlbHRlJztcblxuZnVuY3Rpb24gY3JlYXRlX2ZyYWdtZW50KGN0eCkge1xuICBsZXQgZGl2O1xuICBsZXQgaDE7XG5cbiAgY29uc3QgYmxvY2sgPSB7XG4gICAgYzogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgZGl2ID0gZWxlbWVudCgnZGl2Jyk7XG4gICAgICBoMSA9IGVsZW1lbnQoJ2gxJyk7XG4gICAgICBoMS50ZXh0Q29udGVudCA9ICdIZWxsbyB3b3JsYyc7XG4gICAgICB0aGlzLmMgPSBub29wO1xuICAgICAgYWRkX2xvY2F0aW9uKGgxLCBmaWxlLCAyMCwgMSwgNDE4KTtcbiAgICAgIGFkZF9sb2NhdGlvbihkaXYsIGZpbGUsIDE5LCAwLCA0MTEpO1xuICAgIH0sXG4gICAgbDogZnVuY3Rpb24gY2xhaW0obm9kZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ29wdGlvbnMuaHlkcmF0ZSBvbmx5IHdvcmtzIGlmIHRoZSBjb21wb25lbnQgd2FzIGNvbXBpbGVkIHdpdGggdGhlIGBoeWRyYXRhYmxlOiB0cnVlYCBvcHRpb24nXG4gICAgICApO1xuICAgIH0sXG4gICAgbTogZnVuY3Rpb24gbW91bnQodGFyZ2V0LCBhbmNob3IpIHtcbiAgICAgIGluc2VydF9kZXYodGFyZ2V0LCBkaXYsIGFuY2hvcik7XG4gICAgICBhcHBlbmRfZGV2KGRpdiwgaDEpO1xuICAgIH0sXG4gICAgcDogbm9vcCxcbiAgICBpOiBub29wLFxuICAgIG86IG5vb3AsXG4gICAgZDogZnVuY3Rpb24gZGVzdHJveShkZXRhY2hpbmcpIHtcbiAgICAgIGlmIChkZXRhY2hpbmcpIGRldGFjaF9kZXYoZGl2KTtcbiAgICB9XG4gIH07XG5cbiAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVSZWdpc3RlckJsb2NrJywge1xuICAgIGJsb2NrLFxuICAgIGlkOiBjcmVhdGVfZnJhZ21lbnQubmFtZSxcbiAgICB0eXBlOiAnY29tcG9uZW50JyxcbiAgICBzb3VyY2U6ICcnLFxuICAgIGN0eFxuICB9KTtcblxuICByZXR1cm4gYmxvY2s7XG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlKCQkc2VsZiwgJCRwcm9wcywgJCRpbnZhbGlkYXRlKSB7XG4gIGxldCB7ICQkc2xvdHM6IHNsb3RzID0ge30sICQkc2NvcGUgfSA9ICQkcHJvcHM7XG4gIHZhbGlkYXRlX3Nsb3RzKCdteS1lbGVtZW50Jywgc2xvdHMsIFtdKTtcblxuICBjbGFzcyBNeUNvb2xDb21wb25lbnQgZXh0ZW5kcyBfX1NTdmVsdGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoeyBzdmVsdGVDb21wb25lbnQ6IHt9IH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdERkYnKTtcbiAgbmV3IE15Q29vbENvbXBvbmVudCgpO1xuICBjb25zdCB3cml0YWJsZV9wcm9wcyA9IFtdO1xuXG4gIE9iamVjdC5rZXlzKCQkcHJvcHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmICghfndyaXRhYmxlX3Byb3BzLmluZGV4T2Yoa2V5KSAmJiBrZXkuc2xpY2UoMCwgMikgIT09ICckJCcpXG4gICAgICBjb25zb2xlXzEud2FybihgPG15LWVsZW1lbnQ+IHdhcyBjcmVhdGVkIHdpdGggdW5rbm93biBwcm9wICcke2tleX0nYCk7XG4gIH0pO1xuXG4gICQkc2VsZi4kY2FwdHVyZV9zdGF0ZSA9ICgpID0+ICh7IF9fU1N2ZWx0ZUNvbXBvbmVudCwgTXlDb29sQ29tcG9uZW50IH0pO1xuICByZXR1cm4gW107XG59XG5cbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIFN2ZWx0ZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYDxzdHlsZT5oMXtjb2xvcjojZjJiYzJiO2JhY2tncm91bmQ6cmVkfTwvc3R5bGU+YDtcblxuICAgIGluaXQoXG4gICAgICB0aGlzLFxuICAgICAge1xuICAgICAgICB0YXJnZXQ6IHRoaXMuc2hhZG93Um9vdCxcbiAgICAgICAgcHJvcHM6IGF0dHJpYnV0ZV90b19vYmplY3QodGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgfSxcbiAgICAgIGluc3RhbmNlLFxuICAgICAgY3JlYXRlX2ZyYWdtZW50LFxuICAgICAgc2FmZV9ub3RfZXF1YWwsXG4gICAgICB7fVxuICAgICk7XG5cbiAgICBpZiAob3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGluc2VydF9kZXYob3B0aW9ucy50YXJnZXQsIHRoaXMsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdteS1lbGVtZW50JywgQ29tcG9uZW50KTtcbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudDtcbiJdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCQSxNQUFNLENBQUUsU0FBUyxhQUFjO0FBQy9CO0FBQ0EsTUFBTSxPQUFPO0FBRWIseUJBQXlCO0FBQ3ZCLE1BQUk7QUFDSixNQUFJO0FBRUosUUFBTSxRQUFRO0FBQUEsSUFDWixHQUFHO0FBQ0QsWUFBTSxRQUFRO0FBQ2QsV0FBSyxRQUFRO0FBQ2IsU0FBRyxjQUFjO0FBQ2pCLFdBQUssSUFBSTtBQUNULG1CQUFhLElBQUksTUFBTSxJQUFJLEdBQUc7QUFDOUIsbUJBQWEsS0FBSyxNQUFNLElBQUksR0FBRztBQUFBO0FBQUEsSUFFakMsR0FBRyxlQUFlO0FBQ2hCLFlBQU0sSUFBSSxNQUNSO0FBQUE7QUFBQSxJQUdKLEdBQUcsZUFBZSxRQUFRO0FBQ3hCLGlCQUFXLFFBQVEsS0FBSztBQUN4QixpQkFBVyxLQUFLO0FBQUE7QUFBQSxJQUVsQixHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHLGlCQUFpQjtBQUNsQixVQUFJO0FBQVcsbUJBQVc7QUFBQTtBQUFBO0FBSTlCLGVBQWEsdUJBQXVCO0FBQUEsSUFDbEM7QUFBQSxJQUNBLElBQUksZ0JBQWdCO0FBQUEsSUFDcEIsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1I7QUFBQTtBQUdGLFNBQU87QUFBQTtBQUdULGtCQUFrQixRQUFRLFNBQVM7QUFDakMsTUFBSSxDQUFFLFNBQVMsUUFBUSxJQUFJLFdBQVk7QUFDdkMsaUJBQWUsY0FBYyxPQUFPO0FBaEV0QyxnQ0FrRWdDO0FBQUEsSUFDNUI7QUFDRSxZQUFNLENBQUUsaUJBQWlCO0FBQUE7QUFBQTtBQUk3QixVQUFRLElBQUk7QUFDWixNQUFJO0FBQ0osUUFBTSxpQkFBaUI7QUFFdkIsU0FBTyxLQUFLLFNBQVMsUUFBUSxDQUFDO0FBQzVCLFFBQUksQ0FBQyxDQUFDLGVBQWUsUUFBUSxRQUFRLElBQUksTUFBTSxHQUFHLE9BQU87QUFDdkQsZ0JBQVUsS0FBSywrQ0FBK0M7QUFBQTtBQUdsRSxTQUFPLGlCQUFpQixNQUFPLEVBQUUsb0JBQW9CO0FBQ3JELFNBQU87QUFBQTtBQWxGVCx3QkFxRndCO0FBQUEsRUFDdEIsWUFBWTtBQUNWO0FBQ0EsU0FBSyxXQUFXLFlBQVk7QUFFNUIsU0FDRSxNQUNBO0FBQUEsTUFDRSxRQUFRLEtBQUs7QUFBQSxNQUNiLE9BQU8sb0JBQW9CLEtBQUs7QUFBQSxPQUVsQyxVQUNBLGlCQUNBLGdCQUNBO0FBR0YsUUFBSTtBQUNGLFVBQUksUUFBUTtBQUNWLG1CQUFXLFFBQVEsUUFBUSxNQUFNLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU1qRCxlQUFlLE9BQU8sY0FBYztBQUNwQyxJQUFPLG9CQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
