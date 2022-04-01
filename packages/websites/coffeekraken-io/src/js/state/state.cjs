import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var state_exports = {};
__export(state_exports, {
  getState: () => getState,
  loadDocmap: () => loadDocmap,
  setState: () => setState
});
module.exports = __toCommonJS(state_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_request = __toESM(require("@coffeekraken/s-request"), 1);
function getState() {
  var _a;
  const state = JSON.parse((_a = window.localStorage.getItem("coffeekrakenio")) != null ? _a : "{}");
  return state;
}
function setState(stateObj) {
  const state = getState();
  const newState = (0, import_deepMerge.default)(state, stateObj);
  window.localStorage.setItem("coffeekrakenio", JSON.stringify(newState));
}
let _docmap, _docmapPromise;
async function loadDocmap() {
  if (_docmap)
    return _docmap;
  if (_docmapPromise)
    return (await _docmapPromise).data;
  const request = new import_s_request.default({
    url: `/docmap.json`,
    method: "GET"
  });
  const promise = request.send();
  _docmapPromise = promise;
  _docmap = (await promise).data;
  return _docmap;
}
