<section id="homepage-welcome">

    {{-- <ck-falling-stars></ck-falling-stars> --}}

    <div class="__illustration">

        <div s-appear in="right">
            <img class="illustration" s-inline src="/dist/img/illustrations/kraken.svg" />
        </div>

        {{-- <ck-blob></ck-blob>
        <div class="__loader s-until:sibling:mounted">
            <i class="s-loader:square-dots s-color:accent"></i>
        </div> --}}

    </div>

    <div class="__content">
        @include('pages.homepage.welcome.partials.content')
    </div>


</section>
