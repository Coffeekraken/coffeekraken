@extends('sugar.layouts.main.main', [
'bodyAttributes' => [
'id' => (@$request->path != '/' and @$request->path != '') ? \Sugar\string\idCompliant($request->path) : 'homepage',
's-sugar' => true
]
])
@section('title', isset($title) ? $title : 'Coffeekraken')

@section('body')

    @include('layouts.header.header')

    <div class="bkg"></div>

    <main s-page-transition s-refocus class="content">

        <img src="https://picsum.photos/200/300" />

        <video id='video' controls="controls" autoplay muted width="600" poster="https://assets.codepen.io/32795/poster.png">
            <source id='mp4' src="http://media.w3.org/2010/05/sintel/trailer.mp4" type='video/mp4' />
            <source id='webm' src="http://media.w3.org/2010/05/sintel/trailer.webm" type='video/webm' />
            <source id='ogv' src="http://media.w3.org/2010/05/sintel/trailer.ogv" type='video/ogg' />
            <p>Your user agent does not support the HTML5 Video element.</p>
        </video>


        {!! $body !!}
    </main>

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

    

@endsection
