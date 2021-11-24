@if ($block->setting)
    <h4 id="settings-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:setting s-tc:accent"></i>&nbsp;&nbsp;Settings
    </h4>

    <ol class="s-mbe:100">
    @foreach ($block->setting as $setting)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex:align-center s-bg:main-surface s-radius s-depth:100 s-mbe:20">
                <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">
                    {{ $setting->name }}
                </div>
                <div>
                    <div class="s-typo:code">
                        {{ \Sugar\string\toString($setting->default) }}
                    </div>
                </div>
                <div class="s-typo:bold s-p:30 s-tc:info">
                    {{ implode($setting->type,'|') }}
                </div>
            </header>
            <p class="s-typo:p s-pi:30 s-pb:20">{!! $setting->description !!}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif