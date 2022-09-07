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
import { __onScrollEnd } from '@coffeekraken/sugar/dom';
import __sameItems from '@coffeekraken/sugar/shared/array/sameItems';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
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
        this._striptags = __striptags;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDeEQsT0FBTyxXQUFXLE1BQU0sNENBQTRDLENBQUM7QUFDckUsT0FBTyxXQUFXLE1BQU0sMkNBQTJDLENBQUM7QUFDcEUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxxQkFBcUIsTUFBTSxvREFBb0QsQ0FBQztBQUN2RixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBc0JqRDtRQUNFLEtBQUssQ0FBQztZQUNKLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUUsS0FBSzthQUNqQjtTQUNGLENBQUMsQ0FBQztRQTFCTCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFHYixXQUFNLEdBQUc7WUFDUCxNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFFRixlQUFVLEdBQUcsV0FBVyxDQUFDO1FBU3ZCLENBQUMsR0FBUyxFQUFFO1lBQ1YsTUFBTSxVQUFVLEdBQUcsTUFBTSxV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