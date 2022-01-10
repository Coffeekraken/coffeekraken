<ul class="s-fs-tree">

    @foreach ($menu as $item)

        @php
            $subId = $id . '-' . \Sugar\string\idCompliant($item->name);
        @endphp

        @if (is_object($item))
            <li id="{{ $subId }}">
                @if ($item->slug)
                    <i class="s-icon:{{ $icon ? $icon : 'file-md' }} s-tc:accent"></i>
                    <a href="{{ $item->slug }}">
                    @else
                        <i class="s-icon:folder-opened s-tc:complementary s-when:parent:active"></i>
                        <i class="s-icon:folder"></i>
                        <span s-activate href="#{{ $subId }}" id="doc-{{ $subId }}" toggle save-state>
                @endif
                @if ($item->name)
                    {{ $item->name }}
                @endif
                @if ($item->slug)
                    </a>
                @else
                    </span>
                @endif
                @if (!$item->tree)
                    @include('pages.markdown.menu', [
                    'menu' => $item,
                    'id' => $subId
                    ])
                @endif
            </li>
        @else
            {{-- World --}}
        @endif

    @endforeach
</ul>
