@if ($block->description)

    @php 
    $titleStr = $block->name;
    if ($block->get) {
        $titleStr = '<span class="s-tc:accent">get</span> ' . $titleStr;
    } 
    @endphp

    <{{ $isFirst ? 'h1' : 'h3'}} id="{{ $block->name }}" class="s-typo:{{ $isFirst ? 'h1' : 'h3'}} s-mbe:30 {{ $isFirst ? 's-tc:accent' : '' }}">
        {!! $titleStr !!}
    </{{ $isFirst ? 'h1' : 'h3'}}>
    

    <p class="s-typo:lead s-mbe:50">{!! $block->description !!}</p>
@endif