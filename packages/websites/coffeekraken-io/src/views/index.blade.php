@extends('layouts.main')
@section('title', $title)

@section('content')
 
    @include('pages.homepage.welcome.welcome')
    {{-- @include('pages.homepage.quote.quote') --}}
    <div class="s-width:viewport s-py:50 s-bg:ui-surface"></div>
    @include('pages.homepage.features.features')
    {{-- @include('pages.homepage.getStarted.getStarted') --}}

@endsection
