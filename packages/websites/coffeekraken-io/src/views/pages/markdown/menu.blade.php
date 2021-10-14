<ul class="s-list:ul folder-nav" id="{{ $id }}">

    {{-- <pre>@php var_dump($id) @endphp</pre> --}}

    @foreach ($menu as $item)
        
        @php
            $subId = $id . '-' . \Sugar\string\idCompliant($item->name);
        @endphp

        @if (is_object($item))
            <li class="{{ $item->slug ? '__slug' : '__toggle' }}">
                @if ($item->slug)
                    <a href="{{ $item->slug }}">
                @else
                    <span s-activate href="#{{ $subId }}" id="doc-{{ $subId }}" toggle save-state>
                @endif
                @if ($item->name)
                    <h5>
                        {{ $item->name }}
                    </h5>
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

        {{-- <pre> @php var_dump($item) @endphp </pre> --}}
        {{-- @include('pages.markdown.menu', $item) --}}
    @endforeach
</ul>