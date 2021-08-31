<s-code-example>
    @foreach($examples as $k => $example)
        <template lang="{{ $example->language }}">
@if ($lines)
{!! implode(PHP_EOL, array_slice(explode(PHP_EOL, $example->code), 0, $lines)) !!}
{!! $example->language == 'html' ? '<!-- more example(s) bellow -->' : '// more example(s) bellow' !!}
@else
{!! $example->code !!}
@endif
        </template>
    @endforeach
</s-code-example>

<div class="s-until:sibling:mounted">
    <i class="s-loader:spinner s-ui:accent"></i>
    &nbsp;
    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
</div>