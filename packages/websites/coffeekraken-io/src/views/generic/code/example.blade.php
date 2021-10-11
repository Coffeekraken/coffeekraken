<s-code-example more-action="{{ $moreAction }}"
    @if ($lines)
        lines="{{ $lines }}"
    @endif
>
    @foreach($examples as $k => $example)
        <template lang="{{ $example->language or $k }}">
{!! $example->code or $example !!}
        </template>
    @endforeach
</s-code-example>

<div class="s-until:sibling:mounted">
    <i class="s-loader:spinner s-color:accent"></i>
    &nbsp;
    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
</div>