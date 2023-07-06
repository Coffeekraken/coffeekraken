<header id="header" s-highlight intensity="0.1">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            {{-- <div class="_actions s-display:none @mobile s-display:inline-block">
                <div class="s-mis:30">
                    <a s-activate class="_menu-icon" href="#nav-mobile" toggle unactivate-on="event:s-page-transition.start">
                        <i class="s-icon:menu _open"></i>
                        <i class="s-icon:cross _close"></i>
                    </a>
                </div>
            </div> --}}
            <div class="_logo">
                <a href="/" title="Coffeekraken.io" class="s-text:center">
                    @include ('sugar.logos.coffeekraken.coffeekraken')
                </a>
            </div>
            <nav role="navigation" id="nav" class="_nav s-until:media:mobile">
                <a class="_main-link" href="#get-started" title="Get Started" s-activate trigger="scrollspy">
                    <span>Get started</span>
                </a>
                <a class="_main-link" href="#examples" title="Examples" s-activate trigger="scrollspy">
                    <span>Examples</span>
                </a>
                <a class="_main-link" href="#documentation" title="Documentation" s-activate trigger="scrollspy">
                    <span>Documentation</span>
                </a>                
            </nav>
            <ck-menu></ck-menu>
        </div>

    </div>

</header>
