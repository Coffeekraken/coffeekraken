var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var querySelectorLive_exports = {};
__export(querySelectorLive_exports, {
  default: () => querySelectorLive_default
});
module.exports = __toCommonJS(querySelectorLive_exports);
var import_uniqid = __toESM(require("../../../shared/string/uniqid"), 1);
var import_matches = __toESM(require("./matches"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
let _observer;
const _selectors = {};
function querySelectorLive(selector, cb = null, settings = {}) {
  const id = `${selector} - ${(0, import_uniqid.default)()}`;
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
      const mutationId = `mutation-${(0, import_uniqid.default)()}`;
      mutations.forEach((mutation) => {
        if (mutation.removedNodes && mutation.removedNodes.length) {
          [].forEach.call(mutation.removedNodes, (node) => {
            const selectors = Object.keys(_selectors);
            selectors.forEach((sel) => {
              if ((0, import_matches.default)(node, sel)) {
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
              if ((0, import_matches.default)(node, sel)) {
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
            if ((0, import_matches.default)(mutation.target, sel)) {
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
  return new import_s_promise.default(({ resolve, reject, emit }) => {
    _emit = emit;
  });
}
var querySelectorLive_default = querySelectorLive;
