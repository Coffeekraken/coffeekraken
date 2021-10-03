@if ($block->example)

    @php
    $htmlExamples = array_filter($block->example, function($item) {
        if ($item->language === 'html') return true;
        return false;
    });
    @endphp

    @if (count($htmlExamples))

        <h4 id="preview-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
            <i class="s-icon:preview s-tc:accent"></i>&nbsp;&nbsp;Preview
        </h4>

        <div class="s-format:none s-rhythm:none preview s-mbe:50">
            @foreach ($block->example as $example)
                @if ($example->language == 'html')
                    {!! $example->code !!}                     
                @endif
            @endforeach
        </div>

    @endif

@endif