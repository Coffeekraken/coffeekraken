<header id="header" class="s-container">

    <div class="s-flex:align-center" style="position: relative">
        <a href="/" title="Coffeekraken.io">
            <s-inline-svg src="/src/img/ck-logo.svg"></s-inline-svg>
        </a>
        <form class="s-flex-item:order-10" name="search" id="search-form">
            <s-request target="search-input" cache="1h" url="/api/docmap" on="update">
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
            <s-filtrable-input id="search-input" filtrable="name,namespace" value="namespace" default-style>
                <input type="text" placeholder="Search doc (cmd+shift+p)" class="s-form-input" />
                @php print("<template id='loading'>
                    <p clsas='s-p'>Searching.Please wait...</p>
                </template>");
                @endphp
                @php print("<template id='item'>
                    <a href='/doc/{{namespace}}'>
                        <h4 class='s-font-title s-font-size-50 s-color-accent s-mb:10'><span class='s-color-success'>{{type}}</span> {{name}} <span class='s-color-complementary s-font-size-30'>{{namespace}}</span></h4>
                        <p clsas='s-p'>{{description}}</p>
                    </a>
                </template>");
                @endphp
                @php print("<template id='no-item'>
                    <p class='s-p'>Sorry but their\'s no items that correspond to your research...</p>
                </template>");
                @endphp
            </s-filtrable-input>
        </form>
        <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:50 s-py:60">
            <a class="s-px:50" href="/#features" title="Features">Features</a>
            <a class="s-px:50" href="/#get-started" title="Get started">Get started</a>
            <a class="s-px:50" href="/#documentation" title="Documentation">Documentation</a>
        </nav>
    </div>

</header>