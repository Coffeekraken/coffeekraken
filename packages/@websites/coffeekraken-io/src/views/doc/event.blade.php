@if ($block->event)
    <h4 id="events-{{ $block->name }}" class="s-typo:h4 s-mb:50">
        <i class="s-icon:misc-bubbles s-tc:accent"></i>&nbsp;&nbsp;Events
    </h4>

    <ol class="">
        @foreach ($block->event as $event)
            <li class="s-font:40 s-mbe:30">
                <header class="s-flex:align-center s-bg:main-surface s-radius s-mbe:20">
                    <div class="s-flex-item:grow s-tc:accent s-p:30 s-color:complementary">
                        {{ $event->name }}
                    </div>
                </header>
                <p class="s-typo:p s-format:text s-pi:30 s-pb:20">{!! \Sugar\markdown\toHtml($event->description) !!}</p>
            </li>
        @endforeach
    </ol>
@endif
