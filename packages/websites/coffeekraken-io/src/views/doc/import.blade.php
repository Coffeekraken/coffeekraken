@if ($block->import)

    <h4 id="import-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:import s-color:accent"></i>&nbsp;&nbsp;Import
    </h4>

    <s-code-example class="s-mb:50" default-style>
        <template lang="js">
            {{ $block->import }}
        </template>       
    </s-code-example>
@endif