@if (isset($index) && $index == 1)
    <h4 id="doc-api" class="s-typo:h4 s-mb s-mb:50">
        <i class="s-icon:api s-tc:accent"></i>&nbsp;&nbsp;API
    </h4>
@endif

<section class="docblock {{ $isFirst ? 'first' : '' }}"
    id="{{ \Sugar\string\idCompliant($block->id) }}"
    s-deps css="docblock">

    @if (isset($isFirst))
        @include('doc.partials.title', ['block' => $block])
    @else

        @if (isset($block->name))
            @include('doc.partials.sectionTitle', ['block' => $block])
        @endif
    @endif

    @if (!isset($isFirst))
        <section class="_toggle-content">
    @endif

    @if (isset($isFirst))
        @include('doc.partials.see-banner', ['block' => $block])
    @endif

    @include('doc.partials.description', ['block' => $block])
    
    @if (isset($isFirst))
        @include('doc.partials.status', ['block' => $block])
            @include('doc.partials.preview', ['block' => $block])
        @include('doc.partials.feature', ['block' => $block])
        @include('doc.partials.import', ['block' => $block])
        @include('doc.partials.install', ['block' => $block])
    @endif
    
    @if (!isset($isStyleguide) && @$block->type->raw !== 'CssClass')
        @include('doc.partials.example', ['block' => $block])
    @endif
    
    @include('doc.partials.cssClass', ['block' => $block])
    
    @if (isset($block->event))
        @include('doc.partials.event', ['interface' => $block->event])
    @endif

    @if (isset($block->interface))
        @include('doc.partials.interface', ['interface' => $block->interface])
    @endif
    
    @include('doc.partials.param', ['block' => $block])
    @include('doc.partials.return', ['block' => $block])
    @include('doc.partials.setting', ['block' => $block])
    @include('doc.partials.props', ['block' => $block])
    @include('doc.partials.todo', ['block' => $block])
    @include('doc.partials.see', ['block' => $block])

    @if (!isset($isFirst))
        </section>
    @endif

</section>
