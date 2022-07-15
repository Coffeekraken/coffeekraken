@if ($block->example)

    <h4 id="example-{{ \Sugar\string\idCompliant($block->name) }}" class="s-typo:h4 s-mbs80 s-mbe:50 s-mbs:50">
        <i class="s-icon:example s-tc:accent"></i>&nbsp;&nbsp;Example
    </h4>

    <s-code-example class="" @if ($lines)
        lines="{{ $lines }}"
@endif>
@foreach ($block->example as $example)
    <code lang="{{ $example->language }}">
        {!! html_entity_decode($example->code, ENT_QUOTES, 'UTF-8') !!}
    </code>
@endforeach
</s-code-example>
@endif
