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
var CKDiscover_exports = {};
__export(CKDiscover_exports, {
  default: () => CKDiscover,
  define: () => define
});
module.exports = __toCommonJS(CKDiscover_exports);
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_lit = require("lit");
var import_state = require("../state/state");
var import_filter = __toESM(require("@coffeekraken/sugar/shared/object/filter"), 1);
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"), 1);
class CKDiscover extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
  }
  async firstUpdated() {
    this._docmap = await (0, import_state.loadDocmap)();
    this.grabItem();
  }
  async grabItem() {
    this.item = void 0;
    this.requestUpdate();
    await (0, import_wait.default)();
    const newMap = (0, import_filter.default)(this._docmap.map, (key, item) => {
      if (!item.platform)
        return false;
      if (item.platform[0].name !== this.props.platform)
        return false;
      if (!item.example)
        return false;
      return true;
    });
    const mapCount = Object.keys(newMap).length;
    const mapKeys = Object.keys(newMap);
    const itemIdx = Math.floor(Math.random() * mapCount);
    this.item = newMap[mapKeys[itemIdx]];
    this.requestUpdate();
  }
  render() {
    return import_lit.html`
            <div class="ck-discover">
                ${!this.item ? import_lit.html`
                        <div class="s-code-example-loader">
                            <i class="s-loader:spinner s-color:accent"></i>
                            &nbsp;
                            <p class="s-typo:p s-display:inline-block">
                                Loading code example. Please wait...
                            </p>
                        </div>
                    ` : import_lit.html`
                        <a
                            @click="${this.grabItem}"
                            class="s-btn s-radius:100 s-align:abs-top-right s-color:accent s-float:right"
                        >
                            <i class="s-icon:refresh"></i>
                        </a>
                         ${this.item.async ? import_lit.html`
                                    <span
                                        class="s-badge:outline s-color:accent"
                                        >Async</span
                                    >&nbsp;
                                ` : ""}
                        <span class="s-badge s-color:complementary">${this.item.type}</span>
                        <br/>
                        <br/>
                          <h1 class="s-typo:h3 s-mbe:30">
                              ${this.item.name}
                          </h1>
                          <p class="s-typo:p s-mbe:30">
                              ${this.item.description}
                          </p>
                          <s-code-example>
                              <code
                                  lang="${this.props.platform === "ts" || this.props.platform === "node" ? "js" : this.props.platform === "postcss" ? "css" : this.props.platform}">
                                ${this.item.example[0].code}
                              </code>
                          </s-code-example>
                          <div
                              class="s-until:sibling:mounted s-code-example-loader"
                          >
                              <i class="s-loader:spinner s-color:accent"></i>
                              &nbsp;
                              <p class="s-typo:p s-display:inline-block">
                                  Loading code example. Please wait...
                              </p>
                          </div>
                      `}
            </div>
        `;
  }
}
function define(props = {}, tagName = "ck-discover") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, CKDiscover);
}
