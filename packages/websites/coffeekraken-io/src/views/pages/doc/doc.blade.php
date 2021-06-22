@extends('layouts.main')
@section('title', $title)

@section('content')
    
    @php $firstBlock = $docblocks[0]; @endphp

    @php
        $statusColor = 'info';
        if ($firstBlock->status == 'alpha') $statusColor = 'error';
        if ($firstBlock->status == 'stable') $statusColor = 'success';
        if ($firstBlock->status == 'wip') $statusColor = 'error';
    @endphp

    <div id="doc">

        <header class="__banner s-py:60 s-bg:complementary">

            <div class="s-container s-grid:12">
                <div>
                    <span class="s-font:30">
                        <span class="s-badge:pill:{{ $statusColor }}">{{ $firstBlock->status ? $firstBlock->status : 'beta' }}</span>
                        &nbsp;&nbsp;<span class="s-color:accent s-font:30">Since {{ $firstBlock->since }}</span>
                    </span>
                    <h1 class="s-typo:h1 s-mb:20 s-mt:20">
                        {{ $firstBlock->name }}
                    </h1>
                    <h3 class="s-typo:p s-color:info">
                        {{ $firstBlock->namespace }}
                    </h3>
                    <br />
                    @if ($firstBlock->platform)
                        @foreach ($firstBlock->platform as $platform)
                            <i class="s-platform:{{ $platform->name }}"></i>
                        @endforeach
                    @endif
                </div>

                <div class="s-text:right">
                    
                    <div class="__author s-flex:align-center">
                        <div class="s-flex-item:grow">
                            <a href="{{ $firstBlock->author->url ? $firstBlock->author->url : $firstBlock->author->email }}" target="_blank">
                                <h4 class="s-typo:h5 s-color:accent">
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
                            <h4 class="s-typo:h6 s-color:complementary s-mt:30 s-mb:10">
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

        <section class="__toolbar s-py:40 s-bg:ui-background">

            <div class="s-container">

                <div class="s-grid:12">

                    <div class="s-font:40">
                        <span>{{ $firstBlock->name }}</span>
                        &nbsp;&nbsp;
                        <span class="s-font:30">
                            <span class="s-badge:pill:{{ $statusColor }}">{{ $firstBlock->status ? $firstBlock->status : 'beta' }}</span>
                        </span>
                        &nbsp;&nbsp;
                        @if ($firstBlock->platform)
                            @foreach ($firstBlock->platform as $platform)
                                <i class="s-platform:{{ $platform->name }}"></i>
                            @endforeach
                        @endif
                    </div>

                    <div class="s-text:right">

                        <a class="s-btn:complementary" href="https://olivierbossel.com" title="Share the love" target="_blank">
                            <i class="s-icon:heart"></i>
                        </a>
                        &nbsp;
                        &nbsp;
                        <div class="__toolbar-issue s-tooltip-container">
                            <a class="s-btn:error" href="https://olivierbossel.com" title="Share the love" target="_blank">
                                <i class="s-icon:fire"></i>
                            </a>
                            <div class="s-tooltip">
                                <div class="s-position:relative">
                                    <span class="s-avatar s-mb:40 s-display:block s-mx:auto" style="font-size: 120px">
                                        <img src="/src/img/kraken-avatar.png" alt="{{ $firstBlock->author->name }}" />
                                    </span>
                                    <p class="s-typo:p s-font:40 s-mb:30">
                                        Don't hesitate to declare an issue if something does not works as expected.
                                        <br />
                                        We are a community and this is what makes the strengh of this project.
                                    </p>
                                    <a class="s-btn:error:block s-mb:20 s-depth:50" href="https://olivierbossel.com" title="Share the love" target="_blank">
                                        Declare my issue on Github
                                    </a>
                                    <a class="s-btn:info:block" href="https://olivierbossel.com" title="Share the love" target="_blank">
                                        Talk about it on Discord
                                    </a>
                                </div>
                            </div>
                        </div>
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

            <section class="s-grid:122">

                <nav class="__nav">
                    
                    <s-activate class="__nav-group s-mb:30" id="doc-intro" toggle save-state>             
                        <h3 class="s-typo:h4">
                            <span class="__nav-group-toggle"></span>
                            {{ $firstBlock->type }}
                        </h3>
                    </s-activate>
                    <ul class="s-list:ul:icon:accent">
                        @if ($firstBlock->description)
                            <li class="s-font:40">
                                <i class="s-icon:info"></i>
                                <a href="#{{ $firstBlock->name }}" title="Description">
                                    Description
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->feature)
                            <li class="s-font:40">
                                <i class="s-icon:box"></i>
                                <a href="#features-{{ $firstBlock->name }}" title="Features">
                                    Features
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->import)
                            <li class="s-font:40">
                                <i class="s-icon:import"></i>
                                <a href="#import-{{ $firstBlock->name }}" title="Import">
                                    Import
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->example)
                            <li class="s-font:40">
                                <i class="s-icon:example"></i>
                                <a href="#example-{{ $firstBlock->name }}" title="Example">
                                    Example
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->param)
                            <li class="s-font:40">
                                <i class="s-icon:list-ul"></i>
                                <a href="#parameters-{{ $firstBlock->name }}" title="Parameters">
                                    Parameters
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->return)
                            <li class="s-font:40">
                                <i class="s-icon:return"></i>
                                <a href="#return-{{ $firstBlock->name }}" title="Return">
                                    Return
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->setting)
                            <li class="s-font:40">
                                <i class="s-icon:setting"></i>
                                <a href="#settings-{{ $firstBlock->name }}" title="Settings">
                                    Settings
                                </a>
                            </li>
                        @endif
                        @if ($firstBlock->see)
                            <li class="s-font:40">
                                <i class="s-icon:box"></i>
                                <a href="#related-{{ $firstBlock->name }}" title="Related resource(s)">
                                    Related resource(s)
                                </a>
                            </li>
                        @endif
                    </ul>

                    @php
                        $methods = array_filter($docblocks, function($block, $i) {
                            if ($i <= 0) return false;
                            if ($block->private) return false;
                            if ($block->name == 'constructor') return false;
                            if (strtolower($block->type) != 'function') return false;
                            return true;
                        }, ARRAY_FILTER_USE_BOTH);
                    @endphp
                    @if (count($methods))

                        <s-activate class="__nav-group s-mb:30 s-mt:50" id="doc-methods" toggle save-state>
                            <h3 class="s-typo:h3">
                                <span class="__nav-group-toggle"></span>
                                Methods
                            </h3>
                        </s-activate>
                        <ul class="s-list:ul:accent">
                            @foreach ($methods as $block)
                                <li class="s-font:40">
                                    <a href="#{{ $block->name }}" title="{{ $block->name }} method">
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
                            <h3 class="s-typo:h3">
                                <span class="__nav-group-toggle"></span>
                                Properties
                            </h3>
                        </s-activate>
                        <ul class="s-list:ul:accent">
                            @foreach ($props as $prop)                                
                                <li class="s-font:40">
                                    <a href="#{{ $prop->name }}" title="{{ $prop->name }} property">
                                        {!! $prop->get ? '<span class="s-color:accent">get</span>' : '' !!}{!! $prop->set ? '|<span class="s-color:accent">set</span>' : '' !!} {{ $prop->name }}
                                    </a>
                                </li>
                            @endforeach
                        </ul>

                    @endif

                </nav>

                <div>

                    @include('pages.doc.partials.block', ['block' => $firstBlock, 'isFirst' => true])

                    @php
                        $methods = array_filter($docblocks, function($block, $i) {
                            if ($i <= 0) return false;
                            if ($block->private) return false;
                            if ($block->name == 'constructor') return false;
                            if (strtolower($block->type) != 'function') return false;
                            return true;
                        }, ARRAY_FILTER_USE_BOTH);
                    @endphp
                    @if (count($methods))

                        <h2 id="properties" class="s-typo:h2 s-my:50 s-color:accent">
                            Methods
                        </h2>

                        @foreach ($methods as $block)
                            @include('pages.doc.partials.block', ['block' => $block, 'isFirst' => false])
                        @endforeach

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

                        <h2 id="properties" class="s-typo:h2 s-my:50 s-color:accent">
                            Properties
                        </h2>

                        @foreach ($props as $block)
                            @include('pages.doc.partials.block', ['block' => $block, 'isFirst' => false])
                        @endforeach

                    @endif

                </div>

            </div>

        </section>

    </div>

@endsection
