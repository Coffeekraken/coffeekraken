var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var userScrolling_exports = {};
__export(userScrolling_exports, {
  default: () => userScrolling
});
module.exports = __toCommonJS(userScrolling_exports);
let _isUserScrolling = false, _userScrollingTimeout;
document.addEventListener("wheel", (e) => {
  _isUserScrolling = true;
  clearTimeout(_userScrollingTimeout);
  _userScrollingTimeout = setTimeout(() => {
    _isUserScrolling = false;
  }, 200);
});
function userScrolling($elm) {
  $elm.addEventListener("mouseover", (e) => {
    $elm._isMouseover = true;
  });
  $elm.addEventListener("mouseout", (e) => {
    $elm._isMouseover = false;
  });
  if ($elm._isMouseover && _isUserScrolling) {
    return true;
  }
  return false;
}
