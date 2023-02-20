<header id="header" s-highlight intensity="0.1">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            <div class="_actions s-display:none @mobile s-display:inline-block">
                <div class="s-mis:30">
                    <a s-activate class="_menu-icon" href="#nav-mobile" toggle unactivate-on="event:s-page-transition.start">
                        <i class="s-icon:menu _open"></i>
                        <i class="s-icon:cross _close"></i>
                    </a>
                </div>
            </div>
            <div class="_logo">
                <a href="/" title="Coffeekraken.io" class="s-text:center">
                    @include ('sugar.logos.coffeekraken.coffeekraken')
                </a>
            </div>
            <div class="_version">
                <ck-version-selector versions='{!! json_encode($versions) !!}'></ck-version-selector>
            </div>
            <nav id="nav" class="_nav s-until:media:mobile">
                <a class="_main-link" href="/doc/get-started/get-started" title="Get Started">
                    <span>Documentation</span>
                </a>

                <a class="_main-link" href="/styleguide/ui/card" title="Styleguide">
                    <span>Styleguide</span>
                </a>

                <a class="_main-link" href="/api/@coffeekraken.sugar.js.dom.query.querySelectorLive" title="API">
                    <span>API</span>
                </a>                

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
                    <a class="s-cursor:pointer" s-panel-open="settings">
                        <i class="s-icon:settings"></i>
                    </a>
                    <div s-floating class="s-tooltip:block-end s-color:accent s-white-space:nowrap s-text:center">
                        Display website settings
                    </div>
                </div>
            </div>
        </div>

    </div>

    <nav id="nav-mobile" class="_nav-mobile s-when:media:mobile">
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


        <nav class="_links">
            <a class="s-typo:bold _main-link" id="menu-mobile-doc" s-activate active href="#menu-mobile-doc" save-state
                group="menu-mobile" title="Documentation">
                <span>Documentation</span>
            </a>
            <a class="s-typo:bold _main-link" id="menu-mobile-styleguide" s-activate href="#menu-mobile-styleguide"
                save-state group="menu-mobile" title="Styleguide">
                <span>Styleguide</span>
            </a>
            <a class="s-typo:bold _main-link" id="menu-mobile-api" s-activate href="#menu-mobile-api" save-state
                group="menu-mobile" title="Api">
                <span>Api</span>
            </a>
        </nav>

        <div class="_subnav" id="menu-mobile-doc">
            <template>
                @include('layouts.header.partials.menuMobileItem', ['menuItem' => $documentationMenu, 'class' =>
                '_subnav-doc'])
            </template>
        </div>

        <div class="_subnav" id="menu-mobile-styleguide">
            <template>
                @include('layouts.header.partials.menuMobileItem', ['menuItem' =>
                $docmap->menu->custom->styleguide->tree->styleguide, 'class' => ''])
            </template>
        </div>

        <div class="_subnav" id="menu-mobile-api">
            <template>
                <api-nav></api-nav>
            </template>
        </div>

    </nav>

</header>
