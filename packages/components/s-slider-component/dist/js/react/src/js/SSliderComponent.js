import * as React from "react";
import { useState, useRef, useEffect } from "react";
import __SComponent from "@coffeekraken/s-component";
import { __uniqid } from "@coffeekraken/sugar/string";
import __css from "../../../../../src/css/s-slider-component.css";
import __SSliderComponentInterface from "../../../../../src/js/interface/SSLiderComponentInterface";
const DEFAULT_PROPS = __SSliderComponentInterface.defaults();
function S(props) {
  var _a;
  const $container = useRef(null);
  const [status, setStatus] = useState(() => "idle");
  const [id, setId] = useState(() => null);
  const [currentSlideId, setCurrentSlideId] = useState(() => null);
  const [component, setComponent] = useState(() => null);
  const [slideElements, setSlideElements] = useState(() => []);
  const [slidesIds, setSlidesIds] = useState(() => []);
  function mount() {
    var _a2;
    try {
      component.injectStyleInShadowRoot([__css, ...(_a2 = props.cssDeps) != null ? _a2 : []], $container.current);
    } catch (e) {
    }
    setSlideElements(Array.from(document.querySelectorAll("[s-slider-slide]")));
  }
  useEffect(() => {
    __SSliderComponentInterface;
    setComponent(new __SComponent("s-slider", {
      bare: false
    }));
    setId(`s-slider-${__uniqid()}`);
    mount();
    setStatus("mounted");
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    id,
    ref: $container,
    className: component == null ? void 0 : component.className("", null, "s-bare"),
    status,
    lnf: (_a = props.lnf) != null ? _a : "default"
  }, /* @__PURE__ */ React.createElement("div", {
    className: component == null ? void 0 : component.className("__root")
  }, /* @__PURE__ */ React.createElement("div", {
    className: component == null ? void 0 : component.className("__slides-wrapper")
  }, /* @__PURE__ */ React.createElement("div", {
    ref: $slides,
    className: component == null ? void 0 : component.className("__slides")
  }, props.children)), slideElements.length ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__nav"
  }, slideElements == null ? void 0 : slideElements.map((child, idx) => /* @__PURE__ */ React.createElement("div", {
    className: `s-slider__nav-item ${true ? "active" : ""}`
  })))) : null, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls-previous "
  }, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls-previous-arrow"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls-next active"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "s-slider__controls-next-arrow"
  })))));
}
export {
  S as default
};
