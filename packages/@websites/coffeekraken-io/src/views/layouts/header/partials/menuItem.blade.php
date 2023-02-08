<span s-activate class="_main-link s-display:inline-block" href="body" trigger="mouseover,mouseout"
    active-class="subnav-active" active-attribute="subnav-active" unactivate-timeout="150"
    unactivate-on="event:s-page-transition.start">

    <span>{{ isset($menuItem->as) ? $menuItem->as : $menuItem->name }}</span>

    <template>
        <div class="_subnav {{ $class }}">
            <div class="s-container s-layout:122">
                <ul class="_subnav-chapters">
                    @foreach ($menuItem as $item)
                        @if (isset($item->name))
                            <li s-activate href="#header-subnav-{{ isset($item->id) ? $item->id : \Sugar\string\idCompliant($item->name) }}"
                                {!! $loop->index == 1 ? 'active="true"' : '' !!} id="header-subnav-item-{{ isset($item->id) ? $item->id : \Sugar\string\idCompliant($item->name) }}"
                                save-state trigger="click" mount-when="direct"
                                group="header-subnav-{{ \Sugar\string\idCompliant($menuItem->name) }}">
                                <i class="s-icon:folder s-mie:10 s-until:parent:active"></i>
                                <i class="s-icon:folder-opened s-mie:10 s-when:parent:active"></i>
                                {{ isset($item->as) ? $item->as : $item->name }}
                            </li>
                        @endif
                    @endforeach
                </ul>
                <div class="_subnav-stories">
                    @foreach ($menuItem as $item)
                        @if (is_object($item))
                            <div class="_subnav-story" id="header-subnav-{{ isset($item->id) ? $item->id : \Sugar\string\idCompliant($item->name) }}">
                                    <template>
                                    @if (isset($item->content))
                                        {!! $item->content !!}
                                    @elseif (isset($item->include))
                                        @include($item->include)
                                    @else
                                        <ul>
                                            @foreach ($item as $subItem)
                                                @if (isset($subItem->slug))
                                                    <li class="s-position:relative s-flex">
                                                        <a href="{{ $subItem->slug }}" title="{{ isset($subItem->as) ? $subItem->as : $subItem->name }}"
                                                            class="s-link:stretch s-order:2">
                                                            {!! str_replace('@coffeekraken/', '', isset($subItem->as) ? $subItem->as : $subItem->name) !!}
                                                        </a>
                                                        <i
                                                                class="s-icon:{{ isset($icon) ? $icon : 'file-md' }} s-tc:accent s-until:sibling:loading s-mie:10"></i>
                                                        <div
                                                            class="s-loader:square-dots s-color:accent s-mie:10 s-when:siblings:loading">
                                                        </div>
                                                    </li>
                                                @endif
                                            @endforeach
                                        </ul>
                                    @endif
                                </template>
                            </div>
                        @endif
                    @endforeach
                </div>

            </div>

            <div class="_subnav-footer s-layout:12">

                <div class="_subnav-footer-body">
                    <p class="s-typo:p">Need something that <span class="s-tc:accent">you don't find?</span> Don't
                        hesite to <span class="s-tc:accent">join us through our channels</span> like discord, github,
                        etc...</p>
                </div>

                <div class="_subnav-footer-links s-text:right">
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
    </template>
</span>
