@if ($block->install)

    <h4 id="install-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:install s-color:accent"></i>&nbsp;&nbsp;Install
    </h4>

    <s-code-example class="s-mbe:50" default-style>
        <template lang="bash">
            {{ $block->install }}
        </template>       
    </s-code-example>
@endif