@php
 if (!isset($typeOfToString)) {
    $typeOfToString = function($of) {
        $types = [];
        foreach ($of as $type) {
            if (is_string($type)) {
                array_push($types, $type);
            } else {
                if (isset($type->value)) {
                    array_push($types, $type->value);
                } else {
                    array_push($types, $type->type);
                }
            }
        }
        return implode('|', $types);
    };
 }
@endphp

@if (is_string($type))

@elseif (count($type->types) > 0)
    
    <div class="s-dropdown-container" tabindex="-1">

        <div class="s-typo:bold s-tc:info s-white-space:nowrap">

            @if (is_string($type->types[0]))
                <span>{{ $type->types[0] }}</span>
            @else
                <span>{{ $type->types[0]->type }}</span>
                @if (isset($type->types) && isset($type->types[0]->of) && count($type->types[0]->of))
                    <span class="s-tc:accent">&lt;{{ $typeOfToString($type->types[0]->of) }}&gt;</span>
                @endif
                @if (count($type->types) > 1)
                    <i class="s-icon:arrow-down"></i>
                @endif
            @endif
        </div>

        @if (count($type->types) > 1)
            <ul class="s-dropdown">
                @foreach($type->types as $subType)
                    <li class="s-dropdown-item">{{ isset($subType->value) ? $subType->value : $subType->type }}</li>
                @endforeach
            </ul>
        @endif

        @if (count($type->types) == 1 && isset($type->types[0]->of) && count($type->types[0]->of) > 0)
            <ul class="s-dropdown">
                @foreach($type->types[0]->of as $subType)
                    <li class="s-dropdown-item">{{ $subType->value ? $subType->value : $subType->type }}</li>
                @endforeach
            </ul>
        @endif

    </div>

@endif