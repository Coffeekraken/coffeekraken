@if ($block->see)

    <h4 id="related-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:box s-color:accent"></i>&nbsp;&nbsp;Related resource(s)
    </h4>

    @foreach ($block->see as $see)
        <section class="s-bg:ui-surface s-border:radius">
            @if ($see->og)
                <div class="s-grid:122">
                    <div class="s-ratio:1-1 s-bg:accent s-border:radius">
                        <img src="{{ $see->og->ogImage->url }}" />
                    </div>
                    <div class="s-p:50">
                        <h5 class="s-typo:h3 s-mbe:30">{{ $see->og->ogTitle }}</h5>
                        <p class="s-typo:p s-mbe:30">
                            {{ $see->og->ogDescription}}
                        </p>
                        <a class="s-btn:info" href="{{ $see->og->ogUrl }}" title="{{ $see->og->ogTitle }}" target="_blank">
                            Check that out!
                        </a>
                    </div>
                </div>
            @endif
        </section>
    @endforeach

@endif