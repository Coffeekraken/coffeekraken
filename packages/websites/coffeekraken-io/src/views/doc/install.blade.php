@if ($block->install)

    <h4 id="install-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:install s-color:accent"></i>&nbsp;&nbsp;Install
    </h4>

    <s-code-example class="s-mb:50" default-style>
        <template lang="bash">
            {{ $block->install }}
        </template>       
    </s-code-example>
@endif