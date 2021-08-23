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
                <a href="javascript:void" class="s-ml:10" id="settings-opener">
                    <i class="s-icon:settings"></i>
                </a>
            </div>
            <nav id="nav" class="s-flex-item:grow-1 s-flex:justify-space-evenly s-text:center s-font:40">
                <a class="s-pl:50 s-typo:bold" href="/#features" title="Features">Features</a>
                <a class="s-px:50 s-typo:bold" href="/#get-started" title="Get started">Get started</a>

                @foreach ($docMenu->mixedTree as $menuItem)

                    <span class="s-pr:50 s-typo:bold" >
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
        

    <s-side-panel id="settings" side="right" triggerer="#settings-opener" overlay>
        <ck-settings></ck-settings> 
    </s-side-panel>

</header>