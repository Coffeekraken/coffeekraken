@if ($block->interface)
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:list-ul s-color:accent"></i>&nbsp;&nbsp;Interface
    </h4>

    <ol>
    @foreach ((array)$block->interface->definition as $key => $param)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-p:20">
                    {{ $key }}
                </div>
                <div class="s-typo:bold s-p:20">
                    {{ $param->type }}
                </div>
                @if ($param->default != null or $param->default == 0)
                    <div class="s-color:info s-p:20">
                        {{ $param->default }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:20">{!! $param->description !!}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif