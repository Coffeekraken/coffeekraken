@extends('layouts.main')

@section('title', 'Documentation')

@section('content')

  <h1>{{ $title }}</h1>

  <p>{!! $content !!}</p>

  <my-element>WEFWEFWEF</my-element>

  {{-- <div class="s-bg-primary--900"></div>
  <div class="s-bg-primary--800"></div>
  <div class="s-bg-primary--700"></div>
  <div class="s-bg-primary--600"></div>
  <div class="s-bg-primary--500"></div>
  <div class="s-bg-primary--400"></div>
  <div class="s-bg-primary--300"></div>
  <div class="s-bg-primary--200"></div>
  <div class="s-bg-primary--100"></div>
  <div class="s-bg-primary--50"></div>

  <div class="s-bg-secondary--900"></div>
  <div class="s-bg-secondary--800"></div>
  <div class="s-bg-secondary--700"></div>
  <div class="s-bg-secondary--600"></div>
  <div class="s-bg-secondary--500"></div>
  <div class="s-bg-secondary--400"></div>
  <div class="s-bg-secondary--300"></div>
  <div class="s-bg-secondary--200"></div>
  <div class="s-bg-secondary--100"></div>
  <div class="s-bg-secondary--50"></div> --}}

@endsection
