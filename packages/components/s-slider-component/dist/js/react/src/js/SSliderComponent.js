var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import __SComponent from "@coffeekraken/s-component";
import { __elementAreaStats } from "@coffeekraken/sugar/dom";
import { __easeInterval } from "@coffeekraken/sugar/function";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
const DEFAULT_PROPS = __SSliderComponentInterface.defaults();
function S(props) {
  var _a, _b;
  const $container = useRef(null);
  const [_status, set_status] = useState(() => "idle");
  const [_id, set_id] = useState(() => null);
  const [_currentSlideId, set_currentSlideId] = useState(() => null);
  const [_component, set_component] = useState(() => null);
  const [_behaviors, set_behaviors] = useState(() => ({}));
  const [_slideElements, set_slideElements] = useState(() => []);
  const [_slidesIds, set_slidesIds] = useState(() => []);
  function mount() {
    var _a2;
    try {
      _component.injectStyleInShadowRoot([__css, ...(_a2 = props.cssDeps) != null ? _a2 : []], $container.current);
    } catch (e) {
    }
    set_behaviors({
      default({ fromSlideId, toSlideId }) {
        const $slidesWrapper = $slides.current;
        $slidesWrapper._isScrollingFromNextOrPrevious = false;
        if (!$slidesWrapper._isBehaviorInited) {
          $slidesWrapper._isBehaviorInited = true;
          let scrollTimeout;
          $slidesWrapper.addEventListener("scroll", (e) => {
            if ($slidesWrapper._isScrollingFromNextOrPrevious) {
              return;
            }
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
              let $inViewSlide, largerPercentage = 0;
              for (let i = 0; i < _slideElements.length; i++) {
                const $slide = _slideElements[i];
                const stats = __elementAreaStats($slide, {
                  relativeTo: $slidesWrapper
                });
                if (stats.percentageX + stats.percentageY > largerPercentage) {
                  largerPercentage = stats.percentageX + stats.percentageY;
                  $inViewSlide = $slide;
                }
              }
              goTo(getSlideIdByElement($inViewSlide));
            }, 100);
          });
        }
        const $from = getSlideElementById(fromSlideId), $to = getSlideElementById(toSlideId);
        const fromRect = $from.getBoundingClientRect(), toRect = $to.getBoundingClientRect(), parentRect = $slidesWrapper.getBoundingClientRect();
        let startX = $slidesWrapper.scrollLeft, startY = $slidesWrapper.scrollTop;
        const dist = props.direction === "vertical" ? toRect.y - parentRect.top : toRect.x - parentRect.left;
        const initialScrollBehavior = $slidesWrapper.style.scrollBehavior, initialScrollSnapType = $slidesWrapper.style.scrollSnapType;
        $slidesWrapper.style.scrollBehavior = "initial";
        $slidesWrapper.style.scrollSnapType = "initial";
        $slidesWrapper._isScrollingFromNextOrPrevious = true;
        __easeInterval(props.transitionDuration, (percentage) => {
          const offset = dist / 100 * percentage;
          if (props.direction === "vertical") {
            $slidesWrapper.scrollTop = startY + offset;
          } else {
            $slidesWrapper.scrollLeft = startX + offset;
          }
        }, {
          easing: props.transitionEasing,
          onEnd() {
            $slidesWrapper.style.scrollBehavior = initialScrollBehavior;
            $slidesWrapper.style.scrollSnapType = initialScrollSnapType;
            $slidesWrapper._isScrollingFromNextOrPrevious = false;
          }
        });
      }
    });
    set_slideElements(Array.from(document.querySelectorAll("[s-slider-slide]")));
    set_slidesIds(_slideElements.map(($slide, i) => {
      return $slide.hasAttribute("id") ? $slide.id : i;
    }));
    if (props.slide) {
      set_currentSlideId(props.slide);
    } else {
      set_currentSlideId(_slidesIds[0]);
    }
    goTo(_currentSlideId);
  }
  function getSlideIdByElement($slide) {
    const idx = _slideElements.indexOf($slide);
    if (idx === -1) {
      return;
    }
    return _slidesIds[idx];
  }
  function getSlideIdxByElement($slide) {
    return getSlideIdxById(getSlideIdByElement($slide));
  }
  function getSlideElementById(id) {
    const slideIdx = _slidesIds.indexOf(id);
    return _slideElements[slideIdx];
  }
  function getSlideIdxById(id) {
    return _slidesIds.indexOf(id);
  }
  function getFirstSlideId() {
    return _slidesIds[0];
  }
  function getLastSlideId() {
    return _slidesIds[_slidesIds.length - 1];
  }
  function getPreviousSlideId() {
    const currentSlideIdx = getCurrentSlideIdx();
    if (currentSlideIdx > 0) {
      return _slidesIds[currentSlideIdx - 1];
    }
    return getLastSlideId();
  }
  function getNextSlideId() {
    const currentSlideIdx = getCurrentSlideIdx();
    if (currentSlideIdx < _slidesIds.length) {
      return _slidesIds[currentSlideIdx + 1];
    }
    return getFirstSlideId();
  }
  function getCurrentSlideIdx() {
    return getSlideIdxById(_currentSlideId);
  }
  function isLast() {
    return _currentSlideId === getLastSlideId();
  }
  function isFirst() {
    return _currentSlideId === getFirstSlideId();
  }
  function previous() {
    if (!props.loop && isFirst()) {
      return;
    }
    goTo(getPreviousSlideId());
  }
  function next() {
    if (!props.loop && isLast()) {
      return;
    }
    goTo(getNextSlideId());
  }
  function goTo(slideId) {
    var _a2, _b2;
    const behaviorFn = (_b2 = (_a2 = props.behaviors) == null ? void 0 : _a2[props.behavior]) != null ? _b2 : _behaviors[props.behavior];
    behaviorFn == null ? void 0 : behaviorFn({
      fromSlideId: _currentSlideId,
      toSlideId: slideId,
      component: _component,
      getSlideElementById,
      getSlideIdxById,
      getFirstSlideId,
      getLastSlideId,
      isLast,
      isFirst
    });
    set_currentSlideId(slideId);
  }
  useEffect(() => {
    __SSliderComponentInterface;
    set_component(new __SComponent("s-slider", {
      bare: false
    }));
    set_id(`s-slider-${__uniqid()}`);
    mount();
    set_status("mounted");
  }, []);
  useEffect(() => {
    $root.current.style.setProperty("--s-slider-slide", getCurrentSlideIdx());
    $root.current.style.setProperty("--s-slider-total", _slidesIds.length);
  });
  return /* @__PURE__ */ React.createElement("div", __spreadProps(__spreadValues({}, {
    controls: props.controls,
    nav: props.nav,
    swipe: props.swipe,
    mousewheel: props.mousewheel,
    clickOnSlide: props.clickOnSlide,
    loop: props.loop
  }), {
    id: _id,
    ref: $container,
    className: _component == null ? void 0 : _component.className("", null, "s-bare"),
    status: _status,
    direction: props.direction,
    behavior: (_a = props.behavior) != null ? _a : "default",
    lnf: (_b = props.lnf) != null ? _b : "default"
  }), /* @__PURE__ */ React.createElement("div", {
    className: _component == null ? void 0 : _component.className("__root"),
    ref: $root
  }, /* @__PURE__ */ React.createElement("div", {
    className: _component == null ? void 0 : _component.className("__slides-wrapper")
  }, /* @__PURE__ */ React.createElement("div", {
    ref: $slides,
    className: _component == null ? void 0 : _component.className("__slides")
  }, props.children)), _slideElements.length ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__nav"
  }, _slideElements == null ? void 0 : _slideElements.map((child) => /* @__PURE__ */ React.createElement("div", {
    className: `s-slider__nav-item ${getSlideIdxByElement(child) == getCurrentSlideIdx() ? "active" : ""}`
  })))) : null, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `s-slider__controls-previous ${props.loop || !isFirst() ? "active" : ""}`,
    onPointerUp: (event) => previous()
  }, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls-previous-arrow"
  })), /* @__PURE__ */ React.createElement("div", {
    className: `s-slider__controls-next ${props.loop || !isLast() ? "active" : ""}`,
    onPointerUp: (event) => next()
  }, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls-next-arrow"
  })))));
}
export {
  S as default
};
