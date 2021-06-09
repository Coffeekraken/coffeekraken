@extends('layouts.main')
@section('title', $title)

@section('content')
    
    @foreach ( $docs as $docblocks )
        @php $firstBlock = $docblocks[0]; @endphp
    @endforeach

    @php
        $statusColor = 'info';
        if ($firstBlock->status == 'alpha') $statusColor = 'error';
        if ($firstBlock->status == 'stable') $statusColor = 'success';
    @endphp

    <div id="doc">

        <header class="__banner s-py:60 s-bg-complementary">

            <div class="s-container s-grid-12">
                <div>
                    <span class="s-font:30">
                        <span class="s-badge:pill:accent->{{ $statusColor }}">{{ $firstBlock->status ? $firstBlock->status : 'beta' }}</span>
                    </span>
                    <h1 class="s-h1 s-mb:20 s-mt:20">
                        {{ $firstBlock->name }}

                        <span class="s-color:accent s-font:30">Since {{ $firstBlock->since }}</span>
                    </h1>
                    <h3 class="s-h3">
                        {{ $firstBlock->namespace }}
                    </h3>
                    <br />
                    @if ($firstBlock->platform)
                        @foreach ($firstBlock->platform as $key => $platform)
                            <i class="platform-{{ $key }}"></i>
                        @endforeach
                    @endif
                </div>

                <div class="s-text:right">
                    
                    <div class="__author s-flex:align-center">
                        <div class="s-flex-item:grow">
                            <a href="{{ $firstBlock->author->url ? $firstBlock->author->url : $firstBlock->author->email }}" target="_blank">
                                <h4 class="s-h5 s-color:accent">
                                    Author
                                </h4>
                                <p class="s-font:60">
                                    {{ $firstBlock->author->name }}
                                </p>
                            </a>
                        </div>
                        <div class="s-flex-item s-pl:20">
                            <a href="{{ $firstBlock->author->url ? $firstBlock->author->url : $firstBlock->author->email }}" target="_blank">
                                <span class="s-avatar s-font:100">
                                    <img src="https://www.gravatar.com/avatar/{{ md5($firstBlock->author->email) }}" alt="{{ $firstBlock->author->name }}" />
                                </span>
                            </a>
                        </div>
                    </div>
                    @if ($firstBlock->contributor)
                        <div class="__contributors">
                            <h4 class="s-h6 s-color:complementary s-mt:30 s-mb:10">
                                {{ count($firstBlock->contributor) }} Contributor{{ count($firstBlock->contributor) > 1 ? 's' : '' }}
                            </h4>
                            @foreach ($firstBlock->contributor as $contributor)
                                <a href="{{ $contributor->url ? $contributor->url : $contributor->email }}" target="_blank">
                                    <span class="s-avatar s-font:80">
                                        <img src="https://www.gravatar.com/avatar/{{ md5($contributor->email) }}" alt="{{ $contributor->name }}" />
                                    </span>
                                </a>                                
                            @endforeach
                        </div>
                    @endif
                    <a class="s-btn:complementary:gradient s-mt:20" href="https://github.com/coffeekraken" target="_blank" title="Contribute to the project">
                        Contribute to the project
                    </a>

                </div>
            </div>

        </header>

        <section class="__toolbar s-py:40 s-bg:ui:background">

            <div class="s-container">

                <div class="s-grid-12">

                    <div class="s-font:40">
                        <span>{{ $firstBlock->name }}</span>
                        &nbsp;&nbsp;
                        <span class="s-font:30">
                            <span class="s-badge:pill:accent->{{ $statusColor }}">{{ $firstBlock->status ? $firstBlock->status : 'beta' }}</span>
                        </span>
                        &nbsp;&nbsp;
                        @if ($firstBlock->platform)
                            @foreach ($firstBlock->platform as $key => $platform)
                                <i class="platform-{{ $key }}"></i>
                            @endforeach
                        @endif
                    </div>

                    <div class="s-text:right">

                        <a class="s-btn:complementary" href="https://olivierbossel.com" title="Share the love" target="_blank">
                            <i class="s-icon:heart"></i>
                        </a>
                        &nbsp;
                        &nbsp;
                        <a class="s-btn:error" href="https://olivierbossel.com" title="Share the love" target="_blank">
                            <i class="s-icon:fire"></i>
                        </a>
                        &nbsp;
                        &nbsp;
                        <a class="s-btn:accent" href="https://olivierbossel.com" title="Share the love" target="_blank">
                            <i class="s-icon:user"></i>
                            &nbsp;
                            <span>Join us!</span>
                        </a>

                    </div>

                </div>

            </div>

        </section>

        <section class="s-container s-py:80">

            @foreach ( $docs as $docblocks )

                <section class="s-grid-122">

                    <nav class="__nav">
                        
                        <s-activate class="__nav-group s-mb:30" id="doc-intro" toggle save-state>             
                            <h3 class="s-h3">
                                <span class="__nav-group-toggle"></span>
                                {{ $firstBlock->type }}
                            </h3>
                        </s-activate>
                        <ul class="s-list:ul">
                            @if ($firstBlock->description)
                                <li class="s-font:40">
                                    <a href="#description" title="Description">
                                        Description
                                    </a>
                                </li>
                            @endif
                            @if ($firstBlock->feature)
                                <li class="s-font:40">
                                    <a href="#features" title="Features">
                                        Features
                                    </a>
                                </li>
                            @endif
                            @if ($firstBlock->example)
                                <li class="s-font:40">
                                    <a href="#example" title="Example">
                                        Example
                                    </a>
                                </li>
                            @endif
                        </ul>

                        @if ($firstBlock->setting)

                            <s-activate class="__nav-group s-mb:30 s-mt:50" id="doc-settings" toggle save-state>
                                <h3 class="s-h3">
                                    <span class="__nav-group-toggle"></span>
                                    Settings
                                </h3>
                            </s-activate>
                            <ul class="s-list:ul">
                                @foreach ($firstBlock->setting as $setting)
                                    <li class="s-font:40">
                                        <a href="#setting-{{ $setting->name }}" title="{{ $setting->name }} setting">
                                            <span class="s-color:success">{{ $setting->type }}</span> {{ $setting->name }}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>

                        @endif

                        @php
                            $methods = array_filter($docblocks, function($block, $i) {
                                if ($i <= 0) return false;
                                if ($block->private) return false;
                                if (strtolower($block->type) != 'function') return false;
                                return true;
                            }, ARRAY_FILTER_USE_BOTH);
                        @endphp
                        @if (count($methods))

                            <s-activate class="__nav-group s-mb:30 s-mt:50" id="doc-methods" toggle save-state>
                                <h3 class="s-h3">
                                    <span class="__nav-group-toggle"></span>
                                    Methods
                                </h3>
                            </s-activate>
                            <ul class="s-list:ul">
                                @foreach ($methods as $block)
                                    <li class="s-font:40">
                                        <a href="#method-{{ $block->name }}" title="{{ $block->name }} method">
                                            {{ $block->name }} 
                                        </a>
                                    </li>
                                @endforeach
                            </ul>

                        @endif

                        @php
                            $props = array_filter($docblocks, function($block, $i) {
                                if ($i <= 0) return false;
                                if ($block->private) return false;
                                if (strtolower($block->type) == 'function') return false;
                                return true;
                            }, ARRAY_FILTER_USE_BOTH);
                        @endphp
                        @if (count($props))

                            <s-activate class="__nav-group s-mb:30 s-mt:50" id="doc-props" toggle save-state>
                                <h3 class="s-h3">
                                    <span class="__nav-group-toggle"></span>
                                    Properties
                                </h3>
                            </s-activate>
                            <ul class="s-list:ul">
                                @foreach ($props as $prop)                                
                                    <li class="s-font:40">
                                        <a href="#property-{{ $prop->name }}" title="{{ $prop->name }} property">
                                            {!! $prop->get ? '<span class="s-color:accent">get</span>' : '' !!}{!! $prop->set ? '|<span class="s-color:accent">set</span>' : '' !!} {{ $prop->name }}
                                        </a>
                                    </li>
                                @endforeach
                            </ul>

                        @endif

                    </nav>

                    <div>

                        @foreach ( $docblocks as $block )
                            
                            @if ($block->private) @continue @endif

                            @if ($block->description)
                                <h2 id="description" class="s-h2 s-mb:30">{{ $block->name }}</h2>
                                <p class="s-p s-mb:50">{{ $block->description }}</p>
                            @endif

                            @if ($block->feature)

                                <h2 id="features" class="s-h2 s-mb:30">Features</h2>

                                <ul class="s-list:ul s-mb:50">
                                    @foreach ($block->feature as $feature)
                                        <li class="s-p">
                                            {{ $feature }}
                                        </li>
                                    @endforeach
                                </ul>
                            @endif

                            @if ($block->example)

                                <h2 id="example" class="s-h2 s-mb:40">Example</h2>

                                <s-code-example>
                                @foreach ($block->example as $example)
                                    <code language="{{ $example->language }}">
                                        {{  $example->code }}                     
                                    </code>       
                                @endforeach
                                </s-code-example>
                            @endif

                            <pre>
                        @php
                    var_dump($block);
                @endphp
                </pre>

                        @endforeach

                    </div>

                </div>

            @endforeach

        </section>

    </div>

@endsection
