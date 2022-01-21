@if ($block->feature)

    <h4 id="features-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;Features
    </h4>

    <ul class="s-list:ul:accent">
        @foreach ($block->feature as $feature)
            <li>
                {!! $feature !!}
            </li>
        @endforeach
    </ul>
@endif
