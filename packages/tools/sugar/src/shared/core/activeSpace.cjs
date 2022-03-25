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
var activeSpace_exports = {};
__export(activeSpace_exports, {
  default: () => activeSpace_default
});
module.exports = __toCommonJS(activeSpace_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"));
var import_minimatch = __toESM(require("minimatch"));
var import_is_glob = __toESM(require("is-glob"));
const _activeSpaceCallbacksStack = {};
const _activeSpaceStack = [];
let _activeSpaceCurrent = null;
const activeSpaceApi = {
  get: () => {
    return _activeSpaceCurrent;
  },
  set: (activeSpace, history = true, silent = false) => {
    if (!silent && (0, import_is_glob.default)(activeSpace)) {
      throw new Error(`You try to set as activeSpace this string "${activeSpace}". It seems that this string is a glob pattern and activeSpace does not have to be a glob pattern...`);
    }
    if (_activeSpaceCurrent !== activeSpace && history) {
      _activeSpaceStack.push(activeSpace);
    }
    _activeSpaceCurrent = activeSpace;
    activeSpaceApi._callCallbacks();
    return activeSpaceApi.get();
  },
  append: (activeSpace, history = true) => {
    const currentActiveSpace = activeSpaceApi.get() || "";
    if (currentActiveSpace !== "" && (0, import_minimatch.default)(currentActiveSpace, `**.${activeSpace}`))
      return activeSpaceApi.get();
    const currentActiveSpaceArray = currentActiveSpace.split(".");
    const activeSpaceArray = activeSpace.split(".");
    activeSpaceApi.set([...currentActiveSpaceArray, ...activeSpaceArray].join("."), history);
    return activeSpaceApi.get();
  },
  remove: (toRemove, history = true) => {
    const currentActiveSpace = activeSpaceApi.get();
    let newActiveSpace = currentActiveSpace.replace(toRemove, "");
    if (newActiveSpace.substr(-1) === ".")
      newActiveSpace = newActiveSpace.slice(0, -1);
    if (newActiveSpace.substr(0, 1) === ".")
      newActiveSpace = newActiveSpace.substr(1);
    activeSpaceApi.set(newActiveSpace, history);
    return activeSpaceApi.get();
  },
  previous: () => {
    if (_activeSpaceStack.length <= 1)
      return;
    _activeSpaceStack.splice(-1, 1);
    activeSpaceApi.set(_activeSpaceStack[_activeSpaceStack.length - 1], false);
    return activeSpaceApi.get();
  },
  is: (activeSpaceToCheck, currentActiveSpace = activeSpaceApi.get()) => {
    if (!currentActiveSpace)
      return false;
    return (0, import_minimatch.default)(currentActiveSpace, activeSpaceToCheck);
  },
  on: (activeSpaceToCheck, callback, settings = {}) => {
    settings = (0, import_deepMerge.default)({
      once: false,
      count: -1
    }, settings);
    if (!_activeSpaceCallbacksStack[activeSpaceToCheck])
      _activeSpaceCallbacksStack[activeSpaceToCheck] = [];
    if (settings.once)
      settings.count = 1;
    _activeSpaceCallbacksStack[activeSpaceToCheck].push({
      activeSpaceToCheck,
      callback,
      settings,
      called: 0
    });
  },
  _callCallbacks: () => {
    Object.keys(_activeSpaceCallbacksStack).forEach((activeSpaceToCheck) => {
      if (!activeSpaceApi.is(activeSpaceToCheck))
        return;
      _activeSpaceCallbacksStack[activeSpaceToCheck].forEach((activeSpaceCallbackObj) => {
        activeSpaceCallbackObj.callback();
        activeSpaceCallbackObj.called++;
        if (activeSpaceCallbackObj.settings.count === -1)
          return;
        if (activeSpaceCallbackObj.called >= activeSpaceCallbackObj.settings.count) {
          activeSpaceCallbackObj.delete = true;
        }
        _activeSpaceCallbacksStack[activeSpaceToCheck] = _activeSpaceCallbacksStack[activeSpaceToCheck].filter((obj) => {
          return obj.delete !== true;
        });
      });
    });
  }
};
var activeSpace_default = activeSpaceApi;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
