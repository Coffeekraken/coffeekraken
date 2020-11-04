<!--
* @name               main
* @namespace          php.views.layouts
* @type               blade
*
* Main layout that handle things like scripts import, stylesheets import, etc...
*
* @author 			Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->
<?php
$settings = $settings ? json_decode($settings) : null;
$package = $package ? json_decode($package) : null;
?>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="chrome=1">
        <meta name="description" content="&amp;lt;p&amp;gt;&amp;lt;a href=&amp;quot;http://support.shufflehound.com/&amp;quot; rel=&amp;quot;nofollow&amp;quot;&amp;gt;&amp;lt;...">
        <meta name="robots" content="{{ $env === 'production' ? 'all' : 'noindex, nofollow' }}" />
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1" />
        <title>{{ $title ? $title : $package->name }}</title>
        @if ($settings->assets && $settings->assets->css)
          @foreach ($settings->assets->css as $asset)
            @if (!$asset->body)
              <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
            @endif
          @endforeach
        @endif
        <link rel="stylesheet" href="/src/scss/index.scss">
        @if ($settings->assets && $settings->assets->js)
          @foreach ($settings->assets->js as $asset)
             @if (!$asset->body)
              <script type="text/javascript" id="{{ $asset->name }}" src="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
            @endif
          @endforeach
        @endif
    </head>
    <body>

      <header class="ck-header">
        <span class="ck-header__logo"></span>
        <h1 class="ck-header__title">{{ $package->name }}</h1>
        <input is="s-filtrable-input" id="search" input-throttle="500" />
      </header>

      @section('sidebar')
      @show
      <div class="container">
        @yield('content')
      </div>

      @if ($settings->assets && $settings->assets->css)
        @foreach ($settings->assets->css as $asset)
          @if ($asset->body)
            <link rel="stylesheet" id="{{ $asset->name }}" href="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}">
          @endif
        @endforeach
      @endif
      @if ($settings->assets && $settings->assets->js)
        @foreach ($settings->assets->js as $asset)
          @if ($asset->body)
            <script type="text/javascript" id="{{ $asset->name }}" src="{{ str_replace($_SERVER['DOCUMENT_ROOT'], '', $asset->path) }}"></script>
          @endif
        @endforeach
      @endif
    </body>
</html>
