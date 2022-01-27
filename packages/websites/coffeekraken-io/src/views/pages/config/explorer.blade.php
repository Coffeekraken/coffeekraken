@extends('layouts.main')
@section('title', $title)

@section('content')

    <section class="s-container config-explorer">


        <div class="s-layout:1222:gap-between:gap-50">

            <nav class="sidemenu s-pb:50">

                <h5 class="s-typo:h5 s-mbe:30">
                    Configs
                </h5>

                <ul class="s-fs-tree">

                    @foreach ($configFiles as $file)

                        <li id="{{ $subId }}">
                            <i class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent"></i>
                            <a
                                href="/config/explorer/{{ $file->name }}">{{ str_replace('.config.js', '', $file->name) }}</a>
                        </li>

                    @endforeach

            </nav>

            <div class="__content s-pb:50">

                @if ($requestedConfig)

                    @php
                        $filename = end(explode('/', $requestedConfig[0]->path));
                        $configId = str_replace('.config.js', '', $filename);
                    @endphp

                    <h1 class="s-typo:h1 s-mbe:20">
                        {{ $configId }}
                    </h1>
                    <h3 class="s-typo:code s-font:40 s-p:10 s-mbe:50">
                        <i class="s-icon:file"></i> {{ $filename }}
                    </h3>

                    @foreach ($requestedConfig as $configObj)

                        <ol>
                            @foreach ($configObj->docblocks as $docblock)

                                <li class="s-font:40 s-mbe:30">
                                    <header class="s-flex s-bg:main-surface s-radius s-depth:100">
                                        <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">

                                            @php
                                                $dotpath = end(explode($configId . '.', $docblock->namespace . '.' . $docblock->name));
                                                
                                            @endphp
                                            <span class="s-font:code">
                                                {{ $dotpath }}
                                            </span>
                                        </div>
                                        <div class="s-typo:bold s-p:30 s-tc:info">
                                            {{ $docblock->type }}
                                        </div>
                                    </header>
                                    @if ($docblock->default != null or $docblock->default == 0)
                                        <div class="s-pi:30 s-mbs:40">
                                            <div class="s-typo:code">
                                                {{ $docblock->default }}
                                            </div>
                                        </div>
                                    @endif
                                    <p class="s-typo:p s-p:30">{!! $docblock->description !!}</p>
                                </li>

                            @endforeach
                        </ol>

                    @endforeach

                @endif

            </div>

        </div>

    </section>

@endsection
