@if ($block->install)

    <h4 id="install-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:install s-tc:accent"></i>&nbsp;&nbsp;Install
    </h4>

    <s-code-example class="">
        <template lang="bash">
            {{ $block->install }}
        </template>
    </s-code-example>
@endif
