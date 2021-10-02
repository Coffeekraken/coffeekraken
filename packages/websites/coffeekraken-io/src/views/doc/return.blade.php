@if ($block->return)
    <h4 id="return-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:return s-tc:accent"></i>&nbsp;&nbsp;Return
    </h4>

    <header class="s-flex s-bg:ui-surface">
        <div class="s-typo:bold s-p:20">
            {{ implode(' | ', $block->return->type) }}
        </div>
        @if ($block->return->defaultStr)
            <div class="s-tc:info s-p:20">
                {{ $block->return->defaultStr }}
            </div>
        @endif
    </header>
    <p class="s-typo:p s-p:20">{!! $block->return->description !!}</p> 

@endif