@if (isset($block->description))

    <div class="s-format:text">
        {!! \Sugar\markdown\toHtml($block->description) !!}
    </div>

@endif
