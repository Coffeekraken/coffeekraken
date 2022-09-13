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
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __sameItems } from '@coffeekraken/sugar/array';
import { __onScrollEnd } from '@coffeekraken/sugar/dom';
import { __stripTags } from '@coffeekraken/sugar/html';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __miniSearch from 'minisearch';
import { getState, loadDocmap } from '../state/state';
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
            search: '',
            platforms: [],
            types: [],
            statuses: [],
        };
        this._striptags = __stripTags;
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
            {
                __onScrollEnd;
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
        let miniSearch = new __miniSearch({
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
    const state = await getState();
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
export function define(props = {}, tagName = 'doc-nav') {
    __SLitComponent.setDefaultProps(Object.assign(Object.assign({}, props), { mountWhen: 'directly' }));
    customElements.define(tagName, DocNav);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLHFCQUFxQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdDLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE1BQU0sQ0FBQyxPQUFPLE9BQU8sTUFBTyxTQUFRLGVBQWU7SUFzQmpEO1FBQ0UsS0FBSyxDQUFDO1lBQ0osWUFBWSxFQUFFO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBMUJMLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFHZCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFHeEIsbUJBQWMsR0FBRyxFQUFFLENBQUM7UUFHcEIsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUdiLFdBQU0sR0FBRztZQUNQLE1BQU0sRUFBRSxFQUFFO1lBQ1YsU0FBUyxFQUFFLEVBQUU7WUFDYixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUVGLGVBQVUsR0FBRyxXQUFXLENBQUM7UUFTdkIsQ0FBQyxHQUFTLEVBQUU7WUFDVixN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