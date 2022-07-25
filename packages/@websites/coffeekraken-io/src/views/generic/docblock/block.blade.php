@if ($index == 1)
    <h4 id="doc-api" class="s-typo:h4 s-mb s-mb:50">
        <i class="s-icon:api s-tc:accent"></i>&nbsp;&nbsp;API
    </h4>
@endif

<section class="docblock {{ $isFirst ? 'first' : '' }}"
    id="{{ \Sugar\string\idCompliant($block->id) }}">

    @if ($isFirst)
        @include('doc.title', ['block' => $block])
    @else

        @if ($block->name)
            @include('doc.sectionTitle', ['block' => $block])
        @endif
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
        {{-- @if ($isStyleguide) --}}
            @include('doc.preview', ['block' => $block])
        {{-- @endif --}}
        @include('doc.feature', ['block' => $block])
        @include('doc.import', ['block' => $block])
        @include('doc.install', ['block' => $block])
    @endif
    
    @if (!$isStyleguide && $block->type->raw !== 'CssClass')
        @include('doc.example', ['block' => $block, 'lines' => 10])
    @endif
    
    @include('doc.cssClass', ['block' => $block])
    
    @if ($block->event)
        @include('doc.event', ['interface' => $block->event])
    @endif

    @if ($block->interface)
        @include('doc.interface', ['interface' => $block->interface])
    @endif
    
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
