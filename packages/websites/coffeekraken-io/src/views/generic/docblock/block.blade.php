<section class="docblock {{ $isFirst ? 'first' : '' }}"
    id="{{ \Sugar\string\idCompliant($block->type . '-' . $block->name) }}">

    @if ($isFirst)
        @include('doc.title', ['block' => $block])
    @else
        @include('doc.sectionTitle', ['block' => $block])
    @endif

    @if (!$isFirst)
        <section class="__toggle-content">
    @endif

    @if ($isFirst)
        @include('doc.see-banner', ['block' => $block])
    @endif
    @include('doc.description', ['block' => $block])
    @if ($isFirst)
        @include('doc.status', ['block' => $block])
        @if ($isStyleguide)
            @include('doc.preview', ['block' => $block])
        @endif
        @include('doc.feature', ['block' => $block])
        @include('doc.import', ['block' => $block])
        @include('doc.install', ['block' => $block])
    @endif
    @if (!$isStyleguide)
        @include('doc.example', ['block' => $block, 'lines' => 10])
    @endif
    @include('doc.cssClass', ['block' => $block])
    @include('doc.interface', ['block' => $block])
    @include('doc.param', ['block' => $block])
    @include('doc.return', ['block' => $block])
    @include('doc.setting', ['block' => $block])
    @include('doc.props', ['block' => $block])
    @include('doc.todo', ['block' => $block])
    @include('doc.see', ['block' => $block])

    @if (!$isFirst)
</section>
@endif

</section>
