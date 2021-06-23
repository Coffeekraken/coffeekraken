@php
    $titleStr = 'wefwef';
@endphp

@if ($block->see)

    <a href="#related-{{ $block->name }}" title="Related resource(s)" class="s-bg:complementary s-display:block s-pd:30 s-border:radius s-mb:50">
        <i class="s-icon:box s-color:accent"></i>&nbsp;&nbsp;This {{ $block->type }} make use of related resource(s).
    <a>

@endif

@if ($block->description)

    @php 
    $titleStr = $block->name;
    if ($block->get) {
        $titleStr = '<span class="s-color:accent">get</span> ' . $titleStr;
    } 
    @endphp

    <{{ $isFirst ? 'h1' : 'h3'}} id="{{ $block->name }}" class="s-typo:{{ $isFirst ? 'h1' : 'h3 s-mt:100'}} s-mb:30 {{ $isFirst ? 's-color:accent' : '' }}">
        {!! $titleStr !!}
    </{{ $isFirst ? 'h1' : 'h3'}}>
    

    <p class="s-typo:p s-mb:50">{{ $block->description }}</p>
@endif

@if ($block->feature)

    <h4 id="features-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:box s-color:accent"></i>&nbsp;&nbsp;Features
    </h4>

    <ul class="s-list:ul:accent s-mb:50">
        @foreach ($block->feature as $feature)
            <li class="s-typo:p">
                {{ $feature }}
            </li>
        @endforeach
    </ul>
@endif

@if ($block->import)

    <h4 id="import-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:import s-color:accent"></i>&nbsp;&nbsp;Import
    </h4>

    <s-code-example class="s-mb:50" default-style>
        <template lang="js">
            {{ $block->import }}
        </template>       
    </s-code-example>
@endif

@if ($block->example)

    <h4 id="example-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:example s-color:accent"></i>&nbsp;&nbsp;Example
    </h4>

    <s-code-example class="s-mb:50" default-style>
        @foreach ($block->example as $example)
            <template lang="{{ $example->language }}">
                {{  $example->code }}                     
            </template>       
        @endforeach
    </s-code-example>
@endif

@if ($block->param)
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:list-ul s-color:accent"></i>&nbsp;&nbsp;Parameters
    </h4>

    <ol>
    @foreach ($block->param as $param)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-pd:20">
                    {{ $param->name }}
                </div>
                <div class="s-typo:bold s-pd:20">
                    {{ implode(' | ', $param->type) }}
                </div>
                @if ($param->defaultStr)
                    <div class="s-color:info s-pd:20">
                        {{ $param->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-pd:20">{{ $param->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->return)
    <h4 id="return-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:return s-color:accent"></i>&nbsp;&nbsp;Return
    </h4>

    <header class="s-flex s-bg:ui-surface">
        <div class="s-typo:bold s-pd:20">
            {{ implode(' | ', $block->return->type) }}
        </div>
        @if ($block->return->defaultStr)
            <div class="s-color:info s-pd:20">
                {{ $block->return->defaultStr }}
            </div>
        @endif
    </header>
    <p class="s-typo:p s-pd:20">{{ $block->return->description }}</p> 

@endif

@if ($block->setting)
    <h4 id="settings-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:setting s-color:accent"></i>&nbsp;&nbsp;Settings
    </h4>

    <ol>
    @foreach ($block->setting as $setting)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-pd:20">
                    {{ $setting->name }}
                </div>
                <div class="s-typo:bold s-pd:20">
                    {{ implode(' | ', $setting->type) }}
                </div>
                @if ($setting->defaultStr)
                    <div class="s-color:info s-pd:20">
                        {{ $setting->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-pd:20">{{ $setting->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->props)
    <h4 id="propeters-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:list-ul s-color:accent"></i>&nbsp;&nbsp;propeters
    </h4>

    <ol>
    @foreach ($block->props as $prop)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-pd:20">
                    {{ $prop->name }}
                </div>
                <div class="s-typo:bold s-pd:20">
                    {{ implode(' | ', $prop->type) }}
                </div>
                @if ($prop->defaultStr)
                    <div class="s-color:info s-pd:20">
                        {{ $prop->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-pd:20">{{ $prop->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->see)

    <h4 id="related-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:box s-color:accent"></i>&nbsp;&nbsp;Related resource(s)
    </h4>

    @foreach ($block->see as $see)
        <section class="s-bg:ui-surface s-border:radius">
            @if ($see->og)
                <div class="s-grid:122">
                    <div class="s-ratio:1-1 s-bg:accent s-border:radius">
                        <img src="{{ $see->og->ogImage->url }}" />
                    </div>
                    <div class="s-pd:50">
                        <h5 class="s-typo:h3 s-mb:30">{{ $see->og->ogTitle }}</h5>
                        <p class="s-typo:p s-mb:30">
                            {{ $see->og->ogDescription}}
                        </p>
                        <a class="s-btn:info" href="{{ $see->og->ogUrl }}" title="{{ $see->og->ogTitle }}" target="_blank">
                            Check that out!
                        </a>
                    </div>
                </div>
            @endif
        </section>
    @endforeach

@endif