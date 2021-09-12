<s-code-example more-action="{{ $moreAction }}" lines="{{ $lines or 9999999 }}">
    @foreach($examples as $k => $example)

        <template lang="{{ $example->language or $k }}">
{!! $example->code or $example !!}
        </template>
    @endforeach
</s-code-example>

<div class="s-until:sibling:mounted">
    <i class="s-loader:spinner s-ui:accent"></i>
    &nbsp;
    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
</div>