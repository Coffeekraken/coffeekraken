@extends('layouts.main')
@section('title', $title)

@section('content')
    
    <section class="s-container markdown">

            <div class="s-layout:1222:gutter-between:gutter-50">

                <nav class="__nav s-pb:50">

                    <h5 class="s-typo:h5 s-mbe:30">
                        Configs
                    </h5>
                    
                    <ul class="s-fs-tree">

                    @foreach ($configFiles as $file)

                        <li id="{{ $subId }}">
                            <i class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent"></i>
                            <a href="/config/explorer/{{ $file->name }}">{{ str_replace('.config.js', '', $file->name) }}</a>
                        </li>

                    @endforeach
                    
                </nav>

                <div class="__content s-pb:50">

                    @if ($requestedConfig)

                        @php
                            $filename = end(explode('/', $requestedConfig[0]->path));
                            $configId = str_replace('.config.js', '', $filename);
                        @endphp

                        @foreach($requestedConfig as $configObj)

                            <ol>
                            @foreach ($configObj->docblocks as $docblock)

                                <li class="s-font:40 s-mbe:30">
                                    <header class="s-flex s-bg:main-surface s-radius">
                                        <div class="s-flex-item:grow s-tc:accent s-p:30">

                                            @php
                                                $dotpath = end(explode($configId.'.', $docblock->namespace.'.'.$docblock->name));

                                            @endphp

                                            {{ $dotpath }}
                                        </div>
                                        <div class="s-typo:bold s-p:30">
                                            {{ $docblock->type }}
                                        </div>
                                        @if ($docblock->default != null or $docblock->default == 0)
                                            <div class="s-tc:info s-p:30">
                                                {{ $docblock->default }}
                                            </div>
                                        @endif
                                    </header>
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
