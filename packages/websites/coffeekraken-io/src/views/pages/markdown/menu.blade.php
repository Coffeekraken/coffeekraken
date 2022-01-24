<ul class="s-fs-tree">

    @foreach ($menu as $item)

        @php
            $subId = $id . '-' . \Sugar\string\idCompliant($item->name);
        @endphp

        @if (is_object($item))
            @if ($item->slug)
                <li>
                    <i class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent"></i>
                    <a href="{{ $item->slug }}">
                        {{ $item->name }}
                    </a>
                </li>
            @else
                <li id="{{ $subId }}" s-activate href="#{{ $subId }}" id="doc-{{ $subId }}" toggle
                    save-state trigger="click,event:actual">
                    <i class="s-icon:folder-opened s-tc:complementary s-when:parent:active"></i>
                    <i class="s-icon:folder"></i>
                    <span>
                        {{ $item->name }}
                    </span>
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
