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
var SFiltrableInputComponent_exports = {};
__export(SFiltrableInputComponent_exports, {
  default: () => SFiltrableInput,
  define: () => define
});
module.exports = __toCommonJS(SFiltrableInputComponent_exports);
var import_lit = require("lit");
var import_unsafe_html = require("lit/directives/unsafe-html.js");
var import_SFiltrableInputComponentInterface = __toESM(require("./interface/SFiltrableInputComponentInterface"));
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"));
var import_cursorToEnd = __toESM(require("@coffeekraken/sugar/js/dom/input/cursorToEnd"));
var import_clone = __toESM(require("@coffeekraken/sugar/shared/object/clone"));
var import_fromElementTopToViewportBottom = __toESM(require("@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom"));
var import_getStyleProperty = __toESM(require("@coffeekraken/sugar/js/dom/style/getStyleProperty"));
var import_fromElementTopToViewportTop = __toESM(require("@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop"));
var import_hotkey = __toESM(require("@coffeekraken/sugar/js/keyboard/hotkey"));
var import_stripTags = __toESM(require("@coffeekraken/sugar/js/dom/manipulate/stripTags"));
var import_onScrollEnd = __toESM(require("@coffeekraken/sugar/js/dom/detect/onScrollEnd"));
var import_s_filtrable_input = __toESM(require("../../../../src/css/s-filtrable-input.css"));
class SFiltrableInput extends import_s_lit_component.default {
  constructor() {
    super((0, import_deepMerge.default)({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: import_SFiltrableInputComponentInterface.default
      }
    }));
    this._templatesFromHtml = {};
    this.state = {
      baseTemplates: {},
      preselectedItem: {},
      preselectedItemIdx: -1,
      selectedItemIdx: -1,
      selectedItem: {},
      displayedMaxItems: 0,
      value: "",
      isActive: false,
      isLoading: false,
      items: [],
      filteredItems: []
    };
    this.state.displayedMaxItems = this.props.maxItems;
    if (this.props.items && typeof this.props.items === "string") {
      const $itemsElm = document.querySelector(this.props.items);
      if ($itemsElm) {
        this.state.items = JSON.parse($itemsElm.innerHTML);
        this.requestUpdate();
      }
    }
    this.state.baseTemplates = ({ type, item, html: html2 }) => {
      switch (type) {
        case "item":
          return html2`
                        <div class="${this.componentUtils.className("__item")}">
                            ${(0, import_unsafe_html.unsafeHTML)(typeof this.props.label === "function" ? this.props.label({ item }) : item[this.props.label])}
                        </div>
                    `;
          break;
        case "empty":
          return html2`
                        <div
                            class="${this.componentUtils.className("__empty")}"
                        >
                            ${this.props.emptyText}
                        </div>
                    `;
          break;
        case "loading":
          return html2`
                        <div
                            class="${this.componentUtils.className("__loading")}"
                        >
                            ${this.props.loadingText}
                        </div>
                    `;
          break;
      }
    };
  }
  static get styles() {
    return import_lit.css`
            ${(0, import_lit.unsafeCSS)(import_s_filtrable_input.default)}
        `;
  }
  async firstUpdated() {
    var _a;
    this.$input = this.querySelector("input");
    this.$input.setAttribute("autocomplete", "off");
    this.$form = this.$input.form;
    this.$form.addEventListener("submit", (e) => {
      if (this.state.isActive) {
        e.preventDefault();
      }
    });
    this._grabTemplates();
    if (!this.props.bare) {
      (_a = this.$input.classList) == null ? void 0 : _a.add("s-input");
    }
    this.$input.addEventListener("keyup", (e) => {
      this.state.isActive = true;
      const value = e.target.value;
      this.state.value = value;
      this.state.displayedMaxItems = this.props.maxItems;
      this.filterItems();
    });
    this.$input.addEventListener("focus", (e) => {
      const value = e.target.value;
      this.state.value = value;
      this.state.isActive = true;
      this.filterItems();
      this._updateListSizeAndPosition();
    });
    this.$input.classList.add(this.componentUtils.className("__input"));
    this.$container = this;
    this.$container.classList.add("s-filtrable-input");
    this.$container.classList.add(this.componentUtils.className());
    this.$list = this.querySelector("ul");
    this.$dropdown = this.querySelector(`.s-filtrable-input__dropdown`);
    this.prepend(this.$input);
    this.filterItems();
    document.addEventListener("scroll", () => {
      this._updateListSizeAndPosition();
    });
    this._updateListSizeAndPosition();
    (0, import_onScrollEnd.default)(this.$list, () => {
      var _a2;
      this.state.displayedMaxItems = ((_a2 = this.state.displayedMaxItems) != null ? _a2 : 0) + this.props.maxItems;
      this.filterItems(false);
    });
    (0, import_hotkey.default)("escape").on("press", (e) => {
      e.preventDefault();
      if (!this.state.isActive)
        return;
      this.close();
    });
    (0, import_hotkey.default)("up").on("press", (e) => {
      e.preventDefault();
      if (!this.state.isActive)
        return;
      this.state.preselectedItemIdx = this.state.preselectedItemIdx > 0 ? this.state.preselectedItemIdx - 1 : 0;
      this.requestUpdate();
      const $item = this.$list.children[this.state.preselectedItemIdx];
      $item.focus();
    });
    (0, import_hotkey.default)("down").on("press", (e) => {
      e.preventDefault();
      if (!this.state.isActive)
        return;
      this.state.preselectedItemIdx = this.state.preselectedItemIdx >= this.state.filteredItems.length - 1 ? this.state.filteredItems.length - 1 : this.state.preselectedItemIdx + 1;
      this.requestUpdate();
      const $item = this.$list.children[this.state.preselectedItemIdx];
      $item.focus();
    });
    (0, import_hotkey.default)("return").on("press", (e) => {
      if (!this.state.isActive)
        return;
      this.validateAndClose();
    });
    if (this.$input.value) {
      this.state.value = this.$input.value;
      (0, import_cursorToEnd.default)(this.$input);
      this.filterItems(true);
    }
  }
  _grabTemplates() {
    this.querySelectorAll("template").forEach(($template) => {
      if (!$template.hasAttribute("type"))
        return;
      this._templatesFromHtml[$template.getAttribute("type")] = $template.innerHTML;
    });
  }
  _getTemplate(type) {
    if (this.props.templates) {
      const res = this.props.templates({
        type,
        html: import_lit.html
      });
      if (res)
        return res;
    }
    if (this._templatesFromHtml[type]) {
      return import_lit.html` ${(0, import_unsafe_html.unsafeHTML)(this._templatesFromHtml[type])} `;
    }
    return this.state.baseTemplates({
      type,
      html: import_lit.html
    });
  }
  get selectedItem() {
    if (this.state.selectedItemIdx === -1)
      return;
    return this.state.filteredItems[this.state.selectedItemIdx];
  }
  get preselectedItem() {
    if (this.state.preselectedItemIdx === -1)
      return;
    return this.state.filteredItems[this.state.preselectedItemIdx];
  }
  validate() {
    var _a, _b;
    if (this.state.preselectedItemIdx === -1)
      return;
    if (this.preselectedItem) {
      const itemProps = (0, import_deepMerge.default)(Object.assign({}, this.props), (_a = this.state.preselectedItem.props) != null ? _a : {});
      if (typeof itemProps.value === "string" && ((_b = this.preselectedItem) == null ? void 0 : _b[itemProps.value])) {
        this.$input.value = (0, import_stripTags.default)(this.preselectedItem[itemProps.value]);
      } else if (typeof itemProps.value === "function") {
        const v = itemProps.value({
          item: this.state.filteredItems[this.state.preselectedItemIdx]
        });
        if (typeof v !== "string") {
          throw new Error(`<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`);
        }
        this.$input.value = (0, import_stripTags.default)(v);
      }
    }
    this.state.selectedItemIdx = this.state.preselectedItemIdx;
    const $selectedItem = this.$list.children[this.state.selectedItemIdx];
    const event = new CustomEvent("selectItem", {
      bubbles: true,
      detail: {
        item: this.selectedItem,
        $elm: $selectedItem
      }
    });
    this.dispatchEvent(event);
    this.state.value = this.$input.value;
    this.requestUpdate();
    if (this.props.closeOnSelect) {
      this.reset();
      this.filterItems();
      this.close();
    }
  }
  validateAndClose() {
    this.validate();
    setTimeout(() => {
      this.close();
    }, this.props.closeTimeout);
  }
  resetSelected() {
    this.state.preselectedItemIdx = -1;
    this.state.preselectedItem = {};
    this.state.selectedItemIdx = -1;
    this.state.selectedItem = {};
  }
  reset() {
    this.resetSelected();
    this.$input.value = "";
  }
  close() {
    (0, import_cursorToEnd.default)(this.$input);
    this.$input.blur();
    this.state.isActive = false;
  }
  async refreshItems() {
    if (typeof this.props.items === "function") {
      this.state.isLoading = true;
      this.requestUpdate();
      const items = await this.props.items({
        value: this.$input.value
      });
      if ((0, import_plainObject.default)(items)) {
        this.state.items = Object.values(items);
      } else if (Array.isArray(items)) {
        this.state.items = items;
      } else {
        throw new Error(`Sorry but the "items" MUST be an Array...`);
      }
    }
  }
  async filterItems(needUpdate = true) {
    if (needUpdate)
      await this.refreshItems();
    this.resetSelected();
    let items = this.state.items;
    let searchValue = this.state.value;
    if (this.props.searchValuePreprocess) {
      searchValue = this.props.searchValuePreprocess(searchValue);
    }
    let filteredItems = items.map((item) => (0, import_clone.default)(item));
    if (this.props.filterItems) {
      filteredItems = await this.props.filterItems(filteredItems, searchValue, this.state);
    } else {
      let matchedItemsCount = 0;
      filteredItems = filteredItems.filter((item) => {
        if (matchedItemsCount >= this.state.displayedMaxItems)
          return false;
        if (!this.props.filtrable.length)
          return true;
        let matchFilter = false;
        for (let i = 0; i < Object.keys(item).length; i++) {
          const propName = Object.keys(item)[i], propValue = item[propName];
          if (typeof propValue !== "string")
            continue;
          if (this.props.filtrable.indexOf(propName) !== -1) {
            const reg = new RegExp(searchValue.split(" ").join("|"), "gi");
            if (propValue.match(reg)) {
              matchFilter = true;
              if (searchValue && searchValue !== "") {
                const reg2 = new RegExp(searchValue.split(" ").join("|"), "gi");
                const finalString = propValue.replace(reg2, (str) => {
                  return `<span class="${this.componentUtils.className("__list-item-highlight")} s-highlight"
                                                    >${str}</span>`;
                });
                item[propName] = finalString;
              }
            }
          }
        }
        if (matchFilter) {
          matchedItemsCount++;
        }
        return matchFilter;
      });
    }
    this.state.filteredItems = filteredItems;
    this.state.isLoading = false;
    this.requestUpdate();
  }
  select(idx) {
    this._setPreselectedItemByIdx(idx);
  }
  preselectAndValidate(idx) {
    this._setPreselectedItemByIdx(idx);
    this.validate();
  }
  preselectValidateAndClose(idx) {
    this._setPreselectedItemByIdx(idx);
    this.validateAndClose();
  }
  _setSelectedItemByIdx(idx) {
    if (this.props.notSelectable)
      return;
    this.state.selectedItemIdx = idx;
    this.state.selectedItem = this.selectedItem;
    this.requestUpdate();
  }
  _setPreselectedItemByIdx(idx) {
    if (this.props.notSelectable)
      return;
    this.state.preselectedItemIdx = idx;
    this.state.preselectedItem = this.preselectedItem;
    this.requestUpdate();
  }
  _updateListSizeAndPosition() {
    if (!this.state.isActive)
      return;
    const marginTop = (0, import_getStyleProperty.default)(this.$dropdown, "marginTop"), marginLeft = (0, import_getStyleProperty.default)(this.$dropdown, "marginLeft"), marginRight = (0, import_getStyleProperty.default)(this.$dropdown, "marginRight"), marginBottom = (0, import_getStyleProperty.default)(this.$dropdown, "marginBottom");
    const distanceTop = (0, import_fromElementTopToViewportTop.default)(this.$input);
    const distanceBottom = (0, import_fromElementTopToViewportBottom.default)(this.$input) - this.$input.clientHeight;
    let maxHeight;
    if (distanceTop > distanceBottom) {
      this.$container.classList.add("s-filtrable-input--top");
      this.$dropdown.style.top = `auto`;
      this.$dropdown.style.bottom = `calc(100% - ${marginBottom})`;
      maxHeight = distanceTop - parseInt(marginTop);
    } else {
      this.$container.classList.remove("s-filtrable-input--top");
      this.$dropdown.style.bottom = `auto`;
      this.$dropdown.style.top = `calc(100% - ${marginTop})`;
      maxHeight = distanceBottom - parseInt(marginBottom);
    }
    this.$dropdown.style.maxHeight = `${maxHeight}px`;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return import_lit.html`
            <div class="s-filtrable-input__dropdown">
                <div class="s-filtrable-input__before" tabindex="0">
                    ${this._getTemplate("before")}
                </div>
                <ul class="s-filtrable-input__list">
                    ${this.state.isLoading ? import_lit.html`
                              <li
                                  class="s-filtrable-input__list-item s-filtrable-input__list-loading"
                              >
                                  ${(_c = (_b = (_a = this.props).templates) == null ? void 0 : _b.call(_a, {
      type: "loading",
      html: import_lit.html
    })) != null ? _c : this.state.baseTemplates({
      type: "loading",
      html: import_lit.html
    })}
                              </li>
                          ` : !this.state.isLoading && this.state.filteredItems.length <= 0 ? import_lit.html`
                              <li
                                  class="s-filtrable-input__list-item s-filtrable-input__list-no-item"
                              >
                                  ${(_f = (_e = (_d = this.props).templates) == null ? void 0 : _e.call(_d, {
      type: "empty",
      html: import_lit.html
    })) != null ? _f : this.state.baseTemplates({
      type: "empty",
      html: import_lit.html
    })}
                              </li>
                          ` : !this.state.isLoading && this.state.filteredItems.length ? this.state.filteredItems.map((item, idx) => {
      var _a2, _b2, _c2;
      return idx < this.state.displayedMaxItems ? import_lit.html`
                                        <li
                                            @click=${() => this.preselectAndValidate(idx)}
                                            @dblclick=${() => this.preselectValidateAndClose(idx)}
                                            @focus=${() => this._setPreselectedItemByIdx(idx)}
                                            style="z-index: ${999999999 - idx}"
                                            tabindex="0"
                                            class="s-filtrable-input__list-item ${this.state.selectedItemIdx === idx ? "active" : ""}"
                                            hoverable
                                        >
                                            ${(_c2 = (_b2 = (_a2 = this.props).templates) == null ? void 0 : _b2.call(_a2, {
        type: "item",
        html: import_lit.html,
        unsafeHTML: import_unsafe_html.unsafeHTML,
        item,
        idx
      })) != null ? _c2 : this.state.baseTemplates({
        type: "item",
        html: import_lit.html,
        unsafeHTML: import_unsafe_html.unsafeHTML,
        item,
        idx
      })}
                                        </li>
                                    ` : "";
    }) : ""}
                </ul>
                <div class="s-filtrable-input__after" tabindex="0">
                    ${(_h = (_g = this.props).templates) == null ? void 0 : _h.call(_g, {
      type: "after",
      html: import_lit.html
    })}
                </div>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-filtrable-input") {
  import_s_lit_component.default.setDefaultProps(tagName, props);
  customElements.define(tagName, SFiltrableInput);
}
