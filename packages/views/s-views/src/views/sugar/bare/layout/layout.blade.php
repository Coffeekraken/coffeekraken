@php
$finalId = $id;
if (!isset($id)) {
    $finalId = 's-layout-' . uniqid();
}
@endphp

<div id="{{ $finalId }}" class="{{ $attributes->class }} {{ \Sugar\css\spacesClasses($spaces, $frontspec) }}" {!! \Sugar\html\attrs($attributes, ['class']) !!}>
    {!! \Sugar\node\nodeDataTemplate('sugar.views.bare.layout', $__data) !!}
    @php
        $layoutCssRes = \Sugar\css\layoutCss(isset($media) ? $media : '1', [
            'selector' => '#' . $finalId . '-layout'
        ]);
    @endphp
    <style>
        {!! $layoutCssRes->css !!}
    </style>
    @if ($container)
        <div class="s-container:{{ $container }}">
    @endif
        <div class="s-layout {{ isset($gap) ? 's-gap:' ~ gap : '' }}" id="{{ finalId }}-layout">
            {% if html %}
                {{ html|raw }}
            {% elseif nodes %}
                {% for areaId, html in nodes %}
                    <div class="s-layout_area-{{ areaId }}" s-container="area-{{ areaId }}">
                        {% if html %}
                            {{ html|raw }}
                        {% endif %}
                    </div>
                {% endfor %}
            {% else %}
                <p>You MUST pass at least some "nodes" or raw "html" for your layout...</p>
            {% endif %}        
        </div>
    {% if container %}
        </div>
    {% endif %}
</div>