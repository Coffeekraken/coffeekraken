@php
    $titleStr = '';
@endphp

@if ($block->see)

    <a href="#related-{{ $block->name }}" title="Related resource(s)" class="s-bg:complementary s-tc:complementary-foreground s-display:block s-p:30 s-border:radius s-mbe:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;This {{ $block->type }} make use of related resource(s).
    <a>

@endif

@if ($block->description)

    @php 
    $titleStr = $block->name;
    if ($block->get) {
        $titleStr = '<span class="s-tc:accent">get</span> ' . $titleStr;
    } 
    @endphp

    <{{ $isFirst ? 'h1' : 'h3'}} id="{{ $block->name }}" class="s-typo:{{ $isFirst ? 'h1' : 'h3 s-mbs:100'}} s-mbe:30 {{ $isFirst ? 's-tc:accent' : '' }}">
        {!! $titleStr !!}
    </{{ $isFirst ? 'h1' : 'h3'}}>
    

    <p class="s-typo:p s-mbe:50">{{ $block->description }}</p>
@endif

@if ($block->import)

    <h4 id="import-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:import s-tc:accent"></i>&nbsp;&nbsp;Import
    </h4>

    <s-code-example class="s-mbe:50">
        <code hidden lang="js">
            {{ $block->import }}
        </code>       
    </s-code-example>
@endif

@if ($block->example)

    <h4 id="example-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:example s-tc:accent"></i>&nbsp;&nbsp;Example
    </h4>

    <s-code-example class="s-mbe:50">
        @foreach ($block->example as $example)
            <code hidden lang="{{ $example->language }}">
                {{  $example->code }}                     
            </code>       
        @endforeach
    </s-code-example>
@endif

@if ($block->feature)

    <h4 id="features-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;Features
    </h4>

    <ul class="s-list:ul:accent s-mbe:50">
        @foreach ($block->feature as $feature)
            <li class="s-typo:p">
                {{ $feature }}
            </li>
        @endforeach
    </ul>
@endif

@if ($block->param)
    <h4 id="parameters-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;Parameters
    </h4>

    <ol>
    @foreach ($block->param as $param)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:main-surface s-radius">
                <div class="s-flex-item:grow s-tc:accent s-p:30">
                    {{ $param->name }}
                </div>
                <div class="s-typo:bold s-p:30">
                    {{ implode(' | ', $param->type) }}
                </div>
                @if ($param->defaultStr)
                    <div class="s-tc:info s-p:30">
                        {{ $param->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:30">{{ $param->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->return)
    <h4 id="return-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:return s-tc:accent"></i>&nbsp;&nbsp;Return
    </h4>

    <header class="s-flex s-bg:main-surface s-radius">
        <div class="s-typo:bold s-p:30">
            {{ implode(' | ', $block->return->type) }}
        </div>
        @if ($block->return->defaultStr)
            <div class="s-tc:info s-p:30">
                {{ $block->return->defaultStr }}
            </div>
        @endif
    </header>
    <p class="s-typo:p s-p:30">{{ $block->return->description }}</p> 

@endif

@if ($block->setting)
    <h4 id="settings-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:setting s-tc:accent"></i>&nbsp;&nbsp;Settings
    </h4>

    <ol>
    @foreach ($block->setting as $setting)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:main-surface s-radius">
                <div class="s-flex-item:grow s-tc:accent s-p:30">
                    {{ $setting->name }}
                </div>
                <div class="s-typo:bold s-p:30">
                    {{ implode(' | ', $setting->type) }}
                </div>
                @if ($setting->defaultStr)
                    <div class="s-tc:info s-p:30">
                        {{ $setting->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:30">{{ $setting->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->props)
    <h4 id="properties-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:list-ul s-tc:accent"></i>&nbsp;&nbsp;properties
    </h4>

    <ol>
    @foreach ($block->props as $prop)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:main-surface s-radius">
                <div class="s-flex-item:grow s-tc:accent s-p:30">
                    {{ $prop->name }}
                </div>
                <div class="s-typo:bold s-p:30">
                    {{ implode(' | ', $prop->type) }}
                </div>
                @if ($prop->defaultStr)
                    <div class="s-tc:info s-p:30">
                        {{ $prop->defaultStr }}
                    </div>
                @endif
            </header>
            <p class="s-typo:p s-p:30">{{ $prop->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif

@if ($block->todo)
    <h4 id="todo-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:tasks s-tc:accent"></i>&nbsp;&nbsp;Todo
    </h4>

    <ul class="s-list:ul:accent s-mbe:50">
        @foreach ($block->todo as $todo)
            @php
                $todoColor = 'warning';
                if ($todo->priority == 'low') {
                    $todoColor = 'success';
                }
                if ($todo->priority == 'high') {
                    $todoColor = 'error';
                }
            @endphp
            <li class="s-typo:p">
                <span class="s-tooltip-container">
                    <i class="s-icon:todo s-tc:{{ $todoColor }}"></i>
                    <div class="s-tooltip:nowrap">
                        {{ $todo->priority }} priority
                    </div>
                </span>&nbsp;&nbsp;{{ $todo->description }}
            </li>
        @endforeach
    </ul>
@endif

@if ($block->see)

    <h4 id="related-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;Related resource(s)
    </h4>

    @foreach ($block->see as $see)
        <section class="s-bg:main-surface s-radius s-border:radius">
            @if ($see->og)
                <div class="s-layout:122">
                    <div class="s-ratio:1 s-bg:accent s-border:radius">
                        <img src="{{ $see->og->ogImage->url }}" />
                    </div>
                    <div class="s-p:50">
                        <h5 class="s-typo:h3 s-mbe:30">{{ $see->og->ogTitle }}</h5>
                        <p class="s-typo:p s-mbe:30">
                            {{ $see->og->ogDescription}}
                        </p>
                        <a class="s-btn s-color:info" href="{{ $see->og->ogUrl }}" title="{{ $see->og->ogTitle }}" target="_blank">
                            Check that out!
                        </a>
                    </div>
                </div>
            @endif
        </section>
    @endforeach

@endif