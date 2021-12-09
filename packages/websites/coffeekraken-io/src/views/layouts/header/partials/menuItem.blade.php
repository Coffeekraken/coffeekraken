<span s-activate class="__main-link s-display:inline-block" href="body" trigger="mouseover,mouseout" active-class="subnav-active" active-attribute="subnav-active" unactivate-timeout="150">
    <span>{{ $menuItem->name }}</span>

    <div class="__subnav {{ $class }}">

        <div class="s-container s-layout:1222">
            <ul class="__subnav-chapters">
                @foreach($menuItem as $item)
                    @if ($item->name)
                        <li s-activate href="#subnav-{{ \Sugar\string\idCompliant($item->name) }}" {!! ($loop->index == 1) ? 'active="true"' : '' !!} id="subnav-item-{{ \Sugar\string\idCompliant($item->name) }}" save-state trigger="click" group="subnav-{{ \Sugar\string\idCompliant($menuItem->name) }}">
                            {{ $item->name }}
                        </li>
                    @endif
                @endforeach
            </ul>
            <div class="__subnav-stories">
                @foreach($menuItem as $item)
                    @if (is_object($item))
                        <div class="__subnav-story" id="subnav-{{ \Sugar\string\idCompliant($item->name) }}">
                            @if ($item->content)
                                {!! $item->content !!}
                            @else
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
                            @endif
                        </div>
                    @endif
                @endforeach
            </div>

        </div>

        <div class="__subnav-footer s-layout:12">

            <div class="__subnav-footer-body">
                <p class="s-typo:p">Need something that <span class="s-tc:accent">you don't find?</span> Don't hesite to <span class="s-tc:accent">join us through our channels</span> like discord, github, etc...</p>
            </div>

            <div class="__subnav-footer-links s-text:right">
                <a class="s-btn s-color:error" href="https://olivierbossel.com" title="Share the love" target="_blank">
                    Github
                </a>
                &nbsp;
                <a class="s-btn s-color:complementary" href="https://olivierbossel.com" title="Share the love" target="_blank">
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