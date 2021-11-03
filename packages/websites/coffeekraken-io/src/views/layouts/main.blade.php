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

    @include('generic.tools.tools')

    <s-side-panel id="settings" side="right" triggerer="#settings-opener" overlay>
        <ck-settings mount-when="inViewport"></ck-settings> 
    </s-side-panel>

    <ck-search></ck-search>

    @include('layouts.footer.footer')

    </div>

@endsection
