@if ($block->see)

    <a href="#related-{{ $block->name }}" title="Related resource(s)" class="s-bg:complementary s-color:complementary-foreground s-display:block s-p:30 s-border:radius s-mbe:50">
        <i class="s-icon:box s-color:accent"></i>&nbsp;&nbsp;This {{ $block->type }} make use of related resource(s).
    <a>

@endif