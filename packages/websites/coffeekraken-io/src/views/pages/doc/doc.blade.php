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

        <header class="__banner s-pb:50">

            <div class="s-container">
                <div class="s-flex:align-center">
                    <div class="s-flex-item:grow">
                        <span class="s-font:30">
                            <span class="s-badge:pill:{{ $statusColor }}">{{ $firstBlock->status ? $firstBlock->status : 'beta' }}</span>
                            &nbsp;&nbsp;<span class="s-color:accent s-font:30">Since {{ $firstBlock->since }}</span>
                        </span>
                        <h1 class="s-typo:h1 s-mbe:10 s-m:20">
                            {{ $firstBlock->name }}
                        </h1>
                        <h3 class="s-typo:p s-color:complementary">
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
                            <div class="s-flex-item s-pis:10">
                                <a href="{{ $firstBlock->author->url ? $firstBlock->author->url : $firstBlock->author->email }}" target="_blank">
                                    <span class="s-avatar s-font:100">
                                        <img src="https://www.gravatar.com/avatar/{{ md5($firstBlock->author->email) }}" alt="{{ $firstBlock->author->name }}" />
                                    </span>
                                </a>
                            </div>
                        </div>
                        @if ($firstBlock->contributor)
                            <div class="__contributors">
                                <h4 class="s-typo:h6 s-color:accent s-m:30 s-mbe:10">
                                    {{ count($firstBlock->contributor) }} Contributor{{ count($firstBlock->contributor) > 1 ? 's' : '' }}
                                </h4>
                                @foreach ($firstBlock->contributor as $contributor)
                                    <a href="{{ $contributor->url ? $contributor->url : $contributor->email }}" target="_blank">
                                        <span class="s-tooltip-container">
                                            <span class="s-avatar s-font:80">
                                                <img src="https://www.gravatar.com/avatar/{{ md5($contributor->email) }}" alt="{{ $contributor->name }}" />
                                            </span>
                                            <div class="s-tooltip:nowrap">
                                                {{ $contributor->name }}
                                            </div>
                                        </span>
                                    </a>                                
                                @endforeach
                            </div>
                        @endif
                        {{-- <a class="s-btn:complementary s-m:20" href="https://github.com/coffeekraken" target="_blank" title="Contribute to the project">
                            Contribute to the project
                        </a> --}}

                    </div>
                </div>
            </div>

        </header>

        <section class="toolbar">

            <div class="s-container">

                <div class="s-flex:align-center">

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

                    @include('generic.toolbar.toolbar-join-us')

                </div>

            </div>

        </section>

        <section class="s-container s-pb:70">

            <section class="s-grid:1222">

                <div>

                    @include('doc.sidenav', ['title' => 'Menu', 'block' => $firstBlock, 'docblocks' => null])

                </div>

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

                        <h2 id="properties" class="s-typo:h2 s-mb:50 s-color:accent">
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

                        <h2 id="properties" class="s-typo:h2 s-mb:50 s-color:accent">
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
