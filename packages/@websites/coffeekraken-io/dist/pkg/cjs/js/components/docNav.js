"use strict";
// @ts-nocheck
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.define = void 0;
const s_lit_component_1 = __importDefault(require("@coffeekraken/s-lit-component"));
const onScrollEnd_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/onScrollEnd"));
const sameItems_1 = __importDefault(require("@coffeekraken/sugar/shared/array/sameItems"));
const striptags_1 = __importDefault(require("@coffeekraken/sugar/shared/html/striptags"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const queryStringToObject_1 = __importDefault(require("@coffeekraken/sugar/shared/url/queryStringToObject"));
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
const minisearch_1 = __importDefault(require("minisearch"));
const state_1 = require("../state/state");
class DocNav extends s_lit_component_1.default {
    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });
        this.maxItems = 10;
        this._maxItemsToDisplay = 10;
        this._filteredItems = {};
        this._docmap = {};
        this._saved = {
            search: '',
            platforms: [],
            types: [],
            statuses: [],
        };
        this._striptags = striptags_1.default;
        this._displayItemsCount = 0;
        this._searchTimeout = 0;
        this._renderExample = false;
        (() => __awaiter(this, void 0, void 0, function* () {
            const docmapJson = yield (0, state_1.loadDocmap)();
            this._docmap = docmapJson;
            // restore state
            this._restoreState();
            // query string
            const queryStringObj = (0, queryStringToObject_1.default)(document.location.search);
            if (queryStringObj.search) {
                this._saved.search = queryStringObj.search;
            }
            // filter items
            this._filterItems();
            // scroll end
            yield (0, wait_1.default)();
            (0, onScrollEnd_1.default)(document.body, () => {
                this._maxItemsToDisplay += this.maxItems;
                this._filterItems({
                    reset: false,
                });
            });
        }))();
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
        settings = Object.assign({ reset: true }, settings);
        if (settings.reset)
            this._maxItemsToDisplay = this.maxItems;
        this._displayItemsCount = 0;
        let items = Object.values(this._docmap.map).map((i) => {
            i.id = i.name;
            return i;
        });
        if (this._saved.search) {
            let miniSearch = new minisearch_1.default({
                fields: ['name', 'namespace', 'description', 'since', 'type', 'status'],
                storeFields: Object.keys(items[0]),
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
                const samePlatforms = (0, sameItems_1.default)(docmapObj.platform.map((l) => l.name), this._saved.platforms);
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
            this._saved = Object.assign(Object.assign({}, this._saved), { search: e.target.value });
            // filter items
            this._filterItems();
            // save state
            // this._saveState();
        }, 300);
    }
    _togglePlatform(platform) {
        const idx = this._saved.platforms.indexOf(platform);
        if (idx !== -1) {
            this._saved.platforms.splice(idx, 1);
            this._saved = Object.assign(Object.assign({}, this._saved), { platforms: this._saved.platforms });
        }
        else {
            this._saved = Object.assign(Object.assign({}, this._saved), { platforms: [...this._saved.platforms, platform] });
        }
        // filter items
        this._filterItems();
        // save state
        // this._saveState();
    }
    _toggleType(type) {
        const idx = this._saved.types.indexOf(type);
        if (idx !== -1) {
            this._saved.types.splice(idx, 1);
            this._saved = Object.assign(Object.assign({}, this._saved), { types: this._saved.types });
        }
        else {
            this._saved = Object.assign(Object.assign({}, this._saved), { types: [...this._saved.types, type] });
        }
        // filter items
        this._filterItems();
        // save state
        // this._saveState();
    }
    _toggleStatus(status) {
        const idx = this._saved.statuses.indexOf(status);
        if (idx !== -1) {
            this._saved.statuses.splice(idx, 1);
            this._saved = Object.assign(Object.assign({}, this._saved), { statuses: this._saved.statuses });
        }
        else {
            this._saved = Object.assign(Object.assign({}, this._saved), { statuses: [...this._saved.statuses, status] });
        }
        // filter items
        this._filterItems();
        // save state
        // this._saveState();
    }
    // _saveState() {
    //     setState({
    //         docList: this._saved,
    //     });
    // }
    _restoreState() {
        return __awaiter(this, void 0, void 0, function* () {
            // return;
            const state = yield (0, state_1.getState)();
            if (!state.docList)
                return;
            this._saved = state.docList;
        });
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
        const tpl = (0, lit_1.html) `
      <div class="s-layout:12222">
        <nav class="__nav">
          <form name="doc">
            <fieldset class="__nav-search s-mbe:30 s-pie:30 s-pbs:30">
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
            return (0, lit_1.html) `
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
                          ?checked="${((_a = this._saved.platforms) !== null && _a !== void 0 ? _a : []).indexOf(platform) !== -1}"
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
            return (0, lit_1.html) `
                    <dt
                      class="s-flex s-font:40 s-p:20 s-pie:30 s-bg:ui-background"
                    >
                      <label class="s-flex-item:grow" for="type-${type}">
                        ${type}
                      </label>
                      <label for="type-${type}">
                        <input
                          name="type-${type}"
                          class="s-switch s-color:accent"
                          type="checkbox"
                          id="type-${type}"
                          @change="${() => this._toggleType(type)}"
                          ?checked="${((_a = this._saved.types) !== null && _a !== void 0 ? _a : []).indexOf(type) !== -1}"
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
            return (0, lit_1.html) `
                    <dt
                      class="s-flex s-font:40 s-p:20 s-pie:30 s-bg:ui-background"
                    >
                      <label class="s-flex-item:grow" for="status-${status}">
                        ${status}
                      </label>
                      <label for="status-${status}">
                        <input
                          name="status-${status}"
                          type="checkbox"
                          class="s-switch s-color:accent"
                          id="status-${status}"
                          @change="${() => this._toggleStatus(status)}"
                          ?checked="${((_a = this._saved.statuses) !== null && _a !== void 0 ? _a : []).indexOf(status) !== -1}"
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
          ${Object.values(this._filteredItems).map((item) => (0, lit_1.html) `
              <div class="__list-item">
                <div class="s-p:50">
                  <div class="">
                    <div class="s-flex">
                      <div class="s-flex-item:grow">
                        <div>
                          ${item.platform.map((platform) => (0, lit_1.html) `
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
                            <span class="s-tc:complementary"
                              >${item.since}</span
                            ></span
                          >
                          &nbsp;
                          <span class="s-badge:pill:${item.status}"
                            >${item.status}</span
                          >
                        </div>
                      </div>
                    </div>
                    <h5 class="s-tc:complementary s-font:40 s-mbe:30">
                      ${item.namespace}
                    </h5>
                    <p class="s-typo:p s-mbe:30">${item.description}</p>
                  </div>
                  ${item.example && item.example.length
            ? (0, lit_1.html) `
                        <div class="__code">
                          ${this._renderExample
                ? (0, lit_1.html) `
                                <s-code-example
                                  style="max-width:100%;"
                                  class="s-depth:50 s-flex-item:grow:shrink"
                                  s-deps
                                  css="codeExample"
                                >
                                  <textarea
                                    lang="${item.example[0].language}"
                                  >
                                                ${item.example[0]
                    .code}                    
                                            </textarea
                                  >
                                </s-code-example>
                                <div class="s-until:sibling:mounted">
                                  <i
                                    class="s-loader:spinner s-color:accent"
                                  ></i>
                                  &nbsp;
                                  <p class="s-typo:p s-display:inline-block">
                                    Loading code example. Please wait...
                                  </p>
                                </div>
                              `
                : ''}
                        </div>
                      `
            : ''}
                </div>
              </div>
            `)}
        </section>
      </div>
    `;
        return tpl;
    }
}
__decorate([
    (0, decorators_js_1.property)()
], DocNav.prototype, "_maxItemsToDisplay", void 0);
__decorate([
    (0, decorators_js_1.property)()
], DocNav.prototype, "_filteredItems", void 0);
__decorate([
    (0, decorators_js_1.property)()
], DocNav.prototype, "_docmap", void 0);
__decorate([
    (0, decorators_js_1.property)()
], DocNav.prototype, "_saved", void 0);
exports.default = DocNav;
function define(props = {}, tagName = 'doc-nav') {
    s_lit_component_1.default.setDefaultProps(Object.assign(Object.assign({}, props), { mountWhen: 'directly' }));
    customElements.define(tagName, DocNav);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQsZ0dBQTBFO0FBQzFFLDJGQUFxRTtBQUNyRSwwRkFBb0U7QUFDcEUsZ0ZBQTBEO0FBQzFELDZHQUF1RjtBQUN2Riw2QkFBMkI7QUFDM0IscURBQTZDO0FBQzdDLDREQUFzQztBQUN0QywwQ0FBc0Q7QUFFdEQsTUFBcUIsTUFBTyxTQUFRLHlCQUFlO0lBc0JqRDtRQUNFLEtBQUssQ0FBQztZQUNKLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztRQTFCTCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFHYixXQUFNLEdBQUc7WUFDUCxNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFFRixlQUFVLEdBQUcsbUJBQVcsQ0FBQztRQXNFekIsdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBd0R2QixtQkFBYyxHQUFHLENBQUMsQ0FBQztRQTJGbkIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFoTnJCLENBQUMsR0FBUyxFQUFFO1lBQ1YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLGtCQUFVLEdBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUUxQixnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLGVBQWU7WUFDZixNQUFNLGNBQWMsR0FBRyxJQUFBLDZCQUFxQixFQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMs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