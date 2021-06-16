@php
    $titleStr = 'wefwef';
@endphp

@if ($block->see)

<section class="s-bg:ui-surface">
        @foreach ($block->see as $see)
            @if ($see->og)
                <div class="s-grid:122">
                    <img src="{{ $see->og->ogImage->url }}" style="width: 100%;" />
                    <div class="s-pd:30">
                        <h5 class="s-h5 s-mb:30">{{ $see->og->ogTitle }}</h5>
                        <p class="s-p s-mb:30">
                            {{ $see->og->ogDescription}}
                        </p>
                        <a class="s-btn:info" href="{{ $see->og->ogUrl }}" title="{{ $see->og->ogTitle }}" target="_blank">
                            See more
                        </a>
                    </div>
                </div>
            @endif
        @endforeach
</section>

@endif

@if ($block->description)

    @php 
    $titleStr = $block->name;
    if ($block->get) {
        $titleStr = '<span class="s-color:accent">get</span> ' . $titleStr;
    } 
    @endphp

    <{{ $isFirst ? 'h1' : 'h3'}} id="{{ $block->name }}" class="s-{{ $isFirst ? 'h1' : 'h3'}} s-mb:30 {{ $isFirst ? 's-color:accent' : '' }}">
        {!! $titleStr !!}
    </{{ $isFirst ? 'h1' : 'h3'}}>
    

    <p class="s-p s-mb:50">{{ $block->description }}</p>
@endif

@if ($block->feature)

    <h4 id="features-{{ $block->name }}" class="s-h4 s-mb:30">Features</h4>

    <ul class="s-list:ul s-mb:50">
        @foreach ($block->feature as $feature)
            <li class="s-p">
                {{ $feature }}
            </li>
        @endforeach
    </ul>
@endif

@if ($block->example)

    <h4 id="example-{{ $block->name }}" class="s-h4 s-mb:40">Example</h4>

    <s-code-example class="s-mb:50" default-style>
        @foreach ($block->example as $example)
            <template lang="{{ $example->language }}">
                {{  $example->code }}                     
            </template>       
        @endforeach
    </s-code-example>
@endif

@if ($block->param)
    <h4 id="parameters-{{ $block->name }}" class="s-h4 s-mb:30">Parameters</h4>

    <ol>
    @foreach ($block->param as $param)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-pd:20">
                    {{ $param->name }}
                </div>
                <div class="s-bold s-pd:20">
                    {{ implode(' | ', $param->type) }}
                </div>
                @if ($param->defaultStr)
                    <div class="s-color:info s-pd:20">
                        {{ $param->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-p s-pd:20">{{ $param->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->setting)
    <h4 id="settings-{{ $block->name }}" class="s-h4 s-mb:30">Settings</h4>

    <ol>
    @foreach ($block->setting as $setting)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-pd:20">
                    {{ $setting->name }}
                </div>
                <div class="s-bold s-pd:20">
                    {{ implode(' | ', $setting->type) }}
                </div>
                @if ($setting->defaultStr)
                    <div class="s-color:info s-pd:20">
                        {{ $setting->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-p s-pd:20">{{ $setting->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif