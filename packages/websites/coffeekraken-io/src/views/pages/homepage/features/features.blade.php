<div id="homepage-features">

    {{-- <section class="__header s-container s-py:100">

        <div class="__bg"></div>

        <div class="s-grid:122:gutter-x:gutter-between">
            <div>
                <img class="__illustration" src="/src/img/chest.png" />
            </div>
            <div class="s-rhythm-vertical">
                <h1 class="s-typo:h1">Features</h1>
                <p class="s-typo:p">
                    Coffeekraken toolkit has been designed from the ground up to be <span class="s-color-accent">as modular as possible</span>. This mean that we want you to be able to pick what you need and leave the rest aside...<br>
    We think that this approach is <span class="s-color-complementary">better than having to carry a big bag of things</span> you don’t have any use of...
                </p>
            </div>
        </div>

    </section> --}}

    <section class="s-container">
        
        {{-- <nav class="__tabs">
            <s-activate class="__item" active target="features-development" trigger="click,anchor" group="homepage-features" history>
                Development stack
            </s-activate>
            <s-activate class="__item" target="features-frontend" trigger="click,anchor" group="homepage-features" history>
                Frontend system
            </s-activate>
            <s-activate class="__item" target="features-webcomponents" trigger="click,anchor" group="homepage-features" history>
                Versatiles webcomponents
            </s-activate>
            <s-activate class="__item" target="features-sugar" trigger="click,anchor" group="homepage-features" history>
                Sugar toolkit
            </s-activate>
            <s-activate class="__item" target="features-documentation" trigger="click,anchor" group="homepage-features" history>
                Documentation at your fingertips
            </s-activate>
        </nav> --}}

        <div class="__contents">

            @include('pages.homepage.features.partials.development')
            @include('pages.homepage.features.partials.frontend')
            @include('pages.homepage.features.partials.webcomponents')
            @include('pages.homepage.features.partials.sugar')


            


            <section id="features-documentation">
                <h1>Documentation at your fingertips</h1>
            </section>
        </div>

    </section>

</div>