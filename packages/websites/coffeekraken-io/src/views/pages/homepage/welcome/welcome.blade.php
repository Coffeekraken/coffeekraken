<section id="homepage-welcome">


    <div class="__background"></div>
    <canvas class="__canvas" id="welcome-canvas"></canvas>
    <canvas class="__canvas" id="welcome-canvas-2"></canvas>
    <div class="__content">
        @include('pages.homepage.welcome.partials.content')
    </div>

    {{-- <div class="__gooey">
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
    </div> --}}
    {{-- <div class="__code">
        {{ \Sugar\string\generateRandomString(20000, '01 ') }}
    </div> --}}

    <div layer amount="0" class="__template __template-01">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-02">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-03">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-04">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-05">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-06">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-07">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-08">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    
    <div class="__grains" layer amount="0.03"></div>

    <div class="__footer">
        <span class="__bracket __bracket-start">{</span>
        <span class="__first">'Take what <span class="s-tc:accent">you need</span>':</span>
        <br>
        <span class="__second">'<span class="s-tc:accent">leave the rest</span> aside'</span>
        <span class="__bracket __bracket-end">}</span>
    </div>

    {{--
    <svg class="__blobs" width="100%" height="100%" viewbox="0 0 100 100" preserveaspectratio="none">
        <defs>
            <clipPath id="welcome-clip-path-01" x="0" y="0">
                <polygon></polygon>
            </clipPath>
            <clipPath id="welcome-clip-path-02" x="0" y="0">
                <polygon></polygon>
            </clipPath>
        </defs>
    </svg> --}}

</section>