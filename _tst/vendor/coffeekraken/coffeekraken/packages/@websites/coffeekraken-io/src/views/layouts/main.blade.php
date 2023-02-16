@extends('sugar.layouts.main.main', [
'bodyAttributes' => [
'id' => ($request->path != '/' and $request->path != '') ? \Sugar\string\idCompliant($request->path) : 'homepage',
's-sugar' => true
]
])
@section('title', isset($title) ? $title : 'Coffeekraken')

@section('body')

    @include('layouts.header.header')


    <div class="bkg"></div>

    <div s-page-transition class="content">
        {!! $body !!}
    </div>

    @include('generic.tools.tools')

    <s-panel id="settings" position="right" backdrop s-scope>
        <template>
            <ck-settings></ck-settings>
        </template>
    </s-panel>

    <s-panel id="ratings" position="right" backdrop s-scope>
        <template>
            <ck-ratings></ck-ratings>
        </template>
    </s-panel>

    <s-panel id="legal" position="bottom">
        <template>
            @include('generic.legal.legal')
        </template>
    </s-panel>
    <s href="#legal" s-activate mount-when="timeout:4000" trigger="!cookie:s-legal" unactivate-on="event:s-front.legal.agree:document,event:s-front.legal.disagree:document"></s>

    @include('layouts.footer.footer')

    <s-scroll class="scroll-top" to="top">
        <i class="s-icon:angle-up"></i>
    </s-scroll>

    <div class="loader">
        <p class="s-typo--p">
            Welcome on
        </p>
        <div class="_logo">
            @include ('generic.logo')
        </div>
        <div class="_spinner"></div>
    </div>
    <div class="top-loader"></div>

@endsection
