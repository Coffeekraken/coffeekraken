@extends('coffeekraken.layouts.main')
@section('title', $title)

@section('body')
 
    @include('layouts.header')
    
    @yield('content')

    @include('layouts.footer')

@endsection
