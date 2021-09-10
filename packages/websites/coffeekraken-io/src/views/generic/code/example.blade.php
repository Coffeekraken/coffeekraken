<s-code-example>
    @foreach($examples as $k => $example)

        <template lang="{{ $example->language or $k }}">
@if ($lines)
{!! implode(PHP_EOL, array_slice(explode(PHP_EOL, $example->code or $example), 0, $lines)) !!}
{!! ($example->language or $example) == 'html' ? '<!-- more example(s) bellow -->' : '// more example(s) bellow' !!}
{!! $example->code or $example !!}
@else
{!! $example->code or $example !!}
@endif
        </template>
    @endforeach
</s-code-example>

<div class="s-until:sibling:mounted">
    <i class="s-loader:spinner s-ui:accent"></i>
    &nbsp;
    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
</div>