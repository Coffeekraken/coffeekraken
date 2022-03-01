@extends('layouts.main')
@section('title', $title)

@section('content')

    <div id="markdown">

        <section class="s-container markdown">

            <div class="s-layout:1222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30">

                <nav class="sidemenu s-pb:50 @mobile s-display:none" s-refocus trigger="event:actual">

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
                            @foreach ((array) $docmap->menu->packages as $package)
                                @if (!$package->tree->documentation)
                                    @continue
                                @endif

                                <li id="{{ \Sugar\string\idCompliant($package->name) }}" s-activate
                                    trigger="click,event:actual" href="#{{ \Sugar\string\idCompliant($package->name) }}"
                                    toggle save-state mount-when="direct" trigger="click,event:actual">
                                    <div>
                                        <i class="s-icon:folder-opened s-tc:complementary s-when:grandparent:active"></i>
                                        <i class="s-icon:folder"></i>
                                        {{ str_replace('@coffeekraken/', '', $package->name) }}
                                    </div>

                                    @php $menu = get_object_vars($package->tree->documentation); @endphp
                                    @include('pages.markdown.menu', ['menu' => $menu, 'id' =>
                                    \Sugar\string\idCompliant($package->name)])
                                </li>
                            @endforeach
                        </ul>
                    @endif

                </nav>

                <div s-page-transition-container="markdown" class="__content s-pb:50 s-rhythm:vertical s-format:text">
                    {!! $body !!}
                </div>

            </div>
        </section>

    </div>


@endsection
