<style>
    {!! $css !!}
</style>
<div @foreach ($attributes as $prop => $value) {{ $prop }}="{{ $value }}" @endforeach>
    @foreach ($cells as $cell)
        <div @foreach ($cell->attributes as $prop => $value) {{ $prop }}="{{ $value }}" @endforeach>
            {!! $cell->content !!}
        </div>
    @endforeach
</div>