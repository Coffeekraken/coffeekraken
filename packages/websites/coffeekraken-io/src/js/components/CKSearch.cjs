import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CKSearch_exports = {};
__export(CKSearch_exports, {
  default: () => CKSearch,
  define: () => define
});
module.exports = __toCommonJS(CKSearch_exports);
var import_s_request = __toESM(require("@coffeekraken/s-request"), 1);
var import_lit = require("lit");
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_s_filtrable_input_component = require("@coffeekraken/s-filtrable-input-component");
var import_queryStringToObject = __toESM(require("@coffeekraken/sugar/shared/url/queryStringToObject"), 1);
var import_hotkey = __toESM(require("@coffeekraken/sugar/js/keyboard/hotkey"), 1);
var import_querySelectorLive = __toESM(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"), 1);
var import_cursorToEnd = __toESM(require("@coffeekraken/sugar/js/dom/input/cursorToEnd"), 1);
(0, import_s_filtrable_input_component.define)({
  value: "name",
  label: (item) => {
    return `${item.type} ${item.namespace}`;
  },
  closeOnSelect: true,
  filtrable: ["namespace", "name", "type"],
  searchValuePreprocess: (value) => {
    if (value.match(/^@[a-z_-]+\s.*/)) {
      return value.replace(/^@[a-z_-]+\s/, "").trim();
    }
    if (value.match(/^@[a-z_-]+/)) {
      return value.replace(/^@/, "").trim();
    }
    if (value.match(/^\/[a-z]+\s.*/)) {
      return value.replace(/^\/[a-z]+\s/, "").trim();
    }
    if (value.match(/^\/[a-z]+/)) {
      return value.replace(/^\//, "").trim();
    }
    return value;
  },
  templates: ({ type, item, html: html2, unsafeHTML }) => {
    var _a, _b, _c, _d;
    if (type === "item") {
      switch (item.type) {
        case "category":
        case "package":
          return html2`
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.name)}
                                    </h4>
                                </div>
                                <p class="__description s-typo:p s-truncate:2">
                                    ${unsafeHTML((_a = item.description) != null ? _a : "")}
                                </p>
                            </div>
                        `;
          break;
        default:
          return html2`
                            <div class="ck-search__list-item">
                                <div class="s-flex s-mbe:10">
                                    <h4
                                        class="ck-search__list-item-title s-typo:bold s-tc:accent s-flex-item:grow"
                                    >
                                        ${unsafeHTML(item.name)}
                                    </h4>
                                    <div>
                                        ${item.platform.map((platform) => html2`
                                                <i
                                                    class="s-platform:${platform.name}"
                                                ></i>
                                            `)}
                                        &nbsp;
                                        <span class="s-badge s-color:main"
                                            >${unsafeHTML((_b = item.type) != null ? _b : "")}</span
                                        >
                                    </div>
                                </div>
                                <p class="__namespace s-opacity:50 s-font:20 s-mbe:20">
                                    ${unsafeHTML((_c = item.namespace) != null ? _c : "")}
                                </p>
                                <p class="__description s-typo:p s-truncate:2">
                                    ${unsafeHTML((_d = item.description) != null ? _d : "")}
                                </p>
                            </div>
                        `;
          break;
      }
    }
  },
  items: async ({ value }) => {
    async function fetchItems() {
      const request = new import_s_request.default({
        url: "/docmap.json"
      });
      const result = await request.send();
      const items2 = [];
      Object.keys(result.data.map).forEach((namespace) => {
        const item = result.data.map[namespace];
        item.fullNamespace = namespace;
        items2.push(item);
      });
      window.localStorage.setItem("ck-search-items", JSON.stringify(items2));
      return items2;
    }
    let items;
    const cached = window.localStorage.getItem("ck-search-items");
    if (!cached) {
      items = await fetchItems();
    } else {
      fetchItems();
      items = JSON.parse(cached);
    }
    if (value.match(/^@([a-z_-]+)?$/)) {
      let packageName = value.replace(/^@/, "");
      let packages = {};
      items.forEach((item) => {
        if (item.package.name.includes(`@coffeekraken/${packageName}`)) {
          if (!packages[item.package.name]) {
            packages[item.package.name] = {
              value: `@${item.package.name.replace("@coffeekraken/", "")}`,
              namespace: item.package.name,
              type: "package",
              name: item.package.name,
              description: item.package.description,
              props: {
                value: "value"
              }
            };
          }
        }
      });
      return Object.values(packages);
    }
    if (value.match(/^\/([a-z]+)?$/)) {
      return [{
        value: "/doc",
        namespace: "/doc",
        type: "category",
        name: "Documentation",
        description: "Search through the documentation",
        props: {
          value: "value"
        }
      }, {
        value: "/styleguide",
        namespace: "/styleguide",
        type: "category",
        name: "Styleguide",
        description: "Search through the styleguide",
        props: {
          value: "value"
        }
      }, {
        value: "/api",
        namespace: "/api",
        type: "category",
        name: "API",
        description: "Search through the API",
        props: {
          value: "value"
        }
      }];
    }
    if (value.match(/^@[a-z_-]+\s.*?/)) {
      const packageName = `@coffeekraken/${value.replace(/^@/, "").split(" ")[0].trim()}`;
      return items.filter((item) => {
        return item.package.name.startsWith(packageName);
      });
    }
    if (value.match(/^\/[a-z]+.*?/)) {
      if (value.startsWith("/doc")) {
        return items.filter((item) => {
          return item.type === "Markdown";
        });
      }
      if (value.startsWith("/styleguide")) {
        return items.filter((item) => {
          return item.type === "Styleguide";
        });
      }
      if (value.startsWith("/api")) {
        return items.filter((item) => {
          return item.type !== "Markdown" && item.type !== "Styleguide";
        });
      }
    }
    return items;
  }
}, "ck-search-input");
class CKSearch extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    var _a, _b;
    const queryObj = (0, import_queryStringToObject.default)((_a = document.location.search) != null ? _a : "");
    this._search = (_b = queryObj.search) != null ? _b : "";
    (0, import_querySelectorLive.default)('[href^="#search="]', ($elm) => {
      $elm.addEventListener("click", (e) => {
        this._handleAnchor(e.target.href.split("#").pop());
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }
  _handleAnchor(anchor) {
    const keywords = anchor.replace("search=", "").split("=").pop();
    this._$input.value = keywords;
    this._$input.focus();
  }
  firstUpdated() {
    this._$input = this.querySelector("input");
    if (document.location.hash) {
      this, this._handleAnchor(document.location.hash.replace("#", ""));
    }
    (0, import_hotkey.default)("ctrl+p").on("press", () => {
      (0, import_cursorToEnd.default)(this._$input);
    });
    this.addEventListener("selectItem", (e) => {
      var _a;
      const { item, $elm } = e.detail;
      if (item.type === "category" || item.type === "package") {
        this._$input.value = item.value + " ";
        (0, import_cursorToEnd.default)(this._$input);
      } else {
        if ((_a = item.menu) == null ? void 0 : _a.slug) {
          if (item.package.name !== window.packageJson.name) {
            $elm.dispatchEvent(new CustomEvent("location.href", {
              detail: `/${item.package.name}${item.menu.slug}`,
              bubbles: true
            }));
          } else {
            $elm.dispatchEvent(new CustomEvent("location.href", {
              detail: item.menu.slug,
              bubbles: true
            }));
          }
        } else {
          $elm.dispatchEvent(new CustomEvent("location.href", {
            detail: `/api/${item.fullNamespace}`,
            bubbles: true
          }));
        }
        this._$input.value = "";
        this._$input.blur();
      }
    });
  }
  render() {
    return import_lit.html`
            <div class="ck-search">
                <div class="ck-search__background"></div>
                <div class="ck-search__content s-color:accent">
                    <ck-search-input>
                        <input
                            placeholder="Search..."
                            type="text"
                            name="search"
                            value="${this._search}"
                            class="s-input s-color:accent"
                        />
                        <template type="before">
                            <div class="s-p:30" id="search-tips">
                                <p class="s-mbe:20">
                                    <span class="s-typo:p s-tc:current">Search tips</span>
                                    <i class="s-icon:close s-float:right" s-activate href="#search-tips"></i>
                                </p>
                                <p class="s-typo:p">
                                    <span class="s-badge:outline s-mie:10">/...</span> Categories&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-badge:outline s-mie:10">@...</span> Packages&nbsp;&nbsp;&nbsp;&nbsp;<span class="s-badge s-color:complementary s-mie:10">CMD+P</span> Search shortcut
                                </p>
                            </div>
                        </template>
                    </ck-search-input>
                </div>
            </div>
        `;
  }
}
function define(props = {}, tagName = "ck-search") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, CKSearch);
}
