@extends('coffeekraken.layouts.main')
@section('title', $title)

@section('body')

    @include('layouts.header.header')
    
    @yield('content')

    @include('layouts.footer.footer')

@endsection
