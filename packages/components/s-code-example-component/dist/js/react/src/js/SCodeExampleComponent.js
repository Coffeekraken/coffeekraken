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
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import __prettier from "prettier/esm/standalone.mjs";
import __prettierJs from "prettier/esm/parser-babel.mjs";
import __prettierHtml from "prettier/esm/parser-html.mjs";
import __prettierPhp from "@prettier/plugin-php/standalone";
import __prettierCss from "prettier/esm/parser-postcss.mjs";
import __hljs from "highlight.js/lib/core";
import __langBash from "highlight.js/lib/languages/bash";
import __langJavascript from "highlight.js/lib/languages/javascript";
import __langPhp from "highlight.js/lib/languages/php";
import __langHtml from "highlight.js/lib/languages/xml";
import __langCss from "../../../../../src/js/languages/css";
import { __decodeHtmlEntities } from "@coffeekraken/sugar/string";
import __SComponent from "@coffeekraken/s-component";
import { __uniqid } from "@coffeekraken/sugar/string";
import "../../../../../src/css/s-inline.css";
import __SCodeExampleComponentInterface from "../../../../../src/js/interface/SCodeExampleComponentInterface";
const DEFAULT_PROPS = __SCodeExampleComponentInterface.defaults();
function SCodeExample(props) {
  const $container = useRef(null);
  const [status, setStatus] = useState(() => "idle");
  const [id, setId] = useState(() => null);
  const [noCode, setNoCode] = useState(() => false);
  const [activeTabId, setActiveTabId] = useState(() => null);
  const [activeCode, setActiveCode] = useState(() => null);
  const [component, setComponent] = useState(() => null);
  const [more, setMore] = useState(() => false);
  const [lines, setLines] = useState(() => null);
  const [codes, setCodes] = useState(() => []);
  function mount() {
    var _a, _b;
    try {
      component.injectStyleInShadowRoot((_a = props.cssDeps) != null ? _a : [], $container.current);
    } catch (e) {
    }
    const $slot = $container.current.querySelector("slot");
    const $templates = $slot.assignedNodes().filter((n) => n.tagName === "TEMPLATE");
    if (!$templates.length) {
      setNoCode(true);
      return;
    }
    const languages = __spreadValues({
      html: __langHtml,
      javascript: __langJavascript,
      js: __langJavascript,
      php: __langPhp,
      bash: __langBash,
      shell: __langBash,
      css: __langCss,
      scss: __langCss
    }, (_b = props.languages) != null ? _b : {});
    Object.keys(languages).forEach((lang) => {
      __hljs.registerLanguage(lang, languages[lang]);
    });
    $templates.forEach(($template, i) => {
      let lang = $template.getAttribute("lang"), codeId = `s-code-example-${__uniqid()}`, code = __decodeHtmlEntities($template.innerHTML);
      const codeObj = {
        id: codeId,
        lang,
        code
      };
      setCodes([...codes, codeObj]);
    });
    setTimeout(() => {
      var _a2;
      setActiveTabById((_a2 = codes == null ? void 0 : codes[0]) == null ? void 0 : _a2.id);
    });
  }
  function setActiveTabById(codeId) {
    setActiveTabId(codeId);
    setActiveCode(codes.filter((code) => code.id === codeId)[0]);
    setActiveCode(prepareCode(activeCode));
    if ($code.current) {
      $code.current.innerHTML = activeCode.code;
    }
  }
  function prepareCode(code) {
    var _a;
    if (code._inited) {
      return code;
    }
    code._inited = true;
    let parser = "babel";
    switch (code.lang) {
      case "html":
      case "xml":
        parser = "html";
        break;
      case "css":
      case "scss":
      case "postcss":
        parser = "css";
        break;
    }
    try {
      code.code = __prettier.format(code.code, {
        parser,
        plugins: [__prettierCss, __prettierHtml, __prettierJs, __prettierPhp]
      });
    } catch (e) {
      console.log(e);
    }
    let highlightedCode;
    try {
      const codeToHighlight = __decodeHtmlEntities(code.code.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ""));
      highlightedCode = (_a = __hljs.highlight(codeToHighlight, {
        language: code.lang
      })) == null ? void 0 : _a.value;
      code.code = highlightedCode;
    } catch (e) {
      console.log(e);
    }
    return code;
  }
  useEffect(() => {
    __SCodeExampleComponentInterface;
    setComponent(new __SComponent("s-code-example", {
      bare: false
    }));
    setId(`s-code-example-${__uniqid()}`);
    mount();
    setStatus("mounted");
  }, []);
  useEffect(() => {
    var _a, _b;
    (_b = $content.current) == null ? void 0 : _b.style.setProperty("--max-lines", (_a = props.lines) != null ? _a : 999999);
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    id,
    ref: $container,
    className: component == null ? void 0 : component.className("", null, "bare"),
    status
  }, props.children, noCode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", {
    className: component.className("__no-code", "s-typo s-typo--p")
  }, 'Sorry but no codes have been specified using the "template" tag...')) : null, component && activeTabId && !noCode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: [
      component == null ? void 0 : component.className("__root"),
      props.more ? component.className("more") : ""
    ].join(" "),
    lines: props.lines,
    "toolbar-position": props.toolbarPosition
  }, /* @__PURE__ */ React.createElement("header", {
    className: component.className("__nav")
  }, /* @__PURE__ */ React.createElement("div", {
    className: component.className("__tabs", "s-tabs")
  }, codes == null ? void 0 : codes.map((code, idx) => /* @__PURE__ */ React.createElement("div", {
    className: [
      component.className("__tab"),
      activeTabId === code.id ? "active" : ""
    ].join(" "),
    id: code.id,
    onclick: (event) => setActiveTabById(code.id)
  }, code.lang))), props.toolbarPosition === "nav" && activeTabId ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: component.className("__toolbar")
  })) : null), /* @__PURE__ */ React.createElement("div", {
    className: component.className("__content"),
    ref: $content
  }, props.toolbarPosition !== "nav" && activeTabId ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: component.className("__toolbar")
  })) : null, activeCode ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("pre", {
    className: component.className("__code") + " pre",
    id: activeCode.id
  }, /* @__PURE__ */ React.createElement("code", {
    ref: $code,
    className: `language-${activeCode.lang} ${activeCode.lang} hljs`
  }))) : null))) : null), /* @__PURE__ */ React.createElement("style", {
    jsx: true
  }, `
        .pre {
        }
      `));
}
export {
  SCodeExample as default
};
