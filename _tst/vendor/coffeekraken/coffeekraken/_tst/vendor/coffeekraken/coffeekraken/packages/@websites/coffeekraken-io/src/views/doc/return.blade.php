@if (isset($block->return))
    <h4 id="return-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:return s-tc:accent"></i>&nbsp;&nbsp;Return
    </h4>

    <header class="s-flex s-bg:main-surface s-radius s-font:40 s-mbe:20">
        <div class="s-flex-item:grow s-format:text s-tc:accent s-p:30 s-color:complementary">
            {!! \Sugar\markdown\toHtml($block->return->description) !!}
        </div>

        <div class="s-p:30">
            @if (isset($block->return->type))
                @include('doc.partials.paramType', ['type' => $block->return->type])
            @endif
        </div>
    </header>
    @if (isset($block->return->default))
        <div class="s-pi:30 s-mbs:40 s-mbe:20">
            <div class="s-typo:code">
                {{ \Sugar\string\toString($block->return->default) }}
            </div>
        </div>
    @endif
    @if (isset($block->return->type->interface))
        <section class="_toggle-content">
            @include('doc.interfaceDefinition', ['interface' => $block->return->type->interface])
            </section>
    @endif

@endif
