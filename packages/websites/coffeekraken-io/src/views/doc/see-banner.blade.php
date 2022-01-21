@if ($block->see)

    <a href="#related-{{ $block->name }}" title="Related resource(s)"
        class="s-bg:complementary s-tc:complementary-foreground s-display:block s-p:30 s-radius s-mbs:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;This {{ $block->type }} make use of related resource(s).
        <a>

@endif
