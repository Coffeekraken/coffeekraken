@if (count($type->types) > 0)
    
    <div class="s-dropdown-container" tabindex="-1">

        <div class="s-typo:bold s-p:30 s-tc:info">
            {{ $type->types[0]->type }}
            @if (count($type->types) > 1)
                <i class="s-icon:arrow-down"></i>
            @endif
        </div>

        @if (count($type->types) > 1)
            <ul class="s-dropdown">
                @foreach($type->types as $subType)
                    <li class="s-dropdown__item">{{ $subType->value ? $subType->value : $subType->type }}</li>
                @endforeach
            </ul>
        @endif

        @if (count($type->types) == 1 and $type->types[0]->of and count($type->types[0]->of) > 0)
            <ul class="s-dropdown">
                @foreach($type->types[0]->of as $subType)
                    <li class="s-dropdown__item">{{ $subType->value ? $subType->value : $subType->type }}</li>
                @endforeach
            </ul>
        @endif

    </div>

@endif