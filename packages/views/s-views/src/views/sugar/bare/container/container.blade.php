<div s-container="{{ $uid }}" class="s-container:{{ $type }} {{ $attributes->class }} {{ \Sugar\css\spacesClasses($spaces, $frontspec) }}" {!! \Sugar\html\attrs($attributes, ['class']) !!}>
    {!! \Sugar\node\nodeDataTemplate('views.bare.container', $__data) !!}
    @if ($nodes)
        {!! implode('', $nodes) !!}
    @else
        {!! html !!}
    @endif
</div>