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

        <section class="__toolbar s-py:20">

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

                    <div class="s-flex-item:grow s-text:right">

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

        <section class="__preview s-py:100 s-bg:main-surface">

            <div class="s-container s-format:text s-rhythm:vertical">

                @foreach ($firstBlock->example as $example)
                    @if ($example->language == 'html')
                        {!! $example->code !!}                     
                    @endif
                @endforeach

            </div>

        </section>

        <section class="s-container s-py:70">

            <section class="s-grid:1222">

                <nav class="__nav">
                
                    <ul class="s-list:ul:icon:accent">
                        @if ($firstBlock->description)
                            <li class="s-font:40">
                                <i class="s-icon:info"></i>
                                <a href="#{{ $firstBlock->name }}" title="Description">
                                    Description
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
                        @if ($firstBlock->feature)
                            <li class="s-font:40">
                                <i class="s-icon:box"></i>
                                <a href="#features-{{ $firstBlock->name }}" title="Features">
                                    Features
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
                        @if ($firstBlock->todo)
                            <li class="s-font:40">
                                <i class="s-icon:tasks"></i>
                                <a href="#todo-{{ $firstBlock->name }}" title="Todo">
                                    Todo
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

                </nav>

                <div>

                    @include('pages.styleguide.partials.block', ['block' => $firstBlock, 'isFirst' => true])


                </div>

            </div>

        </section>

    </div>

@endsection
