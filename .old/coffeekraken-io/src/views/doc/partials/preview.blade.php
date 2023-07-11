@if (isset($block->example))

    @php
        $htmlExamples = array_filter($block->example, function ($item) {
            if ($item->language === 'html') {
                return true;
            }
            return false;
        });
    @endphp

    @if (count($htmlExamples))

        <h4 id="preview-{{ $block->name }}" class="s-typo:h4 s-mb:50">
            <i class="s-icon:preview s-tc:accent"></i>&nbsp;&nbsp;Preview
        </h4>
        
        <div class="s-format:none s-rhythm:none preview s-mbe:50">
            @foreach ($block->example as $example)
                @if (isset($example->title))
                    <h4 class="s-typo:h3 s-tc:accent s-mb:50">{!! ucfirst($example->title) !!}</h4>
                @endif
                @if (isset($example->description))
                    <p class="s-typo:p s-format:text">{!! \Sugar\markdown\toHtml($example->description) !!}</p>
                @endif
                @if ($example->language == 'html')
                    <div class="preview-html">
                        {!! $example->code !!}
                    </div>
                @endif
                <s-code-example class="s-mbs:50" >
                    <template language="{{ $example->language }}">
                        {!! html_entity_decode($example->code, ENT_QUOTES, 'UTF-8') !!}
                    </template>
                </s-code-example>
                <div class="s-until:sibling:mounted s-code-example-loader">
                    <i class="s-loader:square-dots s-color:accent"></i>
                    &nbsp;
                    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
                </div>
            @endforeach
        </div>

    @endif

@endif
