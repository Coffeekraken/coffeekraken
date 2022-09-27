var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import "../../../../../src/css/s-inline.css";
import __SInlineComponentInterface from "../../../../../src/js/interface/SInlineComponentInterface";
const DEFAULT_PROPS = __SInlineComponentInterface.defaults();
function SInline(props) {
  const container = useRef(null);
  const [status, setStatus] = useState(() => "idle");
  const [loaded, setLoaded] = useState(() => false);
  const [svgCode, setSvgCode] = useState(() => null);
  function load() {
    (() => __async(this, null, function* () {
      const r = yield fetch(props.src);
      const text = yield r.text();
      const parser = new DOMParser();
      const svg = parser.parseFromString(text, "text/html").body.innerHTML;
      setSvgCode(svg);
      setLoaded(true);
      container.current.innerHTML = svg;
    }))();
  }
  useEffect(() => {
    __SInlineComponentInterface;
    setStatus("mounted");
    load();
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: "s-inline",
    status,
    loaded
  }, status === "mounted" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    ref: container
  })) : null);
}
export {
  SInline as default
};
