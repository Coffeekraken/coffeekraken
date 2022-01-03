<section id="homepage-welcome">

    {{-- <div class="__background"></div>
    <canvas class="__canvas" id="welcome-canvas"></canvas>
    <canvas class="__canvas" id="welcome-canvas-2"></canvas> --}}
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
        @php


        
            $code = \Sugar\string\generateRandomString(500, '01 ');
            $str = str_split($code, 1);
            $ar = [];
            foreach($str as $char) {
                $id = rand(0,10);
                array_push($ar, '<span class="__code-'.$id.'">'.$char.'</span>');
            }
        @endphp
        <span>{!! implode('',$ar) !!}</span>
    </div> --}}

    {{-- <div layer amount="0" class="__template __template-01">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-02">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-03">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    {{-- <div layer amount="0" class="__template __template-04">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div> --}}
    {{-- <div layer amount="0" class="__template __template-05">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div>
    <div layer amount="0" class="__template __template-06">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div> --}}
    {{-- <div layer amount="0" class="__template __template-07">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div> --}}
    {{-- <div layer amount="0" class="__template __template-08">{{ \Sugar\string\generateRandomString(500, '01 ') }}</div> --}}



    <div class="__illustration">

        <div class="__loader">
            <i class="s-loader:spinner s-color:accent"></i>
        </div>

        <ck-blob></ck-blob>

        {{-- <div class="__coffee-cup">
            <img src="{{ $config->serve->img->url }}/welcome/coffee-cup.png" />
        </div>
        <div class="__blob-js" s-parallax amount="0.5" amount-y="0.5" amount-rotate-x="0.1">
            <img class="__blob-js" src="{{ $config->serve->img->url }}/welcome/blob-js.png" />
        </div>
        <div class="__blob-css" s-parallax amount="0.2" amount-y="0.7" amount-rotate-x="0.1">
            <img src="{{ $config->serve->img->url }}/welcome/blob-css.png" />
        </div>
        <div class="__blob-ui" s-parallax amount="0.3" amount-y="0.4" amount-rotate-x="0.1">
            <img src="{{ $config->serve->img->url }}/welcome/blob-ui.png" />
        </div>
        <div class="__blob-node" s-parallax amount="0.3" amount-y="0.6" amount-rotate-x="0.1">
            <img src="{{ $config->serve->img->url }}/welcome/blob-node.png" />
        </div>
        <div class="__blob-cli" s-parallax amount="0.5" amount-y="0.2" amount-rotate-y="0.5" amount-rotate-x="0">
            <img src="{{ $config->serve->img->url }}/welcome/blob-cli.png" />
        </div>
        <div class="__blob-php" s-parallax amount="0.8" amount-y="0.3" amount-rotate-y="0.8" amount-rotate-x="0.2">
            <img src="{{ $config->serve->img->url }}/welcome/blob-php.png" />
        </div>
        <div class="__blob-01" s-parallax amount="0.4" amount-y="0.8" amount-rotate-x="0.1">
            <img src="{{ $config->serve->img->url }}/welcome/blob-01.png" />
        </div>
        <div class="__blob-02" s-parallax amount="0.5" amount-y="0.6" amount-rotate-x="0.1">
            <img src="{{ $config->serve->img->url }}/welcome/blob-02.png" />
        </div>
        <div class="__blob-03" s-parallax amount="0.5" amount-y="0.2" amount-rotate-x="0.1">
            <img src="{{ $config->serve->img->url }}/welcome/blob-03.png" />
        </div> --}}
    </div>

    {{-- <div class="__grains" layer amount="0.03"></div> --}}

    {{-- <div class="__footer">
        <span class="__bracket __bracket-start">{</span>
        <span class="__first">'Take what <span class="s-tc:accent">you need</span>':</span>
        <br>
        <span class="__second">'<span class="s-tc:accent">leave the rest</span> aside'</span>
        <span class="__bracket __bracket-end">}</span>
    </div> --}}

    {{-- <svg class="__blobs" width="100%" height="100%" viewbox="0 0 100 100" preserveaspectratio="none">
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
