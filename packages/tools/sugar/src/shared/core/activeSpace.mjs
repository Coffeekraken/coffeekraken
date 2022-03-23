import "../../../../../chunk-JETN4ZEY.mjs";
import __deepMerge from "../object/deepMerge";
import __minimatch from "minimatch";
import __isGlob from "is-glob";
const _activeSpaceCallbacksStack = {};
const _activeSpaceStack = [];
let _activeSpaceCurrent = null;
const activeSpaceApi = {
  get: () => {
    return _activeSpaceCurrent;
  },
  set: (activeSpace, history = true, silent = false) => {
    if (!silent && __isGlob(activeSpace)) {
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
    if (currentActiveSpace !== "" && __minimatch(currentActiveSpace, `**.${activeSpace}`))
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
    return __minimatch(currentActiveSpace, activeSpaceToCheck);
  },
  on: (activeSpaceToCheck, callback, settings = {}) => {
    settings = __deepMerge({
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
export {
  activeSpace_default as default
};
