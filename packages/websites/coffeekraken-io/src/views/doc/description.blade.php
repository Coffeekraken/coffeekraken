@if ($block->description)

    @php 
    $titleStr = $block->name;
    if ($block->get) {
        $titleStr = '<span class="s-color:accent">get</span> ' . $titleStr;
    } 
    @endphp

    <{{ $isFirst ? 'h1' : 'h3'}} id="{{ $block->name }}" class="s-typo:{{ $isFirst ? 'h1' : 'h3'}} s-mb:30 {{ $isFirst ? 's-color:accent' : '' }}">
        {!! $titleStr !!}
    </{{ $isFirst ? 'h1' : 'h3'}}>
    

    <p class="s-typo:p s-mb:50">{{ $block->description }}</p>
@endif