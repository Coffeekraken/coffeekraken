<div @foreach ($attributes as $prop => $value) {{ $prop }}="{{ $value }}" @endforeach>
    {!! $content !!}
</div>