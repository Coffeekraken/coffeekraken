@extends('layouts.main')
@section('title', $title)

@section('content')

    <section class="s-container markdown">

        <div class="s-grid:1222:gutter-between:gutter-50">

            <nav class="__nav s-py:50">

                <h5 class="s-typo:h5 s-mb:20">
                    Coffeekraken
                </h5>

                @php $menu = get_object_vars($docMenu->tree->documentation); @endphp
                @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main'])

                @if (count(get_object_vars($docMenu->packages)))

                    <h5 class="s-typo:h5 s-mt:50 s-mb:20">
                        Packages
                    </h5>

                    <ul class="s-list:ul">
                        @foreach ((array)$docMenu->packages as $package)
                            <li class="__toggle">
                                <s-activate href="#{{ \Sugar\string\idCompliant($package->name) }}" id="doc-{{ \Sugar\string\idCompliant($package->name) }}" toggle save-state>
                                    {{ $package->name }}
                                </s-activate>

                                @php $menu = get_object_vars($package->tree); @endphp
                                @include('pages.markdown.menu', ['menu' => $menu, 'id' => \Sugar\string\idCompliant($package->name)])
                            </li>
                        @endforeach
                    </ul>
                @endif
                
            </nav>

            <div class="__content s-py:50 s-rhythm:vertical s-format:text">
                {!! $body !!}
            </div>

        </div>
    </section>


@endsection
