@foreach ($platforms as $platform)
    <span class="s-tooltip-container">
        <i class="s-platform:{{ $platform->name }}"></i>
        <div class="s-tooltip s-color:complementary s-white-space:nowrap">
            {{ $platform->name }}
        </div>
    </span>
@endforeach