<div class="__subnav-accordion">
    @foreach ($menuItem as $item)
        @if ($item->name)
            <div class="__subnav-title" s-activate href="#subnav-mobile-{{ \Sugar\string\idCompliant($item->name) }}"
                {!! $loop->index == 1 ? 'active="true"' : '' !!} id="subnav-mobile-item-{{ \Sugar\string\idCompliant($item->name) }}"
                trigger="click" mount-when="direct" toggle save-state>
                <i class="s-icon:arrow-down"></i>
                {{ $item->name }}
            </div>
        @endif
        @if (is_object($item))
            <div class="__subnav-content" id="subnav-mobile-{{ \Sugar\string\idCompliant($item->name) }}">
                @if ($item->content)
                    {!! $item->content !!}
                @elseif ($item->include)
                    @include($item->include)
                @else
                    <ul>
                        @foreach ($item as $subItem)
                            @if ($subItem->slug)
                                <li class="s-flex s-position:relative">
                                    <a href="{{ $subItem->slug }}" title="{{ $subItem->name }}"
                                        class="s-link:stretch s-order:2">
                                        {!! str_replace('@coffeekraken/', '', $subItem->name) !!}
                                    </a>
                                    <i
                                        class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent s-until:sibling:loading s-mie:10"></i>
                                    <div
                                        class="s-loader:spinner s-color:accent s-mie:10 s-float:right s-when:siblings:loading">
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
