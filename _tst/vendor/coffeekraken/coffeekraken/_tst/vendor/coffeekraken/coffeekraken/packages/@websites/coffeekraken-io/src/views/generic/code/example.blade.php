<s-code-example more-action="{{ $moreAction }}">
    @foreach ($examples as $k => $example)
        <template lang="{{ $example->language or $k }}">
            {!! $example->code or $example !!}
        </template>
    @endforeach
</s-code-example>

{{-- <div class="s-until:sibling:mounted s-code-example-loader">
    <i class="s-loader:square-dots s-color:accent"></i>
    &nbsp;
    <p class="s-typo:p s-display:inline-block">Loading code example. Please wait...</p>
</div> --}}
