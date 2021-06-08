@extends('layouts.main')
@section('title', $title)

@section('content')
    
    <div id="doc" class="s-container">

    @foreach ( $docs as $docblocks )

        <section class="s-grid-122">

            <nav class="__nav">
                
                @php $firstBlock = $docblocks[0]; @endphp

                <s-activate class="__nav-group s-margin-bottom-30" id="doc-intro" toggle save-state>             
                    <h3 class="s-h3">
                        <span class="__nav-group-toggle"></span>
                        {{ $firstBlock->type }}
                    </h3>
                </s-activate>

                @if ($firstBlock->setting)

                    <s-activate class="__nav-group s-margin-bottom-30 s-margin-top-50" id="doc-settings" toggle save-state>
                        <h3 class="s-h3">
                            <span class="__nav-group-toggle"></span>
                            Settings
                        </h3>
                    </s-activate>
                    <ul class="s-list">
                        @foreach ($firstBlock->setting as $setting)
                            <li class="s-font-size-40">
                                <span class="s-color-success">{{ $setting->type }}</span> {{ $setting->name }}
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

                    <s-activate class="__nav-group s-margin-bottom-30 s-margin-top-50" id="doc-methods" toggle save-state>
                        <h3 class="s-h3">
                            <span class="__nav-group-toggle"></span>
                            Methods
                        </h3>
                    </s-activate>
                    <ul class="s-list">
                        @foreach ($methods as $block)
                            <li class="s-font-size-40">{{ $block->name }}</li>
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

                    <s-activate class="__nav-group s-margin-bottom-30 s-margin-top-50" id="doc-props" toggle save-state>
                        <h3 class="s-h3">
                            <span class="__nav-group-toggle"></span>
                            Properties
                        </h3>
                    </s-activate>
                    <ul class="s-list">
                        @foreach ($props as $prop)                                
                            <li class="s-font-size-40">{!! $prop->get ? '<span class="s-color-accent">get</span>' : '' !!}{!! $prop->set ? '|<span class="s-color-accent">set</span>' : '' !!} {{ $prop->name }}</li>
                        @endforeach
                    </ul>

                @endif

            </nav>

            <div>

                @foreach ( $docblocks as $block )
                    
                    @if ($block->private) @continue @endif

                    @if ($block->name)
                        @if ($loop->index <= 0)
                            <h1 class="s-h1 s-margin-bottom-50">{{ $block->name }}</h1>
                        @else
                            <h2 class="s-h2 s-margin-bottom-40">{{ $block->name }}</h2>
                        @endif
                    @endif

                    @if ($block->description)
                        <p class="s-p s-margin-bottom-50">{{ $block->description }}</p>
                    @endif

                    @if ($block->example)

                        <h2 class="s-h2 s-margin-bottom-40">Example</h2>

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

    </div>

@endsection
