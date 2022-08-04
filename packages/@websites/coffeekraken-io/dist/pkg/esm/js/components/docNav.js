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
import __SLitComponent from "@coffeekraken/s-lit-component";
import __onScrollEnd from "@coffeekraken/sugar/js/dom/detect/onScrollEnd";
import __sameItems from "@coffeekraken/sugar/shared/array/sameItems";
import __striptags from "@coffeekraken/sugar/shared/html/striptags";
import __wait from "@coffeekraken/sugar/shared/time/wait";
import __queryStringToObject from "@coffeekraken/sugar/shared/url/queryStringToObject";
import { html } from "lit";
import { property } from "lit/decorators.js";
import __miniSearch from "minisearch";
import { getState, loadDocmap } from "../state/state";
export default class DocNav extends __SLitComponent {
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
            search: "",
            platforms: [],
            types: [],
            statuses: [],
        };
        this._striptags = __striptags;
        this._displayItemsCount = 0;
        this._searchTimeout = 0;
        this._renderExample = false;
        (() => __awaiter(this, void 0, void 0, function* () {
            const docmapJson = yield loadDocmap();
            this._docmap = docmapJson;
            // restore state
            this._restoreState();
            // query string
            const queryStringObj = __queryStringToObject(document.location.search);
            if (queryStringObj.search) {
                this._saved.search = queryStringObj.search;
            }
            // filter items
            this._filterItems();
            // scroll end
            yield __wait();
            __onScrollEnd(document.body, () => {
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
            let miniSearch = new __miniSearch({
                fields: ["name", "namespace", "description", "since", "type", "status"],
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
                const samePlatforms = __sameItems(docmapObj.platform.map((l) => l.name), this._saved.platforms);
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
            const state = yield getState();
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
        const tpl = html `
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
            return html `
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
            return html `
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
            return html `
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
          ${Object.values(this._filteredItems).map((item) => html `
              <div class="__list-item">
                <div class="s-p:50">
                  <div class="">
                    <div class="s-flex">
                      <div class="s-flex-item:grow">
                        <div>
                          ${item.platform.map((platform) => html `
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
            ? html `
                        <div class="__code">
                          ${this._renderExample
                ? html `
                                <s-code-example
                                  style="max-width:100%;"
                                  class="s-depth:50 s-flex-item:grow:shrink"
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
                : ""}
                        </div>
                      `
            : ""}
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
    property()
], DocNav.prototype, "_maxItemsToDisplay", void 0);
__decorate([
    property()
], DocNav.prototype, "_filteredItems", void 0);
__decorate([
    property()
], DocNav.prototype, "_docmap", void 0);
__decorate([
    property()
], DocNav.prototype, "_saved", void 0);
export function define(props = {}, tagName = "doc-nav") {
    __SLitComponent.setDefaultProps(Object.assign(Object.assign({}, props), { mountWhen: "directly" }));
    customElements.define(tagName, DocNav);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUMxRSxPQUFPLFdBQVcsTUFBTSw0Q0FBNEMsQ0FBQztBQUNyRSxPQUFPLFdBQVcsTUFBTSwyQ0FBMkMsQ0FBQztBQUNwRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLHFCQUFxQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFzQmpEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osWUFBWSxFQUFFO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBMUJMLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFHZCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFHeEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFHcEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUdiLFdBQU0sR0FBRztZQUNQLE1BQU0sRUFBRSxFQUFFO1lBQ1YsU0FBUyxFQUFFLEVBQUU7WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUVGLGVBQVUsR0FBRyxXQUFXLENBQUM7UUFzRXpCLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQXdEdkIsbUJBQWMsR0FBRyxDQUFDLENBQUM7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