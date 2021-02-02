<!--
* @name               main
* @namespace          php.views.layouts
* @type               blade
*
* Main layout that handle things like scripts import, stylesheets import, etc...
*
* @author 	        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
  <!-- stylesheets -->
  @if ($frontspec->assets && $frontspec->assets->css)
    @foreach ($frontspec->assets->css as $name=>$css)
      @if (!$css->body)
        @if (Sugar\path\is_absolute($css->path) || Sugar\url\is_urlsss($css->path))
          <link rel="stylesheet" id="{{ $name }}" href="{{ $css->path }}" />
        @else
          <link rel="stylesheet" id="{{ $name }}" href="/{{ $css->path }}" />
        @endif
      @endif
    @endforeach
  @endif
  <!-- scripts -->
  @if ($frontspec->assets && $frontspec->assets->js)
    @foreach ($frontspec->assets->js as $name=>$js)
      @if (!$js->body)
        @if (Sugar\path\is_absolute($js->path) || Sugar\url\is_urlsss($js->path))
          <script type="{{ $js->type or 'text/javascript' }}" id="{{ $name }}" src="{{ $js->path }}"></script>
        @else
          <script type="{{ $js->type or 'text/javascript' }}" id="{{ $name }}" src="/{{ $js->path }}"></script>
        @endif
      @endif
    @endforeach
  @endif
</head>
<body>

  <div class="container">
    @yield('content')
  </div>

  <!-- body stylesheets -->
  @if ($frontspec->assets && $frontspec->assets->css)
    @foreach ($frontspec->assets->css as $name=>$css)
      @if ($css->body)
        @if (Sugar\path\is_absolute($css->path) || Sugar\url\is_urlsss($css->path)) {
          <link rel="stylesheet" id="{{ $name }}" href="{{ $css->path }}" />
        @else
          <link rel="stylesheet" id="{{ $name }}" href="/{{ $css->path }}" />
        @endif
      @endif
    @endforeach
  @endif
  <!-- body scripts -->
  @if ($frontspec->assets && $frontspec->assets->js)
    @foreach ($frontspec->assets->js as $name=>$js)
      @if ($js->body)
        @if (Sugar\path\is_absolute($js->path) || Sugar\url\is_urlsss($js->path))
          <script type="{{ $js->type or 'text/javascript' }}" id="{{ $name }}" src="{{ $js->path }}"></script>
        @else
          <script type="{{ $js->type or 'text/javascript' }}" id="{{ $name }}" src="/{{ $js->path }}"></script>
        @endif
      @endif
    @endforeach
  @endif
</body>
</html>
