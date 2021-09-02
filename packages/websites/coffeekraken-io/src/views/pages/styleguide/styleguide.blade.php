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

        <section class="__preview s-py:100 s-bg:main-surface">

            <div class="s-container">

                <div class="s-grid:12:gutter-between:gutter-50">

                    <div class="s-format:text s-rhythm:vertical">

                        <div class="__preview-metas">

                            @include('doc.description', ['block' => $firstBlock])
                            @if ($firstBlock->install)
                                @include('doc.install', ['block' => $firstBlock])
                            @elseif ($firstBlock->example)
                                @include('generic.code.example', ['examples' => $firstBlock->example, 'lines' => 1])
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

        </section>

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

        <section class="s-container s-py:70">

            <section class="s-grid:1222">

                <div>

                    @include('doc.sidenav', ['title' => 'Menu', 'block' => $firstBlock, 'docblocks' => null])

                </div>

                <div>

                    @include('pages.styleguide.partials.block', ['block' => $firstBlock, 'isFirst' => true])


                </div>

            </div>

        </section>

    </div>

@endsection
