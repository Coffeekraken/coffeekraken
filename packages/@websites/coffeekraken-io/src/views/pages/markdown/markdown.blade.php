<div id="markdown">

    <section class="s-container markdown">

        <div class="s-layout:1222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30 s-gap:0">

            <nav s-scope class="sidemenu @mobile s-display:none" >

                <div class="sidemenu-sub">
                    <ck-doc-sub-nav source=".__content"></ck-doc-sub-nav>
                </div>

                <div class="sidemenu-main" s-refocus offset-y="100" trigger="event:actual">

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
                                @if (!isset($package->tree->documentation))
                                    @continue
                                @endif

                                <li id="{{ \Sugar\string\idCompliant($package->name) }}" s-activate
                                    trigger="click,event:actual" href="#{{ \Sugar\string\idCompliant($package->name) }}"
                                    toggle save-state trigger="click,event:actual">
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

                </div>

            </nav>

            <div s-page-transition-container="markdown">
                
                <div s-scope class="__content s-pb:50 s-pis:50 s-rhythm:vertical s-format:text @mobile s-pis:0">

                    @if (!isset($body))

                    <h1 class="s-typo:h1 s-mbe:30">
                        No documentation selected
                    </h1>

                    <p class="s-typo:lead s-mbe:30">
                        Please select a documentation from the sidemenu
                    </p>

                    @else
                    
                        {!! $body !!}

                    @endif

                </div>
            </div>

        </div>
    </section>

</div>
