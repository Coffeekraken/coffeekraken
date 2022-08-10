@if (isset($block->description))

    <p class="s-typo:lead s-format:text s-mbs:50">{!! \Sugar\markdown\toHtml($block->description) !!}</p>

@endif
