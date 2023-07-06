// @ts-nocheck

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
    maxItems = 10;

    @property()
    _maxItemsToDisplay = 10;

    @property()
    _filteredItems = {};

    @property()
    _docmap = {};

    @property()
    _saved = {
        search: '',
        platforms: [],
        types: [],
        statuses: [],
    };

    _striptags = __stripTags;

    constructor() {
        super({
            litComponent: {
                shadowDom: false,
            },
        });

        (async () => {
            const docmapJson = await loadDocmap();
            this._docmap = docmapJson;

            // restore state
            this._restoreState();

            // query string
            const queryStringObj = __queryStringToObject(
                document.location.search,
            );
            if (queryStringObj.search) {
                this._saved.search = queryStringObj.search;
            }

            // filter items
            this._filterItems();

            // scroll end
            await __wait();
            __onScrollEnd(() => {
                this._maxItemsToDisplay += this.maxItems;
                this._filterItems({
                    reset: false,
                });
            });
        })();
    }
    get availablePlatforms() {
        if (!this._docmap.map) return [];
        const availablePlatforms = [];
        Object.keys(this._docmap.map).forEach((namespace) => {
            const docmapObj = this._docmap.map[namespace];
            if (!docmapObj.platform) return;
            docmapObj.platform.forEach((platform) => {
                if (availablePlatforms.indexOf(platform.name) === -1)
                    availablePlatforms.push(platform.name);
            });
        });
        return availablePlatforms;
    }
    get availableTypes() {
        if (!this._docmap.map) return [];
        const availableTypes = [];
        Object.keys(this._docmap.map).forEach((namespace) => {
            const docmapObj = this._docmap.map[namespace];
            if (!docmapObj.type) return;
            if (availableTypes.indexOf(docmapObj.type) === -1)
                availableTypes.push(docmapObj.type);
        });
        return availableTypes;
    }
    get availableStatuses() {
        if (!this._docmap.map) return [];
        const availableStatus = [];
        Object.keys(this._docmap.map).forEach((namespace) => {
            const docmapObj = this._docmap.map[namespace];
            if (!docmapObj.status) return;
            if (availableStatus.indexOf(docmapObj.status) === -1)
                availableStatus.push(docmapObj.status);
        });
        return availableStatus;
    }
    _displayItemsCount = 0;
    _filterItems(settings = {}) {
        settings = {
            reset: true,
            ...settings,
        };

        if (settings.reset) this._maxItemsToDisplay = this.maxItems;

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

        let newItems: any[] = [];

        for (let i = 0; i < items.length; i++) {
            const docmapObj = items[i];

            if (this._displayItemsCount >= this._maxItemsToDisplay) break;

            if (this._saved.platforms.length) {
                if (!docmapObj.platform) continue;
                const samePlatforms = __sameItems(
                    docmapObj.platform.map((l) => l.name),
                    this._saved.platforms,
                );
                if (!samePlatforms.length) continue;
            }

            if (this._saved.types.length) {
                if (this._saved.types.indexOf(docmapObj.type) === -1) continue;
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
    _search(e) {
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(() => {
            this._saved = {
                ...this._saved,
                search: e.target.value,
            };

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
            this._saved = {
                ...this._saved,
                platforms: this._saved.platforms,
            };
        } else {
            this._saved = {
                ...this._saved,
                platforms: [...this._saved.platforms, platform],
            };
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
            this._saved = {
                ...this._saved,
                types: this._saved.types,
            };
        } else {
            this._saved = {
                ...this._saved,
                types: [...this._saved.types, type],
            };
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
            this._saved = {
                ...this._saved,
                statuses: this._saved.statuses,
            };
        } else {
            this._saved = {
                ...this._saved,
                statuses: [...this._saved.statuses, status],
            };
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
    async _restoreState() {
        // return;
        const state = await getState();
        if (!state.docList) return;
        this._saved = state.docList;
    }
    _renderExampleTimeout;
    _renderExample = false;
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
        const tpl = html`
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
                                ${this.availablePlatforms.map(
                                    (platform) => html`
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
                                                    @change="${() =>
                                                        this._togglePlatform(
                                                            platform,
                                                        )}"
                                                    ?checked="${(
                                                        this._saved.platforms ??
                                                        []
                                                    ).indexOf(platform) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `,
                                )}
                            </dl>
                        </fieldset>

                        <fieldset class="_nav-type s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Type</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableTypes.map(
                                    (type) => html`
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
                                                    @change="${() =>
                                                        this._toggleType(type)}"
                                                    ?checked="${(
                                                        this._saved.types ?? []
                                                    ).indexOf(type) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `,
                                )}
                            </dl>
                        </fieldset>

                        <fieldset class="_nav-status s-mbe:30">
                            <legend class="s-typo:h6 s-mbe:30">Status</legend>
                            <dl class="s-list s-bg:even">
                                ${this.availableStatuses.map(
                                    (status) => html`
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
                                                    @change="${() =>
                                                        this._toggleStatus(
                                                            status,
                                                        )}"
                                                    ?checked="${(
                                                        this._saved.statuses ??
                                                        []
                                                    ).indexOf(status) !== -1}"
                                                />
                                            </label>
                                        </dt>
                                    `,
                                )}
                            </dl>
                        </fieldset>
                    </form>
                </nav>
                <section class="_list">
                    ${Object.values(this._filteredItems).map(
                        (item) => html`
                            <div class="_list-item">
                                <div class="s-p:50">
                                    <div class="">
                                        <div class="s-flex">
                                            <div class="s-flex-item:grow">
                                                <div>
                                                    ${(<any>item).platform.map(
                                                        (platform) => html`
                                                            <i
                                                                class="s-platform:${platform.name} s-font:80 s-mbe:30 s-mr:10"
                                                            ></i>
                                                        `,
                                                    )}
                                                </div>
                                                <h4
                                                    class="s-font:title s-font:60 s-tc:accent s-mbe:10 s-flex-item:grow"
                                                >
                                                    <a
                                                        href="/doc/api/${this._striptags(
                                                            (<any>item)
                                                                .namespace,
                                                        )}.${this._striptags(
                                                            (<any>item).name,
                                                        )}"
                                                    >
                                                        ${(<any>item).name}
                                                    </a>
                                                </h4>
                                            </div>
                                            <div>
                                                <div class="s-font:40">
                                                    <span class="s-font:30"
                                                        >Since
                                                        <span
                                                            class="s-tc:complementary"
                                                            >${(<any>item)
                                                                .since}</span
                                                        ></span
                                                    >
                                                    &nbsp;
                                                    <span
                                                        class="s-badge:pill:${(<
                                                            any
                                                        >item).status}"
                                                        >${(<any>item)
                                                            .status}</span
                                                    >
                                                </div>
                                            </div>
                                        </div>
                                        <h5
                                            class="s-tc:complementary s-font:40 s-mbe:30"
                                        >
                                            ${(<any>item).namespace}
                                        </h5>
                                        <p class="s-typo:p s-mbe:30">
                                            ${(<any>item).description}
                                        </p>
                                    </div>
                                    ${(<any>item).example &&
                                    (<any>item).example.length
                                        ? html`
                                              <div class="_code">
                                                  ${this._renderExample
                                                      ? html`
                                                            <s-code-example
                                                                style="max-width:100%;"
                                                                class="s-depth:50 s-flex-item:grow:shrink"
                                                                s-deps
                                                                css="codeExample"
                                                            >
                                                                <textarea
                                                                    language="${(<
                                                                        any
                                                                    >item)
                                                                        .example[0]
                                                                        .language}"
                                                                >
                                                ${(<any>item).example[0]
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
                        `,
                    )}
                </section>
            </div>
        `;
        return tpl;
    }
}

export function __define(props: any = {}, tagName = 'doc-nav') {
    __SLitComponent.setDefaultProps({
        ...props,
        mountWhen: 'directly',
    });
    customElements.define(tagName, DocNav);
}
