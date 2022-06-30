<div id="homepage-features">

    <div class="__contents">

        {{-- <section id="features-development" class="s-pbe:100">

            <div class="s-container">

                <div class="s-bg:main-surface s-scale:15 s-radius s-mbe:50">
                    <ul class="s-tabs:grow s-color:complementary">
                        <li s-activate href="#homepage-discover-js" id="homepage-discover-js-tab"
                            group="homepage-discover" active save-state>
                            <i class="s-icon:lang-js s-mie:20"></i>JS
                        </li>
                        <li s-activate href="#homepage-discover-node" id="homepage-discover-node-tab"
                            group="homepage-discover" save-state>
                            <i class="s-icon:lang-js s-mie:20"></i>Node
                        </li>
                        <li s-activate href="#homepage-discover-css" id="homepage-discover-css-tab"
                            group="homepage-discover" save-state>
                            <i class="s-icon:lang-css s-mie:20"></i>CSS
                        </li>
                        <li s-activate href="#homepage-discover-php" id="homepage-discover-php-tab"
                            group="homepage-discover" save-state>
                            <i class="s-icon:lang-php s-mie:20"></i>PHP
                        </li>
                    </ul>
                </div>

                <div class="s-position:relative s-when:active" id="homepage-discover-js">
                    <ck-discover platform="js"></ck-discover>
                </div>
                <div class="s-position:relative s-when:active" id="homepage-discover-node">
                    <ck-discover platform="node"></ck-discover>
                </div>
                <div class="s-position:relative s-when:active" id="homepage-discover-css">
                    <ck-discover platform="css"></ck-discover>
                </div>
                <div class="s-position:relative s-when:active" id="homepage-discover-php">
                    <ck-discover platform="php"></ck-discover>
                </div>
            </div>
        </section> --}}

        {{-- <div class="s-container">

            <div class="s-bg:main-surface s-scale:15 s-radius s-mbe:50">
                <ul class="s-tabs:grow">
                    <li class="s-color:accent" href="#homepage-discover-js" id="homepage-discover-js-tab">
                        <i class="s-icon:lang-js s-mie:20"></i>Frontend Sugar
                    </li>
                    <li class="s-color:complementary" href="#homepage-discover-node" id="homepage-discover-node-tab">
                        <i class="s-icon:lang-js s-mie:20"></i>Webcomponents
                    </li>
                    <li class="s-color:accent" href="#homepage-discover-css" id="homepage-discover-css-tab">
                        <i class="s-icon:lang-css s-mie:20"></i>Sugar toolkit
                    </li>
                    <li class="s-color:complementary" href="#homepage-discover-php" id="homepage-discover-php-tab">
                        <i class="s-icon:lang-php s-mie:20"></i>Built-in dev stack
                    </li>
                </ul>
            </div>
        </div> --}}


        @include('pages.homepage.features.partials.openSource')
        @include('pages.homepage.features.partials.ui')
        @include('pages.homepage.features.partials.helpers')
        @include('pages.homepage.features.partials.frontend')
        @include('pages.homepage.features.partials.discover')
        {{-- @include('pages.homepage.features.partials.webcomponents') --}}
        @include('pages.homepage.features.partials.sugar')
        @include('pages.homepage.features.partials.development')
        @include('pages.homepage.features.partials.why')

    </div>

</div>
