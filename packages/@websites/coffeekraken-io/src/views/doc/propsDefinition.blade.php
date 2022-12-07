<ol class="">
    @foreach ((array) $definition as $key => $param)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex:align-center s-bg:main-surface s-radius s-mbe:20">
                <div class="s-flex-item:grow s-tc:accent s-p:30">
                    {{ $key }} @if (isset($param->required))
                        <span class="s-tooltip-container">
                            <span class="s-tc:error s-font:bold">*</span>
                            <div class="s-tooltip s-color:error">
                                Required
                            </div>
                        </span>
                    @endif
                </div>
                <div>
                    <div class="{{ $param->values ? 's-dropdown-container' : '' }}" tabindex="-1">
                        <div class="s-typo:code">
                            {{ str_replace($shared->config->storage->package->rootDir.'/', '', isset($param->default) ? \Sugar\string\toString($param->default) : '') }}
                            @if (isset($param->values))
                                <i class="s-icon:arrow-down"></i>
                            @endif
                        </div>
                        @if (isset($param->values))
                            <ul class="s-dropdown:bottom-end">    
                                @foreach ($param->values as $value)
                                    <li class="s-dropdown-item" onclick="navigator.clipboard.writeText('{{ $value }}');">{{ $value }}<i class="s-mis:10 s-icon:ui-copy"></i></li>
                                @endforeach
                            </ul>
                        @endif
                    </div>
                </div>
                <div class="s-typo:bold s-p:30 s-tc:info">
                    @if (isset($param->type->raw))
                        {{ \Sugar\string\toString($param->type->raw) }}
                    @elseif (isset($param->type->type))
                        {{ \Sugar\string\toString($param->type->type) }}
                    @endif
                </div>
            </header>
            @if (isset($param->description))
                <p class="s-typo:p s-format:text s-p:30">{!! \Sugar\markdown\toHtml($param->description) !!}</p>
            @else
                <p class="s-typo:p s-format:text s-p:30">No description for now...</p>
            @endif
        </li>
    @endforeach
</ol>