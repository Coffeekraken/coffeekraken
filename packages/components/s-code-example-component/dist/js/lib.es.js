import {v4} from "uuid";
import __SPromise from "@coffeekraken/s-promise";
import {pushScopeId, popScopeId, openBlock, createBlock, withScopeId, createApp} from "vue";
function uniqid() {
  return v4();
}
function matches(el, selector) {
  if (el.nodeName == "#comment" || el.nodeName == "#text") {
    return false;
  }
  const p = Element.prototype;
  const f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  };
  return f.call(el, selector);
}
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
  const id = `${selector} - ${uniqid()}`;
  settings = Object.assign({}, {
    rootNode: document,
    once: true
  }, settings);
  if (!_selectors[selector]) {
    _selectors[selector] = [
      {
        id,
        selector,
        cb,
        lastMutationId: null,
        settings
      }
    ];
  } else {
    _selectors[selector].push({
      id,
      selector,
      cb,
      lastMutationId: null,
      settings
    });
  }
  return new __SPromise(({resolve, reject, emit}) => {
    function pushNewNode(node, sel, mutationId) {
      const objs = _selectors[sel];
      if (!objs)
        return;
      objs.forEach((obj) => {
        if (obj.lastMutationId && obj.lastMutationId === mutationId)
          return;
        if (obj.settings.once) {
          if (!node._querySelectorLive) {
            node._querySelectorLive = {};
          }
          if (node._querySelectorLive[obj.id])
            return;
          node._querySelectorLive[obj.id] = true;
        }
        emit("node", node);
        obj.cb && obj.cb(node, () => {
          delete _selectors[obj.selector];
        });
      });
    }
    if (!_observer) {
      _observer = new MutationObserver((mutations) => {
        const mutationId = `mutation-${uniqid()}`;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes && mutation.addedNodes.length) {
            [].forEach.call(mutation.addedNodes, (node) => {
              const selectors = Object.keys(_selectors);
              selectors.forEach((sel) => {
                if (matches(node, sel)) {
                  pushNewNode(node, sel, mutationId);
                }
              });
              if (!node.querySelectorAll)
                return;
              selectors.forEach((sel) => {
                const nestedNodes = node.querySelectorAll(sel);
                [].forEach.call(nestedNodes, (nestedNode) => {
                  pushNewNode(nestedNode, sel, mutationId);
                });
              });
            });
          } else if (mutation.attributeName) {
            const selectors = Object.keys(_selectors);
            selectors.forEach((sel) => {
              if (matches(mutation.target, sel)) {
                pushNewNode(mutation.target, sel, mutationId);
              }
            });
          }
        });
      });
      _observer.observe(settings.rootNode, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "id"]
      });
    }
    [].forEach.call(settings.rootNode.querySelectorAll(selector), (node) => {
      pushNewNode(node, selector, "init");
    });
  });
}
var SCodeExample_vue_vue_type_style_index_0_scoped_true_lang = "\n.text[data-v-2c5508a7] {\n    content: 'hello';\n}\nspan[data-v-2c5508a7] {\n    background: hsl(calc(var(--se1bfb3b758c, 0) + var(--s316562e3fed ,0)),calc((var(--s445835177de, 0) + var(--s1373b5284cd, 0)) * 1%),calc((var(--s9cd72d9418e, 0) + var(--s84f63a9bd98, 0)) * 1%));\n}\n";
const _sfc_main = {
  something() {
    console.log("Hello");
  }
};
const _withId = /* @__PURE__ */ withScopeId("data-v-2c5508a7");
pushScopeId("data-v-2c5508a7");
const _hoisted_1 = {class: "text"};
popScopeId();
const _sfc_render = /* @__PURE__ */ _withId((_ctx, _cache, $props, $setup, $data, $options) => {
  return openBlock(), createBlock("span", _hoisted_1, "HEllo world");
});
_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = "data-v-2c5508a7";
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
function define() {
  querySelectorLive("s-code-example", ($elm) => {
    const app = createApp(_sfc_main);
    app.mount($elm);
  });
}
export default _sfc_main;
export {define};
