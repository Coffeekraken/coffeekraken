<section class="s-container:{{ $type }} {{ $attributes->class }}" @foreach ($attributes as $prop => $value) @if ($prop != 'class') {{ $prop }}="{{ $value }}" @endif @endforeach>>
    {!! $content !!}
</section>