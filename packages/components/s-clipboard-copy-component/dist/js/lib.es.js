import {pushScopeId, popScopeId, openBlock, createBlock, withScopeId, createVNode, createApp, h} from "vue";
import wrapper from "vue3-webcomponent-wrapper";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __copy from "clipboard-copy";
class SHighlightJsComponentInterface extends __SInterface {
}
SHighlightJsComponentInterface.definition = {
  successTimeout: {
    type: "Number",
    default: 1500
  },
  errorTimeout: {
    type: "Number",
    default: 3e3
  }
};
function copy(text) {
  return __copy(text);
}
var SClipboardCopy_vue_vue_type_style_index_0_scoped_true_lang = '\n.root[data-v-a68856d6] {\n      display: inline-block;\n      width: 1em; height: 1em;\n      position: relative;\n      cursor: pointer;\n}\n.root[data-v-a68856d6][state="pending"][data-v-a68856d6] .icon-copy[data-v-a68856d6] {\n          opacity: 1;\n}\n.root[data-v-a68856d6][state="copy"][data-v-a68856d6] .icon-copy[data-v-a68856d6] {\n          opacity: 1;\n}\n.root[data-v-a68856d6][state="success"][data-v-a68856d6] {\n        color: hsl(calc(var(--s833dc3705a8, 0) + var(--s43390be2316 ,0)),calc((var(--s86b6f84158f, 0) + var(--sd9f744147cd, 0)) * 1%),calc((var(--s5c48a669ecf, 0) + var(--s2c04907cda0, 0)) * 1%));\n}\n.root[data-v-a68856d6][state="success"][data-v-a68856d6] .icon-success[data-v-a68856d6] {\n          opacity: 1;\n}\n.root[data-v-a68856d6][state="error"][data-v-a68856d6] {\n        color: hsl(calc(var(--s9f4a69aa425, 0) + var(--s8345c7f8e61 ,0)),calc((var(--s88f927582b5, 0) + var(--se4a503962ac, 0)) * 1%),calc((var(--s6f3a4577631, 0) + var(--se8457b43571, 0)) * 1%));\n}\n.root[data-v-a68856d6][state="error"][data-v-a68856d6] .icon-error[data-v-a68856d6] {\n          opacity: 1;\n}\nsvg[data-v-a68856d6] {\n      position: absolute;\n      top: 50%; left: 50%;\n      transform: translate(-50%, -50%);\n      display: block;\n      width: 1em;\n      height: 1em;\n      background-size:contain;\n    opacity: 0;\n      pointer-events: none;\n}\n\n';
const _sfc_main = {
  data() {
    return {
      state: "pending",
      component: null
    };
  },
  props: [...Object.keys(SHighlightJsComponentInterface.definition)],
  async mounted() {
    this.component = new __SComponentUtils("s-clipboard-copy", this.$el, this.$props, {
      interface: SHighlightJsComponentInterface
    });
    this.component.exposeApi({
      copy: this.copy.bind(this)
    });
  },
  methods: {
    async copy(text) {
      this.state = "copy";
      copy(text).then(() => {
        this.state = "success";
        setTimeout(() => {
          this.state = "pending";
        }, this.component.props.successTimeout);
      }).catch((e) => {
        this.state = "error";
        setTimeout(() => {
          this.state = "pending";
        }, this.component.props.errorTimeout);
      });
    }
  }
};
const _withId = /* @__PURE__ */ withScopeId("data-v-a68856d6");
pushScopeId("data-v-a68856d6");
const _hoisted_1 = {
  ref: "svg",
  class: "icon-copy",
  width: "20",
  height: "20",
  viewBox: "0 0 20 20",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = /* @__PURE__ */ createVNode("g", {"clip-path": "url(#clip0)"}, [
  /* @__PURE__ */ createVNode("path", {
    d: "M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z",
    fill: "currentColor"
  }),
  /* @__PURE__ */ createVNode("path", {
    d: "M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z",
    fill: "currentColor"
  }),
  /* @__PURE__ */ createVNode("path", {
    d: "M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z",
    fill: "currentColor"
  })
], -1);
const _hoisted_3 = /* @__PURE__ */ createVNode("defs", null, [
  /* @__PURE__ */ createVNode("clipPath", {id: "clip0"}, [
    /* @__PURE__ */ createVNode("rect", {
      width: "20",
      height: "20",
      fill: "currentColor"
    })
  ])
], -1);
const _hoisted_4 = /* @__PURE__ */ createVNode("svg", {
  class: "icon-success",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, [
  /* @__PURE__ */ createVNode("path", {d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"}),
  /* @__PURE__ */ createVNode("polyline", {points: "22 4 12 14.01 9 11.01"})
], -1);
const _hoisted_5 = /* @__PURE__ */ createVNode("svg", {
  class: "icon-error",
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, [
  /* @__PURE__ */ createVNode("polygon", {points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"}),
  /* @__PURE__ */ createVNode("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }),
  /* @__PURE__ */ createVNode("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  })
], -1);
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("div", {
    class: "root",
    ref: "root",
    state: $data.state
  }, [
    (openBlock(), createBlock("svg", _hoisted_1, [
      _hoisted_2,
      _hoisted_3
    ], 512)),
    _hoisted_4,
    _hoisted_5
  ], 8, ["state"]);
});
_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = "data-v-a68856d6";
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
function webcomponent(tagName = "s-clipboard-copy") {
  const webComponent = wrapper(_sfc_main, createApp, h);
  window.customElements.define(tagName, webComponent);
}
export default _sfc_main;
export {webcomponent};

                var $style = document.querySelector('style#SClipboardCopy_vue_vue_type_style_index_0_scoped_true_lang');
                if (!$style) {
                  $style = document.createElement('style');
                  $style.setAttribute('id', 'SClipboardCopy_vue_vue_type_style_index_0_scoped_true_lang');
                  $style.type = 'text/css';
                  $style.appendChild(document.createTextNode(SClipboardCopy_vue_vue_type_style_index_0_scoped_true_lang));
                  document.head.appendChild($style);
                }
              