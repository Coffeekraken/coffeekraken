@extends('layouts.main')

@section('title', 'Default')

@section('sidebar')
    @parent
    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
  {!! $content !!}
@endsection
