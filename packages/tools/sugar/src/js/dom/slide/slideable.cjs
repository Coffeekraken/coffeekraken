import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var slideable_exports = {};
__export(slideable_exports, {
  default: () => slideable
});
module.exports = __toCommonJS(slideable_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_sugar_element = __toESM(require("@coffeekraken/s-sugar-element"), 1);
var import_easeOutQuad = __toESM(require("../../../shared/easing/easeOutQuad"), 1);
var import_easeInterval = __toESM(require("../../../shared/function/easeInterval"), 1);
var import_clamp = __toESM(require("../../../shared/math/clamp"), 1);
var import_easeClamp = __toESM(require("../../../shared/math/easeClamp"), 1);
var import_uniqid = __toESM(require("../../../shared/string/uniqid"), 1);
var import_injectStyle = __toESM(require("../css/injectStyle"), 1);
var import_onDrag = __toESM(require("../detect/onDrag"), 1);
var import_areaStats = __toESM(require("../element/areaStats"), 1);
function _getMostDisplayedItem($items) {
  var _a;
  let higherSurface = 0, $itemObj;
  for (let i = 0; i < $items.length; i++) {
    const $item = $items[i];
    const areaStats = (0, import_areaStats.default)($item, {
      relativeTo: (_a = $item.parentNode) == null ? void 0 : _a.parentNode
    });
    if (areaStats.percentage > higherSurface) {
      $itemObj = $item;
      higherSurface = areaStats.percentage;
    }
  }
  return $itemObj != null ? $itemObj : $items[0];
}
function slideable($elm, settings) {
  return new import_s_promise.default(({ resolve, reject, emit }) => {
    var _a, _b, _c;
    const finalSettings = __spreadValues({
      direction: "horizontal",
      friction: 0.7,
      maxOffset: 10,
      maxOffsetX: void 0,
      maxOffsetY: void 0,
      refocus: true,
      onStart: void 0,
      onDrag: void 0,
      onEnd: void 0,
      onRefocusStart: void 0,
      onRefocusEnd: void 0
    }, settings != null ? settings : {});
    finalSettings.maxOffsetX = (_a = finalSettings.maxOffsetX) != null ? _a : finalSettings.maxOffset;
    finalSettings.maxOffsetY = (_b = finalSettings.maxOffsetY) != null ? _b : finalSettings.maxOffset;
    const id = (_c = $elm.getAttribute("slideable-id")) != null ? _c : (0, import_uniqid.default)();
    $elm.setAttribute("slideable-id", id);
    let translateX = 0, easingScrollInterval, translateY = 0;
    (0, import_injectStyle.default)(`
            [slideable-id] {
                user-select: none;
            }
        `, "s-slideable");
    const $child = $elm.firstElementChild;
    if (!$child) {
      throw new Error(`[slideable] The slideable element must have at least one child that will be translated`);
    }
    const $sChild = new import_s_sugar_element.default($child);
    let lastComputedTranslatesStr = "";
    let cancelFromClick = false;
    (0, import_onDrag.default)($elm, (state) => {
      var _a2, _b2, _c2, _d;
      const translates = $sChild.getTranslates();
      switch (state.type) {
        case "start":
          translateX = translates.x;
          translateY = translates.y;
          cancelFromClick = true;
          (_a2 = easingScrollInterval == null ? void 0 : easingScrollInterval.cancel) == null ? void 0 : _a2.call(easingScrollInterval);
          setTimeout(() => {
            cancelFromClick = false;
          });
          emit("start", state);
          (_b2 = finalSettings.onStart) == null ? void 0 : _b2.call(finalSettings, state);
          break;
        case "end":
          const pixelsBySecond = (0, import_clamp.default)(finalSettings.direction === "horizontal" ? state.speedX : state.speedY, -2e3, 2e3);
          const duration = (0, import_clamp.default)(Math.abs(pixelsBySecond), 100, 1e3) * (1 - finalSettings.friction);
          let sameIdx = 0;
          emit("end", state);
          (_c2 = finalSettings.onEnd) == null ? void 0 : _c2.call(finalSettings, state);
          easingScrollInterval = (0, import_easeInterval.default)(duration, (percentage) => {
            let offsetX = pixelsBySecond / 100 * percentage, offsetY = pixelsBySecond / 100 * percentage;
            offsetX *= 1 - finalSettings.friction;
            offsetY *= 1 - finalSettings.friction;
            let computedTranslateX2, computedTranslateY2;
            if (finalSettings.direction === "horizontal") {
              computedTranslateX2 = translates.x + offsetX;
              computedTranslateX2 = (0, import_easeClamp.default)(computedTranslateX2 * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
              computedTranslateX2 *= -1;
            } else {
              computedTranslateY2 = translates.y + offsetY;
              computedTranslateY2 = (0, import_easeClamp.default)(computedTranslateY2 * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
              computedTranslateY2 *= -1;
            }
            if (lastComputedTranslatesStr === `${computedTranslateX2 || "x"}-${computedTranslateY2 || "y"}`) {
              sameIdx++;
              if (sameIdx >= 10) {
                easingScrollInterval.cancel();
                sameIdx = 0;
                return;
              }
            }
            lastComputedTranslatesStr = `${computedTranslateX2 || "x"}-${computedTranslateY2 || "y"}`;
            if (finalSettings.direction === "horizontal") {
              $sChild.setTranslate(computedTranslateX2);
            } else {
              $sChild.setTranslate(0, computedTranslateY2);
            }
          }, {
            easing: import_easeOutQuad.default
          });
          easingScrollInterval.on("finally", (data) => {
            var _a3;
            if (cancelFromClick)
              return;
            if (!finalSettings.refocus) {
              resolve(data);
              return;
            }
            const translates2 = $sChild.getTranslates();
            const $mostDisplaysItem = _getMostDisplayedItem($child.children);
            emit("refocusStart", $mostDisplaysItem);
            (_a3 = finalSettings.onRefocusStart) == null ? void 0 : _a3.call(finalSettings, $mostDisplaysItem);
            const diffX = $mostDisplaysItem.getBoundingClientRect().left - $elm.getBoundingClientRect().left, diffY = $mostDisplaysItem.getBoundingClientRect().top - $elm.getBoundingClientRect().top;
            easingScrollInterval = (0, import_easeInterval.default)(500, (per) => {
              const offsetX = diffX / 100 * per, offsetY = diffY / 100 * per;
              if (finalSettings.direction === "horizontal") {
                $sChild.setTranslate(translates2.x + offsetX * -1);
              } else {
                $sChild.setTranslate(0, translates2.y + offsetY * -1);
              }
              if (per >= 100) {
                emit("refocusEnd", $mostDisplaysItem);
                resolve(data);
              }
            });
          });
          break;
        default:
          let computedTranslateY, computedTranslateX;
          if (finalSettings.direction === "horizontal") {
            computedTranslateX = translateX + state.deltaX;
            computedTranslateX = (0, import_easeClamp.default)(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
            computedTranslateX *= -1;
          } else {
            computedTranslateY = translateY + state.deltaY;
            computedTranslateY = (0, import_easeClamp.default)(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
            computedTranslateY *= -1;
          }
          if (finalSettings.direction === "horizontal") {
            $sChild.setTranslate(computedTranslateX);
          } else {
            $sChild.setTranslate(0, computedTranslateY);
          }
          emit("drag", state);
          (_d = finalSettings.onDrag) == null ? void 0 : _d.call(finalSettings, state);
          break;
      }
    });
  });
}
