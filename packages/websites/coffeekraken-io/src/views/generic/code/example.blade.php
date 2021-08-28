<s-code-example>
    @foreach($examples as $k => $example)
        <template lang="{{ $k }}">
{!! $example !!}
        </template>
    @endforeach
</s-code-example>

<div class="s-until:sibling:mounted">
    <i class="s-loader:spinner s-ui:accent"></i>
    &nbsp;
    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
</div>