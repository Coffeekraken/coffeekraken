@extends('layouts.main')
@section('title', $title)

@section('content')

    <section class="s-container markdown">

        <div class="s-grid:1222:gutter-between:gutter-50">

            <nav class="__nav s-py:50">

                <ol class="s-list:ol:accent">

                    @foreach ($docMenu->tree->documentation as $menuItem)
                        @if ($loop->first) @continue @endif
                        @if ($menuItem->slug)
                            <li>
                                <a href="{{ $menuItem->slug }}" title="{{ $menuItem->name }}">
                                    {{ $menuItem->name }}
                                </a>
                            </li>
                        @else
                            <li>
                                <div class="s-typo:bold s-mb:10">{{ $menuItem->name }}</div>
                                <ul class="s-list:ul:complementary">
                                    @foreach($menuItem as $item)
                                        @if ($item->slug)
                                            <li>
                                                <a href="{{ $item->slug }}" title="{{ $item->name }}">
                                                    {{ $item->name }}
                                                </a>
                                            </li>
                                        @else  
                                            @if (is_object($item))
                                                <li>
                                                    {{ $item->name }}
                                                    <ol class="s-list:ol">
                                                        @foreach($item as $subItem)
                                                            @if ($subItem->slug)
                                                                <li>
                                                                    <a href="{{ $subItem->slug }}" title="{{ $subItem->name }}">
                                                                        {{ $subItem->name }}
                                                                    </a>
                                                                </li>
                                                            @endif
                                                        @endforeach
                                                    </ol>
                                                </li>
                                            @endif
                                        @endif                                    
                                    @endforeach
                                </ul>
                            </li>
                        @endif
                    @endforeach

                </ol>

            </nav>

            <div class="__content s-py:50 s-rhythm:vertical s-format:text">
                {!! $body !!}
            </div>

        </div>
    </section>


@endsection
