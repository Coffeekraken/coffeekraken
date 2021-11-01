<header id="header">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            <a href="/" title="Coffeekraken.io">
                @include ('layouts.header.partials.logo')
            </a>
            <div class="s-flex-item:order-10 s-flex:align-center">
                <form action="/doc/api" method="get" name="search" id="search-form">
                    <input class="s-input" type="text" name="search" placeholder="Search API doc..." />
                </form>
                <version-selector class="s-mis:20"></vewelrsion-selector>
                <a href="javascript:void" class="s-mis:20" id="settings-opener">
                    <i class="s-icon:settings"></i>
                </a>
            </div>
            <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:40">
                <a class="s-typo:bold __main-link" href="/#features" title="Features">
                    <span>Features</span>
                </a>
                @include('layouts.header.partials.menuItem', ['menuItem' => $docmap->menu->tree->documentation, 'class' => '__subnav-doc'])
                @include('layouts.header.partials.menuItem', ['menuItem' => $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])
                @include('layouts.header.partials.menuItem', ['menuItem' => (Object)[
                    'name' => 'API',
                    'config' => (Object)[
                        'name' => 'Config',
                        'explorer' => (Object)[
                            'name' => 'Config Explorer',
                            'slug' => '/config/explorer'
                        ]
                    ]
                ], 'class' => ''])
                {{-- <a class="__main-link s-pr:50 s-typo:bold" href="/doc/api" title="API">
                    <span>API</span>
                </a> --}}

            </nav>
        </div>

    </div>
        

    <s-side-panel id="settings" side="right" triggerer="#settings-opener" overlay>
        <ck-settings mount-when="inViewport"></ck-settings> 
    </s-side-panel>

</header>