<ul class="s-list:ul">

    {{-- <pre>@php var_dump($menu) @endphp</pre> --}}

    @foreach ($menu as $item)
        
        @if (is_object($item))
            <li>
                @if ($item->slug)
                    <a href="{{ $item->slug }}">
                @endif
                @if ($item->name)
                    <h5 class="s-mb:10">
                        {{ $item->name }}
                    </h5>
                @endif
                @if ($item->slug)
                    </a>
                @endif
                @if (!$item->tree)
                    @include('pages.markdown.menu', [
                        'menu' => $item
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