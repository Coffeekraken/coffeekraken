<a class="__section-title s-flex" s-activate toggle trigger="click,anchor"
    href="#{{ \Sugar\string\idCompliant($block->type . '-' . $block->name) }}">

    <div class="s-flex-item:grow">
        @if ($block->type == 'Function')

            @if ($block->static)
                <span class="s-tc:accent">static</span>
            @endif
            {!! $block->name !!}({!! $block->param ? '<span class="s-tc:accent">...</span>' : '' !!})
        @else
            {!! $block->name !!}
        @endif
    </div>
    <div>
        <span class="s-tc:info s-mie:20">
            {{ $block->type }}
        </span>
        {{-- <i class="s-icon:link s-tc:main-surface"></i> --}}
    </div>

</a>
