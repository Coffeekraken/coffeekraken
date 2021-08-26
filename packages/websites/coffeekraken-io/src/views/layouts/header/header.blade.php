<header id="header">

    <div class="s-container">

        <div class="s-flex:align-center" style="position: relative">
            <a href="/" title="Coffeekraken.io">
                <s-inline-svg src="/src/img/ck-logo.svg"></s-inline-svg>
            </a>
            <div class="s-flex-item:order-10 s-flex:align-center">
                <form action="/doc/api" method="get" name="search" id="search-form">
                    <input class="s-input" type="text" name="search" placeholder="Search API doc..." />
                </form>
                <version-selector class="s-ml:20"></version-selector>
                <a href="javascript:void" class="s-ml:20" id="settings-opener">
                    <i class="s-icon:settings"></i>
                </a>
            </div>
            <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:40">
                <a class="s-pl:50 s-typo:bold" href="/#features" title="Features">Features</a>
                <a class="s-px:50 s-typo:bold" href="/#get-started" title="Get started">Get started</a>

                @foreach ($docMenu->mixedTree as $menuItem)

                    <span class="s-pr:50 s-typo:bold" >
                        @if ($menuItem->slug)
                            <a href="{{ $menuItem->slug }}" title="{{ $menuItem->name }}">
                                {{ $menuItem->name }}
                            </a>
                        @else
                            <s-activate href="body" trigger="mouseover,mouseout" active-class="subnav-active" active-attribute="subnav-active" unactivate-timeout="150">
                                <span>{{ $menuItem->name }}</span>

                                <div class="__subnav">
                                    <div class="s-container s-grid:1222">
                                        <ul class="__subnav-chapters">
                                            @foreach($menuItem as $item)
                                                @if (!$item->slug && $item->name)
                                                    <s-activate href="#subnav-{{ \Sugar\string\idCompliant($item->name) }}" {{ ($loop->index == 1) ? 'active="true"' : ''}} trigger="click" group="subnav-{{ \Sugar\string\idCompliant($menuItem->name) }}">
                                                        <li>
                                                            {{ $item->name }}
                                                        </li>
                                                    </s-activate>
                                                @endif
                                            @endforeach
                                        </ul>
                                        <div class="__subnav-stories">
                                             @foreach($menuItem as $item)
                                                @if (is_object($item))
                                                    <div class="__subnav-story" id="subnav-{{ \Sugar\string\idCompliant($item->name) }}">
                                                        <div class="s-grid:12">
                                                            <ul>
                                                                @foreach($item as $subItem)
                                                                    @if ($subItem->slug)
                                                                        <li>
                                                                            <a href="{{ $subItem->slug }}" title="{{ $subItem->name }}">
                                                                                {{ $subItem->name }}
                                                                            </a>
                                                                        </li>
                                                                    @endif
                                                                @endforeach        
                                                            </ul>
                                                            <div class="__icon">
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                                                    <linearGradient id="header-shape-gradient" x2="0.35" y2="1">
                                                                        <stop offset="0%" stop-color="var(--color-start)" />
                                                                        <stop offset="100%" stop-color="var(--color-end)" />
                                                                    </linearGradient>
                                                                    <path style="fill: var(--subnav-stories-icon-fill);" d="M512.1 191l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0L552 6.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zm-10.5-58.8c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.7-82.4 14.3-52.8 52.8zM386.3 286.1l33.7 16.8c10.1 5.8 14.5 18.1 10.5 29.1-8.9 24.2-26.4 46.4-42.6 65.8-7.4 8.9-20.2 11.1-30.3 5.3l-29.1-16.8c-16 13.7-34.6 24.6-54.9 31.7v33.6c0 11.6-8.3 21.6-19.7 23.6-24.6 4.2-50.4 4.4-75.9 0-11.5-2-20-11.9-20-23.6V418c-20.3-7.2-38.9-18-54.9-31.7L74 403c-10 5.8-22.9 3.6-30.3-5.3-16.2-19.4-33.3-41.6-42.2-65.7-4-10.9.4-23.2 10.5-29.1l33.3-16.8c-3.9-20.9-3.9-42.4 0-63.4L12 205.8c-10.1-5.8-14.6-18.1-10.5-29 8.9-24.2 26-46.4 42.2-65.8 7.4-8.9 20.2-11.1 30.3-5.3l29.1 16.8c16-13.7 34.6-24.6 54.9-31.7V57.1c0-11.5 8.2-21.5 19.6-23.5 24.6-4.2 50.5-4.4 76-.1 11.5 2 20 11.9 20 23.6v33.6c20.3 7.2 38.9 18 54.9 31.7l29.1-16.8c10-5.8 22.9-3.6 30.3 5.3 16.2 19.4 33.2 41.6 42.1 65.8 4 10.9.1 23.2-10 29.1l-33.7 16.8c3.9 21 3.9 42.5 0 63.5zm-117.6 21.1c59.2-77-28.7-164.9-105.7-105.7-59.2 77 28.7 164.9 105.7 105.7zm243.4 182.7l-8.2 14.3c-3 5.3-9.4 7.5-15.1 5.4-11.8-4.4-22.6-10.7-32.1-18.6-4.6-3.8-5.8-10.5-2.8-15.7l8.2-14.3c-6.9-8-12.3-17.3-15.9-27.4h-16.5c-6 0-11.2-4.3-12.2-10.3-2-12-2.1-24.6 0-37.1 1-6 6.2-10.4 12.2-10.4h16.5c3.6-10.1 9-19.4 15.9-27.4l-8.2-14.3c-3-5.2-1.9-11.9 2.8-15.7 9.5-7.9 20.4-14.2 32.1-18.6 5.7-2.1 12.1.1 15.1 5.4l8.2 14.3c10.5-1.9 21.2-1.9 31.7 0l8.2-14.3c3-5.3 9.4-7.5 15.1-5.4 11.8 4.4 22.6 10.7 32.1 18.6 4.6 3.8 5.8 10.5 2.8 15.7l-8.2 14.3c6.9 8 12.3 17.3 15.9 27.4h16.5c6 0 11.2 4.3 12.2 10.3 2 12 2.1 24.6 0 37.1-1 6-6.2 10.4-12.2 10.4h-16.5c-3.6 10.1-9 19.4-15.9 27.4l8.2 14.3c3 5.2 1.9 11.9-2.8 15.7-9.5 7.9-20.4 14.2-32.1 18.6-5.7 2.1-12.1-.1-15.1-5.4l-8.2-14.3c-10.4 1.9-21.2 1.9-31.7 0zM501.6 431c38.5 29.6 82.4-14.3 52.8-52.8-38.5-29.6-82.4 14.3-52.8 52.8z"/>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endif
                                            @endforeach
                                        </div>

                                    </div>
                                </div>

                                {{-- <div class="s-tooltip:bottom:nowrap">
                                    <div class="__subnav">
                                        @foreach($menuItem as $item)
                                            @if ($item->slug)
                                                <a href="{{ $item->slug }}" title="{{ $item->name }}">
                                                    {{ $item->name }}
                                                </a>
                                            @else  
                                                @if (is_object($item))
                                                    <span title="{{ $item->name }}" class="s-tooltip-container">
                                                        {{ $item->name }}
                                                        <div class="s-tooltip:right-bottom-top:nowrap">
                                                        <div class="__subnav">
                                                                @foreach($item as $subItem)
                                                                    @if ($subItem->slug)
                                                                        <a href="{{ $subItem->slug }}" title="{{ $subItem->name }}">
                                                                            {{ $subItem->name }}
                                                                        </a>
                                                                    @endif
                                                                @endforeach
                                                            </div>
                                                        </div>
                                                    </span>
                                                @endif
                                            @endif                                    
                                        @endforeach
                                    </div>
                                </div> --}}
                            </s-activate>
                        @endif
                    </span>

                @endforeach
            </nav>
        </div>

    </div>
        

    <s-side-panel id="settings" side="right" triggerer="#settings-opener" overlay>
        <ck-settings></ck-settings> 
    </s-side-panel>

</header>