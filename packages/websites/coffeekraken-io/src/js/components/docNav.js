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
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
import __miniSearch from 'minisearch';
import __sameItems from '@coffeekraken/sugar/shared/array/sameItems';
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
import { loadDocmap, setState, getState } from '../state/state';
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

                        <fieldset class="__nav-status s-mbe:30">
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
                                              <div class="__code">
                                                  ${this._renderExample
                ? html `
                                                            <s-code-example
                                                                style="max-width:100%;"
                                                                class="s-depth:50 s-flex-item:grow:shrink"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZCxPQUFPLGVBQWUsTUFBTSwrQkFBK0IsQ0FBQztBQUM1RCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUU3QyxPQUFPLFdBQVcsTUFBTSwyQ0FBMkMsQ0FBQztBQUNwRSxPQUFPLHFCQUFxQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3ZGLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLFdBQVcsTUFBTSw0Q0FBNEMsQ0FBQztBQUVyRSxPQUFPLGFBQWEsTUFBTSwrQ0FBK0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxPQUFPLE1BQU8sU0FBUSxlQUFlO0lBc0IvQztRQUNJLEtBQUssQ0FBQztZQUNGLFlBQVksRUFBRTtnQkFDVixTQUFTLEVBQUUsS0FBSzthQUNuQjtTQUNKLENBQUMsQ0FBQztRQTFCUCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFHYixXQUFNLEdBQUc7WUFDTCxNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixlQUFVLEdBQUcsV0FBVyxDQUFDO1FBd0V6Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUFnRXZCLG1CQUFjLEdBQUcs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