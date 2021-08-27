@if ($block->example)

    <h4 id="example-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:example s-color:accent"></i>&nbsp;&nbsp;Example
    </h4>

    <s-code-example class="s-mb:50">
        @foreach ($block->example as $example)
            <code lang="{{ $example->language }}">
                {!! html_entity_decode($example->code, ENT_QUOTES, 'UTF-8') !!}                     
            </code>       
        @endforeach
    </s-code-example>
@endif