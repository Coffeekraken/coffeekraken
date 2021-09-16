<h4 id="preview-{{ $block->name }}" class="s-typo:h4 s-mt:80 s-mb:50">
    <i class="s-icon:preview s-color:accent"></i>&nbsp;&nbsp;Preview
</h4>

<div class="s-format:none s-mb:50">
    @foreach ($block->example as $example)
        @if ($example->language == 'html')
            {!! $example->code !!}                     
        @endif
    @endforeach
</div>