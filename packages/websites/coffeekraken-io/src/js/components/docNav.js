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
import __SComponentUtils, { SLitElement } from '@coffeekraken/s-component-utils';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
import __miniSearch from 'minisearch';
import __sameItems from '@coffeekraken/sugar/shared/array/sameItems';
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
import { loadDocmap, setState, getState } from '../state/state';
export default class DocNav extends SLitElement {
    constructor() {
        super();
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
        this._displayItemsCount = 0;
        this._searchTimeout = 0;
        this._renderExample = false;
        console.log('Hello');
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
    _search(e) {
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            this._saved = Object.assign(Object.assign({}, this._saved), { search: e.target.value });
            // filter items
            this._filterItems();
            // save state
            this._saveState();
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
        this._saveState();
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
        this._saveState();
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
        this._saveState();
    }
    _saveState() {
        setState({
            docList: this._saved,
        });
    }
    _restoreState() {
        return __awaiter(this, void 0, void 0, function* () {
            // return;
            const state = yield getState();
            if (!state.docList)
                return;
            this._saved = state.docList;
        });
    }
    createRenderRoot() {
        return this;
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
            <div class="s-grid:12222">
                <nav class="__nav">
                    <form name="doc">
                        <fieldset class="__nav-search s-mb:30 s-pr:30 s-pt:30">
                            <input
                                type="text"
                                class="s-input s-width:100"
                                name="search"
                                placeholder="Search doc"
                                value="${this._saved.search}"
                                @keyup="${this._search}"
                            />
                        </fieldset>

                        <fieldset class="__nav-platform s-mb:30">
                            <legend class="s-typo:h6 s-mb:30">Platform</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availablePlatforms.map((platform) => {
            var _a;
            return html `
                                        <dt class="s-flex s-font:40 s-p:20 s-pr:30 s-bg:ui-background">
                                            <label class="s-flex-item:grow" for="platform-${platform}">
                                                ${platform}
                                            </label>
                                            <label for="platform-${platform}">
                                                <input
                                                    name="platform-${platform}"
                                                    class="s-switch s-ui:accent"
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

                        <fieldset class="__nav-type s-mb:30">
                            <legend class="s-typo:h6 s-mb:30">Type</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableTypes.map((type) => {
            var _a;
            return html `
                                        <dt class="s-flex s-font:40 s-p:20 s-pr:30 s-bg:ui-background">
                                            <label class="s-flex-item:grow" for="type-${type}"> ${type} </label>
                                            <label for="type-${type}">
                                                <input
                                                    name="type-${type}"
                                                    class="s-switch s-ui:accent"
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

                        <fieldset class="__nav-status s-mb:30">
                            <legend class="s-typo:h6 s-mb:30">Status</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableStatuses.map((status) => {
            var _a;
            return html `
                                        <dt class="s-flex s-font:40 s-p:20 s-pr:30 s-bg:ui-background">
                                            <label class="s-flex-item:grow" for="status-${status}"> ${status} </label>
                                            <label for="status-${status}">
                                                <input
                                                    name="status-${status}"
                                                    type="checkbox"
                                                    class="s-switch s-ui:accent"
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
                                                                class="s-platform:${platform.name} s-font:80 s-mb:30 s-mr:10"
                                                            ></i>
                                                        `)}
                                                </div>
                                                <h4
                                                    class="s-font:title s-font:60 s-color:accent s-mb:10 s-flex-item:grow"
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
                                                        <span class="s-color:complementary"
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
                                        <h5 class="s-color:complementary s-font:40 s-mb:30">
                                            ${item.namespace}
                                        </h5>
                                        <p class="s-typo:p s-mb:30">${item.description}</p>
                                    </div>
                                    ${item.example && item.example.length
            ? html `
                                              <div class="__code">
                                                  ${this._renderExample
                ? html `
                                                            <s-code-example
                                                                default-style
                                                                style="max-width:100%;"
                                                                class="s-depth:50 s-flex-item:grow:shrink"
                                                            >
                                                                <textarea lang="${item.example[0].language}">
                                                ${item.example[0].code}                    
                                            </textarea
                                                                >
                                                            </s-code-example>
                                                            <div class="s-until:sibling:mounted">
                                                                <i class="s-loader:spinner s-ui:accent"></i>
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
export function webcomponent(tagName = 'doc-nav') {
    __SComponentUtils.setDefaultProps({
        mountWhen: 'directly',
    });
    customElements.define(tagName, DocNav);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGlCQUFpQixFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDakYsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEtBQUssQ0FBQztBQUMzQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFN0MsT0FBTyxXQUFXLE1BQU0sMkNBQTJDLENBQUM7QUFDcEUsT0FBTyxxQkFBcUIsTUFBTSxvREFBb0QsQ0FBQztBQUN2RixPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sNENBQTRDLENBQUM7QUFFckUsT0FBTyxhQUFhLE1BQU0sK0NBQStDLENBQUM7QUFFMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsV0FBVztJQXNCM0M7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQXRCWixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFHYixXQUFNLEdBQUc7WUFDTCxNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixlQUFVLEdBQUcsV0FBVyxDQUFDO1FBaUV6Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUF3RHZCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBOEZuQixtQkFBYyxHQUFHLEtB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