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
                    $documentationMenu = array_merge((array) $docmap->menu->tree->documentation, []);
                    $packagesMenu = (object) [
                        'name' => 'Packages',
                    ];
                    foreach ((array) $docmap->menu->packages as $package) {
                        if (!property_exists($package, 'tree') || !property_exists($package->tree, 'documentation')) {
                            continue;
                        }
                    
                        $vars = array_keys((array) $package->tree->documentation);
                    
                        if (count($vars) <= 1) {
                            continue;
                        }
                    
                        $packagesMenu->{$package->name} = (object) [
                            'name' => $package->name,
                            'slug' => $package->tree->documentation->{$vars[1]}->slug,
                        ];
                    }
                    array_push($documentationMenu, $packagesMenu);
                    $documentationMenu = (object) $documentationMenu;
                @endphp

                @include('layouts.header.partials.menuItem', ['menuItem' => $documentationMenu, 'class' =>
                '__subnav-doc'])
                @include('layouts.header.partials.menuItem', ['menuItem' =>
                $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])

                @php
                    
                    $apiMenu = (object) [
                        'name' => 'API',
                        'config' => (object) [
                            'name' => 'Config',
                            'explorer' => (object) [
                                'name' => 'Config Explorer',
                                'slug' => '/config/explorer',
                            ],
                        ],
                        'components' => (object) [
                            'name' => 'Components',
                        ],
                        'cssDiscover' => (object) [
                            'name' => 'Discover (css)',
                            'content' => '<ck-discover platform="css"></ck-discover>',
                        ],
                        'jsDiscover' => (object) [
                            'name' => 'Discover (js)',
                            'content' => '<ck-discover platform="js"></ck-discover>',
                        ],
                        'postcssDiscover' => (object) [
                            'name' => 'Discover (PostCSS)',
                            'content' => '<ck-discover platform="postcss"></ck-discover>',
                        ],
                        'nodeDiscover' => (object) [
                            'name' => 'Discover (node)',
                            'content' => '<ck-discover platform="node"></ck-discover>',
                        ],
                        'phpDiscover' => (object) [
                            'name' => 'Discover (php)',
                            'content' => '<ck-discover platform="php"></ck-discover>',
                        ],
                    ];
                    
                    foreach ($docmap->map as $item) {
                        if ($item->type === 'CustomElement') {
                            $apiMenu->components->{$item->name} = (object) [
                                'name' => $item->name,
                                'slug' => '/api/' . $item->namespace,
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
