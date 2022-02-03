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
                                <li>
                                    <a href="{{ $subItem->slug }}" title="{{ $subItem->name }}">
                                        {!! str_replace('@coffeekraken/', '', $subItem->name) !!}
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
