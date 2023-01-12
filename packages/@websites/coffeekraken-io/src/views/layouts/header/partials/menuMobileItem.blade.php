<div class="_subnav-accordion">
    @foreach ($menuItem as $item)
        @if (isset($item->name))
            <div class="_subnav-title" s-activate href="#subnav-mobile-{{ \Sugar\string\idCompliant($item->name) }}"
                {!! $loop->index == 1 ? 'active="true"' : '' !!} id="subnav-mobile-item-{{ \Sugar\string\idCompliant($item->name) }}"
                trigger="click" mount-when="direct" toggle save-state>
                <i class="s-icon:arrow-down"></i>
                {{ $item->name }}
            </div>
        @endif
        @if (is_object($item))
            <div class="_subnav-content" id="subnav-mobile-{{ \Sugar\string\idCompliant($item->name) }}">
                <template>
                    @if (isset($item->content))
                        {!! $item->content !!}
                    @elseif (isset($item->include))
                        @include($item->include)
                    @else
                        <ul>
                            @foreach ($item as $subItem)
                                @if (isset($subItem->slug))
                                    <li class="s-flex s-position:relative">
                                        <a href="{{ $subItem->slug }}" title="{{ $subItem->name }}"
                                            class="s-link:stretch s-order:2">
                                            {!! str_replace('@coffeekraken/', '', $subItem->name) !!}
                                        </a>
                                        <i
                                            class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent s-until:sibling:loading s-mie:10"></i>
                                        <div
                                            class="s-loader:square-dots s-color:accent s-mie:10 s-float:right s-when:siblings:loading">
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
