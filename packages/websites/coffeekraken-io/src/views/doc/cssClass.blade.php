@if ($block->cssClass)
    <h4 id="cssClass-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
        <i class="s-icon:css s-color:accent"></i>&nbsp;&nbsp;CSS Classes
    </h4>

    <ol>
    @foreach ($block->cssClass as $cls)
        <li class="s-font:40 s-mb:30">
            <header class="s-flex s-bg:ui-surface">
                <div class="s-flex-item:grow s-color:accent s-p:20">
                    {{ $cls->name }}
                </div>
            </header>
            <p class="s-typo:p s-p:20">{{ $cls->description }}</p> 
        </li>                                   
    @endforeach
    </ol>
@endif