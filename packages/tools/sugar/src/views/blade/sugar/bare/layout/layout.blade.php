@php
    $finalId = $id;
    if (!isset($id)) {
        $finalId = 's-layout-' . uniqid();
    }
@endphp
<style>
{!! \Sugar\css\layoutCss($layout->media, [
    "selector" => '#' . $finalId . '-layout',
    "mediaSettings" => \Sugar\convert\toObject($frontspec->media)
]) !!}
</style>
<div id="{{ $finalId }}" class="{{ $attributes->class }} {{ \Sugar\css\paddingClasses($padding) }} {{ \Sugar\css\marginClasses($margin) }}" {!! \Sugar\html\attrs($attributes, ['class']) !!}>
    @if (isset($container))
        <div class="s-container:{{ $container }}">
    @endif
    <div class="s-layout {{ isset($gap) ? 's-gap:' . $gap : '' }}" id="{{ $finalId }}-layout">
        {!! $html !!}
    </div>
    @if (isset($container))
    </div>
    @endif
</div>