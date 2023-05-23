<div id="markdown">

    <section class="s-container markdown">

        <div class="s-layout:12222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30 s-gap:0">

            <nav s-scope class="sidemenu @mobile s-display:none" s-refocus>

                <div class="sidemenu-sub">
                    <ck-doc-sub-nav source="._content"></ck-doc-sub-nav>
                </div>

                <div class="sidemenu-main">

                    <h5 class="s-typo:h5 s-mbe:20">
                        Specs
                    </h5>

                    @php $menu = get_object_vars($docmap->menu->custom->specs->tree->specs); @endphp
                    @include('pages.specs.menu', ['menu' => $menu, 'id' => 'main'])

                </div>

            </nav>

            <div s-page-transition-container="view">
                
                <div s-scope class="_content s-pb:50 s-pis:50 s-rhythm:vertical s-format:text @mobile s-pis:0">

                    @if (!isset($body))

                    <h1 class="s-typo:h1 s-mbe:30">
                        No view selected
                    </h1>

                    <p class="s-typo:lead s-mbe:30">
                        Please select a view from the sidemenu
                    </p>

                    @else
                    
                        {!! $body !!}

                    @endif

                </div>
            </div>

        </div>
    </section>

</div>
