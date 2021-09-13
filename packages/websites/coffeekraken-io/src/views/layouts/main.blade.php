@extends('coffeekraken.layouts.main')
@section('title', $title)

@section('body')

    <script>
        const state = JSON.parse(window.localStorage.getItem('coffeekrakenio') ?? '{}');
        if (state.darkMode) {
            document.body.classList.add('s-theme--coffeekraken-dark');
        }
    </script>

    @include('layouts.header.header')
    
    @yield('content')

    @include('layouts.footer.footer')

@endsection
