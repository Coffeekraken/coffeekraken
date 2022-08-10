@php
$titleStr = $block->name;
if (isset($block->get)) {
    $titleStr = '<span class="s-tc:accent">get</span> ' . $titleStr;
}
@endphp

<h1 class="s-typo:h1 s-mbe:30 s-tc:accent">

    @if (isset($block->type) && $block->type->raw == 'Function')
        {!! $titleStr !!}()
    @else
        {!! $titleStr !!}
    @endif
</h1>
