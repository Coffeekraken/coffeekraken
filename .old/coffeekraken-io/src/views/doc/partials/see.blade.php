@if (isset($block->see) && $block->see != null)

    <h4 id="related-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;Related resource(s)
    </h4>

    <div class="s-grid:2 s-gap:30">

        @foreach ($block->see as $see)
            <section class="s-bg:main-surface s-radius">
                @if (isset($see->og))
                    @if (isset($see->og->ogUrl))
                        <a href="{{ $see->og->ogUrl }}" target="_blank">
                    @endif
                    <div class="s-layout:1_2 s-bg:main-surface s-radius s-overflow:hidden s-depth:10">
                        @if (isset($see->og->ogImage->url))
                            <div class="s-ratio:21-9">
                                <img class="s-ratio:1 s-fit:cover" src="{{ $see->og->ogImage->url }}"
                                    alt="{{ $see->og->ogTitle }}" />
                            </div>
                        @endif
                        <div class="s-p:30">
                            @if (isset($see->og->ogTitle))
                                <h4 class="s-typo:h4 s-mbe:30">{{ $see->og->ogTitle }}</h4>
                            @endif
                            @if (isset($see->og->ogDescription))
                                <p class="s-typo:p s-mbe:30">{{ $see->og->ogDescription }}</p>
                            @endif
                            @if (isset($see->og->ogUrl))
                                <a class="s-typo:a" href="{{ $see->og->ogUrl }}" target="_blank">Check out more...</a>
                            @endif
                        </div>
                    </div>
                    @if (isset($see->og->ogUrl))
                        </a>
                    @endif
                @endif
            </section>
        @endforeach
    </div>

@endif
