@extends('layouts.main')
@section('title', $title)

@section('content')
 
    @include('pages.homepage.welcome.welcome')
    @include('pages.homepage.quote.quote')
    @include('pages.homepage.features.features')

@endsection
