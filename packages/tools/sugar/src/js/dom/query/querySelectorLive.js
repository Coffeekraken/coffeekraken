import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import uniqid from "../../../shared/string/uniqid";
import matches from "./matches";
import __SPromise from "@coffeekraken/s-promise";
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
  const id = `${selector} - ${uniqid()}`;
  let _emit;
  settings = Object.assign({}, {
    rootNode: document,
    once: true,
    onRemove: null
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
      _emit == null ? void 0 : _emit("node", node);
      obj.cb && obj.cb(node, () => {
        delete _selectors[obj.selector];
      });
    });
  }
  function removeNode(node, sel, mutationId) {
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
      _emit == null ? void 0 : _emit("removedNode", node);
      obj.settings.onRemove && obj.settings.onRemove(node, () => {
        delete _selectors[obj.selector];
      });
    });
  }
  if (!_observer) {
    _observer = new MutationObserver((mutations) => {
      const mutationId = `mutation-${uniqid()}`;
      mutations.forEach((mutation) => {
        if (mutation.removedNodes && mutation.removedNodes.length) {
          [].forEach.call(mutation.removedNodes, (node) => {
            const selectors = Object.keys(_selectors);
            selectors.forEach((sel) => {
              if (matches(node, sel)) {
                removeNode(node, sel, mutationId);
              }
            });
            if (!node.querySelectorAll)
              return;
            selectors.forEach((sel) => {
              const nestedNodes = node.querySelectorAll(sel);
              [].forEach.call(nestedNodes, (nestedNode) => {
                removeNode(nestedNode, sel, mutationId);
              });
            });
          });
        }
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
  return new __SPromise(({ resolve, reject, emit }) => {
    _emit = emit;
  });
}
var querySelectorLive_default = querySelectorLive;
export {
  querySelectorLive_default as default
};
