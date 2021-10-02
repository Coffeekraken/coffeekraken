@extends('layouts.main')
@section('title', $title)

@section('content')

    <section class="s-container markdown">

        <div class="s-layout:1222:gutter-between:gutter-50">

            <nav class="__nav s-pb:50">

                <h5 class="s-typo:h5 s-mbe:20">
                    Coffeekraken
                </h5>

                @php $menu = get_object_vars($docmap->menu->tree->documentation); @endphp
                @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main'])

                @if (count(get_object_vars($docmap->menu->packages)))

                    <h5 class="s-typo:h5 s-mbs:50 s-mbe:20">
                        Packages
                    </h5>

                    <ul class="s-list:ul">
                        @foreach ((array)$docmap->menu->packages as $package)
                            <li class="__toggle">
                                <div s-activate href="#{{ \Sugar\string\idCompliant($package->name) }}" id="doc-{{ \Sugar\string\idCompliant($package->name) }}" toggle save-state>
                                    {{ $package->name }}
                                </div>

                                @php $menu = get_object_vars($package->tree); @endphp
                                @include('pages.markdown.menu', ['menu' => $menu, 'id' => \Sugar\string\idCompliant($package->name)])
                            </li>
                        @endforeach
                    </ul>
                @endif
                
            </nav>

            <div class="__content s-pb:50 s-rhythm:vertical s-format:text">
                {!! $body !!}
            </div>

        </div>
    </section>


@endsection
