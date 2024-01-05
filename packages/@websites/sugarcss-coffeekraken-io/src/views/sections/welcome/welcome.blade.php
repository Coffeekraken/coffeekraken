<section class="section" id="homepage-welcome" viewport-aware>

    {{-- <pre>
        @php
        print_r(\SViews\specs\readViewSpec('sugar.views.sections.hero'));
        @endphp
    </pre> --}}

    <div class="s-container">

        <div class="_content">
            @include('sections.welcome.partials.content')
        </div>

        <div class="_illustration">
            <div class="_shadow _shadow-1"></div>
            <div class="_shadow _shadow-2"></div>
            <div class="_shadow _shadow-3"></div>
            <div class="_shadow _shadow-4"></div>
            <svg class="_main" viewBox="0 0 274 352" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M51.3165 337.996C51.0974 335.805 26.9323 148.036 14.8771 54.4263L2 53.3303L5.56175 50.5905V42.9191H8.84952V33.3297L14.8771 29.768C15.6077 23.6491 17.1237 10.6441 17.3429 7.57554C17.6169 3.73981 19.2608 1 23.3705 1H249.405C253.24 1 255.158 1.82194 256.254 6.20564C257.131 9.71259 258.629 23.3751 259.268 29.768L265.296 33.3297V42.9191H268.035V50.5905L271.871 53.3303L257.35 54.4263L221.459 337.996C220.911 342.471 203.65 351.421 138.99 351.421C58.1661 351.421 51.5905 340.736 51.3165 337.996Z" fill="black" stroke="white"/>
            </svg>
            <video class="_smoke" src="/dist/video/cup-smoke.webm" s-parallax amount-x="0.03" amount-y="0" autoplay muted loop></video>
        </div>

        {{-- <div class="_illustration">
            <img class="_cup-bkg -light" s-parallax amount-x="0.05" amount-y="0" src="/dist/img/cup-bkg-light.png" alt="Coffeekraken coffee cup background" />
            <img class="_cup-bkg -dark" s-parallax amount-x="0.05" amount-y="0" src="/dist/img/cup-bkg.png" alt="Coffeekraken coffee cup background" />
            <div class="_round _round-1" s-parallax amount-x="0.2" amount-y="0.03">
                <i class="s-icon:display"></i>
            </div>
            <div class="_round _round-2" s-parallax amount-x="0.1" amount-y="0.1"></div>
            <div class="_round _round-6" s-parallax amount-x="0.15" amount-y="0.16"></div>
            
            <img class="_cup -light" src="/dist/img/cup-light.png" s-parallax amount-x="0.03" amount-y="0" alt="Coffeekraken coffee cup" />
            <img class="_cup -dark" src="/dist/img/cup.png" s-parallax amount-x="0.03" amount-y="0" alt="Coffeekraken coffee cup" />
            <div class="_round _round-3" s-parallax amount-x="0.1" amount-y="0.05"></div>
            <div class="_round _round-4" s-parallax amount-x="0.54" amount-y="0.1" amount-r="0.2">
                <i class="s-icon:brush"></i>
            </div>
            <div class="_round _round-5" s-parallax amount-x="0.3" amount-y="0.15">
                <i class="s-icon:scissors"></i>
            </div>
        </div> --}}

    </div>

</section>