<template>

    <div class="s-grid:12222">
        <nav class="__nav">
        
            <form name="doc">

                <fieldset class="__nav-search s-mb:30 s-pr:20 s-pt:20">
                    <input type="text" class="s-input s-width:100" name="search" placeholder="Search doc" :value="saved.search" @keyup="_search" />
                </fieldset>

                <fieldset class="__nav-platform s-mb:30">
                    <legend class="s-typo:h6 s-mb:10">
                        Platform
                    </legend>
                    <dl class="s-list s-bg:even">
                        <dt class="s-flex s-font:40 s-p:10 s-bg:ui-surface" v-for="platform in availablePlatforms()">
                            <label class="s-flex-item:grow" for="platform-{ platform }">
                                {{ platform }}
                            </label>
                            <label class="s-switch:accent" :for="`platform-${platform}`">
                                <input :name="`platform-${platform}`" type="checkbox" :id="`platform-${platform}`" @change="_togglePlatform(platform)" :checked="(saved.platforms ?? []).indexOf(platform) !== -1">
                                <div class="s-switch-handler"></div>
                            </label>
                        </dt>
                    </dl>
                </fieldset>

                <fieldset class="__nav-type s-mb:30">
                    <legend class="s-typo:h6 s-mb:10">
                        Type
                    </legend>
                    <dl class="s-list s-bg:even">
                        <dt class="s-flex s-font:40 s-p:10 s-bg:ui-surface" v-for="type in availableTypes()">
                            <label class="s-flex-item:grow" :for="`type-${type}`">
                                {{ type }}
                            </label>
                            <label class="s-switch:accent" :for="`type-${type}`">
                                <input :name="`type-${type}`" type="checkbox" :id="`type-${type}`" @change="_toggleType(type)" :checked="(saved.types ?? []).indexOf(type) !== -1">
                                <div class="s-switch-handler"></div>
                            </label>
                        </dt>
                    </dl>
                </fieldset>

                <fieldset class="__nav-status s-mb:30">
                    <legend class="s-typo:h6 s-mb:10">
                        Status
                    </legend>
                    <dl class="s-list s-bg:even">
                        <dt class="s-flex s-font:40 s-p:10 s-bg:ui-surface" v-for="status in availableStatuses()">
                            <label class="s-flex-item:grow" :for="`status-${status}`">
                                {{ status }}
                            </label>
                            <label class="s-switch:accent" :for="`status-${status}`">
                                <input :name="`status-${status}`" type="checkbox" :id="`status-${status}`" @change="_toggleStatus(status)" :checked="(saved.statuses ?? []).indexOf(status) !== -1">
                                <div class="s-switch-handler"></div>
                            </label>
                        </dt>
                    </dl>
                </fieldset>

            </form>
            

        </nav>
        <section class="__list">
            <div class="__list-item" v-for="(item, idx) in Object.values(filteredItems)">
                <!-- <div v-if="idx <= maxItemsToDisplay"> -->
                    <div class="s-p:50">
                        <div class="">
                            <div class="s-flex">
                                <div class="s-flex-item:grow">
                                    <div>
                                        <i :class="`s-platform:${platform.name} s-font:80 s-mb:30 s-mr:10`" v-for="platform in item.platform"></i>
                                    </div>
                                    <h4 class="s-font:title s-font:60 s-color:accent s-mb:10 s-flex-item:grow">
                                        <a :href="`/doc/api/${_striptags(item.namespace)}.${_striptags(item.name)}`">
                                            {{ item.name }}
                                        </a>
                                    </h4>
                                </div>
                                <div>
                                    <div class="s-font:40">
                                        <span class="s-font:30">Since <span class="s-color:complementary">{{ item.since }}</span></span>
                                        &nbsp;
                                        <span :class="`s-badge:pill:${item.status}`">{{ item.status }}</span>
                                    </div>
                                </div>
                            </div>
                            <h5 class="s-color:complementary s-font:40 s-mb:30">{{ item.namespace }}</h5>
                            <p class="s-typo:p s-mb:30">{{ item.description }}</p>
                        </div>
                        <div v-if="item.example && item.example.length" class="__code">
                            <s-code-example default-style style="max-width:100%;" class="s-depth:50 s-flex-item:grow:shrink">
                                <textarea :lang="item.example[0].language">
                                    {{ item.example[0].code }} 
                                </textarea>
                            </s-code-example>
                        </div>
                    </div>
                <!-- </div> -->
            </div>
        </section>
    </div>

</template>

<style scoped></style>

<script>
    import __SInterface from '@coffeekraken/s-interface';
    import __SComponentUtils from '@coffeekraken/s-component-utils';
    import __SRequest from '@coffeekraken/s-request';
    import __sameItems from '@coffeekraken/sugar/shared/array/sameItems';
    import __striptags from '@coffeekraken/sugar/shared/html/striptags';
    import __onScrollEnd from '@coffeekraken/sugar/js/dom/detect/onScrollEnd';
    import __miniSearch from 'minisearch';
    import __queryStringToObject from '@coffeekraken/sugar/shared/url/queryStringToObject';
    import __SCodeExampleComponent from '@coffeekraken/s-code-example-component';

    class SDocNavComponentInterface extends __SInterface {
        static definition = {
        }
    }

    export default {
        data() {
            return {
                maxItems: 1,
                maxItemsToDisplay: 1,
                filteredItems: {},
                docmap: {},
                saved: {
                    search: undefined,
                    platforms: [],
                    types: [],
                    statuses: []
                },
                component: null,
                _searchTimeout: 0,
                _striptags: __striptags,
            }
        },
        components: {
            // 'SCodeExample': __SCodeExampleComponent
        },
        props: [...Object.keys(SDocNavComponentInterface.definition)],
        async mounted() {
        
            this.component = new __SComponentUtils('doc-nav', this.$el, this.$props, {
                interface: SDocNavComponentInterface
            });
            const request = new __SRequest({
                url: '/api/docmap',
                method: 'GET'
            });

            const docmapJson = (await request.send()).data;
            this.docmap = docmapJson;

            // restore state
            // this._restoreState();

            // query string
            const queryStringObj = __queryStringToObject(document.location.search);
            if (queryStringObj.search) {
                this.saved.search = queryStringObj.search;
            }

            // filter items
            this._filterItems();

            // scroll end
            // __onScrollEnd(document.body, () => {
            //     this.maxItemsToDisplay = this.maxItemsToDisplay + this.maxItems;
            // });
        },
        methods: {
            availablePlatforms() {
                if (!this.docmap || !this.docmap.map) return [];
                const availablePlatforms = [];
                Object.keys(this.docmap.map).forEach(namespace => {
                    const docmapObj = this.docmap.map[namespace];
                    if (!docmapObj.platform) return;
                    docmapObj.platform.forEach(platform => {
                        if (availablePlatforms.indexOf(platform.name) === -1) availablePlatforms.push(platform.name);
                    });
                });
                return availablePlatforms;
            },
            availableTypes() {
                if (!this.docmap || !this.docmap.map) return [];
                const availableTypes = [];
                Object.keys(this.docmap.map).forEach(namespace => {
                    const docmapObj = this.docmap.map[namespace];
                    if (!docmapObj.type) return;
                    if (availableTypes.indexOf(docmapObj.type) === -1) availableTypes.push(docmapObj.type);
                });
                return availableTypes;
            },
            availableStatuses() {
                if (!this.docmap || !this.docmap.map) return [];
                const availableStatus = [];
                Object.keys(this.docmap.map).forEach(namespace => {
                    const docmapObj = this.docmap.map[namespace];
                    if (!docmapObj.status) return;
                    if (availableStatus.indexOf(docmapObj.status) === -1) availableStatus.push(docmapObj.status);
                });
                return availableStatus;
            },
            
            _filterItems() {

                let items = Object.values(this.docmap.map).map(i => {
                    i.id = i.name;
                    return i;
                });

                if (this.saved.search) {
                    let miniSearch = new __miniSearch({
                        fields: ['name', 'namespace', 'description', 'since', 'type', 'status'],
                        storeFields: Object.keys(items[0])
                    });
                    miniSearch.addAll(items);
                    items = miniSearch.search(this.saved.search);
                }


                items = items.filter((docmapObj, i) => {

                    if (i >= this.maxItemsToDisplay) return false;

                    if (this.saved.platforms.length) {
                        if (!docmapObj.platform) return false;
                        const samePlatforms = __sameItems(docmapObj.platform.map(l => l.name), this.saved.platforms);
                        if (!samePlatforms.length) return false;
                    }

                    if (this.saved.types.length) {
                        if (this.saved.types.indexOf(docmapObj.type) === -1) return false;
                    }

                    if (this.saved.statuses.length) {
                        if (this.saved.statuses.indexOf(docmapObj.status) === -1) return false;
                    }

                    return true;

                });

                this.maxItemsToDisplay = this.maxItems;
                this.filteredItems = items;

            },
            _search(e) {

                clearTimeout(this._searchTimeout);
                this._searchTimeout = setTimeout(() => {

                    this.saved = {
                        ...this.saved,
                        search: e.target.value
                    };

                    // filter items
                    this._filterItems();

                    // save state
                    this._saveState();

                }, 300);
            },
            _togglePlatform(platform) {
                const idx = this.saved.platforms.indexOf(platform);
                if (idx !== -1) {
                    this.saved.platforms.splice(idx, 1);
                    this.saved = {
                        ...this.saved,
                        platforms: this.saved.platforms
                    };
                } else {
                    this.saved = {
                        ...this.saved,
                        platforms: [...this.saved.platforms, platform]
                    };
                }

                // filter items
                this._filterItems();

                // save state
                this._saveState();
            },
            _toggleType(type) {
                const idx = this.saved.types.indexOf(type);
                if (idx !== -1) {
                    this.saved.types.splice(idx, 1);
                    this.saved = {
                        ...this.saved,
                        types: this.saved.types
                    };
                } else {
                    this.saved = {
                        ...this.saved,
                        types: [...this.saved.types, type]
                    };
                }

                // filter items
                this._filterItems();

                // save state
                this._saveState();
            },
            _toggleStatus(status) {
                const idx = this.saved.statuses.indexOf(status);
                if (idx !== -1) {
                    this.saved.statuses.splice(idx, 1);
                    this.saved = {
                        ...this.saved,
                        statuses: this.saved.statuses,
                    };
                } else {
                    this.saved = {
                        ...this.saved,
                        statuses: [...this.saved.statuses, status],
                    };
                }

                // filter items
                this._filterItems();

                // save state
                this._saveState();
            },
            _saveState() {
                window.localStorage.setItem('docState', JSON.stringify(this.saved));
            },
            _restoreState() {
                // return;
                const savedState = JSON.parse(window.localStorage.getItem('docState') ?? '{}');
                this.saved = savedState;
            }
        }
    };
</script>
