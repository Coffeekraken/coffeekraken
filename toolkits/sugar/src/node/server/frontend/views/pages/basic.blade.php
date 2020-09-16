@extends('layouts.main')
@section('title', $title)

@section('content')

  <section class="{{ $tf->class }}">

    <h1>{{ $h1->value }}</h1>
    <h2>{{ $h2->value }}</h2>
    <h3>{{ $h3->value }}</h3>
    <h4>{{ $h4->value }}</h4>
    <h5>{{ $h5->value }}</h5>
    <h6>{{ $h6->value }}</h6>

  </section>

@endsection
