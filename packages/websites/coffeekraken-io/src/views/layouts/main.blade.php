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
        {!! $body !!}
    </div>

    @include('generic.tools.tools')

    <s-panel id="settings" position="right" backdrop>
        <ck-settings mount-when="inViewport"></ck-settings>
    </s-panel>

    @include('layouts.footer.footer')

    <s-scroll-to class="scroll-top" href="top">
        <i class="s-icon:angle-up"></i>
    </s-scroll-to>

@endsection
