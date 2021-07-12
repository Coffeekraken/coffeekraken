import * as riot from "riot";
import {v4} from "uuid";
import __SPromise from "@coffeekraken/s-promise";
import __SComponentUtils from "@coffeekraken/s-component-utils";
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
const Component = {
  "css": null,
  "exports": {
    onBeforeMount() {
      this.component = new __SComponentUtils(this.root, {});
    },
    setInnerHTML() {
      this.root.innerHTML = this.component.decodeHtml(this.props.html);
    },
    onMounted() {
      this.setInnerHTML();
    },
    onUpdated() {
      this.setInnerHTML();
    }
  },
  "template": null,
  "name": "s-raw-html"
};
riot.register("s-raw-html", Component);
querySelectorLive("s-raw-html:not([s-mounted])", ($elm) => {
  const id = $elm.id || "s-raw-html-" + uniqid();
  $elm.setAttribute("id", id);
  riot.mount("#" + id);
});
Component.mount = () => {
  riot.mount("s-raw-html");
};
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
export default Component;
