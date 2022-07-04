<span s-activate class="__main-link s-display:inline-block" href="body" trigger="mouseover,mouseout"
    active-class="subnav-active" active-attribute="subnav-active" unactivate-timeout="150"
    unactivate-on="s-page-transition.start">
    <span class="s-depth:text:100">{{ $menuItem->as ? $menuItem->as : $menuItem->name }}</span>

    <div class="__subnav {{ $class }}">

        <div class="s-container s-layout:122">
            <ul class="__subnav-chapters">
                @foreach ($menuItem as $item)
                    @if ($item->name)
                        <li s-activate href="#header-subnav-{{ \Sugar\string\idCompliant($item->name) }}"
                            {!! $loop->index == 1 ? 'active="true"' : '' !!} id="header-subnav-item-{{ \Sugar\string\idCompliant($item->name) }}"
                            save-state trigger="click" mount-when="direct"
                            group="header-subnav-{{ \Sugar\string\idCompliant($menuItem->name) }}">
                            <i class="s-icon:folder s-mie:10 s-until:parent:active"></i>
                            <i class="s-icon:folder-opened s-mie:10 s-when:parent:active"></i>
                            {{ $item->as ? $item->as : $item->name }}
                        </li>
                    @endif
                @endforeach
            </ul>
            <div class="__subnav-stories">
                @foreach ($menuItem as $item)
                    @if (is_object($item))
                        <div class="__subnav-story" id="header-subnav-{{ \Sugar\string\idCompliant($item->name) }}">
                            @if ($item->content)
                                {!! $item->content !!}
                            @elseif ($item->include)
                                @include($item->include)
                            @else
                                <ul>
                                    @foreach ($item as $subItem)
                                        @if ($subItem->slug)
                                            <li class="s-position:relative s-flex">
                                                <a href="{{ $subItem->slug }}" title="{{ $subItem->as ? $subItem->as : $subItem->name }}"
                                                    class="s-link:stretch s-order:2">
                                                    {!! str_replace('@coffeekraken/', '', $subItem->as ? $subItem->as : $subItem->name) !!}
                                                </a>
                                                <i
                                                    class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent s-until:sibling:loading s-mie:10"></i>
                                                <div
                                                    class="s-loader:square-dots s-color:accent s-mie:10 s-when:siblings:loading">
                                                </div>
                                            </li>
                                        @endif
                                    @endforeach
                                </ul>
                            @endif
                        </div>
                    @endif
                @endforeach
            </div>

        </div>

        <div class="__subnav-footer s-layout:12">

            <div class="__subnav-footer-body">
                <p class="s-typo:p">Need something that <span class="s-tc:accent">you don't find?</span> Don't
                    hesite to <span class="s-tc:accent">join us through our channels</span> like discord, github,
                    etc...</p>
            </div>

            <div class="__subnav-footer-links s-text:right">
                <a class="s-btn s-color:error" href="https://olivierbossel.com" title="Share the love" target="_blank">
                    Github
                </a>
                &nbsp;
                <a class="s-btn s-color:complementary" href="https://olivierbossel.com" title="Share the love"
                    target="_blank">
                    Discord
                </a>
                &nbsp;
                <a class="s-btn s-color:accent" href="https://olivierbossel.com" title="Share the love" target="_blank">
                    <i class="s-icon:user"></i>
                    &nbsp;
                    <span>Join us!</span>
                </a>
            </div>

        </div>

    </div>
</span>
