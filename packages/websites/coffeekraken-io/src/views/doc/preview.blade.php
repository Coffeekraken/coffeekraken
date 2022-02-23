@if ($block->example)

    @php
        $htmlExamples = array_filter($block->example, function ($item) {
            if ($item->language === 'html') {
                return true;
            }
            return false;
        });
    @endphp

    @if (count($htmlExamples))

        {{-- <h4 id="preview-{{ $block->name }}" class="s-typo:h4 s-mb:50">
            <i class="s-icon:preview s-tc:accent"></i>&nbsp;&nbsp;Preview
        </h4> --}}

        <div class="s-format:none s-rhythm:none preview s-mbe:50">
            @foreach ($block->example as $example)
                @if ($example->title)
                    <h4 class="s-typo:h3 s-mb:50">{!! ucfirst($example->title) !!}</h4>
                @endif
                @if ($example->description)
                    <p class="s-typo:p s-format:text">{!! \Sugar\markdown\toHtml($example->description) !!}</p>
                @endif
                @if ($example->language == 'html')
                    <div class="preview-html">
                        {!! $example->code !!}
                    </div>
                @endif
                <s-code-example class="s-mbs:50" lines="5">
                    <code lang="{{ $example->language }}">
                        {!! html_entity_decode($example->code, ENT_QUOTES, 'UTF-8') !!}
                    </code>
                </s-code-example>
            @endforeach
        </div>

    @endif

@endif
