@extends('layouts.main')
@section('title', $title)

@section('content')

    @foreach($sections as $section)
        
        <section>

            <h2 class="s-h2">{{ $section->title }}</h2>
            <p class="s-p">{{ $section->description }}</p>

            @foreach($section->samples as $sample)


                <h3 class="s-h3">
                    <code class="css"></code>
                </h3>
                {!! $sample->code !!}
                <textarea id="editor">{!! $sample->code !!}</textarea>

            @endforeach

        </section>

    @endforeach

@endsection
