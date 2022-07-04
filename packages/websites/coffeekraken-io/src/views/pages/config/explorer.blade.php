<section class="s-container config-explorer">


    <div class="s-layout:1222 s-gap:column:50 @mobile s-layout:1_2 s-mi:30">

        <nav class="sidemenu @mobile s-display:none">

            <div class="sidemenu-main">

            <h5 class="s-typo:h5 s-mbe:30">
                Configs
            </h5>

                <ul class="s-fs-tree">
                    @php
                        $listed = [];
                    @endphp
                    @foreach ($configFiles as $file)
                        @if (!in_array($file->name, $listed))
                            <li id="{{ $subId }}">
                                <div class="s-flex">
                                    <a class="s-link:stretch s-order:2"
                                        href="/config/explorer/{{ str_replace('.config.js', '', $file->name) }}">{{ str_replace('.config.js', '', $file->name) }}</a>
                                    <i class="s-icon:file-js }} s-tc:accent s-until:sibling:loading s-mie:10"></i>
                                    <div class="s-loader:square-dots s-color:accent s-mie:10 s-when:siblings:loading">
                                    </div>
                            </li>
                            @php
                                array_push($listed, $file->name);
                            @endphp
                        @endif
                    @endforeach
                </ul>

            </div>

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
                        {{-- <pre>
                        @php
                        print_r($configObj);
                        @endphp
                        </pre> --}}
                        
                        @foreach ($configObj->docblocks as $docblock)
                            <li class="s-font:40 s-mbe:30">
                                <header class="s-flex s-bg:main-surface s-radius">
                                    <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">

                                        @php
                                            $dotpath = end(explode($configId . '.', $docblock->namespace . '.' . $docblock->name));
                                        @endphp
                                        <span class="s-font:code">
                                            {{ $dotpath }}
                                        </span>
                                    </div>
                                    <div class="s-p:30">
                                        <div class="s-typo:code">
                                            {{ str_replace($packageRoot.'/', '', \Sugar\string\toString($docblock->default)) }}
                                        </div>
                                    </div>
                                    <div>
                                        @include('doc.partials.paramType', ['type' => $docblock->type])
                                    </div>
                                </header>
                                <p class="s-typo:p s-p:30">{!! $docblock->description !!}</p>
                            </li>
                        @endforeach
                    </ol>
                @endforeach

            @else

                <h1 class="s-typo:h1 s-mbe:30">
                    No configuration selected
                </h1>

                <p class="s-typo:lead s-mbe:30">
                    Please select a configuration from the sidemenu
                </p>

            @endif

        </div>

    </div>

</section>

