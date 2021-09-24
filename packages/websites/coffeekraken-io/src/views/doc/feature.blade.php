@if ($block->feature)

    <h4 id="features-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:box s-tc:accent"></i>&nbsp;&nbsp;Features
    </h4>

    <ul class="s-list:ul:accent s-mbe:50">
        @foreach ($block->feature as $feature)
            <li class="s-typo:p">
                {{ $feature }}
            </li>
        @endforeach
    </ul>
@endif