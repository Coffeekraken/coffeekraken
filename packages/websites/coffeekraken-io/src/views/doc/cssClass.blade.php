@if ($block->cssClass)
    <h4 id="cssClass-{{ $block->name }}" class="s-typo:h4 s-mbs:80 s-mbe:50">
        <i class="s-icon:css s-tc:accent"></i>&nbsp;&nbsp;CSS Classes
    </h4>

    <ol>
    @foreach ($block->cssClass as $cls)
        <li class="s-font:40 s-mbe:30">
            <header class="s-flex s-bg:main-surface s-radius">
                <div class="s-flex-item:grow s-tc:accent s-p:30">
                    {{ $cls->name }}
                </div>
            </header>
            <p class="s-typo:p s-p:30">{!! $cls->description !!}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif