@extends('layouts.default')
@section('content')

  @squid('view home.header')

  @squid('view home.header -r ajax')

  @squid('view home.header #header')

@stop
