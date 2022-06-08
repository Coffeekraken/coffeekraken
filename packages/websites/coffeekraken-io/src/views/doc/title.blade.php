@php
$titleStr = $block->name;
if ($block->get) {
    $titleStr = '<span class="s-tc:accent">get</span> ' . $titleStr;
}
@endphp

<h1 class="s-typo:h1 s-mbe:30 s-tc:accent">

    @if ($block->type->types[0]->type == 'Function')
        {!! $titleStr !!}()
    @else
        {!! $titleStr !!}
    @endif
</h1>
