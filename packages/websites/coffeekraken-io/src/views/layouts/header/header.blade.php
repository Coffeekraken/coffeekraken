<header id="header">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            <div class="__actions s-display:none @mobile s-display:inline-block">
                <div class="s-mis:30">
                    <a s-activate class="__menu-icon" href="#nav-mobile" toggle unactivate-on="page-transition-end">
                        <i class="s-icon:menu __open"></i>
                        <i class="s-icon:cross __close"></i>
                    </a>
                </div>
            </div>
            <div class="__logo">
                <a href="/" title="Coffeekraken.io" class="s-text:center">
                    <div class="s-until:parent:loading">
                        @include ('layouts.header.partials.logo')
                    </div>
                    <span class="s-when:parent:loading">
                        <div class="s-loader:spinner s-color:accent s-mie:10"></div>
                    </span>
                </a>
            </div>
            <nav id="nav" class="__nav s-until:media:mobile">
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

                {{-- Documentation --}}
                @include('layouts.header.partials.menuItem', ['menuItem' => $documentationMenu, 'class' =>
                '__subnav-doc'])

                {{-- Styleguide --}}
                @include('layouts.header.partials.menuItem', ['menuItem' =>
                $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])

                {{-- API --}}
                @php
                    $apiMenu = (object) [
                        'name' => 'API',
                        'search' => (object) [
                            'name' => 'Search',
                            'include' => 'generic/header/search-api.blade.php',
                        ],
                        'config' => (object) [
                            'name' => 'Configuration',
                            'overview' => (object) [
                                'name' => 'Overview',
                                'slug' => '/doc/config/overview',
                            ],
                            'explorer' => (object) [
                                'name' => 'Config Explorer',
                                'slug' => '/config/explorer',
                            ],
                            'builtin' => (object) [
                                'name' => 'Built-in Config',
                                'slug' => 'doc/config/built-in',
                            ],
                            'override' => (object) [
                                'name' => 'Override Config',
                                'slug' => 'doc/config/override',
                            ],
                            'register' => (object) [
                                'name' => 'Register new Config',
                                'slug' => 'doc/config/register',
                            ],
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
                    
                @endphp
                @include('layouts.header.partials.menuItem', ['menuItem' => $apiMenu, 'class' => ''])

            </nav>
            <div class="s-flex:align-center">
                <form class="s-until:media:mobile" action="/doc/api" method="get" name="search" id="search-form">
                    <ck-search></ck-search>
                </form>
                {{-- <div class="s-mis:20 s-when:media:mobile">
                    <a class="s-btn s-color:main s-scale:08" id="settings-opener">
                        <i class="s-icon:search"></i>
                    </a>
                </div> --}}
                <div class="s-tooltip-container s-mis:30 @mobile s-mie:30">
                    <a class="s-cursor:pointer" id="settings-opener">
                        <i class="s-icon:settings"></i>
                    </a>
                    <div s-floating class="s-tooltip:block-end s-color:accent s-white-space:nowrap s-text:center">
                        Display website settings
                    </div>
                </div>
            </div>
        </div>

    </div>

    <nav id="nav-mobile" class="__nav-mobile s-when:media:mobile">
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


        <nav class="__links">

            {{-- Documentation --}}
            <a class="s-typo:bold __main-link" id="menu-mobile-doc" s-activate active href="#menu-mobile-doc" save-state
                group="menu-mobile" title="Documentation">
                <span>Documentation</span>
            </a>

            {{-- Styleguide --}}
            <a class="s-typo:bold __main-link" id="menu-mobile-styleguide" s-activate href="#menu-mobile-styleguide"
                save-state group="menu-mobile" title="Styleguide">
                <span>Styleguide</span>
            </a>

            {{-- API --}}
            <a class="s-typo:bold __main-link" id="menu-mobile-api" s-activate href="#menu-mobile-api" save-state
                group="menu-mobile" title="Api">
                <span>Api</span>
            </a>

        </nav>

        <div class="__subnav" id="menu-mobile-doc">
            @include('layouts.header.partials.menuMobileItem', ['menuItem' => $documentationMenu, 'class' =>
            '__subnav-doc'])
        </div>

        <div class="__subnav" id="menu-mobile-styleguide">
            @include('layouts.header.partials.menuMobileItem', ['menuItem' =>
            $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])
        </div>

        <div class="__subnav" id="menu-mobile-api">
            <api-nav></api-nav>
        </div>

    </nav>

</header>
