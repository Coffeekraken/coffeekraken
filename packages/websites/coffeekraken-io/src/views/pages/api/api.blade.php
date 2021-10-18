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

    <div id="api">

        <section class="toolbar">

            <div class="s-container">

                <div class="s-flex:align-center">

                    <div class="s-font:40">
                        <span>{{ $firstBlock->name }}</span>
                        &nbsp;&nbsp;
                        <span class="s-font:30">
                            <span class="s-badge:pill s-color:{{ $statusColor }}">{{ $firstBlock->status ? $firstBlock->status : 'beta' }}</span>
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

            <div class="s-layout:1222:gutter-between:gutter-50">

                <nav class="__nav s-pb:50">

                    <h5 class="s-typo:h5 s-mbe:30">
                        API
                    </h5>

                    <api-nav></api-nav>
                    
                </nav>

                <div class="__content s-pb:50">

                    @include('pages.styleguide.partials.block', ['block' => $firstBlock, 'isFirst' => true])

                </div>

            </div>
        </section>

    </div>

@endsection
