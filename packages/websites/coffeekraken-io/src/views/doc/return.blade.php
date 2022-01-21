@if ($block->return)
    <h4 id="return-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:return s-tc:accent"></i>&nbsp;&nbsp;Return
    </h4>

    <header class="s-flex s-bg:main-surface s-radius s-depth:100 s-mbe:20">
        <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">
            {!! $block->return->description !!}
        </div>
        <div class="s-typo:bold s-p:30 s-tc:info">
            {{ implode($block->return->type, '|') }}
        </div>
    </header>
    @if ($block->return->default != null)
        <div class="s-pi:30 s-mbs:40 s-mbe:20">
            <div class="s-typo:code">
                {{ \Sugar\string\toString($block->return->default) }}
            </div>
        </div>
    @endif

@endif
