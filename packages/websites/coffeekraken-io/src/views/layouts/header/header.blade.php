<header id="header">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            <a href="/" title="Coffeekraken.io">
                @include ('layouts.header.partials.logo')
            </a>
            <div class="s-flex-item:order-10 s-flex:align-center">
                <form action="/doc/api" method="get" name="search" id="search-form">
                    <ck-search></ck-search>
                        {{-- <input class="s-input" type="text" name="search" placeholder="Search API doc..." /> --}}
                </form>

                <div class="s-tooltip-container s-mis:20">
                    <a class="s-btn s-color:complementary s-scale:08" id="settings-opener">
                        <i class="s-icon:settings"></i>
                    </a>
                    <div class="s-tooltip:block-end s-color:accent s-white-space:nowrap s-text:center">
                        Display website settings
                    </div>
                </div>
                {{-- <version-selector class="s-mis:20 s-scale:11"></vewelrsion-selector> --}}
            </div>
            <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:40">
                <a class="s-typo:bold __main-link" href="/doc/get-started/get-started" title="Get Started">
                    <span>Get started</span>
                </a>
                @include('layouts.header.partials.menuItem', ['menuItem' => $docmap->menu->tree->documentation, 'class' => '__subnav-doc'])
                @include('layouts.header.partials.menuItem', ['menuItem' => $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])
                {{-- <a class="s-typo:bold __main-link" href="/config/explorer" title="Configuration explorer">
                    <span>Config explorer</span>
                </a> --}}

                @php

                    $apiMenu = (Object)[
                        'name' => 'API',
                        'jsFeatured' => (Object)[
                            'name' => 'Featured (js)',
                            'spromise' => (Object)[
                                'name' => 'SPromise',
                                'slug' => '/api/@coffeekraken.s-promise.shared.sPromise'
                            ],
                            'querySelectorLive' => (Object)[
                                'name' => 'querySelectorLive',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.query.querySelectorLive'
                            ],
                            'inViewportStatusChange' => (Object)[
                                'name' => 'inViewportStatusChange',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.detect.inViewportStatusChange'
                            ],
                            'whenInteract' => (Object)[
                                'name' => 'whenInteract',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.query.whenInteract'
                            ],
                            'imagesLoaded' => (Object)[
                                'name' => 'imagesLoaded',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.load.imagesLoaded'
                            ],
                            'copy' => (Object)[
                                'name' => 'copy',
                                'slug' => '/api/@coffeekraken.sugar.js.clipboard.copy'
                            ],
                            'adoptStyleInShadowRoot' => (Object)[
                                'name' => 'adoptStyleInShadowRoot',
                                'slug' => '/api/@coffeekraken.sugar.js.css.adoptStyleInShadowRoot'
                            ],
                            'detectInOutDirection' => (Object)[
                                'name' => 'detectInOutDirection',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.detect.detectInOutDirection'
                            ],
                            'onSwipe' => (Object)[
                                'name' => 'onSwipe',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.detect.onSwipe'
                            ],
                            'onScrollEnd' => (Object)[
                                'name' => 'onScrollEnd',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.detect.onScrollEnd'
                            ],
                            'whenAttribute' => (Object)[
                                'name' => 'whenAttribute',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.detect.whenAttribute'
                            ],
                            'is-inViewport' => (Object)[
                                'name' => 'is/inViewport',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.is.inViewport'
                            ],
                            'stripTags' => (Object)[
                                'name' => 'stripTags',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.manipulate.stripTags'
                            ],
                            'imagesLoaded' => (Object)[
                                'name' => 'imagesLoaded',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.load.imagesLoaded'
                            ],
                            'closest' => (Object)[
                                'name' => 'query/closest',
                                'slug' => '/api/@coffeekraken.sugar.js.dom.query.closest'
                            ]
                        ],
                        'nodeFeatured' => (Object)[
                            'name' => 'Featured (node)'
                        ],
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
                        'jsDiscover' => (Object)[
                            'name' => 'Discover (js)',
                            'content' => '<ck-discover platform="js"></ck-discover>'
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