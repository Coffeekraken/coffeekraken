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

    <div id="styleguide">

        {{-- <section class="__preview s-pb:100 s-bg:main-surface">

            <div class="s-container">

                <div class="s-grid:12:gutter-between:gutter-50">

                    <div class="s-rhythm:vertical">

                        <div class="__preview-metas">

                            @include('doc.description', ['block' => $firstBlock])
                            @if ($firstBlock->install)
                                @include('doc.install', ['block' => $firstBlock])
                            @elseif ($firstBlock->example)
                                @include('generic.code.example', ['examples' => $firstBlock->example, 'lines' => 5, 'moreAction' => '#example-' . \Sugar\string\idCompliant($firstBlock->name)])
                            @endif

                        </div>

                    </div>

                    <div>
                        
                        <div class="__preview-example">
                            @foreach ($firstBlock->example as $example)
                                @if ($example->language == 'html')
                                    {!! $example->code !!}                     
                                @endif
                            @endforeach
                        </div>

                    </div>

                </div>

            </div>

        </section> --}}

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
                        &nbsp;&nbsp;
                        @include('generic.support.icons', ['supports' => $firstBlock->support])
                    </div>

                    @include('generic.toolbar.toolbar-join-us')

                </div>

            </div>

        </section>

        <section class="s-container markdown">

            <div class="s-grid:1222:gutter-between:gutter-50">

                <nav class="__nav s-pb:50">

                    <h5 class="s-typo:h5 s-mbe:20">
                        Styleguide
                    </h5>

                    @php $menu = get_object_vars($docmap->menu->custom->styleguide->tree->styleguide); @endphp
                    @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main'])
                    
                </nav>

                <div class="__content s-pb:50 s-rhythm:vertical s-format:text">

                    @include('pages.styleguide.partials.block', ['block' => $firstBlock, 'isFirst' => true])

                </div>

            </div>
        </section>

    </div>

@endsection
