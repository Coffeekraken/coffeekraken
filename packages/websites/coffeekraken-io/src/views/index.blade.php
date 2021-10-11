@extends('layouts.main')
@section('title', $title)

@section('content')
 
    @include('pages.homepage.welcome.welcome')

    
    @include('pages.homepage.features.features')
    
    {{-- @include('pages.homepage.getStarted.getStarted') --}}

@endsection
