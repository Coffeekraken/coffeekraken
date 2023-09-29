@if (isset($supports))
    @foreach($supports as $support)

        <span class="s-tooltip-container">
            <i class="s-icon:support-{{ $support->name }} s-mie:10"></i>
            <div class="s-tooltip s-color:complementary s-white-space:nowrap">
                @if (isset($support->description) && $support->description != '')
                    {{ $support->description }}
                @else
                    <span>{{ ucfirst($support->name) }} supported</span>
                @endif
            </div>
        </span>

    @endforeach
@endif