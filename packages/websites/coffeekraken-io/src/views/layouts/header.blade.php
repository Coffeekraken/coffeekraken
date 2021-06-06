<header class="s-container">

    <div class="s-navbar">
        <a href="/" title="Coffeekraken.io">
            <s-inline-svg src="/src/img/ck-logo.svg"></s-inline-svg>
        </a>
        <nav class="s-navbar__grow s-align-center s-font-size-50 s-padding-y-60">
            <a class="s-padding-x-50" href="/#features" title="Features">Features</a>
            <a class="s-padding-x-50" href="/#get-started" title="Get started">Get started</a>
            <a class="s-padding-x-50" href="/#documentation" title="Documentation">Documentation</a>
        </nav>
        <form name="search" id="search-form">
            <s-request target="search-input" url="/api/docmap" on="update">
                <script type="module">
                    export default {
                        /* send(detail) {
                            return detail;
                        },*/
                        receive(result) {
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
            <s-filtrable-input id="search-input" filtrable="name,namespace" value="namespace">
                <input type="text" placeholder="Search doc (cmd+shift+p)" class="s-form-input" />
                @php print('<template id="item">
                    <h4 class="s-font-title s-color-accent-foreground">{{name}}</h4>
                    <p clsas="s-p">{{description}}</p>
                </template>');
                @endphp
                @php print('<template id="no-item">
                    <p class="s-p">Sorry but their\'s no items that correspond to your research...</p>
                </template>');
                @endphp
            </s-filtrable-input>
        </form>
    </div>

</header>