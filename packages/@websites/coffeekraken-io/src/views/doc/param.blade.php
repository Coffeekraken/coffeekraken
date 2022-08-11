@if (isset($block->param))
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;Parameters
    </h4>

    <ol class="">
        @foreach ($block->param as $param)
            <li class="s-font:40 s-mbe:30">
                <header class="s-flex:align-center s-bg:main-surface s-radius s-mbe:20">
                    <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">
                        {{ $param->name }}
                    </div>
                    <div>
                        <div class="s-typo:code">
                            @if (isset($param->defaul))
                                {{ str_replace($packageRoot.'/', '', \Sugar\string\toString($param->default)) }}
                            @endif
                        </div>
                    </div>
                    <div class="s-p:30">
                        @include('doc.partials.paramType', ['type' => $param->type])
                    </div>
                </header>
                <p class="s-typo:p s-format:text s-pi:30 s-pb:20">{!! \Sugar\markdown\toHtml($param->description) !!}</p>
                @if (isset($param->type->interface))
                    <section class="__toggle-content">
                        @include('doc.interfaceDefinition', ['interface' => $param->type->interface])
                        </section>
                @endif

            </li>
        @endforeach
    </ol>
@endif
