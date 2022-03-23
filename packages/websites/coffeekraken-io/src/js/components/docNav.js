var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var docNav_exports = {};
__export(docNav_exports, {
  default: () => DocNav,
  define: () => define
});
module.exports = __toCommonJS(docNav_exports);
var import_s_lit_component = __toESM(require("@coffeekraken/s-lit-component"), 1);
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"), 1);
var import_lit = require("lit");
var import_decorators = require("lit/decorators.js");
var import_striptags = __toESM(require("@coffeekraken/sugar/shared/html/striptags"), 1);
var import_queryStringToObject = __toESM(require("@coffeekraken/sugar/shared/url/queryStringToObject"), 1);
var import_minisearch = __toESM(require("minisearch"), 1);
var import_sameItems = __toESM(require("@coffeekraken/sugar/shared/array/sameItems"), 1);
var import_onScrollEnd = __toESM(require("@coffeekraken/sugar/js/dom/detect/onScrollEnd"), 1);
var import_state = require("../state/state");
class DocNav extends import_s_lit_component.default {
  constructor() {
    super({
      litComponent: {
        shadowDom: false
      }
    });
    this.maxItems = 10;
    this._maxItemsToDisplay = 10;
    this._filteredItems = {};
    this._docmap = {};
    this._saved = {
      search: "",
      platforms: [],
      types: [],
      statuses: []
    };
    this._striptags = import_striptags.default;
    this._displayItemsCount = 0;
    this._searchTimeout = 0;
    this._renderExample = false;
    (async () => {
      const docmapJson = await (0, import_state.loadDocmap)();
      this._docmap = docmapJson;
      this._restoreState();
      const queryStringObj = (0, import_queryStringToObject.default)(document.location.search);
      if (queryStringObj.search) {
        this._saved.search = queryStringObj.search;
      }
      this._filterItems();
      await (0, import_wait.default)();
      (0, import_onScrollEnd.default)(document.body, () => {
        this._maxItemsToDisplay += this.maxItems;
        this._filterItems({
          reset: false
        });
      });
    })();
  }
  get availablePlatforms() {
    if (!this._docmap.map)
      return [];
    const availablePlatforms = [];
    Object.keys(this._docmap.map).forEach((namespace) => {
      const docmapObj = this._docmap.map[namespace];
      if (!docmapObj.platform)
        return;
      docmapObj.platform.forEach((platform) => {
        if (availablePlatforms.indexOf(platform.name) === -1)
          availablePlatforms.push(platform.name);
      });
    });
    return availablePlatforms;
  }
  get availableTypes() {
    if (!this._docmap.map)
      return [];
    const availableTypes = [];
    Object.keys(this._docmap.map).forEach((namespace) => {
      const docmapObj = this._docmap.map[namespace];
      if (!docmapObj.type)
        return;
      if (availableTypes.indexOf(docmapObj.type) === -1)
        availableTypes.push(docmapObj.type);
    });
    return availableTypes;
  }
  get availableStatuses() {
    if (!this._docmap.map)
      return [];
    const availableStatus = [];
    Object.keys(this._docmap.map).forEach((namespace) => {
      const docmapObj = this._docmap.map[namespace];
      if (!docmapObj.status)
        return;
      if (availableStatus.indexOf(docmapObj.status) === -1)
        availableStatus.push(docmapObj.status);
    });
    return availableStatus;
  }
  _filterItems(settings = {}) {
    settings = __spreadValues({
      reset: true
    }, settings);
    if (settings.reset)
      this._maxItemsToDisplay = this.maxItems;
    this._displayItemsCount = 0;
    let items = Object.values(this._docmap.map).map((i) => {
      i.id = i.name;
      return i;
    });
    if (this._saved.search) {
      let miniSearch = new import_minisearch.default({
        fields: [
          "name",
          "namespace",
          "description",
          "since",
          "type",
          "status"
        ],
        storeFields: Object.keys(items[0])
      });
      miniSearch.addAll(items);
      items = miniSearch.search(this._saved.search);
    }
    let newItems = [];
    for (let i = 0; i < items.length; i++) {
      const docmapObj = items[i];
      if (this._displayItemsCount >= this._maxItemsToDisplay)
        break;
      if (this._saved.platforms.length) {
        if (!docmapObj.platform)
          continue;
        const samePlatforms = (0, import_sameItems.default)(docmapObj.platform.map((l) => l.name), this._saved.platforms);
        if (!samePlatforms.length)
          continue;
      }
      if (this._saved.types.length) {
        if (this._saved.types.indexOf(docmapObj.type) === -1)
          continue;
      }
      if (this._saved.statuses.length) {
        if (this._saved.statuses.indexOf(docmapObj.status) === -1)
          continue;
      }
      this._displayItemsCount++;
      newItems.push(docmapObj);
    }
    this._filteredItems = newItems;
  }
  _search(e) {
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        search: e.target.value
      });
      this._filterItems();
      this._saveState();
    }, 300);
  }
  _togglePlatform(platform) {
    const idx = this._saved.platforms.indexOf(platform);
    if (idx !== -1) {
      this._saved.platforms.splice(idx, 1);
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        platforms: this._saved.platforms
      });
    } else {
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        platforms: [...this._saved.platforms, platform]
      });
    }
    this._filterItems();
    this._saveState();
  }
  _toggleType(type) {
    const idx = this._saved.types.indexOf(type);
    if (idx !== -1) {
      this._saved.types.splice(idx, 1);
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        types: this._saved.types
      });
    } else {
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        types: [...this._saved.types, type]
      });
    }
    this._filterItems();
    this._saveState();
  }
  _toggleStatus(status) {
    const idx = this._saved.statuses.indexOf(status);
    if (idx !== -1) {
      this._saved.statuses.splice(idx, 1);
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        statuses: this._saved.statuses
      });
    } else {
      this._saved = __spreadProps(__spreadValues({}, this._saved), {
        statuses: [...this._saved.statuses, status]
      });
    }
    this._filterItems();
    this._saveState();
  }
  _saveState() {
    (0, import_state.setState)({
      docList: this._saved
    });
  }
  async _restoreState() {
    const state = await (0, import_state.getState)();
    if (!state.docList)
      return;
    this._saved = state.docList;
  }
  render() {
    if (!this._renderExampleTimeout) {
      this._renderExample = false;
      this._renderExampleTimeout = setTimeout(() => {
        this._renderExample = true;
        this.requestUpdate();
        setTimeout(() => {
          this._renderExampleTimeout = null;
        });
      });
    }
    const tpl = import_lit.html`
            <div class="s-layout:12222">
                <nav class="__nav">
                    <form name="doc">
                        <fieldset
                            class="__nav-search s-mbe:30 s-pie:30 s-pbs:30"
                        >
                            <input
                                type="text"
                                class="s-input s-width:100"
                                name="search"
                                placeholder="Search doc"
                                value="${this._saved.search}"
                                @keyup="${this._search}"
                            />
                        </fieldset>

                        <fieldset class="__nav-platform s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Platform</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availablePlatforms.map((platform) => {
      var _a;
      return import_lit.html`
                                        <dt
                                            class="s-flex s-font:40 s-p:20 s-pie:30 s-bg:ui-background"
                                        >
                                            <label
                                                class="s-flex-item:grow"
                                                for="platform-${platform}"
                                            >
                                                ${platform}
                                            </label>
                                            <label for="platform-${platform}">
                                                <input
                                                    name="platform-${platform}"
                                                    class="s-switch s-color:accent"
                                                    type="checkbox"
                                                    id="platform-${platform}"
                                                    @change="${() => this._togglePlatform(platform)}"
                                                    ?checked="${((_a = this._saved.platforms) != null ? _a : []).indexOf(platform) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `;
    })}
                            </dl>
                        </fieldset>

                        <fieldset class="__nav-type s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Type</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableTypes.map((type) => {
      var _a;
      return import_lit.html`
                                        <dt
                                            class="s-flex s-font:40 s-p:20 s-pie:30 s-bg:ui-background"
                                        >
                                            <label
                                                class="s-flex-item:grow"
                                                for="type-${type}"
                                            >
                                                ${type}
                                            </label>
                                            <label for="type-${type}">
                                                <input
                                                    name="type-${type}"
                                                    class="s-switch s-color:accent"
                                                    type="checkbox"
                                                    id="type-${type}"
                                                    @change="${() => this._toggleType(type)}"
                                                    ?checked="${((_a = this._saved.types) != null ? _a : []).indexOf(type) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `;
    })}
                            </dl>
                        </fieldset>

                        <fieldset class="__nav-status s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Status</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableStatuses.map((status) => {
      var _a;
      return import_lit.html`
                                        <dt
                                            class="s-flex s-font:40 s-p:20 s-pie:30 s-bg:ui-background"
                                        >
                                            <label
                                                class="s-flex-item:grow"
                                                for="status-${status}"
                                            >
                                                ${status}
                                            </label>
                                            <label for="status-${status}">
                                                <input
                                                    name="status-${status}"
                                                    type="checkbox"
                                                    class="s-switch s-color:accent"
                                                    id="status-${status}"
                                                    @change="${() => this._toggleStatus(status)}"
                                                    ?checked="${((_a = this._saved.statuses) != null ? _a : []).indexOf(status) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `;
    })}
                            </dl>
                        </fieldset>
                    </form>
                </nav>
                <section class="__list">
                    ${Object.values(this._filteredItems).map((item) => import_lit.html`
                            <div class="__list-item">
                                <div class="s-p:50">
                                    <div class="">
                                        <div class="s-flex">
                                            <div class="s-flex-item:grow">
                                                <div>
                                                    ${item.platform.map((platform) => import_lit.html`
                                                            <i
                                                                class="s-platform:${platform.name} s-font:80 s-mbe:30 s-mr:10"
                                                            ></i>
                                                        `)}
                                                </div>
                                                <h4
                                                    class="s-font:title s-font:60 s-tc:accent s-mbe:10 s-flex-item:grow"
                                                >
                                                    <a
                                                        href="/doc/api/${this._striptags(item.namespace)}.${this._striptags(item.name)}"
                                                    >
                                                        ${item.name}
                                                    </a>
                                                </h4>
                                            </div>
                                            <div>
                                                <div class="s-font:40">
                                                    <span class="s-font:30"
                                                        >Since
                                                        <span
                                                            class="s-tc:complementary"
                                                            >${item.since}</span
                                                        ></span
                                                    >
                                                    &nbsp;
                                                    <span
                                                        class="s-badge:pill:${item.status}"
                                                        >${item.status}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <h5
                                            class="s-tc:complementary s-font:40 s-mbe:30"
                                        >
                                            ${item.namespace}
                                        </h5>
                                        <p class="s-typo:p s-mbe:30">
                                            ${item.description}
                                        </p>
                                    </div>
                                    ${item.example && item.example.length ? import_lit.html`
                                              <div class="__code">
                                                  ${this._renderExample ? import_lit.html`
                                                            <s-code-example
                                                                style="max-width:100%;"
                                                                class="s-depth:50 s-flex-item:grow:shrink"
                                                            >
                                                                <textarea
                                                                    lang="${item.example[0].language}"
                                                                >
                                                ${item.example[0].code}                    
                                            </textarea
                                                                >
                                                            </s-code-example>
                                                            <div
                                                                class="s-until:sibling:mounted"
                                                            >
                                                                <i
                                                                    class="s-loader:spinner s-color:accent"
                                                                ></i>
                                                                &nbsp;
                                                                <p
                                                                    class="s-typo:p s-display:inline-block"
                                                                >
                                                                    Loading code
                                                                    example.
                                                                    Please
                                                                    wait...
                                                                </p>
                                                            </div>
                                                        ` : ""}
                                              </div>
                                          ` : ""}
                                </div>
                            </div>
                        `)}
                </section>
            </div>
        `;
    return tpl;
  }
}
__decorateClass([
  (0, import_decorators.property)()
], DocNav.prototype, "_maxItemsToDisplay", 2);
__decorateClass([
  (0, import_decorators.property)()
], DocNav.prototype, "_filteredItems", 2);
__decorateClass([
  (0, import_decorators.property)()
], DocNav.prototype, "_docmap", 2);
__decorateClass([
  (0, import_decorators.property)()
], DocNav.prototype, "_saved", 2);
function define(props = {}, tagName = "doc-nav") {
  import_s_lit_component.default.setDefaultProps(__spreadProps(__spreadValues({}, props), {
    mountWhen: "directly"
  }));
  customElements.define(tagName, DocNav);
}
