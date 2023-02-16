@extends('coffeekraken.layouts.main', [
    'bodyAttributes' => [
        'id' => (isset($request) && $request->path != '/' && $request->path != '') ? \Sugar\string\idCompliant($request->path) : 'homepage',
        's-sugar' => true,
        'class' => 'initial-loading'
    ]
])
@section('title', isset($title) ? $title : 'Coffeekraken')

@section('body')

    <div class="content">
        {!! $body !!}
    </div>

@endsection
