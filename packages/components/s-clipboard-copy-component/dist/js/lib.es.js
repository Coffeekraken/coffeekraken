import * as riot from "riot";
import {v4} from "uuid";
import __SPromise from "@coffeekraken/s-promise";
import __SInterface from "@coffeekraken/s-interface";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __copy from "clipboard-copy";
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
const Component = {
  "css": ``,
  "exports": {
    state: {
      state: "pending"
    },
    onBeforeMount() {
      this.component = new __SComponentUtils(this.root, this.props, {
        interface: SHighlightJsComponentInterface
      });
      this.root.copy = this.copy.bind(this);
    },
    onMounted() {
    },
    async copy(text) {
      this.update({
        state: "copy"
      });
      copy(text).then(() => {
        this.update({
          state: "success"
        });
        setTimeout(() => {
          this.update({
            state: "pending"
          });
        }, this.component.props.successTimeout);
      }).catch(() => {
        this.update({
          state: "error"
        });
        setTimeout(() => {
          this.update({
            state: "pending"
          });
        }, this.component.props.errorTimeout);
      });
    }
  },
  "template": function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<svg expr0="expr0" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z" fill="currentColor"/><path d="M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z" fill="currentColor"/><path d="M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z" fill="currentColor"/></g><defs><clippath id="clip0"><rect width="20" height="20" fill="currentColor"/></clippath></defs></svg><svg expr1="expr1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><svg expr2="expr2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>', [
      {
        "expressions": [
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "state",
            "evaluate": function(scope) {
              return scope.state.state;
            }
          }
        ]
      },
      {
        "redundantAttribute": "expr0",
        "selector": "[expr0]",
        "expressions": [
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "class",
            "evaluate": function(scope) {
              return scope.component.className("__icon");
            }
          }
        ]
      },
      {
        "redundantAttribute": "expr1",
        "selector": "[expr1]",
        "expressions": [
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "class",
            "evaluate": function(scope) {
              return scope.component.className("__icon-success");
            }
          }
        ]
      },
      {
        "redundantAttribute": "expr2",
        "selector": "[expr2]",
        "expressions": [
          {
            "type": expressionTypes.ATTRIBUTE,
            "name": "class",
            "evaluate": function(scope) {
              return scope.component.className("__icon-error");
            }
          }
        ]
      }
    ]);
  },
  "name": "s-clipboard-copy"
};
riot.register("s-clipboard-copy", Component);
querySelectorLive("s-clipboard-copy:not([s-mounted])", ($elm) => {
  const id = $elm.id || "s-clipboard-copy-" + uniqid();
  $elm.setAttribute("id", id);
  riot.mount("#" + id);
});
Component.mount = () => {
  riot.mount("s-clipboard-copy");
};
if (!window.env)
  window.env = {SUGAR: {}};
window.env.SUGAR = JSON.parse('{"ENVIRONMENT":"development"}');
export default Component;
