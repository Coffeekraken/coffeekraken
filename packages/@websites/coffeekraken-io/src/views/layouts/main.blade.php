@extends('coffeekraken.layouts.main', [
'bodyAttributes' => [
'id' => ($request->path != '/' and $request->path != '') ? \Sugar\string\idCompliant($request->path) : 'homepage',
's-sugar' => true
]
])
@section('title', isset($title) ? $title : 'Coffeekraken')

@section('body')

    <script>
        document.body.classList.add('initial-loading');
        document.body.classList.add('loading');
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

    <s-panel id="ratings" position="right" backdrop>
        <ck-ratings></ck-ratings>
    </s-panel>

    @include('layouts.footer.footer')

    <s-scroll class="scroll-top" to="top">
        <i class="s-icon:angle-up"></i>
    </s-scroll>

    <div class="loader">
        <p class="s-typo--p">
            Welcome on
        </p>
        <div class="__logo">
            @include ('layouts.header.partials.logo')
        </div>
        <div class="__spinner"></div>
    </div>
    <div class="top-loader"></div>

@endsection
