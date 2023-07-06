<s-code-example more-action="{{ $moreAction }}">
    @foreach ($examples as $k => $example)
        <template language="{{ $example->language or $k }}">
            {!! $example->code or $example !!}
        </template>
    @endforeach
</s-code-example>