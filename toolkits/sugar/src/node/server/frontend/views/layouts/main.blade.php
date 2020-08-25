<?php
$frontspec = json_decode($frontspec);
$package = json_decode($package);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ $title or $package->name }}</title>
    @foreach ($frontspec->assets->css as $name=>$css)
      <link rel="stylesheet" id="{{ $name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $css->path) }}" />
    @endforeach
    @foreach ($frontspec->assets->js as $name=>$js)
      <script id="{{ $name }}" src="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $js->path) }}"></script>
    @endforeach
  </head>
  <body>
    @yield('content')
  </body>
</html>
