<ul class="s-fs-tree">
    @foreach ($menu as $item)

        @php
            $subId = $id . '-' . \Sugar\string\idCompliant($item->name);
        @endphp

        @if (is_object($item))
            @if ($item->slug)
                <li>
                    <div class="s-flex">
                        <a href="{{ $item->slug }}" class="s-link:stretch s-order:2">
                            {{ $item->as ? $item->as : $item->name }}
                        </a>

                        <i
                            class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent s-until:sibling:loading s-mie:10"></i>
                        <div class="s-loader:spinner s-color:accent s-mie:10 s-when:siblings:loading">
                        </div>
                    </div>
                </li>
            @else
                <li id="{{ $subId }}" s-activate href="#{{ $subId }}" id="doc-{{ $subId }}" toggle
                    save-state trigger="click,event:actual">
                    <div>
                        <i class="s-icon:folder-opened s-tc:complementary s-when:grandparent:active s-mie:10"></i>
                        <i class="s-icon:folder s-mie:10"></i>
                        {{ $item->name }}
                    </div>
                    @if (!$item->tree)
                        @include('pages.markdown.menu', [
                        'menu' => $item,
                        'id' => $subId
                        ])
                    @endif
                </li>
            @endif
        @else
            {{-- World --}}
        @endif

    @endforeach
</ul>
