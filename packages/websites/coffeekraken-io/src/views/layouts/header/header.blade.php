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
                <version-selector></version-selector>
                <label for="theme-switcher" class="s-switch:accent">
                    <input type="checkbox" id="theme-switcher" />
                    <div class="s-switch-handler"></div>
                    <script>
                        var isDark = window.localStorage.getItem('theme');
                        var $themeSwitch = document.querySelector('#theme-switcher');
                        if (isDark) {
                            document.body.classList.add('s-theme--dark');
                            $themeSwitch.checked = true;
                        }
                        $themeSwitch.addEventListener('change', (e) => {
                            if (e.target.checked) {
                                document.body.classList.add('s-theme--dark');
                                window.localStorage.setItem('theme', true);
                            } else {
                                document.body.classList.remove('s-theme--dark');
                                window.localStorage.removeItem('theme');
                            }
                        });
                    </script>
                </label>
            </div>
            <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:50">
                <a class="s-pl:100 s-typo:bold" href="/#features" title="Features">Features</a>
                <a class="s-px:50 s-typo:bold" href="/#get-started" title="Get started">Get started</a>

                @foreach ($docMenu->tree as $menuItem)

                    <span class="s-pr:100 s-typo:bold" >
                        <span class="s-tooltip-container">
                            @if ($menuItem->slug)
                                <a href="{{ $menuItem->slug }}" title="{{ $menuItem->name }}">
                                    {{ $menuItem->name }}
                                </a>
                            @else
                                {{ $menuItem->name }}
                                <div class="s-tooltip:bottom:nowrap">
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
                                </div>
                            @endif
                        </span>
                    </span>

                @endforeach
            </nav>
        </div>

    </div>

</header>