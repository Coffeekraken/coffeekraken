<div class="s-container:{{ $type }} {{ $attributes->class }} {{ \Sugar\css\paddingClasses($padding) }} {{ \Sugar\css\marginClasses($margin) }}" {!! \Sugar\html\attrs($attributes, ['class']) !!}>
    {!! $html !!}
</div>