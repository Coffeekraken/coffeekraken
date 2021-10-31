@if ($block->interface)
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;Interface
    </h4>

    <ol>
    @foreach ((array)$block->interface->definition as $key => $param)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:main-surface s-radius">
                <div class="s-flex-item:grow s-tc:accent s-p:30">
                    {{ $key }}
                </div>
                <div class="s-typo:bold s-p:30">
                    {{ $param->type }}
                </div>
                @if ($param->default != null or $param->default == 0)
                    <div class="s-tc:info s-p:30">
                        {{ $param->default }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:30">{!! $param->description !!}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif