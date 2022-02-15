@extends('coffeekraken.layouts.main', [
'bodyAttributes' => [
'id' => $request->path != '/' ? \Sugar\string\idCompliant($request->path) : 'homepage',
's-sugar' => true
]
])
@section('title', $title)

@section('body')

    <script>
        window.packageJson = {!! json_encode($packageJson) !!};
    </script>

    <script>
        const state = JSON.parse(window.localStorage.getItem('coffeekrakenio') ?? '{}');
        if (state.darkMode) {
            document.querySelector('html').setAttribute('theme', 'dark');
        }
    </script>

    @include('layouts.header.header')

    <div class="bkg"></div>

    <div s-page-transition class="content">
        @yield('content')
    </div>

    @include('generic.tools.tools')

    <s-side-panel id="settings" side="right" triggerer="#settings-opener" overlay>
        <ck-settings mount-when="inViewport"></ck-settings>
    </s-side-panel>

    @include('layouts.footer.footer')

@endsection
