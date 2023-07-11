@if (isset($block->install))

    <h4 id="install-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:install s-tc:accent"></i>&nbsp;&nbsp;Install
    </h4>

    <s-code-example class="" >
        @foreach ($block->install as $install)
            <template lang="{{ $install->language }}">
                {{ $install->code }}
            </template>
        @endforeach
    </s-code-example>
@endif
