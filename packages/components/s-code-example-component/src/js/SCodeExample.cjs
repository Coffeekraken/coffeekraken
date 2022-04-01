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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var SCodeExample_exports = {};
__export(SCodeExample_exports, {
  default: () => SCodeExample,
  define: () => define
});
module.exports = __toCommonJS(SCodeExample_exports);
var import_s_clipboard_copy_component = require("@coffeekraken/s-clipboard-copy-component");
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"));
var import_core = __toESM(require("highlight.js/lib/core"));
var import_bash = __toESM(require("highlight.js/lib/languages/bash"));
var import_css = __toESM(require("./languages/css"));
var import_javascript = __toESM(require("highlight.js/lib/languages/javascript"));
var import_php = __toESM(require("highlight.js/lib/languages/php"));
var import_xml = __toESM(require("highlight.js/lib/languages/xml"));
var import_lit = require("lit");
var import_unsafe_html = require("lit/directives/unsafe-html.js");
var import_decorators = require("lit/decorators.js");
var import_decodeHtmlEntities = __toESM(require("@coffeekraken/sugar/js/html/decodeHtmlEntities"));
var import_SCodeExampleComponentInterface = __toESM(require("./interface/SCodeExampleComponentInterface"));
var import_scrollTo = __toESM(require("@coffeekraken/sugar/js/dom/scroll/scrollTo"));
var import_standalone = __toESM(require("prettier/esm/standalone.mjs"));
var import_parser_babel = __toESM(require("prettier/esm/parser-babel.mjs"));
var import_parser_html = __toESM(require("prettier/esm/parser-html.mjs"));
var import_parser_postcss = __toESM(require("prettier/esm/parser-postcss.mjs"));
var import_standalone2 = __toESM(require("@prettier/plugin-php/standalone"));
var import_s_code_example = __toESM(require("../../../../src/css/s-code-example.css"));
(0, import_s_clipboard_copy_component.define)();
class SCodeExample extends import_s_lit_component.default {
  constructor() {
    super((0, import_deepMerge.default)({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: import_SCodeExampleComponentInterface.default
      }
    }));
    this._$copy = void 0;
    this._items = [];
    this._activeTabId = void 0;
    var _a;
    const languages = __spreadValues({
      html: import_xml.default,
      javascript: import_javascript.default,
      js: import_javascript.default,
      php: import_php.default,
      bash: import_bash.default,
      shell: import_bash.default,
      css: import_css.default,
      scss: import_css.default
    }, (_a = this.props.languages) != null ? _a : {});
    Object.keys(languages).forEach((lang) => {
      import_core.default.registerLanguage(lang, languages[lang]);
    });
  }
  static get properties() {
    return import_s_lit_component.default.properties({}, import_SCodeExampleComponentInterface.default);
  }
  static get styles() {
    return import_lit.css`
            ${(0, import_lit.unsafeCSS)(import_s_code_example.default)}
        `;
  }
  async firstUpdated() {
    this.$templates = this.querySelectorAll("template,code");
    this.$templates.forEach(($template) => {
      var _a, _b, _c, _d, _e, _f, _g;
      if (!$template.getAttribute)
        return;
      let parser = "babel";
      switch ((_b = (_a = $template.getAttribute("id")) != null ? _a : $template.getAttribute("language")) != null ? _b : $template.getAttribute("lang")) {
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
      let rawCode = (0, import_decodeHtmlEntities.default)($template.tagName.toLowerCase() === "textarea" && $template.value ? $template.value : $template.innerHTML);
      let formatedCode = rawCode;
      try {
        formatedCode = import_standalone.default.format(rawCode, {
          parser,
          plugins: [
            import_parser_postcss.default,
            import_parser_html.default,
            import_parser_babel.default,
            import_standalone2.default
          ]
        });
      } catch (e) {
      }
      this._items = [
        ...this._items,
        {
          id: (_e = (_d = (_c = $template.getAttribute("id")) != null ? _c : $template.getAttribute("language")) != null ? _d : $template.getAttribute("lang")) != null ? _e : "html",
          lang: (_g = (_f = $template.getAttribute("language")) != null ? _f : $template.getAttribute("lang")) != null ? _g : "html",
          code: formatedCode,
          lines: formatedCode.trim().split("\n").length
        }
      ];
      $template.remove();
    });
    if (this.active) {
      this.setActiveTab(this.active);
    } else {
      if (this._items[0]) {
        this.setActiveTab(this._items[0].id);
      }
    }
    this._$pre = this.querySelector(".s-code-example__code");
    this._$root = this.querySelector(".s-code-example");
    return true;
  }
  setActiveTabByTab(e) {
    this.setActiveTab(e.target.id);
  }
  get currentItem() {
    if (!this._activeTabId)
      return {};
    return this._items.find((i) => i.id === this._activeTabId);
  }
  async setActiveTab(id) {
    await (0, import_wait.default)();
    this._activeTabId = id;
    this.highlight(id);
  }
  async setMoreClass() {
    if (this._more) {
      this._$root.classList.add("s-code-example--more");
    } else {
      this._$root.classList.remove("s-code-example--more");
    }
    this.requestUpdate();
  }
  toggleMore() {
    var _a;
    this._more = !this._more;
    this.setMoreClass();
    (0, import_scrollTo.default)(this, __spreadValues({}, (_a = this.props.scrollToSettings) != null ? _a : {}));
  }
  highlight(id) {
    var _a;
    const $content = this.querySelector(`pre#${id} code`);
    const item = this._items.find((i) => i.id === id);
    if ($content.hasAttribute("inited")) {
      this.setMoreClass();
      return;
    }
    $content.setAttribute("inited", "true");
    let code;
    try {
      const codeToHighlight = (0, import_decodeHtmlEntities.default)($content.innerHTML.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ""));
      code = import_core.default.highlight(codeToHighlight, {
        language: $content.getAttribute("lang")
      });
    } catch (e) {
      console.log(e);
    }
    item.highlightedCode = (_a = code == null ? void 0 : code.value) != null ? _a : "";
    this.setMoreClass();
  }
  copy() {
    const id = this._activeTabId;
    const item = this._items.filter((i) => i.id === id)[0];
    this.$copy.copy(item.code);
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    const currentItem = this.currentItem;
    return import_lit.html`
            <div
                class="${this.componentUtils.className()} ${this.props.more ? this.componentUtils.className("more") : ""}"
                ?lines="${this.lines}"
                ?mounted="${this.mounted}"
                ?bare="${this.bare}"
                toolbar-position="${this.toolbarPosition}"
            >
                <div class="templates"></div>

                <header class="${this.componentUtils.className("__nav")}">
                    <div
                        class="${this.componentUtils.className("__tabs", "s-tabs")}"
                    >
                        ${((_a = this._items) != null ? _a : []).map((item) => import_lit.html`
                                <div
                                    class="${this.componentUtils.className("__tab")}"
                                    id="${item.id}"
                                    ?active="${this._activeTabId === item.id}"
                                    @click="${this.setActiveTabByTab}"
                                >
                                    ${item.lang}
                                </div>
                            `)}
                    </div>
                    ${this.toolbarPosition === "nav" ? import_lit.html`
                              <div
                                  class="${this.componentUtils.className("__toolbar")}"
                              >
                                  <s-clipboard-copy
                                      @click="${this.copy}"
                                  ></s-clipboard-copy>
                              </div>
                          ` : ""}
                </header>
                <div
                    class="${this.componentUtils.className("__content")}"
                    style="--max-lines: ${(_b = this.props.lines) != null ? _b : 99999999};"
                >
                    ${this.toolbarPosition !== "nav" ? import_lit.html`
                              <div
                                  class="${this.componentUtils.className("__toolbar")}"
                              >
                                  <s-clipboard-copy
                                      @click="${this.copy}"
                                  ></s-clipboard-copy>
                              </div>
                          ` : ""}
                    ${((_c = this._items) != null ? _c : []).map((item) => {
      var _a2, _b2, _c2;
      return import_lit.html`
                            <pre
                                class="${this.componentUtils.className("__code")}"
                                style="line-height:0;"
                                id="${(_a2 = item.id) != null ? _a2 : item.lang}"
                                ?active="${this._activeTabId === ((_b2 = item.id) != null ? _b2 : item.lang)}"
                            >
                            <code lang="${(_c2 = item.lang) != null ? _c2 : item.id}" class="language-${item.lang} ${item.lang} ${this.props.bare ? "" : "hljs"}">${item.highlightedCode ? (0, import_unsafe_html.unsafeHTML)(item.highlightedCode) : item.code.trim()}</code>
                        </pre>
                        `;
    })}
                    ${this.props.lines && currentItem.lines > this.lines ? import_lit.html`
                        <div class="${this.componentUtils.className("__more-bar")}">
                            ${this.moreAction === "toggle" ? import_lit.html`
                                          <a
                                              class="${this.componentUtils.className("__more-button", "s-btn")}"
                                              @click="${() => this.toggleMore()}"
                                          >
                                              ${this._more ? import_lit.html`
                                                        ${(_d = this.props.lessLabel) != null ? _d : "Show less"}
                                                    ` : import_lit.html`
                                                        ${(_e = this.props.moreLabel) != null ? _e : "Show more"}
                                                    `}
                                          </a>
                                      ` : import_lit.html`
                                          <a
                                              class="${this.componentUtils.className("__more-button", "s-btn s-color--accent")}"
                                              href="${this.moreAction}"
                                          >
                                              ${this._more ? import_lit.html`
                                                        ${(_f = this.props.lessLabel) != null ? _f : "Show less"}
                                                    ` : import_lit.html`
                                                        ${(_g = this.props.moreLabel) != null ? _g : "Show more"}
                                                    `}
                                          </a>
                                      `}                        
                            </a>
                        </div>
                    ` : ""}
                </div>
            </div>
        `;
  }
}
__decorateClass([
  (0, import_decorators.property)()
], SCodeExample.prototype, "_items", 2);
__decorateClass([
  (0, import_decorators.property)()
], SCodeExample.prototype, "_activeTabId", 2);
__decorateClass([
  (0, import_decorators.property)({
    type: String
  })
], SCodeExample.prototype, "active", 2);
__decorateClass([
  (0, import_decorators.property)()
], SCodeExample.prototype, "props", 2);
__decorateClass([
  (0, import_decorators.query)("s-clipboard-copy")
], SCodeExample.prototype, "$copy", 2);
__decorateClass([
  (0, import_decorators.query)(".templates")
], SCodeExample.prototype, "$templatesContainer", 2);
function define(props = {}, tagName = "s-code-example") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, SCodeExample);
}
