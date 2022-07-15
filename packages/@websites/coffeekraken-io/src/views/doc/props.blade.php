@if ($block->props)
    <h4 id="properties-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;Properties
    </h4>

    <ol class="">
        @foreach ($block->props as $prop)
            <li class="s-font:40 s-mbe:30">
                <header class="s-flex s-bg:main-surface s-radius">
                    <div class="s-flex-item:grow s-tc:accent s-p:30">
                        {{ $prop->name }}
                    </div>
                    <div class="s-typo:bold s-p:30">
                        {{ implode(' | ', $prop->type) }}
                    </div>
                    @if ($prop->defaultStr)
                        <div class="s-tc:info s-p:30">
                            {{ $prop->defaultStr }}
                        </div>
                    @endif
                </header>
                <p class="s-typo:p s-format:text s-p:30">{!! \Sugar\markdown\toHtml($prop->description) !!}</p>
            </li>
        @endforeach
    </ol>
@endif
