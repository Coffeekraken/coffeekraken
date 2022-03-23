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
var whenVisible_exports = {};
__export(whenVisible_exports, {
  default: () => whenVisible_default
});
module.exports = __toCommonJS(whenVisible_exports);
var import_visible = __toESM(require("../is/visible"), 1);
var import_closestNotVisible = __toESM(require("../query/closestNotVisible"), 1);
function whenVisible(elm, cb = null) {
  return new Promise((resolve, reject) => {
    let isSelfVisible = false, areParentsVisible = false, closestNotVisible = null, selfObserver = null, parentObserver = null;
    const _cb = () => {
      if (isSelfVisible && areParentsVisible) {
        if (cb)
          cb(elm);
        resolve(elm);
        elm.removeEventListener("transitionend", _eventCb);
        elm.removeEventListener("animationstart", _eventCb);
        elm.removeEventListener("animationend", _eventCb);
        if (closestNotVisible) {
          closestNotVisible.removeEventListener("transitionend", _eventCb);
          closestNotVisible.removeEventListener("animationstart", _eventCb);
          closestNotVisible.removeEventListener("animationend", _eventCb);
        }
      }
    };
    const _eventCb = (e) => {
      setTimeout(() => {
        if (e.target === elm) {
          if ((0, import_visible.default)(elm)) {
            isSelfVisible = true;
            if (selfObserver && selfObserver.disconnect) {
              selfObserver.disconnect();
            }
            elm.removeEventListener("transitionend", _eventCb);
            elm.removeEventListener("animationstart", _eventCb);
            elm.removeEventListener("animationend", _eventCb);
          }
        } else if (e.target === closestNotVisible) {
          if ((0, import_visible.default)(closestNotVisible)) {
            areParentsVisible = true;
            if (parentObserver && parentObserver.disconnect) {
              parentObserver.disconnect();
            }
            closestNotVisible.removeEventListener("transitionend", _eventCb);
            closestNotVisible.removeEventListener("animationstart", _eventCb);
            closestNotVisible.removeEventListener("animationend", _eventCb);
          }
        }
        _cb();
      });
    };
    if (!(0, import_visible.default)(elm)) {
      selfObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            if ((0, import_visible.default)(mutation.target)) {
              isSelfVisible = true;
              _cb();
              selfObserver.disconnect();
            }
          }
        });
      });
      selfObserver.observe(elm, { attributes: true });
      elm.addEventListener("animationstart", _eventCb);
      elm.addEventListener("animationend", _eventCb);
      elm.addEventListener("transitionend", _eventCb);
    } else {
      isSelfVisible = true;
    }
    closestNotVisible = (0, import_closestNotVisible.default)(elm);
    if (closestNotVisible) {
      parentObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "style" || mutation.attributeName === "class") {
            if ((0, import_visible.default)(mutation.target)) {
              areParentsVisible = true;
              _cb();
              parentObserver.disconnect();
            }
          }
        });
      });
      parentObserver.observe(closestNotVisible, { attributes: true });
      closestNotVisible.addEventListener("animationstart", _eventCb);
      closestNotVisible.addEventListener("animationend", _eventCb);
      closestNotVisible.addEventListener("transitionend", _eventCb);
    } else {
      areParentsVisible = true;
    }
    _cb();
  });
}
var whenVisible_default = whenVisible;
