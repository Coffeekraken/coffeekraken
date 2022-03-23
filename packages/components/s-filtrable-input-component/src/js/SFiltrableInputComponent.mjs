import "../../../../chunk-PG3ZPS4G.mjs";
import { html, css, unsafeCSS } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import __SFiltrableInputComponentInterface from "./interface/SFiltrableInputComponentInterface";
import __SLitComponent from "@coffeekraken/s-lit-component";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
import __cursorToEnd from "@coffeekraken/sugar/js/dom/input/cursorToEnd";
import __clone from "@coffeekraken/sugar/shared/object/clone";
import __distanceFromElementTopToViewportBottom from "@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportBottom";
import __getStyleProperty from "@coffeekraken/sugar/js/dom/style/getStyleProperty";
import __distanceFromElementTopToViewportTop from "@coffeekraken/sugar/js/dom/distance/fromElementTopToViewportTop";
import __hotkey from "@coffeekraken/sugar/js/keyboard/hotkey";
import __stripTags from "@coffeekraken/sugar/js/dom/manipulate/stripTags";
import __onScrollEnd from "@coffeekraken/sugar/js/dom/detect/onScrollEnd";
import __css from "../css/s-filtrable-input.css";
class SFiltrableInput extends __SLitComponent {
  constructor() {
    super(__deepMerge({
      litComponent: {
        shadowDom: false
      },
      componentUtils: {
        interface: __SFiltrableInputComponentInterface
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
                            ${unsafeHTML(typeof this.props.label === "function" ? this.props.label({ item }) : item[this.props.label])}
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
    return css`
            ${unsafeCSS(__css)}
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
    __onScrollEnd(this.$list, () => {
      var _a2;
      this.state.displayedMaxItems = ((_a2 = this.state.displayedMaxItems) != null ? _a2 : 0) + this.props.maxItems;
      this.filterItems(false);
    });
    __hotkey("escape").on("press", (e) => {
      e.preventDefault();
      if (!this.state.isActive)
        return;
      this.close();
    });
    __hotkey("up").on("press", (e) => {
      e.preventDefault();
      if (!this.state.isActive)
        return;
      this.state.preselectedItemIdx = this.state.preselectedItemIdx > 0 ? this.state.preselectedItemIdx - 1 : 0;
      this.requestUpdate();
      const $item = this.$list.children[this.state.preselectedItemIdx];
      $item.focus();
    });
    __hotkey("down").on("press", (e) => {
      e.preventDefault();
      if (!this.state.isActive)
        return;
      this.state.preselectedItemIdx = this.state.preselectedItemIdx >= this.state.filteredItems.length - 1 ? this.state.filteredItems.length - 1 : this.state.preselectedItemIdx + 1;
      this.requestUpdate();
      const $item = this.$list.children[this.state.preselectedItemIdx];
      $item.focus();
    });
    __hotkey("return").on("press", (e) => {
      if (!this.state.isActive)
        return;
      this.validateAndClose();
    });
    if (this.$input.value) {
      this.state.value = this.$input.value;
      __cursorToEnd(this.$input);
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
        html
      });
      if (res)
        return res;
    }
    if (this._templatesFromHtml[type]) {
      return html`
                ${unsafeHTML(this._templatesFromHtml[type])}
            `;
    }
    return this.state.baseTemplates({
      type,
      html
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
      const itemProps = __deepMerge(Object.assign({}, this.props), (_a = this.state.preselectedItem.props) != null ? _a : {});
      if (typeof itemProps.value === "string" && ((_b = this.preselectedItem) == null ? void 0 : _b[itemProps.value])) {
        this.$input.value = __stripTags(this.preselectedItem[itemProps.value]);
      } else if (typeof itemProps.value === "function") {
        const v = itemProps.value({
          item: this.state.filteredItems[this.state.preselectedItemIdx]
        });
        if (typeof v !== "string") {
          throw new Error(`<red>[s-filtrable-input]</red> Sorry but the returned value "<yellow>${v}</yellow>" has to be a string...`);
        }
        this.$input.value = __stripTags(v);
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
    __cursorToEnd(this.$input);
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
      if (__isPlainObject(items)) {
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
    let filteredItems = items.map((item) => __clone(item));
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
    const marginTop = __getStyleProperty(this.$dropdown, "marginTop"), marginLeft = __getStyleProperty(this.$dropdown, "marginLeft"), marginRight = __getStyleProperty(this.$dropdown, "marginRight"), marginBottom = __getStyleProperty(this.$dropdown, "marginBottom");
    const distanceTop = __distanceFromElementTopToViewportTop(this.$input);
    const distanceBottom = __distanceFromElementTopToViewportBottom(this.$input) - this.$input.clientHeight;
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
    return html`
            <div class="s-filtrable-input__dropdown">
                <div class="s-filtrable-input__before" tabindex="0">
                    ${this._getTemplate("before")}
                </div>
                <ul class="s-filtrable-input__list">
                    ${this.state.isLoading ? html`
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-loading"
                            >
                                ${(_c = (_b = (_a = this.props).templates) == null ? void 0 : _b.call(_a, {
      type: "loading",
      html
    })) != null ? _c : this.state.baseTemplates({
      type: "loading",
      html
    })}
                            </li>
                        ` : !this.state.isLoading && this.state.filteredItems.length <= 0 ? html`
                            <li
                                class="s-filtrable-input__list-item s-filtrable-input__list-no-item"
                            >
                                ${(_f = (_e = (_d = this.props).templates) == null ? void 0 : _e.call(_d, {
      type: "empty",
      html
    })) != null ? _f : this.state.baseTemplates({
      type: "empty",
      html
    })}
                            </li>
                        ` : !this.state.isLoading && this.state.filteredItems.length ? this.state.filteredItems.map((item, idx) => {
      var _a2, _b2, _c2;
      return idx < this.state.displayedMaxItems ? html`
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
        html,
        unsafeHTML,
        item,
        idx
      })) != null ? _c2 : this.state.baseTemplates({
        type: "item",
        html,
        unsafeHTML,
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
      html
    })}
                </div>
            </div>
        `;
  }
}
function define(props = {}, tagName = "s-filtrable-input") {
  __SLitComponent.setDefaultProps(tagName, props);
  customElements.define(tagName, SFiltrableInput);
}
export {
  SFiltrableInput as default,
  define
};
