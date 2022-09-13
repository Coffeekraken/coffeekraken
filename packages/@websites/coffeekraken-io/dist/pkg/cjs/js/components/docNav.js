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
const array_1 = require("@coffeekraken/sugar/array");
const dom_1 = require("@coffeekraken/sugar/dom");
const html_1 = require("@coffeekraken/sugar/html");
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
        this._striptags = html_1.__stripTags;
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
            {
                dom_1.__onScrollEnd;
            }
            (document.);
            '@coffeekraken/sugar/dom';
            this._maxItemsToDisplay += this.maxItems;
            this._filterItems({
                reset: false,
            });
        }));
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
();
get;
availablePlatforms();
{
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
get;
availableTypes();
{
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
get;
availableStatuses();
{
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
_displayItemsCount = 0;
_filterItems(settings = {});
{
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
            const samePlatforms = (0, array_1.__sameItems)(docmapObj.platform.map((l) => l.name), this._saved.platforms);
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
_searchTimeout = 0;
_search(e);
{
    clearTimeout(this._searchTimeout);
    this._searchTimeout = setTimeout(() => {
        this._saved = Object.assign(Object.assign({}, this._saved), { search: e.target.value });
        // filter items
        this._filterItems();
        // save state
        // this._saveState();
    }, 300);
}
_togglePlatform(platform);
{
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
_toggleType(type);
{
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
_toggleStatus(status);
{
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
async;
_restoreState();
{
    // return;
    const state = await (0, state_1.getState)();
    if (!state.docList)
        return;
    this._saved = state.docList;
}
_renderExampleTimeout;
_renderExample = false;
render();
{
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
function define(props = {}, tagName = 'doc-nav') {
    s_lit_component_1.default.setDefaultProps(Object.assign(Object.assign({}, props), { mountWhen: 'directly' }));
    customElements.define(tagName, DocNav);
}
exports.define = define;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxvRkFBNEQ7QUFDNUQscURBQXdEO0FBQ3hELGlEQUF3RDtBQUN4RCxtREFBdUQ7QUFDdkQsZ0ZBQTBEO0FBQzFELDZHQUF1RjtBQUN2Riw2QkFBMkI7QUFDM0IscURBQTZDO0FBQzdDLDREQUFzQztBQUN0QywwQ0FBc0Q7QUFFdEQsTUFBcUIsTUFBTyxTQUFRLHlCQUFlO0lBc0JqRDtRQUNFLEtBQUssQ0FBQztZQUNKLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztRQTFCTCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFHYixXQUFNLEdBQUc7WUFDUCxNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFFRixlQUFVLEdBQUcsa0JBQVcsQ0FBQztRQVN2QixDQUFDLEdBQVMsRUFBRTtZQUNWLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSxrQkFBVSxHQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFFMUIsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVyQixlQUFlO1lBQ2YsTUFBTSxjQUFjLEdBQUcsSUFBQSw2QkFBcUIsRUFBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZFLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRTtnQkFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQzthQUM1QztZQUVELGVBQWU7WUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsYUFBYTtZQUNiLE1BQU0sSUFBQSxjQUFNLEdBQUUsQ0FBQztZQUNmO2dCQUFFLG1CQUFhLENBQUE7YUFBRTtZQUFBLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQTtZQUFBLHlCQUF5QixDQUFDO1lBQ25ELElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ2hCLEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQztBQWpESjtJQURDLElBQUEsd0JBQVEsR0FBRTtrREFDYTtBQUd4QjtJQURDLElBQUEsd0JBQVEsR0FBRTs4Q0FDUztBQUdwQjtJQURDLElBQUEsd0JBQVEsR0FBRTt1Q0FDRTtBQUdiO0lBREMsSUFBQSx3QkFBUSxHQUFFO3NDQU1UO0FBbEJKLHlCQXFETTtBQUFBLENBQUMsQ0FBQyxDQUFDO0FBRVAsR0FBRyxDQUFBO0FBQUMsa0JBQWtCLEVBQUUsQ0FBQTtBQUFDO0lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNqQyxNQUFNLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUNoQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3RDLElBQUksa0JBQWtCLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xELGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sa0JBQWtCLENBQUM7Q0FDM0I7QUFDRCxHQUFHLENBQUE7QUFBQyxjQUFjLEVBQUUsQ0FBQTtBQUFDO0lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUNqQyxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtZQUFFLE9BQU87UUFDNUIsSUFBSSxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLGNBQWMsQ0FBQztDQUN2QjtBQUNELEdBQUcsQ0FBQTtBQUFDLGlCQUFpQixFQUFFLENBQUE7QUFBQztJQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHO1FBQUUsT0FBTyxFQUFFLENBQUM7SUFDakMsTUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNsRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBQzlCLElBQUksZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxlQUFlLENBQUM7Q0FDeEI7QUFDRCxrQkFBa0IsR0FBRyxDQUFDLENBQUM7QUFDdkIsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUFDO0lBQzFCLFFBQVEsbUJBQ04sS0FBSyxFQUFFLElBQUksSUFDUixRQUFRLENBQ1osQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLEtBQUs7UUFBRSxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUU1RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBRTVCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNwRCxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDZCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUN0QixJQUFJLFVBQVUsR0FBRyxJQUFJLG9CQUFZLENBQUM7WUFDaEMsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7WUFDdkUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUMvQztJQUVELElBQUksUUFBUSxHQUFVLEVBQUUsQ0FBQztJQUV6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLGtCQUFrQjtZQUFFLE1BQU07UUFFOUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO2dCQUFFLFNBQVM7WUFDbEMsTUFBTSxhQUFhLEdBQUcsSUFBQSxtQkFBVyxFQUMvQixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDdEIsQ0FBQztZQUNGLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtnQkFBRSxTQUFTO1NBQ3JDO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDNUIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxTQUFTO1NBQ2hFO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxTQUFTO1NBQ3JFO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUMxQjtJQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDO0NBQ2hDO0FBQ0QsY0FBYyxHQUFHLENBQUMsQ0FBQztBQUNuQixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFBQztJQUNULFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxNQUFNLG1DQUNOLElBQUksQ0FBQyxNQUFNLEtBQ2QsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUN2QixDQUFDO1FBRUYsZUFBZTtRQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixhQUFhO1FBQ2IscUJBQXFCO0lBQ3ZCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztDQUNUO0FBQ0QsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQUM7SUFDeEIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BELElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsTUFBTSxtQ0FDTixJQUFJLENBQUMsTUFBTSxLQUNkLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FDakMsQ0FBQztLQUNIO1NBQU07UUFDTCxJQUFJLENBQUMsTUFBTSxtQ0FDTixJQUFJLENBQUMsTUFBTSxLQUNkLFNBQVMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLEdBQ2hELENBQUM7S0FDSDtJQUVELGVBQWU7SUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFcEIsYUFBYTtJQUNiLHFCQUFxQjtDQUN0QjtBQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUFDO0lBQ2hCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sbUNBQ04sSUFBSSxDQUFDLE1BQU0sS0FDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQ3pCLENBQUM7S0FDSDtTQUFNO1FBQ0wsSUFBSSxDQUFDLE1BQU0sbUNBQ04sSUFBSSxDQUFDLE1BQU0sS0FDZCxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUNwQyxDQUFDO0tBQ0g7SUFFRCxlQUFlO0lBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRXBCLGFBQWE7SUFDYixxQkFBcUI7Q0FDdEI7QUFDRCxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7QUFBQztJQUNwQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLG1DQUNOLElBQUksQ0FBQyxNQUFNLEtBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUMvQixDQUFDO0tBQ0g7U0FBTTtRQUNMLElBQUksQ0FBQyxNQUFNLG1DQUNOLElBQUksQ0FBQyxNQUFNLEtBQ2QsUUFBUSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsR0FDNUMsQ0FBQztLQUNIO0lBRUQsZUFBZTtJQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUVwQixhQUFhO0lBQ2IscUJBQXFCO0NBQ3RCO0FBQ0QsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixnQ0FBZ0M7QUFDaEMsVUFBVTtBQUNWLElBQUk7QUFDSixLQUFLLENBQUE7QUFBQyxhQUFhLEVBQUUsQ0FBQTtBQUFDO0lBQ3BCLFVBQVU7SUFDVixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUEsZ0JBQVEsR0FBRSxDQUFDO0lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTztRQUFFLE9BQU87SUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO0NBQzdCO0FBQ0QscUJBQXFCLENBQUM7QUFDdEIsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUN2QixNQUFNLEVBQUUsQ0FBQTtBQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtRQUMvQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMscUJBQXFCLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUMzQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELE1BQU0sR0FBRyxHQUFHLElBQUEsVUFBSSxFQUFBOzs7Ozs7Ozs7O3lCQVVLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTswQkFDakIsSUFBSSxDQUFDLE9BQU87Ozs7Ozs7a0JBT3BCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQzNCLENBQUMsUUFBUSxFQUFFLEVBQUU7O1FBQUMsT0FBQSxJQUFBLFVBQUksRUFBQTs7Ozs7O3dDQU1JLFFBQVE7OzBCQUV0QixRQUFROzs2Q0FFVyxRQUFROzsyQ0FFVixRQUFROzs7eUNBR1YsUUFBUTtxQ0FDWixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQztzQ0FDbkMsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQy9DLFFBQVEsQ0FDVCxLQUFLLENBQUMsQ0FBQzs7OzttQkFJZixDQUFBO0tBQUEsQ0FDRjs7Ozs7OztrQkFPQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FDdkIsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7UUFBQyxPQUFBLElBQUEsVUFBSSxFQUFBOzs7O2tFQUlrQyxJQUFJOzBCQUM1QyxJQUFJOzt5Q0FFVyxJQUFJOzt1Q0FFTixJQUFJOzs7cUNBR04sSUFBSTtxQ0FDSixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztzQ0FDM0IsQ0FBQyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQzNDLElBQUksQ0FDTCxLQUFLLENBQUMsQ0FBQzs7OzttQkFJZixDQUFBO0tBQUEsQ0FDRjs7Ozs7OztrQkFPQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUMxQixDQUFDLE1BQU0sRUFBRSxFQUFFOztRQUFDLE9BQUEsSUFBQSxVQUFJLEVBQUE7Ozs7b0VBSWtDLE1BQU07MEJBQ2hELE1BQU07OzJDQUVXLE1BQU07O3lDQUVSLE1BQU07Ozt1Q0FHUixNQUFNO3FDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO3NDQUMvQixDQUFDLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FDOUMsTUFBTSxDQUNQLEtBQUssQ0FBQyxDQUFDOzs7O21CQUlmLENBQUE7S0FBQSxDQUNGOzs7Ozs7WUFNTCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQ3RDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs0QkFPUSxJQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FDeEIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUEsVUFBSSxFQUFBOztvREFFTSxRQUFRLENBQUMsSUFBSTs7NkJBRXBDLENBQ0Y7Ozs7Ozs2Q0FNa0IsSUFBSSxDQUFDLFVBQVUsQ0FDeEIsSUFBSyxDQUFDLFNBQVMsQ0FDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFPLElBQUssQ0FBQyxJQUFJLENBQUM7OzhCQUU5QixJQUFLLENBQUMsSUFBSTs7Ozs7Ozs7O2lDQVNQLElBQUssQ0FBQyxLQUFLOzs7O3NEQUlVLElBQUssQ0FBQyxNQUFNOytCQUNuQyxJQUFLLENBQUMsTUFBTTs7Ozs7O3dCQU1uQixJQUFLLENBQUMsU0FBUzs7bURBRVksSUFBSyxDQUFDLFdBQVc7O29CQUVoRCxJQUFLLENBQUMsT0FBTyxJQUFVLElBQUssQ0FBQyxPQUFPLENBQUMsTUFBTTtRQUNqRCxDQUFDLENBQUMsSUFBQSxVQUFJLEVBQUE7OzRCQUVFLElBQUksQ0FBQyxjQUFjO1lBQ25CLENBQUMsQ0FBQyxJQUFBLFVBQUksRUFBQTs7Ozs7Ozs7NENBUWdCLElBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTs7a0RBRW5CLElBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNqQyxJQUFJOzs7Ozs7Ozs7Ozs7OytCQWFaO1lBQ0gsQ0FBQyxDQUFDLEVBQUU7O3VCQUVUO1FBQ0gsQ0FBQyxDQUFDLEVBQUU7OzthQUdYLENBQ0Y7OztLQUdOLENBQUM7SUFDRixPQUFPLEdBQUcsQ0FBQztDQUNaO0FBR0gsU0FBZ0IsTUFBTSxDQUFDLFFBQWEsRUFBRSxFQUFFLE9BQU8sR0FBRyxTQUFTO0lBQ3pELHlCQUFlLENBQUMsZUFBZSxpQ0FDMUIsS0FBSyxLQUNSLFNBQVMsRUFBRSxVQUFVLElBQ3JCLENBQUM7SUFDSCxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBTkQsd0JBTUMifQ==