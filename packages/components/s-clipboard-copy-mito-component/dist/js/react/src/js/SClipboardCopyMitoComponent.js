import * as React from "react";
import { useState, useEffect } from "react";
import { __copy } from "@coffeekraken/sugar/clipboard";
import "../../../../../src/css/s-clipboard-copy.css";
import __SClipboardCopyComponentInterface from "../../../../../src/js/interface/SClipboardCopyComponentInterface";
const DEFAULT_PROPS = __SClipboardCopyComponentInterface.defaults();
function SClipboardCopyMito(props) {
  const [status, setStatus] = useState(() => "pending");
  const [$target, set$target] = useState(() => null);
  function _copyFromTarget() {
    var _a;
    const text = (_a = $target.value) != null ? _a : $target.innerHTML;
    copy(text);
  }
  function copy(text) {
    setStatus("copy");
    __copy(text).then(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("pending");
      }, prop("successTimeout"));
    }).catch((e) => {
      console.log(e);
      setStatus("error");
      setTimeout(() => {
        setStatus("pending");
      }, props.errorTimeout);
    });
  }
  const [prop, setProp] = useState(() => null);
  useEffect(() => {
    __SClipboardCopyComponentInterface;
    const from = props.from, status2 = status2;
    set$target(document.querySelector(from));
    if (!$target) {
      throw new Error(`[SClipboardCopy] The target element "${props.from}" does not exist`);
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: "s-clipboard-copy",
    onClick: (event) => _copyFromTarget(),
    state: status
  }, /* @__PURE__ */ React.createElement("svg", {
    ref: svg,
    className: "icon-copy",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React.createElement("g", {
    "clip-path": "url(#clip0)"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M4.55512 0.00402832L2.07324 2.4859H4.55512V0.00402832Z",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M14.9937 0H5.72598V3.65762H2.06836V17.0624H14.9937V0H14.9937ZM12.5801 11.3218H4.48195V10.1499H12.5801V11.3218ZM12.5801 8.83219H4.48195V7.66031H12.5801V8.83219ZM12.5801 6.34254H4.48195V5.17066H12.5801V6.34254Z",
    fill: "currentColor"
  }), /* @__PURE__ */ React.createElement("path", {
    d: "M16.1655 2.93762V18.2343H5.00586V20H17.9312V2.93762H16.1655Z",
    fill: "currentColor"
  })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
    id: "clip0"
  }, /* @__PURE__ */ React.createElement("rect", {
    width: "20",
    height: "20",
    fill: "currentColor"
  })))), /* @__PURE__ */ React.createElement("svg", {
    className: "icon-success",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, /* @__PURE__ */ React.createElement("path", {
    d: "M22 11.08V12a10 10 0 1 1-5.93-9.14"
  }), /* @__PURE__ */ React.createElement("polyline", {
    points: "22 4 12 14.01 9 11.01"
  })), /* @__PURE__ */ React.createElement("svg", {
    className: "icon-error",
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, /* @__PURE__ */ React.createElement("polygon", {
    points: "7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "15",
    y1: "9",
    x2: "9",
    y2: "15"
  }), /* @__PURE__ */ React.createElement("line", {
    x1: "9",
    y1: "9",
    x2: "15",
    y2: "15"
  })));
}
export {
  DEFAULT_PROPS,
  SClipboardCopyMito as default
};
