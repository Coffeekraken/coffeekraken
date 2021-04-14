<!--
* @name               main
* @namespace          php.views.layouts
* @type               blade
*
* Main layout that handle things like scripts import, stylesheets import, etc...
*
* @since            2.0.0
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
        @if (Sugar\path\is_absolute($css->src) || Sugar\url\is_url($css->src))
          <link rel="stylesheet" id="{{ $name }}" href="{{ Sugar\string\replace_tokens($css->src) }}" />
        @else
          <link rel="stylesheet" id="{{ $name }}" href="/{{ Sugar\string\replace_tokens($css->src) }}" />
        @endif
      @endif
    @endforeach
  @endif
  <!-- scripts -->
  @if ($frontspec->assets && $frontspec->assets->js)
    @foreach ($frontspec->assets->js as $name=>$js)
      @if (!$js->body)
        @if (Sugar\path\is_absolute($js->src) || Sugar\url\is_url($js->src))
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="{{ Sugar\string\replace_tokens($js->src) }}"></script>
        @else
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="/{{ Sugar\string\replace_tokens($js->src) }}"></script>
        @endif
      @endif
    @endforeach
  @endif
  @yield('head')
</head>
<body>

  <div class="container">
    @yield('body')
  </div>

  <!-- body stylesheets -->
  @if ($frontspec->assets && $frontspec->assets->css)
    @foreach ($frontspec->assets->css as $name=>$css)
      @if ($css->body)
        @if (Sugar\path\is_absolute($css->src) || Sugar\url\is_url($css->src)) {
          <link rel="stylesheet" id="{{ $name }}" href="{{ Sugar\string\replace_tokens($css->src) }}" />
        @else
          <link rel="stylesheet" id="{{ $name }}" href="/{{ Sugar\string\replace_tokens($css->src) }}" />
        @endif
      @endif
    @endforeach
  @endif
  <!-- body scripts -->
  @if ($frontspec->assets && $frontspec->assets->js)
    @foreach ($frontspec->assets->js as $name=>$js)
      @if ($js->body)
        @if (Sugar\path\is_absolute($js->src) || Sugar\url\is_url($js->src))
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="{{ Sugar\string\replace_tokens($js->src) }}"></script>
        @else
          <script type="{{ $js->type ? $js->type : 'text/javascript' }}" id="{{ $name }}" src="/{{ Sugar\string\replace_tokens($js->src) }}"></script>
        @endif
      @endif
    @endforeach
  @endif
</body>
</html>
