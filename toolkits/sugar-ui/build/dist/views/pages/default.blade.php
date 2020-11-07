<!--
* @name               default
* @namespace          sugar-ui.views.pages
* @type               blade
*
* Default view used for all sort of things
*
* @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->
@extends('layouts.main')

@section('title', 'Default')

@section('content')
  {!! $content !!}
@endsection
