@if ($block->setting)
    <h4 id="settings-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:setting s-tc:accent"></i>&nbsp;&nbsp;Settings
    </h4>

    <ol>
    @foreach ($block->setting as $setting)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-tc:accent s-p:20">
                    {{ $setting->name }}
                </div>
                <div class="s-typo:bold s-p:20">
                    {{ implode(' | ', $setting->type) }}
                </div>
                @if ($setting->defaultStr)
                    <div class="s-tc:info s-p:20">
                        {{ $setting->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:20">{!! $setting->description !!}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif