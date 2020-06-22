<?php
$settings = json_decode($settings);
$package = json_decode($package);
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>{{ $package->name }}</title>
    @foreach ($settings->assets->css as $css)
      <link rel="stylesheet" id="{{ $css->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $css->path) }}" />
    @endforeach
    @foreach ($settings->assets->js as $js)
      <script id="{{ $js->name }}" src="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $js->path) }}"></script>
    @endforeach
  </head>
  <body>
    @yield('content')
  </body>
</html>
