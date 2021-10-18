@extends('layouts.main')
@section('title', $title)

@section('content')

    <div id="markdown">

        <section class="toolbar">

            <div class="s-container">

                <div class="s-flex:align-center">

                    <div class="s-font:40">
                        <span>Documentation</span>
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

                    <h5 class="s-typo:h5 s-mbe:20">
                        Coffeekraken
                    </h5>

                    @php $menu = get_object_vars($docmap->menu->tree->documentation); @endphp
                    @include('pages.markdown.menu', ['menu' => $menu, 'id' => 'main'])

                    @if (count(get_object_vars($docmap->menu->packages)))

                        <h5 class="s-typo:h5 s-mbs:50 s-mbe:20">
                            Packages
                        </h5>

                        <ul class="s-fs-tree">
                            @foreach ((array)$docmap->menu->packages as $package)

                                @if (!$package->tree->documentation) @continue @endif

                                <li id="{{ \Sugar\string\idCompliant($package->name) }}">
                                    <i class="s-icon:folder-opened s-tc:info s-when:active"></i>
                                    <i class="s-icon:folder"></i>
                                    <span s-activate href="#{{ \Sugar\string\idCompliant($package->name) }}" id="doc-{{ \Sugar\string\idCompliant($package->name) }}" toggle save-state>
                                        {{ str_replace('@coffeekraken/', '', $package->name) }}
                                    </span>

                                    @php $menu = get_object_vars($package->tree->documentation); @endphp
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

    </div>


@endsection
