@if ($block->install)

    <h4 id="install-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:install s-tc:accent"></i>&nbsp;&nbsp;Install
    </h4>

    <s-code-example class="s-mbe:100">
        <template lang="bash">
            {{ $block->install }}
        </template>       
    </s-code-example>
@endif