@extends('sugar.layouts.main.main')

@section('title', isset($title) ? $title : 'Coffeekraken Carpenter')

@section('body')

    {!! $body !!}
    <s-carpenter id="carpenter" save sidebar iframe></s-carpenter>

@endsection
