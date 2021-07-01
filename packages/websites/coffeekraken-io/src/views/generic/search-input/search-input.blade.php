@php
    $id = 'search-input';
@endphp

<s-request target="{{ $id }}" cache="1h" url="/api/docmap" on="update">
    <script type="module">
        export default {
            request(payload) {
                delete payload.data.value;
                return payload;
            },
            response(result) {
                const items = [];
                Object.keys(result.data ?? result).forEach(docmapItemNamespace => {
                    const itemObj = (result.data ?? result)[docmapItemNamespace];
                    items.push(itemObj);
                });
                return items;
            }
        }
    </script>
</s-request>
<s-filtrable-input id="{{ $id }}" filtrable="name,namespace,status" value="namespace" interactive not-selectable>
    <input type="text" placeholder="Search doc ( cmd+p )" class="s-input s-depth:50" />
    <template id="loading">
        <p class="s-p s-pd:30"><i class="s-icon:search s-color:accent"></i>&nbsp;&nbsp;Searching. Please wait...</p>
    </template>
    <template id="item">
        <div class="__bg"></div>
        <div class="s-flex">
            <div style="width:40%" class="s-pd:50">
                <div class="s-font:40 s-mb:30">
                    <span class="s-badge:pill:@{{ status }}">@{{ status }}</span>
                    &nbsp;
                    @{{#each platform}}
                        <i class="s-platform:@{{this.name}} s-font:50"></i>
                    @{{/each}}
                </div>
                <h4 class="s-font:title s-font:60 s-color:accent s-mb:10">
                    @{{name}}
                </h4>
                <h5 class="s-color:complementary s-font:40 s-mb:30">@{{namespace}}</h5>
                <p class="s-typo:p s-mb:30">@{{description}}</p>
                <a href="/doc/@{{striptags namespace}}.@{{striptags name}}" class="s-btn:accent">
                    Check out more
                </a>
            </div>
            @{{#if example}}
                @{{#with example.[0]}}
                    <div style="width: 60%" class="__code s-pd:50 s-flex:align-center">
                        <s-code-example default-style style="max-width:100%;" class="s-depth:50 s-flex-item:grow:shrink">
                            <template lang="@{{ this.language }}">
                                @{{ this.code }}                    
                            </template>       
                        </s-code-example>
                    </div>
                @{{/with}}
            @{{/if}}
        </div>
    </template>
    <template id="no-item">
        <div class="s-pd:100 s-text:center">
            <i class="s-icon:nothing s-color:accent s-font:100 s-mb:50"></i>
            <br />
            <p class="s-p:lead s-mb:30 s-mx:auto">
                Sorry but their's no items that correspond<br />to your research...
            </p>
            <p class="s-p s-mb:50 s-mx:auto">
                Don't be afraid to join us and help to enhance the <span class="s-color:accent">Coffeekraken</span> capabilities with some new features you can contribute to develop.
                <br/>
                Here's how you can join us and start a new journey!
            </p>
            <a class="s-btn:info" href="/" title="Join us on Discord!" target="_blank">
                Join us on Discord!
            </a>
            &nbsp;&nbsp;
            <a class="s-btn:accent" href="/" title="Join us on Github!" target="_blank">
                Join us on Github!
            </a>
        </div>
    </template>
</s-filtrable-input>