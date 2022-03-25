var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import { define as __SClipboardCopy } from "@coffeekraken/s-clipboard-copy-component";
import __SLitComponent from "@coffeekraken/s-lit-component";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __wait from "@coffeekraken/sugar/shared/time/wait";
import __hljs from "highlight.js/lib/core";
import __langBash from "highlight.js/lib/languages/bash";
import __langCss from "./languages/css";
import __langJavascript from "highlight.js/lib/languages/javascript";
import __langPhp from "highlight.js/lib/languages/php";
import __langHtml from "highlight.js/lib/languages/xml";
import { css, html, unsafeCSS } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { property, query } from "lit/decorators.js";
import __decodeHtmlEntities from "@coffeekraken/sugar/js/html/decodeHtmlEntities";
import __css from "../css/s-code-example.css";
import __SCodeExampleComponentInterface from "./interface/SCodeExampleComponentInterface";
import __scrollTo from "@coffeekraken/sugar/js/dom/scroll/scrollTo";
import __prettier from "prettier/esm/standalone.mjs";
import __prettierJs from "prettier/esm/parser-babel.mjs";
import __prettierHtml from "prettier/esm/parser-html.mjs";
import __prettierCss from "prettier/esm/parser-postcss.mjs";
import __prettierPhp from "@prettier/plugin-php/standalone";
__SClipboardCopy();
class SCodeExample extends __SLitComponent {
  constructor() {
    super(__deepMerge({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: __SCodeExampleComponentInterface
      }
    }));
    this._$copy = void 0;
    this._items = [];
    this._activeTabId = void 0;
    var _a;
    const languages = __spreadValues({
      html: __langHtml,
      javascript: __langJavascript,
      js: __langJavascript,
      php: __langPhp,
      bash: __langBash,
      shell: __langBash,
      css: __langCss,
      scss: __langCss
    }, (_a = this.props.languages) != null ? _a : {});
    Object.keys(languages).forEach((lang) => {
      __hljs.registerLanguage(lang, languages[lang]);
    });
  }
  static get properties() {
    return __SLitComponent.properties({}, __SCodeExampleComponentInterface);
  }
  static get styles() {
    return css`
            ${unsafeCSS(__css)}
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
      let rawCode = __decodeHtmlEntities($template.tagName.toLowerCase() === "textarea" && $template.value ? $template.value : $template.innerHTML);
      let formatedCode = rawCode;
      try {
        formatedCode = __prettier.format(rawCode, {
          parser,
          plugins: [
            __prettierCss,
            __prettierHtml,
            __prettierJs,
            __prettierPhp
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
    await __wait();
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
    __scrollTo(this, __spreadValues({}, (_a = this.props.scrollToSettings) != null ? _a : {}));
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
      const codeToHighlight = __decodeHtmlEntities($content.innerHTML.replace(/(<|&lt;)!\s?--\?lit.*--\s?(>|&gt;)/, ""));
      code = __hljs.highlight(codeToHighlight, {
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
    return html`
            <div
                class="${this.componentUtils.className()} ${this.props.more ? this.componentUtils.className("more") : ""}"
                ?lines="${this.lines}"
                ?mounted="${this.mounted}"
                ?bare="${this.bare}"
                toolbar-position="${this.toolbarPosition}"
            >
                <div class="templates">
                </div>

                <header class="${this.componentUtils.className("__nav")}">
                    <div
                        class="${this.componentUtils.className("__tabs", "s-tabs")}"
                    >
                        ${((_a = this._items) != null ? _a : []).map((item) => html`
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
                    ${this.toolbarPosition === "nav" ? html`
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
                    ${this.toolbarPosition !== "nav" ? html`
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
      return html`
                            <pre
                                class="${this.componentUtils.className("__code")}"
                                style="line-height:0;"
                                id="${(_a2 = item.id) != null ? _a2 : item.lang}"
                                ?active="${this._activeTabId === ((_b2 = item.id) != null ? _b2 : item.lang)}"
                            >
                            <code lang="${(_c2 = item.lang) != null ? _c2 : item.id}" class="language-${item.lang} ${item.lang} ${this.props.bare ? "" : "hljs"}">${item.highlightedCode ? unsafeHTML(item.highlightedCode) : item.code.trim()}</code>
                        </pre>
                        `;
    })}
                    ${this.props.lines && currentItem.lines > this.lines ? html`
                        <div class="${this.componentUtils.className("__more-bar")}">
                            ${this.moreAction === "toggle" ? html`
                                          <a
                                              class="${this.componentUtils.className("__more-button", "s-btn")}"
                                              @click="${() => this.toggleMore()}"
                                          >
                                              ${this._more ? html`
                                                            ${(_d = this.props.lessLabel) != null ? _d : "Show less"}
                                                        ` : html`
                                                            ${(_e = this.props.moreLabel) != null ? _e : "Show more"}
                                                        `}
                                          </a>
                                      ` : html`
                                          <a
                                              class="${this.componentUtils.className("__more-button", "s-btn s-color--accent")}"
                                              href="${this.moreAction}"
                                          >
                                              ${this._more ? html`
                                                            ${(_f = this.props.lessLabel) != null ? _f : "Show less"}
                                                        ` : html`
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
  property()
], SCodeExample.prototype, "_items", 2);
__decorateClass([
  property()
], SCodeExample.prototype, "_activeTabId", 2);
__decorateClass([
  property({
    type: String
  })
], SCodeExample.prototype, "active", 2);
__decorateClass([
  property()
], SCodeExample.prototype, "props", 2);
__decorateClass([
  query("s-clipboard-copy")
], SCodeExample.prototype, "$copy", 2);
__decorateClass([
  query(".templates")
], SCodeExample.prototype, "$templatesContainer", 2);
function define(props = {}, tagName = "s-code-example") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SCodeExample);
}
export {
  SCodeExample as default,
  define
};
