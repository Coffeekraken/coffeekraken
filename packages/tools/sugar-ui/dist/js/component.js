/* Compiled using Coffeekraken Sugar SJsCompiler class which stand over the AMAZING esbuild module */
let process = {};import {
  SvelteComponentDev,
  add_location,
  append_dev,
  attr_dev,
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
const file = "component.svelte";
function add_css() {
  var style = element("style");
  style.id = "svelte-w73qe0-style";
  style.textContent = "h1.svelte-w73qe0{background:red}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LnN2ZWx0ZSIsInNvdXJjZXMiOlsiY29tcG9uZW50LnN2ZWx0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuXHRjb25zb2xlLmxvZygnSGVsbG8gZmYgd29ybGQnKTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxIHtcblx0XHRiYWNrZ3JvdW5kOiByZWQ7XG5cdH1cbjwvc3R5bGU+XG5cbjxkaXY+XG5cdDxoMT5IZWxsbyB3b3JsYzwvaDE+XG48L2Rpdj4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0MsRUFBRSxjQUFDLENBQUMsQUFDSCxVQUFVLENBQUUsR0FBRyxBQUNoQixDQUFDIn0= */";
  append_dev(document.head, style);
}
function create_fragment(ctx) {
  let div;
  let h1;
  const block = {
    c: function create() {
      div = element("div");
      h1 = element("h1");
      h1.textContent = "Hello worlc";
      attr_dev(h1, "class", "svelte-w73qe0");
      add_location(h1, file, 11, 1, 105);
      add_location(div, file, 10, 0, 98);
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
function instance($$self, $$props) {
  let {$$slots: slots = {}, $$scope} = $$props;
  validate_slots("Component", slots, []);
  console.log("Hello ff world");
  const writable_props = [];
  Object.keys($$props).forEach((key) => {
    if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$")
      console_1.warn(`<Component> was created with unknown prop '${key}'`);
  });
  return [];
}
class Component extends SvelteComponentDev {
  constructor(options) {
    super(options);
    if (!document.getElementById("svelte-w73qe0-style"))
      add_css();
    init(this, options, instance, create_fragment, safe_not_equal, {});
    dispatch_dev("SvelteRegisterComponent", {
      component: this,
      tagName: "Component",
      options,
      id: create_fragment.name
    });
  }
}
export default Component;
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2pzL2NvbXBvbmVudC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyogY29tcG9uZW50LnN2ZWx0ZSBnZW5lcmF0ZWQgYnkgU3ZlbHRlIHYzLjMyLjEgKi9cbmltcG9ydCB7XG5cdFN2ZWx0ZUNvbXBvbmVudERldixcblx0YWRkX2xvY2F0aW9uLFxuXHRhcHBlbmRfZGV2LFxuXHRhdHRyX2Rldixcblx0ZGV0YWNoX2Rldixcblx0ZGlzcGF0Y2hfZGV2LFxuXHRlbGVtZW50LFxuXHRnbG9iYWxzLFxuXHRpbml0LFxuXHRpbnNlcnRfZGV2LFxuXHRub29wLFxuXHRzYWZlX25vdF9lcXVhbCxcblx0dmFsaWRhdGVfc2xvdHNcbn0gZnJvbSBcInN2ZWx0ZS9pbnRlcm5hbFwiO1xuXG5jb25zdCB7IGNvbnNvbGU6IGNvbnNvbGVfMSB9ID0gZ2xvYmFscztcbmNvbnN0IGZpbGUgPSBcImNvbXBvbmVudC5zdmVsdGVcIjtcblxuZnVuY3Rpb24gYWRkX2NzcygpIHtcblx0dmFyIHN0eWxlID0gZWxlbWVudChcInN0eWxlXCIpO1xuXHRzdHlsZS5pZCA9IFwic3ZlbHRlLXc3M3FlMC1zdHlsZVwiO1xuXHRzdHlsZS50ZXh0Q29udGVudCA9IFwiaDEuc3ZlbHRlLXc3M3FlMHtiYWNrZ3JvdW5kOnJlZH1cXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaVkyOXRjRzl1Wlc1MExuTjJaV3gwWlNJc0luTnZkWEpqWlhNaU9sc2lZMjl0Y0c5dVpXNTBMbk4yWld4MFpTSmRMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUk4YzJOeWFYQjBQbHh1WEhSamIyNXpiMnhsTG14dlp5Z25TR1ZzYkc4Z1ptWWdkMjl5YkdRbktUdGNiand2YzJOeWFYQjBQbHh1WEc0OGMzUjViR1UrWEc1Y2RHZ3hJSHRjYmx4MFhIUmlZV05yWjNKdmRXNWtPaUJ5WldRN1hHNWNkSDFjYmp3dmMzUjViR1UrWEc1Y2JqeGthWFkrWEc1Y2REeG9NVDVJWld4c2J5QjNiM0pzWXp3dmFERStYRzQ4TDJScGRqNGlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklrRkJTME1zUlVGQlJTeGpRVUZETEVOQlFVTXNRVUZEU0N4VlFVRlZMRU5CUVVVc1IwRkJSeXhCUVVOb1FpeERRVUZESW4wPSAqL1wiO1xuXHRhcHBlbmRfZGV2KGRvY3VtZW50LmhlYWQsIHN0eWxlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlX2ZyYWdtZW50KGN0eCkge1xuXHRsZXQgZGl2O1xuXHRsZXQgaDE7XG5cblx0Y29uc3QgYmxvY2sgPSB7XG5cdFx0YzogZnVuY3Rpb24gY3JlYXRlKCkge1xuXHRcdFx0ZGl2ID0gZWxlbWVudChcImRpdlwiKTtcblx0XHRcdGgxID0gZWxlbWVudChcImgxXCIpO1xuXHRcdFx0aDEudGV4dENvbnRlbnQgPSBcIkhlbGxvIHdvcmxjXCI7XG5cdFx0XHRhdHRyX2RldihoMSwgXCJjbGFzc1wiLCBcInN2ZWx0ZS13NzNxZTBcIik7XG5cdFx0XHRhZGRfbG9jYXRpb24oaDEsIGZpbGUsIDExLCAxLCAxMDUpO1xuXHRcdFx0YWRkX2xvY2F0aW9uKGRpdiwgZmlsZSwgMTAsIDAsIDk4KTtcblx0XHR9LFxuXHRcdGw6IGZ1bmN0aW9uIGNsYWltKG5vZGVzKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLmh5ZHJhdGUgb25seSB3b3JrcyBpZiB0aGUgY29tcG9uZW50IHdhcyBjb21waWxlZCB3aXRoIHRoZSBgaHlkcmF0YWJsZTogdHJ1ZWAgb3B0aW9uXCIpO1xuXHRcdH0sXG5cdFx0bTogZnVuY3Rpb24gbW91bnQodGFyZ2V0LCBhbmNob3IpIHtcblx0XHRcdGluc2VydF9kZXYodGFyZ2V0LCBkaXYsIGFuY2hvcik7XG5cdFx0XHRhcHBlbmRfZGV2KGRpdiwgaDEpO1xuXHRcdH0sXG5cdFx0cDogbm9vcCxcblx0XHRpOiBub29wLFxuXHRcdG86IG5vb3AsXG5cdFx0ZDogZnVuY3Rpb24gZGVzdHJveShkZXRhY2hpbmcpIHtcblx0XHRcdGlmIChkZXRhY2hpbmcpIGRldGFjaF9kZXYoZGl2KTtcblx0XHR9XG5cdH07XG5cblx0ZGlzcGF0Y2hfZGV2KFwiU3ZlbHRlUmVnaXN0ZXJCbG9ja1wiLCB7XG5cdFx0YmxvY2ssXG5cdFx0aWQ6IGNyZWF0ZV9mcmFnbWVudC5uYW1lLFxuXHRcdHR5cGU6IFwiY29tcG9uZW50XCIsXG5cdFx0c291cmNlOiBcIlwiLFxuXHRcdGN0eFxuXHR9KTtcblxuXHRyZXR1cm4gYmxvY2s7XG59XG5cbmZ1bmN0aW9uIGluc3RhbmNlKCQkc2VsZiwgJCRwcm9wcykge1xuXHRsZXQgeyAkJHNsb3RzOiBzbG90cyA9IHt9LCAkJHNjb3BlIH0gPSAkJHByb3BzO1xuXHR2YWxpZGF0ZV9zbG90cyhcIkNvbXBvbmVudFwiLCBzbG90cywgW10pO1xuXHRjb25zb2xlLmxvZyhcIkhlbGxvIGZmIHdvcmxkXCIpO1xuXHRjb25zdCB3cml0YWJsZV9wcm9wcyA9IFtdO1xuXG5cdE9iamVjdC5rZXlzKCQkcHJvcHMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRpZiAoIX53cml0YWJsZV9wcm9wcy5pbmRleE9mKGtleSkgJiYga2V5LnNsaWNlKDAsIDIpICE9PSBcIiQkXCIpIGNvbnNvbGVfMS53YXJuKGA8Q29tcG9uZW50PiB3YXMgY3JlYXRlZCB3aXRoIHVua25vd24gcHJvcCAnJHtrZXl9J2ApO1xuXHR9KTtcblxuXHRyZXR1cm4gW107XG59XG5cbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIFN2ZWx0ZUNvbXBvbmVudERldiB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHRpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ZlbHRlLXc3M3FlMC1zdHlsZVwiKSkgYWRkX2NzcygpO1xuXHRcdGluaXQodGhpcywgb3B0aW9ucywgaW5zdGFuY2UsIGNyZWF0ZV9mcmFnbWVudCwgc2FmZV9ub3RfZXF1YWwsIHt9KTtcblxuXHRcdGRpc3BhdGNoX2RldihcIlN2ZWx0ZVJlZ2lzdGVyQ29tcG9uZW50XCIsIHtcblx0XHRcdGNvbXBvbmVudDogdGhpcyxcblx0XHRcdHRhZ05hbWU6IFwiQ29tcG9uZW50XCIsXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0aWQ6IGNyZWF0ZV9mcmFnbWVudC5uYW1lXG5cdFx0fSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50OyJdLAogICJtYXBwaW5ncyI6ICJBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWdCQSxNQUFNLENBQUUsc0JBQXVCO0FBQy9CLGFBQWE7QUFFYjtBQUNDLGNBQVksUUFBUTtBQUNwQixRQUFNLEtBQUs7QUFDWCxRQUFNLGNBQWM7QUFDcEIsYUFBVyxTQUFTLE1BQU07QUFBQTtBQUczQjtBQUNDO0FBQ0E7QUFFQSxnQkFBYztBQUFBLElBQ2IsR0FBRztBQUNGLFlBQU0sUUFBUTtBQUNkLFdBQUssUUFBUTtBQUNiLFNBQUcsY0FBYztBQUNqQixlQUFTLElBQUksU0FBUztBQUN0QixtQkFBYSxJQUFJLE1BQU0sSUFBSSxHQUFHO0FBQzlCLG1CQUFhLEtBQUssTUFBTSxJQUFJLEdBQUc7QUFBQTtBQUFBLElBRWhDLEdBQUc7QUFDRixZQUFNLElBQUksTUFBTTtBQUFBO0FBQUEsSUFFakIsR0FBRztBQUNGLGlCQUFXLFFBQVEsS0FBSztBQUN4QixpQkFBVyxLQUFLO0FBQUE7QUFBQSxJQUVqQixHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQ0YsVUFBSTtBQUFXLG1CQUFXO0FBQUE7QUFBQTtBQUk1QixlQUFhLHVCQUF1QjtBQUFBLElBQ25DO0FBQUEsSUFDQSxJQUFJLGdCQUFnQjtBQUFBLElBQ3BCLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSO0FBQUE7QUFHRCxTQUFPO0FBQUE7QUFHUjtBQUNDLE9BQU0saUJBQWlCLElBQUksV0FBWTtBQUN2QyxpQkFBZSxhQUFhLE9BQU87QUFDbkMsVUFBUSxJQUFJO0FBQ1oseUJBQXVCO0FBRXZCLFNBQU8sS0FBSyxTQUFTLFFBQVE7QUFDNUIsUUFBSSxDQUFDLENBQUMsZUFBZSxRQUFRLFFBQVEsSUFBSSxNQUFNLEdBQUcsT0FBTztBQUFNLGdCQUFVLEtBQUssOENBQThDO0FBQUE7QUFHN0gsU0FBTztBQUFBO0FBNUVSLHdCQStFd0I7QUFBQSxFQUN2QjtBQUNDLFVBQU07QUFDTixRQUFJLENBQUMsU0FBUyxlQUFlO0FBQXdCO0FBQ3JELFNBQUssTUFBTSxTQUFTLFVBQVUsaUJBQWlCLGdCQUFnQjtBQUUvRCxpQkFBYSwyQkFBMkI7QUFBQSxNQUN2QyxXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0EsSUFBSSxnQkFBZ0I7QUFBQTtBQUFBO0FBQUE7QUFLdkIsZUFBZTsiLAogICJuYW1lcyI6IFtdCn0K
