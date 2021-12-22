@extends('coffeekraken.layouts.main')
@section('title', $title)

@section('body')

    <div s-sugar id="{{ $request->path != '/' ? \Sugar\string\idCompliant($request->path) : 'homepage' }}">

    <script>
        window.packageJson = {!! json_encode($packageJson) !!};
    </script>

    <script>
        const state = JSON.parse(window.localStorage.getItem('coffeekrakenio') ?? '{}');
        if (state.darkMode) {
            document.body.setAttribute('theme', 'default');
            document.body.setAttribute('variant', 'dark');
        }
    </script>

    @include('layouts.header.header')
    
    <div class="bg">
        <div class="__gradient1"></div>
        <div class="__gradient2"></div>
    </div>

    <div class="content">
        @yield('content')
    </div>

    @include('generic.tools.tools')

    <s-side-panel id="settings" side="right" triggerer="#settings-opener" overlay>
        <ck-settings mount-when="inViewport"></ck-settings> 
    </s-side-panel>

    {{-- <ck-search></ck-search> --}}

    @include('layouts.footer.footer')

    </div>

@endsection
