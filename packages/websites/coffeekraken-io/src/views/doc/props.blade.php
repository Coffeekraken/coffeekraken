@if ($block->props)
    <h4 id="properties-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:list-ul s-color:accent"></i>&nbsp;&nbsp;properties
    </h4>

    <ol>
    @foreach ($block->props as $prop)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-p:20">
                    {{ $prop->name }}
                </div>
                <div class="s-typo:bold s-p:20">
                    {{ implode(' | ', $prop->type) }}
                </div>
                @if ($prop->defaultStr)
                    <div class="s-color:info s-p:20">
                        {{ $prop->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:20">{{ $prop->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif