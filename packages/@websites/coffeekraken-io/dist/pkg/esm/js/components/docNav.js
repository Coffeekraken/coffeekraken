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
import { __wait } from '@coffeekraken/sugar/datetime';
import { __onScrollEnd } from '@coffeekraken/sugar/dom';
import { __stripTags } from '@coffeekraken/sugar/html';
import { __queryStringToObject } from '@coffeekraken/sugar/url';
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
            __onScrollEnd(() => {
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
                fields: [
                    'name',
                    'namespace',
                    'description',
                    'since',
                    'type',
                    'status',
                ],
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
                <nav class="_nav">
                    <form name="doc">
                        <fieldset
                            class="_nav-search s-mbe:30 s-pie:30 s-pbs:30"
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

                        <fieldset class="_nav-platform s-mbe:30">
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

                        <fieldset class="_nav-type s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Type</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableTypes.map((type) => {
            var _a;
            return html `
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
                                                    ?checked="${((_a = this._saved.types) !== null && _a !== void 0 ? _a : []).indexOf(type) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `;
        })}
                            </dl>
                        </fieldset>

                        <fieldset class="_nav-status s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Status</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableStatuses.map((status) => {
            var _a;
            return html `
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
                <section class="_list">
                    ${Object.values(this._filteredItems).map((item) => html `
                            <div class="_list-item">
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
                                                        href="/doc/api/${this._striptags(item
            .namespace)}.${this._striptags(item.name)}"
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
                                                            >${item
            .since}</span
                                                        ></span
                                                    >
                                                    &nbsp;
                                                    <span
                                                        class="s-badge:pill:${item.status}"
                                                        >${item
            .status}</span
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
                                    ${item.example &&
            item.example.length
            ? html `
                                              <div class="_code">
                                                  ${this._renderExample
                ? html `
                                                            <s-code-example
                                                                style="max-width:100%;"
                                                                class="s-depth:50 s-flex-item:grow:shrink"
                                                                s-deps
                                                                css="codeExample"
                                                            >
                                                                <textarea
                                                                    lang="${item
                    .example[0]
                    .language}"
                                                                >
                                                ${item.example[0]
                    .code}                    
                                            </textarea
                                                                >
                                                            </s-code-example>
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
export function define(props = {}, tagName = 'doc-nav') {
    __SLitComponent.setDefaultProps(Object.assign(Object.assign({}, props), { mountWhen: 'directly' }));
    customElements.define(tagName, DocNav);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDeEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDaEUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEQsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsZUFBZTtJQXNCL0M7UUFDSSxLQUFLLENBQUM7WUFDRixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLEtBQUs7YUFDbkI7U0FDSixDQUFDLENBQUM7UUExQlAsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUdkLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUd4QixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdwQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBR2IsV0FBTSxHQUFHO1lBQ0wsTUFBTSxFQUFFLEVBQUU7WUFDVixTQUFTLEVBQUUsRUFBRTtZQUNiLEtBQUssRUFBRSxFQUFFO1lBQ1QsUUFBUSxFQUFFLEVBQUU7U0FDZixDQUFDO1FBRUYsZUFBVSxHQUFHLFdBQVcsQ0FBQztRQXdFekIs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