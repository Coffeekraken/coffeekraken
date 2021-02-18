@extends('layouts.main')
@section('title', $title)

@section('body')

  <h1>{!! $title !!}</h1>
  <p>{!! $error !!}</p>

@endsection
