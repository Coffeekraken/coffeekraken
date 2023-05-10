@if ($type == 'color')
    <span class="s-tc--{{ $id }}">
        {!! $html !!}
    </span>
@elseif ($id == 'lead' || $id == 'p')
    <p class="s-typo--{{ $id }}">
        {!! $html !!}
    </p>
@elseif ($id == 'pre' || $id == 'code')
    <{{ $id }} class="s-typo--{{ $id }}">
        {!! $html !!}
    </{{ $id }}>
@elseif ($id == 'quote' || $id == 'blockquote')
    <blockquote class="s-typo--{{ $id }}">
        {!! $html !!}
    </blockquote>
@elseif ($id == 'bold' || $id == 'b' || $id == 'strong')
    <strong class="s-typo--{{ $id }}">
        {!! $html !!}
    </strong>
@elseif ($id == 'italic' || $id == 'i')
    <em class="s-typo--{{ $id }}">
        {!! $html !!}
    </em>
@elseif ($id == 'mark' || $id == 'del' || $id == 'ins' || $id == 'sub' || $id == 'sup')
    <{{ $id }} class="s-typo--{{ $id }}">
        {!! $html !!}
    </{{ $id }}>
@elseif (substr($id, 0, 1) == 'h' && count($id) == 2)
    <{{ $id }} class="s-typo--{{ $id }}">
        {!! $html !!}
    </{{ $id }}>
@elseif ($id == 'a' && isset($data->url) && isset($data->target))
    <a href="{{ $data->url }}" target="{{ $data->target }}">
        {!! $html !!}
    </a>
@else
    {!! $html !!}
@endif