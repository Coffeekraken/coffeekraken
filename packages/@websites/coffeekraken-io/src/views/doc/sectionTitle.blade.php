{{-- {!! \Sugar\debug\pre($block) !!} --}}

<a class="__section-title s-flex" s-activate toggle trigger="click,anchor"
    href="#{{ \Sugar\string\idCompliant($block->id) }}">
    <div class="s-flex-item:grow">
        @if (isset($block->type) && $block->type->raw == 'Function')
            @if (isset($block->static))
                <span class="s-tc:accent">static</span>
            @endif
            {!! $block->name !!}({!! $block->param ? '<span class="s-tc:accent">...</span>' : '' !!})
        @else
            {!! $block->name !!}
        @endif
    </div>
    <div>
        <span class="s-tc:info s-mie:20">
            @if (isset($block->type))
                @include('doc.partials.paramType', ['type' => $block->type])
            @endif
        </span>
        {{-- <i class="s-icon:link s-tc:main-surface"></i> --}}
    </div>

</a>
