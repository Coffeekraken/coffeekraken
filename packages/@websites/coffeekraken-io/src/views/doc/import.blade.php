@if (isset($block->import))

    <h4 id="import-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:import s-tc:accent"></i>&nbsp;&nbsp;Import
    </h4>

    <s-code-example class="">
        <template lang="js">
            {{ $block->import }}
        </template>
    </s-code-example>
@endif
