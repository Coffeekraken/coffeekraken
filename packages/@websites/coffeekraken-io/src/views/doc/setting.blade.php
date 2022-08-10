@if (isset($block->setting))
    <h4 id="settings-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:setting s-tc:accent"></i>&nbsp;&nbsp;Settings
    </h4>

    <ol>
        @foreach ($block->setting as $setting)
            <li class="s-font:40 s-mbe:30">
                <header class="s-flex:align-center s-bg:main-surface s-radius s-mbe:20">
                    <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">
                        {{ $setting->name }}
                    </div>
                    <div>
                        <div class="s-typo:code">
                            {{ \Sugar\string\toString($setting->default) }}
                        </div>
                    </div>
                    <div class="s-p:30">
                        @include('doc.partials.paramType', ['type' => $setting->type])
                    </div>
                </header>
                <p class="s-typo:p s-format:text s-pi:30 s-pb:20">{!! \Sugar\markdown\toHtml($setting->description) !!}</p>
                @if (isset($setting->type->interface))
                    <section class="__toggle-content">
                        @include('doc.interfaceDefinition', ['interface' => $setting->type->interface])
                        </section>
                @endif
            </li>
        @endforeach
    </ol>
@endif
