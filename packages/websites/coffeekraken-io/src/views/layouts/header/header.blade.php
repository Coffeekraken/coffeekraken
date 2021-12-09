<header id="header">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            <a href="/" title="Coffeekraken.io">
                @include ('layouts.header.partials.logo')
            </a>
            <div class="s-flex-item:order-10 s-flex:align-center">
                <form action="/doc/api" method="get" name="search" id="search-form">
                    <ck-search></ck-search>
                </form>

                <div class="s-tooltip-container s-mis:20">
                    <a class="s-btn s-color:complementary s-scale:08" id="settings-opener">
                        <i class="s-icon:settings"></i>
                    </a>
                    <div class="s-tooltip:block-end s-color:accent s-white-space:nowrap s-text:center">
                        Display website settings
                    </div>
                </div>
            </div>
            <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:40">
                <a class="s-typo:bold __main-link" href="/doc/get-started/get-started" title="Get Started">
                    <span>Get started</span>
                </a>

    @php
        $documentationMenu = (object)array_merge((array)$docmap->menu->tree->documentation, []);
    @endphp

                @include('layouts.header.partials.menuItem', ['menuItem' => $documentationMenu, 'class' => '__subnav-doc'])
                @include('layouts.header.partials.menuItem', ['menuItem' => $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])
                {{-- <a class="s-typo:bold __main-link" href="/config/explorer" title="Configuration explorer">
                    <span>Config explorer</span>
                </a> --}}

                @php

                    $apiMenu = (Object)[
                        'name' => 'API',
                        'config' => (Object)[
                            'name' => 'Config',
                            'explorer' => (Object)[
                                'name' => 'Config Explorer',
                                'slug' => '/config/explorer'
                            ],
                        ],
                        'components' => (Object)[
                            'name' => 'Components'
                        ],
                        'cssDiscover' => (Object)[
                            'name' => 'Discover (css)',
                            'content' => '<ck-discover platform="css"></ck-discover>'
                        ],
                        'jsDiscover' => (Object)[
                            'name' => 'Discover (js)',
                            'content' => '<ck-discover platform="js"></ck-discover>'
                        ],
                        'postcssDiscover' => (Object)[
                            'name' => 'Discover (PostCSS)',
                            'content' => '<ck-discover platform="postcss"></ck-discover>'
                        ],
                        'nodeDiscover' => (Object)[
                            'name' => 'Discover (node)',
                            'content' => '<ck-discover platform="node"></ck-discover>'
                        ],
                        'phpDiscover' => (Object)[
                            'name' => 'Discover (php)',
                            'content' => '<ck-discover platform="php"></ck-discover>'
                        ],
                    ];

                    foreach($docmap->map as $item) {
                        if ($item->type === 'CustomElement') {
                            $apiMenu->components->{$item->name} = (Object)[
                                'name' => $item->name,
                                'slug' => '/api/'.$item->namespace
                            ];
                        }
                    }


                @endphp

                @include('layouts.header.partials.menuItem', ['menuItem' => $apiMenu, 'class' => ''])
                {{-- <a class="__main-link s-pr:50 s-typo:bold" href="/doc/api" title="API">
                    <span>API</span>
                </a> --}}

            </nav>
        </div>

    </div>

</header>