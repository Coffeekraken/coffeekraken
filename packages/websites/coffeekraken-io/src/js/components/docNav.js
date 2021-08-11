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
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { html, LitElement, property } from 'lit-element';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
import __miniSearch from 'minisearch';
import __sameItems from '@coffeekraken/sugar/shared/array/sameItems';
import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
import { loadDocmap, setState, getState } from '../state/state';
export default class DocNav extends LitElement {
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
            statuses: []
        };
        this._striptags = __striptags;
        this._displayItemsCount = 0;
        this._searchTimeout = 0;
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
                    reset: false
                });
            });
        }))();
    }
    get availablePlatforms() {
        if (!this._docmap.map)
            return [];
        const availablePlatforms = [];
        Object.keys(this._docmap.map).forEach(namespace => {
            const docmapObj = this._docmap.map[namespace];
            if (!docmapObj.platform)
                return;
            docmapObj.platform.forEach(platform => {
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
        Object.keys(this._docmap.map).forEach(namespace => {
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
        Object.keys(this._docmap.map).forEach(namespace => {
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
        let items = Object.values(this._docmap.map).map(i => {
            i.id = i.name;
            return i;
        });
        if (this._saved.search) {
            let miniSearch = new __miniSearch({
                fields: ['name', 'namespace', 'description', 'since', 'type', 'status'],
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
                const samePlatforms = __sameItems(docmapObj.platform.map(l => l.name), this._saved.platforms);
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
            docList: this._saved
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
        const tpl = html `
            <div class="s-grid:12222">
                <nav class="__nav">
                
                    <form name="doc">

                        <fieldset class="__nav-search s-mb:30 s-pr:20 s-pt:20">
                            <input type="text" class="s-input s-width:100" name="search" placeholder="Search doc" value="${this._saved.search}" @keyup="${this._search}" />
                        </fieldset>

                        <fieldset class="__nav-platform s-mb:30">
                            <legend class="s-typo:h6 s-mb:10">
                                Platform
                            </legend>
                            <dl class="s-list s-bg:even">  
                                ${this.availablePlatforms.map(platform => {
            var _a;
            return html `
                                    <dt class="s-flex s-font:40 s-p:10 s-bg:ui-surface">
                                        <label class="s-flex-item:grow" for="platform-${platform}">
                                            ${platform}
                                        </label>
                                        <label class="s-switch:accent" for="platform-${platform}">
                                            <input name="platform-${platform}" type="checkbox" id="platform-${platform}" @change="${() => this._togglePlatform(platform)}" ?checked="${((_a = this._saved.platforms) !== null && _a !== void 0 ? _a : []).indexOf(platform) !== -1}">
                                            <div class="s-switch-handler"></div>
                                        </label>
                                    </dt>
                                `;
        })}
                            </dl>
                        </fieldset>

                        <fieldset class="__nav-type s-mb:30">
                            <legend class="s-typo:h6 s-mb:10">
                                Type
                            </legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableTypes.map(type => {
            var _a;
            return html `
                                    <dt class="s-flex s-font:40 s-p:10 s-bg:ui-surface">
                                        <label class="s-flex-item:grow" for="type-${type}">
                                            ${type}
                                        </label>
                                        <label class="s-switch:accent" for="type-${type}">
                                            <input name="type-${type}" type="checkbox" id="type-${type}" @change="${() => this._toggleType(type)}" ?checked="${((_a = this._saved.types) !== null && _a !== void 0 ? _a : []).indexOf(type) !== -1}">
                                            <div class="s-switch-handler"></div>
                                        </label>
                                    </dt>
                                `;
        })}
                            </dl>
                        </fieldset>

                        <fieldset class="__nav-status s-mb:30">
                            <legend class="s-typo:h6 s-mb:10">
                                Status
                            </legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableStatuses.map(status => {
            var _a;
            return html `
                                    <dt class="s-flex s-font:40 s-p:10 s-bg:ui-surface">
                                        <label class="s-flex-item:grow" for="status-${status}">
                                            ${status}
                                        </label>
                                        <label class="s-switch:accent" for="status-${status}">
                                            <input name="status-${status}" type="checkbox" id="status-${status}" @change="${() => this._toggleStatus(status)}" ?checked="${((_a = this._saved.statuses) !== null && _a !== void 0 ? _a : []).indexOf(status) !== -1}">
                                            <div class="s-switch-handler"></div>
                                        </label>
                                    </dt>
                                `;
        })}
                            </dl>
                        </fieldset>

                    </form>
                    

                </nav>
                <section class="__list">
                    ${Object.values(this._filteredItems).map(item => html `
                        <div class="__list-item">
                            <div class="s-p:50">
                                <div class="">
                                    <div class="s-flex">
                                        <div class="s-flex-item:grow">
                                            <div>
                                                ${item.platform.map(platform => html `
                                                    <i class="s-platform:${platform.name} s-font:80 s-mb:30 s-mr:10"></i>
                                                `)}
                                            </div>
                                            <h4 class="s-font:title s-font:60 s-color:accent s-mb:10 s-flex-item:grow">
                                                <a href="/doc/api/${this._striptags(item.namespace)}.${this._striptags(item.name)}">
                                                    ${item.name}
                                                </a>
                                            </h4>
                                        </div>
                                        <div>
                                            <div class="s-font:40">
                                                <span class="s-font:30">Since <span class="s-color:complementary">${item.since}</span></span>
                                                &nbsp;
                                                <span class="s-badge:pill:${item.status}">${item.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h5 class="s-color:complementary s-font:40 s-mb:30">${item.namespace}</h5>
                                    <p class="s-typo:p s-mb:30">${item.description}</p>
                                </div>
                                ${item.example && item.example.length ? html `
                                    <div class="__code">
                                        <s-code-example default-style style="max-width:100%;" class="s-depth:50 s-flex-item:grow:shrink">
                                            <textarea lang="${item.example[0].language}">
                                                ${item.example[0].code}                    
                                            </textarea>
                                        </s-code-example>
                                    </div>
                                ` : ''}
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
    customElements.define(tagName, DocNav);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jTmF2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sRUFBTyxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBd0MsTUFBTSxhQUFhLENBQUM7QUFFcEcsT0FBTyxXQUFXLE1BQU0sMkNBQTJDLENBQUM7QUFDcEUsT0FBTyxxQkFBcUIsTUFBTSxvREFBb0QsQ0FBQztBQUN2RixPQUFPLFlBQVksTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxXQUFXLE1BQU0sNENBQTRDLENBQUM7QUFFckUsT0FBTyxhQUFhLE1BQU0sK0NBQStDLENBQUM7QUFFMUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsVUFBVTtJQXVCMUM7UUFDSSxLQUFLLEVBQUUsQ0FBQztRQXRCWixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBR3hCLG1CQUFjLEdBQUcsRUFBRSxDQUFDO1FBR3BCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFHYixXQUFNLEdBQUc7WUFDTCxNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFFRixlQUFVLEdBQUcsV0FBVyxDQUFDO1FBbUV6Qix1QkFBa0IsR0FBRyxDQUFDLENBQUM7UUF5RHZCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBdkhmLENBQUMsR0FBUyxFQUFFO1lBR1IsTUFBTSxVQUFVLEdBQUcsTUFBTSxVQUFVLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztZQUUxQixnQkFB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