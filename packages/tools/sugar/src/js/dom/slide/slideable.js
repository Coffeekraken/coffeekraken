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
import __SPromise from "@coffeekraken/s-promise";
import __SSugarElement from "@coffeekraken/s-sugar-element";
import __easeOut from "../../../shared/easing/easeOutQuad";
import __easeInterval from "../../../shared/function/easeInterval";
import __clamp from "../../../shared/math/clamp";
import __easeClamp from "../../../shared/math/easeClamp";
import __uniqid from "../../../shared/string/uniqid";
import __injectStyle from "../css/injectStyle";
import __onDrag from "../detect/onDrag";
import __areaStats from "../element/areaStats";
function _getMostDisplayedItem($items) {
  var _a;
  let higherSurface = 0, $itemObj;
  for (let i = 0; i < $items.length; i++) {
    const $item = $items[i];
    const areaStats = __areaStats($item, {
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
  return new __SPromise(({ resolve, reject, emit }) => {
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
    const id = (_c = $elm.getAttribute("slideable-id")) != null ? _c : __uniqid();
    $elm.setAttribute("slideable-id", id);
    let translateX = 0, easingScrollInterval, translateY = 0;
    __injectStyle(`
            [slideable-id] {
                user-select: none;
            }
        `, "s-slideable");
    const $child = $elm.firstElementChild;
    if (!$child) {
      throw new Error(`[slideable] The slideable element must have at least one child that will be translated`);
    }
    const $sChild = new __SSugarElement($child);
    let lastComputedTranslatesStr = "";
    let cancelFromClick = false;
    __onDrag($elm, (state) => {
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
          const pixelsBySecond = __clamp(finalSettings.direction === "horizontal" ? state.speedX : state.speedY, -2e3, 2e3);
          const duration = __clamp(Math.abs(pixelsBySecond), 100, 1e3) * (1 - finalSettings.friction);
          let sameIdx = 0;
          emit("end", state);
          (_c2 = finalSettings.onEnd) == null ? void 0 : _c2.call(finalSettings, state);
          easingScrollInterval = __easeInterval(duration, (percentage) => {
            let offsetX = pixelsBySecond / 100 * percentage, offsetY = pixelsBySecond / 100 * percentage;
            offsetX *= 1 - finalSettings.friction;
            offsetY *= 1 - finalSettings.friction;
            let computedTranslateX2, computedTranslateY2;
            if (finalSettings.direction === "horizontal") {
              computedTranslateX2 = translates.x + offsetX;
              computedTranslateX2 = __easeClamp(computedTranslateX2 * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
              computedTranslateX2 *= -1;
            } else {
              computedTranslateY2 = translates.y + offsetY;
              computedTranslateY2 = __easeClamp(computedTranslateY2 * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
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
            easing: __easeOut
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
            easingScrollInterval = __easeInterval(500, (per) => {
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
            computedTranslateX = __easeClamp(computedTranslateX * -1, finalSettings.maxOffsetX * -1, 0, $child.scrollWidth - $child.offsetWidth, $child.scrollWidth - $child.offsetWidth + finalSettings.maxOffsetX);
            computedTranslateX *= -1;
          } else {
            computedTranslateY = translateY + state.deltaY;
            computedTranslateY = __easeClamp(computedTranslateY * -1, finalSettings.maxOffsetY * -1, 0, $child.scrollHeight - $child.offsetHeight, $child.scrollHeight - $child.offsetHeight + finalSettings.maxOffsetY);
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
export {
  slideable as default
};
