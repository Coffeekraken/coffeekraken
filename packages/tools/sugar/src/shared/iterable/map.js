var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __typeOf from "../value/typeof";
const fn = function(stack, callback, settings = {}) {
  settings = __spreadValues({
    newStack: false
  }, settings);
  const stackType = __typeOf(stack).toLowerCase();
  let loopOnKeys;
  if (stackType === "object")
    loopOnKeys = Object.keys(stack);
  else if (stackType === "array")
    loopOnKeys = Array.from(Array(stack.length).keys());
  else if (stackType === "number" || stackType === "integer")
    loopOnKeys = Array.from(Array(Math.round(stack)).keys());
  else if (stackType === "string")
    loopOnKeys = Array.from(stack);
  else if (stackType === "set")
    loopOnKeys = Array.from(stack);
  else
    loopOnKeys = Array.from(stack.keys());
  if (stackType === "string" || stackType === "number" || stackType === "integer" || stackType === "set")
    settings.newStack = true;
  let newStack = [];
  if (stackType === "object")
    newStack = {};
  else if (stackType === "map")
    newStack = /* @__PURE__ */ new Map();
  else if (stackType === "set")
    newStack = /* @__PURE__ */ new Set();
  let value;
  let newValue;
  const _get = (s, k) => {
    switch (__typeOf(s).toLowerCase()) {
      case "array":
      case "object":
        return s[k];
        break;
      case "string":
        return k;
        break;
      case "number":
      case "integer":
        return k;
        break;
      case "map":
        return s.get(k);
        break;
      case "set":
        return k;
        break;
    }
  };
  const _set = (s, k, v) => {
    switch (__typeOf(s).toLowerCase()) {
      case "array":
        if (settings.newStack === true)
          s.push(v);
        else
          s[k] = v;
        break;
      case "object":
        s[k] = v;
        break;
      case "number":
      case "integer":
      case "string":
        s.push(v);
        break;
      case "map":
        s.set(k, v);
        break;
      case "set":
        s.add(v);
        break;
    }
  };
  for (let i = 0; i < loopOnKeys.length; i++) {
    const key = loopOnKeys[i];
    value = _get(stack, key);
    newValue = callback({ key, prop: key, value, i, idx: i });
    if (newValue === -1)
      break;
    _set(settings.newStack ? newStack : stack, key, newValue);
  }
  if (stackType === "string") {
    return newStack.join("");
  }
  return settings.newStack ? newStack : stack;
};
var map_default = fn;
export {
  map_default as default
};
