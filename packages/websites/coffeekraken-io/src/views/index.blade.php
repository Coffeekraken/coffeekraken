@extends('layouts.main')
@section('title', $title)

@section('content')
 
    @include('pages.homepage.welcome')
    @include('pages.homepage.quote')

@endsection
