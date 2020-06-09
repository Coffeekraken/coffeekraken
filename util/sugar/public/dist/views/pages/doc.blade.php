@extends('layouts.main')

@section('title', 'Documentation')

@section('sidebar')
    @parent
    <p>This is appended to the master sidebar.</p>
@endsection

@section('content')
    {!! $content !!}
@endsection
