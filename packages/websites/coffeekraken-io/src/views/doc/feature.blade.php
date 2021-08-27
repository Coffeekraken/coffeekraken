@if ($block->feature)

    <h4 id="features-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:box s-color:accent"></i>&nbsp;&nbsp;Features
    </h4>

    <ul class="s-list:ul:accent s-mb:50">
        @foreach ($block->feature as $feature)
            <li class="s-typo:p">
                {{ $feature }}
            </li>
        @endforeach
    </ul>
@endif