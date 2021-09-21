@if ($block->param)
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:list-ul s-color:accent"></i>&nbsp;&nbsp;Parameters
    </h4>

    <ol>
    @foreach ($block->param as $param)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-p:20">
                    {{ $param->name }}
                </div>
                <div class="s-typo:bold s-p:20">
                    {{ implode(' | ', $param->type) }}
                </div>
                @if ($param->defaultStr)
                    <div class="s-color:info s-p:20">
                        {{ $param->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:20">{{ $param->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif