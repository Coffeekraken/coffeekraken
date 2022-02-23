@if ($block->interface)
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;Interface
    </h4>

    <ol class="">
        @foreach ((array) $block->interface->definition as $key => $param)
            <li class="s-font:40 s-mbe:30">
                <header class="s-flex:align-center s-bg:main-surface s-radius s-mbe:20">
                    <div class="s-flex-item:grow s-tc:accent s-p:30">
                        {{ $key }} @if ($param->required)
                            *
                        @endif
                    </div>
                    <div>
                        <div class="s-typo:code">
                            {{ \Sugar\string\toString($param->default) }}
                        </div>
                    </div>
                    <div class="s-typo:bold s-p:30 s-tc:info">
                        {{ \Sugar\string\toString($param->type->type ? $param->type->type : $param->type) }}
                    </div>
                </header>
                <p class="s-typo:p s-format:text s-p:30">{!! \Sugar\markdown\toHtml($param->description) !!}</p>
            </li>
        @endforeach
    </ol>
@endif
