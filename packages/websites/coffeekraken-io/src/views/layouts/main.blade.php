@extends('coffeekraken.layouts.main')
@section('title', $title)

@section('body')

    <div id="{{ $request->path != '/' ? \Sugar\string\idCompliant($request->path) : 'homepage' }}">

    <script>
        const state = JSON.parse(window.localStorage.getItem('coffeekrakenio') ?? '{}');
        if (state.darkMode) {
            document.body.classList.add('s-theme--default-dark');
        }
    </script>

    @include('layouts.header.header')
    
    @yield('content')

    @include('layouts.footer.footer')

    </div>

@endsection
