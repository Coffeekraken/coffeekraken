<div id="changelog">

    <section class="s-container changelog">

        @php
            $versionsAr = (array) $versions;
            $currentVersion = array_key_first($versionsAr);
            $currentVersionObj = $versionsAr[$currentVersion];
        @endphp

        <div class="s-layout:1222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30">

            <nav s-scope class="sidemenu @mobile s-display:none" >

                <div class="sidemenu-main" s-refocus offset-y="100" trigger="event:actual">

                    <h5 class="s-typo:h5 s-mbe:30">
                        Changelogs
                    </h5>   

                    <ol class="_list">
                        @foreach (array_keys((array) $versions) as $version)
                            <li>
                                <a href="/changelog{{ $version == $currentVersion ? '' : '/' . $version }}" title="Coffeekraken {{ $version }} changelog">
                                    <span class="_version">{{ $version }}</span>
                                    @if (isset($versions->$version->codename))
                                        <span class="s-badge s-color:complementary s-text:uppercase">
                                            {{ $versions->$version->codename }}
                                        </span>
                                    @endif
                                </a>
                            </li>
                        @endforeach
                    </ol>

                </div>

            </nav>

            <div s-page-transition-container="changelog">

                <div s-scope class="_content s-rhythm:vertical s-pb:50">

                    @if (isset($requestedVersion->changelog))
                        <h1 class="s-typo:h1">
                            {{ $currentVersion }}
                            @if (isset($requestedVersion->codename))
                                <span class="s-badge s-color:complementary">
                                    {{ $requestedVersion->codename }}
                                </span>
                            @endif
                        </h1>

                        @foreach ($requestedVersion->changelog as $log)
                            <h2 class="s-typo:h3 s-tc:accent">
                                {{ $log->title }}
                            </h2>
                            <p class="s-typo:p">
                                {{ $log->description }}
                            </p>
                        @endforeach

                    @else
                        <h1 class="s-typo:h1 s-mbe:40">
                            No changelog
                        </h1>

                        <p class="s-typo:lead s-mbe:30">
                            No changelog for the <span class="s-badge s-color:complementary"> {{ $requestedVersion->version }} {{ $requestedVersion->codename }} </span> version.
                        </p>
                        <p class="s-typo:p s-mbe:30">
                            Please select a version from the sidemenu.
                        </p>
                    @endif

                </div>

            </div>

        </div>
    </section>

</div>