@extends('coffeekraken.layouts.main', [
    'bodyAttributes' => [
        'id' => ($request->path != '/' and $request->path != '') ? \Sugar\string\idCompliant($request->path) : 'homepage',
        's-sugar' => true
    ]
])
@section('title', $title)

@section('body')

    <div class="content">
        {!! $body !!}
    </div>

@endsection
