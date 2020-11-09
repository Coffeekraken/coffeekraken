@extends('layouts.main')
@section('title', $title)

@section('content')

  <h1>{{ $title }}</h1>
  <p>{{ $error }}</p>
  
@endsection
