@extends('layouts.main')
@section('title', $title)

@section('content')

    <section class="s-container">
        <h1 class="s-h1 s-mbe:40">
            {{ $title }}
        </h1>
        <p class="s-p">{{ $body }}</p>
    </section>


@endsection
