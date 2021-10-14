<section id="homepage-welcome">


    <div class="__background"></div>
    <div class="__content">
        @include('pages.homepage.welcome.partials.content')
    </div>
    <div class="__gooey">
        <div class="__bg-01">
            <div class="__content s-theme--default-dark s-remap-complementary-accent">
                @include('pages.homepage.welcome.partials.content')
            </div>
        </div>
        <div class="__bg-02">
            <div class="__content s-theme--default-dark s-remap-accent-complementary">
                @include('pages.homepage.welcome.partials.content')
            </div>
        </div>
    </div>
    <div class="__code">
        {{ \Sugar\string\generateRandomString(20000, '01 ') }}
    </div>
    <svg class="__blobs" width="100%" height="100%" viewbox="0 0 100 100" preserveaspectratio="none">
        <defs>
            <clipPath id="welcome-clip-path-01" x="0" y="0">
                <polygon></polygon>
            </clipPath>
            <clipPath id="welcome-clip-path-02" x="0" y="0">
                <polygon></polygon>
            </clipPath>
        </defs>
    </svg>

</section>